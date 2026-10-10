import { act } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import html from './notion-fill.html?raw';
import type { NotionFillJobDetail } from './types';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('./bridge', () => ({ invoke }));
import { createNotionFillRuntime } from './NotionFillPage';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
let frame: HTMLIFrameElement, doc: Document;
let runtime: ReturnType<typeof createNotionFillRuntime>;
let job: NotionFillJobDetail;
const back = vi.fn(), changed = vi.fn(), openSettings = vi.fn();
const node = <T extends HTMLElement = HTMLElement>(id: string) => doc.getElementById(id) as T;
const button = (id: string) => node<HTMLButtonElement>(id);
const click = async (id: string) => { await act(async () => button(id).click()); };
const calls = (operation: string) => invoke.mock.calls.filter(call => call[0] === operation);
const edit = async (id: string, value: string, type = 'input') => {
  await act(async () => { node<HTMLInputElement>(id).value = value; node(id).dispatchEvent(new doc.defaultView!.Event(type, { bubbles: true })); });
};
const save = async () => { await act(async () => node('settings-form').dispatchEvent(new doc.defaultView!.Event('submit', { cancelable: true }))); };
beforeEach(() => {
  vi.clearAllMocks();
  job = { id: 'fill-1', name: '原材料入库自动填报', runTime: '00:00', sourcePageUrl: 'https://example.test/inbound', username: 'tester', passwordConfigured: true,
    notionConfigured: true, targetDataSourceName: '原材料入库数据库', validated: false, isEnabled: false, schedulingAvailable: true,
    schedule: '每天 00:00 · 填报前一天', schedulerInstalled: false, schedulerMessage: '', runs: [] };
  invoke.mockReset().mockImplementation(async (operation: string, payload: any) => {
    if (operation === 'notionFill.get') return { ...job };
    if (operation === 'notionFill.runs') return { runs: [] };
    if (operation === 'notionFill.save') {
      const invalidated = payload.name !== job.name || payload.sourcePageUrl !== job.sourcePageUrl || payload.username !== job.username || !!payload.password;
      job = { ...job, ...payload, passwordConfigured: true, validated: invalidated ? false : job.validated, isEnabled: invalidated ? false : job.isEnabled };
      return { saved: true, invalidated };
    }
    if (operation === 'automation.setEnabled') { job.isEnabled = payload.enabled; job.schedulerInstalled = payload.enabled; return { enabled: payload.enabled }; }
    if (operation === 'notionFill.test') job.validated = true;
    if (operation === 'notionFill.test' || operation === 'notionFill.testSource') return {
      succeeded: true, businessDate: payload.businessDate, plateWeight: 9.425, sectionWeight: 3.15, totalWeight: 12.575, targetRecordExists: false, message: '读取成功'
    };
    if (operation === 'notionFill.runNow') return { succeeded: true, created: true, skipped: false, message: '已新增：板材 10 吨，型材 4 吨' };
    throw new Error(`Unexpected operation: ${operation}`);
  });
});
afterEach(() => { act(() => runtime?.dispose()); frame?.remove(); });
async function mount(overrides: Partial<NotionFillJobDetail> = {}) {
  job = { ...job, ...overrides };
  frame = document.createElement('iframe'); document.body.append(frame); doc = frame.contentDocument!;
  doc.open(); doc.write(html); doc.close();
  const dialogPrototype = doc.defaultView!.HTMLDialogElement.prototype;
  dialogPrototype.showModal = function () { this.open = true; };
  dialogPrototype.close = function () { this.open = false; this.dispatchEvent(new doc.defaultView!.Event('close')); };
  runtime = createNotionFillRuntime(job, { back, changed, openSettings });
  await act(async () => runtime.connect(doc));
}

it('loads no source data on entry, date changes or settings saves, and uses the shared iframe calendar', async () => {
  await mount();
  expect(calls('notionFill.test')).toHaveLength(0);
  expect(doc.querySelector('input[type=date]')).toBeNull();
  expect(doc.querySelector('.date-picker-label')).toBeNull();
  expect(node('date-label').textContent).toBe('业务日期');
  expect(doc.querySelector('.demo')).toBeNull();
  expect(button('run').disabled).toBe(true);
  await act(async () => doc.querySelector<HTMLButtonElement>('.date-picker-trigger')!.click());
  expect(doc.querySelector('.date-picker-popover')).not.toBeNull();
  expect(document.querySelector('.date-picker-popover')).toBeNull();
  await act(async () => doc.querySelector<HTMLButtonElement>('.date-picker-today-button')!.click());
  await edit('date', '2026-09-03', 'change');
  await click('settings-open'); await edit('task-name', '修改后的任务'); await save();
  expect(calls('notionFill.save')).toHaveLength(1);
  expect(calls('notionFill.test')).toHaveLength(0);
  expect(calls('notionFill.testSource')).toHaveLength(0);
  expect(calls('notionFill.runNow')).toHaveLength(0);
  await click('preview');
  expect(calls('notionFill.test')[0][1]).toEqual({ id: job.id, businessDate: '2026-09-03' });
  expect(node('record-plate').textContent).toBe('9.425 吨');
  expect(node('total').textContent).toBe('12.575');
});

