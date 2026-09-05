import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, ArrowLeft, ArrowRight, Bot, Clock3, FileText, LoaderCircle, Plus, RotateCw, Trash2 } from "lucide-react";
import { invoke } from "./bridge";
import type { AutomationTaskSummary } from "./types";
import { automationTaskTypes, findAutomationTaskType, type AutomationRunView, type AutomationTaskTypeDefinition } from "./automationTaskTypes";

type NoticeValue = { tone: string; title: string; message: string };

const errorNotice = (error: unknown): NoticeValue => ({
  tone: "error",
  title: "操作失败",
  message: error instanceof Error ? error.message : String(error),
});

export function AutomationPage() {
  const [tasks, setTasks] = useState<AutomationTaskSummary[]>([]);
  const [selected, setSelected] = useState<AutomationTaskSummary>();
  const [focusStep, setFocusStep] = useState("");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState<NoticeValue>();
  const [menu, setMenu] = useState<{ task: AutomationTaskSummary; x: number; y: number }>();
  const [deleteTarget, setDeleteTarget] = useState<AutomationTaskSummary>();
  const [createOpen, setCreateOpen] = useState(false);
  const [createType, setCreateType] = useState("");
  const refresh = () => invoke<{ tasks: AutomationTaskSummary[] }>("automation.list").then((value) => {
    const nextTasks = Array.isArray(value.tasks) ? value.tasks : tasks;
    setTasks(nextTasks);
    setSelected(current => current
      ? nextTasks.find(task => task.taskType === current.taskType && task.id === current.id) || current
      : current);
    return nextTasks;
  });

  useEffect(() => { refresh().catch((error) => setNotice(errorNotice(error))); }, []);
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

  async function created(taskType: string, result: { id: string }) {
    const nextTasks = await refresh();
    setCreateOpen(false);
    setCreateType("");
    setSelected(nextTasks.find(task => task.taskType === taskType && task.id === result.id));
  }

  async function toggle(task: AutomationTaskSummary) {
    setBusy(task.id);
    setNotice(undefined);
    try {
      const result = await invoke<{ enabled: boolean; missingStep?: string; message?: string }>(
        "automation.setEnabled",
        { taskType: task.taskType, id: task.id, enabled: !task.isEnabled },
        60000);
      if (result.missingStep) {
        setFocusStep(result.missingStep);
        setSelected(task);
        setNotice({ tone: "warning", title: "配置尚未完成", message: result.message || "" });
      } else await refresh();
    } catch (error) { setNotice(errorNotice(error)); }
    finally { setBusy(""); }
  }

  async function remove(task: AutomationTaskSummary) {
    if (task.isEnabled) return;
    setBusy(task.id);
    try {
      await invoke("automation.delete", { taskType: task.taskType, id: task.id });
      setDeleteTarget(undefined);
      await refresh();
    } catch (error) { setNotice(errorNotice(error)); }
    finally { setBusy(""); }
  }

  if (selected) {
    const definition = findAutomationTaskType(selected.taskType);
    if (definition) return <AutomationTaskDetail task={selected} definition={definition} focusStep={focusStep} notice={notice} refresh={refresh} back={() => {
      setSelected(undefined);
      setFocusStep("");
      setNotice(undefined);
      refresh();
    }} />;
  }

  return <div className="page daily-page">
    <header>
      <div><h1>自动化任务</h1><p>不同任务保留各自配置和业务逻辑，由统一外壳负责启停与进入配置。</p></div>
      <div className="header-actions">
        <button className="primary" onClick={() => setCreateOpen(true)}><Plus />新建任务</button>
      </div>
    </header>
    {notice && <div className={`notice ${notice.tone}`} role="status"><div><strong>{notice.title}</strong><span>{notice.message}</span></div></div>}
    <section className="daily-job-list">
      {tasks.map((task) => <article className="daily-job-card" key={`${task.taskType}:${task.id}`}
        onClick={() => setSelected(task)} onContextMenu={(event) => {
          event.preventDefault();
          setMenu({ task, x: Math.min(event.clientX, window.innerWidth - 176), y: Math.min(event.clientY, window.innerHeight - 58) });
        }}>
        <div className="job-icon"><FileText /></div>
        <div className="job-copy"><div><h2>{task.name}</h2><span className={`job-status ${task.status}`}>{statusLabel(task.status)}</span></div>
          <p><Clock3 />{task.schedule}<span>·</span><Bot />{task.connectionStatus}</p>
          <small>{task.taskTypeName} · {task.lastRun}</small>
        </div>
        <div className="job-actions" onClick={(event) => event.stopPropagation()}><label className="switch"><input type="checkbox"
          checked={task.isEnabled} disabled={!task.schedulingAvailable || busy === task.id}
          title={task.schedulingAvailable ? undefined : "Development 环境默认不启用定时任务"}
          onChange={() => toggle(task)} /><span /></label></div>
      </article>)}
      {!tasks.length && <div className="empty-state"><FileText /><h2>还没有自动化任务</h2><p>选择一种任务类型，新建后进入对应的专用配置界面。</p></div>}
    </section>
    {menu && <div className="job-context-menu" role="menu" style={{ left: menu.x, top: menu.y }} onPointerDown={(event) => event.stopPropagation()}>
      <button className="danger-quiet" role="menuitem" disabled={menu.task.isEnabled || busy === menu.task.id}
        onClick={() => { setDeleteTarget(menu.task); setMenu(undefined); }}><Trash2 />{menu.task.isEnabled ? "停用后可删除" : "删除任务"}</button>
    </div>}
    <Dialog.Root open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(undefined)}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="dialog"><Dialog.Title>删除自动化任务？</Dialog.Title><Dialog.Description>将删除“{deleteTarget?.name}”及其业务记录，此操作无法撤销。</Dialog.Description>
        <div className="dialog-actions"><button className="secondary" onClick={() => setDeleteTarget(undefined)}>取消</button><button className="danger" disabled={!!busy} onClick={() => deleteTarget && remove(deleteTarget)}>确认删除</button></div>
      </Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={createOpen} onOpenChange={open => { setCreateOpen(open); if (!open) setCreateType(""); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="dialog automation-create-dialog"><Dialog.Title>新建自动化任务</Dialog.Title><Dialog.Description>{createType ? "填写任务信息，创建后可随时通过 Tab 修改。" : "先选择任务类型，后续配置由对应任务自己提供。"}</Dialog.Description>
        {!createType ? <div className="automation-create-types">{automationTaskTypes.map(definition => <button key={definition.taskType} onClick={() => setCreateType(definition.taskType)}><strong>{definition.name}</strong><span>{definition.description}</span></button>)}</div>
          : findAutomationTaskType(createType)?.renderCreate({ onCreated: result => created(createType, result), onBack: () => setCreateType(""), onCancel: () => { setCreateOpen(false); setCreateType(""); } })}
      </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}

function AutomationTaskDetail({ task, definition, focusStep, notice, refresh, back }: {
  task: AutomationTaskSummary;
  definition: AutomationTaskTypeDefinition;
  focusStep: string;
  notice?: NoticeValue;
  refresh: () => Promise<AutomationTaskSummary[]>;
  back: () => void;
}) {
  const [tab, setTab] = useState(focusStep ? definition.resolveSection(focusStep) : "basics");
  const [runs, setRuns] = useState<AutomationRunView[]>();
  const [runsError, setRunsError] = useState("");
  const [loadingRuns, setLoadingRuns] = useState(false);
  const tabs = [
    { id: "basics", label: "基本信息" },
    ...definition.taskTabs,
    { id: "runs", label: "运行记录" },
  ];
  const issues = [
    ...(task.missingMessage ? [{
      id: `configuration:${task.missingStep || "unknown"}`,
      title: definition.issueTitle(task.missingStep || ""),
      message: task.missingMessage,
      section: definition.resolveSection(task.missingStep || ""),
    }] : []),
    ...(task.status === "schedule-error" && task.schedulerMessage ? [{
      id: "scheduler",
      title: "计划任务异常",
      message: task.schedulerMessage,
      section: "basics",
    }] : []),
  ];

  async function loadRuns() {
    setLoadingRuns(true);
    setRunsError("");
    try { setRuns(await definition.loadRuns(task.id)); }
    catch (error) { setRunsError(error instanceof Error ? error.message : String(error)); }
    finally { setLoadingRuns(false); }
  }

  useEffect(() => { if (tab === "runs" && runs === undefined) loadRuns(); }, [tab, runs]);

  function moveTab(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    if (tabs[next].id === "basics") refresh().catch(() => undefined);
    document.getElementById(`automation-tab-${tabs[next].id}`)?.focus();
  }

  return <div className="page daily-page automation-detail">
    <header>
      <div><button className="back-link" onClick={back}><ArrowLeft />返回任务列表</button><h1>{task.name || "未命名任务"}</h1><p>{task.taskTypeName} · {task.schedule}</p></div>
      <span className={`job-status ${task.status}`}>{statusLabel(task.status)}</span>
    </header>
    <div className="automation-tabs" role="tablist" aria-label="任务详情">
      {tabs.map((item, index) => <button type="button" role="tab" id={`automation-tab-${item.id}`} key={item.id}
        aria-selected={tab === item.id} aria-controls={`automation-panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1}
        onClick={() => { setTab(item.id); if (item.id === "basics") refresh().catch(() => undefined); }} onKeyDown={event => moveTab(event, index)}>{item.label}</button>)}
    </div>
    {notice && <div className={`notice ${notice.tone}`} role="status"><div><strong>{notice.title}</strong><span>{notice.message}</span></div></div>}
    {!!issues.length && <section className="automation-issues" aria-labelledby="automation-issues-title">
      <div className="automation-issues-heading"><AlertTriangle /><div><h2 id="automation-issues-title">配置问题</h2><p>完成以下项目后才能安全启用任务。</p></div><span>{issues.length} 项</span></div>
      <ul>{issues.map(issue => <li key={issue.id}><div><strong>{issue.title}</strong><span>{issue.message}</span></div><button type="button" onClick={() => setTab(issue.section)}>前往{tabs.find(item => item.id === issue.section)?.label || "处理"}<ArrowRight /></button></li>)}</ul>
    </section>}
    <div className="automation-tab-panel" role="tabpanel" id={`automation-panel-${tab}`} aria-labelledby={`automation-tab-${tab}`}>
      <div hidden={tab === "runs"}>{definition.renderEditor({ id: task.id, section: tab, navigate: setTab, changed: () => { refresh().catch(() => undefined); } })}</div>
      {tab === "runs" && <section className="surface automation-runs"><div className="automation-runs-heading"><div><h2>运行记录</h2><p>记录仍由当前任务 Handler 维护，Shell 只负责统一展示。</p></div><button className="secondary" disabled={loadingRuns} onClick={loadRuns}>{loadingRuns ? <LoaderCircle className="spin" /> : <RotateCw />}刷新</button></div>
        {runsError && <div className="notice error" role="alert"><div><strong>运行记录读取失败</strong><span>{runsError}</span></div></div>}
        <div className="automation-run-list">{runs?.map(run => <details key={run.id}><summary><span>{run.time}</span><span>{run.source}</span><strong>{run.title}</strong><b className={run.error ? "error-text" : ""}>{run.status}</b></summary><div>{run.details.map(detail => <p key={detail}>{detail}</p>)}{run.error && <p className="run-error">错误：{run.error}</p>}</div></details>)}</div>
        {!loadingRuns && runs && !runs.length && <p className="automation-empty">暂无运行记录</p>}
      </section>}
    </div>
  </div>;
}

function statusLabel(status: string) {
  return ({ incomplete: "配置未完成", "pending-test": "待测试", ready: "可启用", enabled: "已启用", "schedule-error": "计划异常" } as Record<string, string>)[status] || status;
}
