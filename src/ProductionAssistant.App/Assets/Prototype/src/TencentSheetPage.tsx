import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import DatePicker from "./DatePicker";
import { TencentTemplateTeaching, type LearnedRule } from "./TencentTemplateTeaching";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";
import "./tencent-sheet.css";

type Config = {
  documentUrl: string; sheetPattern: string; company: string; park: string; startColumn: string;
  cuttingRow: number; weldingRow: number; inboundRow: number;
  sheetMode?: "monthly" | "fixed"; sheetName?: string; rules?: Record<string, LearnedRule>;
  adapter: { anchors: Record<string, { address: string; expected: string }>; [key: string]: unknown };
};
type Job = { id: string; config: Config; validated?: boolean };
type Preview = { date: string; sheet: string; token?: string; conflict: boolean; message: string; rows: { label: string; address: string; value: number; current: string; action: string }[] };
const fields = [["cutting", "下料量"], ["welding", "装焊量"], ["section", "型材入库量"], ["plate", "板材入库量"]] as const;
const controlLabels: Record<string, string> = { nameBox: "左上角显示单元格地址的输入框", valueBox: "显示单元格内容的编辑区", sheetTabs: "底部工作表标签", activeSheet: "当前选中的工作表标签" };
const anchorLabels: Record<string, string> = { cuttingDate: "下料日期", weldingDate: "装焊日期", sectionDate: "型材日期", plateDate: "板材日期（合并格左上角）", cuttingCompany: "下料公司", weldingCompany: "装焊公司", park: "入库园区", sectionType: "型材表头", plateType: "板材表头" };
const message = (error: unknown) => error instanceof Error ? error.message : String(error);

export function TencentSheetCreate({ onCreated, onCancel }: AutomationTaskCreateProps) {
  const [config, setConfig] = useState<Partial<Config>>({ documentUrl: "" });
  const [imported, setImported] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  useEffect(() => { invoke<{ config: Config; imported: boolean }>("tencentSheet.defaults").then(result => { setConfig(result.config); setImported(result.imported); }).catch(error => setError(message(error))); }, []);
  async function create() {
    setBusy(true); setError("");
    try { await onCreated(await invoke<{ id: string }>("tencentSheet.create", { config })); }
    catch (error) { setError(message(error)); } finally { setBusy(false); }
  }
  return <div className="automation-create-step">
    <div><h3>连接生产填报文档</h3><p>{imported ? "已找到你在 Demo 中保存的配置，将直接复用。" : "粘贴文档分享链接，下一步打开文档并识别填报位置。"}</p></div>
    <label>文档分享链接<input type="url" value={config.documentUrl || ""} onChange={event => setConfig({ ...config, documentUrl: event.target.value })} placeholder="粘贴腾讯文档或企业微信文档链接" /></label>
    {error && <p role="alert">{error}</p>}
    <div className="dialog-actions"><button className="secondary" disabled={busy} onClick={onCancel}>取消</button><button className="primary" disabled={busy || !config.documentUrl?.trim()} onClick={create}>{busy && <LoaderCircle className="spin" />}创建并配置</button></div>
  </div>;
}

