import { useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import DatePicker from './DatePicker';
import sharedControls from './production-message.css?raw';
import controlRefinements from './control-refinements.css?raw';
import html from './notion-fill.html?raw';
import interFont from '../../Fonts/Inter.ttf?url';
import chineseFont from '../../Fonts/NotoSansSC.ttf?url';
import { invoke } from './bridge';
import type { NotionFillJobDetail, NotionFillRun, NotionFillRunNowResult, NotionFillSourceTestResult, NotionFillTestResult } from './types';

type Callbacks = { back: () => void; changed: () => unknown; openSettings?: () => void };
const yesterday = () => {
  const date = new Date(); date.setDate(date.getDate() - 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export function NotionFillPage({ id, ...callbacks }: Callbacks & { id: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let disposed = false;
    let runtime: ReturnType<typeof createNotionFillRuntime> | undefined;
    const el = frame.current!;
    setError('');
    invoke<NotionFillJobDetail>('notionFill.get', { id }).then(job => {
      if (disposed) return;
      runtime = createNotionFillRuntime(job, callbacks);
      el.onload = () => { if (!disposed && el.contentDocument?.getElementById('date-picker')) runtime!.connect(el.contentDocument); };
      // Keep the approved Demo markup; only the service binding and shared date picker change.
      el.srcdoc = html.replace('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf', new URL(interFont, window.location.href).href)
        .replace('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf', new URL(chineseFont, window.location.href).href);
    }).catch(e => { if (!disposed) setError(String(e.message || e)); });
    return () => { disposed = true; el.onload = null; runtime?.dispose(); };
  }, [id]);
  return <div className="message-template-host">{error && <p role="alert">{error}</p>}<iframe ref={frame} title="原材料自动入库" /></div>;
}

export function createNotionFillRuntime(initial: NotionFillJobDetail, callbacks: Callbacks) {
  let job = { ...initial, runTime: initial.runTime || '00:00' };
  let doc: Document;
  let dateRoot: Root | undefined;
  let disposed = false, busy = false, revision = 0, runsRevision = 0;
  let selectedDate = yesterday();
  let preview: NotionFillTestResult | undefined;
  let draftEnabled = job.isEnabled;
  const node = <T extends HTMLElement = HTMLElement>(id: string) => doc.getElementById(id) as T;
  const input = (id: string) => node<HTMLInputElement>(id);
  const button = (id: string) => node<HTMLButtonElement>(id);
  const dialog = (id: string) => node<HTMLDialogElement>(id);
  const errorText = (error: unknown) => error instanceof Error ? error.message : String(error);
  const number = (value: number) => value.toLocaleString('zh-CN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  function message(text: string, error = false) {
    node('feedback').textContent = text;
    node('feedback').className = error ? 'callout error' : '';
  }
  function sourceReady() { return !!(job.sourcePageUrl && job.username && job.passwordConfigured); }
  function renderDate() { dateRoot?.render(<DatePicker value={selectedDate} disabled={busy} onChange={setDate} />); }
  function controls() {
    for (const id of ['preview', 'source-test', 'yesterday', 'settings-open', 'back', 'confirm-run']) button(id).disabled = busy;
    button('preview').disabled = busy || !sourceReady() || !job.notionConfigured;
    button('source-test').disabled = busy || !sourceReady();
    button('run').disabled = busy || !preview;
    doc.querySelectorAll<HTMLButtonElement | HTMLInputElement>('#settings button, #settings input').forEach(el => el.disabled = busy);
    button('toggle').disabled = busy || !job.schedulingAvailable;
    button('preview').textContent = busy ? '处理中…' : '生成预览';
    node('name').textContent = job.name;
    node('enabled').textContent = job.isEnabled ? (job.schedulerInstalled ? '已启用' : '计划异常') : '未启用';
    node('target-name').textContent = job.targetDataSourceName;
    node('settings-target-name').textContent = job.targetDataSourceName;
    input('password').placeholder = job.passwordConfigured ? '已保存；留空不修改' : '请输入 93 系统密码';
    renderDate();
  }
  function clearPreview(text = '尚未生成预览') {
    revision++; preview = undefined;
    node('source-empty').hidden = false; node('source-values').hidden = true; node('source-error').hidden = true;
    node('record').hidden = true; node('target-status').hidden = true; node('target-empty').hidden = false;
    node('target-empty').querySelector('strong')!.textContent = text;
    node('target-empty').querySelector('span')!.textContent = '预览只读取数据，不会新增记录';
    button('run').textContent = '执行本日期'; button('run').disabled = true;
    if (dialog('confirm').open) dialog('confirm').close();
  }
  function setDate(value: string) {
    if (busy) return;
    selectedDate = value; input('date').value = value;
    clearPreview('待重新预览'); message(''); renderDate();
  }
  function renderSummary(result: NotionFillSourceTestResult) {
    node('source-empty').hidden = true; node('source-values').hidden = false;
    for (const [id, value] of [['plate', result.plateWeight], ['section', result.sectionWeight], ['total', result.totalWeight]] as const)
      node(id).textContent = number(value);
  }
  function renderPreview(result: NotionFillTestResult) {
    renderSummary(result);
    node('target-empty').hidden = true; node('record').hidden = false;
    node('record-title').textContent = `${result.businessDate} 入库`; node('record-date').textContent = result.businessDate;
    node('record-plate').textContent = `${number(result.plateWeight)} 吨`; node('record-section').textContent = `${number(result.sectionWeight)} 吨`;
    node('target-status').hidden = false;
    node('target-status').textContent = result.targetRecordExists
      ? '该日期已有记录，无需新增。' : '可新增 1 条入库记录。';
    button('run').textContent = result.targetRecordExists ? '验证查重' : '执行本日期';
  }
  function renderRuns(runs: NotionFillRun[]) {
    node('run-count').textContent = runs.length ? `· ${runs.length}` : '';
    const rows = runs.map(run => {
      const row = doc.createElement('div'); row.className = 'run';
      const kind = doc.createElement('span');
      kind.textContent = ({ 'source-test': '93 测试', test: '只读预览', manual: '手动执行', automatic: '自动执行' } as Record<string, string>)[run.source] || run.source;
      const content = doc.createElement('div');
      content.textContent = run.error || run.message || (run.status === 'created' ? '已新增' : run.status === 'failed' ? '执行失败' : '已检查');
      if (run.status === 'failed') content.style.color = '#B91C1C';
      const detail = doc.createElement('p');
      detail.textContent = run.status === 'failed' ? run.businessDate : `${run.businessDate} · 板材 ${number(run.plateWeight)} 吨 · 型材 ${number(run.sectionWeight)} 吨`;
      content.append(detail);
      const time = doc.createElement('small'); time.textContent = run.time;
      row.append(kind, content, time); return row;
    });
    node('runs-body').replaceChildren(...rows);
    if (!runs.length) node('runs-body').textContent = '暂无运行记录';
  }
  async function loadRuns() {
    const version = ++runsRevision;
    try {
      const result = await invoke<{ runs: NotionFillRun[] }>('notionFill.runs', { id: job.id });
      if (!disposed && version === runsRevision) renderRuns(result.runs);
    } catch (error) {
      if (!disposed && version === runsRevision) node('runs-body').textContent = `运行记录读取失败：${errorText(error)}；重新展开可重试。`;
    }
  }
  function changed() { Promise.resolve(callbacks.changed()).catch(() => undefined); }
  async function read(sourceOnly: boolean) {
    if (busy || !selectedDate) return;
    busy = true; clearPreview('正在读取…');
    const version = revision;
    controls(); message('');
    try {
      const result = await invoke<NotionFillTestResult>(sourceOnly ? 'notionFill.testSource' : 'notionFill.test', { id: job.id, businessDate: selectedDate }, 120000);
      if (disposed || version !== revision) return;
      if (!result.succeeded) throw new Error(result.message || '读取失败');
      if (sourceOnly) {
        renderSummary(result);
        node('target-empty').querySelector('strong')!.textContent = '尚未检查 Notion';
        node('target-empty').querySelector('span')!.textContent = '点击“生成预览”完成读取与查重';
      } else { job.validated = true; preview = result; renderPreview(result); }
      changed();
    } catch (error) {
      if (disposed || version !== revision) return;
      clearPreview('本次预览未完成'); node('source-error').hidden = false; node('source-error').textContent = errorText(error);
    } finally { if (!disposed) { busy = false; controls(); void loadRuns(); } }
  }
  async function run() {
    if (busy || !preview || !dialog('confirm').open) return;
    const date = preview.businessDate;
    dialog('confirm').close(); busy = true; controls(); message('');
    try {
      const result = await invoke<NotionFillRunNowResult>('notionFill.runNow', { id: job.id, businessDate: date }, 120000);
      if (disposed) return;
      if (!result.succeeded) throw new Error(result.message || '执行失败');
      // Execution re-reads source data. Preview weights are not the values actually written.
      preview = { ...preview!, targetRecordExists: true };
      node('target-status').textContent = result.message;
      button('run').textContent = '验证查重';
      message(result.created ? 'Notion 写入成功。' : '该日期已有记录，本次已跳过。'); changed();
    } catch (error) {
      if (!disposed) { clearPreview('执行未完成，请重新预览'); message(errorText(error), true); }
    } finally { if (!disposed) { busy = false; controls(); void loadRuns(); } }
  }
  function configChanged() {
    return input('task-name').value.trim() !== job.name || input('url').value.trim().replace(/\/+$/, '') !== job.sourcePageUrl ||
      input('username').value.trim() !== job.username || !!input('password').value;
  }
  function renderToggle() {
    button('toggle').setAttribute('aria-checked', String(draftEnabled));
    node('schedule-hint').textContent = !job.schedulingAvailable ? '当前运行环境不支持定时启停，预览与手动执行仍可使用。'
      : configChanged() ? '配置已修改：保存后需重新预览，再启用。'
      : job.isEnabled && !job.schedulerInstalled ? job.schedulerMessage
      : job.validated ? '只读预览已通过，可以启用定时入库。' : '完成一次“生成预览”后可启用。';
  }
  async function saveSettings(event: SubmitEvent) {
    event.preventDefault(); if (busy) return;
    const name = input('task-name').value.trim(), username = input('username').value.trim();
    if (!name || !username) { node('settings-note').textContent = '任务名称和用户名不能为空。'; return; }
    const connectionChanged = configChanged(), runTime = input('run-time').value;
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(runTime)) { node('settings-note').textContent = '请选择有效的执行时间。'; return; }
    const needsSave = connectionChanged || runTime !== job.runTime, desiredEnabled = connectionChanged ? false : draftEnabled;
    let saved = false;
    busy = true; controls();
    try {
      if (needsSave) {
        const sourcePageUrl = input('url').value.trim().replace(/\/+$/, ''), password = input('password').value;
        await invoke('notionFill.save', { id: job.id, name, sourcePageUrl, username, password, runTime });
        if (disposed) return;
        saved = true;
        job = { ...job, name, sourcePageUrl, username, runTime, passwordConfigured: job.passwordConfigured || !!password,
          isEnabled: connectionChanged ? false : job.isEnabled, validated: connectionChanged ? false : job.validated };
        input('password').value = '';
        if (connectionChanged) clearPreview('配置已修改，请重新预览');
      }
      if (desiredEnabled !== job.isEnabled) {
        const result = await invoke<{ enabled: boolean; message?: string }>('automation.setEnabled', { id: job.id, taskType: 'notion_fill', enabled: desiredEnabled });
        if (disposed) return;
        job.isEnabled = result.enabled;
        if (result.enabled !== desiredEnabled) throw new Error(result.message || '定时任务状态未更新');
        saved = true;
      }
      const fresh = await invoke<NotionFillJobDetail>('notionFill.get', { id: job.id });
      if (disposed) return;
      job = fresh; dialog('settings').close();
      message(connectionChanged ? '配置已保存，请重新预览后启用。' : '任务设置已保存。');
    } catch (error) {
      if (!disposed) node('settings-note').textContent = `${saved ? '设置已更新，但后续操作失败：' : ''}${errorText(error)}`;
    } finally { if (!disposed) { busy = false; draftEnabled = job.isEnabled; controls(); renderToggle(); if (saved) changed(); } }
  }
  async function settingsUpdated() {
    if (busy || disposed) return;
    const version = revision;
    try {
      const fresh = await invoke<NotionFillJobDetail>('notionFill.get', { id: job.id });
      if (disposed || busy || version !== revision) return;
      job = fresh; clearPreview('系统设置已更新，请重新预览'); controls();
      message(job.notionConfigured ? '系统设置已更新，点击“生成预览”读取数据。' : 'Notion 连接尚未配置，仍可仅测试 93 读取。');
    } catch (error) { if (!disposed) message(errorText(error), true); }
  }

  return {
    connect(document: Document) {
      dateRoot?.unmount(); doc = document;
      const style = doc.createElement('style');
      style.textContent = sharedControls + '\n' + controlRefinements + '\nbody{color:#292524}#date-picker{width:163px;display:inline-block}';
      doc.head.append(style);
      const marker = doc.createElement('span'); marker.className = 'production-message-demo'; marker.hidden = true; doc.body.append(marker);
      dateRoot = createRoot(node('date-picker'));
      input('date').value = selectedDate; input('date').onchange = () => setDate(input('date').value);
      button('yesterday').onclick = () => setDate(yesterday());
      button('preview').onclick = () => { void read(false); }; button('source-test').onclick = () => { void read(true); };
      button('back').onclick = callbacks.back;
      button('run').onclick = () => {
        if (busy || !preview) return;
        node('confirm-title').textContent = preview.targetRecordExists ? '验证查重' : '执行本日期';
        node('confirm-copy').textContent = preview.targetRecordExists ? `${preview.businessDate} 已有记录，本次执行应跳过。`
          : `将向“${job.targetDataSourceName}”新增 ${preview.businessDate} 的记录：板材 ${number(preview.plateWeight)} 吨，型材 ${number(preview.sectionWeight)} 吨。`;
        dialog('confirm').showModal();
      };
      button('confirm-run').onclick = () => { void run(); };
      button('settings-open').onclick = () => {
        input('task-name').value = job.name; input('url').value = job.sourcePageUrl; input('username').value = job.username; input('password').value = '';
        input('run-time').value = job.runTime;
        input('password').required = !job.passwordConfigured;
        node('settings-note').textContent = '修改名称或连接后，需重新预览并启用定时任务。';
        draftEnabled = job.isEnabled; renderToggle(); dialog('settings').showModal();
      };
      button('toggle').onclick = () => {
        if (!job.schedulingAvailable) return;
        if (!draftEnabled && (!job.validated || configChanged())) { node('schedule-hint').textContent = '请先保存配置并完成“生成预览”，再启用定时入库。'; return; }
        draftEnabled = !draftEnabled; renderToggle();
      };
      for (const id of ['task-name', 'url', 'username', 'password']) input(id).oninput = () => { if (configChanged()) draftEnabled = false; renderToggle(); };
      node<HTMLFormElement>('settings-form').onsubmit = event => { void saveSettings(event); };
      dialog('settings').onclose = () => { input('password').value = ''; };
      dialog('settings').oncancel = event => { if (busy) event.preventDefault(); };
      doc.querySelectorAll<HTMLButtonElement>('[data-close]').forEach(el => el.onclick = () => { if (!busy) dialog(el.dataset.close!).close(); });
      button('system-settings').hidden = !callbacks.openSettings;
      button('system-settings').onclick = () => { dialog('settings').close(); callbacks.openSettings?.(); };
      doc.querySelector<HTMLDetailsElement>('.runs')!.ontoggle = event => { if ((event.currentTarget as HTMLDetailsElement).open) void loadRuns(); };
      window.addEventListener('production-settings-updated', settingsUpdated);
      clearPreview(); controls();
      if (!sourceReady()) message('请先在任务设置中补全 93 系统连接配置。');
      else if (!job.notionConfigured) message('Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。');
    },
    dispose() { disposed = true; revision++; runsRevision++; dateRoot?.unmount(); window.removeEventListener('production-settings-updated', settingsUpdated); }
  };
}
