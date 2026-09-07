import { useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import DatePicker from './DatePicker';
import sharedControls from './production-message.css?raw';
import controlRefinements from './control-refinements.css?raw';
import html from './message-template.html?raw';
import interFont from '../../Fonts/Inter.ttf?url';
import chineseFont from '../../Fonts/NotoSansSC.ttf?url';
import { invoke } from './bridge';
import { getDailyMetrics } from './dailyFieldCache';
import type { DailyField, DailyJobDetail, DailyRun } from './types';
import { mountTemplate, mountStoredDocument, snapshotEditor, timeScopes, type TokenChoice } from './messageTemplateAdapter';

type Job = DailyJobDetail & { metricSourceIds?:string[] };
export function MessageTemplatePage({id,back,changed,openSettings}:{id:string;back:()=>void;changed:()=>unknown;openSettings?:()=>void}) {
  const frame=useRef<HTMLIFrameElement>(null);
  const [error,setError]=useState('');
  useEffect(()=>{
    let disposed=false;
    const el=frame.current!;
    invoke<Job>('daily.get',{id}).then(job=>{
      if(disposed)return;
      const runtime=createMessageRuntime(job,{back,changed,openSettings});
      (el as any).dailyRuntime=runtime;
      // The approved Demo is the source of the live surface, including its script.
      el.srcdoc=html.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(interFont,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(chineseFont,window.location.href).href);
    }).catch(e=>{if(!disposed)setError(String(e.message||e))});
    return()=>{disposed=true;(el as any).dailyRuntime?.dispose();};
  },[id]);
  return <div className="message-template-host">{error&&<p role="alert">{error}</p>}<iframe ref={frame} title="日报消息模板" /></div>;
}

export function createMessageRuntime(job:Job,callbacks:{back:()=>void;changed:()=>unknown;openSettings?:()=>void}) {
  let disposed=false,sending=false;
  let dateRoot:Root|undefined;
  let document:Document|undefined;
  let serial:Promise<any>=Promise.resolve();
  let revision=0;
  let lastResult:any;
  const day=new Date();
  const definitions:TokenChoice[]=job.fields.map(field=>({key:field.placeholder,label:field.label.replace(' · ',''),metric:`${field.databaseId||field.binding?.dataSourceId}:${field.businessId||field.binding?.businessMetricId}`,scope:timeScopes.find(s=>JSON.stringify(s.spec)===JSON.stringify(field.dateRangeSpec))?.key||'legacy',keywords:field.label,field}));
  const metrics:Array<[string,string,string,number]>=[];
  let activeSources=job.metricSourceIds?.length?job.metricSourceIds:[...new Set(job.fields.map(f=>f.databaseId||f.binding?.dataSourceId).filter(Boolean))] as string[];
  const byField=new Map(job.fields.map(f=>[f.placeholder,f]));
  const materialized=new Map<string,Promise<TokenChoice>>();
  function status(text:string){const node=document?.querySelector('#preview-status');if(node)node.textContent=text;}
  function controls(){document?.querySelectorAll<HTMLButtonElement>('[data-send]').forEach(button=>button.disabled=sending||!job.notificationConfigured);}
  async function saveSnapshot(snapshot:ReturnType<typeof snapshotEditor>){
    if(snapshot.text===job.draftTemplate&&snapshot.document===job.draftTemplateDocument)return;
    await invoke('daily.saveTemplate',{id,...snapshot});
    job.draftTemplate=snapshot.text;job.draftTemplateDocument=snapshot.document;
  }
  async function settingsUpdated(){
    try{
      const fresh=await invoke<Job>('daily.get',{id});
      if(disposed)return;
      job.notificationConfigured=fresh.notificationConfigured;
      job.sources=fresh.sources;
      controls();
      document?.querySelector('[data-notification-notice]')?.toggleAttribute('hidden',!!job.notificationConfigured);
      await loadMetrics();
    }catch(error){status(String(error));}
  }
  async function loadMetrics(){
    const results=await Promise.allSettled(activeSources.map(async sourceId=>({sourceId,metrics:(await getDailyMetrics(id,sourceId)).metrics})));
    if(disposed)return;
    definitions.splice(0,definitions.length,...definitions.filter(d=>d.field));metrics.length=0;
    for(const result of results){if(result.status!=='fulfilled')continue;for(const metric of result.value.metrics){
      const key=`${result.value.sourceId}:${metric.id}`;
      metrics.push([key,metric.name,metric.name,0]);
      const scopes=metric.granularity==='monthly'?[{key:'month',label:'本月'}]:timeScopes;
      for(const scope of scopes)definitions.push({key:`${key}:${scope.key}`,metric:key,scope:scope.key,label:metric.granularity==='monthly'?metric.name:scope.label+metric.name,keywords:metric.name+' '+scope.label+' '+(job.sources.find(source=>source.id===result.value.sourceId)?.name||''),sourceId:result.value.sourceId,metricId:metric.id});
      for(const choice of definitions.filter(d=>d.metric===key&&d.field)){choice.sourceId=result.value.sourceId;choice.metricId=metric.id;}
    }}
    if(results.some(r=>r.status==='rejected'))status('部分指标目录读取失败，请到系统设置刷新数据库。');
    else if(!activeSources.length)status('请在右上角任务设置中配置本任务的指标范围。');
  }
  const id=job.id;
  const runtime={dirty(){revision++;lastResult=undefined;},id,name:job.name,sendTime:job.sendTime,businessDate:`${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`,definitions,metrics,
    value:(d:TokenChoice)=>d.metric==='date'?'业务日期':lastResult?.fieldValues?.[d.key] || lastResult?.fieldValues?.[definitions.find(choice=>choice.field&&choice.metric===d.metric&&choice.scope===d.scope)?.key || ''] || '',
    mount:(root:HTMLElement,pill:(d:TokenChoice)=>HTMLElement)=>{if(!mountStoredDocument(root,job.draftTemplateDocument,definitions,pill))mountTemplate(root,job.draftTemplate,definitions,pill);},
    async materialize(choice:TokenChoice):Promise<TokenChoice>{
      if(choice.field||choice.metric==='date')return choice;
      const metric=definitions.find(d=>d.metric===choice.metric&&d.sourceId);
      const sourceId=choice.sourceId||metric?.sourceId,metricId=choice.metricId||metric?.metricId;
      if(!sourceId||!metricId)throw new Error('此字段缺少可用的指标定义，请在任务设置中刷新指标。');
      const signature=JSON.stringify([sourceId,metricId,choice.scope,choice.label]);
      let pending=materialized.get(signature);
      if(!pending){pending=invoke<{field:DailyField}>('daily.addField',{id,sourceId,metricId,placeholder:'',displayName:choice.label,...(choice.scope==='month'?{rangeKind:'current-month'}:{dateRangeSpec:timeScopes.find(s=>s.key===choice.scope)?.spec})}).then(({field})=>{
        byField.set(field.placeholder,field);const result={...choice,key:field.placeholder,field,sourceId,metricId};
        if(!definitions.some(d=>d.key===result.key))definitions.push(result);
        callbacks.changed();return result;
      }).catch(error=>{materialized.delete(signature);throw error});materialized.set(signature,pending)}
      return pending;
    },
    save(root:HTMLElement){
      const snapshot=snapshotEditor(root);
      const task=serial.catch(()=>{}).then(()=>disposed?undefined:saveSnapshot(snapshot));
      serial=task;return task;
    },
    preview(root:HTMLElement,date:string){
      const snapshot=snapshotEditor(root),current=++revision;
      const task=serial.catch(()=>{}).then(async()=>{
        if(disposed||current!==revision)return {succeeded:false,text:'',message:'内容已修改，请重新生成预览',errors:[]};
        await saveSnapshot(snapshot);
        const result=await invoke<{succeeded:boolean;message:string;text:string;fieldValues?:Record<string,string>;fieldErrors?:{placeholder:string;message:string}[]}>('daily.preview',{id,businessDate:date},120000);
        const answer={...result,errors:result.fieldErrors||[],message:result.succeeded?'已生成 · '+date:result.message};
        if(current===revision&&!disposed)lastResult=answer;
        return answer;
      });serial=task;return task;
    },
    async send(root:HTMLElement,kind:'test'|'today',date:string){
      if(sending)return;
      if(!job.notificationConfigured)throw new Error('请先在系统设置中配置通知渠道。');
      sending=true;controls();
      try{
        await runtime.save(root);
        const result=await invoke<{succeeded:boolean;alreadySent?:boolean;message?:string}>(kind==='test'?'daily.test':'daily.sendToday',
          kind==='test'?{id,businessDate:date}:{id},120000);
        if(!result.succeeded)throw new Error(result.message||'发送失败，请查看运行记录');
        status(result.alreadySent?'今日当前内容已发送':kind==='test'?'测试发送成功':'今日消息已发送');
        callbacks.changed();
      }finally{sending=false;controls();}
    },
    configureAdvanced(metric:string,select:HTMLSelectElement){
      const monthly=definitions.some(d=>d.metric===metric&&d.scope==='month');
      const choices=monthly?[{key:'month',label:'本月计划'}]:[{key:'day',label:'日（业务日当天）'},{key:'mtd',label:'月累计（月初至业务日）'},{key:'ytd',label:'年累计（年初至业务日）'},{key:'fullyear',label:'全年'}];
      select.replaceChildren(...choices.map(choice=>new Option(choice.label,choice.key)));
      const year=select.ownerDocument.querySelector<HTMLSelectElement>('#scope-year');if(year){year.disabled=monthly;year.value='0';}
    },
    resolveAdvanced(granularity:string,year:string){return granularity==='month'?'month':timeScopes.find(s=>s.spec.granularity===granularity&&s.spec.yearOffset===Number(year))!.key;},
    async saveBasics(name:string,sendTime:string){
      const selected=Array.from(document?.querySelectorAll<HTMLInputElement>('[data-context-source]:checked')||[]).map(input=>input.value);
      await invoke('daily.saveBasics',{id,name,sendTime,metricSourceIds:selected});
      job.name=name;job.sendTime=sendTime;activeSources=selected;runtime.name=name;
      await loadMetrics();callbacks.changed();
    },
    connect(doc:Document){
      document=doc;doc.title=job.name;doc.querySelector('#runs p')!.textContent='';
      const header=doc.querySelector('header > span')!;header.removeAttribute('aria-hidden');header.setAttribute('role','button');header.setAttribute('tabindex','0');header.setAttribute('aria-label','返回任务列表');const leave=async()=>{const root=doc.querySelector<HTMLElement>('#editor')!;root.contentEditable='false';revision++;try{await runtime.save(root);callbacks.back()}catch(e){status(String(e));root.contentEditable='true'}};header.addEventListener('click',leave);header.addEventListener('keydown',e=>{if((e as KeyboardEvent).key==='Enter')leave()});
      const settings=doc.querySelector('#settings')!;
      const context=doc.createElement('fieldset');context.style.cssText='border:0;padding:0;max-height:180px;overflow:auto';const legend=doc.createElement('legend');legend.textContent='本任务的指标范围';context.append(legend);
      for(const source of job.sources){const label=doc.createElement('label');label.style.cssText='display:flex;gap:8px;margin:8px 0';const input=doc.createElement('input');input.type='checkbox';input.value=source.id;input.dataset.contextSource='';input.checked=activeSources.includes(source.id);input.style.width='auto';label.append(input,doc.createTextNode(source.name));context.append(label)}
      settings.querySelector('p')?.replaceWith(context);
      const databaseSettings=doc.createElement('button');databaseSettings.textContent='数据库设置';databaseSettings.type='button';databaseSettings.onclick=()=>{(settings as HTMLDialogElement).close();callbacks.openSettings?.()};context.after(databaseSettings);
      const footer=doc.querySelector('footer')!;
      for(const [kind,label] of [['test','测试发送'],['today','发送今日消息']] as const){
        const button=doc.createElement('button');button.textContent=label;button.dataset.send=kind;
        button.onclick=async()=>{
          const root=doc.querySelector<HTMLElement>('#editor')!;root.contentEditable='false';
          try{await runtime.send(root,kind,(doc.querySelector('#date') as HTMLInputElement).value)}
          catch(e){status(String(e))}finally{root.contentEditable='true'}
        };footer.append(button);
      }
      const style=doc.createElement('style');style.textContent=sharedControls+'\n'+controlRefinements+'\nbody{font-family:var(--font-ui)}#date-picker{width:154px}';doc.head.append(style);
      // The marker enables the same shared tokens and picker CSS as the main application.
      const marker=doc.createElement('span');marker.className='production-message-demo';marker.hidden=true;doc.body.append(marker);
      dateRoot=createRoot(doc.querySelector('#date-picker')!);
      dateRoot.render(<MessageDatePicker input={doc.querySelector<HTMLInputElement>('#date')!} />);
      window.addEventListener('production-settings-updated',settingsUpdated);
      const runs=doc.querySelector<HTMLDetailsElement>('#runs')!;
      runs.ontoggle=async()=>{if(!runs.open)return;const body=runs.querySelector('p')!;body.textContent='正在读取…';try{const result=await invoke<{runs:DailyRun[]}>('daily.runs',{id});body.textContent=result.runs.length?'':'暂无运行记录';for(const run of result.runs){const row=doc.createElement('div');row.textContent=`${run.time} · ${run.status} · ${run.businessDate}${run.error?' · '+run.error:''}`;body.append(row)}}catch(e){body.textContent=String(e)}};
      if(!job.notificationConfigured){const banner=doc.createElement('div');banner.className='notice';banner.dataset.notificationNotice='';banner.append(doc.createTextNode('通知渠道尚未配置。 '));const link=doc.createElement('button');link.textContent='通知设置';link.onclick=callbacks.openSettings||null;banner.append(link);doc.querySelector('#message')!.before(banner)}
      controls();loadMetrics().catch(e=>status(String(e)));
    },
    dispose(){disposed=true;revision++;dateRoot?.unmount();window.removeEventListener('production-settings-updated',settingsUpdated);}
  };
  return runtime;
}

function MessageDatePicker({input}:{input:HTMLInputElement}) {
  const [value,setValue]=useState(input.value);
  return <DatePicker value={value} onChange={next=>{
    setValue(next);input.value=next;
    input.dispatchEvent(new (input.ownerDocument.defaultView?.Event||Event)('change',{bubbles:true}));
  }} />;
}
