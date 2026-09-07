import { act } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import html from './message-template.html?raw';
const {invoke}=vi.hoisted(()=>({invoke:vi.fn()}));
vi.mock('./bridge',()=>({invoke}));
import { createMessageRuntime } from './MessageTemplatePage';
import { clearDailyFieldCache } from './dailyFieldCache';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT=true;
let frame:HTMLIFrameElement;
let runtime:ReturnType<typeof createMessageRuntime>;
let doc:Document;
beforeEach(()=>{
  vi.useFakeTimers();localStorage.clear();clearDailyFieldCache();invoke.mockReset();
  invoke.mockImplementation((operation:string)=>Promise.resolve(operation==='daily.preview'
    ?{succeeded:true,text:'预览结果',fieldValues:{}}
    :operation==='daily.getProperties'?{metrics:[]}:{succeeded:true,saved:true}));
});
afterEach(()=>{
  act(()=>runtime?.dispose());frame?.remove();vi.useRealTimers();
});
async function mount(){
  frame=document.createElement('iframe');document.body.append(frame);doc=frame.contentDocument!;
  doc.open();doc.write(html.replace(/<script>[\s\S]*?<\/script>/,''));doc.close();
  runtime=createMessageRuntime({id:'job',name:'日报',sendTime:'17:30',fields:[],sources:[],draftTemplate:'消息',draftTemplateDocument:'',validated:false,isEnabled:false,notificationConfigured:true,notificationConnected:false} as any,{back:()=>{},changed:()=>{}});
  (frame as any).dailyRuntime=runtime;
  const script=html.match(/<script>([\s\S]*?)<\/script>/)![1];
  await act(async()=>{
    new Function('window','document','localStorage','getSelection',script)(frame.contentWindow,doc,localStorage,()=>doc.getSelection());
  });
}
const calls=(operation:string)=>invoke.mock.calls.filter(call=>call[0]===operation);

it('does not preview on entry, save, content edits or date changes; only the preview button fetches',async()=>{
  await mount();
  expect(calls('daily.preview')).toHaveLength(0);
  expect(doc.querySelector('#refresh')).toBeNull();
  const editor=doc.querySelector<HTMLElement>('#editor')!;
  editor.textContent='修改后的消息';
  await act(async()=>{
    editor.dispatchEvent(new doc.defaultView!.Event('input',{bubbles:true}));
    await vi.advanceTimersByTimeAsync(400);
  });
  expect(calls('daily.saveTemplate')).toHaveLength(1);
  expect(calls('daily.preview')).toHaveLength(0);
  await act(async()=>doc.querySelector<HTMLButtonElement>('#save')!.click());
  const date=doc.querySelector<HTMLInputElement>('#date')!;date.value='2026-09-06';
  await act(async()=>date.dispatchEvent(new doc.defaultView!.Event('change',{bubbles:true})));
  expect(calls('daily.preview')).toHaveLength(0);
  await act(async()=>doc.querySelector<HTMLButtonElement>('#preview-generate')!.click());
  expect(calls('daily.preview')).toHaveLength(1);
  expect(calls('daily.preview')[0][1]).toEqual({id:'job',businessDate:'2026-09-06'});
  await act(async()=>doc.querySelector<HTMLButtonElement>('#preview-generate')!.click());
  expect(calls('daily.preview')).toHaveLength(2);
});

it('renders the shared date picker inside the iframe and selecting a date does not query',async()=>{
  await mount();
  expect(doc.querySelector('input[type=date]')).toBeNull();
  await act(async()=>doc.querySelector<HTMLButtonElement>('.date-picker-trigger')!.click());
  expect(doc.querySelector('.date-picker-popover')).not.toBeNull();
  expect(document.querySelector('.date-picker-popover')).toBeNull();
  await act(async()=>doc.querySelector<HTMLButtonElement>('.date-picker-today-button')!.click());
  expect(doc.querySelector('.date-picker-popover')).toBeNull();
  expect(calls('daily.preview')).toHaveLength(0);
});

it('can send today and test independently before any preview, test success or task enablement',async()=>{
  await mount();
  const today=doc.querySelector<HTMLButtonElement>('[data-send=today]')!;
  const test=doc.querySelector<HTMLButtonElement>('[data-send=test]')!;
  expect(today.disabled).toBe(false);expect(test.disabled).toBe(false);
  doc.querySelector<HTMLInputElement>('#date')!.value='2026-09-06';
  await act(async()=>today.click());
  expect(calls('daily.sendToday')[0][1]).toEqual({id:'job'});
  await act(async()=>test.click());
  expect(calls('daily.test')[0][1]).toEqual({id:'job',businessDate:'2026-09-06'});
  expect(calls('daily.preview')).toHaveLength(0);
  expect(calls('daily.setEnabled')).toHaveLength(0);
});
