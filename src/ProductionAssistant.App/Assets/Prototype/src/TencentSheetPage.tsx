import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import DatePicker from "./DatePicker";
import { TencentTemplateTeaching, type LearnedRule } from "./TencentTemplateTeaching";
import { TencentSiteProfiles } from "./TencentSiteProfiles";
import { TencentNotionBinding, type BusinessField, type NotionBinding } from "./TencentNotionBinding";
import { TencentExecutionRules, defaultSchedule, type BusinessDateRule, type ExecutionSchedule } from "./TencentExecutionRules";
import { ChoicePicker } from "./FormPickers";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";
import "./tencent-sheet.css";

type Config = {
  documentUrl: string; sheetPattern: string; company: string; park: string; startColumn: string;
  cuttingRow: number; weldingRow: number; inboundRow: number;
  sheetMode?: "monthly" | "fixed"; sheetName?: string; rules?: Record<string, LearnedRule>;
  siteProfileId?: string;
  requireTeaching?: boolean;
  fields?: BusinessField[];
  capturedSheet?: string;
  sheetReferenceName?: string;
  businessDateRule?: BusinessDateRule;
  executionSchedule?: ExecutionSchedule;
  adapter: { anchors: Record<string, { address: string; expected: string }>; [key: string]: unknown };
};
type Job = { id: string; config: Config; validated?: boolean; businessDate?: string; dateMode?: string; enabled?: boolean };
type Preview = { date: string; sheet: string; token?: string; conflict: boolean; message: string; rows: { label: string; address: string; value: number; current: string; action: string }[] };
type DataResult = { dataToken: string; date: string; values: Record<string, number>; rows: { id: string; name: string; value: number; unit: string; source: string; period: string; recordCount: number }[] };
const controlLabels: Record<string, string> = { nameBox: "左上角显示单元格地址的输入框", valueBox: "显示单元格内容的编辑区", activeSheet: "底部工作表标签" };
const message = (error: unknown) => error instanceof Error ? error.message : String(error);

export function TencentSheetCreate({ onCreated, onCancel }: AutomationTaskCreateProps) {
  const [config, setConfig] = useState<Partial<Config>>({ documentUrl: "" });
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  async function create() {
    setBusy(true); setError("");
    try { await onCreated(await invoke<{ id: string }>("tencentSheet.create", { config })); }
    catch (error) { setError(message(error)); } finally { setBusy(false); }
  }
  return <div className="automation-create-step">
    <div><h3>第一步 · 连接文档</h3><p>填入文档链接，在这里录制三个网页控件，随后设置执行规则和业务字段。</p></div>
    <label>文档分享链接<input type="url" disabled={busy || recording} value={config.documentUrl || ""} onChange={event => setConfig({ ...config, documentUrl: event.target.value })} placeholder="粘贴腾讯文档或企业微信文档链接" /></label>
    <TencentSiteProfiles embedded value={config.siteProfileId ?? ""} documentUrl={config.documentUrl ?? ""} disabled={busy} onChange={siteProfileId => setConfig(current => ({ ...current, siteProfileId }))} onActive={setRecording} />
    {error && <p role="alert">{error}</p>}
    <div className="dialog-actions"><button className="secondary" disabled={busy || recording} onClick={onCancel}>取消</button><button className="primary" disabled={busy || recording || !config.documentUrl?.trim() || !config.siteProfileId} onClick={create}>{busy && <LoaderCircle className="spin" />}下一步 · 设置填写规则</button></div>
  </div>;
}