it('requires full preview and explicit confirmation; only backend results report actual writes and skips', async () => {
  await mount(); await edit('date', '2026-09-03', 'change');
  await click('source-test');
  expect(node('target-empty').textContent).toContain('尚未检查数据库');
  expect(button('run').disabled).toBe(true);
  expect(calls('notionFill.test')).toHaveLength(0);
  await click('preview'); await click('run');
  expect(node<HTMLDialogElement>('confirm').open).toBe(true);
  expect(calls('notionFill.runNow')).toHaveLength(0);
  await act(async () => doc.querySelector<HTMLButtonElement>('#confirm [data-close]')!.click());
  expect(calls('notionFill.runNow')).toHaveLength(0);
  await click('run'); await click('confirm-run');
  expect(calls('notionFill.runNow')[0][1]).toEqual({ id: job.id, businessDate: '2026-09-03' });
  expect(node('target-status').textContent).toContain('板材 10 吨');
  expect(node('record-plate').textContent).toBe('9.425 吨');
  invoke.mockImplementationOnce(async () => ({ succeeded: true, created: false, skipped: true, message: '日期已存在，跳过新增' }));
  await click('run'); await click('confirm-run');
  expect(node('feedback').textContent).toContain('已跳过');
  expect(calls('notionFill.save')).toHaveLength(0);
});

it('invalidates old previews after a date change or failed read, while zero remains a valid value', async () => {
  await mount(); await click('preview');
  await edit('date', '2026-09-02', 'change');
  expect(button('run').disabled).toBe(true); expect(node('source-values').hidden).toBe(true);
  invoke.mockImplementationOnce(async () => ({ succeeded: true, businessDate: '2026-09-02', plateWeight: 0, sectionWeight: 0, totalWeight: 0, targetRecordExists: false }));
  await click('preview');
  expect(node('total').textContent).toBe('0.000'); expect(button('run').disabled).toBe(false);
  invoke.mockRejectedValueOnce(new Error('Notion 该日期存在多条记录'));
  await click('preview');
  expect(node('source-error').textContent).toContain('多条记录');
  expect(button('run').disabled).toBe(true); expect(node('record').hidden).toBe(true);
});

it('serializes operations, locks date and settings while reading, and ignores results after unmount', async () => {
  await mount();
  let resolve!: (value: unknown) => void;
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done; }));
  await click('preview'); await click('preview');
  expect(calls('notionFill.test')).toHaveLength(1);
  expect(button('settings-open').disabled).toBe(true);
  expect(doc.querySelector<HTMLButtonElement>('.date-picker-trigger')!.disabled).toBe(true);
  await act(async () => runtime.dispose());
  await act(async () => resolve({ succeeded: true, businessDate: '2026-09-02', plateWeight: 1, sectionWeight: 2, totalWeight: 3 }));
  expect(node('source-values').hidden).toBe(true);
  expect(calls('notionFill.runs')).toHaveLength(0);
});

it('preserves saved credentials on blank password and resets scheduling only when configuration actually changes', async () => {
  await mount({ validated: true, isEnabled: true, schedulerInstalled: true });
  await click('settings-open'); await edit('task-name', '取消的名称');
  await act(async () => doc.querySelector<HTMLButtonElement>('#settings [data-close]')!.click());
  expect(calls('notionFill.save')).toHaveLength(0);
  await click('settings-open'); await save();
  expect(calls('notionFill.save')).toHaveLength(0); expect(calls('automation.setEnabled')).toHaveLength(0);
  await click('preview'); await click('settings-open'); await edit('username', 'new-user'); await save();
  expect(calls('notionFill.save')[0][1]).toEqual({ id: job.id, name: job.name, sourcePageUrl: job.sourcePageUrl, username: 'new-user', password: '', runTime: '00:00' });
  expect(node('enabled').textContent).toBe('未启用'); expect(button('run').disabled).toBe(true);
  await click('settings-open'); await click('toggle');
  expect(button('toggle').getAttribute('aria-checked')).toBe('false');
  expect(node('schedule-hint').textContent).toContain('请先保存配置');
});

