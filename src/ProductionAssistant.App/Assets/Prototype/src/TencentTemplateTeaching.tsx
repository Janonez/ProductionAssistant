import { useState } from "react";
import DatePicker from "./DatePicker";
import { ChoicePicker } from "./FormPickers";
import { invoke } from "./bridge";

export type LearnedRule = {
  rowStep: number; columnStep: number;
  samples: { date: string; address: string }[];
  confirmation: { date: string; address: string };
  dateAnchor: { address: string; format: string };
  labelAnchor: { address: string; expected: string };
};
type Reply = {
  step: string; sessionToken?: string; previewToken?: string;
  capture?: { address: string; value: string }; slot?: string;
  rule?: LearnedRule; prediction?: { date: string; address: string }; message: string;
  sheetMode?: string;
};

const slots = ["firstTarget", "secondTarget", "dateHeader", "label"];
const direction = (rule: LearnedRule) => rule.rowStep ? `每天向下 ${rule.rowStep} 行` : `每天向右 ${rule.columnStep} 列`;
function currentMonth() {
  const parts = new Intl.DateTimeFormat("en", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit" }).formatToParts(new Date());
  return `${parts.find(part => part.type === "year")!.value}-${parts.find(part => part.type === "month")!.value}`;
}

export function TencentTemplateTeaching({ id, metrics, initialMetric, rules, requireTeaching = false, fixedSheet, disabled, run, onActive, onSaved }: {
  metrics: { value: string; label: string }[]; initialMetric?: string;
  id: string; rules?: Record<string, LearnedRule>; requireTeaching?: boolean; fixedSheet: boolean; disabled: boolean;
  run: (name: string, work: () => Promise<void>) => Promise<void>;
  onActive: (active: boolean) => void; onSaved: () => Promise<void>;
}) {
  const [metric, setMetric] = useState(initialMetric || metrics[0]?.value || ""), [month] = useState(currentMonth);
  const [firstDate, setFirstDate] = useState(`${month}-01`), [secondDate, setSecondDate] = useState(`${month}-02`);
  const [draft, setDraft] = useState<Reply>(), [captures, setCaptures] = useState<Record<string, { address: string; value: string }>>({});
  const [error, setError] = useState("");
  const active = !!draft, label = metrics.find(item => item.value === metric)?.label || "业务字段";
  const labels: Record<string, string> = { firstTarget: `${firstDate} 的${label}填报格`, secondTarget: `${secondDate} 的${label}填报格`, dateHeader: `${firstDate} 的日期单元格`, label: "项目名称、公司或材料表头" };
  async function call(stage: string) {
    setError("");
    await run(stage === "preview" ? "验证排列并定位第三个日期" : stage === "confirm" ? "保存排列规则" : "记录示范位置", async () => {
      try {
        const response = await invoke<Reply>("tencentSheet.teach", { id, stage, metric, firstDate, secondDate, sessionToken: draft?.sessionToken, previewToken: draft?.previewToken, slot: draft?.step }, 300000);
        if (stage === "confirm" || stage === "cancel") { setDraft(undefined); setCaptures({}); onActive(false); if (stage === "confirm") await onSaved(); }
        else { setDraft(current => ({ ...current, ...response })); onActive(true); if (response.capture && response.slot) setCaptures(current => ({ ...current, [response.slot!]: response.capture! })); }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        if (stage === "cancel") { setDraft(undefined); setCaptures({}); onActive(false); }
      }
    });
  }
  return <fieldset className="tencent-sheet-panel tencent-teaching" disabled={disabled}>
    <legend>示范填报位置</legend>
    <p className="tencent-sheet-help">为每个项目记录排列规则。示范两个日期的位置，程序学习向右或向下的间隔，再请你确认第三个位置。{requireTeaching ? "新文档须完成各项示范，网页适配不会推断业务位置。" : "未示范的项目沿用原模板。"}</p>
    <div className="tencent-teaching-rules">{metrics.map(item => <div key={item.value}><strong>{item.label}</strong><span>{rules?.[item.value] ? direction(rules[item.value]) : requireTeaching ? "待示范位置" : "沿用原模板"}</span></div>)}</div>
    {error && <div className="notice error" role="alert"><div><strong>示范未完成</strong><span>{error}</span></div></div>}
    {!active ? <>
      <label>要示范哪个项目？<ChoicePicker value={metric} options={metrics} placeholder="选择项目" disabled={disabled} ariaLabel="要示范的项目" onChange={setMetric} /></label>
      <div className="tencent-sheet-grid"><DatePicker value={firstDate} onChange={setFirstDate} label="第一个示范日期" disabled={disabled} /><DatePicker value={secondDate} onChange={setSecondDate} label="第二个示范日期" disabled={disabled} /></div>
      <p className="tencent-sheet-help">先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。</p>
      <button className="secondary" disabled={disabled || !metric || !firstDate || !secondDate} onClick={() => call("start")}>{rules?.[metric] ? "重新示范此项目" : "开始示范此项目"}</button>
    </> : <>
      <ol className="tencent-teaching-steps" aria-label="示范进度">{slots.map((slot, index) => <li key={slot} aria-current={draft.step === slot ? "step" : undefined} className={captures[slot] ? "done" : ""}><span>{index + 1}. {labels[slot]}</span><strong>{captures[slot]?.address || "待选取"}</strong></li>)}</ol>
      {slots.includes(draft.step) && <div className="tencent-teaching-prompt"><strong>请在网页中单击：{labels[draft.step]}</strong><p>{draft.step === "dateHeader" ? "选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。" : draft.step === "label" ? "选择一处固定的文字标志，用于确认每次填写的仍是这个项目。" : "只选中单元格即可，不需要输入数据。已有数据的格子也可用于示范。"}</p><button className="primary" onClick={() => call("capture")}>记住当前选中的单元格</button></div>}
      {draft.step === "preview" && <button className="primary" onClick={() => call("preview")}>验证规则并查看第三个位置</button>}
      {draft.step === "confirm" && draft.rule && draft.prediction && <div className="tencent-teaching-prompt"><strong>{label}：{direction(draft.rule)}</strong><p>程序已选中 {draft.prediction.date} 的预测位置 <b>{draft.prediction.address}</b>。请查看网页，确认它确实是当天的填报格。</p><p>日期及“{draft.rule.labelAnchor.expected}”已通过只读校验。</p>{(draft.sheetMode === "fixed" || (!draft.sheetMode && fixedSheet)) && !draft.rule.dateAnchor.format.includes("{yyyy}") && <p>日期未包含完整年月。此固定工作表跨月时需重新示范确认。</p>}<div className="tencent-sheet-actions"><button className="secondary" onClick={() => call("preview")}>再次定位预测位置</button><button className="primary" onClick={() => call("confirm")}>位置正确，保存此项目</button></div></div>}
      <button className="ghost" onClick={() => call("cancel")}>取消示范，保留原配置</button>
    </>}
  </fieldset>;
}
