import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import { TaskSkeleton, SkeletonLines } from './LoadingSkeleton';
import DatePicker from "./DatePicker";
import { TencentTemplateTeaching, type LearnedRule } from "./TencentTemplateTeaching";
import { TencentWebControls, type WebControls } from "./TencentWebControls";
import { TencentNotionBinding, type BusinessField, type NotionBinding } from "./TencentNotionBinding";
import { TencentExecutionRules, defaultSchedule, type BusinessDateRule, type ExecutionSchedule } from "./TencentExecutionRules";
import { ChoicePicker } from "./FormPickers";
import { TencentLoginDialog } from "./TencentLoginDialog";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";
import "./tencent-sheet.css";

type Config = {
  documentUrl: string; sheetPattern?: string;
  sheetMode?: "monthly" | "fixed"; sheetName?: string; rules?: Record<string, LearnedRule>;
  webControls?: WebControls;
  fields?: BusinessField[];
  capturedSheet?: string;
  sheetReferenceName?: string;
  businessDateRule?: BusinessDateRule;
  executionSchedule?: ExecutionSchedule;
};
type Job = { id: string; config: Config; configRevision?: number; validated?: boolean; businessDate?: string; enabled?: boolean };
type Preview = { date: string; sheet: string; token?: string; conflict: boolean; message: string; rows: { label: string; address: string; value: number; current: string; action: string }[] };
type DataResult = { dataToken: string; date: string; values: Record<string, number>; rows: { id: string; name: string; value: number; unit: string; source: string; period: string; recordCount: number }[] };
const message = (error: unknown) => error instanceof Error ? error.message : String(error);

export function TencentSheetCreate({ onCreated, onCancel }: AutomationTaskCreateProps) {
  const [documentUrl, setDocumentUrl] = useState("");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function create() {
    setBusy(true); setError("");
    try { await onCreated(await invoke<{ id: string }>("tencentSheet.create", { documentUrl })); }
    catch (error) { setError(message(error)); } finally { setBusy(false); }
  }
  return <div className="automation-create-step">
    <div><h3>新建文档填报任务</h3><p>填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。</p></div>
    <label>文档分享链接<input type="url" disabled={busy} value={documentUrl} onChange={event => setDocumentUrl(event.target.value)} placeholder="粘贴腾讯文档或企业微信文档链接" /></label>
    {error && <p role="alert">{error}</p>}
    <div className="dialog-actions"><button className="secondary" disabled={busy} onClick={onCancel}>取消</button><button className="primary" disabled={busy || !documentUrl.trim()} onClick={create}>{busy && <LoaderCircle className="spin" />}创建并配置</button></div>
  </div>;
}

