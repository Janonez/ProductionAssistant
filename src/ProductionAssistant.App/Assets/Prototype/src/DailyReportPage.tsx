import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  LoaderCircle,
  MoreHorizontal,
  Plus,
  Send,
  Trash2,
} from "lucide-react";
import { invoke } from "./bridge";
import type {
  DailyField,
  DailyJobDetail,
  DailyJobSummary,
  DailyRun,
} from "./types";
import { ReportTemplateEditor } from "./ReportTemplateEditor";
import { ChoicePicker, ReportDatePicker, TimePicker } from "./FormPickers";

type NoticeValue = { tone: string; title: string; message: string };
const errorNotice = (error: unknown): NoticeValue => ({
  tone: "error",
  title: "操作失败",
  message: error instanceof Error ? error.message : String(error),
});

export function DailyReportPage() {
  const [jobs, setJobs] = useState<DailyJobSummary[]>([]);
  const [jobId, setJobId] = useState("");
  const [focusStep, setFocusStep] = useState("");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState<NoticeValue>();
  const [menu, setMenu] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<DailyJobSummary>();
  const refresh = () =>
    invoke<{ jobs: DailyJobSummary[] }>("daily.list").then((value) =>
      setJobs(value.jobs),
    );
  useEffect(() => {
    refresh().catch((error) => setNotice(errorNotice(error)));
  }, []);

  async function create() {
    setBusy("create");
    try {
      const result = await invoke<{ id: string }>("daily.create");
      setJobId(result.id);
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function toggle(job: DailyJobSummary) {
    setBusy(job.id);
    setNotice(undefined);
    try {
      const result = await invoke<{
        enabled: boolean;
        missingStep?: string;
        message?: string;
      }>("daily.setEnabled", { id: job.id, enabled: !job.isEnabled }, 60000);
      if (result.missingStep) {
        setFocusStep(result.missingStep);
        setJobId(job.id);
        setNotice({
          tone: "warning",
          title: "配置尚未完成",
          message: result.message || "",
        });
      } else await refresh();
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function remove(job: DailyJobSummary) {
    if (job.isEnabled) return;
    setBusy(job.id);
    try {
      await invoke("daily.delete", { id: job.id });
      setDeleteTarget(undefined);
      await refresh();
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  if (jobId)
    return (
      <DailyJobEditor
        id={jobId}
        focusStep={focusStep}
        notice={notice}
        back={() => {
          setJobId("");
          setFocusStep("");
          setNotice(undefined);
          refresh();
        }}
      />
    );
  return (
    <div className="page daily-page">
      <header>
        <div>
          <span className="eyebrow">自动化任务</span>
          <h1>日报推送</h1>
          <p>配置日报内容，验证钉钉发送，再从任务列表启用定时计划。</p>
        </div>
        <button className="primary" disabled={!!busy} onClick={create}>
          {busy === "create" ? <LoaderCircle className="spin" /> : <Plus />}
          新建日报任务
        </button>
      </header>
      {notice && <Notice value={notice} />}
      <section className="daily-job-list">
        {jobs.map((job) => (
          <article
            className="daily-job-card"
            key={job.id}
            onClick={() => setJobId(job.id)}
          >
            <div className="job-icon">
              <FileText />
            </div>
            <div className="job-copy">
              <div>
                <h2>{job.name}</h2>
                <span className={`job-status ${job.status}`}>
                  {statusLabel(job.status)}
                </span>
              </div>
              <p>
                <Clock3 />
                每天 {job.sendTime}
                <span>·</span>
                <Bot />
                {job.dingTalkStatus}
              </p>
              <small>{job.lastRun}</small>
            </div>
            <div
              className="job-actions"
              onClick={(event) => event.stopPropagation()}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={job.isEnabled}
                  disabled={busy === job.id}
                  onChange={() => toggle(job)}
                />
                <span />
              </label>
              <div className="job-menu">
                <button className="icon-button" aria-label="更多操作" onClick={() => setMenu(menu === job.id ? "" : job.id)}><MoreHorizontal /></button>
                {menu === job.id && <div className="job-menu-popover"><button className="danger-quiet" disabled={job.isEnabled || busy === job.id} onClick={() => { setMenu(""); setDeleteTarget(job) }}><Trash2 />删除任务</button></div>}
              </div>
              <button
                className="icon-button"
                aria-label="打开配置"
                onClick={() => setJobId(job.id)}
              >
                <ChevronRight />
              </button>
            </div>
          </article>
        ))}
        {!jobs.length && (
          <div className="empty-state">
            <FileText />
            <h2>还没有日报任务</h2>
            <p>新建任务后，按顺序完成机器人、模板和测试配置。</p>
          </div>
        )}
    </section>
    <Dialog.Root open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(undefined)}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog"><Dialog.Title>删除日报任务？</Dialog.Title><Dialog.Description>将删除“{deleteTarget?.name}”及其运行记录，此操作无法撤销。</Dialog.Description><div className="dialog-actions"><button className="secondary" onClick={() => setDeleteTarget(undefined)}>取消</button><button className="danger" disabled={!!busy} onClick={() => deleteTarget && remove(deleteTarget)}>确认删除</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
    </div>
  );
}

function DailyJobEditor({
  id,
  focusStep,
  notice: initialNotice,
  back,
}: {
  id: string;
  focusStep: string;
  notice?: NoticeValue;
  back: () => void;
}) {
  const [job, setJob] = useState<DailyJobDetail>();
  const [name, setName] = useState("");
  const [sendTime, setSendTime] = useState("17:30");
  const [template, setTemplate] = useState("");
  const [document, setDocument] = useState("");
  const [saveState, setSaveState] = useState("");
  const [notice, setNotice] = useState<NoticeValue | undefined>(initialNotice);
  const [webhook, setWebhook] = useState("");
  const [secret, setSecret] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState<
    Array<{ id: string; name: string; type: string }>
  >([]);
  const [insert, setInsert] = useState<{
    value: DailyField | "today";
    key: number;
  }>();
  const [preview, setPreview] = useState("");
  const [previewDate, setPreviewDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [busy, setBusy] = useState("");
  const [allRuns, setAllRuns] = useState<DailyRun[]>();
  const loaded = useRef(false);
  const sectionRefs = {
    basics: useRef<HTMLElement>(null),
    credentials: useRef<HTMLElement>(null),
    template: useRef<HTMLElement>(null),
  };
  async function load() {
    const value = await invoke<DailyJobDetail>("daily.get", { id });
    setJob(value);
    setName(value.name);
    setSendTime(value.sendTime);
    setTemplate(value.draftTemplate);
    setDocument(value.draftTemplateDocument);
    setWebhook(value.webhookSaved ? value.credentialMask : "");
    setSecret(value.secretSaved ? value.credentialMask : "");
    loaded.current = true;
  }
  useEffect(() => {
    load().catch((error) => setNotice(errorNotice(error)));
  }, [id]);
  useEffect(() => {
    if (job && focusStep)
      setTimeout(
        () =>
          sectionRefs[
            focusStep as keyof typeof sectionRefs
          ]?.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        50,
      );
  }, [job, focusStep]);
  useEffect(() => {
    if (!loaded.current || !job) return;
    setSaveState("保存中…");
    const timer = window.setTimeout(
      () =>
        invoke("daily.saveBasics", { id, name, sendTime })
          .then(() => setSaveState("已自动保存"))
          .catch((error) => {
            setSaveState("保存失败");
            setNotice(errorNotice(error));
          }),
      500,
    );
    return () => window.clearTimeout(timer);
  }, [name, sendTime]);
  useEffect(() => {
    if (!loaded.current || !job) return;
    setPreview("");
    setSaveState("保存中…");
    const timer = window.setTimeout(
      () =>
        invoke("daily.saveTemplate", { id, text: template, document })
          .then(() => {
            setSaveState("已自动保存");
            setJob((current) =>
              current
                ? { ...current, validated: false, isEnabled: false }
                : current,
            );
          })
          .catch((error) => {
            setSaveState("保存失败");
            setNotice(errorNotice(error));
          }),
      650,
    );
    return () => window.clearTimeout(timer);
  }, [template, document]);

  const sources = useMemo(
    () =>
      job?.sources.filter((source) => pageFor(source.path) === pagePath) || [],
    [job, pagePath],
  );
  async function chooseSource(value: string) {
    setSourceId(value);
    setPropertyId("");
    setProperties([]);
    if (!value) return;
    setBusy("properties");
    try {
      const result = await invoke<{ properties: typeof properties }>(
        "daily.getProperties",
        { sourceId: value },
      );
      setProperties(result.properties);
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function addField() {
    if (!sourceId || !propertyId) return;
    setBusy("field");
    try {
      const result = await invoke<{ field: DailyField }>(
        "daily.addField",
        { id, sourceId, propertyId },
        60000,
      );
      setJob((current) =>
        current
          ? {
              ...current,
              fields: [
                ...current.fields.filter(
                  (field) => field.placeholder !== result.field.placeholder,
                ),
                result.field,
              ],
              validated: false,
              isEnabled: false,
            }
          : current,
      );
      setInsert({ value: result.field, key: Date.now() });
      setPreview("");
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function saveCredentials() {
    setBusy("credentials");
    try {
      await invoke("daily.saveCredentials", {
        id,
        webhook: webhook === job?.credentialMask ? "" : webhook,
        secret: secret === job?.credentialMask ? "" : secret,
      });
      await load();
      setNotice({
        tone: "success",
        title: "推送配置已保存",
        message: "未修改的凭据保持原值；发送配置已标记为待测试。",
      });
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function checkConnection() {
    setBusy("connection");
    try {
      const result = await invoke<{ succeeded: boolean; message: string }>(
        "daily.checkConnection",
        { id },
        60000,
      );
      setNotice({
        tone: result.succeeded ? "success" : "error",
        title: result.succeeded ? "机器人连接正常" : "机器人连接失败",
        message: result.message,
      });
      await load();
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function generatePreview() {
    setBusy("preview");
    setPreview("");
    try {
      await invoke("daily.saveTemplate", { id, text: template, document });
      const result = await invoke<{
        succeeded: boolean;
        message: string;
        text: string;
      }>("daily.preview", { id, businessDate: previewDate }, 120000);
      if (!result.succeeded) throw new Error(result.message);
      setPreview(result.text);
      setNotice({
        tone: "success",
        title: "预览已生成",
        message: result.message,
      });
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function testSend() {
    setBusy("test");
    try {
      const result = await invoke<{ succeeded: boolean }>(
        "daily.test",
        { id, businessDate: previewDate },
        120000,
      );
      if (!result.succeeded) throw new Error("测试发送失败，请查看运行记录。");
      setNotice({
        tone: "success",
        title: "测试发送成功",
        message: "当前配置已验证，可以返回任务列表手动启用。",
      });
      await load();
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function showAllRuns() {
    setBusy("runs");
    try {
      const result = await invoke<{ runs: DailyRun[] }>("daily.runs", { id });
      setAllRuns(result.runs);
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  if (!job)
    return (
      <div className="page daily-page">
        <LoaderCircle className="spin page-loader" />
      </div>
    );
  const dirtyCredential =
    (webhook !== "" && webhook !== job.credentialMask) ||
    (secret !== "" && secret !== job.credentialMask);
  return (
    <div className="page daily-page daily-detail">
      <header>
        <div>
          <button className="back-link" onClick={back}>
            <ArrowLeft />
            返回任务列表
          </button>
          <span className="eyebrow">日报任务配置</span>
          <h1>{name || "未命名任务"}</h1>
          <p>
            按顺序完成基础信息、机器人、模板和测试；启停与删除请返回任务列表操作。
          </p>
        </div>
        <span
          className={`job-status ${job.isEnabled ? "enabled" : job.validated ? "ready" : "pending-test"}`}
        >
          {job.isEnabled ? "已启用" : job.validated ? "可启用" : "待测试"}
        </span>
      </header>
      {notice && <Notice value={notice} />}
      <section ref={sectionRefs.basics} className="surface daily-step">
        <StepTitle
          number="1"
          title="基本信息"
          text="名称自动保存；已启用任务修改发送时间后会立即更新计划。"
        />
        <div className="basic-grid">
          <label>
            任务名称
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            每天发送时间
            <TimePicker value={sendTime} onChange={setSendTime} />
          </label>
        </div>
        <small className="save-state">{saveState}</small>
      </section>
      <section ref={sectionRefs.credentials} className="surface daily-step">
        <StepTitle
          number="2"
          title="钉钉机器人"
          text="保存负责更新本机加密配置；测试连接只排查机器人链路。"
        />
        <div className="credential-grid">
          <label>
            Webhook
            <input
              type="password"
              value={webhook}
              onFocus={() => webhook === job.credentialMask && setWebhook("")}
              onBlur={() => job.webhookSaved && !webhook && setWebhook(job.credentialMask)}
              onChange={(event) => setWebhook(event.target.value)}
            />
          </label>
          <label>
            加签 Secret
            <input
              type="password"
              value={secret}
              onFocus={() => secret === job.credentialMask && setSecret("")}
              onBlur={() => job.secretSaved && !secret && setSecret(job.credentialMask)}
              onChange={(event) => setSecret(event.target.value)}
            />
          </label>
        </div>
        <div className="inline-actions">
          <button
            className="primary"
            disabled={!dirtyCredential || !!busy}
            onClick={saveCredentials}
          >
            {busy === "credentials" && <LoaderCircle className="spin" />}
            保存配置
          </button>
          <button
            className="secondary"
            disabled={!!busy || !job.webhookSaved || !job.secretSaved}
            onClick={checkConnection}
          >
            {busy === "connection" && <LoaderCircle className="spin" />}测试连接
          </button>
          <span className={job.dingTalkConnected ? "connection-ok" : "muted"}>
            {job.dingTalkConnected ? <CheckCircle2 /> : <Bot />}
            {job.dingTalkStatus || "尚未检测连接"}
          </span>
        </div>
      </section>
      <section ref={sectionRefs.template} className="surface daily-step">
        <StepTitle
          number="3"
          title="消息模板与数据源"
          text="编辑自动保存；插入字段后按预览日期读取对应 Notion 记录。"
        />
        <div className="template-workspace">
          <div>
            <ReportTemplateEditor
              text={template}
              document={document}
              fields={job.fields}
              insert={insert}
              onChange={(nextText, nextDocument) => {
                setTemplate(nextText);
                setDocument(nextDocument);
              }}
            />
          </div>
          <aside className="field-picker">
            <h3>
              <Database />
              插入数据源
            </h3>
            <label>
              1. 数据页
              <ChoicePicker value={pagePath} placeholder="请选择完整页面路径" options={job.pagePaths.map(path => ({ value: path, label: path }))} onChange={value => { setPagePath(value); chooseSource("") }} />
            </label>
            <label>
              2. 数据库
              <ChoicePicker value={sourceId} placeholder="请选择原始数据库" options={sources.map(source => ({ value: source.id, label: source.name }))} onChange={chooseSource} />
            </label>
            <label>
              3. 数据字段
              <ChoicePicker value={propertyId} placeholder="请选择数据字段" disabled={busy === "properties"} options={properties.map(property => ({ value: property.id, label: property.name }))} onChange={setPropertyId} />
            </label>
            <button
              className="secondary"
              disabled={!propertyId || !!busy}
              onClick={addField}
            >
              插入到光标处
            </button>
            <button
              className="ghost"
            onClick={() => setInsert({ value: "today", key: Date.now() })}
            >
              插入业务日期
            </button>
          </aside>
        </div>
        <div className="preview-actions">
          <label>
            预览业务日期
            <ReportDatePicker value={previewDate} onChange={value => { setPreviewDate(value); setPreview("") }} />
          </label>
          <button
            className="primary"
            disabled={!!busy || !template.trim()}
            onClick={generatePreview}
          >
            {busy === "preview" ? (
              <LoaderCircle className="spin" />
            ) : (
              <FileText />
            )}
            生成预览
          </button>
        </div>
        {preview && (
          <div className="report-preview">
            <div>
              <h3>真实消息预览</h3>
              <p>确认内容无误后，再发送一条真实钉钉测试消息。</p>
            </div>
            <pre>{preview}</pre>
            <button className="primary" disabled={!!busy} onClick={testSend}>
              {busy === "test" ? <LoaderCircle className="spin" /> : <Send />}
              测试发送
            </button>
          </div>
        )}
      </section>
      <section className="surface daily-step">
        <StepTitle
          number="4"
          title="运行记录"
          text="默认显示最近 5 条；测试发送和自动运行分别记录。"
        />
        <RunList runs={job.runs} />
        <button
          className="secondary"
          disabled={busy === "runs"}
          onClick={showAllRuns}
        >
          查看全部记录
        </button>
      </section>
      <Dialog.Root
        open={!!allRuns}
        onOpenChange={(open) => !open && setAllRuns(undefined)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog run-dialog">
            <Dialog.Title>全部运行记录</Dialog.Title>
            <Dialog.Description>当前任务最多保留 100 条。</Dialog.Description>
            <RunList runs={allRuns || []} />
            <div className="dialog-actions">
              <button
                className="secondary"
                onClick={() => setAllRuns(undefined)}
              >
                关闭
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function StepTitle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-title">
      <div>
        <span className="step">{number}</span>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
function Notice({ value }: { value: NoticeValue }) {
  return (
    <div className={`notice ${value.tone}`} role="status">
      <CheckCircle2 />
      <div>
        <strong>{value.title}</strong>
        <span>{value.message}</span>
      </div>
    </div>
  );
}
function RunList({ runs }: { runs: DailyRun[] }) {
  return (
    <div className="run-list">
      {runs.map((run) => (
        <details key={run.id}>
          <summary>
            <span>{run.time}</span>
            <span>{run.source}</span>
            <strong
              className={
                run.status === "成功"
                  ? "success-text"
                  : run.status === "失败"
                    ? "error-text"
                    : ""
              }
            >
              {run.status}
            </strong>
          </summary>
          <div>
            <p>
              业务日期：{run.businessDate || "—"} · 模板版本：
              {run.templateVersion} · 阶段：{run.stage} · 尝试：{run.attempts}
            </p>
            {run.textSummary && <p>内容摘要：{run.textSummary}</p>}
            {run.response && <p>响应：{run.response}</p>}
            {run.error && <p className="error-text">错误：{run.error}</p>}
          </div>
        </details>
      ))}
      {!runs.length && <p className="muted">暂无运行记录</p>}
    </div>
  );
}
function pageFor(path: string) {
  const parts = path
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts.slice(0, -1).join(" / ") : "根页面";
}
function statusLabel(status: string) {
  return (
    (
      {
        incomplete: "配置未完成",
        "pending-test": "待测试",
        ready: "可启用",
        enabled: "已启用",
        "schedule-error": "计划异常",
      } as Record<string, string>
    )[status] || status
  );
}