export function TencentSheetPage({ id, changed }: { id: string; changed: () => void }) {
  const [job, setJob] = useState<Job>(), [busy, setBusy] = useState(""), [notice, setNotice] = useState(""), [failed, setFailed] = useState(false);
  const [sheets, setSheets] = useState<string[]>([]), [missing, setMissing] = useState<string[]>([]);
  const [manual, setManual] = useState(false), [date, setDate] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ cutting: "", welding: "", section: "", plate: "" });
  const [preview, setPreview] = useState<Preview>(), [dirty, setDirty] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const load = () => invoke<Job>("tencentSheet.get", { id }).then(setJob);
  useEffect(() => { load().catch(error => { setFailed(true); setNotice(message(error)); }); }, [id]);
  async function action(name: string, run: () => Promise<void>) {
    setBusy(name); setNotice(""); setFailed(false);
    try { await run(); } catch (error) { setFailed(true); setNotice(message(error)); }
    finally { setBusy(""); }
  }
  function edit(config: Config) { setJob(current => current && { ...current, config }); setDirty(true); setPreview(undefined); }
  async function save() { if (!job) return; const saved = await invoke<Job>("tencentSheet.save", { id, config: job.config }); setJob(saved); setDirty(false); setPreview(undefined); changed(); }
  async function connect(operation: "open" | "recognize" | "pick", key?: string) {
    if (dirty) await save();
    setPreview(undefined);
    const result = await invoke<{ message: string; sheets?: string[]; missing?: string[] }>(`tencentSheet.${operation}`, { id, key }, 300000);
    setNotice(result.message); if (result.sheets) setSheets(result.sheets); if (result.missing) setMissing(result.missing);
    if (operation === "pick" && key) setMissing(current => current.filter(value => value !== key));
    await load();
  }
  if (!job) return <div className="notice" role="status">{notice || "正在读取填报配置…"}</div>;
  const config = job.config;
  return <div className="tencent-sheet-workbench" aria-busy={!!busy}>
    <div className="tencent-sheet-intro"><div><h2>腾讯文档生产填报</h2><p>连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。</p></div><span>Development 测试</span></div>
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}><div><strong>{failed ? "操作未完成" : "操作结果"}</strong><span>{notice}</span></div></div>}
    <fieldset disabled={!!busy || teaching} className="tencent-sheet-panel"><legend>1 · 连接文档</legend>
      <label>文档链接<input type="url" value={config.documentUrl} onChange={event => edit({ ...config, documentUrl: event.target.value })} /></label>
      <div className="tencent-sheet-actions"><button className="secondary" onClick={() => action("打开文档", () => connect("open"))}>打开文档 / 扫码登录</button><button className="primary" onClick={() => action("识别页面", () => connect("recognize"))}>识别并检查</button></div>
      <p className="tencent-sheet-help">首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。</p>
      {missing.length > 0 && <div className="tencent-sheet-guidance"><strong>按提示点选，程序会记住位置</strong>{missing.map(key => <div key={key}><span>{controlLabels[key]}</span><button className="secondary" onClick={() => action("选取控件", () => connect("pick", key))}>去网页点一下</button></div>)}</div>}
      {sheets.length > 0 && <label>工作表<select defaultValue="" onChange={event => { const name = event.target.value; if (name) { const monthly = /(\d{4}|\d{2})年\d{1,2}月/.test(name); edit({ ...config, sheetMode: monthly ? "monthly" : "fixed", sheetName: name, sheetPattern: monthly ? name.replace(/(\d{4}|\d{2})年\d{1,2}月/, (_, year: string) => `${year.length === 4 ? "{yyyy}" : "{yy}"}年{M}月`) : config.sheetPattern }); } }}><option value="">选择工作表</option>{sheets.map(name => <option key={name}>{name}</option>)}</select></label>}
      <p className="tencent-sheet-help">{config.sheetMode === "fixed" ? `固定工作表：${config.sheetName}` : "工作表月份随业务日期自动切换。"} 已示范项目按各自记录的日期和文字标志校验。</p>
      <details><summary>调整模板与高级设置</summary><div className="tencent-sheet-grid">
        <p className="tencent-sheet-help">已示范的项目优先使用学习到的排列规则，下面的原模板行列只对未示范项目生效。</p>
        {([["sheetPattern", "月份工作表名称"], ["company", "公司"], ["park", "园区"], ["startColumn", "1 日起始列"]] as const).map(([key, label]) => <label key={key}>{label}<input value={config[key]} onChange={event => edit({ ...config, [key]: event.target.value })} /></label>)}
        {([["cuttingRow", "下料行"], ["weldingRow", "装焊行"], ["inboundRow", "入库行"]] as const).map(([key, label]) => <label key={key}>{label}<input type="number" min="1" value={config[key]} onChange={event => edit({ ...config, [key]: Number(event.target.value) })} /></label>)}
        {Object.entries(config.adapter.anchors).map(([key, anchor]) => <label key={key}>{anchorLabels[key] || key}<input value={anchor.address} onChange={event => edit({ ...config, adapter: { ...config.adapter, anchors: { ...config.adapter.anchors, [key]: { ...anchor, address: event.target.value } } } })} /></label>)}
        {Object.entries(controlLabels).map(([key, label]) => <label key={key}>{label} · CSS<input value={String(config.adapter[key] || "")} onChange={event => edit({ ...config, adapter: { ...config.adapter, [key]: event.target.value } })} /></label>)}
      </div></details>
      {dirty && <button className="primary" onClick={() => action("保存配置", async () => { await save(); setNotice("配置已保存，请重新检查本次数据。"); })}>保存配置</button>}
    </fieldset>
    <TencentTemplateTeaching key={`${id}:${JSON.stringify(config)}`} id={id} rules={config.rules} fixedSheet={config.sheetMode === "fixed"} disabled={!!busy || dirty} run={action}
      onActive={active => { setTeaching(active); if (active) setPreview(undefined); }} onSaved={async () => { await load(); setPreview(undefined); setNotice("排列规则已保存，可以继续示范其他项目，或检查本次填报数据。"); changed(); }} />
    <fieldset disabled={!!busy || teaching} className="tencent-sheet-panel"><legend>2 · 本次填报数据</legend>
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
