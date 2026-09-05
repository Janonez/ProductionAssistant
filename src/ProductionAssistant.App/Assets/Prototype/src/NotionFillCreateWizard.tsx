import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";

export function NotionFillCreateWizard({ onCreated, onBack, onCancel }: AutomationTaskCreateProps) {
  const [step, setStep] = useState<2 | 3>(2);
  const [name, setName] = useState("原材料入库自动填报");
  const [sourcePageUrl, setSourcePageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function create() {
    setBusy(true);
    setError("");
    try {
      const result = await invoke<{ id: string }>("notionFill.create", {
        name: name.trim(), sourcePageUrl: sourcePageUrl.trim(), username: username.trim(), password,
      });
      await onCreated(result);
    } catch (value) {
      setError(value instanceof Error ? value.message : String(value));
    } finally {
      setBusy(false);
    }
  }

  return <>
    <WizardProgress current={step} />
    {error && <div className="notice error" role="alert"><div><strong>创建失败</strong><span>{error}</span></div></div>}
    {step === 2 ? <div className="automation-create-step">
      <div><h3>基本信息</h3><p>名称用于在自动化任务列表中识别这份填报任务。</p></div>
      <label>任务名称<input value={name} autoFocus onChange={event => setName(event.target.value)} /></label>
      <div className="dialog-actions"><button className="ghost" onClick={onBack}><ArrowLeft />返回选择类型</button><button className="primary" disabled={!name.trim()} onClick={() => setStep(3)}>下一步</button></div>
    </div> : <div className="automation-create-step">
      <div><h3>93 系统连接</h3><p>凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。</p></div>
      <label>材料入库业务页面<input type="url" value={sourcePageUrl} placeholder="http://服务器/业务页面" autoFocus onChange={event => setSourcePageUrl(event.target.value)} /></label>
      <label>93 系统用户名<input value={username} autoComplete="username" onChange={event => setUsername(event.target.value)} /></label>
      <label>93 系统密码<input type="password" value={password} autoComplete="new-password" onChange={event => setPassword(event.target.value)} /></label>
      <div className="automation-create-summary"><span>填报目标</span><strong>原材料入库数据库</strong><span>执行时间</span><strong>每天 00:00 · 填报前一天</strong><span>写入方式</span><strong>按日期查重，仅新增</strong></div>
      <div className="dialog-actions"><button className="ghost" disabled={busy} onClick={() => setStep(2)}><ArrowLeft />上一步</button><button className="secondary" disabled={busy} onClick={onCancel}>取消</button><button className="primary" disabled={busy || !sourcePageUrl.trim() || !username.trim() || !password} onClick={create}>{busy && <LoaderCircle className="spin" />}创建任务</button></div>
    </div>}
  </>;
}

function WizardProgress({ current }: { current: number }) {
  return <ol className="automation-create-progress" aria-label="新建任务进度">
    <li className="done">1 选择类型</li><li className={current === 2 ? "current" : "done"}>2 基本信息</li><li className={current === 3 ? "current" : ""}>3 必要配置</li>
  </ol>;
}
