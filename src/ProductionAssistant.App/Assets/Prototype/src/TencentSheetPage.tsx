import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import DatePicker from "./DatePicker";
import { TencentTemplateTeaching, type LearnedRule } from "./TencentTemplateTeaching";
import { TencentSiteProfiles } from "./TencentSiteProfiles";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";
import "./tencent-sheet.css";

type Config = {
  documentUrl: string; sheetPattern: string; company: string; park: string; startColumn: string;
  cuttingRow: number; weldingRow: number; inboundRow: number;
  sheetMode?: "monthly" | "fixed"; sheetName?: string; rules?: Record<string, LearnedRule>;
  siteProfileId?: string;
  requireTeaching?: boolean;
  adapter: { anchors: Record<string, { address: string; expected: string }>; [key: string]: unknown };
};
type Job = { id: string; config: Config; validated?: boolean };
type Preview = { date: string; sheet: string; token?: string; conflict: boolean; message: string; rows: { label: string; address: string; value: number; current: string; action: string }[] };
const fields = [["cutting", "下料量"], ["welding", "装焊量"], ["section", "型材入库量"], ["plate", "板材入库量"]] as const;
const controlLabels: Record<string, string> = { nameBox: "左上角显示单元格地址的输入框", valueBox: "显示单元格内容的编辑区", activeSheet: "底部工作表标签" };
const message = (error: unknown) => error instanceof Error ? error.message : String(error);

export function TencentSheetCreate({ onCreated, onCancel }: AutomationTaskCreateProps) {
  const [config, setConfig] = useState<Partial<Config>>({ documentUrl: "" });
  const [adapting, setAdapting] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function create() {
    setBusy(true); setError("");
    try { await onCreated(await invoke<{ id: string }>("tencentSheet.create", { config })); }
    catch (error) { setError(message(error)); } finally { setBusy(false); }
  }
  return <div className="automation-create-step">
    <div><h3>连接生产填报文档</h3><p>先选择或录制公共网页控件，再为这份文档示范业务填报位置。</p></div>
    <label>文档分享链接<input type="url" value={config.documentUrl || ""} onChange={event => setConfig({ ...config, documentUrl: event.target.value })} placeholder="粘贴腾讯文档或企业微信文档链接" /></label>
    <TencentSiteProfiles value={config.siteProfileId ?? ""} documentUrl={config.documentUrl ?? ""} disabled={busy} onChange={siteProfileId => setConfig(current => ({ ...current, siteProfileId }))} onActive={setAdapting} />
    {error && <p role="alert">{error}</p>}
    <div className="dialog-actions"><button className="secondary" disabled={busy || adapting} onClick={onCancel}>取消</button><button className="primary" disabled={busy || adapting || !config.documentUrl?.trim() || !config.siteProfileId} onClick={create}>{busy && <LoaderCircle className="spin" />}创建并配置</button></div>
  </div>;
}

