import { useEffect, useState } from "react";
import { CheckCircle2, Database, LoaderCircle, Server, ShieldCheck } from "lucide-react";
import { invoke } from "./bridge";
import { ReportDatePicker } from "./FormPickers";
import type { NotionFillJobDetail, NotionFillRunNowResult, NotionFillSourceTestResult, NotionFillTestResult } from "./types";
import type { AutomationTaskEditorProps } from "./automationTaskTypes";

type NoticeValue = { tone: string; title: string; message: string };

const yesterday = () => {
  const value = new Date();
  value.setDate(value.getDate() - 1);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
};

export function NotionFillTaskEditor({ id, section, changed }: AutomationTaskEditorProps) {
  const [job, setJob] = useState<NotionFillJobDetail>();
  const [name, setName] = useState("");
  const [sourcePageUrl, setSourcePageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testDate, setTestDate] = useState(yesterday);
  const [testResult, setTestResult] = useState<NotionFillTestResult>();
  const [sourceResult, setSourceResult] = useState<NotionFillSourceTestResult>();
  const [notice, setNotice] = useState<NoticeValue>();
  const [confirmRun, setConfirmRun] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [busy, setBusy] = useState("");

  const load = () => invoke<NotionFillJobDetail>("notionFill.get", { id }).then(value => {
    setJob(value);
    setName(value.name);
    setSourcePageUrl(value.sourcePageUrl);
    setUsername(value.username);
  });

  useEffect(() => { load().catch(showError); }, [id]);

  function showError(error: unknown) {
    setNotice({ tone: "error", title: "操作失败", message: error instanceof Error ? error.message : String(error) });
  }

  async function save() {
    setBusy("save");
    setNotice(undefined);
    try {
      await invoke("notionFill.save", { id, name, sourcePageUrl, username, password });
      setPassword("");
      await load();
      changed();
      setNotice({ tone: "success", title: "配置已保存", message: "测试通过后即可返回任务列表启用。" });
    } catch (error) { showError(error); }
    finally { setBusy(""); }
  }

  async function test() {
    setBusy("test");
    setNotice(undefined);
    setTestResult(undefined);
    setConfirmRun(false);
    try {
      await invoke("notionFill.save", { id, name, sourcePageUrl, username, password });
      setPassword("");
      const result = await invoke<NotionFillTestResult>("notionFill.test", { id, businessDate: testDate }, 120000);
      setTestResult(result);
      await load();
      changed();
      setNotice({ tone: "success", title: "只读测试通过", message: result.message });
    } catch (error) { showError(error); }
    finally { setBusy(""); }
  }

  async function testSource() {
    setBusy("source-test");
    setNotice(undefined);
    setSourceResult(undefined);
    try {
      await invoke("notionFill.save", { id, name, sourcePageUrl, username, password });
      setPassword("");
      const result = await invoke<NotionFillSourceTestResult>("notionFill.testSource", { id, businessDate: testDate }, 120000);
      setSourceResult(result);
      await load();
      changed();
      setNotice({ tone: "success", title: "93 系统读取成功", message: result.message });
    } catch (error) {
      setNotice({ tone: "error", title: "93 系统读取失败", message: error instanceof Error ? error.message : String(error) });
    }
    finally { setBusy(""); }
  }

  async function runNow() {
    setBusy("run");
    setNotice(undefined);
    try {
      const result = await invoke<NotionFillRunNowResult>("notionFill.runNow", { id, businessDate: testDate }, 120000);
      setConfirmRun(false);
      setTestResult(current => current ? { ...current, targetRecordExists: true, message: result.message } : current);
      if (result.created) setCreatedDate(testDate);
      changed();
      const repeatedAfterCreate = !result.created && createdDate === testDate;
      setNotice({
        tone: "success",
        title: result.created ? "Notion 写入成功" : repeatedAfterCreate ? "重复执行验证通过" : "目标记录已存在",
        message: repeatedAfterCreate ? `首次写入已成功；${result.message}` : result.message,
      });
    } catch (error) { showError(error); }
    finally { setBusy(""); }
  }

  if (!job) return <div className="page daily-page"><LoaderCircle className="spin page-loader" /></div>;
  return <div className="page daily-page notion-fill-page automation-task-panel">
    {notice && <div className={`notice ${notice.tone}`} role="status"><div><strong>{notice.title}</strong><span>{notice.message}</span></div></div>}
    {!job.notionConfigured && section !== "basics" && <div className="notice warning" role="status"><div><strong>Notion 连接未就绪</strong><span>请先在“设置 → Notion 连接”中保存并测试 Token，然后再执行只读测试。</span></div></div>}
    {section === "basics" && <section className="surface notion-fill-card" id="basics"><div className="notion-fill-heading"><Server /><div><h2>基本信息</h2><p>名称用于在自动化任务列表中识别当前任务。</p></div></div>
        <div className="notion-fill-fields"><label>任务名称<input value={name} onChange={event => { setName(event.target.value); setTestResult(undefined); }} /></label></div>
        <div className="notion-fill-actions"><button className="secondary" disabled={!!busy || !name.trim() || !username.trim() || (!password && !job.passwordConfigured)} onClick={save}>{busy === "save" && <LoaderCircle className="spin" />}保存配置</button></div>
      </section>}
      {section === "configuration" && <section className="surface notion-fill-card" id="configuration"><div className="notion-fill-heading"><Server /><div><h2>93 系统连接</h2><p>连接配置由当前任务保存，密码只保留 Windows 加密值。</p></div></div>
        <div className="notion-fill-fields"><label>93 系统服务器<input value={job.baseUrl} disabled /></label><label className="notion-fill-wide-field">材料入库业务页面<input type="url" value={sourcePageUrl} placeholder="http://服务器/业务页面" onChange={event => { setSourcePageUrl(event.target.value); setTestResult(undefined); }} /></label><label>用户名<input autoComplete="username" value={username} onChange={event => { setUsername(event.target.value); setTestResult(undefined); }} /></label><label>密码<input type="password" autoComplete="current-password" value={password} placeholder={job.passwordConfigured ? "已保存；留空表示不修改" : "请输入93系统密码"} onChange={event => { setPassword(event.target.value); setTestResult(undefined); }} /></label></div>
        <div className="notion-fill-subsection"><div className="notion-fill-heading"><Database /><div><h2>固定填报目标</h2><p>当前任务只支持已确认的原材料入库日汇总，不提供通用字段映射。</p></div></div>
        <dl className="notion-fill-contract"><div><dt>目标数据库</dt><dd>{job.targetDataSourceName}</dd></div><div><dt>字段</dt><dd>业务、日期、板材、型材</dd></div><div><dt>写入方式</dt><dd>按日期查重，仅新增，不覆盖</dd></div><div><dt>执行计划</dt><dd>{job.schedule}</dd></div></dl>
        </div><div className="notion-fill-actions"><button className="secondary" disabled={!!busy || !name.trim() || !username.trim() || (!password && !job.passwordConfigured)} onClick={save}>{busy === "save" && <LoaderCircle className="spin" />}保存任务配置</button></div>
      </section>}
    {section === "execution" && <section className="surface notion-fill-card notion-fill-test" id="execution"><div className="notion-fill-heading"><ShieldCheck /><div><h2>运行与测试</h2><p>读取指定日期的 93 数据并检查 Notion 是否已有记录；只有二次确认后才会写入。</p></div></div>
      <div className="notion-fill-testbar"><label>测试业务日期<ReportDatePicker value={testDate} onChange={value => { setTestDate(value); setTestResult(undefined); setSourceResult(undefined); setConfirmRun(false); setCreatedDate(""); }} /></label><div className="notion-fill-test-actions"><button className="secondary" disabled={!!busy || !name.trim() || !username.trim() || (!password && !job.passwordConfigured)} onClick={testSource}>{busy === "source-test" ? <LoaderCircle className="spin" /> : <Server />}仅测试 93 读取</button><button className="primary" disabled={!!busy || !job.notionConfigured || !name.trim() || !username.trim() || (!password && !job.passwordConfigured)} onClick={test}>{busy === "test" ? <LoaderCircle className="spin" /> : <ShieldCheck />}测试读取与查重</button></div></div>
      {sourceResult && <div className="notion-fill-result"><div><span>板材</span><strong>{sourceResult.plateWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><div><span>型材</span><strong>{sourceResult.sectionWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><div><span>合计</span><strong>{sourceResult.totalWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><p><CheckCircle2 />93 系统读取成功，本次未访问 Notion</p></div>}
      {testResult && <div className="notion-fill-result"><div><span>板材</span><strong>{testResult.plateWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><div><span>型材</span><strong>{testResult.sectionWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><div><span>合计</span><strong>{testResult.totalWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨</strong></div><p><CheckCircle2 />{testResult.targetRecordExists ? "目标日期已有记录，正式任务将跳过" : "目标日期暂无记录，可以新增"}</p></div>}
      {testResult && !confirmRun && <div className="notion-fill-write-action"><button className="danger" disabled={!!busy} onClick={() => setConfirmRun(true)}>{busy === "run" && <LoaderCircle className="spin" />}{testResult.targetRecordExists ? "再次执行验证查重" : "执行本日期"}</button><span>正式执行会重新读取并查重；仅在目标日期不存在时新增。</span></div>}
      {testResult && confirmRun && <div className="notice warning notion-fill-confirm" role="alert"><div><strong>确认正式执行 {testDate}？</strong><span>{testResult.targetRecordExists ? "当前检测到已有记录，执行应只产生跳过记录。" : `将向“${job.targetDataSourceName}”新增板材 ${testResult.plateWeight} 吨、型材 ${testResult.sectionWeight} 吨。`}</span></div><div className="notion-fill-confirm-actions"><button className="secondary" disabled={!!busy} onClick={() => setConfirmRun(false)}>取消</button><button className="danger" disabled={!!busy} onClick={runNow}>{busy === "run" && <LoaderCircle className="spin" />}确认执行</button></div></div>}
    </section>}
  </div>;
}
