import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { invoke } from "./bridge";
import type { AutomationTaskCreateProps } from "./automationTaskTypes";

export function DailyReportCreateWizard({ onCreated, onBack, onCancel }: AutomationTaskCreateProps) {
  const [step, setStep] = useState<2 | 3>(2);
  const [name, setName] = useState("日报任务");
  const [sendTime, setSendTime] = useState("17:30");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function create() {
    setBusy(true);
    setError("");
    try {
      const result = await invoke<{ id: string }>("daily.create", { name: name.trim(), sendTime });
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
      <div><h3>基本信息</h3><p>名称用于在自动化任务列表中识别这份日报。</p></div>
      <label>任务名称<input value={name} autoFocus onChange={event => setName(event.target.value)} /></label>
      <div className="dialog-actions"><button className="ghost" onClick={onBack}><ArrowLeft />返回选择类型</button><button className="primary" disabled={!name.trim()} onClick={() => setStep(3)}>下一步</button></div>
    </div> : <div className="automation-create-step">
      <div><h3>日报必要配置</h3><p>先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。</p></div>
      <label>每天发送时间<input type="time" value={sendTime} onChange={event => setSendTime(event.target.value)} /></label>
      <div className="automation-create-summary"><span>任务类型</span><strong>日报推送</strong><span>创建后继续</span><strong>消息内容 → 预览与测试</strong></div>
      <div className="dialog-actions"><button className="ghost" disabled={busy} onClick={() => setStep(2)}><ArrowLeft />上一步</button><button className="secondary" disabled={busy} onClick={onCancel}>取消</button><button className="primary" disabled={busy || !sendTime} onClick={create}>{busy && <LoaderCircle className="spin" />}创建任务</button></div>
    </div>}
  </>;
}

function WizardProgress({ current }: { current: number }) {
  return <ol className="automation-create-progress" aria-label="新建任务进度">
    <li className="done">1 选择类型</li><li className={current === 2 ? "current" : "done"}>2 基本信息</li><li className={current === 3 ? "current" : ""}>3 必要配置</li>
  </ol>;
}
