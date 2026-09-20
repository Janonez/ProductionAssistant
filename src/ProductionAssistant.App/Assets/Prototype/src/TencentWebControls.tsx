import { useState } from "react";
import { invoke } from "./bridge";

type Binding = { frame: string[]; strategies: unknown[]; sampleText: string; evidence?: unknown };
export type WebControls = { sheetTab?: Binding; cellAddressBox?: Binding; cellEditor?: Binding; saveStatus?: Binding };
type Reply = { controls?: WebControls; message: string; count?: number; token?: string; steps?: { label: string; detail: string }[] };
const controls = [{ key: "sheetTab", title: "① Sheet 标签", prompt: "请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。" }, { key: "cellAddressBox", title: "② 单元格名称框", prompt: "请点击左上角显示当前单元格地址的位置。" }, { key: "cellEditor", title: "③ 内容编辑区／公式栏", prompt: "请点击可以读取和输入单元格内容的编辑区，不要选择名称框。" }, { key: "saveStatus", title: "④ 保存状态（可选）", prompt: "请点击显示“已保存”“最近保存”或“上次修改时间”的状态控件。" }] as const;

export function TencentWebControls({ id, value, disabled, onSaved, onActive }: {
  id: string; value?: WebControls; disabled: boolean;
  onSaved: () => Promise<void>; onActive: (active: boolean) => void;
}) {
  const [draft, setDraft] = useState<WebControls>();
  const [opened, setOpened] = useState(false), [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(""), [failed, setFailed] = useState(false), [token, setToken] = useState("");
  const [steps, setSteps] = useState<Reply["steps"]>([]);
  function invalidate() { setToken(""); setSteps([]); }
  function begin() {
    setDraft(structuredClone(value ?? {}));
    setOpened(false); setNotice(""); setFailed(false); invalidate(); onActive(true);
  }
  async function run(operation: "open" | "pick" | "test" | "save", key?: string) {
    if (!draft) return;
    setBusy(key ?? operation); setFailed(false); setNotice(key ? controls.find(control => control.key === key)!.prompt : "正在操作…");
    const savedToken = token;
    if (operation !== "save") invalidate();
    try {
      const reply = await invoke<Reply>(`tencentSite.${operation}`, { id, controls: draft, key, token: savedToken }, 300000);
      setNotice(reply.message);
      if (operation === "open") setOpened(true);
      if (reply.controls) setDraft(reply.controls);
      if (operation === "test") { setToken(reply.token ?? ""); setSteps(reply.steps); }
      if (operation === "save") {
        await onSaved(); setDraft(undefined); onActive(false);
      }
    } catch (error) { setFailed(true); setNotice(error instanceof Error ? error.message : String(error)); invalidate(); }
    finally { setBusy(""); }
  }
  return <fieldset className="tencent-web-controls tencent-sheet-panel" aria-busy={!!busy} disabled={disabled}>
    <legend>网页控件</legend><p className="tencent-sheet-help">记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在下方独立配置。</p>
    {!draft ? <>
      <p>{controls.map(control => `${control.title}：${value?.[control.key] ? "已录制" : control.key === "saveStatus" ? "未配置" : "待录制"}`).join("　")}</p>
      <button className="secondary" onClick={begin}>{value ? "重新录制网页控件" : "录制网页控件"}</button>
    </> : <>
      <fieldset className="tencent-site-fields" disabled={disabled || !!busy}>
        <button className="primary" onClick={() => run("open")}>{opened ? "重新打开配置文档" : "开始配置"}</button>
        <div className="tencent-site-recording">
          <div className="tencent-site-controls">{controls.map(control => <div key={control.key}><strong>{control.title}</strong><span className="tencent-control-state">{draft[control.key] ? "已录制" : "未配置"}{control.key === "saveStatus" && draft.saveStatus ? ` · ${draft.saveStatus.sampleText}` : ""}</span><button className="secondary" disabled={!opened} onClick={() => run("pick", control.key)}>录制{control.key === "sheetTab" ? " Sheet 标签" : control.key === "cellEditor" ? "内容编辑区" : control.key === "saveStatus" ? "保存状态" : "单元格名称框"}</button>{control.key === "saveStatus" && draft.saveStatus && <button className="secondary" onClick={() => { const next = { ...draft }; delete next.saveStatus; setDraft(next); invalidate(); }}>移除保存状态</button>}</div>)}</div>
          <div className="tencent-site-instructions"><strong>{controls.some(control => control.key === busy) ? "正在等待网页点选" : "控件录制模式"}</strong><p>点击左侧录制按钮后，在打开的浏览器中选择控件。鼠标悬停时高亮，点击只记录位置，不执行页面原动作。按 Esc 取消。</p><p>录制时先识别标签集合；测试时自动切换两个标签并切回，学习选中状态。登录提示自动发现，无需录制。</p></div>
        </div>
        {!!steps?.length && <ol className="tencent-site-results">{steps.map(step => <li key={step.label}><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol>}
        <p className="tencent-sheet-help">测试会在两个标签间切换、学习选中状态，再切回录制标签并定位 J9。保存状态仅检查当前提示，不触发保存。不会向业务单元格填写数值。全部通过后才可保存。</p>
        <p className="tencent-sheet-help">保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。</p>
        <div className="tencent-sheet-actions"><button className="secondary" disabled={!opened || !draft.sheetTab || !draft.cellAddressBox || !draft.cellEditor} onClick={() => run("test")}>测试网页控件</button><button className="primary" disabled={!token} onClick={() => run("save")}>保存网页控件</button><button className="secondary" onClick={() => { setDraft(undefined); onActive(false); invalidate(); setNotice(""); }}>取消</button></div>
      </fieldset>
    </>}
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}>{notice}</div>}
  </fieldset>;
}