export function TencentSheetPage({ id, changed }: { id: string; changed: () => void }) {
  const [job, setJob] = useState<Job>(), [busy, setBusy] = useState(""), [notice, setNotice] = useState(""), [failed, setFailed] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const [manual, setManual] = useState(false), [date, setDate] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Preview>(), [dirty, setDirty] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const [recording, setRecording] = useState(false), [sheets, setSheets] = useState<string[]>([]);

  const [fieldName, setFieldName] = useState(""), [fieldUnit, setFieldUnit] = useState("");
  const [selectedField, setSelectedField] = useState(""), [bindingField, setBindingField] = useState("");
  const fieldWorkflow = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataResult>();
  const load = () => invoke<Job>("tencentSheet.get", { id }).then(setJob);
  useEffect(() => { load().catch(error => { setFailed(true); setNotice(message(error)); }); }, [id]);
  useEffect(() => { if (selectedField || bindingField) fieldWorkflow.current?.scrollIntoView?.({ block: "start" }); }, [selectedField, bindingField]);
  async function action(name: string, run: () => Promise<void>) {
    setBusy(name); setNotice(""); setFailed(false);
    try { await run(); } catch (error) { setFailed(true); setNotice(message(error)); }
    finally { setBusy(""); }
  }
  function invalidate() { setData(undefined); setPreview(undefined); }
  function edit(config: Config) { setJob(current => current && { ...current, config }); setDirty(true); invalidate(); }
  async function updateField(field: BusinessField, notion?: NotionBinding) {
    invalidate();
    setJob(await invoke<Job>("tencentSheet.updateField", { id, fieldId: field.id, name: field.name, unit: field.unit, ...(notion ? { notion } : {}) }));
    setBindingField("");
    if (!job?.config.rules?.[field.id]) { setSelectedField(field.id); setNotice("数据来源已保存，接着示范这个字段的两个日期位置。"); }
    changed();
  }
  async function save() { if (!job) return; const saved = await invoke<Job>("tencentSheet.save", { id, config: job.config }); setJob(saved); setDirty(false); setPreview(undefined); changed(); }
  async function connect(operation: "open" | "recognize" | "pick", key?: string) {
    if (dirty) await save();
    invalidate();
    const result = await invoke<{ message: string; sheets?: string[]; missing?: string[] }>(`tencentSheet.${operation}`, { id, key }, 300000);
    setNotice(result.message); if (result.missing) setMissing(result.missing);
    if (result.sheets) setSheets([...new Set(result.sheets)]);
    if (operation === "pick" && key) setMissing(current => current.filter(value => value !== key && !(key === "activeSheet" && value === "sheetTabs")));
    await load();
  }
  if (!job) return <div className="notice" role="status">{notice || "正在读取填报配置…"}</div>;
  const config = job.config;
  const fields = config.fields ?? [];
  const selected = fields.find(field => field.id === selectedField);
  const binding = fields.find(field => field.id === bindingField);
  const requiresFetch = fields.some(field => field.notion || !field.legacyKey);
  const manualFields = fields.filter(field => field.legacyKey && !field.notion);
  const blocked = !!busy || teaching || !!binding || recording;
  const controlRecorded = (key: string) => (key === "activeSheet" ? ["activeSheet", "sheetTabs"] : [key]).every(part => !missing.includes(part) && !!config.adapter[part]);
  return <div className="tencent-sheet-workbench" aria-busy={!!busy}>
    <div className="tencent-sheet-intro"><div><h2>腾讯文档生产填报</h2><p>连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。</p></div><span>Development 测试</span></div>
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}><div><strong>{failed ? "操作未完成" : "操作结果"}</strong><span>{notice}</span></div></div>}
    <TencentSiteProfiles embedded value={config.siteProfileId ?? ""} documentUrl={config.documentUrl} disabled={!!busy || teaching || !!binding} allowLegacy onChange={siteProfileId => edit({ ...config, siteProfileId })} onActive={active => { setRecording(active); if (active) invalidate(); }} />
    <fieldset disabled={blocked} className="tencent-sheet-panel"><legend>1 · 连接文档</legend>
      <label>文档链接<input type="url" value={config.documentUrl} onChange={event => edit({ ...config, documentUrl: event.target.value })} /></label>
      <div className="tencent-sheet-actions"><button className="secondary" onClick={() => action("打开文档", () => connect("open"))}>打开文档 / 扫码登录</button><button className="primary" onClick={() => action("识别页面", () => connect("recognize"))}>识别并检查</button></div>
      <button className="secondary" onClick={() => action("结束前台会话", async () => { invalidate(); const result = await invoke<{ message: string }>("tencentSheet.close", { id }); setNotice(result.message); })}>结束前台会话</button>
      <p className="tencent-sheet-help">首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。</p>
      {config.siteProfileId ? <p className="tencent-sheet-help">工作表标签、名称框和内容编辑区使用所选网页适配，其他文档可以复用。</p> : <div className="tencent-sheet-guidance"><strong>网页识别位置</strong><p className="tencent-sheet-help">本任务保留原有控件配置。也可在任务列表中录制公共网页适配，供其他文档复用。</p>{Object.entries(controlLabels).map(([key, label]) => <div key={key}><span>{label}<small className="tencent-control-state">{controlRecorded(key) ? "已记录" : "待选取"}</small></span><button className="secondary" aria-label={`点选${label}`} onClick={() => action("选取网页位置", () => connect("pick", key))}>{controlRecorded(key) ? "重新点选" : "去网页点选"}</button></div>)}</div>}
      {!!sheets.length && <label>工作表名称<ChoicePicker value={config.sheetReferenceName ?? config.capturedSheet ?? config.sheetName ?? ""} options={sheets.map(name => ({ value: name, label: name }))} placeholder="选择识别到的工作表名称" disabled={blocked} onChange={sheetReferenceName => edit({ ...config, sheetReferenceName })} /></label>}
      {(config.sheetReferenceName || config.capturedSheet || config.sheetMode === "fixed") && <p className="tencent-sheet-help">工作表：{config.sheetReferenceName ?? config.capturedSheet ?? config.sheetName} · 执行时按名称匹配，年月使用本次业务日期。</p>}
    </fieldset>
    <TencentExecutionRules rule={config.businessDateRule ?? { kind: "relative", offsetDays: job.dateMode === "today" ? 0 : -1 }} schedule={config.executionSchedule ?? defaultSchedule} disabled={blocked} onChange={(businessDateRule, executionSchedule) => edit({ ...config, businessDateRule, executionSchedule })} />
    {dirty && <button className="primary" disabled={blocked} onClick={() => action("保存填写规则", async () => { await save(); setNotice("填写规则已保存，可按业务日期手动验证。定时填报尚未启用。"); })}>保存填写规则</button>}
    <fieldset disabled={blocked || dirty} className="tencent-sheet-panel"><legend>3 · 配置业务字段</legend>
      <p className="tencent-sheet-help">填写业务名称 → 选择 Notion 数据库和数值字段 → 连续录制位置。取数、月份和位置共用本次业务日期。</p>
      <div className="tencent-sheet-grid"><label>业务字段名称<input value={fieldName} placeholder="例如：合格数量" onChange={event => setFieldName(event.target.value)} /></label><label>单位（可选）<input value={fieldUnit} placeholder="例如：件" onChange={event => setFieldUnit(event.target.value)} /></label></div>
      <button className="primary" disabled={!fieldName.trim()} onClick={() => action("新增业务字段", async () => { invalidate(); const result = await invoke<Job>("tencentSheet.addField", { id, name: fieldName, unit: fieldUnit }); setJob(result); setSelectedField(""); setBindingField(result.config.fields?.at(-1)?.id ?? ""); setFieldName(""); setFieldUnit(""); changed(); })}>下一步 · 选择数据库</button>
      {!fields.length && <p>还没有业务字段，请先新增。新文档没有预设业务。</p>}
      <div className="tencent-sheet-guidance">{fields.map(field => <div key={field.id}><span><strong>{field.name}{field.unit ? `（${field.unit}）` : ""}</strong><small className="tencent-control-state">{config.rules?.[field.id] ? "位置已示范" : field.legacyKey ? "保留原任务位置" : "待示范位置"} · {field.notion ? `${field.notion.sourceName ?? "Notion"} / ${field.notion.valueFieldName ?? "数值字段"}` : field.legacyKey ? "保留原任务手动输入" : "待绑定数据库"}</small></span><div className="tencent-sheet-actions"><button className="secondary" disabled={!field.notion && !field.legacyKey} onClick={() => { setSelectedField(field.id); invalidate(); }}>示范位置：{field.name}</button><button className="secondary" onClick={() => { setBindingField(field.id); setSelectedField(""); invalidate(); }}>绑定数据：{field.name}</button><button className="ghost" onClick={() => action("删除业务字段", async () => { invalidate(); setJob(await invoke<Job>("tencentSheet.deleteField", { id, fieldId: field.id })); if (selectedField === field.id) setSelectedField(""); changed(); })}>删除：{field.name}</button></div></div>)}</div>
    </fieldset>
    {(selected || binding) && <div ref={fieldWorkflow}>{selected && !binding && <TencentTemplateTeaching key={`${id}:${selected.id}:${JSON.stringify(config.rules)}`} id={id} businessDate={manual && date ? date : job.businessDate} metrics={[{ value: selected.id, label: selected.name }]} initialMetric={selected.id} rules={config.rules} requireTeaching={!selected.legacyKey} fixedSheet={config.sheetMode === "fixed"} disabled={!!busy || dirty || recording} run={action}
      onActive={active => { setTeaching(active); if (active) invalidate(); }} onSaved={async () => { await load(); invalidate(); setSelectedField(""); setNotice("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"); changed(); }} />}
    {binding && <TencentNotionBinding key={binding.id} id={id} field={binding} continueToTeaching={!config.rules?.[binding.id]} disabled={!!busy} onCancel={() => setBindingField("")} onSave={notion => action("保存数据绑定", () => updateField(binding, notion))} />}</div>}
    <fieldset disabled={blocked || dirty} className="tencent-sheet-panel"><legend>4 · 按业务日期验证填报</legend>
      <label className="tencent-sheet-date-mode"><input type="checkbox" checked={manual} onChange={event => { setManual(event.target.checked); invalidate(); }} />指定补填日期</label>
      {manual ? <DatePicker label="本次业务日期" disabled={!!busy} value={date} onChange={value => { setDate(value); invalidate(); }} /> : <p>按已保存规则计算的业务日期：{data?.date ?? job.businessDate ?? "获取数据时确定"}。本次取数后日期固定，检查与填报沿用同一天。</p>}
      <div className="tencent-sheet-grid">{manualFields.map(field => <label key={field.id}>{field.name}{field.unit ? `（${field.unit}）` : ""}<input type="number" step="any" inputMode="decimal" value={values[field.id] ?? ""} placeholder="输入本次实际数据" onChange={event => { setValues({ ...values, [field.id]: event.target.value }); invalidate(); }} /></label>)}</div>
      {requiresFetch && <button className="secondary" disabled={!fields.length || (manual && !date) || manualFields.some(field => !values[field.id]?.trim()) || fields.some(field => !field.legacyKey && (!config.rules?.[field.id] || !field.notion))} onClick={() => action("获取 Notion 数据", async () => { invalidate(); setData(await invoke<DataResult>("tencentSheet.fetch", { id, businessDate: manual ? date : undefined, values }, 300000)); setNotice("取数完成，请核对来源、日期和数值后检查网页位置。"); })}>获取本次 Notion 数据</button>}
      {data && <div className="tencent-sheet-table"><p>业务日期：{data.date}</p><table><thead><tr><th>业务字段</th><th>数值</th><th>来源与范围</th><th>记录数</th></tr></thead><tbody>{data.rows.map(row => <tr key={row.id}><td>{row.name}</td><td>{row.value} {row.unit}</td><td>{row.source} · {row.period}</td><td>{row.recordCount}</td></tr>)}</tbody></table></div>}
      <button className="primary" disabled={!fields.length || (manual && !date) || (requiresFetch ? !data : manualFields.some(field => !values[field.id]?.trim()))} onClick={() => action("检查填报位置", async () => { setPreview(undefined); const result = await invoke<Preview>("tencentSheet.inspect", { id, values, dataToken: data?.dataToken, businessDate: data?.date ?? (manual ? date : undefined) }, 300000); setPreview(result); setNotice(result.message); changed(); })}>检查本次数据与位置</button>
    </fieldset>
    <fieldset disabled={blocked || dirty} className="tencent-sheet-panel"><legend>5 · 后台自动测试</legend>
      <p className="tencent-sheet-help">按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。</p>
      <p className="tencent-sheet-help">所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。</p>
      <button className="primary" disabled={!fields.length || fields.some(field => !field.notion || (!field.legacyKey && !config.rules?.[field.id])) || (manual && !date)} onClick={() => action("后台取数、填报并确认保存", async () => { invalidate(); try { const result = await invoke<{ message: string }>("tencentSheet.backgroundTest", { id, businessDate: manual ? date : undefined }, 600000); setNotice(result.message); } finally { await load(); changed(); } })}>后台自动测试并填写</button>
      {job.enabled && <p className="tencent-sheet-help">定时填报已启用。修改配置前请先在任务列表停用。</p>}
    </fieldset>
    {preview && <section className="tencent-sheet-panel"><h3>确认填报</h3><p>业务日期：{preview.date} · {preview.sheet}</p><div className="tencent-sheet-table"><table><thead><tr><th>项目</th><th>位置</th><th>原内容</th><th>本次填报</th></tr></thead><tbody>{preview.rows.map(row => <tr key={row.address}><td>{row.label}</td><td>{row.address}</td><td>{row.current || "空白"}</td><td>{row.value}</td></tr>)}</tbody></table></div>
      <p>{preview.conflict ? "目标格已有内容，本次不可写入。" : "将仅填写以上空白单元格。确认有效期为 2 分钟。"}</p>
      <button className="primary" disabled={blocked || !preview.token || preview.conflict} onClick={() => action("填报并确认保存", async () => { const current = preview; setPreview(undefined); const result = await invoke<{ message: string }>("tencentSheet.write", { id, values, dataToken: data?.dataToken, businessDate: current.date, token: current.token }, 310000); setNotice(result.message); changed(); })}>确认填报以上 {preview.rows.length} 项</button>
    </section>}
    {busy && <p role="status" className="tencent-sheet-progress"><LoaderCircle className="spin" />{busy}… 请等待操作结束</p>}
  </div>;
}
