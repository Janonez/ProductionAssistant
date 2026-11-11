import { act, StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('../../../bridge/index', () => ({ invoke }));
import { TencentSessionPanel, type TencentSessionStatus } from './TencentSessionPanel';
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
const url = 'https://docs.qq.com/sheet/fixture';
const closed: TencentSessionStatus = { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '当前没有浏览器会话。' };
const authenticated: TencentSessionStatus = { ...closed, state: 'authenticated', browserOpen: true, authentication: 'authenticated', documentAccess: 'allowed', verifiedAt: '2026-11-10T01:00:00Z', message: '后端确认登录与访问。' };
let root: Root | undefined;
afterEach(async () => { if (root) await act(async () => root!.unmount()); root = undefined; document.body.innerHTML = ''; vi.useRealTimers(); });
async function mount(initial = closed) {
  invoke.mockReset().mockResolvedValue(initial);
  const container = document.createElement('div'); document.body.append(container); root = createRoot(container);
  await act(async () => root!.render(<StrictMode><TencentSessionPanel documentUrl={url} /></StrictMode>));
  return container;
}
const button = (text: string) => [...document.querySelectorAll('button')].find(item => item.textContent === text)!;

it('reads status automatically once even in StrictMode and immediately displays Verify results', async () => {
  const container = await mount();
  expect(invoke.mock.calls).toEqual([['tencentSheet.sessionStatus', { documentUrl: url }, 60000]]);
  expect(container.textContent).toContain('浏览器已关闭');
  expect(container.textContent).not.toContain('读取当前状态');
  invoke.mockResolvedValue({ ...closed, state: 'login-required', browserOpen: true, authentication: 'required', message: '请在 Edge 登录。' });
  await act(async () => button('打开并检查').click());
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionOpen', { documentUrl: url }, 60000);
  expect(container.textContent).toContain('需要登录');
  invoke.mockResolvedValue(authenticated);
  await act(async () => button('重新检查').click());
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionVerify', { documentUrl: url }, 60000);
  expect(container.textContent).toContain('后端确认登录与访问');
  expect(container.textContent).toContain('未知（本阶段不试写）');
  expect(container.textContent).toContain('最近检查');
  invoke.mockResolvedValue(closed);
  await act(async () => button('关闭浏览器').click());
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionClose', { documentUrl: url }, 60000);
  expect([...container.querySelectorAll('dd')].map(item => item.textContent)).toEqual(['已关闭', '未知', '未知']);
  expect(container.textContent).toContain('历史检查');
  expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(3);
  expect(container.querySelector('[data-shadcn-surface]')).not.toBeNull();
});

it('blocks same-tick duplicate opens, shows loading and ignores late success after close', async () => {
  const container = await mount();
  let finishOpen!: (value: TencentSessionStatus) => void;
  invoke.mockImplementation((operation: string) => operation.endsWith('Open') ? new Promise(resolve => { finishOpen = resolve; }) : Promise.resolve(closed));
  await act(async () => { button('打开并检查').click(); button('打开并检查').click(); });
  expect(invoke.mock.calls.filter(call => call[0].endsWith('Open'))).toHaveLength(1);
  expect(container.textContent).toContain('正在打开并检查');
  expect(button('打开并检查').disabled).toBe(true);
  expect(button('重新检查').disabled).toBe(true);
  await act(async () => button('关闭浏览器').click());
  await act(async () => finishOpen(authenticated));
  expect(container.textContent).not.toContain('后端确认登录与访问');
  expect(container.textContent).toContain('当前没有浏览器会话');
  expect(button('打开并检查').disabled).toBe(false);
});

it('renders transport failures, profile conflicts, denied access and unknown without stale success', async () => {
  const container = await mount(authenticated);
  invoke.mockRejectedValueOnce(new Error('服务连接已中断'));
  await act(async () => button('重新检查').click());
  expect(container.querySelector('[role="alert"]')?.textContent).toContain('服务连接已中断');
  expect(container.querySelector('[role="alert"]')?.textContent).toContain('重新检查或关闭后打开');
  expect(container.textContent).not.toContain('后端确认登录与访问');
  invoke.mockResolvedValue({ ...closed, state: 'profile-busy', code: 'ProfileBusy', message: '另一个会话正在使用登录浏览器。', recoveryHint: '先关闭另一个浏览器。' });
  await act(async () => button('打开并检查').click());
  expect(container.textContent).toContain('会话被占用');
  expect(container.textContent).toContain('先关闭另一个浏览器');
  expect(container.querySelector('[role="alert"]')).toBeNull();
  invoke.mockResolvedValue({ ...authenticated, state: 'access-denied', documentAccess: 'denied', message: '无文档权限。', recoveryHint: '请申请访问授权。' });
  await act(async () => button('重新检查').click());
  expect(container.textContent).toContain('无文档访问权限');
  expect(container.textContent).toContain('请申请访问授权');
  invoke.mockResolvedValue({ ...closed, state: 'unverified', browserOpen: true, message: '本次结果未知' });
  await act(async () => button('重新检查').click());
  expect([...container.querySelectorAll('dd')].map(item => item.textContent)).toEqual(['运行中', '未知', '未知']);
  expect(container.textContent).toContain('本次结果未知');
});

it('automatically observes user closing Edge and does not claim live login from a closed context', async () => {
  const container = await mount(authenticated);
  vi.useFakeTimers();
  invoke.mockResolvedValue({ ...authenticated, state: 'closed', browserOpen: false });
  await act(async () => window.dispatchEvent(new Event('focus')));
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionStatus', { documentUrl: url }, 60000);
  expect([...container.querySelectorAll('dd')].map(item => item.textContent)).toEqual(['已关闭', '未知', '未知']);
  expect(container.textContent).toContain('历史检查');
});

it('restores backend state on remount and ignores old-target and unmounted responses', async () => {
  const container = await mount(authenticated);
  await act(async () => root!.render(<TencentSessionPanel key="remount" documentUrl={url} />));
  expect(container.textContent).toContain('后端确认登录与访问');
  let finish!: (value: TencentSessionStatus) => void;
  invoke.mockImplementation((operation: string) => operation.endsWith('Verify') ? new Promise(resolve => { finish = resolve; }) : Promise.resolve(closed));
  await act(async () => button('重新检查').click());
  await act(async () => root!.render(<TencentSessionPanel documentUrl="https://docs.qq.com/sheet/other" />));
  await act(async () => finish(authenticated));
  expect(container.textContent).not.toContain('后端确认登录与访问');
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionStatus', { documentUrl: 'https://docs.qq.com/sheet/other' }, 60000);
  await act(async () => button('重新检查').click());
  await act(async () => root!.unmount()); root = undefined;
  await act(async () => finish(authenticated));
});