it('enables through the task handler after validation, and reports rejected enablement without success', async () => {
  await mount(); await click('preview'); await click('settings-open'); await click('toggle'); await save();
  expect(calls('automation.setEnabled')[0][1]).toEqual({ id: job.id, taskType: 'notion_fill', enabled: true });
  expect(calls('notionFill.save')).toHaveLength(0); expect(node('enabled').textContent).toBe('已启用');
  await click('settings-open'); await click('toggle'); await save();
  expect(node('enabled').textContent).toBe('未启用');
  await click('settings-open'); await click('toggle');
  invoke.mockImplementationOnce(async () => ({ enabled: false, message: '目标数据库未配置' }));
  await save();
  expect(node<HTMLDialogElement>('settings').open).toBe(true);
  expect(node('settings-note').textContent).toContain('目标数据库未配置'); expect(node('enabled').textContent).toBe('未启用');
});

it('keeps Development preview and manual execution available while disabling only scheduling', async () => {
  await mount({ schedulingAvailable: false });
  await click('settings-open'); expect(button('toggle').disabled).toBe(true);
  expect(node('schedule-hint').textContent).toContain('当前运行环境');
  await act(async () => doc.querySelector<HTMLButtonElement>('#settings [data-close]')!.click());
  await click('preview'); await click('run'); await click('confirm-run');
  expect(calls('notionFill.runNow')).toHaveLength(1);
  expect(calls('automation.setEnabled')).toHaveLength(0);
});

it('refreshes connection status through system settings without querying source data', async () => {
  await mount({ notionConfigured: false });
  expect(button('preview').disabled).toBe(true); expect(button('source-test').disabled).toBe(false);
  await click('settings-open'); await click('system-settings'); expect(openSettings).toHaveBeenCalledOnce();
  job.notionConfigured = true;
  await act(async () => window.dispatchEvent(new Event('production-settings-updated')));
  expect(button('preview').disabled).toBe(false); expect(calls('notionFill.test')).toHaveLength(0);
  expect(calls('notionFill.testSource')).toHaveLength(0);
});

it('leaves configuration and preview intact on save failure; execution failure blocks stale retries', async () => {
  await mount(); await click('preview'); await click('settings-open'); await edit('task-name', '新名称');
  invoke.mockRejectedValueOnce(new Error('保存失败'));
  await save(); expect(node('settings-note').textContent).toBe('保存失败'); expect(node('name').textContent).toBe('原材料入库自动填报');
  await act(async () => doc.querySelector<HTMLButtonElement>('#settings [data-close]')!.click());
  await click('run'); invoke.mockRejectedValueOnce(new Error('Notion 写入失败')); await click('confirm-run');
  expect(node('feedback').textContent).toBe('Notion 写入失败'); expect(button('run').disabled).toBe(true);
});

it('loads real history on disclosure and keeps failure details visible', async () => {
  await mount();
  invoke.mockImplementation(async () => ({ runs: [{ id: 'run', source: 'manual', status: 'failed', time: '2026-09-08 09:00:00', businessDate: '2026-09-07', plateWeight: 0, sectionWeight: 0, error: '93 登录失败', message: '' }] }));
  await act(async () => { const runs = doc.querySelector<HTMLDetailsElement>('.runs')!; runs.open = true; runs.dispatchEvent(new doc.defaultView!.Event('toggle')); });
  expect(node('runs-body').textContent).toContain('93 登录失败');
  expect(node('runs-body').textContent).not.toContain('0.000');
});

it('saves and reopens a custom time without disabling a validated task or fetching data', async () => {
  await mount({ validated: true, isEnabled: true, schedulerInstalled: true });
  await click('settings-open'); await edit('run-time', '08:35'); await save();
  expect(calls('notionFill.save')[0][1]).toMatchObject({ runTime: '08:35' });
  expect(calls('automation.setEnabled')).toHaveLength(0);
  expect(node('enabled').textContent).toBe('已启用');
  expect(calls('notionFill.test')).toHaveLength(0);
  await click('settings-open'); expect(node<HTMLInputElement>('run-time').value).toBe('08:35');
  await edit('run-time', '10:20');
  await act(async () => doc.querySelector<HTMLButtonElement>('#settings [data-close]')!.click());
  await click('settings-open'); expect(node<HTMLInputElement>('run-time').value).toBe('08:35');
  await edit('run-time', ''); await save();
  expect(calls('notionFill.save')).toHaveLength(1);
  expect(node('settings-note').textContent).toContain('有效的执行时间');
});
