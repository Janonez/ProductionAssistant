import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('./bridge', () => ({ invoke }));
import { TencentSheetPage } from './TencentSheetPage';
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
let root: Root | undefined;
afterEach(() => { if (root) act(() => root!.unmount()); document.body.innerHTML = ''; });
it('never opens on entry, requires preview and discards confirmation when inputs change', async () => {
  const job = { id: 'job', config: { fields: ['cutting', 'welding', 'section', 'plate'].map(id => ({ id, name: id, unit: '吨', legacyKey: id })), documentUrl: 'https://docs.qq.com/sheet/test', sheetPattern: '下料、装焊（{yy}年{M}月）', company: '滨海公司', park: '滨海园区', startColumn: 'F', cuttingRow: 9, weldingRow: 19, inboundRow: 35, adapter: { anchors: {} } } };
  invoke.mockReset().mockImplementation(async (operation: string) => operation === 'tencentSheet.get' ? job : { date: '2026-09-08', sheet: '测试月报', token: 'one-use', conflict: false, rows: [{ label: '下料量', address: 'M9', current: '', value: 1 }], message: '检查通过' });
  const container = document.createElement('div'); document.body.append(container); root = createRoot(container);
  await act(async () => root!.render(<TencentSheetPage id="job" changed={() => {}} />));
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['tencentSheet.get', 'tencentSite.list']);
  expect(container.textContent).not.toMatch(/高级设置|CSS|起始列|月份工作表名称/);
  expect(container.textContent).not.toContain('记住网页当前工作表');
  expect(container.querySelectorAll('button[aria-label^=点选]')).toHaveLength(3);
  expect(container.textContent).not.toContain('当前选中的工作表标签');
  expect(container.querySelectorAll('input[type=number]')).toHaveLength(4);
  const button = (text: string) => [...container.querySelectorAll('button')].find(button => button.textContent === text)!;
  const inputs = [...container.querySelectorAll<HTMLInputElement>('input[placeholder="输入本次实际数据"]')];
  async function edit(input: HTMLInputElement, value: string) {
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value); input.dispatchEvent(new Event('input', { bubbles: true })); });
  }
  for (const input of inputs) await edit(input, '1');
  await act(async () => button('检查本次数据与位置').click());
  expect(button('确认填报以上 1 项').disabled).toBe(false);
  expect(invoke.mock.calls.some(call => call[0] === 'tencentSheet.write')).toBe(false);
  await edit(inputs[0], '2');
  expect(button('确认填报以上 1 项')).toBeUndefined();
  await act(async () => button('检查本次数据与位置').click());
  await act(async () => button('确认填报以上 1 项').click());
  expect(invoke.mock.calls.find(call => call[0] === 'tencentSheet.write')?.[1]).toMatchObject({ businessDate: '2026-09-08', token: 'one-use', values: { cutting: '2' } });
});

it('starts without preset business and binds a custom data snapshot to inspection and writing', async () => {
  let job: any = { id: 'job', config: { documentUrl: 'https://docs.qq.com/sheet/test', fields: [], rules: {}, requireTeaching: true, adapter: { anchors: {} } } };
  invoke.mockReset().mockImplementation(async (operation: string, payload: any) => {
    if (operation === 'tencentSite.list') return { profiles: [] };
    if (operation === 'tencentSheet.get') return structuredClone(job);
    if (operation === 'tencentSheet.sources') return { sources: [] };
    if (operation === 'tencentSheet.addField') { job.config.fields.push({ id: 'custom', name: payload.name, unit: payload.unit }); return structuredClone(job); }
    if (operation === 'tencentSheet.fetch') return { dataToken: 'source-proof', date: '2026-09-08', values: { custom: 8 }, rows: [{ id: 'custom', name: '合格数量', value: 8, unit: '件', source: '质量数据库', period: '业务当天', recordCount: 2 }] };
    if (operation === 'tencentSheet.inspect') return { date: '2026-09-08', sheet: '质量', token: 'write-proof', conflict: false, rows: [{ label: '合格数量', address: 'C8', current: '', value: 8 }], message: '检查通过' };
    return { message: '已完成' };
  });
  const container = document.createElement('div'); document.body.append(container); root = createRoot(container);
  await act(async () => root!.render(<TencentSheetPage id="job" changed={() => {}} />));
  const button = (text: string) => [...container.querySelectorAll('button')].find(button => button.textContent === text)!;
  expect(container.textContent).not.toMatch(/下料量|装焊量|型材入库量|板材入库量/);
  expect(button('检查本次数据与位置').disabled).toBe(true);
  const input = container.querySelector<HTMLInputElement>('input[placeholder="例如：合格数量"]')!;
  await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, '合格数量'); input.dispatchEvent(new Event('input', { bubbles: true })); });
  await act(async () => button('下一步 · 选择数据库').click());
  expect(container.textContent).toContain('绑定 Notion：合格数量');
  expect(button('获取本次 Notion 数据').disabled).toBe(true);
  expect(container.textContent).not.toContain('示范填报位置');
  // Reload the saved teaching and binding state, then test the actual page's data/confirmation chain.
  job.config.rules.custom = { rowStep: 1, columnStep: 0 };
  job.config.fields[0].notion = { sourceId: 'source', valueFieldId: 'value', queryMode: 'date', dateFieldId: 'date', period: 'day' };
  await act(async () => root!.render(<TencentSheetPage key="reloaded" id="job" changed={() => {}} />));
  await act(async () => button('获取本次 Notion 数据').click());
  expect(container.textContent).toContain('质量数据库');
  await act(async () => button('检查本次数据与位置').click());
  await act(async () => button('确认填报以上 1 项').click());
  expect(invoke.mock.calls.find(call => call[0] === 'tencentSheet.write')?.[1]).toMatchObject({ dataToken: 'source-proof', businessDate: '2026-09-08', token: 'write-proof' });
  expect(container.textContent).toContain('这会真实写入文档');
  await act(async () => button('后台自动测试并填写').click());
  const background = invoke.mock.calls.find(call => call[0] === 'tencentSheet.backgroundTest');
  expect(background?.[1]).toEqual({ id: 'job', businessDate: undefined });
  expect(button('确认填报以上 1 项')).toBeUndefined();
  expect(button('检查本次数据与位置').disabled).toBe(true);
  await act(async () => container.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click());
  expect(container.textContent).not.toContain('质量数据库');
  expect(button('检查本次数据与位置').disabled).toBe(true);
});
