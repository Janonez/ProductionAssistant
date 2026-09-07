import { beforeEach, expect, it, vi } from 'vitest';
const {invoke}=vi.hoisted(()=>({invoke:vi.fn()}));
vi.mock('./bridge',()=>({invoke}));
import { createMessageRuntime } from './MessageTemplatePage';
import { snapshotEditor, storedTemplateText, mountStoredDocument } from './messageTemplateAdapter';
const field={placeholder:'{weld}',label:'今日焊接量',databaseId:'source',businessId:'weld',dateRangeSpec:{granularity:'day' as const,yearOffset:0}};
function setup(){const job:any={id:'job',name:'日报',sendTime:'17:30',fields:[field],sources:[],draftTemplate:'',draftTemplateDocument:'',validated:false};return createMessageRuntime(job,{back:()=>{},changed:()=>{}})}
function editor(text='今日焊接：'){const root=document.createElement('div');root.innerHTML=text+'<span class="token" data-key="{weld}">今日焊接量</span> t';return root;}
beforeEach(()=>{invoke.mockReset();invoke.mockImplementation((operation:string)=>Promise.resolve(operation==='daily.preview'?{succeeded:true,text:'今日焊接：42 t',fieldValues:{'{weld}':'42'}}:{saved:true}));});
it('saves reference-only nodes and keeps old placeholders stable',()=>{const snapshot=snapshotEditor(editor());expect(snapshot.text).toBe('今日焊接：{weld} t');expect(JSON.parse(snapshot.document).content[0].content[1].attrs).toEqual({placeholder:'{weld}',label:'今日焊接量'});expect(snapshot.document).not.toContain('sourceId')});
it('loads legacy structured templates without losing date or field references',()=>{expect(storedTemplateText(JSON.stringify({type:'doc',content:[{type:'paragraph',content:[{type:'fieldToken',attrs:{placeholder:'{legacy}'}},{type:'hardBreak'},{type:'dateToken',attrs:{placeholder:'today("M月")'}}]}]}),'fallback')).toBe('{legacy}\ntoday("M月")')});
it('saves edits without querying and fetches fresh data on every explicit preview',async()=>{const runtime=setup();await runtime.save(editor());runtime.dirty();await runtime.save(editor('焊接合计：'));expect(invoke.mock.calls.filter(c=>c[0]==='daily.preview')).toHaveLength(0);await runtime.preview(editor(),'2026-09-06');await runtime.preview(editor(),'2026-09-06');expect(invoke.mock.calls.filter(c=>c[0]==='daily.preview')).toHaveLength(2)});
it('creates a new binding for scope edits without mutating the original reference',async()=>{invoke.mockResolvedValue({field:{...field,placeholder:'{year}'}});const runtime=setup();const next=await runtime.materialize({key:'year',label:'本年焊接量',metric:'source:weld',scope:'ytd',sourceId:'source',metricId:'weld',keywords:''});expect(next.key).toBe('{year}');expect(runtime.definitions.find(d=>d.key==='{weld}')?.field?.placeholder).toBe('{weld}');expect(invoke).toHaveBeenCalledWith('daily.addField',expect.objectContaining({placeholder:'',dateRangeSpec:{granularity:'ytd',yearOffset:0}}))});
it('keeps month-plan selection semantic instead of forcing date-range queries',async()=>{invoke.mockResolvedValue({field:{...field,placeholder:'{plan}'}});await setup().materialize({key:'plan',label:'焊接月计划',metric:'source:plan',scope:'month',sourceId:'source',metricId:'plan',keywords:''});expect(invoke).toHaveBeenCalledWith('daily.addField',expect.objectContaining({rangeKind:'current-month'}));expect(invoke.mock.calls[0][1]).not.toHaveProperty('dateRangeSpec')});
it('keeps partial preview errors and never reports the preview as fully successful',async()=>{invoke.mockImplementation((operation:string)=>Promise.resolve(operation==='daily.preview'?{succeeded:false,text:'焊接失败，下料正常',message:'部分字段失败',fieldErrors:[{placeholder:'{weld}',message:'超时'}]}:{}));const result=await setup().preview(editor(),'2026-09-06');expect(result.succeeded).toBe(false);expect(result.errors).toHaveLength(1);expect(result.text).toContain('下料正常')});

it('round-trips per-reference legacy date intent until the reference is changed',()=>{const root=document.createElement('div');const spec={granularity:'mtd',yearOffset:-1};const doc=JSON.stringify({type:'doc',content:[{type:'paragraph',content:[{type:'fieldToken',attrs:{placeholder:'{weld}',dateRangeSpec:spec}}]}]});mountStoredDocument(root,doc,[],d=>{const span=document.createElement('span');span.className='token';span.dataset.key=d.key;span.textContent=d.label;return span});expect(JSON.parse(snapshotEditor(root).document).content[0].content[0].attrs.dateRangeSpec).toEqual(spec)});
it('preserves empty lines in both plain text and browser-created blocks',()=>{const root=document.createElement('div');root.textContent='\n正文';expect(snapshotEditor(root).text).toBe('\n正文');root.innerHTML='<div>第一行</div><div><br></div><div>第三行</div>';expect(snapshotEditor(root).text).toBe('第一行\n\n第三行')});

it('keeps separate legacy occurrence attributes during document serialization',()=>{const root=editor();const second=root.querySelector('span')!.cloneNode(true) as HTMLElement;second.dataset.legacySpec=JSON.stringify({granularity:'ytd',yearOffset:-1});root.append(second);const nodes=JSON.parse(snapshotEditor(root).document).content[0].content.filter((n:any)=>n.type==='fieldToken');expect(nodes[0].attrs.dateRangeSpec).toBeUndefined();expect(nodes[1].attrs.dateRangeSpec.yearOffset).toBe(-1)});

it('resolves both scope axes into the persisted query intent',async()=>{
 const runtime=setup();invoke.mockResolvedValue({field});
 for(const [granularity,year] of [['day','0'],['mtd','-1'],['ytd','-1'],['fullyear','-1'],['ytd','-2']]){
  const scope=runtime.resolveAdvanced(granularity,year);
  await runtime.materialize({key:scope,label:scope,metric:'source:weld',scope,sourceId:'source',metricId:'weld',keywords:''});
  expect(invoke).toHaveBeenLastCalledWith('daily.addField',expect.objectContaining({dateRangeSpec:{granularity,yearOffset:Number(year)}}));
 }
});
it('saves year month day and complete business dates with distinct stable references',()=>{
 const root=document.createElement('div');
 for(const key of ['year','month','day','date']){const node=document.createElement('span');node.dataset.key='system.'+key;root.append(node);}
 const nodes=JSON.parse(snapshotEditor(root).document).content[0].content;
 expect(nodes.map((n:any)=>n.attrs.placeholder)).toEqual(['today("yyyy年")','today("M月")','today("d日")','today("yyyy年M月d日")']);
 expect(nodes.every((n:any)=>n.type==='dateToken')).toBe(true);
});
