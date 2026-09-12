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
  const job = { id: 'job', config: { documentUrl: 'https://docs.qq.com/sheet/test', sheetPattern: '下料、装焊（{yy}年{M}月）', company: '滨海公司', park: '滨海园区', startColumn: 'F', cuttingRow: 9, weldingRow: 19, inboundRow: 35, adapter: { anchors: {} } } };
  invoke.mockReset().mockImplementation(async (operation: string) => operation === 'tencentSheet.get' ? job : { date: '2026-09-08', sheet: '测试月报', token: 'one-use', conflict: false, rows: [{ label: '下料量', address: 'M9', current: '', value: 1 }], message: '检查通过' });
  const container = document.createElement('div'); document.body.append(container); root = createRoot(container);
  await act(async () => root!.render(<TencentSheetPage id="job" changed={() => {}} />));
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['tencentSheet.get', 'tencentSite.list']);
  expect(container.textContent).not.toMatch(/高级设置|CSS|起始列|月份工作表名称/);
  expect(container.textContent).toContain('记住网页当前工作表');
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
  expect(button('确认填报以上 4 项').disabled).toBe(false);
  expect(invoke.mock.calls.some(call => call[0] === 'tencentSheet.write')).toBe(false);
  await edit(inputs[0], '2');
  expect(button('确认填报以上 4 项')).toBeUndefined();
  await act(async () => button('检查本次数据与位置').click());
  await act(async () => button('确认填报以上 4 项').click());
  expect(invoke.mock.calls.find(call => call[0] === 'tencentSheet.write')?.[1]).toMatchObject({ businessDate: '2026-09-08', token: 'one-use', values: { cutting: '2' } });
});
