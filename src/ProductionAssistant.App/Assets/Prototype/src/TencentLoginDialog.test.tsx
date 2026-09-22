import { act, StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('./bridge', () => ({ invoke }));
import { TencentLoginDialog } from './TencentLoginDialog';
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
let root: Root | undefined;
afterEach(async () => { if (root) await act(async () => root!.unmount()); root=undefined; document.body.innerHTML=''; vi.useRealTimers(); });
async function mount(onClose=vi.fn()) { const el=document.createElement('div');document.body.append(el);root=createRoot(el);await act(async()=>root!.render(<TencentLoginDialog id="job" onClose={onClose}/>));return onClose; }
function button(name:string){return [...document.querySelectorAll('button')].find(b=>b.textContent===name || b.getAttribute('aria-label')===name)!;}
it('requires consent explicitly, polls sequentially and finishes with the same session token',async()=>{
  vi.useFakeTimers();
  invoke.mockReset().mockImplementation(async(_:string,p:any)=>({start:{state:'consent'},consent:{state:'waiting',qr:'data:image/png;base64,AA=='},poll:{state:'success'},cancel:{state:'closed'}}[p.stage as string]));
  const close=await mount();expect(document.body.textContent).toContain('同意协议并继续');
  expect(invoke.mock.calls).toHaveLength(1);
  await act(async()=>button('同意协议并继续').click());expect(document.querySelector('img')?.alt).toContain('企业微信');
  await act(async()=>vi.advanceTimersByTimeAsync(1200));expect(document.querySelector('img')).toBeNull();
  expect(document.body.textContent).toContain('登录完成');
  await act(async()=>button('完成').click());expect(close).toHaveBeenCalledWith(true);
  expect(new Set(invoke.mock.calls.map(c=>c[1].sessionToken)).size).toBe(1);
  expect(invoke.mock.calls.map(c=>c[1].stage)).toEqual(['start','consent','poll','cancel']);
});
it('waits for an in-flight start before cancelling and ignores its late QR',async()=>{
  let resolve!:(value:any)=>void;invoke.mockReset().mockImplementation((_:string,p:any)=>p.stage==='start'?new Promise(r=>resolve=r):Promise.resolve({state:'closed'}));
  const close=await mount();await act(async()=>button('关闭登录弹窗').click());expect(invoke.mock.calls).toHaveLength(1);
  await act(async()=>resolve({state:'waiting',qr:'data:image/png;base64,AA=='}));
  expect(document.querySelector('img')).toBeNull();expect(close).toHaveBeenCalledWith(false);
  expect(invoke.mock.calls.map(c=>c[1].stage)).toEqual(['start','cancel']);
});
it('removes QR on polling errors and cleans up on route unmount',async()=>{
  vi.useFakeTimers();invoke.mockReset().mockImplementation(async(_:string,p:any)=>{if(p.stage==='poll')throw Error('页面已关闭');return p.stage==='start'?{state:'waiting',qr:'data:image/png;base64,AA=='}:{state:'closed'};});
  await mount();expect(document.querySelector('img')).not.toBeNull();
  await act(async()=>vi.advanceTimersByTimeAsync(1200));expect(document.querySelector('img')).toBeNull();expect(document.body.textContent).toContain('页面已关闭');
  await act(async()=>root!.unmount());root=undefined;
  expect(invoke.mock.calls.at(-1)?.[1].stage).toBe('cancel');
});
it('serializes StrictMode teardown and the replacement login',async()=>{
  let inFlight=0,maxInFlight=0;
  invoke.mockReset().mockImplementation(async(_:string,p:any)=>{inFlight++;maxInFlight=Math.max(maxInFlight,inFlight);await Promise.resolve();inFlight--;return {state:p.stage==='cancel'?'closed':'consent'};});
  const el=document.createElement('div');document.body.append(el);root=createRoot(el);
  await act(async()=>root!.render(<StrictMode><TencentLoginDialog id="job" onClose={()=>{}}/></StrictMode>));
  expect(invoke.mock.calls.map(c=>c[1].stage)).toEqual(['start','cancel','start']);
  expect(maxInFlight).toBe(1);expect(document.body.textContent).toContain('同意协议并继续');
});
it('opens official agreements through the desktop bridge without consenting',async()=>{
  invoke.mockReset().mockImplementation(async()=>({state:'consent'}));await mount();
  await act(async()=>document.querySelector<HTMLAnchorElement>('a')!.click());
  expect(invoke.mock.calls.at(-1)).toEqual(['tencentSheet.loginAgreement',{kind:'service'}]);
  expect(invoke.mock.calls.some(c=>c[1].stage==='consent')).toBe(false);
});
it('gives the document callback its own loading window after waiting for a phone scan',async()=>{
  vi.useFakeTimers();let state='waiting';
  invoke.mockReset().mockImplementation(async(_:string,p:any)=>({state:p.stage==='cancel'?'closed':state,qr:state==='waiting'?'data:image/png;base64,AA==':undefined}));
  await mount();await act(async()=>vi.advanceTimersByTimeAsync(60000));
  state='loading';await act(async()=>vi.advanceTimersByTimeAsync(1200));
  expect(document.body.textContent).toContain('正在准备二维码');expect(document.body.textContent).not.toContain('暂时无法确认');
  state='success';await act(async()=>vi.advanceTimersByTimeAsync(1200));expect(document.body.textContent).toContain('登录完成');
});
