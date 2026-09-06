import type { DailyField } from './types';
export type TokenChoice = { key: string; label: string; metric: string; scope: string; keywords: string; sourceId?: string; metricId?: string; field?: DailyField };
export const timeScopes = [0,-1,-2].flatMap(yearOffset => [
  {granularity:'day',key:yearOffset===0?'today':`day${yearOffset}`,label:yearOffset===0?'今日':`${yearOffset===-1?'去年':'前年'}同日`},
  {granularity:'mtd',key:yearOffset===0?'mtd':yearOffset===-1?'lastmonth':'mtd-2',label:yearOffset===0?'本月累计':`${yearOffset===-1?'去年':'前年'}同期月累计`},
  {granularity:'ytd',key:yearOffset===0?'ytd':yearOffset===-1?'last':'ytd-2',label:yearOffset===0?'本年累计':`${yearOffset===-1?'去年':'前年'}同期`},
  {granularity:'fullyear',key:yearOffset===0?'fullyear':yearOffset===-1?'full':'full-2',label:`${yearOffset===0?'今年':yearOffset===-1?'去年':'前年'}全年`},
].map(scope=>({key:scope.key,label:scope.label,spec:{granularity:scope.granularity,yearOffset}})));
const systemTokens: Record<string,string> = { 'system.date':'today("yyyy年M月d日")', 'system.year':'today("yyyy年")', 'system.month':'today("M月")', 'system.day':'today("d日")' };
export function tokenPlaceholder(key:string) { return systemTokens[key] || key; }
export function snapshotEditor(root:HTMLElement) {
  const lines:any[][]=[[]];
  function text(value:string){value.replace(/\u00a0/g,' ').split('\n').forEach((part,index)=>{if(index)lines.push([]);if(!part)return;const line=lines.at(-1)!;if(line.at(-1)?.type==='text')line.at(-1).text+=part;else line.push({type:'text',text:part})});}
  function walk(node:Node){
    if(node.nodeType===3){text(node.textContent||'');return;}
    if(!(node instanceof root.ownerDocument.defaultView!.HTMLElement))return;
    if(node.dataset.key){
      const placeholder=tokenPlaceholder(node.dataset.key);
      lines.at(-1)!.push({type:placeholder.startsWith('today(')?'dateToken':'fieldToken',attrs:{placeholder,label:node.textContent||'',...(node.dataset.legacySpec?{dateRangeSpec:JSON.parse(node.dataset.legacySpec)}:{})}});return;
    }
    if(node.tagName==='BR'){text('\n');return;}
    if(node!==root&&['DIV','P'].includes(node.tagName)&&node.childNodes.length===1&&node.firstChild?.nodeName==='BR')return;
    Array.from(node.childNodes).forEach((child,index)=>{if(index&&child.nodeType===1&&['DIV','P'].includes((child as Element).tagName))text('\n');walk(child)});
  }
  walk(root);
  return {text:lines.map(line=>line.map(node=>node.type==='text'?node.text:node.attrs.placeholder).join('')).join('\n'),document:JSON.stringify({type:'doc',content:lines.map(content=>({type:'paragraph',content}))})};
}
export function storedTemplateText(document:string, fallback:string) {
  if(!document)return fallback;
  try {const doc=JSON.parse(document);const walk=(node:any):string=>node.type==='text'?node.text||'':node.type==='fieldToken'||node.type==='dateToken'?node.attrs?.placeholder||'':node.type==='hardBreak'?'\n':(node.content||[]).map(walk).join(node.type==='doc'?'\n':'');return walk(doc);}catch{return fallback;}
}
export function mountTemplate(root:HTMLElement, text:string, choices:TokenChoice[], pill:(d:TokenChoice)=>HTMLElement) {
  const refs:TokenChoice[]=[...choices,...Object.entries(systemTokens).map(([key,placeholder])=>({key:placeholder,label:key==='system.date'?'业务日期':key==='system.year'?'业务年份':key==='system.month'?'业务月份':'业务日',metric:'date',scope:'date',keywords:'',field:undefined}))].filter(d=>d.field||d.metric==='date').sort((a,b)=>b.key.length-a.key.length);
  let rest=text;
  while(rest){const hit=refs.map(d=>({d,index:rest.indexOf(d.key)})).filter(x=>x.index>=0).sort((a,b)=>a.index-b.index)[0];if(!hit){root.append(root.ownerDocument.createTextNode(rest));break;}if(hit.index)root.append(root.ownerDocument.createTextNode(rest.slice(0,hit.index)));root.append(pill(hit.d));rest=rest.slice(hit.index+hit.d.key.length);}
}

export function mountStoredDocument(root:HTMLElement, serialized:string, choices:TokenChoice[], pill:(d:TokenChoice)=>HTMLElement):boolean {
  if(!serialized)return false;
  let doc:any;try{doc=JSON.parse(serialized)}catch{return false}
  if(doc.type!=='doc')return false;
  function walk(node:any){
    if(node.type==='text'){root.append(root.ownerDocument.createTextNode(node.text||''));return;}
    if(node.type==='hardBreak'){root.append(root.ownerDocument.createTextNode('\n'));return;}
    if(node.type==='fieldToken'||node.type==='dateToken'){
      const key=node.attrs?.placeholder||'';
      let choice=choices.find(d=>d.key===key);
      if(!choice){choice={key,label:node.type==='dateToken'?'业务日期':node.attrs?.label||'已有数据',metric:node.type==='dateToken'?'date':'legacy',scope:'legacy',keywords:node.attrs?.label||''};choices.push(choice);}
      const token=pill(choice);
      // Compatibility only: keep the old document's authoritative date intent until this reference is edited.
      if(node.attrs?.dateRangeSpec)token.dataset.legacySpec=JSON.stringify(node.attrs.dateRangeSpec);
      root.append(token);return;
    }
    (node.content||[]).forEach((child:any,index:number)=>{if(node.type==='doc'&&index)root.append(root.ownerDocument.createTextNode('\n'));walk(child)});
  }
  walk(doc);return true;
}
