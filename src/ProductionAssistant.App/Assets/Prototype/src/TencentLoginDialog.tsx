import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, LoaderCircle, X } from "lucide-react";
import { invoke } from "./bridge";

type LoginState = { state: "loading" | "consent" | "waiting" | "scanned" | "expired" | "failed" | "success"; qr?: string; message?: string };
// One desktop worker owns the profile. Route cleanup must finish before the next dialog starts.
let loginRequests: Promise<unknown> = Promise.resolve();
const copy = {
  loading: ["正在准备二维码", "正在连接腾讯文档，请稍候。"],
  consent: ["确认腾讯文档登录协议", "继续前，请阅读腾讯文档的服务协议与隐私政策。"],
  waiting: ["请使用企业微信扫一扫", "打开手机企业微信，扫描上方二维码。"],
  scanned: ["已扫码，请在手机上确认", "确认后将检查目标文档是否可访问。"],
  expired: ["二维码已过期", "刷新后，使用企业微信重新扫码。"],
  failed: ["暂时无法完成登录", "请检查网络连接后重试。"],
  success: ["登录完成", "已连接腾讯文档，可以继续识别并检查。"],
};

export function TencentLoginDialog({ id, onClose }: { id: string; onClose: (loggedIn: boolean) => void }) {
  const [result, setResult] = useState<LoginState>({ state: "loading" });
  const [busy, setBusy] = useState(true), [closing, setClosing] = useState(false);
  const [agreementError, setAgreementError] = useState("");
  const actions = useRef<{ run: (stage: string) => void; close: () => void } | undefined>(undefined);
  const closeCallback = useRef(onClose); closeCallback.current = onClose;
  useEffect(() => {
    const sessionToken = crypto.randomUUID();
    let disposed = false, stopping = false, success = false, timer: ReturnType<typeof setTimeout> | undefined;
    let loadingSince: number | undefined = Date.now();
    const call = (stage: string) => {
      const request = loginRequests.then(() => invoke<LoginState>("tencentSheet.login", { id, sessionToken, stage }, 300000));
      loginRequests = request.catch(() => {});
      return request;
    };
    const run = (stage: string) => {
      clearTimeout(timer);
      if (stage !== "poll") { loadingSince = Date.now(); setResult({ state: "loading" }); }
      setBusy(true);
      void (async () => {
        try {
          const next = await call(stage);
          if (disposed || stopping) return;
          if (next.state === "loading") {
            loadingSince ??= Date.now();
            if (Date.now() - loadingSince > 45000) throw new Error("暂时无法确认登录状态或加载企业微信二维码，请刷新重试，或打开文档检查登录页面。");
          } else loadingSince = undefined;
          success = next.state === "success";
          setResult(next);
          if (["loading", "waiting", "scanned"].includes(next.state)) timer = setTimeout(() => run("poll"), 1200);
        } catch (error) {
          if (!disposed && !stopping) setResult({ state: "failed", message: error instanceof Error ? error.message : String(error) });
        } finally { if (!disposed) setBusy(false); }
      })();
    };
    actions.current = { run, close: () => {
      if (stopping) return;
      stopping = true; clearTimeout(timer); setClosing(true);
      void call("cancel").then(() => { if (!disposed) closeCallback.current(success); }).catch(error => {
        if (!disposed) { stopping = false; setClosing(false); setResult({ state: "failed", message: `关闭登录会话失败：${error instanceof Error ? error.message : String(error)}` }); }
      });
    } };
    run("start");
    return () => { disposed = true; clearTimeout(timer); if (!stopping) void call("cancel").catch(() => {}); };
  }, [id]);
  async function openAgreement(kind: "service" | "privacy") {
    setAgreementError("");
    try { await invoke("tencentSheet.loginAgreement", { kind }); }
    catch (error) { setAgreementError(error instanceof Error ? error.message : String(error)); }
  }
  const [heading, hint] = copy[result.state];
  return <Dialog.Root open onOpenChange={open => { if (!open) actions.current?.close(); }}><Dialog.Portal>
    <Dialog.Overlay className="dialog-overlay" />
    <Dialog.Content className="tencent-login-dialog" onPointerDownOutside={event => event.preventDefault()}>
      <div className="tencent-login-header"><Dialog.Title>登录腾讯文档</Dialog.Title><button className="secondary" aria-label="关闭登录弹窗" disabled={closing} onClick={() => actions.current?.close()}><X size={20} /></button></div>
      <div className="tencent-login-method">企业微信扫码</div>
      <div className="tencent-login-qr">{result.state === "waiting" && result.qr ? <img src={result.qr} alt="企业微信登录二维码" /> : result.state === "success" ? <Check size={48} /> : result.state === "loading" ? <LoaderCircle className="spin" size={36} /> : <span>{result.state === "scanned" ? "等待确认" : result.state === "consent" ? "登录协议" : result.state === "expired" ? "已过期" : "请重试"}</span>}</div>
      <div className="tencent-login-status" aria-live="polite"><h3>{heading}</h3><Dialog.Description>{result.message || hint}</Dialog.Description></div>
      {result.state === "consent" && <p className="tencent-login-terms"><a href="https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe" onClick={event => { event.preventDefault(); void openAgreement("service"); }}>服务协议</a><span>与</span><a href="https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940" onClick={event => { event.preventDefault(); void openAgreement("privacy"); }}>隐私政策</a></p>}
      {agreementError && <p role="alert" className="tencent-sheet-help">{agreementError}</p>}
      <button className="primary tencent-login-submit" disabled={busy || closing} onClick={() => result.state === "success" ? actions.current?.close() : actions.current?.run(result.state === "consent" ? "consent" : "refresh")}>{closing ? "正在关闭…" : result.state === "success" ? "完成" : result.state === "consent" ? "同意协议并继续" : result.state === "failed" ? "重新加载" : "刷新二维码"}</button>
      <p className="tencent-sheet-help tencent-login-footnote">关闭弹窗可取消本次登录。已有登录状态会保留。</p>
    </Dialog.Content>
  </Dialog.Portal></Dialog.Root>;
}
