import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('./bridge', () => ({ invoke }));
import { TencentTemplateTeaching } from './TencentTemplateTeaching';
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
let root: Root | undefined;
afterEach(() => { if (root) act(() => root!.unmount()); document.body.innerHTML = ''; });
const button = (text: string) => [...document.querySelectorAll('button')].find(button => button.textContent === text)!;
const click = async (text: string) => { await act(async () => button(text).click()); };
const saved = vi.fn(), active = vi.fn();
async function mount() {
  invoke.mockReset(); saved.mockReset(); active.mockReset();
  const slots = ['firstTarget', 'secondTarget', 'dateHeader', 'label'];
  invoke.mockImplementation(async (_, payload: any) => {
    if (payload.stage === 'start') return { step: 'firstTarget', sessionToken: 'session' };
    if (payload.stage === 'capture') return { slot: payload.slot, capture: { address: 'F9', value: '项目' }, step: slots[slots.indexOf(payload.slot) + 1] || 'preview' };
    if (payload.stage === 'preview') return { step: 'confirm', previewToken: 'proof', prediction: { date: '2026-09-03', address: 'F15' }, rule: { rowStep: 3, columnStep: 0, labelAnchor: { expected: '下料量' }, dateAnchor: { format: '{yyyy}/{M}/{d}' } } };
    return { message: '已完成' };
  });
  const container = document.createElement('div'); document.body.append(container); root = createRoot(container);
  await act(async () => root!.render(<TencentTemplateTeaching id="job" metrics={[{ value: 'cutting', label: '下料量' }]} fixedSheet={false} disabled={false} run={async (_, work) => work()} onActive={active} onSaved={saved} />));
}
it('requires four captures, read-only prediction and explicit confirmation before saving', async () => {
  await mount(); expect(invoke).not.toHaveBeenCalled();
  await click('开始示范此项目'); expect(active).toHaveBeenLastCalledWith(true);
  for (let index = 0; index < 4; index++) await click('记住当前选中的单元格');
  expect(saved).not.toHaveBeenCalled();
  expect(button('位置正确，保存此项目')).toBeUndefined();
  await click('验证规则并查看第三个位置');
  expect(document.body.textContent).toContain('每天向下 3 行');
  expect(document.body.textContent).toContain('F15');
  expect(saved).not.toHaveBeenCalled();
  await click('位置正确，保存此项目');
  expect(invoke.mock.calls.at(-1)?.[1]).toMatchObject({ stage: 'confirm', sessionToken: 'session', previewToken: 'proof' });
  expect(saved).toHaveBeenCalledTimes(1); expect(active).toHaveBeenLastCalledWith(false);
  expect(invoke.mock.calls.every(call => call[0] === 'tencentSheet.teach')).toBe(true);
});
it('keeps the current step after capture failure and cancels without saving', async () => {
  await mount(); await click('开始示范此项目');
  invoke.mockRejectedValueOnce(new Error('请选择单个单元格'));
  await click('记住当前选中的单元格');
  expect(document.querySelector('[role=alert]')?.textContent).toContain('请选择单个单元格');
  expect(button('记住当前选中的单元格')).toBeDefined();
  await click('取消示范，保留原配置');
  expect(saved).not.toHaveBeenCalled(); expect(active).toHaveBeenLastCalledWith(false);
  expect(button('开始示范此项目')).toBeDefined();
});