export function TencentSheetPage({ id, changed, back, name }: { id: string; changed: () => void; back?: () => void; name?: string }) {
  const tabs = [{ id: "doc", label: "文档与账号" }, { id: "control", label: "网页控件" }, { id: "fields", label: "业务字段" }, { id: "rule", label: "执行规则" }, { id: "test", label: "测试与上线" }];
  const [tab, setTab] = useState("doc"), [testMode, setTestMode] = useState("front"), [adding, setAdding] = useState(false);
  const [runs, setRuns] = useState<{ id: string; time: string; status: string; businessDate: string; message?: string; error?: string }[]>();
  const [job, setJob] = useState<Job>(), [busy, setBusy] = useState(""), [notice, setNotice] = useState(""), [failed, setFailed] = useState(false);
  const [manual, setManual] = useState(false), [date, setDate] = useState("");
  const [preview, setPreview] = useState<Preview>(), [dirty, setDirty] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false), [loggedIn, setLoggedIn] = useState(false);
  const [recording, setRecording] = useState(false), [sheets, setSheets] = useState<string[]>([]);

  const [fieldName, setFieldName] = useState(""), [fieldUnit, setFieldUnit] = useState("");
  const [selectedField, setSelectedField] = useState(""), [bindingField, setBindingField] = useState("");
  const fieldWorkflow = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataResult>();
  useEffect(() => {
    if (!notice || failed) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice, failed]);
  const load = () => invoke<Job>("tencentSheet.get", { id }).then(setJob);
  useEffect(() => {
    let active = true;
    setLoggedIn(false); setLoginOpen(false);
    invoke<Job>("tencentSheet.get", { id }).then(job => { if (active) setJob(job); }).catch(error => { if (active) { setFailed(true); setNotice(message(error)); } });
    return () => { active = false; };
  }, [id]);
  useEffect(() => { if (selectedField || bindingField) fieldWorkflow.current?.scrollIntoView?.({ block: "start" }); }, [selectedField, bindingField]);
  async function action(name: string, run: () => Promise<void>) {
    setBusy(name); setNotice(""); setFailed(false);
    try { await run(); } catch (error) { setFailed(true); setNotice(message(error)); }
    finally { setBusy(""); }
  }
  function invalidate() { setData(undefined); setPreview(undefined); }
  function edit(config: Config) { setJob(current => current && { ...current, config }); setLoggedIn(false); setDirty(true); invalidate(); }
  async function updateField(field: BusinessField, notion?: NotionBinding) {
    invalidate();
    setJob(await invoke<Job>("tencentSheet.updateField", { id, fieldId: field.id, name: field.name, unit: field.unit, ...(notion ? { notion } : {}) }));
    setBindingField("");
    if (!job?.config.rules?.[field.id]) {
      setSelectedField(controlsReady ? field.id : "");
      setNotice(controlsReady ? "数据来源已保存，接着示范这个字段的两个日期位置。" : "数据来源已保存。录制网页控件后，再示范这个字段的填写位置。");
    }
    changed();
  }
  async function save() { if (!job) return; const saved = await invoke<Job>("tencentSheet.save", { id, config: job.config, configRevision: job.configRevision ?? 0 }); setJob(saved); setDirty(false); invalidate(); changed(); }
  async function connect(operation: "open" | "recognize") {
    if (dirty) await save();
    invalidate();
    const result = await invoke<{ message: string; sheets?: string[] }>(`tencentSheet.${operation}`, { id }, 300000);
    setNotice(result.message);
    if (result.sheets) setSheets([...new Set(result.sheets)]);
    await load();
  }
  if (!job) return notice ? <div className="notice" role="alert">{notice}</div> : <TaskSkeleton kind="tencent" />;
  const config = job.config;
  const controlsReady = !!(config.webControls?.sheetTab && config.webControls.cellAddressBox && config.webControls.cellEditor);
  const fields = config.fields ?? [];
  const selected = fields.find(field => field.id === selectedField);
  const binding = fields.find(field => field.id === bindingField);
  const blocked = !!busy || teaching || !!binding || recording || loginOpen;
  return <div className="tencent-demo" aria-busy={!!busy}><div className="page tencent-sheet-workbench">
    {back && <button className="crumb" onClick={back} disabled={blocked}>← 返回任务列表</button>}
    <div className="titlebar"><div><h1>{name || "腾讯文档填报"}</h1><div className="subtitle">腾讯文档填报 · 业务日期 {job.businessDate ?? "获取数据时确定"}</div></div><div className="tencent-badges"><span className={`badge ${job.enabled ? "success" : "warning"}`}>● 定时{job.enabled ? "已启用" : "未启用"}</span><span className="badge neutral">{job.validated && !dirty ? "已验证" : "待验证"}</span></div></div>
    {job.enabled && <div className="banner"><p>定时填报当前处于<strong>已启用</strong>状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。</p><button className="btn btn-secondary" disabled={blocked} onClick={() => action("停用定时填报", async () => { await invoke("automation.setEnabled", { taskType: "tencent_sheet_fill", id, enabled: false }, 60000); await load(); changed(); setNotice("已停用定时填报，现在可以修改配置。"); })}>立即停用</button></div>}
    <div className="status-strip">{[{ ok: loggedIn, text: loggedIn ? "文档已连接" : "文档连接待检查" }, { ok: controlsReady, text: controlsReady ? "网页控件已录制" : "网页控件待录制" }, { ok: fields.length > 0 && fields.every(field => field.notion && config.rules?.[field.id]), text: `业务字段 ${fields.filter(field => field.notion && config.rules?.[field.id]).length}/${fields.length} 已绑定` }, { ok: !!job.enabled, text: job.enabled ? "定时已启用" : "定时未启用" }].map(item => <span key={item.text} className={`status-chip ${item.ok ? "ok" : "pending"}`}><span className="dot" />{item.text}</span>)}</div>
    <div className="tabs" role="tablist" aria-label="腾讯文档配置">{tabs.map((item, index) => <button key={item.id} id={`tencent-tab-${item.id}`} role="tab" aria-selected={tab === item.id} aria-controls={`tencent-panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1} disabled={blocked} className={`tab ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)} onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length; setTab(tabs[next].id); document.getElementById(`tencent-tab-${tabs[next].id}`)?.focus(); }}>{item.label}</button>)}</div>
    <div className="panel active" key={tab} role="tabpanel" id={`tencent-panel-${tab}`} aria-labelledby={`tencent-tab-${tab}`}>
    {tab === "doc" && <>
    <fieldset disabled={blocked} className="card tencent-sheet-panel"><h2>目标文档</h2><p className="hint">填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。</p>
      <label>文档链接<input type="url" disabled={job.enabled} value={config.documentUrl} onChange={event => edit({ ...config, documentUrl: event.target.value })} /></label>
      <div className="divider" /><h2>填报账号</h2><p className="hint">使用企业微信扫码登录，已有登录状态会自动复用。</p><div className="btn-row"><button className="primary" onClick={() => action("准备扫码登录", async () => { if (dirty) await save(); invalidate(); setLoggedIn(false); setLoginOpen(true); })}>{loggedIn ? "检查登录" : "扫码登录"}</button><button className="secondary" onClick={() => action("打开文档", () => connect("open"))}>打开文档</button><button className="ghost" onClick={() => action("结束前台会话", async () => { invalidate(); const result = await invoke<{ message: string }>("tencentSheet.close", { id }); setNotice(result.message); })}>结束前台会话</button></div><details className="tencent-document-check"><summary>工作表识别与检查</summary><div className="btn-row"><button className="secondary" disabled={job.enabled} onClick={() => action("识别页面", () => connect("recognize"))}>识别并检查</button></div>
      <p className="tencent-sheet-help">识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。</p>
      {!!sheets.length && <label>工作表名称<ChoicePicker value={config.sheetReferenceName ?? config.capturedSheet ?? config.sheetName ?? ""} options={sheets.map(name => ({ value: name, label: name }))} placeholder="选择识别到的工作表名称" disabled={blocked || !!job.enabled} onChange={sheetReferenceName => edit({ ...config, sheetReferenceName })} /></label>}
      {(config.sheetReferenceName || config.capturedSheet || config.sheetMode === "fixed") && <p className="tencent-sheet-help">工作表：{config.sheetReferenceName ?? config.capturedSheet ?? config.sheetName} · 执行时按名称匹配，年月使用本次业务日期。</p>}
      </details>
    </fieldset>
    </>}
    {tab === "control" && <TencentWebControls key={id} id={id} value={config.webControls} disabled={!!busy || teaching || !!binding || dirty || !!job.enabled} onActive={active => { setRecording(active); if (active) invalidate(); }} onSaved={async () => { await load(); invalidate(); changed(); }} />}
    {tab === "fields" && <>
    <fieldset disabled={blocked || dirty || job.enabled} className="card tencent-sheet-panel"><div className="add-field-toggle"><div><h2>已绑定的业务字段</h2><p className="hint">取数、月份和填写位置共用本次业务日期。</p></div><button className="secondary" onClick={() => setAdding(!adding)}>+ 添加业务字段</button></div>
      {adding && <div className="add-field-form open"><div className="tencent-sheet-grid"><label>业务字段名称<input value={fieldName} placeholder="例如：合格数量" onChange={event => setFieldName(event.target.value)} /></label><label>单位（可选）<input value={fieldUnit} placeholder="例如：件" onChange={event => setFieldUnit(event.target.value)} /></label></div>
      <button className="primary" disabled={!fieldName.trim()} onClick={() => action("新增业务字段", async () => { invalidate(); const result = await invoke<Job>("tencentSheet.addField", { id, name: fieldName, unit: fieldUnit }); setJob(result); setSelectedField(""); setBindingField(result.config.fields?.at(-1)?.id ?? ""); setFieldName(""); setFieldUnit(""); setAdding(false); changed(); })}>下一步 · 选择数据库</button><button className="ghost" onClick={() => setAdding(false)}>取消</button></div>}
      {!fields.length && <p>还没有业务字段，请先新增。新文档没有预设业务。</p>}
      <div className="field-list">{fields.map(field => <div className="field-row" key={field.id}><span><strong>{field.name}{field.unit ? `（${field.unit}）` : ""}</strong><small className="tencent-control-state">{config.rules?.[field.id] ? "位置已示范" : "待示范位置"} · {field.notion ? `${field.notion.sourceName ?? "Notion"} / ${field.notion.valueFieldName ?? "数值字段"}` : "待绑定数据库"}</small></span><div className="tencent-sheet-actions"><button className="ghost" disabled={!controlsReady || !field.notion} onClick={() => { setSelectedField(field.id); invalidate(); }} aria-label={`示范位置：${field.name}`}>示范位置</button><button className="ghost" onClick={() => { setBindingField(field.id); setSelectedField(""); invalidate(); }} aria-label={`绑定数据：${field.name}`}>绑定数据</button><button className="btn-danger-ghost" onClick={() => action("删除业务字段", async () => { invalidate(); setJob(await invoke<Job>("tencentSheet.deleteField", { id, fieldId: field.id })); if (selectedField === field.id) setSelectedField(""); changed(); })} aria-label={`删除：${field.name}`}>删除</button></div></div>)}</div>
    </fieldset>
    {(selected || binding) && <div ref={fieldWorkflow}>{selected && !binding && <TencentTemplateTeaching key={`${id}:${selected.id}:${JSON.stringify(config.rules)}`} id={id} businessDate={manual && date ? date : job.businessDate} metrics={[{ value: selected.id, label: selected.name }]} initialMetric={selected.id} rules={config.rules} fixedSheet={config.sheetMode === "fixed"} disabled={!!busy || dirty || recording} run={action}
      onActive={active => { setTeaching(active); if (active) invalidate(); }} onSaved={async () => { await load(); invalidate(); setSelectedField(""); setNotice("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"); changed(); }} />}
    {binding && <TencentNotionBinding key={binding.id} id={id} field={binding} continueToTeaching={controlsReady && !config.rules?.[binding.id]} disabled={!!busy} onCancel={() => setBindingField("")} onSave={notion => action("保存数据绑定", () => updateField(binding, notion))} />}</div>}
    </>}
    {tab === "rule" && <><TencentExecutionRules rule={config.businessDateRule ?? { kind: "relative", offsetDays: -1 }} schedule={config.executionSchedule ?? defaultSchedule} disabled={blocked || !!job.enabled} onChange={(businessDateRule, executionSchedule) => edit({ ...config, businessDateRule, executionSchedule })} />
    </>}
    {dirty && (tab === "doc" || tab === "rule") && <div className="btn-row"><button className="primary" disabled={blocked} onClick={() => action("保存任务配置", async () => { await save(); setNotice("任务配置已保存。保存规则不会自动启用定时。"); })}>保存任务配置</button></div>}
    {tab === "test" && <><div className="card"><h2>运行测试</h2><div className="segmented" role="group" aria-label="测试模式">{[{ id: "front", label: "前台测试" }, { id: "back", label: "后台自动测试" }].map(mode => <button key={mode.id} aria-pressed={testMode === mode.id} disabled={blocked} className={testMode === mode.id ? "active" : ""} onClick={() => setTestMode(mode.id)}>{mode.label}</button>)}</div>
    {testMode === "front" && <fieldset disabled={blocked || dirty} className="test-mode active tencent-test-fields"><p className="test-desc">浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。</p>
      <label className="tencent-sheet-date-mode"><input type="checkbox" checked={manual} onChange={event => { setManual(event.target.checked); invalidate(); }} />指定补填日期</label>
      {manual ? <DatePicker label="本次业务日期" disabled={!!busy} value={date} onChange={value => { setDate(value); invalidate(); }} /> : <p>按已保存规则计算的业务日期：{data?.date ?? job.businessDate ?? "获取数据时确定"}。本次取数后日期固定，检查与填报沿用同一天。</p>}
      {<button className="secondary" disabled={!fields.length || (manual && !date) || fields.some(field => (!config.rules?.[field.id] || !field.notion))} onClick={() => action("获取 Notion 数据", async () => { invalidate(); setData(await invoke<DataResult>("tencentSheet.fetch", { id, businessDate: manual ? date : undefined }, 300000)); setNotice("取数完成，请核对来源、日期和数值后检查网页位置。"); })}>获取本次 Notion 数据</button>}
      {busy === "获取 Notion 数据" && !data && <SkeletonLines rows={4} label="正在加载业务数据" />}{data && <div className="tencent-sheet-table"><p>业务日期：{data.date}</p><table><thead><tr><th>业务字段</th><th>数值</th><th>来源与范围</th><th>记录数</th></tr></thead><tbody>{data.rows.map(row => <tr key={row.id}><td>{row.name}</td><td>{row.value} {row.unit}</td><td>{row.source} · {row.period}</td><td>{row.recordCount}</td></tr>)}</tbody></table></div>}
      <button className="primary" disabled={!fields.length || (manual && !date) || !data} onClick={() => action("检查填报位置", async () => { setPreview(undefined); const result = await invoke<Preview>("tencentSheet.inspect", { id, dataToken: data?.dataToken, businessDate: data?.date ?? (manual ? date : undefined) }, 300000); setPreview(result); setNotice(result.message); changed(); })}>检查本次数据与位置</button>
    </fieldset>
    }
    {testMode === "back" && <fieldset disabled={blocked || dirty} className="test-mode active tencent-test-fields">
      <p className="hint">本次业务日期：{manual ? date || "请在前台测试选择补填日期" : job.businessDate ?? "执行时确定"}{manual ? "（指定补填日期）" : "（按已保存规则）"}</p>
      <p className="tencent-sheet-help">按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。</p>
      <p className="tencent-sheet-help">所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。</p>
      <button className="primary" disabled={!fields.length || fields.some(field => !field.notion || !config.rules?.[field.id]) || (manual && !date)} onClick={() => action("后台取数、填报并确认保存", async () => { invalidate(); try { const result = await invoke<{ message: string }>("tencentSheet.backgroundTest", { id, businessDate: manual ? date : undefined }, 600000); setNotice(result.message); } finally { await load(); changed(); } })}>后台自动测试并填写</button>
      {job.enabled && <p className="tencent-sheet-help">定时填报已启用。修改配置前请先在任务列表停用。</p>}
    </fieldset>
    }</div>
    {testMode === "front" && preview && <section className="card tencent-sheet-panel"><h3>确认填报</h3><p>业务日期：{preview.date} · {preview.sheet}</p><div className="tencent-sheet-table"><table><thead><tr><th>项目</th><th>位置</th><th>原内容</th><th>本次填报</th></tr></thead><tbody>{preview.rows.map(row => <tr key={row.address}><td>{row.label}</td><td>{row.address}</td><td>{row.current || "空白"}</td><td>{row.value}</td></tr>)}</tbody></table></div>
      <p>{preview.conflict ? "目标格已有内容，本次不可写入。" : "将仅填写以上空白单元格。确认有效期为 2 分钟。"}</p>
      <button className="primary" disabled={blocked || !preview.token || preview.conflict} onClick={() => action("填报并确认保存", async () => { const current = preview; setPreview(undefined); const result = await invoke<{ message: string }>("tencentSheet.write", { id, dataToken: data?.dataToken, businessDate: current.date, token: current.token }, 310000); setNotice(result.message); changed(); })}>确认填报以上 {preview.rows.length} 项</button>
    </section>}
    <details className="tencent-run-history"><summary onClick={() => { if (!runs) action("读取运行记录", async () => { const result = await invoke<{ runs: NonNullable<typeof runs> }>("tencentSheet.runs", { id }); setRuns(result.runs); }); }}>运行记录</summary>{busy === "读取运行记录" && !runs && <SkeletonLines label="正在加载运行记录" />}{runs?.map(run => <div key={run.id}><p>{run.time} · {run.businessDate} · {run.status}</p><p>{run.error || run.message}</p></div>)}{runs?.length === 0 && <p>暂无运行记录</p>}</details>
    </>}
    </div>
    {loginOpen && <TencentLoginDialog key={`login:${id}`} id={id} onClose={success => { setLoggedIn(success); setLoginOpen(false); setNotice(success ? "已登录腾讯文档，可以继续识别并检查。" : "已关闭扫码登录，原有登录状态已保留。"); }} />}
    <div className={`toast ${notice ? "show" : ""} ${failed ? "error" : ""}`} role={failed ? "alert" : "status"}>{notice}{notice && <button className="ghost" aria-label="关闭提示" onClick={() => setNotice("")}>×</button>}</div>
    {busy && <p role="status" className="tencent-sheet-progress"><LoaderCircle className="spin" />{busy}… 请等待操作结束</p>}
  </div></div>;
}
