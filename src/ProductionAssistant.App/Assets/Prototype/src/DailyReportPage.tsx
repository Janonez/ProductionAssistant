import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Database,
  FileText,
  LoaderCircle,
  Send,
} from "lucide-react";
import { invoke } from "./bridge";
import type {
  DailyField,
  DailyJobDetail,
} from "./types";
import { ReportTemplateEditor, type DateInsertKind } from "./ReportTemplateEditor";
import { ChoicePicker, ReportDatePicker, TimePicker } from "./FormPickers";

export type NoticeValue = { tone: string; title: string; message: string };
type NoticeScope = "basics" | "message" | "test";
const errorNotice = (error: unknown): NoticeValue => ({
  tone: "error",
  title: "操作失败",
  message: error instanceof Error ? error.message : String(error),
});

export function DailyReportTaskEditor({
  id,
  section,
  navigate,
  changed,
}: {
  id: string;
  section: string;
  navigate: (section: string) => void;
  changed: () => void;
}) {
  const [job, setJob] = useState<DailyJobDetail>();
  const [name, setName] = useState("");
  const [sendTime, setSendTime] = useState("17:30");
  const [template, setTemplate] = useState("");
  const [document, setDocument] = useState("");
  const [saveState, setSaveState] = useState("");
  const [notice, setNotice] = useState<NoticeValue>();
  const [noticeScope, setNoticeScope] = useState<NoticeScope>("basics");
  const [businessSection, setBusinessSection] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [metricId, setMetricId] = useState("");
  const [metrics, setMetrics] = useState<
    Array<{ id: string; name: string; defaultAggregate: string; granularity: string; hasFixedFilter: boolean; filterDescription: string }>
  >([]);
  const [propertiesError, setPropertiesError] = useState("");
  const [rangeKind, setRangeKind] = useState("");
  const [aggregateKind, setAggregateKind] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [editingPlaceholder, setEditingPlaceholder] = useState("");
  const [insert, setInsert] = useState<{
    value: DailyField | DateInsertKind;
    key: number;
  }>();
  const [preview, setPreview] = useState("");
  const [previewDate, setPreviewDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [busy, setBusy] = useState("");
  const loaded = useRef(false);
  const templateSaveTimer = useRef<number | undefined>(undefined);
  async function load() {
    const value = await invoke<DailyJobDetail>("daily.get", { id });
    setJob(value);
    setName(value.name);
    setSendTime(value.sendTime);
    setTemplate(value.draftTemplate);
    setDocument(value.draftTemplateDocument);
    loaded.current = true;
  }
  useEffect(() => {
    load().catch((error) => setNotice(errorNotice(error)));
  }, [id]);
  useEffect(() => {
    if (!loaded.current || !job) return;
    if (template === job.draftTemplate && document === job.draftTemplateDocument) return;
    setPreview("");
    setSaveState("保存中…");
    templateSaveTimer.current = window.setTimeout(
      () =>
        invoke("daily.saveTemplate", { id, text: template, document })
          .then(() => {
            setSaveState("已自动保存");
            setJob((current) =>
              current
                ? { ...current, draftTemplate: template, draftTemplateDocument: document, validated: false, isEnabled: false }
                : current,
            );
            changed();
          })
          .catch((error) => {
            setSaveState("保存失败");
            setNotice(errorNotice(error));
          }),
      650,
    );
    return () => {
      if (templateSaveTimer.current) window.clearTimeout(templateSaveTimer.current);
      templateSaveTimer.current = undefined;
    };
  }, [template, document]);

  const sources = useMemo(
    () => job?.sources.filter(source => !job.usesBusinessSections || source.businessSection === businessSection) || [],
    [job, businessSection],
  );
  const selectedMetric = metrics.find(metric => metric.id === metricId);
  async function chooseSource(value: string, binding?: DailyField["binding"]) {
    setSourceId(value);
    setMetricId("");
    setMetrics([]);
    setPropertiesError("");
    setRangeKind("");
    setAggregateKind("");
    setCustomStartDate("");
    setCustomEndDate("");
    if (!value) return;
    setBusy("properties");
    try {
      const result = await invoke<{ metrics: typeof metrics }>(
        "daily.getProperties",
        { id, sourceId: value },
      );
      setMetrics(result.metrics || []);
      setMetricId(binding?.businessMetricId || "");
      setRangeKind(binding?.rangeKind || "");
      setAggregateKind(binding?.aggregateKind || "");
      setCustomStartDate(binding?.customStartDate || "");
      setCustomEndDate(binding?.customEndDate || "");
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function editField(field: DailyField) {
    if (!field.binding) return;
    setEditingPlaceholder(field.placeholder);
    const source = job?.sources.find(item => item.id === field.binding?.dataSourceId);
    if (source?.businessSection) setBusinessSection(source.businessSection);
    await chooseSource(field.binding.dataSourceId, field.binding);
  }
  async function addField() {
    if (!sourceId || !metricId) return;
    try {
      const result = await invoke<{ field: DailyField }>(
        "daily.addField",
        {
          id, sourceId, metricId,
          placeholder: editingPlaceholder,
          rangeKind,
          aggregateKind,
          customStartDate: rangeKind === "specific-month" && customStartDate ? `${customStartDate.slice(0, 7)}-01` : customStartDate,
          customEndDate: rangeKind === "specific-date" ? customStartDate : customEndDate,
        },
      );
      setJob((current) =>
        current
          ? {
              ...current,
              fields: [
                ...current.fields.filter(
                  (field) => field.placeholder !== result.field.placeholder,
                ),
                result.field,
              ],
              validated: false,
              isEnabled: false,
            }
          : current,
      );
      if (!editingPlaceholder) setInsert({ value: result.field, key: Date.now() });
      setEditingPlaceholder("");
      setPreview("");
      changed();
    } catch (error) {
      setPropertiesError(error instanceof Error ? error.message : String(error));
      setNoticeScope("message");
    }
  }
  const canSaveField = !!metricId && !!rangeKind && !!aggregateKind && !busy &&
    (!(rangeKind === "specific-date" || rangeKind === "specific-month" || rangeKind === "custom") || !!customStartDate) &&
    (rangeKind !== "custom" || !!customEndDate);
  async function saveBasics() {
    if (!name.trim() || !sendTime) return;
    setBusy("basics");
    setNotice(undefined);
    try {
      await invoke("daily.saveBasics", { id, name, sendTime });
      setSaveState("已保存");
      setJob((current) => current ? { ...current, name, sendTime } : current);
      changed();
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("basics");
    } finally {
      setBusy("");
    }
  }
  async function generatePreview() {
    setBusy("preview");
    setPreview("");
    setNotice(undefined);
    try {
      if (templateSaveTimer.current) window.clearTimeout(templateSaveTimer.current);
      templateSaveTimer.current = undefined;
      await invoke("daily.saveTemplate", { id, text: template, document });
      const result = await invoke<{
        succeeded: boolean;
        message: string;
        text: string;
      }>("daily.preview", { id, businessDate: previewDate }, 120000);
      if (!result.succeeded) throw new Error(result.message);
      setPreview(result.text);
      changed();
      navigate("execution");
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("message");
    } finally {
      setBusy("");
    }
  }
  async function testSend() {
    setBusy("test");
    try {
      const result = await invoke<{ succeeded: boolean }>(
        "daily.test",
        { id, businessDate: previewDate },
        120000,
      );
      if (!result.succeeded) throw new Error("测试发送失败，请查看运行记录。");
      setNotice({
        tone: "success",
        title: "测试发送成功",
        message: "当前配置已验证，可以返回任务列表手动启用。",
      });
      setNoticeScope("test");
      await load();
      changed();
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("test");
    } finally {
      setBusy("");
    }
  }
  async function sendToday() {
    setBusy("send-today");
    setNotice(undefined);
    try {
      const result = await invoke<{ succeeded: boolean; alreadySent: boolean }>(
        "daily.sendToday",
        { id },
        120000,
      );
      if (!result.succeeded) throw new Error("今日消息发送失败，请查看运行记录。");
      setNotice({
        tone: "success",
        title: result.alreadySent ? "今日消息已发送" : "今日消息发送成功",
        message: result.alreadySent ? "今天的当前版本已有成功记录，本次未重复推送。" : "已使用当前验证通过的模板发送。",
      });
      setNoticeScope("test");
      await load();
      changed();
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("test");
    } finally {
      setBusy("");
    }
  }
  if (!job)
    return (
      <div className="page daily-page">
        <LoaderCircle className="spin page-loader" />
      </div>
    );
  return (
    <div className="page daily-page daily-detail automation-task-panel">
      <section className="surface daily-focus-card">
            {section === "basics" && <>
              <StepTitle id="daily-basics" title="基本信息" text="名称和发送时间由日报任务自己的配置保存。" />
              <div className="basic-grid focus-form">
                <label>任务名称<input value={name} onChange={(event) => { setName(event.target.value); setSaveState("有未保存更改") }} /></label>
                <label>每天发送时间<TimePicker value={sendTime} onChange={value => { setSendTime(value); setSaveState("有未保存更改") }} /></label>
              </div>
              {notice && noticeScope === "basics" && <Notice value={notice} />}
              <div className="focus-actions"><span className="daily-save-state">{saveState || "尚无未保存更改"}</span><button className="primary" disabled={!!busy || !name.trim() || !sendTime} onClick={saveBasics}>{busy === "basics" && <LoaderCircle className="spin" />}保存基本信息</button></div>
            </>}
            {section === "configuration" && <>
              <StepTitle id="daily-message" title="消息内容" text="从当前数据库目录中选择字段，可连续插入到同一条消息。" />
              {!job.notificationConfigured || !job.notificationConnected ? <div className="notice warning" role="status"><Bot /><div><strong>全局通知尚未就绪</strong><span>请先到“设置 → 通知设置”完成钉钉渠道配置和测试。</span></div></div> : null}
              <div className="template-workspace progressive-template">
                <div className="editor-column"><label>消息模板</label><ReportTemplateEditor text={template} document={document} fields={job.fields} insert={insert} onInsertHandled={() => setInsert(undefined)} onChange={(nextText, nextDocument) => { setTemplate(nextText); setDocument(nextDocument); setPreview(""); setJob(current => current ? { ...current, validated: false, isEnabled: false } : current) }} /></div>
                <aside className="field-picker progressive-field-picker">
                  <div className="field-picker-heading"><h3><Database />业务数据</h3><span>{editingPlaceholder ? "正在编辑字段" : "选择要写入日报的数据"}</span></div>
                  {!!job.fields.length && <div className="binding-list" aria-label="已配置字段">{job.fields.map(field => <button type="button" key={field.placeholder} title={field.tooltip} onClick={() => editField(field)}>{field.label}</button>)}</div>}
                  {job.usesBusinessSections && <label><span className="field-label-title"><b>1.</b> 业务</span><ChoicePicker value={businessSection} placeholder="请选择业务" options={job.businessSections.map(section => ({ value: section, label: section }))} onChange={value => { setBusinessSection(value); setEditingPlaceholder(""); chooseSource("") }} /></label>}
                  <label><span className="field-label-title"><b>{job.usesBusinessSections ? 2 : 1}.</b> 数据库</span><ChoicePicker value={sourceId} placeholder="请选择数据库" disabled={job.usesBusinessSections && !businessSection} options={sources.map(source => ({ value: source.id, label: source.name }))} onChange={value => { setEditingPlaceholder(""); chooseSource(value) }} /></label>
                  {sourceId && <label><span className="field-label-title"><b>{job.usesBusinessSections ? 3 : 2}.</b> 具体业务</span><ChoicePicker value={metricId} placeholder={busy === "properties" ? "正在读取可用业务…" : "请选择具体业务"} disabled={busy === "properties"} options={metrics.map(metric => ({ value: metric.id, label: metric.name }))} onChange={value => { setMetricId(value); const metric = metrics.find(item => item.id === value); setAggregateKind(metric?.defaultAggregate || ""); setRangeKind(metric?.granularity === "monthly" ? "current-month" : "") }} /></label>}
                  {metricId && <>
                    <label><span className="field-label-title"><b>{job.usesBusinessSections ? 4 : 3}.</b> 日期范围</span><ChoicePicker value={rangeKind} placeholder="请选择日期范围" options={[{ value: "day", label: "今日" }, { value: "current-month", label: "本月" }, { value: "month", label: "本月截至业务日" }, { value: "current-year", label: "本年" }, { value: "year", label: "本年截至业务日" }, { value: "last-year-to-date", label: "去年同期" }, { value: "last-year", label: "去年全年" }, { value: "specific-date", label: "指定日期" }, { value: "specific-month", label: "指定月份" }, { value: "custom", label: "指定日期范围" }]} onChange={setRangeKind} /></label>
                    {(rangeKind === "specific-date" || rangeKind === "custom") && <label><span className="field-label-title">{rangeKind === "custom" ? "开始日期" : "指定日期"}</span><ReportDatePicker value={customStartDate} onChange={setCustomStartDate} /></label>}
                    {rangeKind === "specific-month" && <label><span className="field-label-title">指定月份</span><input type="month" value={customStartDate.slice(0, 7)} onChange={event => setCustomStartDate(event.target.value)} /></label>}
                    {rangeKind === "custom" && <label><span className="field-label-title">结束日期</span><ReportDatePicker value={customEndDate} onChange={setCustomEndDate} /></label>}
                    <label><span className="field-label-title"><b>{job.usesBusinessSections ? 5 : 4}.</b> 取值方式</span><ChoicePicker value={aggregateKind} placeholder="请选择取值方式" options={[{ value: "sum", label: "求和" }, { value: "value", label: "取值" }]} onChange={setAggregateKind} /></label>
                    {selectedMetric?.hasFixedFilter && <div className="daily-metric-condition"><span>固定业务条件</span><strong>{selectedMetric.filterDescription}</strong><small>已由具体业务自动应用，无需重复配置。</small></div>}
                  </>}
                  {propertiesError && <div className="field-error" role="alert"><span>字段读取失败：{propertiesError}</span><button type="button" onClick={() => chooseSource(sourceId)}>重试</button></div>}
                  <button className="insert-field-button" disabled={!canSaveField} onClick={addField}>{editingPlaceholder ? "保存字段配置" : "插入所选字段"}</button>
                  <div className="system-variable"><span>业务日期</span><div className="system-variable-actions"><button type="button" onClick={() => setInsert({ value: "year", key: Date.now() })}>年</button><button type="button" onClick={() => setInsert({ value: "month", key: Date.now() })}>月</button><button type="button" onClick={() => setInsert({ value: "day", key: Date.now() })}>日</button><button type="button" onClick={() => setInsert({ value: "date", key: Date.now() })}>完整日期</button></div></div>
                </aside>
              </div>
              {notice && noticeScope === "message" && <Notice value={notice} />}
              <div className="focus-actions"><div className="preview-action-group"><label>预览取数日期<ReportDatePicker value={previewDate} onChange={value => { setPreviewDate(value); setPreview(""); setJob(current => current ? { ...current, validated: false, isEnabled: false } : current) }} /></label><button className="primary" disabled={!!busy || !template.trim()} onClick={generatePreview}>{busy === "preview" ? <LoaderCircle className="spin" /> : <FileText />}生成消息预览</button></div></div>
            </>}
            {section === "execution" && <>
              <StepTitle id="daily-test" title="预览与测试" text="生成预览后，可使用系统通知中心的钉钉渠道发送真实测试。" />
              {preview ? <div className="report-preview has-preview"><div><h3>即将发送</h3><p>{previewDate} · 已连接机器人</p></div><pre>{preview}</pre></div> : <div className="daily-test-empty"><FileText /><div><strong>尚未生成消息预览</strong><span>先到“消息内容”选择取数日期并生成预览。</span></div></div>}
              {notice && noticeScope === "test" && <Notice value={notice} />}
              {job.validated && <div className="daily-validated"><CheckCircle2 /><div><strong>当前配置已验证</strong><span>可以返回任务列表启用，或直接发送今日消息。</span></div></div>}
              <div className="focus-actions split"><button className="ghost" onClick={() => navigate("configuration")}>修改消息内容</button><div className="daily-test-actions"><button className="secondary" disabled={!!busy || !job.validated} onClick={sendToday}>{busy === "send-today" ? <LoaderCircle className="spin" /> : <Send />}发送今日消息</button><button className="primary" disabled={!!busy || !preview || !job.notificationConfigured || !job.notificationConnected} onClick={testSend}>{busy === "test" ? <LoaderCircle className="spin" /> : <Send />}测试发送</button></div></div>
            </>}
      </section>
    </div>
  );
}

function StepTitle({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-title">
      <div>
        <div>
          <h2 id={id}>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
function Notice({ value }: { value: NoticeValue }) {
  return (
    <div className={`notice ${value.tone}`} role="status">
      <CheckCircle2 />
      <div>
        <strong>{value.title}</strong>
        <span>{value.message}</span>
      </div>
    </div>
  );
}
