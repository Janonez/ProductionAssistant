import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  LoaderCircle,
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
import { ReportTemplateEditor, type DateInsertKind } from "./ReportTemplateEditor";
import { ChoicePicker, ReportDatePicker, TimePicker } from "./FormPickers";
import { WorkflowProgress, type WorkflowStepTransition } from "./WorkflowProgress";

type NoticeValue = { tone: string; title: string; message: string };
type DailyStep = 0 | 1 | 2 | 3;
type NoticeScope = "page" | "basics" | "template" | "preview" | "test";
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
  const [menu, setMenu] = useState<{ job: DailyJobSummary; x: number; y: number }>();
  const [deleteTarget, setDeleteTarget] = useState<DailyJobSummary>();
  const refresh = () =>
    invoke<{ jobs: DailyJobSummary[] }>("daily.list").then((value) =>
      setJobs(value.jobs),
    );
  useEffect(() => {
    refresh().catch((error) => setNotice(errorNotice(error)));
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(undefined);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("blur", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("blur", close);
    };
  }, [menu]);

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
        <button className="primary" disabled={busy === "create"} onClick={create}>
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
            onContextMenu={(event) => {
              event.preventDefault();
              setMenu({
                job,
                x: Math.min(event.clientX, window.innerWidth - 176),
                y: Math.min(event.clientY, window.innerHeight - 58),
              });
            }}
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
                  disabled={!job.schedulingAvailable || busy === job.id}
                  title={job.schedulingAvailable ? undefined : "Debug 版本不支持定时发送"}
                  onChange={() => toggle(job)}
                />
                <span />
              </label>
            </div>
          </article>
        ))}
        {!jobs.length && (
          <div className="empty-state">
            <FileText />
            <h2>还没有日报任务</h2>
            <p>新建任务后，按顺序完成基本信息、模板和测试配置。</p>
          </div>
        )}
      </section>
      {menu && (
        <div
          className="job-context-menu"
          role="menu"
          style={{ left: menu.x, top: menu.y }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            className="danger-quiet"
            role="menuitem"
            disabled={menu.job.isEnabled || busy === menu.job.id}
            onClick={() => {
              setDeleteTarget(menu.job);
              setMenu(undefined);
            }}
          >
            <Trash2 />
            {menu.job.isEnabled ? "停用后可删除" : "删除任务"}
          </button>
        </div>
      )}
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
  const [noticeScope, setNoticeScope] = useState<NoticeScope>("page");
  const [businessSection, setBusinessSection] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState<
    Array<{ id: string; name: string; type: string }>
  >([]);
  const [propertiesError, setPropertiesError] = useState("");
  const [viewId, setViewId] = useState("");
  const [views, setViews] = useState<Array<{ id: string; name: string; supportsPeriods: boolean }>>([]);
  const [matchProperty, setMatchProperty] = useState<{ id: string; name: string; type: string }>();
  const [periodKind, setPeriodKind] = useState("");
  const [insert, setInsert] = useState<{
    value: DailyField | DateInsertKind;
    key: number;
  }>();
  const [preview, setPreview] = useState("");
  const [previewDate, setPreviewDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [busy, setBusy] = useState("");
  const [allRuns, setAllRuns] = useState<DailyRun[]>();
  const [currentStep, setCurrentStep] = useState<DailyStep>(0);
  const [previousStep, setPreviousStep] = useState<DailyStep>(0);
  const [direction, setDirection] = useState(1);
  const [stepTransition, setStepTransition] = useState<WorkflowStepTransition>();
  const reduceMotion = useReducedMotion();
  const loaded = useRef(false);
  const initialized = useRef(false);
  const templateSaveTimer = useRef<number | undefined>(undefined);
  const stepTransitionTimer = useRef<number | undefined>(undefined);
  async function load() {
    const value = await invoke<DailyJobDetail>("daily.get", { id });
    setJob(value);
    setName(value.name);
    setSendTime(value.sendTime);
    setTemplate(value.draftTemplate);
    setDocument(value.draftTemplateDocument);
    if (!initialized.current) {
      const requested = ({ basics: 0, notification: 0, template: 1 } as const)[focusStep as "basics" | "notification" | "template"];
      const firstIncomplete: DailyStep = !value.name.trim() || !value.sendTime
        ? 0
        : !value.draftTemplate.trim()
            ? 1
            : value.validated
              ? 3
              : 1;
      setCurrentStep(requested ?? firstIncomplete);
      initialized.current = true;
    }
    loaded.current = true;
  }
  useEffect(() => {
    load().catch((error) => setNotice(errorNotice(error)));
  }, [id]);
  useEffect(() => () => {
    if (stepTransitionTimer.current) window.clearTimeout(stepTransitionTimer.current);
  }, []);
  useEffect(() => {
    if (!loaded.current || !job) return;
    if (template === job.draftTemplate && document === job.draftTemplateDocument) return;
    setPreview("");
    setSaveState("保存中…");
    templateSaveTimer.current = window.setTimeout(
      () =>
        invoke("daily.saveTemplate", { id, text: template, document })
          .then(() => {
            setSaveState("已自动保存");
            setJob((current) =>
              current
                ? { ...current, draftTemplate: template, draftTemplateDocument: document, validated: false, isEnabled: false }
                : current,
            );
          })
          .catch((error) => {
            setSaveState("保存失败");
            setNotice(errorNotice(error));
          }),
      650,
    );
    return () => {
      if (templateSaveTimer.current) window.clearTimeout(templateSaveTimer.current);
      templateSaveTimer.current = undefined;
    };
  }, [template, document]);

  const sources = useMemo(
    () =>
      job?.sources.filter((source) => !job.usesBusinessSections || source.businessSection === businessSection) || [],
    [job, businessSection],
  );
  async function chooseSource(value: string) {
    setSourceId(value);
    setPropertyId("");
    setProperties([]);
    setPropertiesError("");
    setViewId("");
    setViews([]);
    setMatchProperty(undefined);
    setPeriodKind("");
    if (!value) return;
    setBusy("properties");
    try {
      const result = await invoke<{ properties: typeof properties; views: typeof views; matchProperty?: typeof matchProperty }>(
        "daily.getProperties",
        { id, sourceId: value },
      );
      setProperties(result.properties);
      setViews(result.views || []);
      setMatchProperty(result.matchProperty);
    } catch (error) {
      setNotice(errorNotice(error));
    } finally {
      setBusy("");
    }
  }
  async function addField() {
    if (!sourceId || !propertyId) return;
    const property = properties.find((item) => item.id === propertyId);
    const selectedView = views.find((item) => item.id === viewId);
    if (!property) return;
    try {
      const result = await invoke<{ field: DailyField }>(
        "daily.addField",
        {
          id, sourceId, propertyId,
          propertyName: property.name,
          propertyType: property.type,
          viewId: selectedView?.id || "",
          viewName: selectedView?.name || "",
          periodKind,
          matchPropertyId: matchProperty?.id || "",
          matchPropertyName: matchProperty?.name || "",
          matchPropertyType: matchProperty?.type || "",
        },
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
      setPropertiesError(error instanceof Error ? error.message : String(error));
      setNoticeScope("template");
    }
  }
  const advanceTo = (step: DailyStep) => {
    if (stepTransition && currentStep === stepTransition.from) return;
    if (stepTransitionTimer.current) window.clearTimeout(stepTransitionTimer.current);
    const nextDirection = step >= currentStep ? 1 : -1;
    setPreviousStep(currentStep);
    setDirection(nextDirection);
    if (reduceMotion) {
      setCurrentStep(step);
      return;
    }
    const transition: WorkflowStepTransition = { from: currentStep, target: step, direction: nextDirection, phase: "node" };
    setStepTransition(transition);
    stepTransitionTimer.current = window.setTimeout(() => {
      setStepTransition({ ...transition, phase: "rail" });
      stepTransitionTimer.current = window.setTimeout(() => {
        setCurrentStep(step);
        setStepTransition({ ...transition, phase: "arrive" });
        stepTransitionTimer.current = window.setTimeout(() => {
          setStepTransition(undefined);
          stepTransitionTimer.current = undefined;
        }, 320);
      }, 440);
    }, nextDirection > 0 ? 320 : 240);
  };
  async function saveBasicsAndContinue() {
    if (!name.trim() || !sendTime) return;
    setBusy("basics");
    setNotice(undefined);
    try {
      await invoke("daily.saveBasics", { id, name, sendTime });
      setSaveState("已保存");
      setJob((current) => current ? { ...current, name, sendTime, validated: false, isEnabled: false } : current);
      advanceTo(1);
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("basics");
    } finally {
      setBusy("");
    }
  }
  async function generatePreview() {
    setBusy("preview");
    setPreview("");
    setNotice(undefined);
    try {
      if (templateSaveTimer.current) window.clearTimeout(templateSaveTimer.current);
      templateSaveTimer.current = undefined;
      await invoke("daily.saveTemplate", { id, text: template, document });
      const result = await invoke<{
        succeeded: boolean;
        message: string;
        text: string;
      }>("daily.preview", { id, businessDate: previewDate }, 120000);
      if (!result.succeeded) throw new Error(result.message);
      setPreview(result.text);
      advanceTo(2);
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("preview");
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
      setNoticeScope("test");
      await load();
      advanceTo(3);
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("test");
    } finally {
      setBusy("");
    }
  }
  async function sendToday() {
    setBusy("send-today");
    setNotice(undefined);
    try {
      const result = await invoke<{ succeeded: boolean; alreadySent: boolean }>(
        "daily.sendToday",
        { id },
        120000,
      );
      if (!result.succeeded) throw new Error("今日消息发送失败，请查看运行记录。");
      setNotice({
        tone: "success",
        title: result.alreadySent ? "今日消息已发送" : "今日消息发送成功",
        message: result.alreadySent ? "今天的当前版本已有成功记录，本次未重复推送。" : "已使用当前验证通过的模板发送。",
      });
      setNoticeScope("page");
      await load();
    } catch (error) {
      setNotice(errorNotice(error));
      setNoticeScope("page");
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
  const steps = ["基本信息", "编辑消息", "预览与测试"];
  const motionProps = reduceMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, x: direction * 28, filter: "blur(5px)" },
        animate: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: { opacity: 0, x: direction * -20, filter: "blur(4px)" },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
      };
  return (
    <div className="page daily-page daily-detail">
      <header className="daily-detail-header">
        <div>
          <button className="back-link" onClick={back}>
            <ArrowLeft />
            返回任务列表
          </button>
          <h1>{name || "未命名任务"}</h1>
          <p>
            每天 {sendTime} 自动生成并推送；启停与删除请返回任务列表操作。
          </p>
        </div>
        <div className="detail-header-state">
          <button className="secondary" disabled={!!busy || !job.validated} onClick={sendToday}>
            {busy === "send-today" ? <LoaderCircle className="spin" /> : <Send />}
            发送今日消息
          </button>
          <span className={`job-status ${job.isEnabled ? "enabled" : job.validated ? "ready" : "configuring"}`}>
            {job.isEnabled ? "已启用" : job.validated ? "可启用" : "配置中"}
          </span>
          <small>{saveState || "尚无未保存更改"}</small>
        </div>
      </header>
      {notice && noticeScope === "page" && <Notice value={notice} />}
      <WorkflowProgress label="日报配置进度" steps={steps} currentStep={currentStep} direction={direction as 1 | -1} transition={stepTransition} busy={!!busy} />
      <div className="daily-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section aria-labelledby={`daily-step-${currentStep}`} key={currentStep} className="surface daily-focus-card" {...motionProps}>
            {currentStep === 0 && <>
              <StepTitle id="daily-step-0" number="01" title="先确认任务的基本信息" text="名称和发送时间将在保存后写入当前任务。" />
              <div className="basic-grid focus-form">
                <label>任务名称<input value={name} onChange={(event) => { setName(event.target.value); setSaveState("有未保存更改") }} /></label>
                <label>每天发送时间<TimePicker value={sendTime} onChange={value => { setSendTime(value); setSaveState("有未保存更改") }} /></label>
              </div>
              {notice && noticeScope === "basics" && <Notice value={notice} />}
              <div className="focus-actions"><button className="primary" disabled={!!busy || !name.trim() || !sendTime} onClick={saveBasicsAndContinue}>{busy === "basics" && <LoaderCircle className="spin" />}保存设置</button></div>
            </>}
            {currentStep === 1 && <>
              <StepTitle id="daily-step-1" number="02" title="编辑消息" text="从当前数据库目录中选择字段，可连续插入到同一条消息。" />
              {!job.notificationConfigured || !job.notificationConnected ? <div className="notice warning" role="status"><Bot /><div><strong>全局通知尚未就绪</strong><span>请先到“设置 → 通知设置”完成钉钉渠道配置和测试。</span></div></div> : null}
              <div className="template-workspace progressive-template">
                <div className="editor-column"><label>消息模板</label><ReportTemplateEditor text={template} document={document} fields={job.fields} insert={insert} onInsertHandled={() => setInsert(undefined)} onChange={(nextText, nextDocument) => { setTemplate(nextText); setDocument(nextDocument); setPreview(""); setJob(current => current ? { ...current, validated: false, isEnabled: false } : current) }} /></div>
                <aside className="field-picker progressive-field-picker">
                  <div className="field-picker-heading"><h3><Database />数据源字段</h3><span>可跨数据库连续添加</span></div>
                  {job.usesBusinessSections && <label><span className="field-label-title"><b>1.</b> 业务板块</span><ChoicePicker value={businessSection} placeholder="请选择业务板块" options={job.businessSections.map(section => ({ value: section, label: section }))} onChange={value => { setBusinessSection(value); chooseSource("") }} /></label>}
                  <label><span className="field-label-title"><b>{job.usesBusinessSections ? 2 : 1}.</b> 数据库</span><ChoicePicker value={sourceId} placeholder="请选择数据库" disabled={job.usesBusinessSections && !businessSection} options={sources.map(source => ({ value: source.id, label: source.name }))} onChange={chooseSource} /></label>
                  <label><span className="field-label-title"><b>{job.usesBusinessSections ? 3 : 2}.</b> 数据字段</span><ChoicePicker value={propertyId} placeholder={busy === "properties" ? "正在读取字段…" : "请选择数据字段"} disabled={busy === "properties"} options={properties.map(property => ({ value: property.id, label: `${property.name} · ${property.type}` }))} onChange={setPropertyId} /></label>
                  {sourceId && <label><span className="field-label-title"><b>{job.usesBusinessSections ? 4 : 3}.</b> 统计 View</span><ChoicePicker value={viewId} placeholder={views.length ? "请选择数据库 View" : "数据库中没有可用 View"} options={views.map(view => ({ value: view.id, label: view.name }))} onChange={value => { const view = views.find(item => item.id === value); setViewId(value); setPeriodKind(view?.supportsPeriods ? "day" : "") }} /></label>}
                  {viewId && <label><span className="field-label-title"><b>{job.usesBusinessSections ? 5 : 4}.</b> {views.find(view => view.id === viewId)?.supportsPeriods ? "累计口径" : "取数方式"}</span><ChoicePicker value={periodKind} placeholder={views.find(view => view.id === viewId)?.supportsPeriods ? "请选择累计口径" : "请选择取数方式"} options={views.find(view => view.id === viewId)?.supportsPeriods ? [{ value: "day", label: "日 · 当天值" }, { value: "month", label: "月 · 当月截至当日" }, { value: "year", label: "年 · 本年截至当日" }] : [{ value: "direct-month", label: "直接获取 · 对应业务月份" }, { value: "view-sum", label: "累计 · View 全部记录" }]} onChange={setPeriodKind} /></label>}
                  {propertiesError && <div className="field-error" role="alert"><span>字段读取失败：{propertiesError}</span><button type="button" onClick={() => chooseSource(sourceId)}>重试</button></div>}
                  <button className="insert-field-button" disabled={!propertyId || !!busy || !viewId || !periodKind} onClick={addField}>插入所选字段</button>
                  <div className="system-variable"><span>业务日期</span><div className="system-variable-actions"><button type="button" onClick={() => setInsert({ value: "year", key: Date.now() })}>年</button><button type="button" onClick={() => setInsert({ value: "month", key: Date.now() })}>月</button><button type="button" onClick={() => setInsert({ value: "day", key: Date.now() })}>日</button><button type="button" onClick={() => setInsert({ value: "date", key: Date.now() })}>完整日期</button></div></div>
                </aside>
              </div>
              {notice && noticeScope === "template" && <Notice value={notice} />}
              {notice && noticeScope === "preview" && <Notice value={notice} />}
              <div className="focus-actions split"><button className="ghost" onClick={() => advanceTo(0)}>返回上一步</button><div className="preview-action-group"><label>预览取数日期<ReportDatePicker value={previewDate} onChange={value => { setPreviewDate(value); setPreview(""); setJob(current => current ? { ...current, validated: false, isEnabled: false } : current) }} /></label><button className="primary" disabled={!!busy || !template.trim()} onClick={generatePreview}>{busy === "preview" ? <LoaderCircle className="spin" /> : <FileText />}生成消息预览</button></div></div>
            </>}
            {currentStep === 2 && <>
              <StepTitle id="daily-step-2" number="03" title="预览并测试发送" text="使用系统通知中心的钉钉渠道发送一条真实测试；成功后任务只会变为可启用。" />
              <div className="report-preview has-preview"><div><h3>即将发送</h3><p>{previewDate} · 已连接机器人</p></div><pre>{preview}</pre></div>
              {notice && noticeScope === "test" && <Notice value={notice} />}
              <div className="focus-actions split"><button className="ghost" onClick={() => { setPreview(""); advanceTo(1) }}>返回修改内容</button><button className="primary" disabled={!!busy || !preview || !job.notificationConfigured || !job.notificationConnected} onClick={testSend}>{busy === "test" ? <LoaderCircle className="spin" /> : <Send />}测试发送</button></div>
            </>}
            {currentStep === 3 && <div className="daily-complete">
              <span className="complete-mark"><CheckCircle2 /></span><h2 id="daily-step-3">配置完成，可以启用</h2><p>测试发送已经通过，但任务尚未自动启用。请返回任务列表手动启用。</p>
              <div className="complete-summary"><div><strong>基本信息</strong><span>{name} · 每天 {sendTime}</span></div><div><strong>通知渠道</strong><span>跟随系统通知设置</span></div><div><strong>消息模板</strong><span>{job.fields.length} 个数据字段</span></div><div><strong>测试发送</strong><span>当前配置已验证</span></div></div>
              <div className="complete-actions"><button className="secondary" onClick={() => advanceTo(1)}>修改消息内容</button><button className="primary" onClick={back}>返回任务列表</button></div>
              <section className="complete-runs"><div className="run-section-heading"><div><h2>运行记录</h2><p>测试发送和自动运行分别记录，默认显示最近 5 条。</p></div><button className="secondary" disabled={busy === "runs"} onClick={showAllRuns}>查看全部记录</button></div><RunList runs={job.runs} /></section>
            </div>}
          </motion.section>
        </AnimatePresence>
      </div>
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
  id,
  number,
  title,
  text,
}: {
  id: string;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-title">
      <div>
        <span className="step">{number}</span>
        <div>
          <h2 id={id}>{title}</h2>
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
