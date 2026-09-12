import { useEffect, useState } from "react";
import { invoke } from "./bridge";
import { ChoicePicker } from "./FormPickers";

type Binding = { frame: string[]; strategies: unknown[]; sampleText: string; evidence?: unknown };
type Profile = { id?: string; revision?: number; name: string; siteType: "TencentDocs"; sampleUrl?: string; controls: { sheetTab?: Binding; cellAddressBox?: Binding } };
type Reply = { profile?: Profile; message: string; count?: number; token?: string; steps?: { label: string; detail: string }[] };
const controls = [{ key: "sheetTab", title: "① Sheet 标签", prompt: "请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。" }, { key: "cellAddressBox", title: "② 单元格名称框", prompt: "请点击左上角显示当前单元格地址的位置。" }] as const;

export function TencentSiteProfiles({ value, documentUrl, disabled, allowLegacy = false, onChange, onActive }: {
  value: string; documentUrl: string; disabled: boolean; allowLegacy?: boolean;
  onChange: (id: string) => void; onActive: (active: boolean) => void;
}) {
  const [profiles, setProfiles] = useState<Profile[]>([]), [draft, setDraft] = useState<Profile>();
  const [url, setUrl] = useState(""), [opened, setOpened] = useState(false), [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(""), [failed, setFailed] = useState(false), [token, setToken] = useState("");
  const [steps, setSteps] = useState<Reply["steps"]>([]);
  const reload = () => invoke<{ profiles: Profile[] }>("tencentSite.list").then(result => setProfiles(result.profiles ?? []));
  useEffect(() => { reload().catch(error => { setFailed(true); setNotice(String(error)); }); }, []);
  function invalidate() { setToken(""); setSteps([]); }
  function begin(profile?: Profile) {
    setDraft(profile ? structuredClone(profile) : { name: "腾讯共享表格", siteType: "TencentDocs", controls: {} });
    setUrl(documentUrl || profile?.sampleUrl || ""); setOpened(false); setNotice(""); setFailed(false); invalidate(); onActive(true);
  }
  async function run(operation: "open" | "pick" | "test" | "save", key?: string) {
    if (!draft) return;
    setBusy(key ?? operation); setFailed(false); setNotice(key ? controls.find(control => control.key === key)!.prompt : "正在操作…");
    const savedToken = token;
    if (operation !== "save") invalidate();
    try {
      const reply = await invoke<Reply>(`tencentSite.${operation}`, { profile: draft, documentUrl: url, key, token: savedToken }, 300000);
      setNotice(reply.message);
      if (operation === "open") setOpened(true);
      if (operation === "pick" && reply.profile) setDraft({ ...reply.profile, id: draft.id, revision: draft.revision });
      if (operation === "test") { setToken(reply.token ?? ""); setSteps(reply.steps); }
      if (operation === "save" && reply.profile?.id) {
        await reload(); setDraft(undefined); onActive(false); onChange(reply.profile.id);
      }
    } catch (error) { setFailed(true); setNotice(error instanceof Error ? error.message : String(error)); invalidate(); }
    finally { setBusy(""); }
  }
  const selected = profiles.find(profile => profile.id === value);
  return <section className="tencent-site-profiles tencent-sheet-panel" aria-label="网页适配配置" aria-busy={!!busy}>
    <div><h3>网页适配配置</h3><p className="tencent-sheet-help">相同网页控件录制一次，多份文档复用。具体填报位置由每份文档单独示范。</p></div>
    {!draft ? <>
      <label>选择网页适配<ChoicePicker value={value} options={[...(allowLegacy ? [{ value: "", label: "本任务已有控件配置（兼容）" }] : []), ...profiles.map(profile => ({ value: profile.id!, label: profile.name }))]} placeholder="请选择适配，或新建腾讯文档适配" disabled={disabled} ariaLabel="选择网页适配" onChange={onChange} /></label>
      <div className="tencent-sheet-actions"><button className="secondary" disabled={disabled} onClick={() => begin()}>新建腾讯文档适配</button>{selected && <button className="secondary" disabled={disabled} onClick={() => begin(selected)}>重新录制此适配</button>}</div>
    </> : <>
      <fieldset className="tencent-site-fields" disabled={disabled || !!busy}>
        <div className="tencent-sheet-grid"><label>适配名称<input value={draft.name} maxLength={80} onChange={event => { setDraft({ ...draft, name: event.target.value }); invalidate(); }} /></label><label>用于配置的文档地址<input type="url" value={url} placeholder="https://docs.qq.com/sheet/..." onChange={event => { setUrl(event.target.value); setOpened(false); invalidate(); }} /></label></div>
        <p className="tencent-sheet-help">这份文档用于录制和测试公共控件；后续可以换另一份文档使用同一适配。</p>
        <button className="primary" disabled={!draft.name.trim() || !url.trim()} onClick={() => run("open")}>{opened ? "重新打开配置文档" : "开始配置"}</button>
        <div className="tencent-site-recording">
          <div className="tencent-site-controls">{controls.map(control => <div key={control.key}><strong>{control.title}</strong><span className="tencent-control-state">{draft.controls[control.key] ? "已录制" : "未配置"}</span><button className="secondary" disabled={!opened} onClick={() => run("pick", control.key)}>录制{control.key === "sheetTab" ? " Sheet 标签" : "单元格名称框"}</button></div>)}</div>
          <div className="tencent-site-instructions"><strong>{busy === "sheetTab" || busy === "cellAddressBox" ? "正在等待网页点选" : "控件录制模式"}</strong><p>点击左侧录制按钮后，在打开的浏览器中选择控件。鼠标悬停时高亮，点击只记录位置，不执行页面原动作。按 Esc 取消。</p><p>Sheet 标签按集合识别，切换月份不必重新录制。登录提示自动发现，无需录制。</p></div>
        </div>
        {!!steps?.length && <ol className="tencent-site-results">{steps.map(step => <li key={step.label}><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol>}
        <p className="tencent-sheet-help">测试会切换到录制时的工作表，并通过名称框定位 J9。不会向业务单元格填写数值。全部通过后才可保存。</p>
        {draft.id && <p className="tencent-sheet-help">保存更新后，引用此适配的文档会使用新控件规则，各自的业务填报位置保持不变。</p>}
        <div className="tencent-sheet-actions"><button className="secondary" disabled={!opened || !draft.controls.sheetTab || !draft.controls.cellAddressBox} onClick={() => run("test")}>测试适配</button><button className="primary" disabled={!token} onClick={() => run("save")}>保存适配配置</button><button className="secondary" onClick={() => { setDraft(undefined); onActive(false); invalidate(); setNotice(""); }}>取消</button></div>
      </fieldset>
    </>}
    {notice && <div className={`notice ${failed ? "error" : "info"}`} role={failed ? "alert" : "status"}>{notice}</div>}
  </section>;
}
