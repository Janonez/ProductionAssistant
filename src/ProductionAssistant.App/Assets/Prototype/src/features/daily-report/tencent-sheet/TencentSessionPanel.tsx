import { useCallback, useEffect, useRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { invoke } from '../../../bridge/index';
import { Button } from '../../../components/ui/button';
import { useTheme } from '../../../components/layout/ThemeProvider';

export type TencentSessionStatus = {
  state: 'closed' | 'login-required' | 'authenticated' | 'access-denied' | 'loading' | 'unverified' | 'unavailable' | 'profile-busy';
  browserOpen: boolean;
  authentication: 'unknown' | 'required' | 'authenticated';
  documentAccess: 'unknown' | 'allowed' | 'denied';
  editPermission: 'unknown' | 'read-only';
  verifiedAt: string | null;
  message: string;
  code?: string | null;
  recoveryHint?: string | null;
};
type Action = 'Status' | 'Open' | 'Verify' | 'Close';
const busyText: Record<Action, string> = { Open: '正在打开并检查…', Verify: '正在重新检查登录与文档访问…', Status: '正在读取浏览器状态…', Close: '正在关闭浏览器…' };
const states: Record<TencentSessionStatus['state'], string> = {
  closed: '浏览器已关闭', 'login-required': '等待登录', authenticated: '登录与访问已确认',
  'access-denied': '无文档访问权限', loading: '页面跳转中', unverified: '尚未确认', unavailable: '暂时无法验证', 'profile-busy': '会话被占用',
};

export function TencentSessionPanel({ documentUrl, disabled = false, onActive }: {
  documentUrl: string; disabled?: boolean; onActive?: (active: boolean) => void;
}) {
  const { resolvedTheme } = useTheme();
  const [status, setStatus] = useState<TencentSessionStatus>();
  const [busy, setBusy] = useState<Action>();
  const [error, setError] = useState('');
  const [lastCheckAt, setLastCheckAt] = useState<string | null>(null);
  const generation = useRef(0);
  const active = useRef<Action | undefined>(undefined);
  const target = documentUrl.trim();

  const run = useCallback(async (action: Action) => {
    if (active.current && action !== 'Close') return;
    if (active.current === 'Close') return;
    const current = ++generation.current;
    active.current = action;
    setBusy(action); setError(''); setStatus(undefined);
    try {
      const result = await invoke<TencentSessionStatus>(`tencentSheet.session${action}`, { documentUrl: target.trim() }, 60000);
      if (!result || !(result.state in states) || typeof result.browserOpen !== 'boolean') throw new Error('会话状态响应无效，请重新检查。');
      if (current === generation.current) {
        // Closed contexts can retain cookies, never a current authentication claim.
        setStatus(result.browserOpen ? result : { ...result, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null });
        if (result.verifiedAt && result.browserOpen) setLastCheckAt(result.verifiedAt);
      }
    } catch (failure) {
      if (current === generation.current) setError(failure instanceof Error ? failure.message : String(failure));
    } finally {
      if (current === generation.current) { active.current = undefined; setBusy(undefined); }
    }
  }, [target]);
  useEffect(() => {
    const current = ++generation.current;
    active.current = undefined; setLastCheckAt(null);
    queueMicrotask(() => { if (current === generation.current) void run('Status'); });
    return () => { generation.current++; active.current = undefined; };
  }, [run]);
  useEffect(() => { onActive?.(!!busy); }, [busy, onActive]);
  useEffect(() => {
    const refresh = () => { if (!disabled && !active.current) void run('Status'); };
    window.addEventListener('focus', refresh);
    const timer = status?.browserOpen && !error ? window.setInterval(refresh, 5000) : undefined;
    return () => { window.removeEventListener('focus', refresh); window.clearInterval(timer); };
  }, [run, status?.browserOpen, error, disabled]);
  return <section aria-label="腾讯文档登录与会话" aria-busy={!!busy} data-shadcn-surface=""
    className={`pa-shell-theme rounded-lg border bg-card p-5 text-card-foreground ${resolvedTheme === 'dark' ? 'dark' : ''}`}>
    <div className="mb-4 space-y-1"><h2 className="text-lg font-semibold">腾讯文档登录与会话</h2>
      <p className="text-sm text-muted-foreground">检查上方已保存的文档。请在 Edge 中扫码登录，再返回重新检查。关闭浏览器会保留登录资料。</p></div>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2"><Button disabled={!!busy || disabled || !target} onClick={() => run('Open')}>打开并检查</Button>
      <Button variant="outline" disabled={!!busy || disabled || !target} onClick={() => run('Verify')}>重新检查</Button></div>
      <Button variant="ghost" disabled={disabled || busy === 'Close' || (!busy && !status?.browserOpen && !error)} onClick={() => run('Close')}>关闭浏览器</Button>
    </div>
    <div className="mt-4 space-y-2 text-sm" role="status" aria-live="polite">
      {busy ? <p className="flex items-center gap-2"><LoaderCircle className="size-4 animate-spin" />{busyText[busy]}</p>
        : status ? <><p className="font-medium">{states[status.state]}</p><p>{status.message}</p>
          {status.recoveryHint && <p>{status.recoveryHint}</p>}
          <dl className="grid gap-1 sm:grid-cols-3"><div><dt className="text-muted-foreground">浏览器</dt><dd>{status.browserOpen ? '运行中' : status.state === 'closed' ? '已关闭' : '未确认'}</dd></div><div><dt className="text-muted-foreground">登录</dt><dd>{status.authentication === 'authenticated' ? '已登录' : status.authentication === 'required' ? '需要登录' : '未知'}</dd></div>
            <div><dt className="text-muted-foreground">文档访问</dt><dd>{status.documentAccess === 'allowed' ? '可访问' : status.documentAccess === 'denied' ? '无权限' : '未知'}</dd></div>
          </dl><p className="text-muted-foreground">编辑权限：{status.editPermission === 'read-only' ? '只读' : '未知（本阶段不试写）'}</p></>
          : <p className="text-muted-foreground">当前状态未知，请重新检查。</p>}
      <p className="text-muted-foreground">{status?.verifiedAt ? `最近检查：${new Date(status.verifiedAt).toLocaleString()}（检查时的结果）。` : lastCheckAt ? `历史检查：${new Date(lastCheckAt).toLocaleString()}，不能据此判断当前登录状态。` : '最近检查：尚未完成。'}</p>
    </div>
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error} 请确认浏览器和服务可用，然后重新检查或关闭后打开。</p>}
  </section>;
}
