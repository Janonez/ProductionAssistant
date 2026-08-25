import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { invoke } from "./bridge";
import DatePicker from "./DatePicker";
import type { BindingState, Draft, ImportResult } from "./types";

type BusyState = "parse" | "check" | "write";
type ConflictChoice = "keep" | "use";
const HIDDEN_PREVIEW_KEYS = new Set(["raw_message", "message_type", "parser_version", "unit"]);
const NUMERIC_KEYS = new Set(["piece_count", "weight", "sheet_in_stock", "profile_in_stock", "cutting", "welding", "daily_output", "monthly_output", "yearly_output", "monthly_reference", "output_sections"]);
const UNIT_PATTERN = /(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i;

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function errorText(error: unknown) { return error instanceof Error ? error.message : String(error); }
function splitUnit(value: string, fallback = "") {
  const match = value.trim().match(UNIT_PATTERN);
  return { value: match ? value.trim().slice(0, -match[0].length).trim() : value, unit: match?.[0] || fallback };
}
function fieldStatus(status: string) {
  return ({ new: "新增", same: "一致", confirm: "待确认", exception: "异常", unchecked: "待检查" } as Record<string, string>)[status] || "异常";
}
export default function ProductionMessagePage() {
  const [rawMessage, setRawMessage] = useState("");
  const [parsedMessage, setParsedMessage] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [busy, setBusy] = useState<BusyState>();
  const [checkResult, setCheckResult] = useState<ImportResult>();
  const [writeResult, setWriteResult] = useState<ImportResult>();
  const [error, setError] = useState("");
  const [conflictChoices, setConflictChoices] = useState<Record<string, ConflictChoice>>({});
  const [completed, setCompleted] = useState(false);
  const [bindings, setBindings] = useState<BindingState>();
  const [bindingError, setBindingError] = useState("");
  const [requiredMonths, setRequiredMonths] = useState<string[]>([]);
  const [monthlyPlans, setMonthlyPlans] = useState<Record<string, string>>({});
  const [dirtyFields, setDirtyFields] = useState<Record<string, boolean>>({});
  const fieldFocusValues = useRef<Record<string, string>>({});

  const parsed = drafts.length > 0;
  const needsReparse = parsed && rawMessage !== parsedMessage;
  const locked = Boolean(busy);
  const firstDraft = drafts[0];

  useEffect(() => {
    invoke<BindingState>("production.getBindings").then(setBindings).catch((cause) => setBindingError(errorText(cause)));
  }, []);

  async function check(nextDrafts: Draft[]) {
    setBusy("check"); setError(""); setCheckResult(undefined); setConflictChoices({}); setDirtyFields({});
    try {
      setCheckResult(await invoke<ImportResult>("production.check", { drafts: nextDrafts, defaultDate: localDate() }));
    } catch (cause) { setError(errorText(cause)); }
    finally { setBusy(undefined); }
  }

  async function handleParse() {
    if (!rawMessage.trim() || locked) return;
    setBusy("parse"); setError(""); setCompleted(false); setWriteResult(undefined); setConflictChoices({});
    try {
      const nextDrafts = await invoke<Draft[]>("production.parse", { text: rawMessage, defaultDate: localDate() });
      setDrafts(nextDrafts); setParsedMessage(rawMessage);
      if (!nextDrafts.length) { setError("没有解析到可核对的数据，请检查消息内容后重试。"); return; }
      if (nextDrafts.every((draft) => draft.canWrite)) await check(nextDrafts);
    } catch (cause) {
      setDrafts([]); setCheckResult(undefined); setError(errorText(cause));
    } finally { setBusy((current) => current === "parse" ? undefined : current); }
  }

  async function handleDateChange(value: string) {
    const nextDrafts = drafts.map((draft, index) => index === 0 ? { ...draft, businessDate: value, canWrite: Boolean(value), warningText: value ? "" : draft.warningText } : draft);
    setDrafts(nextDrafts); setCheckResult(undefined); setConflictChoices({});
    if (nextDrafts.every((draft) => draft.canWrite)) await check(nextDrafts);
  }

  function handleFieldChange(draftIndex: number, key: string, value: string) {
    const choiceKey = `${draftIndex}:${key}`;
    setDrafts((current) => current.map((draft) => draft.index === draftIndex ? {
      ...draft,
      canWrite: Boolean(draft.businessDate) && draft.kind !== "Unknown",
      fields: { ...draft.fields, [key]: value },
      previewFields: draft.previewFields.map((field) => field.key === key ? { ...field, value } : field),
    } : draft));
    setDirtyFields((current) => {
      const next = { ...current };
      if (fieldFocusValues.current[choiceKey] === value) delete next[choiceKey];
      else next[choiceKey] = true;
      return next;
    });
  }

  async function handleFieldBlur(choiceKey: string, value: string) {
    const changed = fieldFocusValues.current[choiceKey] !== value;
    delete fieldFocusValues.current[choiceKey];
    if (changed && drafts.every((draft) => draft.canWrite)) await check(drafts);
  }

  async function write(plans?: Record<string, number>) {
    if (!checkResult || locked) return;
    setBusy("write"); setError("");
    try {
      const result = await invoke<ImportResult>("production.write", { drafts, defaultDate: localDate(), overwriteExisting: false, fieldChoices: conflictChoices, monthlyPlans: plans }, 120000);
      setWriteResult(result);
      if (result.requiredMonths.length) { setRequiredMonths(result.requiredMonths); setMonthlyPlans({}); return; }
      if (result.succeeded) setCompleted(true); else setError(result.message || "Notion 写入未完成。");
    } catch (cause) { setError(errorText(cause)); }
    finally { setBusy(undefined); }
  }

  function handleNext() {
    setRawMessage(""); setParsedMessage(""); setDrafts([]); setCheckResult(undefined); setWriteResult(undefined);
    setConflictChoices({}); setDirtyFields({}); setCompleted(false); setError("");
  }

  const invalidDrafts = drafts.filter((draft) => !draft.canWrite);
  const fields = useMemo(() => drafts.flatMap((draft) => {
    const checked = checkResult?.items.find((item) => item.index === draft.index)?.fields;
    if (checked?.length) return checked
      .filter((field) => !HIDDEN_PREVIEW_KEYS.has(field.key))
      .map((field) => ({ draft, key: field.key, name: field.name, propertyType: field.propertyType, parsedValue: draft.fields[field.key] ?? field.parsedValue, databaseValue: field.databaseValue, status: dirtyFields[`${draft.index}:${field.key}`] ? "unchecked" : field.status, message: field.message }));
    return draft.previewFields
      .filter((field) => !HIDDEN_PREVIEW_KEYS.has(field.key) && field.value.trim() && field.value !== "—")
      .map((field) => ({ draft, key: field.key, name: field.label, propertyType: NUMERIC_KEYS.has(field.key) ? "number" : "", parsedValue: draft.fields[field.key] ?? field.value, databaseValue: "", status: draft.canWrite ? "unchecked" : "exception", message: draft.warningText }));
  }), [drafts, checkResult, dirtyFields]);
  const summary = useMemo(() => ({
    newFields: fields.filter((field) => field.status === "new").length,
    same: fields.filter((field) => field.status === "same").length,
    confirm: fields.filter((field) => field.status === "confirm").length,
    exception: fields.filter((field) => field.status === "exception").length,
  }), [fields]);
  const confirmFields = fields.filter((field) => field.status === "confirm");
  const canSubmit = parsed && !needsReparse && !locked && Boolean(checkResult?.succeeded)
    && drafts.every((draft) => draft.canWrite && Boolean(draft.businessDate))
    && fields.every((field) => field.status !== "exception" && field.status !== "unchecked")
    && confirmFields.every((field) => Boolean(conflictChoices[`${field.draft.index}:${field.key}`]));

  if (completed) return <div className="app-shell"><main className="main-content">
    <PageTitle /><div className="production-message-scroll"><StepIndicator current={3} />
    <section className="complete-view"><div className="complete-icon"><Check /></div><h2>入库完成</h2><p>{writeResult?.message || `${drafts.length} 条消息已写入 Notion`}</p><button className="primary-button" onClick={handleNext}>录入下一条</button></section></div>
  </main></div>;

  return <div className="app-shell"><main className="main-content">
    <PageTitle /><div className="production-message-scroll"><StepIndicator current={parsed ? 2 : 1} />
    <div className="workspace-panel">
      <section className="message-pane">
        <div className="pane-title"><h2>原始消息</h2><p>输入生产消息，系统将自动解析并检查已有数据。</p></div>
        <textarea className="message-textarea" value={rawMessage} disabled={locked} onChange={(event) => setRawMessage(event.target.value)} placeholder="请输入生产消息" />
        <div className="parse-action"><button className="primary-button" disabled={!rawMessage.trim() || locked} onClick={handleParse}>{parsed && <RefreshCw className="button-icon refresh-icon" />}<span>{busy === "parse" ? "正在解析…" : parsed ? "重新解析" : "解析消息"}</span></button></div>
      </section>

      <section className="review-pane">
        {!parsed ? <div className="review-empty"><h2>解析结果</h2><p>解析消息后，Notion 数据检查结果将在这里显示。</p>
          {(bindingError || bindings?.configured === false) && <div className="pm-notice" role="alert">{bindingError || "Notion 数据源尚未配置，请先完成数据源绑定。"}</div>}
        </div> : <>
          <div className="review-header"><h2>解析结果</h2><div className="review-summary"><span>新增<strong>{summary.newFields}</strong></span><i>·</i><span>一致<strong>{summary.same}</strong></span><i>·</i><span>待确认<strong>{summary.confirm}</strong></span><i>·</i><span>异常<strong>{summary.exception}</strong></span></div></div>
          <div className="identity-section">
            <div className="identity-field"><DatePicker label="日期" value={firstDraft?.businessDate || ""} disabled={locked} onChange={handleDateChange} /></div>
            <div className="identity-field"><label>业务 / 产线</label><input className="field-input" value={firstDraft?.typeDisplay || ""} readOnly disabled={locked} /></div>
          </div>
          <MatchStatus busy={busy === "check"} result={checkResult} error={error} needsReparse={needsReparse} invalidCount={invalidDrafts.length} fieldStatuses={fields.map((field) => field.status)} />
          <div className="data-title">数据字段</div>
          <div className="field-table">
            <div className="field-table-header"><div>字段</div><div>本次解析值</div><div>数据库值</div><div className="header-status">状态</div></div>
            {fields.map((field) => {
              const parsed = splitUnit(field.parsedValue, field.propertyType === "number" ? field.draft.fields.unit || "" : "");
              const choiceKey = `${field.draft.index}:${field.key}`;
              return <div className="field-row" key={choiceKey}>
                <div className="field-name">{drafts.length > 1 ? `${field.draft.index}. ${field.name}` : field.name}</div>
                <div className="field-editor"><div className="input-unit-wrap"><input
                  className="field-input compact-input"
                  value={parsed.value}
                  disabled={locked}
                  aria-invalid={field.status === "exception"}
                  onChange={(event) => handleFieldChange(field.draft.index, field.key, `${event.target.value}${parsed.unit}`)}
                  onFocus={() => { fieldFocusValues.current[choiceKey] = `${parsed.value}${parsed.unit}`; }}
                  onBlur={(event) => handleFieldBlur(choiceKey, `${event.currentTarget.value}${parsed.unit}`)}
                />{parsed.unit && <span>{parsed.unit}</span>}</div></div>
                <div className="database-value">{field.databaseValue || "—"}</div>
                <div className="field-status"><span className={`pill pill-${field.status}`} title={field.message}>{fieldStatus(field.status)}</span></div>
              </div>;
            })}
          </div>
          {confirmFields.length > 0 && <section className="conflict-section" aria-labelledby="conflict-section-title"><div className="conflict-section-title" id="conflict-section-title">待确认字段</div>{confirmFields.map((field) => {
            const choiceKey = `${field.draft.index}:${field.key}`;
            return <div className="conflict-panel" key={choiceKey}><div className="conflict-message"><strong>{drafts.length > 1 ? `${field.draft.index}. ${field.name}` : field.name}</strong><span>原值与新值不同，请选择保留项。</span></div><div className="conflict-options">
                <label><input type="radio" name={`conflict-${choiceKey}`} checked={conflictChoices[choiceKey] === "keep"} onChange={() => setConflictChoices((current) => ({ ...current, [choiceKey]: "keep" }))} /><span><small>原值</small><strong>{field.databaseValue || "—"}</strong></span></label>
                <label><input type="radio" name={`conflict-${choiceKey}`} checked={conflictChoices[choiceKey] === "use"} onChange={() => setConflictChoices((current) => ({ ...current, [choiceKey]: "use" }))} /><span><small>新值</small><strong>{field.parsedValue || "—"}</strong></span></label>
              </div></div>;
          })}</section>}
          <div className="review-footer"><span className="review-footer-text">{drafts.length > 1 ? `本次共 ${drafts.length} 条消息，将整批写入 Notion。` : "确认后将把本次解析结果写入 Notion。"}</span><button className="primary-button confirm-button" disabled={!canSubmit} onClick={() => write()}>{busy === "write" ? "正在入库…" : "确认入库"}</button></div>
        </>}
      </section>
    </div>
    </div>
  </main>
  {requiredMonths.length > 0 && <MonthlyPlanDialog months={requiredMonths} values={monthlyPlans} setValues={setMonthlyPlans} close={() => setRequiredMonths([])} submit={(plans) => { setRequiredMonths([]); write(plans); }} />}
  </div>;
}

function MatchStatus({ busy, result, error, needsReparse, invalidCount, fieldStatuses }: { busy: boolean; result?: ImportResult; error: string; needsReparse: boolean; invalidCount: number; fieldStatuses: string[] }) {
  if (busy) return <div className="match-status" role="status" aria-live="polite"><span className="status-loader" /><span className="match-status-copy">正在检查 Notion 数据…</span></div>;
  if (needsReparse) return <div className="match-status match-status-error" role="alert"><span className="new-record-icon">!</span><span className="match-status-copy">原始消息已修改，请重新解析</span></div>;
  if (invalidCount) return <div className="match-status match-status-error" role="alert"><span className="new-record-icon">!</span><span className="match-status-copy">本批有 {invalidCount} 条异常，已停止检查和入库</span></div>;
  if (error) return <div className="match-status match-status-error" role="alert"><span className="new-record-icon">!</span><span className="match-status-copy">检查失败：{error}</span></div>;
  const existing = result?.items.some((item) => item.status === "existing" || item.status === "conflict");
  const has = (status: string) => fieldStatuses.includes(status);
  const allSame = fieldStatuses.length > 0 && fieldStatuses.every((status) => status === "same");
  const tone = has("exception") || (result && !result.succeeded && fieldStatuses.length === 0) ? "match-status-error"
    : has("confirm") ? "match-status-warning"
    : allSame ? "match-status-neutral"
    : "";
  const text = has("exception") ? "存在异常，不能入库"
    : has("unchecked") ? "字段已修改，等待检查"
    : has("confirm") ? "已找到对应记录，有字段待确认"
    : has("new") ? (existing || has("same") ? "已找到对应记录，将补充空字段" : "未找到对应记录，将新建")
    : allSame ? "已找到对应记录，数据一致"
    : result && !result.succeeded ? "Notion 检查未通过"
    : "等待检查 Notion 数据";
  const checked = Boolean(result) && !has("exception") && !has("confirm") && !has("unchecked");
  return <div className={`match-status ${tone}`} role={tone === "match-status-error" ? "alert" : "status"} aria-live="polite">
    {checked ? <span className="match-check"><Check /></span> : <span className="new-record-icon">{tone ? "!" : "+"}</span>}
    <span className="match-status-copy">{text}</span>
  </div>;
}

function MonthlyPlanDialog({ months, values, setValues, close, submit }: { months: string[]; values: Record<string, string>; setValues: (value: Record<string, string>) => void; close: () => void; submit: (value: Record<string, number>) => void }) {
  const parsed = Object.fromEntries(months.map((month) => [month, Number(values[month])]));
  const valid = months.every((month) => values[month]?.trim() && Number.isFinite(parsed[month]) && parsed[month] >= 0);
  return <div className="pm-dialog-overlay"><section className="pm-dialog" role="dialog" aria-modal="true" aria-labelledby="monthly-plan-title"><h2 id="monthly-plan-title">补充月预计产量</h2><p>创建下料月数据前需要补充预计产量（吨）。</p>{months.map((month) => <label key={month}>{month}<input type="number" min="0" value={values[month] || ""} onChange={(event) => setValues({ ...values, [month]: event.target.value })} /></label>)}<div className="pm-dialog-actions"><button onClick={close}>取消</button><button className="primary-button" disabled={!valid} onClick={() => submit(parsed)}>创建并继续</button></div></section></div>;
}

function PageTitle() { return <header className="content-header"><div><h1>生产消息入库</h1><p>解析生产消息，检查已有数据并确认入库</p></div><button type="button" className="template-config-button" disabled title="解析消息模板配置将在后续接入">模板配置</button></header>; }
function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [{ number: 1, title: "录入消息" }, { number: 2, title: "解析确认" }, { number: 3, title: "完成" }];
  return <div className="step-bar">{steps.map((step, index) => { const state = step.number < current ? "done" : step.number === current ? "active" : "pending"; return <Fragment key={step.number}><div className={`step step-${state}`}><div className={`step-circle ${state}`}>{state === "done" ? <Check /> : step.number}</div><span>{step.title}</span></div>{index < steps.length - 1 && <div className={`step-line ${step.number < current ? "done" : step.number === current ? "transition" : "pending"}`} />}</Fragment>; })}</div>;
}