export function TencentSheetPage({ id, changed }: { id: string; changed: () => void }) {
  const [job, setJob] = useState<Job>(), [busy, setBusy] = useState(""), [notice, setNotice] = useState(""), [failed, setFailed] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const [manual, setManual] = useState(false), [date, setDate] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ cutting: "", welding: "", section: "", plate: "" });
  const [preview, setPreview] = useState<Preview>(), [dirty, setDirty] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const [adapting, setAdapting] = useState(false);
  const load = () => invoke<Job>("tencentSheet.get", { id }).then(setJob);
  useEffect(() => { load().catch(error => { setFailed(true); setNotice(message(error)); }); }, [id]);
  async function action(name: string, run: () => Promise<void>) {
    setBusy(name); setNotice(""); setFailed(false);
    try { await run(); } catch (error) { setFailed(true); setNotice(message(error)); }
    finally { setBusy(""); }
  }
  function edit(config: Config) { setJob(current => current && { ...current, config }); setDirty(true); setPreview(undefined); }
  async function save() { if (!job) return; const saved = await invoke<Job>("tencentSheet.save", { id, config: job.config }); setJob(saved); setDirty(false); setPreview(undefined); changed(); }
  async function connect(operation: "open" | "recognize" | "pick" | "captureSheet", key?: string) {
    if (dirty) await save();
    setPreview(undefined);
    const result = await invoke<{ message: string; sheets?: string[]; missing?: string[] }>(`tencentSheet.${operation}`, { id, key }, 300000);
    setNotice(result.message); if (result.missing) setMissing(result.missing);
    if (operation === "pick" && key) setMissing(current => current.filter(value => value !== key && !(key === "activeSheet" && value === "sheetTabs")));
    await load();
  }
  if (!job) return <div className="notice" role="status">{notice || "正在读取填报配置…"}</div>;
  const config = job.config;
  const controlRecorded = (key: string) => (key === "activeSheet" ? ["activeSheet", "sheetTabs"] : [key]).every(part => !missing.includes(part) && !!config.adapter[part]);
  return <div className="tencent-sheet-workbench" aria-busy={!!busy}>
    <div className="tencent-sheet-intro"><div><h2>腾讯文档生产填报</h2><p>连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。</p></div><span>Development 测试</span></div>
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}><div><strong>{failed ? "操作未完成" : "操作结果"}</strong><span>{notice}</span></div></div>}
    <TencentSiteProfiles value={config.siteProfileId ?? ""} documentUrl={config.documentUrl} disabled={!!busy || teaching} allowLegacy onChange={siteProfileId => edit({ ...config, siteProfileId })} onActive={setAdapting} />
    <fieldset disabled={!!busy || teaching || adapting} className="tencent-sheet-panel"><legend>1 · 连接文档</legend>
      <label>文档链接<input type="url" value={config.documentUrl} onChange={event => edit({ ...config, documentUrl: event.target.value })} /></label>
      <div className="tencent-sheet-actions"><button className="secondary" onClick={() => action("打开文档", () => connect("open"))}>打开文档 / 扫码登录</button><button className="primary" onClick={() => action("识别页面", () => connect("recognize"))}>识别并检查</button></div>
      <p className="tencent-sheet-help">首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。</p>
      {config.siteProfileId ? <p className="tencent-sheet-help">Sheet 标签和名称框由网页适配提供。内容编辑区自动识别；识别失败时请检查页面是否已进入可编辑状态。</p> : <div className="tencent-sheet-guidance"><strong>网页识别位置</strong><p className="tencent-sheet-help">本任务保留原有控件配置。也可以在上方录制网页适配，供其他文档复用。</p>{Object.entries(controlLabels).map(([key, label]) => <div key={key}><span>{label}<small className="tencent-control-state">{controlRecorded(key) ? "已记录" : "待选取"}</small></span><button className="secondary" aria-label={`点选${label}`} onClick={() => action("选取网页位置", () => connect("pick", key))}>{controlRecorded(key) ? "重新点选" : "去网页点选"}</button></div>)}</div>}
      <div className="tencent-sheet-guidance"><strong>填报工作表</strong><p className="tencent-sheet-help">在网页底部点击要填写的工作表，再记住当前选择。带年月的名称会自动随月份切换。</p><button className="secondary" onClick={() => action("记住工作表", () => connect("captureSheet"))}>记住网页当前工作表</button><span>{config.sheetMode === "fixed" ? `固定工作表：${config.sheetName}` : "按业务月份选择工作表"}</span></div>
      {dirty && <button className="primary" onClick={() => action("保存配置", async () => { await save(); setNotice("配置已保存，请重新检查本次数据。"); })}>保存文档配置</button>}
    </fieldset>
    <TencentTemplateTeaching key={`${id}:${JSON.stringify(config)}`} id={id} rules={config.rules} requireTeaching={config.requireTeaching} fixedSheet={config.sheetMode === "fixed"} disabled={!!busy || dirty || adapting} run={action}
      onActive={active => { setTeaching(active); if (active) setPreview(undefined); }} onSaved={async () => { await load(); setPreview(undefined); setNotice("排列规则已保存，可以继续示范其他项目，或检查本次填报数据。"); changed(); }} />
    <fieldset disabled={!!busy || teaching || adapting} className="tencent-sheet-panel"><legend>2 · 本次填报数据</legend>
      <label className="tencent-sheet-date-mode"><input type="checkbox" checked={manual} onChange={event => { setManual(event.target.checked); setPreview(undefined); }} />指定补填日期</label>
      {manual ? <DatePicker label="业务日期" disabled={!!busy} value={date} onChange={value => { setDate(value); setPreview(undefined); }} /> : <p>默认填报前一天，按北京时间计算。</p>}
      <div className="tencent-sheet-grid">{fields.map(([key, label]) => <label key={key}>{label}（吨）<input type="number" min="0" step="any" inputMode="decimal" value={values[key]} placeholder="输入本次实际数据" onChange={event => { setValues({ ...values, [key]: event.target.value }); setPreview(undefined); }} /></label>)}</div>
      <button className="primary" disabled={dirty || (manual && !date) || Object.values(values).some(value => value.trim() === "")} onClick={() => action("检查填报位置", async () => { setPreview(undefined); const result = await invoke<Preview>("tencentSheet.inspect", { id, values, businessDate: manual ? date : undefined }, 300000); setPreview(result); setNotice(result.message); changed(); })}>检查本次数据与位置</button>
    </fieldset>
    {preview && <section className="tencent-sheet-panel"><h3>3 · 确认填报</h3><p>{preview.date} · {preview.sheet}</p><div className="tencent-sheet-table"><table><thead><tr><th>项目</th><th>位置</th><th>原内容</th><th>本次填报（吨）</th></tr></thead><tbody>{preview.rows.map(row => <tr key={row.address}><td>{row.label}</td><td>{row.address}</td><td>{row.current || "空白"}</td><td>{row.value}</td></tr>)}</tbody></table></div>
      <p>{preview.conflict ? "目标格已有内容，本次不可写入。" : "将仅填写以上空白单元格。确认有效期为 2 分钟。"}</p>
      <button className="primary" disabled={!!busy || !preview.token || preview.conflict} onClick={() => action("填报并确认保存", async () => { const current = preview; setPreview(undefined); const result = await invoke<{ message: string }>("tencentSheet.write", { id, values, businessDate: current.date, token: current.token }, 310000); setNotice(result.message); changed(); })}>确认填报以上 4 项</button>
    </section>}
    {busy && <p role="status" className="tencent-sheet-progress"><LoaderCircle className="spin" />{busy}… 请等待操作结束</p>}
  </div>;
}
