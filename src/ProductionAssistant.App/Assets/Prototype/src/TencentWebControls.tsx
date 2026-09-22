import { useState } from "react";
import { invoke } from "./bridge";

type Binding = { frame: string[]; strategies: unknown[]; sampleText: string; evidence?: unknown };
export type WebControls = { sheetTab?: Binding; cellAddressBox?: Binding; cellEditor?: Binding; saveStatus?: Binding };
type TestCell = { sheet: string; address: string };
type Reply = { controls?: WebControls; message: string; count?: number; token?: string; passed?: boolean; sheetRequired?: boolean; testCell?: TestCell | null; steps?: { label: string; detail: string; names?: string[] }[] };
const controls = [{ key: "sheetTab", title: "① Sheet 标签", prompt: "请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。" }, { key: "cellAddressBox", title: "② 单元格名称框", prompt: "先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。" }, { key: "cellEditor", title: "③ 内容编辑区／公式栏", prompt: "请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。" }, { key: "saveStatus", title: "④ 保存状态（可选）", prompt: "请点击保存状态控件的位置，无需等待特定文字。" }] as const;

export function TencentWebControls({ id, value, disabled, onSaved, onActive }: {
  id: string; value?: WebControls; disabled: boolean;
  onSaved: () => Promise<void>; onActive: (active: boolean) => void;
}) {
  const [draft, setDraft] = useState<WebControls>();
  const [opened, setOpened] = useState(false), [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(""), [failed, setFailed] = useState(false), [token, setToken] = useState("");
  const [steps, setSteps] = useState<Reply["steps"]>([]);
  const [sheetCheck, setSheetCheck] = useState<Reply>();
  const [testCell, setTestCell] = useState<TestCell>();
  function invalidate() { setToken(""); setSteps([]); }
  function begin() {
    setDraft(structuredClone(value ?? {}));
    setOpened(false); setNotice(""); setFailed(false); setSheetCheck(undefined); setTestCell(undefined); invalidate(); onActive(true);
  }
  async function run(operation: "open" | "pick" | "testSheet" | "captureCell" | "test" | "save", key?: string) {
    if (!draft) return;
    setBusy(key ?? operation); setFailed(false); setNotice(key ? controls.find(control => control.key === key)!.prompt : "正在操作…");
    const savedToken = token;
    if (operation !== "save") invalidate();
    if (operation === "open" || operation === "testSheet" || key === "sheetTab") setSheetCheck(undefined);
    if (operation === "open" || operation === "testSheet" || operation === "captureCell" || key === "sheetTab" || key === "cellAddressBox") setTestCell(undefined);
    try {
      let reply = await invoke<Reply>(`tencentSite.${operation}`, { id, controls: draft, key, token: savedToken }, 300000);
      if (operation === "pick" && key === "sheetTab") {
        if (reply.controls) setDraft(reply.controls);
        setBusy("testSheet"); setNotice("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…");
        reply = await invoke<Reply>("tencentSite.testSheet", { id, controls: reply.controls ?? draft }, 300000);
      }
      setNotice(reply.message);
      setFailed(reply.passed === false);
      if (operation === "open") setOpened(true);
      if (reply.controls) setDraft(reply.controls);
      if ("testCell" in reply) setTestCell(reply.testCell ?? undefined);
      if (operation === "testSheet" || key === "sheetTab") setSheetCheck(reply);
      if (reply.sheetRequired) { setSheetCheck({ passed: false, message: reply.message }); setTestCell(undefined); }
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
          <div className="tencent-site-controls">{controls.map(control => <div key={control.key}><strong>{control.title}</strong><span className="tencent-control-state">{control.key === "sheetTab" && sheetCheck?.passed ? "已录制 · 检验通过" : draft[control.key] ? "已录制" : "未配置"}{control.key === "saveStatus" && draft.saveStatus ? ` · ${draft.saveStatus.sampleText}` : ""}</span><button className="secondary" disabled={!opened || (control.key !== "sheetTab" && !sheetCheck?.passed) || (control.key === "cellEditor" && !testCell)} onClick={() => run("pick", control.key)}>录制{control.key === "sheetTab" ? " Sheet 标签" : control.key === "cellEditor" ? "内容编辑区" : control.key === "saveStatus" ? "保存状态" : "单元格名称框"}</button>{control.key === "sheetTab" && draft.sheetTab && <button className="secondary" disabled={!opened} onClick={() => run("testSheet")}>重新检验 Sheet</button>}{control.key === "saveStatus" && draft.saveStatus && <button className="secondary" onClick={() => { const next = { ...draft }; delete next.saveStatus; setDraft(next); invalidate(); }}>移除保存状态</button>}</div>)}</div>
          <div className="tencent-site-instructions"><strong>{controls.some(control => control.key === busy) ? "正在等待网页点选" : busy === "testSheet" ? "正在检验 Sheet" : "控件录制模式"}</strong><p>先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。</p><p>录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。</p>
            {sheetCheck && <div className={`notice tencent-sheet-check ${sheetCheck.passed ? "info" : "error"}`} role={sheetCheck.passed ? "status" : "alert"}><strong>{sheetCheck.passed ? "Sheet 检验通过" : "Sheet 检验未通过"}</strong><ol className="tencent-site-results">{sheetCheck.steps?.map(step => <li key={step.label}><strong>{step.label}</strong><span>{step.detail}</span>{step.names && <details><summary>查看全部 Sheet 名称</summary><ul>{step.names.map((name, index) => <li key={`${index}:${name}`}>{name}</li>)}</ul></details>}</li>)}</ol>{!sheetCheck.passed && <p>{sheetCheck.message}</p>}</div>}
            {sheetCheck?.passed && <div className="tencent-sheet-guidance tencent-test-cell" role="status"><strong>{testCell ? `临时测试格：${testCell.sheet}!${testCell.address}` : "请选择一个可编辑的空白格"}</strong><p>{testCell ? "此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。" : "在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}</p><button className="secondary" disabled={!opened || !draft.cellAddressBox} onClick={() => run("captureCell")}>读取当前测试格</button></div>}
          </div>
        </div>
        {!!steps?.length && <ol className="tencent-site-results">{steps.map(step => <li key={step.label}><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol>}
        <p className="tencent-sheet-help">录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。</p>
        <p className="tencent-sheet-help">保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。</p>
        <div className="tencent-sheet-actions"><button className="secondary" disabled={!opened || !sheetCheck?.passed || !testCell || !draft.cellAddressBox || !draft.cellEditor} onClick={() => run("test")}>检验单元格控件</button><button className="primary" disabled={!token} onClick={() => run("save")}>保存网页控件</button><button className="secondary" onClick={() => { setDraft(undefined); setSheetCheck(undefined); setTestCell(undefined); onActive(false); invalidate(); setNotice(""); }}>取消</button></div>
      </fieldset>
    </>}
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}>{notice}</div>}
  </fieldset>;
}
