import{c as Te,r as u,j as e,C as le,D as he,i as O,u as un,B as ge,L as re,a as ve,I as mn,S as Je,b as Ge,g as hn,n as gn,d as Le,e as Fe,f as Me,h as Pe,k as Be,l as Oe,R as xn}from"./index-Dqn8zKJx.js";import{u as fn,R as bn}from"./useDelayedSkeleton-CG9iy9SL.js";import{P as yn,E as vn,F as wn,T as kn,A as jn}from"./triangle-alert-AjXNL6jn.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=Te("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=Te("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=Te("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),Ve=["firstTarget","secondTarget","dateHeader","label"],Ue=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function Cn(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function En({id:n,metrics:a,initialMetric:s,businessDate:b,rules:d,fixedSheet:l,disabled:r,run:p,onActive:x,onSaved:A}){var t,f;const[j,R]=u.useState(s||((t=a[0])==null?void 0:t.value)||""),[y]=u.useState(()=>(b==null?void 0:b.slice(0,7))||Cn()),[S,$]=u.useState(`${y}-01`),[m,C]=u.useState(`${y}-02`),[c,N]=u.useState(),[D,E]=u.useState({}),[q,I]=u.useState(""),V=!!c,U=((f=a.find(k=>k.value===j))==null?void 0:f.label)||"业务字段",o={firstTarget:`${S} 的${U}填报格`,secondTarget:`${m} 的${U}填报格`,dateHeader:`${S} 的日期单元格`,label:"项目名称、公司或材料表头"};async function v(k){I(""),await p(k==="preview"?"验证排列并定位第三个日期":k==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const w=await O("tencentSheet.teach",{id:n,stage:k,metric:j,firstDate:S,secondDate:m,sessionToken:c==null?void 0:c.sessionToken,previewToken:c==null?void 0:c.previewToken,slot:c==null?void 0:c.step},3e5);k==="confirm"||k==="cancel"?(N(void 0),E({}),x(!1),k==="confirm"&&await A()):(N(L=>({...L,...w})),x(!0),w.capture&&w.slot&&E(L=>({...L,[w.slot]:w.capture})))}catch(w){I(w instanceof Error?w.message:String(w)),k==="cancel"&&(N(void 0),E({}),x(!1))}})}return e.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:r,children:[e.jsx("legend",{children:"示范填报位置"}),e.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范只读取位置与表头，受保护或已有数据的单元格也可使用，不检查是否可编辑、不填写数据。程序学习两个日期的排列关系，再请你确认第三个位置；正式填报前才检查目标是否可编辑。"}),e.jsx("div",{className:"tencent-teaching-rules",children:a.map(k=>e.jsxs("div",{children:[e.jsx("strong",{children:k.label}),e.jsx("span",{children:d!=null&&d[k.value]?Ue(d[k.value]):"待示范位置"})]},k.value))}),q&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"示范未完成"}),e.jsx("span",{children:q})]})}),V?e.jsxs(e.Fragment,{children:[e.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Ve.map((k,w)=>{var L;return e.jsxs("li",{"aria-current":c.step===k?"step":void 0,className:D[k]?"done":"",children:[e.jsxs("span",{children:[w+1,". ",o[k]]}),e.jsx("strong",{children:((L=D[k])==null?void 0:L.address)||"待选取"})]},k)})}),Ve.includes(c.step)&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:["请在网页中单击：",o[c.step]]}),e.jsx("p",{children:c.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":c.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可。受保护或已有数据的格子也可示范，无需解除保护或输入数据。"}),e.jsx("button",{className:"primary",onClick:()=>v("capture"),children:"记住当前选中的单元格"})]}),c.step==="preview"&&e.jsx("button",{className:"primary",onClick:()=>v("preview"),children:"验证规则并查看第三个位置"}),c.step==="confirm"&&c.rule&&c.prediction&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:[U,"：",Ue(c.rule)]}),e.jsxs("p",{children:["程序已选中 ",c.prediction.date," 的预测位置 ",e.jsx("b",{children:c.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),e.jsxs("p",{children:["日期及“",c.rule.labelAnchor.expected,"”已通过只读校验。"]}),(c.sheetMode==="fixed"||!c.sheetMode&&l)&&!c.rule.dateAnchor.format.includes("{yyyy}")&&e.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>v("preview"),children:"再次定位预测位置"}),e.jsx("button",{className:"primary",onClick:()=>v("confirm"),children:"位置正确，保存此项目"})]})]}),e.jsx("button",{className:"ghost",onClick:()=>v("cancel"),children:"取消示范，保留原配置"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("label",{children:["要示范哪个项目？",e.jsx(le,{value:j,options:a,placeholder:"选择项目",disabled:r,ariaLabel:"要示范的项目",onChange:R})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsx(he,{value:S,onChange:$,label:"第一个示范日期",disabled:r}),e.jsx(he,{value:m,onChange:C,label:"第二个示范日期",disabled:r})]}),e.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),e.jsx("button",{className:"secondary",disabled:r||!j||!S||!m,onClick:()=>v("start"),children:d!=null&&d[j]?"重新示范此项目":"开始示范此项目"})]})]})}const be=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击保存状态控件的位置，无需等待特定文字。"}];function Tn({id:n,value:a,disabled:s,onSaved:b,onActive:d}){var v;const[l,r]=u.useState(),[p,x]=u.useState(!1),[A,j]=u.useState(""),[R,y]=u.useState(""),[S,$]=u.useState(!1),[m,C]=u.useState(""),[c,N]=u.useState([]),[D,E]=u.useState(),[q,I]=u.useState();function V(){C(""),N([])}function U(){r(structuredClone(a??{})),x(!1),y(""),$(!1),E(void 0),I(void 0),V(),d(!0)}async function o(t,f){if(!l)return;j(f??t),$(!1),y(f?be.find(w=>w.key===f).prompt:"正在操作…");const k=m;t!=="save"&&V(),(t==="open"||t==="testSheet"||f==="sheetTab")&&E(void 0),(t==="open"||t==="testSheet"||t==="captureCell"||f==="sheetTab"||f==="cellAddressBox")&&I(void 0);try{let w=await O(`tencentSite.${t}`,{id:n,controls:l,key:f,token:k},3e5);t==="pick"&&f==="sheetTab"&&(w.controls&&r(w.controls),j("testSheet"),y("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…"),w=await O("tencentSite.testSheet",{id:n,controls:w.controls??l},3e5)),y(w.message),$(w.passed===!1),t==="open"&&x(!0),w.controls&&r(w.controls),"testCell"in w&&I(w.testCell??void 0),(t==="testSheet"||f==="sheetTab")&&E(w),w.sheetRequired&&(E({passed:!1,message:w.message}),I(void 0)),t==="test"&&(C(w.token??""),N(w.steps)),t==="save"&&(await b(),r(void 0),d(!1))}catch(w){$(!0),y(w instanceof Error?w.message:String(w)),V()}finally{j("")}}return e.jsxs("fieldset",{className:"card tencent-web-controls tencent-sheet-panel","aria-busy":!!A,disabled:s,children:[e.jsx("h2",{children:"网页控件录制"}),e.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在“业务字段”中单独配置。"}),l?e.jsx(e.Fragment,{children:e.jsxs("fieldset",{className:"tencent-site-fields",disabled:s||!!A,children:[e.jsx("button",{className:p?"secondary":"primary",onClick:()=>o("open"),children:p?"重新打开配置文档":"开始配置"}),e.jsxs("div",{className:"tencent-site-recording",children:[e.jsx("div",{className:"tencent-site-controls",children:be.map(t=>e.jsxs("div",{children:[e.jsx("strong",{children:t.title}),e.jsxs("span",{className:"tencent-control-state",children:[t.key==="sheetTab"&&(D!=null&&D.passed)?"已录制 · 检验通过":l[t.key]?"已录制":"未配置",t.key==="saveStatus"&&l.saveStatus?` · ${l.saveStatus.sampleText}`:""]}),e.jsxs("button",{className:"secondary",disabled:!p||t.key!=="sheetTab"&&!(D!=null&&D.passed)||t.key==="cellEditor"&&!q,onClick:()=>o("pick",t.key),children:["录制",t.key==="sheetTab"?" Sheet 标签":t.key==="cellEditor"?"内容编辑区":t.key==="saveStatus"?"保存状态":"单元格名称框"]}),t.key==="sheetTab"&&l.sheetTab&&e.jsx("button",{className:"secondary",disabled:!p,onClick:()=>o("testSheet"),children:"重新检验 Sheet"}),t.key==="saveStatus"&&l.saveStatus&&e.jsx("button",{className:"secondary",onClick:()=>{const f={...l};delete f.saveStatus,r(f),V()},children:"移除保存状态"})]},t.key))}),e.jsxs("div",{className:"tencent-site-instructions",children:[e.jsx("strong",{children:be.some(t=>t.key===A)?"正在等待网页点选":A==="testSheet"?"正在检验 Sheet":"控件录制模式"}),e.jsx("p",{children:"先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。"}),e.jsx("p",{children:"录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。"}),D&&e.jsxs("div",{className:`notice tencent-sheet-check ${D.passed?"info":"error"}`,role:D.passed?"status":"alert",children:[e.jsx("strong",{children:D.passed?"Sheet 检验通过":"Sheet 检验未通过"}),e.jsx("ol",{className:"tencent-site-results",children:(v=D.steps)==null?void 0:v.map(t=>e.jsxs("li",{children:[e.jsx("strong",{children:t.label}),e.jsx("span",{children:t.detail}),t.names&&e.jsxs("details",{children:[e.jsx("summary",{children:"查看全部 Sheet 名称"}),e.jsx("ul",{children:t.names.map((f,k)=>e.jsx("li",{children:f},`${k}:${f}`))})]})]},t.label))}),!D.passed&&e.jsx("p",{children:D.message})]}),(D==null?void 0:D.passed)&&e.jsxs("div",{className:"tencent-sheet-guidance tencent-test-cell",role:"status",children:[e.jsx("strong",{children:q?`临时测试格：${q.sheet}!${q.address}`:"请选择一个可编辑的空白格"}),e.jsx("p",{children:q?"此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。":"在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}),e.jsx("button",{className:"secondary",disabled:!p||!l.cellAddressBox,onClick:()=>o("captureCell"),children:"读取当前测试格"})]})]})]}),!!(c!=null&&c.length)&&e.jsx("ol",{className:"tencent-site-results",children:c.map(t=>e.jsxs("li",{children:[e.jsx("strong",{children:t.label}),e.jsx("span",{children:t.detail})]},t.label))}),e.jsx("p",{className:"tencent-sheet-help",children:"录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",disabled:!p||!(D!=null&&D.passed)||!q||!l.cellAddressBox||!l.cellEditor,onClick:()=>o("test"),children:"检验单元格控件"}),e.jsx("button",{className:p?"primary":"secondary",disabled:!m,onClick:()=>o("save"),children:"保存网页控件"}),e.jsx("button",{className:"secondary",onClick:()=>{r(void 0),E(void 0),I(void 0),d(!1),V(),y("")},children:"取消"})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"checklist",children:be.map(t=>e.jsxs("div",{className:"check-item",children:[e.jsx("span",{className:`mark ${a!=null&&a[t.key]?"":"pending"}`,children:a!=null&&a[t.key]?"✓":"·"}),t.title.slice(2),e.jsx("span",{className:"tencent-control-state",children:a!=null&&a[t.key]?"已录制":t.key==="saveStatus"?"未配置":"待录制"})]},t.key))}),e.jsx("button",{className:"secondary",onClick:U,children:a?"重新录制网页控件":"录制网页控件"})]}),R&&e.jsx("div",{className:`notice ${S?"error":"info"}`,role:S?"alert":"status",children:R})]})}function $n({id:n,field:a,disabled:s,continueToTeaching:b=!1,onSave:d,onCancel:l}){const[r,p]=u.useState(a.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[x,A]=u.useState(!0),[j,R]=u.useState([]),[y,S]=u.useState([]),[$,m]=u.useState([]),[C,c]=u.useState(!1),[N,D]=u.useState(!1),[E,q]=u.useState("");u.useEffect(()=>{let t=!0;return A(!0),O("tencentSheet.sources",{id:n}).then(f=>{t&&R(f.sources)}).catch(f=>{t&&q(String(f))}).finally(()=>{t&&A(!1)}),()=>{t=!1}},[n]),u.useEffect(()=>{let t=!0;if(S([]),q(""),c(!1),!!r.sourceId)return c(!0),O("tencentSheet.schema",{id:n,sourceId:r.sourceId}).then(f=>{t&&S(f.fields)}).catch(f=>{t&&q(String(f))}).finally(()=>{t&&c(!1)}),()=>{t=!1}},[n,r.sourceId]),u.useEffect(()=>{let t=!0;if(m([]),D(!1),!(r.queryMode!=="view"||!r.sourceId))return D(!0),O("tencentSheet.views",{id:n,sourceId:r.sourceId},12e4).then(f=>{t&&m(f.views)}).catch(f=>{t&&q(String(f))}).finally(()=>{t&&D(!1)}),()=>{t=!1}},[n,r.sourceId,r.queryMode]);const I=t=>t.map(f=>({value:f.id,label:f.name})),V=y.filter(t=>["number","formula","rollup"].includes(t.type??"")),U=y.filter(t=>t.type==="date"),o=s||x||C||r.queryMode==="view"&&N,v=j.some(t=>t.id===r.sourceId)&&V.some(t=>t.id===r.valueFieldId)&&(r.queryMode==="date"?U.some(t=>t.id===r.dateFieldId):$.some(t=>t.id===r.datasetId));return e.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[e.jsxs("legend",{children:["绑定 Teable：",a.name]}),e.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),e.jsxs("label",{children:["Teable 数据库",e.jsx(le,{loading:x,value:r.sourceId,options:I(j),placeholder:"选择已有数据库",ariaLabel:"Teable 数据库",disabled:o,onChange:t=>p({...r,sourceId:t,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),e.jsxs("label",{children:["取数方式",e.jsx(le,{value:r.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:o,onChange:t=>{q(""),p({...r,queryMode:t})}})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["数值字段",e.jsx(le,{loading:C,value:r.valueFieldId,options:I(V),placeholder:"选择要汇总的数值字段",disabled:o,onChange:t=>p({...r,valueFieldId:t})})]}),r.queryMode==="date"?e.jsxs("label",{children:["日期字段",e.jsx(le,{loading:C,value:r.dateFieldId,options:I(U),placeholder:"选择用于筛选的日期字段",disabled:o,onChange:t=>p({...r,dateFieldId:t})})]}):e.jsxs("label",{children:["Teable View",e.jsx(le,{loading:N,value:r.datasetId,options:I($),placeholder:"选择真实 View",disabled:o,onChange:t=>p({...r,datasetId:t})})]})]}),r.queryMode==="date"?e.jsxs("label",{children:["统计范围",e.jsx(le,{value:r.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:o,onChange:t=>p({...r,period:t})})]}):e.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Teable 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),E&&e.jsx("p",{role:"alert",children:E}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"primary",disabled:o||!v,onClick:()=>{var t,f,k;return d({...r,sourceName:(t=j.find(w=>w.id===r.sourceId))==null?void 0:t.name,valueFieldName:(f=V.find(w=>w.id===r.valueFieldId))==null?void 0:f.name,datasetName:(k=$.find(w=>w.id===r.datasetId))==null?void 0:k.name})},children:b?"下一步 · 录制位置":"保存数据绑定"}),e.jsx("button",{className:"secondary",disabled:s,onClick:l,children:"稍后继续"})]})]})}const Ke={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},Dn=["周日","周一","周二","周三","周四","周五","周六"];function An({rule:n,schedule:a,disabled:s,onChange:b}){const[d,l]=u.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),r=n.kind==="fixed"?"fixed":d?"offset":n.offsetDays===0?"today":"previous";return e.jsxs("fieldset",{className:"card tencent-sheet-panel",disabled:s,children:[e.jsx("h2",{children:"执行频率与业务日期"}),e.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["执行频率",e.jsxs("select",{value:a.weekdays.length===7?"daily":"weekly",disabled:s,onChange:p=>b(n,{...a,weekdays:p.target.value==="daily"?[...Ke.weekdays]:[1,2,3,4,5]}),children:[e.jsx("option",{value:"daily",children:"每天"}),e.jsx("option",{value:"weekly",children:"指定星期"})]})]}),e.jsxs("label",{children:["业务日期",e.jsxs("select",{value:r,disabled:s,onChange:p=>{const x=p.target.value;l(x==="offset"),b(x==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:x==="today"?0:n.kind==="relative"&&x==="offset"?n.offsetDays:-1},a)},children:[e.jsx("option",{value:"previous",children:"执行当天的前一天"}),e.jsx("option",{value:"today",children:"执行当天"}),e.jsx("option",{value:"offset",children:"相对执行当天偏移 N 天"}),e.jsx("option",{value:"fixed",children:"指定固定日期"})]})]})]}),a.weekdays.length!==7&&e.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(p=>e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:a.weekdays.includes(p),onChange:x=>b(n,{...a,weekdays:x.target.checked?[...a.weekdays,p]:a.weekdays.filter(A=>A!==p)})}),Dn[p]]},p))}),r==="offset"&&n.kind==="relative"&&e.jsxs("label",{children:["偏移天数（负数向前，正数向后）",e.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:p=>b({kind:"relative",offsetDays:p.target.value===""?NaN:Number(p.target.value)},a)})]}),n.kind==="fixed"&&e.jsx(he,{label:"固定业务日期",value:n.date,onChange:p=>b({kind:"fixed",date:p},a),disabled:s}),e.jsx("div",{className:"divider"}),e.jsx("div",{className:"tencent-sheet-grid",children:a.times.map((p,x)=>e.jsxs("div",{children:[e.jsxs("label",{children:["执行时刻 ",x+1,"（北京时间）"]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("input",{type:"time","aria-label":`执行时刻 ${x+1}（北京时间）`,value:p,onChange:A=>b(n,{...a,times:a.times.map((j,R)=>R===x?A.target.value:j)})}),e.jsxs("button",{className:"ghost",disabled:a.times.length===1,onClick:()=>b(n,{...a,times:a.times.filter((A,j)=>j!==x)}),children:["移除时刻 ",x+1]})]})]},x))}),e.jsx("button",{className:"secondary",disabled:a.times.length>=24,onClick:()=>{const p=Array.from({length:24},(x,A)=>`${String(A).padStart(2,"0")}:00`).find(x=>!a.times.includes(x));p&&b(n,{...a,times:[...a.times,p]})},children:"添加执行时刻"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}const In={Open:"正在打开并检查…",Verify:"正在重新检查登录与文档访问…",Status:"正在读取浏览器状态…",Close:"正在关闭浏览器…"},We={closed:"浏览器已关闭","login-required":"等待登录",authenticated:"登录与访问已确认","access-denied":"无文档访问权限",loading:"页面跳转中",unverified:"尚未确认",unavailable:"暂时无法验证","profile-busy":"会话被占用"};function Rn({documentUrl:n,disabled:a=!1,onActive:s}){const{resolvedTheme:b}=un(),[d,l]=u.useState(),[r,p]=u.useState(),[x,A]=u.useState(""),[j,R]=u.useState(null),y=u.useRef(0),S=u.useRef(void 0),$=n.trim(),m=u.useCallback(async C=>{if(S.current&&C!=="Close"||S.current==="Close")return;const c=++y.current;S.current=C,p(C),A(""),l(void 0);try{const N=await O(`tencentSheet.session${C}`,{documentUrl:$.trim()},6e4);if(!N||!(N.state in We)||typeof N.browserOpen!="boolean")throw new Error("会话状态响应无效，请重新检查。");c===y.current&&(l(N.browserOpen?N:{...N,authentication:"unknown",documentAccess:"unknown",editPermission:"unknown",verifiedAt:null}),N.verifiedAt&&N.browserOpen&&R(N.verifiedAt))}catch(N){c===y.current&&A(N instanceof Error?N.message:String(N))}finally{c===y.current&&(S.current=void 0,p(void 0))}},[$]);return u.useEffect(()=>{const C=++y.current;return S.current=void 0,R(null),queueMicrotask(()=>{C===y.current&&m("Status")}),()=>{y.current++,S.current=void 0}},[m]),u.useEffect(()=>{s==null||s(!!r)},[r,s]),u.useEffect(()=>{const C=()=>{!a&&!S.current&&m("Status")};window.addEventListener("focus",C);const c=d!=null&&d.browserOpen&&!x?window.setInterval(C,5e3):void 0;return()=>{window.removeEventListener("focus",C),window.clearInterval(c)}},[m,d==null?void 0:d.browserOpen,x,a]),e.jsxs("section",{"aria-label":"腾讯文档登录与会话","aria-busy":!!r,"data-shadcn-surface":"",className:`pa-shell-theme rounded-lg border bg-card p-5 text-card-foreground ${b==="dark"?"dark":""}`,children:[e.jsxs("div",{className:"mb-4 space-y-1",children:[e.jsx("h2",{className:"text-lg font-semibold",children:"腾讯文档登录与会话"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"重新检查在后台完成。需要扫码时可前往集团填报的网页配置；也可主动打开文档处理网页验证。关闭浏览器会保留登录资料。"})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(ge,{disabled:!!r||a||!$,onClick:()=>m("Open"),children:"打开并检查"}),e.jsx(ge,{variant:"outline",disabled:!!r||a||!$,onClick:()=>m("Verify"),children:"重新检查"})]}),e.jsx(ge,{variant:"ghost",disabled:a||r==="Close"||!r&&!(d!=null&&d.browserOpen)&&!x,onClick:()=>m("Close"),children:"关闭浏览器"})]}),e.jsxs("div",{className:"mt-4 space-y-2 text-sm",role:"status","aria-live":"polite",children:[r?e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(re,{className:"size-4 animate-spin"}),In[r]]}):d?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-medium",children:We[d.state]}),e.jsx("p",{children:d.message}),d.recoveryHint&&e.jsx("p",{children:d.recoveryHint}),e.jsxs("dl",{className:"grid gap-1 sm:grid-cols-3",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"浏览器"}),e.jsx("dd",{children:d.browserOpen?"运行中":d.state==="closed"?"已关闭":"未确认"})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"登录"}),e.jsx("dd",{children:d.authentication==="authenticated"?"已登录":d.authentication==="required"?"需要登录":"未知"})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"文档访问"}),e.jsx("dd",{children:d.documentAccess==="allowed"?"可访问":d.documentAccess==="denied"?"无权限":"未知"})]})]}),e.jsxs("p",{className:"text-muted-foreground",children:["编辑权限：",d.editPermission==="editable"?"文档可编辑":d.editPermission==="read-only"?"只读":"未知（只读检查）"]})]}):e.jsx("p",{className:"text-muted-foreground",children:"当前状态未知，请重新检查。"}),e.jsx("p",{className:"text-muted-foreground",children:d!=null&&d.verifiedAt?`最近检查：${new Date(d.verifiedAt).toLocaleString()}（检查时的结果）。`:j?`历史检查：${new Date(j).toLocaleString()}，不能据此判断当前登录状态。`:"最近检查：尚未完成。"})]}),x&&e.jsxs("p",{role:"alert",className:"mt-3 text-sm text-destructive",children:[x," 请确认浏览器和服务可用，然后重新检查或关闭后打开。"]})]})}const Ee=n=>n instanceof Error?n.message:String(n);function zn({onCreated:n,onCancel:a}){const[s,b]=u.useState(""),[d,l]=u.useState(!1),[r,p]=u.useState("");async function x(){l(!0),p("");try{await n(await O("tencentSheet.create",{documentUrl:s}))}catch(A){p(Ee(A))}finally{l(!1)}}return e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"新建文档填报任务"}),e.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),e.jsxs("label",{children:["文档分享链接",e.jsx("input",{type:"url",disabled:d,value:s,onChange:A=>b(A.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),r&&e.jsx("p",{role:"alert",children:r}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",disabled:d,onClick:a,children:"取消"}),e.jsxs("button",{className:"primary",disabled:d||!s.trim(),onClick:x,children:[d&&e.jsx(re,{className:"spin"}),"创建并配置"]})]})]})}function Xe({id:n,changed:a,back:s,name:b}){var Ie,Re;const d=ve(),l=[{id:"doc",label:"文档与账号"},{id:"control",label:"网页控件"},{id:"fields",label:"业务字段"},{id:"rule",label:"执行规则"},{id:"test",label:"测试与上线"}],[r,p]=u.useState("doc"),[x,A]=u.useState("front"),[j,R]=u.useState(!1),[y,S]=u.useState(!1),$=i=>{i==="control"&&S(!0),p(i)},[m,C]=u.useState(),[c,N]=u.useState(),[D,E]=u.useState(""),[q,I]=u.useState(""),[V,U]=u.useState(!1),[o,v]=u.useState(!1),[t,f]=u.useState(""),[k,w]=u.useState(),[L,W]=u.useState(!1),[Z,J]=u.useState(""),[g,F]=u.useState(!1),[z,h]=u.useState(!1),[T,P]=u.useState(!1),[B,ae]=u.useState([]),[te,ie]=u.useState(""),[se,ce]=u.useState(""),[ne,oe]=u.useState(""),[we,fe]=u.useState(""),$e=u.useRef(null),[H,De]=u.useState(),[ln,ke]=u.useState(!1),Ae=fn(D==="获取 Teable 数据",!!H);u.useEffect(()=>{if(!q||V)return;const i=window.setTimeout(()=>I(""),2400);return()=>window.clearTimeout(i)},[q,V]);const je=i=>{N(i),J(i.config.documentUrl)},pe=()=>O("tencentSheet.get",{id:n}).then(je);u.useEffect(()=>{let i=!0;return d.read("tencentSheet.get",{id:n}).then(M=>{i&&je(M)}).catch(M=>{i&&(U(!0),I(Ee(M)))}),()=>{i=!1}},[n]),u.useEffect(()=>{var i,M;(ne||we)&&((M=(i=$e.current)==null?void 0:i.scrollIntoView)==null||M.call(i,{block:"start"}))},[ne,we]);async function G(i,M){E(i),I(""),U(!1);try{await M()}catch(Q){U(!0),I(Ee(Q))}finally{E("")}}function _(){De(void 0),ke(!1),w(void 0)}function Ne(i){N(M=>M&&{...M,config:i}),W(!0),_()}async function cn(i,M){var Q;_(),N(await O("tencentSheet.updateField",{id:n,fieldId:i.id,name:i.name,unit:i.unit,...M?{notion:M}:{}})),fe(""),(Q=c==null?void 0:c.config.rules)!=null&&Q[i.id]||(oe(ue?i.id:""),I(ue?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),a()}async function Se(){if(!c)return;const i=await O("tencentSheet.save",{id:n,config:c.config,configRevision:c.configRevision??0});je(i),W(!1),_(),a()}async function pn(i){L&&await Se(),_();const M=await O(`tencentSheet.${i}`,{id:n},3e5);I(M.message),M.sheets&&ae([...new Set(M.sheets)]),await pe()}if(!c)return q?e.jsx("div",{className:"notice",role:"alert",children:q}):e.jsxs("p",{role:"status",children:[e.jsx(re,{className:"spin"}),"正在读取填报配置…"]});const Y=c.config,ue=!!((Ie=Y.webControls)!=null&&Ie.sheetTab&&Y.webControls.cellAddressBox&&Y.webControls.cellEditor),K=Y.fields??[],me=K.find(i=>i.id===ne),de=K.find(i=>i.id===we),X=!!D||g||!!de||T||z;return e.jsx("div",{className:"tencent-demo","aria-busy":!!D,children:e.jsxs("div",{className:"page tencent-sheet-workbench",children:[s&&e.jsx("button",{className:"crumb",onClick:s,disabled:X,children:"← 返回任务列表"}),e.jsxs("div",{className:"titlebar",children:[e.jsxs("div",{children:[e.jsx("h1",{children:b||"腾讯文档填报"}),e.jsxs("div",{className:"subtitle",children:["腾讯文档填报 · 业务日期 ",c.businessDate??"获取数据时确定"]})]}),e.jsxs("div",{className:"tencent-badges",children:[e.jsxs("span",{className:`badge ${c.enabled?"success":"warning"}`,children:["● 定时",c.enabled?"已启用":"未启用"]}),e.jsx("span",{className:"badge neutral",children:c.validated&&!L?"已验证":"待验证"})]})]}),c.enabled&&e.jsxs("div",{className:"banner",children:[e.jsxs("p",{children:["定时填报当前处于",e.jsx("strong",{children:"已启用"}),"状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。"]}),e.jsx("button",{className:"btn btn-secondary",disabled:X,onClick:()=>G("停用定时填报",async()=>{await O("automation.setEnabled",{taskType:"tencent_sheet_fill",id:n,enabled:!1},6e4),await pe(),a(),I("已停用定时填报，现在可以修改配置。")}),children:"立即停用"})]}),e.jsx("div",{className:"status-strip",children:[{ok:ue,text:ue?"网页控件已录制":"网页控件待录制"},{ok:K.length>0&&K.every(i=>{var M;return i.notion&&((M=Y.rules)==null?void 0:M[i.id])}),text:`业务字段 ${K.filter(i=>{var M;return i.notion&&((M=Y.rules)==null?void 0:M[i.id])}).length}/${K.length} 已绑定`},{ok:!!c.enabled,text:c.enabled?"定时已启用":"定时未启用"}].map(i=>e.jsxs("span",{className:`status-chip ${i.ok?"ok":"pending"}`,children:[e.jsx("span",{className:"dot"}),i.text]},i.text))}),e.jsx("div",{className:"tabs",role:"tablist","aria-label":"腾讯文档配置",children:l.map((i,M)=>e.jsx("button",{id:`tencent-tab-${i.id}`,role:"tab","aria-selected":r===i.id,"aria-controls":`tencent-panel-${i.id}`,tabIndex:r===i.id?0:-1,disabled:X,className:`tab ${r===i.id?"active":""}`,onClick:()=>$(i.id),onKeyDown:Q=>{var qe;if(!["ArrowLeft","ArrowRight","Home","End"].includes(Q.key))return;Q.preventDefault();const ze=Q.key==="Home"?0:Q.key==="End"?l.length-1:(M+(Q.key==="ArrowRight"?1:-1)+l.length)%l.length;$(l[ze].id),(qe=document.getElementById(`tencent-tab-${l[ze].id}`))==null||qe.focus()},children:i.label},i.id))}),e.jsxs("div",{className:"panel active",role:"tabpanel",id:`tencent-panel-${r}`,"aria-labelledby":`tencent-tab-${r}`,children:[e.jsxs("div",{hidden:r!=="doc",style:r==="doc"?void 0:{display:"none"},children:[e.jsxs("fieldset",{disabled:X,className:"card tencent-sheet-panel",children:[e.jsx("h2",{children:"目标文档"}),e.jsx("p",{className:"hint",children:"填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。"}),e.jsxs("div",{"data-shadcn-surface":"",className:"space-y-2",children:[e.jsx("label",{htmlFor:`document-url-${n}`,children:"文档链接"}),e.jsx(mn,{id:`document-url-${n}`,type:"url",disabled:c.enabled,value:Y.documentUrl,onChange:i=>Ne({...Y,documentUrl:i.target.value})}),e.jsx("p",{className:"text-sm text-muted-foreground",children:Y.documentUrl!==Z?"链接尚未保存。保存后才能检查新文档；离开页面会放弃未保存修改。":"文档链接已保存。切换页面或重启应用后自动恢复。"}),L&&e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(ge,{disabled:X||!!c.enabled,onClick:()=>G("保存文档配置",async()=>{await Se(),I("文档配置已保存，可打开浏览器检查。")}),children:"保存文档配置"}),e.jsx(ge,{variant:"outline",disabled:X,onClick:()=>G("放弃未保存修改",async()=>{await pe(),W(!1),_()}),children:"放弃修改"})]})]}),e.jsxs("details",{className:"tencent-document-check",children:[e.jsx("summary",{children:"工作表识别与检查"}),e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"secondary",disabled:c.enabled,onClick:()=>G("识别页面",()=>pn("recognize")),children:"识别并检查"})}),e.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!B.length&&e.jsxs("label",{children:["工作表名称",e.jsx(le,{value:Y.sheetReferenceName??Y.capturedSheet??Y.sheetName??"",options:B.map(i=>({value:i,label:i})),placeholder:"选择识别到的工作表名称",disabled:X||!!c.enabled,onChange:i=>Ne({...Y,sheetReferenceName:i})})]}),(Y.sheetReferenceName||Y.capturedSheet||Y.sheetMode==="fixed")&&e.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",Y.sheetReferenceName??Y.capturedSheet??Y.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]})]}),e.jsx(Rn,{documentUrl:Z,disabled:L||!!D||g||T,onActive:h},n)]}),e.jsx("div",{hidden:r!=="control",style:r==="control"?void 0:{display:"none"},children:y&&e.jsx(Tn,{id:n,value:Y.webControls,disabled:!!D||g||!!de||L||!!c.enabled,onActive:i=>{P(i),i&&_()},onSaved:async()=>{await pe(),_(),a()}},n)}),r==="fields"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:X||L||c.enabled,className:"card tencent-sheet-panel",children:[e.jsxs("div",{className:"add-field-toggle",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"已绑定的业务字段"}),e.jsx("p",{className:"hint",children:"取数、月份和填写位置共用本次业务日期。"})]}),e.jsx("button",{className:"secondary",onClick:()=>R(!j),children:"+ 添加业务字段"})]}),j&&e.jsxs("div",{className:"add-field-form open",children:[e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["业务字段名称",e.jsx("input",{value:te,placeholder:"例如：合格数量",onChange:i=>ie(i.target.value)})]}),e.jsxs("label",{children:["单位（可选）",e.jsx("input",{value:se,placeholder:"例如：件",onChange:i=>ce(i.target.value)})]})]}),e.jsx("button",{className:"primary",disabled:!te.trim(),onClick:()=>G("新增业务字段",async()=>{var M,Q;_();const i=await O("tencentSheet.addField",{id:n,name:te,unit:se});N(i),oe(""),fe(((Q=(M=i.config.fields)==null?void 0:M.at(-1))==null?void 0:Q.id)??""),ie(""),ce(""),R(!1),a()}),children:"下一步 · 选择数据库"}),e.jsx("button",{className:"ghost",onClick:()=>R(!1),children:"取消"})]}),!K.length&&e.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),e.jsx("div",{className:"field-list",children:K.map(i=>{var M;return e.jsxs("div",{className:"field-row",children:[e.jsxs("span",{children:[e.jsxs("strong",{children:[i.name,i.unit?`（${i.unit}）`:""]}),e.jsxs("small",{className:"tencent-control-state",children:[(M=Y.rules)!=null&&M[i.id]?"位置已示范":"待示范位置"," · ",i.notion?`${i.notion.sourceName??"Teable"} / ${i.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"ghost",disabled:!ue||!i.notion,onClick:()=>{oe(i.id),_()},"aria-label":`示范位置：${i.name}`,children:"示范位置"}),e.jsx("button",{className:"ghost",onClick:()=>{fe(i.id),oe(""),_()},"aria-label":`绑定数据：${i.name}`,children:"绑定数据"}),e.jsx("button",{className:"btn-danger-ghost",onClick:()=>G("删除业务字段",async()=>{_(),N(await O("tencentSheet.deleteField",{id:n,fieldId:i.id})),ne===i.id&&oe(""),a()}),"aria-label":`删除：${i.name}`,children:"删除"})]})]},i.id)})})]}),(me||de)&&e.jsxs("div",{ref:$e,children:[me&&!de&&e.jsx(En,{id:n,businessDate:o&&t?t:c.businessDate,metrics:[{value:me.id,label:me.name}],initialMetric:me.id,rules:Y.rules,fixedSheet:Y.sheetMode==="fixed",disabled:!!D||L||T,run:G,onActive:i=>{F(i),i&&_()},onSaved:async()=>{await pe(),_(),oe(""),I("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),a()}},`${n}:${me.id}:${JSON.stringify(Y.rules)}`),de&&e.jsx($n,{id:n,field:de,continueToTeaching:ue&&!((Re=Y.rules)!=null&&Re[de.id]),disabled:!!D,onCancel:()=>fe(""),onSave:i=>G("保存数据绑定",()=>cn(de,i))},de.id)]})]}),r==="rule"&&e.jsx(e.Fragment,{children:e.jsx(An,{rule:Y.businessDateRule??{kind:"relative",offsetDays:-1},schedule:Y.executionSchedule??Ke,disabled:X||!!c.enabled,onChange:(i,M)=>Ne({...Y,businessDateRule:i,executionSchedule:M})})}),L&&r==="rule"&&e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"primary",disabled:X,onClick:()=>G("保存任务配置",async()=>{await Se(),I("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"})}),r==="test"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("h2",{children:"运行测试"}),e.jsx("div",{className:"segmented",role:"group","aria-label":"测试模式",children:[{id:"front",label:"前台测试"},{id:"back",label:"后台自动测试"}].map(i=>e.jsx("button",{"aria-pressed":x===i.id,disabled:X,className:x===i.id?"active":"",onClick:()=>A(i.id),children:i.label},i.id))}),x==="front"&&e.jsxs("fieldset",{disabled:X||L,className:"test-mode active tencent-test-fields",children:[e.jsx("p",{className:"test-desc",children:"浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。"}),e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:o,onChange:i=>{v(i.target.checked),_()}}),"指定补填日期"]}),o?e.jsx(he,{label:"本次业务日期",disabled:!!D,value:t,onChange:i=>{f(i),_()}}):e.jsxs("p",{children:["按已保存规则计算的业务日期：",(H==null?void 0:H.date)??c.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),e.jsxs("button",{className:"secondary",disabled:!K.length||o&&!t||K.some(i=>{var M;return!((M=Y.rules)!=null&&M[i.id])||!i.notion}),onClick:()=>G("获取 Teable 数据",async()=>{w(void 0),ke(!1),De(await O("tencentSheet.fetch",{id:n,businessDate:o?t:void 0},3e5)),ke(!0),I("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:[D==="获取 Teable 数据"&&e.jsx(re,{className:"spin"}),"获取本次 Teable 数据"]}),Ae&&e.jsxs("div",{className:"tencent-sheet-table","aria-label":"正在加载业务数据",children:[e.jsxs("p",{children:["业务日期：",o?t:c.businessDate??"正在读取"]}),e.jsx(bn,{columns:["业务字段","数值","来源与范围","记录数"],rows:K.length})]}),H&&!Ae&&e.jsxs("div",{className:"tencent-sheet-table","aria-busy":D==="获取 Teable 数据",children:[e.jsxs("p",{children:["业务日期：",H.date]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"业务字段"}),e.jsx("th",{children:"数值"}),e.jsx("th",{children:"来源与范围"}),e.jsx("th",{children:"记录数"})]})}),e.jsx("tbody",{children:H.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.name}),e.jsxs("td",{children:[i.value," ",i.unit]}),e.jsxs("td",{children:[i.source," · ",i.period]}),e.jsx("td",{children:i.recordCount})]},i.id))})]})]}),e.jsx("button",{className:"primary",disabled:!K.length||o&&!t||!H||!ln,onClick:()=>G("检查填报位置",async()=>{w(void 0);const i=await O("tencentSheet.inspect",{id:n,dataToken:H==null?void 0:H.dataToken,businessDate:(H==null?void 0:H.date)??(o?t:void 0)},3e5);w(i),I(i.message),a()}),children:"检查本次数据与位置"})]}),x==="back"&&e.jsxs("fieldset",{disabled:X||L,className:"test-mode active tencent-test-fields",children:[e.jsxs("p",{className:"hint",children:["本次业务日期：",o?t||"请在前台测试选择补填日期":c.businessDate??"执行时确定",o?"（指定补填日期）":"（按已保存规则）"]}),e.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),e.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Teable。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),e.jsx("button",{className:"primary",disabled:!K.length||K.some(i=>{var M;return!i.notion||!((M=Y.rules)!=null&&M[i.id])})||o&&!t,onClick:()=>G("后台取数、填报并确认保存",async()=>{_();try{const i=await O("tencentSheet.backgroundTest",{id:n,businessDate:o?t:void 0},6e5);I(i.message)}finally{await pe(),a()}}),children:"后台自动测试并填写"}),c.enabled&&e.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]})]}),x==="front"&&k&&e.jsxs("section",{className:"card tencent-sheet-panel",children:[e.jsx("h3",{children:"确认填报"}),e.jsxs("p",{children:["业务日期：",k.date," · ",k.sheet]}),e.jsx("div",{className:"tencent-sheet-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"项目"}),e.jsx("th",{children:"位置"}),e.jsx("th",{children:"原内容"}),e.jsx("th",{children:"本次填报"})]})}),e.jsx("tbody",{children:k.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.label}),e.jsx("td",{children:i.address}),e.jsx("td",{children:i.current||"空白"}),e.jsx("td",{children:i.value})]},i.address))})]})}),e.jsx("p",{children:k.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),e.jsxs("button",{className:"primary",disabled:X||!k.token||k.conflict,onClick:()=>G("填报并确认保存",async()=>{const i=k;w(void 0);const M=await O("tencentSheet.write",{id:n,dataToken:H==null?void 0:H.dataToken,businessDate:i.date,token:i.token},31e4);I(M.message),a()}),children:["确认填报以上 ",k.rows.length," 项"]})]}),e.jsxs("details",{className:"tencent-run-history",children:[e.jsx("summary",{onClick:()=>{!m&&!D&&G("读取运行记录",async()=>{const i=await d.read("tencentSheet.runs",{id:n});C(i.runs)})},children:"运行记录"}),D==="读取运行记录"&&!m&&e.jsxs("p",{role:"status",children:[e.jsx(re,{className:"spin"}),"正在读取运行记录…"]}),m==null?void 0:m.map(i=>e.jsxs("div",{children:[e.jsxs("p",{children:[i.time," · ",i.businessDate," · ",i.status]}),e.jsx("p",{children:i.error||i.message})]},i.id)),(m==null?void 0:m.length)===0&&e.jsx("p",{children:"暂无运行记录"})]})]})]}),e.jsxs("div",{className:`toast ${q?"show":""} ${V?"error":""}`,role:V?"alert":"status",children:[q,q&&e.jsx("button",{className:"ghost","aria-label":"关闭提示",onClick:()=>I(""),children:"×"})]}),D&&e.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[e.jsx(re,{className:"spin"}),D,"… 请等待操作结束"]})]})})}const Ze=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
   Do not redesign this file; run npm run sync:production-message-demo after Demo changes. */\r
.production-message-demo, .production-message-demo :where(*:not(svg):not(svg *)) { all: revert; box-sizing: border-box; }\r
.production-message-demo svg, .production-message-demo svg * { box-sizing: border-box; }\r
.production-message-demo { line-height: normal; }\r
.production-message-demo, body:has(.production-message-demo) {\r
  font-family:\r
    "Inter Variable",\r
    "Noto Sans SC Variable",\r
    "Microsoft YaHei UI",\r
    "Segoe UI",\r
    sans-serif;\r
\r
  font-synthesis: none;\r
  text-rendering: optimizeLegibility;\r
\r
  color: #1c1917;\r
  background: #fafaf9;\r
}\r
\r
.production-message-demo {\r
  scrollbar-gutter: stable;\r
}\r
\r
.production-message-demo, .production-message-demo, .production-message-demo {\r
  width: 100%;\r
  min-width: 320px;\r
  min-height: 100%;\r
  margin: 0;\r
}\r
\r
.production-message-demo {\r
  min-height: 100vh;\r
\r
  background: #fafaf9;\r
\r
  -webkit-font-smoothing: antialiased;\r
  -moz-osx-font-smoothing: grayscale;\r
}\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font-family: inherit;\r
}\r
\r
.production-message-demo, body:has(.production-message-demo) {\r
  /* =======================================================\r
     LAYOUT\r
  ======================================================= */\r
\r
  --page-content-width:\r
    1050px;\r
\r
  --step-content-width:\r
    760px;\r
\r
\r
  /* =======================================================\r
     基础中性色\r
  ======================================================= */\r
\r
  --bg-page:\r
    #fafaf9;\r
\r
  --bg-card:\r
    #ffffff;\r
\r
  --border-subtle:\r
    #e7e5e4;\r
\r
  /*\r
   * 更轻的内部线。\r
   */\r
  --border-soft:\r
    #f0efed;\r
\r
  --text-primary:\r
    #292524;\r
\r
  --text-secondary:\r
    #78716c;\r
\r
\r
/* =======================================================\r
   品牌色\r
   仅用于：\r
   - 主按钮\r
   - 当前步骤\r
   - 已完成步骤\r
======================================================= */\r
\r
--brand: #C2703D;\r
--brand-hover: #A85C2E;\r
--brand-soft: #F5EBE3;\r
\r
\r
  /* =======================================================\r
     状态色\r
  ======================================================= */\r
\r
  --status-ok-text:\r
    #15803d;\r
\r
  --status-ok-bg:\r
    #f0fdf4;\r
\r
\r
  --status-info-text:\r
    #57534e;\r
\r
  --status-info-bg:\r
    #f5f5f4;\r
\r
\r
  --status-warn-text:\r
    #b91c1c;\r
\r
  --status-warn-bg:\r
    #fef2f2;\r
\r
\r
  /* =======================================================\r
     INPUT\r
  ======================================================= */\r
\r
  /*\r
   * 保留之前确定的输入框边框。\r
   */\r
  --input-border:\r
    rgb(215, 215, 214);\r
\r
  --input-border-hover:\r
    rgb(182, 182, 180);\r
\r
  --input-border-focus:\r
    rgb(160, 158, 156);\r
\r
  --input-bg:\r
    #fafaf9;\r
\r
\r
  /* =======================================================\r
     SIDEBAR\r
  ======================================================= */\r
\r
  --sidebar-bg:\r
    rgb(251, 251, 249);\r
\r
  --sidebar-hover:\r
    rgb(240, 239, 236);\r
\r
\r
  /* =======================================================\r
     RADIUS\r
  ======================================================= */\r
\r
  --radius-sm:\r
    14px;\r
\r
  --radius-md:\r
    17px;\r
\r
  --radius-lg:\r
    20px;\r
}\r
\r
\r
/* =========================================================\r
   BASE\r
========================================================= */\r
\r
.production-message-demo {\r
  min-height:\r
    100vh;\r
}\r
\r
\r
.production-message-demo * {\r
  box-sizing:\r
    border-box;\r
}\r
\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font:\r
    inherit;\r
}\r
\r
\r
.production-message-demo button {\r
  color:\r
    inherit;\r
}\r
\r
\r
/* =========================================================\r
   APP\r
========================================================= */\r
\r
.production-message-demo .app-shell {\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  background:\r
    var(--bg-page);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR\r
========================================================= */\r
\r
.production-message-demo .sidebar {\r
  width:\r
    222px;\r
\r
  min-width:\r
    222px;\r
\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  background:\r
    var(--sidebar-bg);\r
\r
  border-right:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
.production-message-demo .sidebar-top {\r
  height:\r
    72px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .sidebar-brand {\r
  padding:\r
    0 20px;\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
\r
  letter-spacing:\r
    -0.2px;\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR NAV\r
========================================================= */\r
\r
.production-message-demo .sidebar-nav {\r
  padding:\r
    8px;\r
}\r
\r
\r
.production-message-demo .sidebar-item {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    11px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    color\r
      120ms ease,\r
    transform\r
      100ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
.production-message-demo .sidebar-item:active {\r
  transform:\r
    scale(0.99);\r
}\r
\r
\r
.production-message-demo .sidebar-item-active {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    520;\r
}\r
\r
\r
.production-message-demo .sidebar-bottom {\r
  margin-top:\r
    auto;\r
\r
  padding:\r
    8px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
/* =========================================================\r
   NAV ICON\r
========================================================= */\r
\r
.production-message-demo .nav-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  overflow:\r
    visible;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.55;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  color:\r
    #57534e;\r
\r
  transition:\r
    color\r
      130ms ease,\r
    transform\r
      160ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover\r
.nav-icon {\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   NAV ANIMATIONS\r
========================================================= */\r
\r
\r
.production-message-demo .sidebar-item-active\r
.folder-lid {\r
  animation:\r
    folder-open\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
folder-open {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  60% {\r
    transform:\r
      translateY(-1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
.production-message-demo .daily-check {\r
  stroke-dasharray:\r
    10;\r
\r
  stroke-dashoffset:\r
    0;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.daily-check {\r
  animation:\r
    check-draw\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
check-draw {\r
  from {\r
    stroke-dashoffset:\r
      10;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-arrow {\r
  animation:\r
    inbox-drop\r
    360ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-tray {\r
  animation:\r
    inbox-tray-enter\r
    300ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
inbox-drop {\r
  0% {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-4px);\r
  }\r
\r
  70% {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
inbox-tray-enter {\r
  from {\r
    transform:\r
      scaleX(0.88);\r
  }\r
\r
  to {\r
    transform:\r
      scaleX(1);\r
  }\r
}\r
\r
\r
.production-message-demo .report-bar {\r
  transform-box:\r
    fill-box;\r
\r
  transform-origin:\r
    center bottom;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-one {\r
  animation:\r
    report-rise\r
    260ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-two {\r
  animation:\r
    report-rise\r
    330ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-three {\r
  animation:\r
    report-rise\r
    400ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
report-rise {\r
  from {\r
    opacity:\r
      0.35;\r
\r
    transform:\r
      scaleY(0.2);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      scaleY(1);\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.settings-ring {\r
  transform-origin:\r
    center;\r
\r
  animation:\r
    settings-turn\r
    380ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
settings-turn {\r
  from {\r
    transform:\r
      rotate(-28deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   MAIN\r
========================================================= */\r
\r
.production-message-demo .main-content {\r
  flex:\r
    1;\r
\r
  width:\r
    0;\r
\r
  min-width:\r
    0;\r
\r
  background:\r
    var(--bg-page);\r
}\r
\r
\r
/* =========================================================\r
   PAGE TITLE\r
========================================================= */\r
\r
.production-message-demo .content-header {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  margin:\r
    0 auto;\r
\r
  padding:\r
    42px 0 24px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .content-header h1 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    26px;\r
\r
  font-weight:\r
    570;\r
\r
  letter-spacing:\r
    -0.55px;\r
}\r
\r
\r
.production-message-demo .content-header p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
}\r
\r
\r
/* =========================================================\r
   STEPPER\r
========================================================= */\r
\r
.production-message-demo .step-bar {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--step-content-width)\r
    );\r
\r
  height:\r
    62px;\r
\r
  margin:\r
    0 auto 30px;\r
\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content;\r
\r
  column-gap:\r
    18px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .step {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    10px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    450;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .step-active {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .step-done {\r
  color:\r
    #57534e;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   STEP CIRCLE\r
========================================================= */\r
\r
.production-message-demo .step-circle {\r
  width:\r
    32px;\r
\r
  height:\r
    32px;\r
\r
  flex:\r
    none;\r
\r
  border-radius:\r
    50%;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    600;\r
\r
  transition:\r
    background-color\r
      180ms ease,\r
    border-color\r
      180ms ease,\r
    color\r
      180ms ease,\r
    box-shadow\r
      180ms ease,\r
    transform\r
      180ms ease;\r
}\r
\r
\r
/* 未开始 */\r
\r
.production-message-demo .step-circle.pending {\r
  border:\r
    1.5px solid\r
    #d6d3d1;\r
\r
  background:\r
    #ffffff;\r
\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
/* 当前 */\r
\r
.production-message-demo .step-circle.active {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
box-shadow:\r
  0 0 0 4px\r
  rgba(\r
    194,\r
    112,\r
    61,\r
    0.12\r
  );\r
\r
  animation:\r
    step-active-enter\r
    260ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
@keyframes\r
step-active-enter {\r
  0% {\r
    transform:\r
      scale(0.88);\r
  }\r
\r
  70% {\r
    transform:\r
      scale(1.05);\r
  }\r
\r
  100% {\r
    transform:\r
      scale(1);\r
  }\r
}\r
\r
\r
/* 已完成 */\r
\r
.production-message-demo .step-circle.done {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-circle.done svg {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  stroke-dasharray:\r
    20;\r
\r
  animation:\r
    step-check-draw\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
step-check-draw {\r
  from {\r
    stroke-dashoffset:\r
      20;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   STEP LINE\r
========================================================= */\r
\r
.production-message-demo .step-line {\r
  height:\r
    1px;\r
\r
  width:\r
    100%;\r
}\r
\r
\r
.production-message-demo .step-line.done {\r
  background:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-line.pending {\r
  background:\r
    var(--border-subtle);\r
}\r
\r
\r
/*\r
 * 当前到未来。\r
 *\r
 * 左侧带一点品牌色，\r
 * 很快淡到浅灰。\r
 */\r
.production-message-demo .step-line.transition {\r
  background:\r
    linear-gradient(\r
      to right,\r
      var(--brand) 0%,\r
      rgba(\r
        234,\r
        88,\r
        12,\r
        0.34\r
      ) 18%,\r
      var(--border-subtle) 42%,\r
      var(--border-subtle) 100%\r
    );\r
}\r
\r
\r
/* =========================================================\r
   MAIN WORK PANEL\r
========================================================= */\r
\r
.production-message-demo .workspace-panel {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    560px;\r
\r
  margin:\r
    0 auto 48px;\r
\r
  display:\r
    grid;\r
\r
  /*\r
   * 一个统一面板，\r
   * 左右只是两个 View。\r
   */\r
  grid-template-columns:\r
    400px\r
    minmax(0, 1fr);\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  overflow:\r
    visible;\r
\r
\r
  /*\r
   * 整个静态大面板不加阴影。\r
   */\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   LEFT\r
========================================================= */\r
\r
.production-message-demo .message-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  /*\r
   * 只有这一条竖线。\r
   *\r
   * 使用非常浅的颜色，\r
   * 把两个 view 分开，\r
   * 而不是做成两个盒子。\r
   */\r
  border-right:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .pane-title h2, .production-message-demo .review-header h2, .production-message-demo .review-empty h2 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
}\r
\r
\r
.production-message-demo .pane-title p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  line-height:\r
    1.6;\r
}\r
\r
\r
/* =========================================================\r
   MESSAGE\r
========================================================= */\r
\r
.production-message-demo .message-textarea {\r
  width:\r
    100%;\r
\r
  height:\r
    330px;\r
\r
  margin-top:\r
    22px;\r
\r
  padding:\r
    17px 18px;\r
\r
  resize:\r
    none;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    430;\r
\r
  line-height:\r
    1.8;\r
\r
\r
  /*\r
   * 静态输入区没有阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .message-textarea:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .message-textarea:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .message-textarea::placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
.production-message-demo .parse-action {\r
  margin-top:\r
    20px;\r
\r
  display:\r
    flex;\r
\r
  justify-content:\r
    flex-end;\r
}\r
\r
\r
/* =========================================================\r
   PRIMARY BUTTON\r
========================================================= */\r
\r
.production-message-demo .primary-button {\r
  min-width:\r
    112px;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 18px;\r
\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  border:\r
    1px solid\r
    var(--brand);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    border-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease,\r
    transform\r
      90ms ease,\r
    opacity\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .primary-button:hover:not(\r
  :disabled\r
) {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
\r
  box-shadow:\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.08\r
    );\r
}\r
\r
\r
.production-message-demo .primary-button:active:not(\r
  :disabled\r
) {\r
  transform:\r
    translateY(1px);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .primary-button:disabled {\r
  opacity:\r
    0.32;\r
\r
  cursor:\r
    not-allowed;\r
}\r
\r
\r
.production-message-demo .button-icon {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.7;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .refresh-icon {\r
  animation:\r
    refresh-enter\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
refresh-enter {\r
  from {\r
    transform:\r
      rotate(-90deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   RIGHT\r
========================================================= */\r
\r
.production-message-demo .review-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  overflow:\r
    visible;\r
}\r
\r
\r
.production-message-demo .review-empty p {\r
  margin:\r
    12px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
/* =========================================================\r
   REVIEW HEADER\r
========================================================= */\r
\r
.production-message-demo .review-header {\r
  min-height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    flex-start;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    22px;\r
\r
  animation:\r
    content-enter\r
    220ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .review-summary {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    7px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    430;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .review-summary span {\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    baseline;\r
\r
  gap:\r
    4px;\r
}\r
\r
\r
.production-message-demo .review-summary strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
}\r
\r
\r
.production-message-demo .review-summary i {\r
  color:\r
    #d6d3d1;\r
\r
  font-style:\r
    normal;\r
}\r
\r
\r
/* =========================================================\r
   IDENTITY\r
========================================================= */\r
\r
.production-message-demo .identity-section {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    210px\r
    250px;\r
\r
  gap:\r
    24px;\r
\r
  padding:\r
    18px 0 20px;\r
\r
  animation:\r
    content-enter\r
    240ms\r
    30ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .identity-field label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   INPUTS\r
========================================================= */\r
\r
.production-message-demo .field-input {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
\r
  /*\r
   * 不使用阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
\r
font-variant-numeric:\r
	tabular-nums;\r
}\r
\r
\r
.production-message-demo .field-input:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .field-input:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   MATCH\r
========================================================= */\r
\r
.production-message-demo .match-status {\r
  min-height:\r
    42px;\r
\r
  padding-bottom:\r
    18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    250ms\r
    50ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .match-check {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-ok-text);\r
}\r
\r
\r
.production-message-demo .match-check svg {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .new-record-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-info-text);\r
\r
  font-size:\r
    16px;\r
}\r
\r
\r
.production-message-demo .status-loader {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  flex:\r
    none;\r
\r
  border:\r
    2px solid\r
    var(--border-subtle);\r
\r
  border-top-color:\r
    #78716c;\r
\r
  border-radius:\r
    50%;\r
\r
  animation:\r
    spinner\r
    650ms\r
    linear\r
    infinite;\r
}\r
\r
\r
@keyframes\r
spinner {\r
  to {\r
    transform:\r
      rotate(360deg);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATA TITLE\r
========================================================= */\r
\r
.production-message-demo .data-title {\r
  padding:\r
    21px 0 13px;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    560;\r
\r
  /*\r
   * 很浅。\r
   */\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    260ms\r
    70ms\r
    ease-out\r
    both;\r
}\r
\r
\r
/* =========================================================\r
   FIELD TABLE\r
========================================================= */\r
\r
.production-message-demo .field-table {\r
  width:\r
    100%;\r
\r
  min-width:\r
    540px;\r
\r
  animation:\r
    content-enter\r
    280ms\r
    90ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .field-table-header, .production-message-demo .field-row {\r
  display:\r
    grid;\r
\r
  /*\r
   * 字段列不再按字符做奇怪的两端对齐。\r
   *\r
   * 直接给足够宽度，\r
   * 所有内容左对齐。\r
   */\r
  grid-template-columns:\r
    96px\r
    176px\r
    130px\r
    94px;\r
\r
  column-gap:\r
    24px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .field-table-header {\r
  min-height:\r
    42px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    520;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .field-row {\r
  min-height:\r
    62px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  transition:\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .field-row:hover {\r
  background:\r
    #fafaf9;\r
}\r
\r
\r
/* =========================================================\r
   FIELD NAME\r
========================================================= */\r
\r
.production-message-demo .field-name {\r
  width:\r
    96px;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  white-space:\r
    nowrap;\r
\r
  text-align:\r
    left;\r
}\r
\r
\r
/* =========================================================\r
   FIELD EDITOR\r
========================================================= */\r
\r
.production-message-demo .field-editor {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .compact-input {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap {\r
  position:\r
    relative;\r
\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
.field-input {\r
  padding-right:\r
    42px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
span {\r
  position:\r
    absolute;\r
\r
  right:\r
    12px;\r
\r
  top:\r
    50%;\r
\r
  transform:\r
    translateY(-50%);\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  pointer-events:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   DATABASE VALUE\r
========================================================= */\r
\r
.production-message-demo .database-value {\r
  width:\r
    130px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
/* =========================================================\r
   PILLS\r
========================================================= */\r
\r
.production-message-demo .pill {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  min-height: 24px;\r
  padding:\r
    2px 10px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    999px;\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
\r
  line-height:\r
    1.5;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
/* =========================================================\r
   CONFLICT PANEL\r
========================================================= */\r
\r
.production-message-demo .conflict-panel {\r
  width:\r
    100%;\r
\r
  min-height:\r
    78px;\r
\r
  margin:\r
    4px 0 10px;\r
\r
  padding:\r
    15px 18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
\r
  border:\r
    1px solid\r
    #fecaca;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    var(--status-warn-bg);\r
\r
\r
  /*\r
   * 这是少数真正浮起来的东西。\r
   */\r
  box-shadow:\r
    0 1px 3px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.06\r
    ),\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.04\r
    );\r
\r
  animation:\r
    conflict-enter\r
    200ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .conflict-message {\r
  min-width:\r
    155px;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  gap:\r
    4px;\r
\r
  color:\r
    #7f1d1d;\r
\r
  font-size:\r
    12px;\r
}\r
\r
\r
.production-message-demo .conflict-message strong {\r
  color:\r
    var(--status-warn-text);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    600;\r
}\r
\r
\r
.production-message-demo .conflict-options {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    18px;\r
}\r
\r
\r
.production-message-demo .conflict-options label {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    6px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    12px;\r
\r
  white-space:\r
    nowrap;\r
\r
  cursor:\r
    pointer;\r
}\r
\r
\r
.production-message-demo .conflict-options strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .conflict-options input {\r
  width:\r
    15px;\r
\r
  height:\r
    15px;\r
\r
  accent-color:\r
    var(--status-warn-text);\r
}\r
\r
\r
/* =========================================================\r
   REVIEW FOOTER\r
========================================================= */\r
\r
.production-message-demo .review-footer {\r
  min-height:\r
    82px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
}\r
\r
\r
.production-message-demo .review-footer-text {\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
.production-message-demo .confirm-button {\r
  min-width:\r
    118px;\r
}\r
\r
\r
/* =========================================================\r
   COMPLETE\r
========================================================= */\r
\r
.production-message-demo .complete-view {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    520px;\r
\r
  margin:\r
    0 auto;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
}\r
\r
\r
.production-message-demo .complete-icon {\r
  width:\r
    46px;\r
\r
  height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  border-radius:\r
    50%;\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .complete-icon svg {\r
  width:\r
    23px;\r
\r
  height:\r
    23px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .complete-view h2 {\r
  margin:\r
    20px 0 0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    20px;\r
\r
  font-weight:\r
    570;\r
}\r
\r
\r
.production-message-demo .complete-view p {\r
  margin:\r
    12px 0 30px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
}\r
\r
\r
/* =========================================================\r
   ANIMATIONS\r
========================================================= */\r
\r
@keyframes\r
content-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(4px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
conflict-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-3px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
fade-rise {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   NUMBER INPUT\r
========================================================= */\r
\r
.production-message-demo input[type="number"] {\r
  appearance:\r
    textfield;\r
\r
  -moz-appearance:\r
    textfield;\r
}\r
\r
\r
.production-message-demo input[type="number"]::-webkit-outer-spin-button, .production-message-demo input[type="number"]::-webkit-inner-spin-button {\r
  -webkit-appearance: none;\r
	margin: 0;\r
}\r
\r
\r
/* =========================================================\r
   RESPONSIVE\r
========================================================= */\r
\r
@media (\r
  max-width: 1320px\r
) {\r
  .production-message-demo, body:has(.production-message-demo) {\r
    --page-content-width:\r
      960px;\r
  }\r
\r
\r
  .production-message-demo .sidebar {\r
    width:\r
      198px;\r
\r
    min-width:\r
      198px;\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      360px\r
      minmax(\r
        0,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .message-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .review-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .identity-section {\r
    grid-template-columns:\r
      195px\r
      230px;\r
\r
    gap:\r
      20px;\r
  }\r
\r
\r
  .production-message-demo .field-table-header, .production-message-demo .field-row {\r
    grid-template-columns:\r
      88px\r
      160px\r
      118px\r
      88px;\r
\r
    column-gap:\r
      20px;\r
  }\r
\r
 .production-message-demo .field-table-header > div:last-child {\r
	text-align: center;\r
}\r
\r
  .production-message-demo .field-name {\r
    width:\r
      88px;\r
  }\r
\r
\r
  .production-message-demo .field-editor, .production-message-demo .compact-input, .production-message-demo .input-unit-wrap {\r
    width:\r
      160px;\r
  }\r
\r
\r
  .production-message-demo .database-value {\r
    width:\r
      118px;\r
  }\r
\r
\r
  .production-message-demo .conflict-panel {\r
    flex-direction:\r
      column;\r
\r
    align-items:\r
      flex-start;\r
  }\r
}\r
\r
.production-message-demo .field-status {\r
	display: flex;\r
	justify-content: center;\r
}\r
\r
/* =========================================================\r
   SMALL WINDOW\r
========================================================= */\r
\r
@media (\r
  max-width: 1080px\r
) {\r
  .production-message-demo .content-header, .production-message-demo .workspace-panel, .production-message-demo .complete-view {\r
    width:\r
      calc(\r
        100% - 40px\r
      );\r
  }\r
\r
\r
  .production-message-demo .step-bar {\r
    width:\r
      min(\r
        calc(\r
          100% - 40px\r
        ),\r
        660px\r
      );\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      330px\r
      minmax(\r
        520px,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .main-content {\r
    overflow-x:\r
      auto;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   REDUCED MOTION\r
========================================================= */\r
\r
@media (\r
  prefers-reduced-motion:\r
    reduce\r
) {\r
  .production-message-demo *, .production-message-demo *::before, .production-message-demo *::after {\r
    animation-duration:\r
      0.01ms !important;\r
\r
    animation-iteration-count:\r
      1 !important;\r
\r
    transition-duration:\r
      0.01ms !important;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATE PICKER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
}\r
\r
body:has(.production-message-demo) .date-picker-label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   TRIGGER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-trigger {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    12px;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  outline:\r
    none;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger-open {\r
  border-color:\r
    var(--input-border-hover);\r
\r
  background:\r
    var(--input-bg);\r
\r
  box-shadow:none;\r
   /* 0 0 0 3px\r
    rgba(\r
      194,\r
      112,\r
      61,\r
      0.08\r
    );*/\r
}\r
\r
body:has(.production-message-demo) .date-picker-placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
body:has(.production-message-demo) .date-picker-calendar-icon {\r
  flex:\r
    none;\r
\r
  color:\r
    var(--text-secondary);\r
}\r
\r
\r
/* =========================================================\r
   PORTAL POPOVER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-popover {\r
  position:\r
    fixed;\r
\r
  z-index:\r
    9999;\r
\r
  width:\r
    312px;\r
\r
  padding:\r
    18px;\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  background:\r
    #ffffff;\r
\r
  opacity:\r
    1;\r
\r
  transform:\r
    scale(1);\r
\r
  color:\r
    var(--text-primary);\r
\r
  box-shadow:\r
    0 8px 20px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.08\r
      ),\r
    0 2px 6px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.05\r
      );\r
\r
\r
\r
}\r
/* Chrome 139+ 增强圆角 */\r
@supports (corner-shape: squircle) {\r
  body:has(.production-message-demo) .date-picker-popover {\r
    corner-shape: squircle;\r
  }\r
}\r
/* 向下展开 */\r
body:has(.production-message-demo) .date-picker-popover-bottom {\r
\r
  transform-origin:\r
    top left;\r
\r
  animation:\r
    date-picker-enter-bottom\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
/* 向上展开 */\r
body:has(.production-message-demo) .date-picker-popover-top {\r
\r
  transform-origin:\r
    bottom left;\r
\r
  animation:\r
    date-picker-enter-top\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
\r
/* 从上方出现 */\r
\r
@keyframes date-picker-enter-bottom {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
\r
\r
/* 从下方出现 */\r
\r
@keyframes date-picker-enter-top {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
/* =========================================================\r
   HEADER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-header {\r
  height:\r
    36px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  margin-bottom:\r
    14px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button {\r
  padding:\r
    0 10px;\r
\r
  height:\r
    32px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button:hover {\r
  background:\r
    #f5f5f4;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button {\r
  width:\r
    30px;\r
\r
  height:\r
    30px;\r
\r
  padding:\r
    0;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease,\r
    transform\r
      90ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:hover {\r
  background:\r
    #f5f5f4;\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:active {\r
  transform:\r
    scale(0.94);\r
}\r
\r
\r
/* =========================================================\r
   WEEKDAYS\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-weekdays {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  margin-bottom:\r
    8px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-weekdays div {\r
  height:\r
    30px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   DAY GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  gap:\r
    4px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day {\r
  width:\r
    36px;\r
\r
  height:\r
    36px;\r
\r
  padding:\r
    0;\r
\r
  justify-self:\r
    center;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:active {\r
  transform:\r
    scale(0.93);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-today {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
\r
  font-weight:\r
    550;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   MONTH / YEAR GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-month-grid, body:has(.production-message-demo) .date-picker-year-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      3,\r
      1fr\r
    );\r
\r
  gap:\r
    8px;\r
\r
  padding:\r
    4px 0 6px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item {\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    500;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:hover, body:has(.production-message-demo) .date-picker-year-item:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:active, body:has(.production-message-demo) .date-picker-year-item:active {\r
  transform:\r
    scale(0.97);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-current, body:has(.production-message-demo) .date-picker-year-item-current {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected, body:has(.production-message-demo) .date-picker-year-item-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected:hover, body:has(.production-message-demo) .date-picker-year-item-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   FOOTER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-footer {\r
  margin-top:\r
    14px;\r
\r
  padding-top:\r
    12px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button {\r
  height:\r
    30px;\r
\r
  padding:\r
    0 6px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    6px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--brand);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    color\r
      100ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button:hover {\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand-hover);\r
}\r
\r
/* =========================================================\r
   SQUIRCLE CORNER ENHANCEMENT\r
   Chrome 139+\r
========================================================= */\r
\r
@supports (corner-shape: squircle) {\r
\r
  .production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select, .production-message-demo .workspace-panel, .production-message-demo .complete-view, body:has(.production-message-demo) .date-picker-popover, body:has(.production-message-demo) .date-picker-trigger, .production-message-demo .field-input, .production-message-demo .message-textarea, .production-message-demo .primary-button, .production-message-demo .conflict-panel, .production-message-demo .sidebar-item, body:has(.production-message-demo) .date-picker-day, body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item, body:has(.production-message-demo) .date-picker-title-button, body:has(.production-message-demo) .date-picker-nav-button, body:has(.production-message-demo) .date-picker-today-button, .production-message-demo .pill {\r
    corner-shape: squircle;\r
  }\r
\r
}\r
`,Qe=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
* { scrollbar-width: thin; scrollbar-color: #d1d0cd transparent; }\r
*::-webkit-scrollbar { width: 6px; height: 6px; }\r
*::-webkit-scrollbar-thumb { background: #d1d0cd; border-radius: 6px; }\r
*::-webkit-scrollbar-track { background: transparent; margin-block: 10px; }\r
*::-webkit-scrollbar-button { display: none; width: 0; height: 0; }\r
*::-webkit-scrollbar-corner { background: transparent; }\r
button, input, select, textarea, button span, .picker-trigger > span, .choice-popover button.selected, .time-column button.selected { font-weight: 400 !important; }\r
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible { outline: 1px solid var(--text-muted); outline-offset: 2px; box-shadow: none; }\r
.daily-focus-card label, .progressive-field-picker label, .preview-action-group label { font-weight: 400; }\r
.daily-focus-card input, .daily-focus-card select { background: var(--surface); border-radius: var(--radius-control); corner-shape: squircle; }\r
.daily-focus-card input:focus, .daily-focus-card select:focus, .picker-trigger.open, .picker-trigger:focus-visible, .daily-focus-card .picker-trigger.open, .daily-focus-card .picker-trigger:focus-visible { border-color: var(--text-muted); box-shadow: none; outline: none; }\r
.picker-popover { border-radius: var(--radius-panel); corner-shape: squircle; box-shadow: 0 4px 14px #0000000a; }\r
.choice-popover button.selected, .choice-popover button:hover { background: var(--surface-muted); color: var(--text); }\r
.time-trigger svg, .time-done { color: var(--text-muted); }\r
.time-column button.selected, .time-popover .time-done { background: var(--surface-muted); color: var(--text); }\r
.report-editor .ProseMirror:focus, .report-editor .ProseMirror:focus-visible { outline: none; box-shadow: none; }\r
.report-editor:focus-within { border-color: var(--text-muted); box-shadow: none; }\r
.daily-workbench-detail .report-editor { overflow-y: auto; }\r
.daily-workbench .system-variable button { text-decoration: none; color: var(--text); }\r
.daily-runs-toggle { display: flex; align-items: center; gap: 8px; text-decoration: none; }\r
.daily-runs-toggle svg { width: 14px; height: 14px; }\r
.daily-runs-toggle[aria-expanded="true"] svg { transform: rotate(90deg); }\r
/* The title stays outside the scrolling body, including its scrollbar. */\r
.desktop-shell-content:has(.daily-workbench-detail) { overflow: hidden; }\r
.daily-workbench-detail.page { height: calc(100vh - 48px); min-height: 0; display: flex; flex-direction: column; padding-bottom: 0; }\r
.daily-workbench-detail > header { flex-shrink: 0; margin-bottom: 0; padding-bottom: 18px; }\r
.daily-detail-scroll { min-height: 0; overflow-y: auto; padding: 18px 12px 32px 0; margin-right: -12px; }\r
.daily-task-settings { height: auto; min-height: 0; padding: 28px; }\r
.daily-task-settings .daily-focus-card { min-height: 0; box-shadow: none; }\r
.daily-task-settings .daily-page, .daily-task-settings .daily-workbench { min-height: 0; }\r
.daily-task-settings .focus-form { display: grid; grid-template-columns: 1fr; gap: 20px; }\r
.daily-task-settings .primary { background: var(--text); color: var(--surface); border-color: var(--text); }\r
.daily-task-settings .focus-actions { margin: 24px 0; padding-top: 16px; border-top: 1px solid var(--border); }\r
.daily-task-settings .time-trigger > svg:first-child { color: var(--text-muted); }\r
.daily-task-settings .focus-form > label { margin: 0; }\r
.daily-task-settings .focus-form { row-gap: 16px; }\r
.daily-workbench .daily-split-workspace { overflow: visible; }\r
.daily-workbench .progressive-field-picker { border-radius: 0 var(--radius-panel) var(--radius-panel) 0; corner-shape: squircle; }\r
.daily-workbench-detail > header { display: flex; align-items: center; gap: 16px; }\r
.daily-title-line { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }\r
.daily-title-line .back-link { margin: 0; padding: 6px; flex-shrink: 0; }\r
.daily-workbench-detail .daily-title-line h1 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 18px; }\r
.daily-workbench-detail .daily-title-line p { margin: 0; font-size: 12px; white-space: nowrap; flex-shrink: 0; }\r
.daily-workbench-detail > header > button { flex-shrink: 0; }\r
.daily-workbench .preview-action-group { gap: 8px; }\r
.preview-date-action { order: 1; width: 154px; }\r
.preview-action-group > .primary { order: 0; }\r
.preview-action-group > .secondary { order: 2; }\r
\r
.daily-workbench .preview-action-group > button { padding-inline: 8px; font-size: 13px; min-height: 40px; gap: 5px; }\r
.daily-workbench .preview-action-group > button svg { width: 14px; height: 14px; }\r
.preview-date-action { width: 140px; }\r
body:has(.production-message-demo) .preview-date-action .date-picker-trigger { min-height: 40px; height: 40px; padding-inline: 9px; font-size: 13px; }\r
.field-selection-stage { height: auto; overflow: visible; flex-shrink: 0; }\r
\r
.field-breadcrumbs { display: flex; align-items: center; gap: 4px; height: 40px; flex-wrap: nowrap; border-bottom: 1px solid var(--border); overflow: hidden; }\r
.field-breadcrumbs button { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 4px; border: 0; background: transparent; color: var(--text); }\r
.field-breadcrumbs svg { width: 12px; height: 12px; flex-shrink: 0; color: var(--text-muted); }\r
.field-drill-list { height: auto; max-height: 210px; overflow-y: auto; padding: 8px 0; margin-bottom: 14px; }\r
.field-drill-list p { color: var(--text-muted); font-size: 13px; margin: 0 0 8px; }\r
.field-drill-list > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; text-align: left; border: 0; border-radius: var(--radius-control); corner-shape: squircle; background: transparent; color: var(--text); padding: 9px 10px; }\r
.field-drill-list > button:hover, .field-drill-list > button[aria-pressed="true"] { background: var(--surface-muted); }\r
.field-drill-list > button svg { width: 16px; height: 16px; flex-shrink: 0; }\r
.field-breadcrumbs .field-refresh { margin-left: auto; flex-shrink: 0; font-size: 12px; color: var(--text-muted); }\r
\r
.message-template-host {height:calc(100vh - 48px);min-height:0;}\r
.message-template-host iframe{width:100%;height:100%;border:0;display:block;}\r
.desktop-shell-content:has(.message-template-host){overflow:hidden;}\r
`,qn=`<!doctype html>\r
<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>日报消息编辑器 · 交互 Demo</title>\r
<style>\r
:root{--font-ui:"Inter Variable","Noto Sans SC Variable",sans-serif}\r
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf')}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf')}\r
*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0;background:#fafaf9;color:#292524;font:14px var(--font-ui)}button,input,select{font:inherit;color:inherit}button{cursor:pointer;background:white;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:9px 13px}button:hover{background:#f1f0ed}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible{outline:1px solid #78716c;outline-offset:2px}small,.muted{color:#78716c}main{max-width:1420px;margin:auto;padding:30px 36px}header{display:flex;align-items:center;gap:14px;margin-bottom:24px}h1{font-size:20px;margin:0;font-weight:600;flex:1}header small{white-space:nowrap}h2{font-size:15px;font-weight:500;margin:0 0 10px}p{line-height:1.7}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;background:white;overflow:hidden}.pane{padding:24px;min-width:0}.pane+ .pane{border-left:1px solid #e7e5e4}.pane-head{display:flex;align-items:center;justify-content:space-between;gap:10px;height:42px;margin-bottom:12px}.pane-head h2{margin:0}.editor{min-height:440px;height:calc(100vh - 310px);max-height:700px;overflow:auto;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:20px;line-height:2.05;font-size:15px;white-space:pre-wrap;outline:none}.editor:focus{border-color:#78716c}.token{display:inline-block;white-space:nowrap;background:#f1f0ed;border-radius:10px;corner-shape:squircle;padding:0 7px;line-height:28px;cursor:pointer;vertical-align:baseline;font-size:14px}.token.bad{border-left:2px solid #c2703d}#preview{white-space:pre-wrap;line-height:2.05;font-size:15px;margin:12px 0;max-height:calc(100vh - 320px);overflow:auto}input,select{background:white;border:1px solid #deddd9;border-radius:12px;corner-shape:squircle;padding:8px;width:100%}input[type=date]{width:146px}footer{display:flex;justify-content:space-between;gap:12px;margin-top:16px;color:#78716c;font-size:12px}.popup{position:fixed;width:350px;max-width:calc(100vw - 24px);max-height:380px;overflow:auto;background:white;border:1px solid #deddd9;border-radius:18px;corner-shape:squircle;box-shadow:0 10px 30px #29252418;padding:10px;z-index:10}.popup h2{padding:8px;font-size:13px;color:#78716c}.popup button{display:flex;width:100%;justify-content:space-between;text-align:left;border:0;padding:10px;border-radius:12px;background:none}.popup button.active,.popup button[aria-pressed=true]{background:#f1f0ed}.popup small{padding-left:10px}.popup .custom{border-top:1px solid #e7e5e4;margin-top:6px}.hidden,[hidden]{display:none!important}dialog{width:430px;border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;padding:24px;color:#292524}dialog::backdrop{background:#0005}dialog label{display:grid;gap:8px;margin:16px 0}dialog .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.dark{background:#292524;color:white}.dark:hover{background:#44403c}.notice{border-left:2px solid #c2703d;padding:8px 12px;margin-top:14px}.empty{padding:50px;text-align:center;color:#78716c}.status{color:#78716c;font-size:12px}#demo-tools{display:flex;gap:12px;align-items:center;margin-top:20px;font-size:12px;color:#78716c}#demo-tools button{font-size:12px;padding:6px 10px}@media(max-width:800px){main{padding:18px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid #deddd9}header small{display:none}.editor{height:360px;min-height:300px}}\r
#settings-open{display:inline-flex;align-items:center;justify-content:center;padding:10px}#runs{margin-top:22px;border-top:1px solid #deddd9;padding-top:16px}#runs summary{cursor:pointer;padding:4px 0}#runs p{padding:8px 16px;margin:0}header h1{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}</style>\r
<main><header><span aria-hidden="true">←</span><h1>塔筒生产日报</h1><small id="saved">已保存</small><button id="save">保存</button><button id="settings-open" aria-label="任务设置" title="任务设置"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>\r
<section id="message"><div class="work"><div class="pane"><div class="pane-head"><h2>消息内容</h2><small>输入 / 插入数据</small></div><div id="editor" class="editor" role="textbox" aria-label="消息内容" aria-multiline="true" contenteditable="true"></div></div><div class="pane"><div class="pane-head"><h2>最终预览</h2><input id="date" type="hidden" value="2026-09-06"><span id="date-picker"></span><button id="preview-generate" class="dark">生成预览</button></div><small class="status" id="preview-status">示例数据 · 仅演示交互</small><div id="preview"></div></div></div><footer><span>↑ ↓ 选择 · Enter 插入 · Esc 关闭</span></footer></section>\r
<details id="runs"><summary>运行记录</summary><p class="muted">暂无运行记录 · Demo 不执行发送任务</p></details>\r
<div id="demo-tools"><span>交互 Demo · 所有数值均为示例，不连接 Notion 或发送消息</span><button id="fail">模拟单个指标失败</button></div>\r
</main><div id="menu" class="popup" role="listbox" aria-label="插入数据" hidden></div><div id="quick" class="popup" role="dialog" aria-label="修改数据口径" hidden></div>\r
<dialog id="settings" aria-labelledby="settings-title"><h2 id="settings-title">任务设置</h2><label>任务名称<input id="task-name" value="塔筒生产日报"></label><label>每天发送时间<input id="send-time" type="time" value="17:30"></label><p class="muted">业务上下文：塔筒生产日报</p><div class="actions"><button id="settings-close">取消</button><button id="settings-save" class="dark">保存设置</button></div></dialog>\r
<dialog id="advanced"><h2>自定义数据</h2><p class="muted">保存后可通过 / 搜索复用。</p><label>指标<select id="metric"></select></label><label>统计口径<select id="scope"><option value="day">日（业务日当天）</option><option value="mtd">月累计（月初至业务日）</option><option value="ytd">年累计（年初至业务日）</option><option value="fullyear">全年</option></select></label><label>年份<select id="scope-year"><option value="0">今年</option><option value="-1">去年</option><option value="-2">前年</option></select></label><label>显示名称<input id="custom-name" placeholder="如：去年同期月焊接量"></label><div class="actions"><button id="cancel">取消</button><button id="create" class="dark">保存并插入</button></div></dialog>\r
<script>\r
const runtime=window.frameElement?.dailyRuntime;\r
const $=s=>document.querySelector(s),ed=$('#editor'),menu=$('#menu'),quick=$('#quick');\r
const metrics=runtime?.metrics || [['weld','焊接量','焊 焊量 weld',42.17],['cut','下料量','下料 切割 cut',48.36],['plate','板材入库','板 钢板',32.15],['section','型材入库','型材',15.62],['output','产出量','产量 套',4],['plan','焊接月计划','焊 月 计划',1160]];\r
const scopes=[['today','今日',1],['mtd','本月',5.608],['ytd','本年',83.437],['last','去年同期',78.2],['full','去年全年',103.4]];\r
const storagePrefix=runtime ? 'daily-slash-'+runtime.id : 'slash-demo';\r
let custom=runtime ? [] : JSON.parse(localStorage.getItem(storagePrefix+'-custom')||'[]'),recent=JSON.parse(localStorage.getItem(storagePrefix+'-recent')||'[]');\r
const defaults=runtime?.definitions || metrics.flatMap(m=>(m[0]==='plan'?[['month','本月',1]]:scopes).map(s=>({key:m[0]+'.'+s[0],metric:m[0],scope:s[0],label:m[0]==='plan'?m[1]:s[1]+m[1],keywords:m[2]+' '+s[1]})));\r
let index=0,results=[],slashRange=null,query='',target=null,insertion=null,failed=false,timer;\r
const dateChoices=[['year','业务年份','年'],['month','业务月份','月'],['day','业务日','日'],['date','完整业务日期','完整日期']].map(([key,label,words])=>({key:'system.'+key,metric:'date',scope:key,label,keywords:'业务日期 '+words}));\r
const definitions=()=>[...defaults,...custom,...dateChoices];\r
function value(d){if(runtime)return runtime.value(d);if(d.metric==='date')return $('#date').value;if(failed&&d.metric==='weld'&&d.scope==='today')return '⚠ 获取失败';const m=metrics.find(m=>m[0]===d.metric),day=Number($('#date').value.slice(-2))||1;let scale=scopes.find(s=>s[0]===d.scope)?.[2]||4.8;return (m[3]*(d.metric==='plan'?1:scale*(day/6))).toFixed(2)}\r
function pill(d){let el=document.createElement('span');el.className='token';el.contentEditable='false';el.dataset.key=d.key;el.textContent=d.label;el.tabIndex=0;el.setAttribute('role','button');return el}\r
function initial(){if(runtime){runtime.mount(ed,pill);$('h1').textContent=runtime.name;$('#task-name').value=runtime.name;$('#send-time').value=runtime.sendTime;$('#demo-tools').hidden=true;$('#preview-status').textContent='尚未生成预览';$('#preview').textContent='选择日期后，点击“生成预览”读取数据。';$('#date').value=runtime.businessDate;return}ed.append(document.createTextNode('塔筒生产日报\\n\\n日期：'),pill(definitions().at(-1)),document.createTextNode('\\n\\n今日焊接：'),pill(defaults[0]),document.createTextNode(' t\\n本月累计：'),pill(defaults[1]),document.createTextNode(' t\\n\\n今日下料：'),pill(defaults[5]),document.createTextNode(' t\\n\\n'))}initial();\r
let previewVersion=0;\r
async function preview(){if(runtime&&(!menu.hidden||ed.contentEditable==='false'))return;if(runtime){const version=++previewVersion;$('#preview-generate').disabled=true;$('#preview-status').textContent='正在读取数据…';try{const result=await runtime.preview(ed,$('#date').value);if(version!==previewVersion)return;$('#preview').textContent=result.text;$('#preview-status').textContent=result.message || '已更新';ed.querySelectorAll('.token').forEach(el=>{el.classList.toggle('bad',result.errors.some(error=>error.placeholder===el.dataset.key));el.title=result.errors.find(error=>error.placeholder===el.dataset.key)?.message||''});$('#saved').textContent='已保存'}catch(error){if(version===previewVersion){$('#preview-status').textContent=error.message;$('#saved').textContent='保存或预览失败'}}finally{$('#preview-generate').disabled=false}return}const copy=ed.cloneNode(true);copy.querySelectorAll('.token').forEach(el=>{let d=definitions().find(d=>d.key===el.dataset.key);el.replaceWith(document.createTextNode(d?value(d):'⚠ 无法识别'))});$('#preview').textContent=copy.innerText;ed.querySelectorAll('.token').forEach(el=>el.classList.toggle('bad',value(definitions().find(d=>d.key===el.dataset.key)).startsWith('⚠')));$('#saved').textContent='已保存'}\r
async function save(){if(!runtime)return preview();if(!menu.hidden||ed.contentEditable==='false')return;try{await runtime.save(ed);$('#saved').textContent='已保存'}catch(error){$('#saved').textContent='保存失败';$('#preview-status').textContent=error.message}}\r
function changed(){runtime?.dirty();previewVersion++;if(runtime)$('#preview-status').textContent='内容已修改，点击生成预览';$('#saved').textContent='保存中…';clearTimeout(timer);timer=setTimeout(save,350)}\r
function position(el,rect){el.hidden=false;const r=el.getBoundingClientRect();el.style.left=Math.max(12,Math.min(rect.left,innerWidth-r.width-12))+'px';el.style.top=Math.max(12,rect.bottom+r.height+8<innerHeight?rect.bottom+8:rect.top-r.height-8)+'px'}\r
function close(){menu.hidden=true;quick.hidden=true;slashRange=null}\r
function search(){const words=query.trim().toLowerCase().split(/\\s+/).filter(Boolean);results=definitions().filter(d=>words.every(w=>(d.label+' '+d.key+' '+d.keywords).toLowerCase().includes(w))).sort((a,b)=>{const ai=recent.indexOf(a.key),bi=recent.indexOf(b.key);return (ai<0?999:ai)-(bi<0?999:bi)}).slice(0,8);index=Math.min(index,results.length);menu.replaceChildren();let heading=document.createElement('h2');heading.textContent=query?'搜索：'+query:'最近使用 / 常用数据';menu.append(heading);results.forEach((d,i)=>{let b=document.createElement('button');b.setAttribute('role','option');b.setAttribute('aria-selected',i===index);b.className=i===index?'active':'';b.append(document.createTextNode(d.label));let v=document.createElement('small');v.textContent=value(d);b.append(v);b.onmousedown=e=>{e.preventDefault();insert(d)};menu.append(b)});let b=document.createElement('button');b.className='custom '+(index===results.length?'active':'');b.textContent='创建自定义数据…';b.onmousedown=e=>{e.preventDefault();openAdvanced()};menu.append(b);const rect=slashRange?.getBoundingClientRect()||ed.getBoundingClientRect();position(menu,rect)}\r
function detect(){let sel=getSelection();if(!sel.isCollapsed||!ed.contains(sel.anchorNode))return close();let n=sel.anchorNode;if(n.nodeType!==3)return close();let before=n.textContent.slice(0,sel.anchorOffset),match=before.match(/\\/([^/\\n]*)$/);if(!match)return close();slashRange=document.createRange();slashRange.setStart(n,sel.anchorOffset-match[0].length);slashRange.setEnd(n,sel.anchorOffset);query=match[1];target=null;insertion=null;index=0;search()}\r
async function insert(d){const range=(slashRange||insertion)?.cloneRange();if(!range)return;menu.hidden=true;ed.contentEditable='false';try{if(runtime)d=await runtime.materialize(d);}catch(error){$('#preview-status').textContent=error.message;return}finally{ed.contentEditable='true'}range.deleteContents();const el=pill(d);range.insertNode(el);range.setStartAfter(el);range.collapse(true);getSelection().removeAllRanges();getSelection().addRange(range);ed.focus();recent=[d.key,...recent.filter(k=>k!==d.key)].slice(0,8);localStorage.setItem(storagePrefix+'-recent',JSON.stringify(recent));close();changed()}\r
ed.addEventListener('input',e=>{changed();if(!e.isComposing)detect()});ed.addEventListener('compositionend',detect);\r
ed.addEventListener('paste',e=>{e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'))});\r
ed.addEventListener('keydown',e=>{if(e.isComposing)return;if(!menu.hidden){if(['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key)){e.preventDefault();if(e.key==='Escape'){close();changed();return;}if(e.key==='Enter')return index===results.length?openAdvanced():insert(results[index]);index=(index+(e.key==='ArrowDown'?1:-1)+results.length+1)%(results.length+1);search();return}}if(e.target.classList.contains('token')&&['Backspace','Delete'].includes(e.key)){e.preventDefault();e.target.remove();changed()}});\r
function editToken(el){target=el;insertion=null;let d=definitions().find(d=>d.key===el.dataset.key);if(!d&&el.dataset.key.startsWith('today('))d={metric:'date',label:'业务日期'};if(!d)return;quick.replaceChildren();let title=document.createElement('h2');title.textContent=d.label+(value(d)?' · '+(runtime?'当前值 ':'示例值 ')+value(d):'');quick.append(title);if(d.metric==='date'){title.textContent='业务日期 · 选择显示粒度';dateChoices.forEach(choice=>{const b=document.createElement('button');b.textContent=choice.label;b.onclick=()=>{el.replaceWith(pill(choice));close();changed()};quick.append(b)});position(quick,el.getBoundingClientRect());return}const choices=defaults.filter(x=>x.metric===d.metric);choices.forEach(x=>{let b=document.createElement('button');b.textContent=x.label+(x.key===d.key?' ✓':'');b.setAttribute('aria-pressed',x.key===d.key);b.onclick=async()=>{try{b.disabled=true;const next=runtime?await runtime.materialize(x):x;el.replaceWith(pill(next));close();changed()}catch(error){title.textContent=error.message;b.disabled=false}};quick.append(b)});let b=document.createElement('button');b.textContent='高级设置…';b.onclick=()=>openAdvanced(d);quick.append(b);position(quick,el.getBoundingClientRect())}\r
ed.onclick=e=>{let el=e.target.closest('.token');if(el)editToken(el)};ed.addEventListener('keydown',e=>{if(e.target.classList.contains('token')&&e.key==='Enter'){e.preventDefault();editToken(e.target)}});\r
function openAdvanced(d){insertion=d?null:slashRange?.cloneRange();menu.hidden=true;quick.hidden=true;$('#metric').replaceChildren(...metrics.map(m=>new Option(m[1],m[0])));$('#metric').value=d?.metric||metrics[0]?.[0]||'';$('#custom-name').value='';runtime?.configureAdvanced($('#metric').value,$('#scope'));$('#advanced').showModal()}\r
$('#metric').onchange=()=>runtime?.configureAdvanced($('#metric').value,$('#scope'));\r
$('#cancel').onclick=()=>$('#advanced').close();$('#create').onclick=async()=>{let name=$('#custom-name').value.trim();if(!name){$('#custom-name').focus();return}let d={key:'custom.'+Date.now(),metric:$('#metric').value,scope:runtime?runtime.resolveAdvanced($('#scope').value,$('#scope-year').value):$('#scope').value,label:name,keywords:name};if(runtime){try{d=await runtime.materialize(d)}catch(error){$('#preview-status').textContent=error.message;return}}else{custom.push(d);localStorage.setItem(storagePrefix+'-custom',JSON.stringify(custom))}$('#advanced').close();if(target&&!insertion){target.replaceWith(pill(d));target=null;changed()}else insert(d)};\r
$('#date').onchange=()=>{if(!runtime)return preview();runtime.dirty();previewVersion++;$('#preview-status').textContent='日期已修改，点击生成预览'};$('#preview-generate').onclick=preview;$('#save').onclick=save;$('#fail').onclick=()=>{failed=!failed;$('#fail').textContent=failed?'恢复示例数据':'模拟单个指标失败';preview()};document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('mousedown',e=>{if(!e.target.closest('.popup')&&!e.target.closest('.token')&&!e.target.closest('#editor'))close()});$('#settings-open').onclick=()=>{close();$('#task-name').value=$('h1').textContent;$('#settings').showModal()};$('#settings-close').onclick=()=>$('#settings').close();$('#settings-save').onclick=async()=>{const name=$('#task-name').value.trim();if(!name){$('#task-name').focus();return}if(runtime){try{await runtime.saveBasics(name,$('#send-time').value)}catch(error){$('#preview-status').textContent=error.message;return}}$('h1').textContent=name;$('#settings').close()};if(runtime)runtime.connect(document);else preview();\r
<\/script></html>\r
`,en=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,nn=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,rn=`/* Skeletons belong only to first-load remote table cells. */
.skeleton-block { display: block; width: 80%; height: 1em; background: var(--border, #e7e5e4); border-radius: 4px; color: transparent; user-select: none; }
.remote-table-skeleton { width: 100%; table-layout: fixed; }
.database-table-wrap { height: 420px; }
.database-table-wrap table, .tencent-sheet-table table { table-layout: fixed; }
.message-template-host { position: relative; }
.message-template-host > .local-load-status { position: absolute; inset: 24px auto auto 24px; }
.desktop-shell-content, .plan-content, .meeting-content, .report-content, .settings-main { scrollbar-gutter: stable; }
.region-loading-status { display: flex; align-items: center; gap: 8px; color: var(--muted, #78716c); font-size: 14px; }\r
.region-loading-status > .status-loader { display: inline-block; flex-shrink: 0; width: 16px; height: 16px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: region-spin .8s linear infinite; }
@keyframes region-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .region-loading-status > .status-loader { animation: none; } }
`;function ee(n,a){if(!n)return;const s=n.querySelector(":scope > [data-loading-status]");if(a){if(n.setAttribute("aria-busy","true"),!s){const b=n.ownerDocument.createElement("span");b.className="region-loading-status",b.dataset.loadingStatus="",b.setAttribute("role","status");const d=n.ownerDocument.createElement("span");d.className="status-loader",d.setAttribute("aria-hidden","true"),b.append(d,n.ownerDocument.createTextNode("正在读取…")),n.append(b)}}else n.removeAttribute("aria-busy"),s==null||s.remove()}const ye=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),tn={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function Ln(n){return tn[n]||n}function Ye(n){const a=[[]];function s(d){d.replace(/\u00a0/g," ").split(`
`).forEach((l,r)=>{var x;if(r&&a.push([]),!l)return;const p=a.at(-1);((x=p.at(-1))==null?void 0:x.type)==="text"?p.at(-1).text+=l:p.push({type:"text",text:l})})}function b(d){var l;if(d.nodeType===3){s(d.textContent||"");return}if(d instanceof n.ownerDocument.defaultView.HTMLElement){if(d.dataset.key){const r=Ln(d.dataset.key);a.at(-1).push({type:r.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:r,label:d.textContent||"",...d.dataset.legacySpec?{dateRangeSpec:JSON.parse(d.dataset.legacySpec)}:{}}});return}if(d.tagName==="BR"){s(`
`);return}d!==n&&["DIV","P"].includes(d.tagName)&&d.childNodes.length===1&&((l=d.firstChild)==null?void 0:l.nodeName)==="BR"||Array.from(d.childNodes).forEach((r,p)=>{p&&r.nodeType===1&&["DIV","P"].includes(r.tagName)&&s(`
`),b(r)})}}return b(n),{text:a.map(d=>d.map(l=>l.type==="text"?l.text:l.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(d=>({type:"paragraph",content:d}))})}}function Fn(n,a,s,b){const d=[...s,...Object.entries(tn).map(([r,p])=>({key:p,label:r==="system.date"?"业务日期":r==="system.year"?"业务年份":r==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(r=>r.field||r.metric==="date").sort((r,p)=>p.key.length-r.key.length);let l=a;for(;l;){const r=d.map(p=>({d:p,index:l.indexOf(p.key)})).filter(p=>p.index>=0).sort((p,x)=>p.index-x.index)[0];if(!r){n.append(n.ownerDocument.createTextNode(l));break}r.index&&n.append(n.ownerDocument.createTextNode(l.slice(0,r.index))),n.append(b(r.d)),l=l.slice(r.index+r.d.key.length)}}function Mn(n,a,s,b){if(!a)return!1;let d;try{d=JSON.parse(a)}catch{return!1}if(d.type!=="doc")return!1;function l(r){var p,x,A,j;if(r.type==="text"){n.append(n.ownerDocument.createTextNode(r.text||""));return}if(r.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(r.type==="fieldToken"||r.type==="dateToken"){const R=((p=r.attrs)==null?void 0:p.placeholder)||"";let y=s.find($=>$.key===R);y||(y={key:R,label:r.type==="dateToken"?"业务日期":((x=r.attrs)==null?void 0:x.label)||"已有数据",metric:r.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((A=r.attrs)==null?void 0:A.label)||""},s.push(y));const S=b(y);(j=r.attrs)!=null&&j.dateRangeSpec&&(S.dataset.legacySpec=JSON.stringify(r.attrs.dateRangeSpec)),n.append(S);return}(r.content||[]).forEach((R,y)=>{r.type==="doc"&&y&&n.append(n.ownerDocument.createTextNode(`
`)),l(R)})}return l(d),!0}function sn({id:n,back:a,changed:s,openSettings:b}){const d=ve(),l=u.useRef(null),[r,p]=u.useState(""),[x,A]=u.useState(!0);return u.useEffect(()=>{let j=!1;const R=l.current;return A(!0),p(""),R.onload=()=>{var y,S;!j&&((y=R.contentDocument)!=null&&y.getElementById("editor"))&&Promise.resolve((S=R.contentDocument.fonts)==null?void 0:S.ready).then(()=>{j||A(!1)})},d.read("daily.get",{id:n}).then(y=>{if(j)return;const S=Pn(y,{back:a,changed:s,openSettings:b,readLocal:d.read});R.dailyRuntime=S,R.srcdoc=qn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(en,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(nn,window.location.href).href)}).catch(y=>{j||p(String(y.message||y))}),()=>{var y;j=!0,R.onload=null,(y=R.dailyRuntime)==null||y.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[r&&e.jsx("p",{role:"alert",children:r}),e.jsx("iframe",{ref:l,title:"日报消息模板",style:{visibility:x?"hidden":void 0}}),x&&!r&&e.jsxs("p",{className:"local-load-status",role:"status",children:[e.jsx(Je,{}),"正在读取任务配置…"]})]})}function Pn(n,a){var U;let s=!1,b=!1,d,l,r=Promise.resolve(),p=0,x=!1;const A=a.readLocal??((o,v)=>O(o,v));let j;const R=new Date,y=n.fields.map(o=>{var v,t,f;return{key:o.placeholder,label:o.label.replace(" · ",""),metric:`${o.databaseId||((v=o.binding)==null?void 0:v.dataSourceId)}:${o.businessId||((t=o.binding)==null?void 0:t.businessMetricId)}`,scope:((f=ye.find(k=>JSON.stringify(k.spec)===JSON.stringify(o.dateRangeSpec)))==null?void 0:f.key)||"legacy",keywords:o.label,field:o}}),S=[];let $=(U=n.metricSourceIds)!=null&&U.length?n.metricSourceIds:[...new Set(n.fields.map(o=>{var v;return o.databaseId||((v=o.binding)==null?void 0:v.dataSourceId)}).filter(Boolean))];const m=new Map(n.fields.map(o=>[o.placeholder,o])),C=new Map;function c(o){const v=l==null?void 0:l.querySelector("#preview-status");v&&(v.textContent=o)}function N(){l==null||l.querySelectorAll("[data-send]").forEach(o=>o.disabled=b||!n.notificationConfigured)}async function D(o){o.text===n.draftTemplate&&o.document===n.draftTemplateDocument||(await O("daily.saveTemplate",{id:I,...o}),n.draftTemplate=o.text,n.draftTemplateDocument=o.document)}async function E(){var o;try{const v=await A("daily.get",{id:I});if(s)return;n.notificationConfigured=v.notificationConfigured,n.sources=v.sources,N(),(o=l==null?void 0:l.querySelector("[data-notification-notice]"))==null||o.toggleAttribute("hidden",!!n.notificationConfigured),await q()}catch(v){c(String(v))}}async function q(){var v;const o=await Promise.allSettled($.map(async t=>({sourceId:t,metrics:(await hn(I,t)).metrics})));if(!s){y.splice(0,y.length,...y.filter(t=>t.field)),S.length=0;for(const t of o)if(t.status==="fulfilled")for(const f of t.value.metrics){const k=`${t.value.sourceId}:${f.id}`;S.push([k,f.name,f.name,0]);const w=f.granularity==="monthly"?[{key:"month",label:"本月"}]:ye;for(const L of w)y.push({key:`${k}:${L.key}`,metric:k,scope:L.key,label:f.granularity==="monthly"?f.name:L.label+f.name,keywords:f.name+" "+L.label+" "+(((v=n.sources.find(W=>W.id===t.value.sourceId))==null?void 0:v.name)||""),sourceId:t.value.sourceId,metricId:f.id});for(const L of y.filter(W=>W.metric===k&&W.field))L.sourceId=t.value.sourceId,L.metricId=f.id}o.some(t=>t.status==="rejected")?c("部分指标目录读取失败，请到系统设置刷新数据库。"):$.length||c("请在右上角任务设置中配置本任务的指标范围。")}}const I=n.id,V={dirty(){p++,j=void 0},id:I,name:n.name,sendTime:n.sendTime,businessDate:`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`,definitions:y,metrics:S,value:o=>{var v,t,f;return o.metric==="date"?"业务日期":((v=j==null?void 0:j.fieldValues)==null?void 0:v[o.key])||((f=j==null?void 0:j.fieldValues)==null?void 0:f[((t=y.find(k=>k.field&&k.metric===o.metric&&k.scope===o.scope))==null?void 0:t.key)||""])||""},mount:(o,v)=>{Mn(o,n.draftTemplateDocument,y,v)||Fn(o,n.draftTemplate,y,v)},async materialize(o){var L;if(o.field||o.metric==="date")return o;const v=y.find(W=>W.metric===o.metric&&W.sourceId),t=o.sourceId||(v==null?void 0:v.sourceId),f=o.metricId||(v==null?void 0:v.metricId);if(!t||!f)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const k=JSON.stringify([t,f,o.scope,o.label]);let w=C.get(k);return w||(w=O("daily.addField",{id:I,sourceId:t,metricId:f,placeholder:"",displayName:o.label,...o.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(L=ye.find(W=>W.key===o.scope))==null?void 0:L.spec}}).then(({field:W})=>{m.set(W.placeholder,W);const Z={...o,key:W.placeholder,field:W,sourceId:t,metricId:f};return y.some(J=>J.key===Z.key)||y.push(Z),a.changed(),Z}).catch(W=>{throw C.delete(k),W}),C.set(k,w)),w},save(o){const v=Ye(o),t=r.catch(()=>{}).then(()=>s?void 0:D(v));return r=t,t},preview(o,v){const t=l==null?void 0:l.querySelector("#preview");ee(t,!0),ee(l==null?void 0:l.querySelector("#preview-generate"),!0);const f=Ye(o),k=++p,w=r.catch(()=>{}).then(async()=>{if(s||k!==p)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await D(f);const L=await O("daily.preview",{id:I,businessDate:v},12e4),W={...L,errors:L.fieldErrors||[],message:L.succeeded?"已生成 · "+v:L.message};return k===p&&!s&&(j=W),W}).finally(()=>{ee(t,!1),ee(l==null?void 0:l.querySelector("#preview-generate"),!1)});return r=w,w},async send(o,v,t){if(!b){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");b=!0,N();try{await V.save(o);const f=await O(v==="test"?"daily.test":"daily.sendToday",v==="test"?{id:I,businessDate:t}:{id:I},12e4);if(!f.succeeded)throw new Error(f.message||"发送失败，请查看运行记录");c(f.alreadySent?"今日当前内容已发送":v==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{b=!1,N()}}},configureAdvanced(o,v){const t=y.some(w=>w.metric===o&&w.scope==="month"),f=t?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];v.replaceChildren(...f.map(w=>new Option(w.label,w.key)));const k=v.ownerDocument.querySelector("#scope-year");k&&(k.disabled=t,k.value="0")},resolveAdvanced(o,v){return o==="month"?"month":ye.find(t=>t.spec.granularity===o&&t.spec.yearOffset===Number(v)).key},async saveBasics(o,v){const t=Array.from((l==null?void 0:l.querySelectorAll("[data-context-source]:checked"))||[]).map(f=>f.value);await O("daily.saveBasics",{id:I,name:o,sendTime:v,metricSourceIds:t}),n.name=o,n.sendTime=v,$=t,V.name=o,await q(),a.changed()},connect(o){var F;l=o,o.title=n.name,o.querySelector("#runs p").textContent="";const v=o.querySelector("header > span");v.removeAttribute("aria-hidden"),v.setAttribute("role","button"),v.setAttribute("tabindex","0"),v.setAttribute("aria-label","返回任务列表");const t=async()=>{const z=o.querySelector("#editor");z.contentEditable="false",p++;try{await V.save(z),a.back()}catch(h){c(String(h)),z.contentEditable="true"}};v.addEventListener("click",t),v.addEventListener("keydown",z=>{z.key==="Enter"&&t()});const f=o.querySelector("#settings"),k=o.createElement("fieldset");k.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const w=o.createElement("legend");w.textContent="本任务的指标范围",k.append(w);for(const z of n.sources){const h=o.createElement("label");h.style.cssText="display:flex;gap:8px;margin:8px 0";const T=o.createElement("input");T.type="checkbox",T.value=z.id,T.dataset.contextSource="",T.checked=$.includes(z.id),T.style.width="auto",h.append(T,o.createTextNode(z.name)),k.append(h)}(F=f.querySelector("p"))==null||F.replaceWith(k);const L=o.createElement("button");L.textContent="数据库设置",L.type="button",L.onclick=()=>{var z;f.close(),(z=a.openSettings)==null||z.call(a)},k.after(L);const W=o.querySelector("footer");for(const[z,h]of[["test","测试发送"],["today","发送今日消息"]]){const T=o.createElement("button");T.textContent=h,T.dataset.send=z,T.onclick=async()=>{const P=o.querySelector("#editor");P.contentEditable="false";try{await V.send(P,z,o.querySelector("#date").value)}catch(B){c(String(B))}finally{P.contentEditable="true"}},W.append(T)}const Z=o.createElement("style");Z.textContent=Ze+`
`+Qe+`
`+rn+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,o.head.append(Z);const J=o.createElement("span");J.className="production-message-demo",J.hidden=!0,o.body.append(J),d=Ge.createRoot(o.querySelector("#date-picker")),d.render(e.jsx(Bn,{input:o.querySelector("#date")})),window.addEventListener("production-settings-updated",E);const g=o.querySelector("#runs");if(g.ontoggle=async()=>{if(!g.open||x)return;x=!0;const z=g.querySelector("p");ee(z,!0);try{const h=await A("daily.runs",{id:I});z.textContent=h.runs.length?"":"暂无运行记录";for(const T of h.runs){const P=o.createElement("div");P.textContent=`${T.time} · ${T.status} · ${T.businessDate}${T.error?" · "+T.error:""}`,z.append(P)}}catch(h){x=!1,z.textContent=String(h)}finally{ee(z,!1)}},!n.notificationConfigured){const z=o.createElement("div");z.className="notice",z.dataset.notificationNotice="",z.append(o.createTextNode("通知渠道尚未配置。 "));const h=o.createElement("button");h.textContent="通知设置",h.onclick=a.openSettings||null,z.append(h),o.querySelector("#message").before(z)}N(),q().catch(z=>c(String(z)))},dispose(){s=!0,p++,d==null||d.unmount(),window.removeEventListener("production-settings-updated",E)}};return V}function Bn({input:n}){const[a,s]=u.useState(n.value);return e.jsx(he,{value:a,onChange:b=>{var d;s(b),n.value=b,n.dispatchEvent(new(((d=n.ownerDocument.defaultView)==null?void 0:d.Event)||Event)("change",{bubbles:!0}))}})}const On=`<!doctype html>\r
<html lang="zh-CN">\r
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\r
<title>原材料自动入库</title>\r
<style>\r
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf');font-weight:100 900}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf');font-weight:100 900}\r
:root{font-family:"Inter Variable","Noto Sans SC Variable",sans-serif;color:#292524;background:#fafaf9;font-size:15px;--line:#e7e5e4;--muted:#78716c;--accent:#c2703d}*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0}button,input,select{font:inherit;color:inherit}button,input,select,.work,dialog{corner-shape:squircle}button{height:44px;border:1px solid #e7e5e4;border-radius:14px;padding:0 16px;background:white;cursor:pointer;white-space:nowrap;font-weight:400}button:hover{background:#f5f5f4}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid #78716c;outline-offset:3px}.primary{background:var(--accent);border-color:var(--accent);color:white}.primary:hover{background:#a85c2e}.quiet{border:0;background:transparent}.icon{width:44px;padding:0;display:grid;place-items:center}svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}h1,h2,h3,p{margin:0}h1{font-size:26px;font-weight:600;letter-spacing:-.02em}h2{font-size:16px;font-weight:500}h3{font-size:15px;font-weight:500}small,.muted{font-size:14px;color:var(--muted)}p{line-height:1.7}main{max-width:1420px;margin:auto;padding:30px 36px}.top{display:flex;align-items:center;gap:14px;padding-bottom:24px;background:#fafaf9;position:sticky;top:0;z-index:2}.title{flex:1;min-width:0}.title h1{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.title small{display:block;margin-top:7px}.pill{font-size:14px;border-radius:999px;background:#f5f5f4;padding:5px 10px;white-space:nowrap}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #e7e5e4;border-radius:20px;background:white;overflow:hidden;min-height:440px}.pane{padding:24px;min-width:0}.pane+.pane{border-left:1px solid var(--line)}.pane-head{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:24px;min-height:44px}.datebar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}input,select{height:44px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:14px;padding:0 12px;min-width:0}input[type=date]{width:163px}.plain{padding:0 4px;height:32px;background:none;border:0;color:var(--muted)}.sheet{border-top:1px solid var(--line)}.line{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--line)}.line .number{font-size:24px;font-weight:500;font-variant-numeric:tabular-nums}.line small{margin-left:6px}.line.total{border-bottom:0}.line.total .number{font-size:18px}.annotation{margin-top:24px;display:flex;align-items:flex-start;gap:9px;color:var(--muted);font-size:14px;line-height:1.7}.annotation svg{flex-shrink:0;margin-top:2px}.empty{min-height:230px;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:12px;color:var(--muted);text-align:center;line-height:1.8}.empty svg{width:32px;height:32px;stroke:#a8a29e}.empty strong{color:#57534e;font-weight:500}.record{margin-top:22px}.record .line{font-size:15px;padding:13px 0}.record .line span:first-child{color:var(--muted)}.record .line span:last-child{text-align:right}.callout{background:#f5f5f4;border-radius:14px;corner-shape:squircle;padding:13px 15px;margin-top:20px;font-size:14px;line-height:1.7}.callout.error{background:#fef2f2;color:#b91c1c}.callout.warn{background:rgb(249, 220, 164);color:#57534e}.action-row{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:16px}.action-row p{font-size:14px;color:var(--muted);flex:1}.action-row button{flex-shrink:0}details.runs{margin-top:24px;border-top:1px solid var(--line)}summary{cursor:pointer;padding:18px 0;font-size:15px}summary::marker{color:var(--muted)}.runs-body{padding-bottom:15px}.run{border-top:1px solid var(--line);padding:14px 0;display:grid;grid-template-columns:85px 1fr auto;gap:16px;font-size:14px}.run p{color:var(--muted);font-size:14px}.demo{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px dashed #e7e5e4;padding-top:16px;margin-top:12px;color:var(--muted);font-size:14px}.demo select{height:36px;font-size:14px}.demo button{height:36px;font-size:14px}.demo label{margin-left:auto;display:flex;align-items:center;gap:8px}dialog{width:510px;max-width:calc(100vw - 32px);max-height:calc(100vh - 48px);overflow:auto;border:1px solid #e7e5e4;border-radius:20px;padding:24px;color:#292524}dialog::backdrop{background:#29252460}dialog header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}dialog label{display:grid;gap:8px;font-size:14px;margin-top:16px}dialog label input{width:100%}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.section{border-top:1px solid var(--line);margin-top:22px;padding-top:20px}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.switch-row{display:flex;align-items:center;justify-content:space-between;gap:15px}.switch-row small{display:block;margin-top:6px}.toggle{width:44px;height:26px;border-radius: var(--radius-panel, 20px); corner-shape: squircle;padding:3px;background:#d6d3d1;border:0;corner-shape:squircle}.toggle::after{content:'';display:block;width:20px;height:20px;background:white;border-radius: var(--radius-panel, 20px); corner-shape: squircle;transition:transform .15s}.toggle[aria-checked=true]{background:#57534e}.toggle[aria-checked=true]::after{transform:translateX(18px)}[hidden]{display:none!important}#feedback{margin:0 0 18px}#feedback:empty{display:none}@media(max-width:900px){main{padding:24px}.pane{padding:20px}.work{grid-template-columns:1.2fr 1fr}.datebar{gap:8px}.top{gap:10px}.top>small{display:none}}@media(max-width:700px){main{padding:16px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid var(--line)}h1{font-size:22px}.action-row{align-items:flex-start;flex-wrap:wrap}.demo label{margin-left:0}.two{grid-template-columns:1fr}.top{position:static}.run{grid-template-columns:70px 1fr}.run>small{display:none}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}\r
</style>\r
<main>\r
<header class="top"><button class="icon quiet" id="back" aria-label="返回任务列表"><svg viewBox="0 0 24 24"><path d="m14 6-6 6 6 6M8 12h12"/></svg></button><div class="title"><h1 id="name">原材料入库自动填报</h1></div><span class="pill" id="enabled">未启用</span><button class="icon" id="settings-open" aria-label="任务设置" title="任务设置"><svg viewBox="0 0 24 24"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>\r
<p id="feedback" role="status" aria-live="polite"></p>\r
<section class="work" aria-label="入库工作区"><div class="pane"><div class="pane-head"><h2>入库数据</h2></div><div class="datebar"><span id="date-label">业务日期</span><input type="hidden" id="date"><span id="date-picker"></span><button class="plain" id="yesterday">昨天</button><button id="preview" class="primary">生成预览</button></div><div id="source-empty" class="empty"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h6m-6 3h4"/></svg><strong>选择日期，查看入库汇总</strong><span>手动读取板材、型材重量<br>同时检查 Teable 中是否已有记录</span></div><div id="source-values" hidden><div class="sheet"><div class="line"><span>板材</span><span><b class="number" id="plate">—</b><small>吨</small></span></div><div class="line"><span>型材</span><span><b class="number" id="section">—</b><small>吨</small></span></div><div class="line total"><span>合计</span><span><b class="number" id="total">—</b><small>吨</small></span></div></div></div><div id="source-error" class="callout error" role="alert" hidden></div></div>\r
<div class="pane"><div class="pane-head"><h2>写入预览</h2><span class="pill">Notion</span></div><small id="target-name">原材料入库数据库</small><div id="target-empty" class="empty"><strong>尚未生成预览</strong><span>预览只读取数据，不会新增记录</span></div><div class="record" id="record" hidden><div class="line"><span>业务</span><span id="record-title"></span></div><div class="line"><span>日期</span><span id="record-date"></span></div><div class="line"><span>板材</span><span id="record-plate"></span></div><div class="line"><span>型材</span><span id="record-section"></span></div></div><div id="target-status" class="callout" role="status" hidden></div></div></section>\r
<div class="action-row"><button id="source-test">仅测试 93 读取</button><button id="run" disabled>执行本日期</button></div>\r
<details class="runs"><summary>运行记录 <small id="run-count"></small></summary><div class="runs-body" id="runs-body"><p class="muted">暂无运行记录</p></div></details>\r
</main>\r
<dialog id="settings" aria-labelledby="settings-title"><form id="settings-form"><header><h2 id="settings-title">任务设置</h2><button type="button" class="icon quiet" data-close="settings" aria-label="关闭任务设置">✕</button></header><label>任务名称<input id="task-name" required maxlength="80"></label><div class="section"><h3>93 系统连接</h3><label>材料入库业务页面<input type="url" id="url" required placeholder="http://服务器/业务页面"></label><div class="two"><label>用户名<input id="username" required autocomplete="off"></label><label>密码<input id="password" type="password" placeholder="已保存；留空不修改" autocomplete="new-password"></label></div></div><div class="section"><div class="switch-row"><div><h3>定时入库</h3><small>填报前一天</small></div><button type="button" id="toggle" class="toggle" role="switch" aria-checked="false" aria-label="定时入库"></button></div><label>每天执行时间<input id="run-time" type="time" step="60" required></label><p id="schedule-hint" class="muted" style="margin-top:12px">完成一次“生成预览”后可启用。</p></div><div class="section"><h3>固定写入目标</h3><p class="muted" style="margin-top:8px"><span id="settings-target-name">原材料入库数据库</span> · 业务、日期、板材、型材<br>Teable 连接与数据库目录在系统设置中维护。<br><button type="button" class="plain" id="system-settings">打开系统设置</button></p></div><p class="callout" id="settings-note">修改名称或连接后，需重新预览并启用定时任务。</p><div class="actions"><button type="button" data-close="settings">取消</button><button class="primary" type="submit">保存设置</button></div></form></dialog>\r
<dialog id="confirm" aria-labelledby="confirm-title"><header><h2 id="confirm-title">执行本日期</h2><button class="icon quiet" data-close="confirm" aria-label="关闭确认">✕</button></header><p id="confirm-copy"></p><p class="callout">执行时会重新读取并查重，以当时的数据为准；已有记录则跳过。</p><div class="actions"><button data-close="confirm">取消</button><button class="primary" id="confirm-run">确认执行</button></div></dialog>\r
\r
</html>\r
`,He=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function an({id:n,...a}){const s=ve(),b=u.useRef(null),[d,l]=u.useState(""),[r,p]=u.useState(!0);return u.useEffect(()=>{let x=!1,A;const j=b.current;return l(""),p(!0),s.read("notionFill.get",{id:n}).then(R=>{x||(A=Vn(R,{...a,readLocal:s.read}),j.onload=()=>{var y,S;if(!x&&((y=j.contentDocument)!=null&&y.getElementById("date-picker")))try{A.connect(j.contentDocument),Promise.resolve((S=j.contentDocument.fonts)==null?void 0:S.ready).then(()=>{x||p(!1)})}catch($){l(String($))}},j.srcdoc=On.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(en,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(nn,window.location.href).href))}).catch(R=>{x||l(String(R.message||R))}),()=>{x=!0,j.onload=null,A==null||A.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[d&&e.jsx("p",{role:"alert",children:d}),e.jsx("iframe",{ref:b,title:"原材料自动入库",style:{visibility:r?"hidden":void 0}}),r&&!d&&e.jsxs("p",{className:"local-load-status",role:"status",children:[e.jsx(Je,{}),"正在读取任务配置…"]})]})}function Vn(n,a){let s={...n,runTime:n.runTime||"00:00"},b,d,l=!1,r=!1,p=0,x=0,A=!1,j=!1;const R=a.readLocal??((h,T)=>O(h,T));let y=He(),S,$=s.isEnabled;const m=h=>b.getElementById(h),C=h=>m(h),c=h=>m(h),N=h=>m(h),D=h=>h instanceof Error?h.message:String(h),E=h=>h.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function q(h,T=!1){m("feedback").textContent=h,m("feedback").className=T?"callout error":""}function I(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function V(){d==null||d.render(e.jsx(he,{value:y,disabled:r,onChange:v}))}function U(){for(const h of["preview","source-test","yesterday","settings-open","back","confirm-run"])c(h).disabled=r;c("preview").disabled=r||!I()||!s.notionConfigured,c("source-test").disabled=r||!I(),c("run").disabled=r||!S,b.querySelectorAll("#settings button, #settings input").forEach(h=>h.disabled=r),c("toggle").disabled=r||!s.schedulingAvailable,c("preview").textContent=r?"处理中…":"生成预览",ee(c("preview"),r),m("name").textContent=s.name,m("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",m("target-name").textContent=s.targetDataSourceName,m("settings-target-name").textContent=s.targetDataSourceName,C("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",V()}function o(h="尚未生成预览"){p++,S=void 0,m("source-empty").hidden=!1,m("source-values").hidden=!0,m("source-error").hidden=!0,m("record").hidden=!0,m("target-status").hidden=!0,m("target-empty").hidden=!1,m("target-empty").querySelector("strong").textContent=h,m("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",c("run").textContent="执行本日期",c("run").disabled=!0,N("confirm").open&&N("confirm").close()}function v(h){r||(y=h,C("date").value=h,o("待重新预览"),q(""),V())}function t(h){m("source-empty").hidden=!0,m("source-values").hidden=!1;for(const[T,P]of[["plate",h.plateWeight],["section",h.sectionWeight],["total",h.totalWeight]])m(T).textContent=E(P)}function f(h){t(h),m("target-empty").hidden=!0,m("record").hidden=!1,m("record-title").textContent=`${h.businessDate} 入库`,m("record-date").textContent=h.businessDate,m("record-plate").textContent=`${E(h.plateWeight)} 吨`,m("record-section").textContent=`${E(h.sectionWeight)} 吨`,m("target-status").hidden=!1,m("target-status").textContent=h.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",c("run").textContent=h.targetRecordExists?"验证查重":"执行本日期"}function k(h){m("run-count").textContent=h.length?`· ${h.length}`:"";const T=h.map(P=>{const B=b.createElement("div");B.className="run";const ae=b.createElement("span");ae.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[P.source]||P.source;const te=b.createElement("div");te.textContent=P.error||P.message||(P.status==="created"?"已新增":P.status==="failed"?"执行失败":"已检查"),P.status==="failed"&&(te.style.color="#B91C1C");const ie=b.createElement("p");ie.textContent=P.status==="failed"?P.businessDate:`${P.businessDate} · 板材 ${E(P.plateWeight)} 吨 · 型材 ${E(P.sectionWeight)} 吨`,te.append(ie);const se=b.createElement("small");return se.textContent=P.time,B.append(ae,te,se),B});m("runs-body").replaceChildren(...T),h.length||(m("runs-body").textContent="暂无运行记录")}async function w(h=!1){if(j||A&&!h)return;j=!0;const T=++x;ee(m("runs-body"),!0);try{const P=await R("notionFill.runs",{id:s.id},h);!l&&T===x&&(k(P.runs),A=!0)}catch(P){!l&&T===x&&(m("runs-body").textContent=`运行记录读取失败：${D(P)}；重新展开可重试。`)}finally{j=!1,!l&&T===x&&ee(m("runs-body"),!1)}}function L(){Promise.resolve(a.changed()).catch(()=>{})}async function W(h){if(r||!y)return;const T=S;r=!0,S=void 0,T||(m("source-empty").querySelector("strong").textContent="正在读取…",m("target-empty").querySelector("strong").textContent="正在检查…"),ee(m("source-empty"),!0),ee(m("target-empty"),!0);const P=p;U(),q("");try{const B=await O(h?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:y},12e4);if(l||P!==p)return;if(!B.succeeded)throw new Error(B.message||"读取失败");h?(t(B),m("target-empty").querySelector("strong").textContent="尚未检查数据库",m("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,S=B,f(B)),L()}catch(B){if(l||P!==p)return;T?(m("target-status").hidden=!1,m("target-status").textContent="更新失败，保留上次结果，请重新预览。"):o("本次预览未完成"),m("source-error").hidden=!1,m("source-error").textContent=D(B)}finally{l||(ee(m("source-empty"),!1),ee(m("target-empty"),!1),r=!1,U(),w(!0))}}async function Z(){if(r||!S||!N("confirm").open)return;const h=S.businessDate;N("confirm").close(),r=!0,U(),q("");try{const T=await O("notionFill.runNow",{id:s.id,businessDate:h},12e4);if(l)return;if(!T.succeeded)throw new Error(T.message||"执行失败");S={...S,targetRecordExists:!0},m("target-status").textContent=T.message,c("run").textContent="验证查重",q(T.created?"数据库写入成功。":"该日期已有记录，本次已跳过。"),L()}catch(T){l||(o("执行未完成，请重新预览"),q(D(T),!0))}finally{l||(r=!1,U(),w(!0))}}function J(){return C("task-name").value.trim()!==s.name||C("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||C("username").value.trim()!==s.username||!!C("password").value}function g(){c("toggle").setAttribute("aria-checked",String($)),m("schedule-hint").textContent=s.schedulingAvailable?J()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function F(h){if(h.preventDefault(),r)return;const T=C("task-name").value.trim(),P=C("username").value.trim();if(!T||!P){m("settings-note").textContent="任务名称和用户名不能为空。";return}const B=J(),ae=C("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(ae)){m("settings-note").textContent="请选择有效的执行时间。";return}const te=B||ae!==s.runTime,ie=B?!1:$;let se=!1;r=!0,U();try{if(te){const ne=C("url").value.trim().replace(/\/+$/,""),oe=C("password").value;if(await O("notionFill.save",{id:s.id,name:T,sourcePageUrl:ne,username:P,password:oe,runTime:ae}),l)return;se=!0,s={...s,name:T,sourcePageUrl:ne,username:P,runTime:ae,passwordConfigured:s.passwordConfigured||!!oe,isEnabled:B?!1:s.isEnabled,validated:B?!1:s.validated},C("password").value="",B&&o("配置已修改，请重新预览")}if(ie!==s.isEnabled){const ne=await O("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:ie});if(l)return;if(s.isEnabled=ne.enabled,ne.enabled!==ie)throw new Error(ne.message||"定时任务状态未更新");se=!0}const ce=await R("notionFill.get",{id:s.id},!0);if(l)return;s=ce,N("settings").close(),q(B?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(ce){l||(m("settings-note").textContent=`${se?"设置已更新，但后续操作失败：":""}${D(ce)}`)}finally{l||(r=!1,$=s.isEnabled,U(),g(),se&&L())}}async function z(){if(r||l)return;const h=p;try{const T=await R("notionFill.get",{id:s.id});if(l||r||h!==p)return;s=T,o("系统设置已更新，请重新预览"),U(),q(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"数据库连接尚未配置，仍可仅测试 93 读取。")}catch(T){l||q(D(T),!0)}}return{connect(h){d==null||d.unmount(),b=h;const T=b.createElement("style");T.textContent=Ze+`
`+Qe+`
`+rn+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,b.head.append(T);const P=b.createElement("span");P.className="production-message-demo",P.hidden=!0,b.body.append(P),d=Ge.createRoot(m("date-picker")),C("date").value=y,C("date").onchange=()=>v(C("date").value),c("yesterday").onclick=()=>v(He()),c("preview").onclick=()=>{W(!1)},c("source-test").onclick=()=>{W(!0)},c("back").onclick=a.back,c("run").onclick=()=>{r||!S||(m("confirm-title").textContent=S.targetRecordExists?"验证查重":"执行本日期",m("confirm-copy").textContent=S.targetRecordExists?`${S.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${S.businessDate} 的记录：板材 ${E(S.plateWeight)} 吨，型材 ${E(S.sectionWeight)} 吨。`,N("confirm").showModal())},c("confirm-run").onclick=()=>{Z()},c("settings-open").onclick=()=>{C("task-name").value=s.name,C("url").value=s.sourcePageUrl,C("username").value=s.username,C("password").value="",C("run-time").value=s.runTime,C("password").required=!s.passwordConfigured,m("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",$=s.isEnabled,g(),N("settings").showModal()},c("toggle").onclick=()=>{if(s.schedulingAvailable){if(!$&&(!s.validated||J())){m("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}$=!$,g()}};for(const B of["task-name","url","username","password"])C(B).oninput=()=>{J()&&($=!1),g()};m("settings-form").onsubmit=B=>{F(B)},N("settings").onclose=()=>{C("password").value=""},N("settings").oncancel=B=>{r&&B.preventDefault()},b.querySelectorAll("[data-close]").forEach(B=>B.onclick=()=>{r||N(B.dataset.close).close()}),c("system-settings").hidden=!a.openSettings,c("system-settings").onclick=()=>{var B;N("settings").close(),(B=a.openSettings)==null||B.call(a)},b.querySelector(".runs").ontoggle=B=>{B.currentTarget.open&&w()},window.addEventListener("production-settings-updated",z),o(),U(),I()?s.notionConfigured||q("数据库连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):q("请先在任务设置中补全 93 系统连接配置。")},dispose(){l=!0,p++,x++,d==null||d.unmount(),window.removeEventListener("production-settings-updated",z)}}}function Un({onCreated:n,onBack:a,onCancel:s}){const[b,d]=u.useState(2),[l,r]=u.useState("日报任务"),[p,x]=u.useState("17:30"),[A,j]=u.useState(!1),[R,y]=u.useState("");async function S(){j(!0),y("");try{const $=await O("daily.create",{name:l.trim(),sendTime:p});await n($)}catch($){y($ instanceof Error?$.message:String($))}finally{j(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(Wn,{current:b}),R&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:R})]})}),b===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:$=>r($.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:a,children:[e.jsx(xe,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>d(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"日报必要配置"}),e.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),e.jsxs("label",{children:["每天发送时间",e.jsx("input",{type:"time",value:p,onChange:$=>x($.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"任务类型"}),e.jsx("strong",{children:"日报推送"}),e.jsx("span",{children:"创建后继续"}),e.jsx("strong",{children:"消息内容 → 预览与测试"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:A,onClick:()=>d(2),children:[e.jsx(xe,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:A,onClick:s,children:"取消"}),e.jsxs("button",{className:"primary",disabled:A||!p,onClick:S,children:[A&&e.jsx(re,{className:"spin"}),"创建任务"]})]})]})]})}function Wn({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Yn({onCreated:n,onBack:a,onCancel:s}){const[b,d]=u.useState(2),[l,r]=u.useState("原材料入库自动填报"),[p,x]=u.useState(""),[A,j]=u.useState(""),[R,y]=u.useState(""),[S,$]=u.useState(!1),[m,C]=u.useState("");async function c(){$(!0),C("");try{const N=await O("notionFill.create",{name:l.trim(),sourcePageUrl:p.trim(),username:A.trim(),password:R});await n(N)}catch(N){C(N instanceof Error?N.message:String(N))}finally{$(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(Hn,{current:b}),m&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:m})]})}),b===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:N=>r(N.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:a,children:[e.jsx(xe,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>d(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"93 系统连接"}),e.jsx("p",{children:"凭据只归当前自动填报任务所有，并使用现有 Windows 加密存储。"})]}),e.jsxs("label",{children:["材料入库业务页面",e.jsx("input",{type:"url",value:p,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:N=>x(N.target.value)})]}),e.jsxs("label",{children:["93 系统用户名",e.jsx("input",{value:A,autoComplete:"username",onChange:N=>j(N.target.value)})]}),e.jsxs("label",{children:["93 系统密码",e.jsx("input",{type:"password",value:R,autoComplete:"new-password",onChange:N=>y(N.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"填报目标"}),e.jsx("strong",{children:"原材料入库数据库"}),e.jsx("span",{children:"执行时间"}),e.jsx("strong",{children:"每天 00:00 · 填报前一天"}),e.jsx("span",{children:"写入方式"}),e.jsx("strong",{children:"按日期查重，仅新增"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:S,onClick:()=>d(2),children:[e.jsx(xe,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:S,onClick:s,children:"取消"}),e.jsxs("button",{className:"primary",disabled:S||!p.trim()||!A.trim()||!R,onClick:c,children:[S&&e.jsx(re,{className:"spin"}),"创建任务"]})]})]})]})}function Hn({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const on=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Teable 取数填报。",renderCreate:n=>e.jsx(zn,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>e.jsx(Xe,{id:n.id,changed:n.changed},n.id),loadRuns:n=>O("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,source:s.source==="background-test"?"后台自动测试":s.source==="automatic"?"定时填报":"前台测试",title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>e.jsx(Un,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>e.jsx(sn,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>O("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Teable 自动填报",description:"读取 93 系统前一天入库数据并新增到 Teable。",renderCreate:n=>e.jsx(Yn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Teable 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>e.jsx(an,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>O("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function _e(n){return on.find(a=>a.taskType===n)}const Ce=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function Xn({openSettings:n,taskType:a=""}){var J;const s=ve(),[b,d]=u.useState(()=>{var g;return((g=s.peek("automation.list"))==null?void 0:g.tasks)??[]}),[l,r]=u.useState(()=>!s.peek("automation.list")),[p,x]=u.useState(),[A,j]=u.useState([]);p&&!A.some(g=>g.taskType===p.taskType&&g.id===p.id)&&j([...A,p]);const[R,y]=u.useState(""),[S,$]=u.useState(""),[m,C]=u.useState(),[c,N]=u.useState(),[D,E]=u.useState(),[q,I]=u.useState(!1),[V,U]=u.useState(""),[o,v]=u.useState(["daily_report","notion_fill"]),t=a?b.filter(g=>g.taskType===a):b,f=on.filter(g=>o.includes(g.taskType)&&(!a||g.taskType===a)),k=gn(xn.dailyReport,a).name,w=(g=!0)=>s.read("automation.list",void 0,g).then(F=>{F.availableTaskTypes&&v(F.availableTaskTypes);const z=Array.isArray(F.tasks)?F.tasks:b;return d(z),x(h=>h&&(z.find(T=>T.taskType===h.taskType&&T.id===h.id)||h)),z});u.useEffect(()=>{w(!1).catch(g=>C(Ce(g))).finally(()=>r(!1))},[]),u.useEffect(()=>{x(void 0),y(""),C(void 0),N(void 0),E(void 0),I(!1),U("")},[a]),u.useEffect(()=>{if(!c)return;const g=()=>N(void 0),F=z=>z.key==="Escape"&&g();return window.addEventListener("pointerdown",g),window.addEventListener("keydown",F),window.addEventListener("blur",g),()=>{window.removeEventListener("pointerdown",g),window.removeEventListener("keydown",F),window.removeEventListener("blur",g)}},[c]);async function L(g,F){const z=await w();I(!1),U(""),x(z.find(h=>h.taskType===g&&h.id===F.id))}async function W(g){$(g.id),C(void 0);try{const F=await O("automation.setEnabled",{taskType:g.taskType,id:g.id,enabled:!g.isEnabled},6e4);F.missingStep?(y(F.missingStep),x(g),C({tone:"warning",title:"配置尚未完成",message:F.message||""})):await w()}catch(F){C(Ce(F))}finally{$("")}}async function Z(g){if(!g.isEnabled){$(g.id);try{await O("automation.delete",{taskType:g.taskType,id:g.id}),E(void 0),j(F=>F.filter(z=>z.taskType!==g.taskType||z.id!==g.id)),await w()}catch(F){C(Ce(F))}finally{$("")}}}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{hidden:!!p,style:p?{display:"none"}:void 0,className:"page daily-page automation-list-page",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsx("h1",{children:k}),e.jsx("p",{children:a==="tencent_sheet_fill"?"先新建任务并保存文档链接，再打开浏览器登录和检查；网页控件、业务字段及定时配置保留在任务详情中。":"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),e.jsx("div",{className:"header-actions",children:e.jsxs("button",{className:"primary",disabled:l||!f.length,onClick:()=>{U(a),I(!0)},children:[e.jsx(yn,{}),"新建任务"]})})]}),m&&e.jsx("div",{className:`notice ${m.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:m.title}),e.jsx("span",{children:m.message})]})}),e.jsxs("section",{className:"daily-job-list","aria-label":"任务列表","aria-busy":l,children:[l&&e.jsxs("p",{role:"status",children:[e.jsx(re,{className:"spin"}),"正在读取任务列表…"]}),t.map(g=>e.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(g.status)?" needs-attention":""}`,onClick:()=>x(g),onContextMenu:F=>{F.preventDefault(),N({task:g,x:Math.min(F.clientX,window.innerWidth-176),y:Math.min(F.clientY,window.innerHeight-58)})},children:[e.jsxs("div",{className:"job-copy",children:[e.jsx("h2",{children:e.jsx("button",{type:"button",className:"automation-task-name",onClick:F=>{F.stopPropagation(),x(g)},children:g.name||"未命名任务"})}),e.jsxs("p",{children:[g.taskTypeName," · ",g.schedule," · ",g.connectionStatus]})]}),e.jsxs("div",{className:"job-actions",onClick:F=>F.stopPropagation(),children:[e.jsx("span",{className:`job-status ${g.status}`,children:dn(g.status)}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox","aria-label":`启用${g.name||"未命名任务"}`,checked:g.isEnabled,disabled:!g.schedulingAvailable||S===g.id,title:g.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>W(g)}),e.jsx("span",{})]}),e.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${g.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:F=>{const z=F.currentTarget.getBoundingClientRect();N({task:g,x:Math.min(z.left,window.innerWidth-176),y:Math.min(z.bottom+4,window.innerHeight-58)})},children:e.jsx(vn,{})})]}),e.jsxs("div",{className:"automation-card-footer",children:["最近运行：",g.lastRun]})]},`${g.taskType}:${g.id}`)),!l&&!m&&!t.length&&e.jsxs("div",{className:"empty-state",children:[e.jsx(wn,{}),e.jsx("h2",{children:a?`暂无${k}任务`:"还没有自动化任务"}),e.jsx("p",{children:f.length?"新建任务后进入对应的专用配置界面。":"当前环境尚未开放此类任务创建。"})]})]}),!!t.length&&e.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置、运行与定时设置。"}),c&&e.jsx("div",{className:"job-context-menu",role:"menu",style:{left:c.x,top:c.y},onPointerDown:g=>g.stopPropagation(),children:e.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:c.task.isEnabled||S===c.task.id,onClick:()=>{E(c.task),N(void 0)},children:[e.jsx(Sn,{}),c.task.isEnabled?"停用后可删除":"删除任务"]})}),e.jsx(Le,{open:!!D,onOpenChange:g=>!g&&E(void 0),children:e.jsxs(Fe,{children:[e.jsx(Me,{className:"dialog-overlay"}),e.jsxs(Pe,{className:"dialog",children:[e.jsx(Be,{children:"删除自动化任务？"}),e.jsxs(Oe,{children:["将删除“",D==null?void 0:D.name,"”及其业务记录，此操作无法撤销。"]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),e.jsx("button",{className:"danger",disabled:!!S,onClick:()=>D&&Z(D),children:"确认删除"})]})]})]})}),e.jsx(Le,{open:q,onOpenChange:g=>{I(g),g||U("")},children:e.jsxs(Fe,{children:[e.jsx(Me,{className:"dialog-overlay"}),e.jsxs(Pe,{className:"dialog automation-create-dialog",children:[e.jsx(Be,{children:"新建自动化任务"}),e.jsx(Oe,{children:V?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),V?(J=_e(V))==null?void 0:J.renderCreate({onCreated:g=>L(V,g),onBack:()=>U(""),onCancel:()=>{I(!1),U("")}}):e.jsx("div",{className:"automation-create-types",children:f.map(g=>e.jsxs("button",{onClick:()=>U(g.taskType),children:[e.jsx("strong",{children:g.name}),e.jsx("span",{children:g.description})]},g.taskType))})]})]})})]}),A.map(g=>{const F=b.find(T=>T.id===g.id&&T.taskType===g.taskType)??g,z=_e(F.taskType),h=(p==null?void 0:p.id)===F.id&&p.taskType===F.taskType;return z&&e.jsx("div",{hidden:!h,style:h?void 0:{display:"none"},children:e.jsx(_n,{openSettings:n,task:F,definition:z,focusStep:h?R:"",notice:h?m:void 0,refresh:w,back:()=>{x(void 0),y(""),C(void 0)}})},`${F.taskType}:${F.id}`)})]})}function _n({openSettings:n,task:a,definition:s,focusStep:b,notice:d,refresh:l,back:r}){const[p,x]=u.useState(b?s.resolveSection(b):s.includeBasics===!1?s.taskTabs[0].id:"basics"),A=a.taskType==="daily_report",[j,R]=u.useState(),[y,S]=u.useState(""),[$,m]=u.useState(!1),C=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],c=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function N(){m(!0),S("");try{R(await s.loadRuns(a.id))}catch(E){S(E instanceof Error?E.message:String(E))}finally{m(!1)}}u.useEffect(()=>{p==="runs"&&j===void 0&&N()},[p,j]);function D(E,q){var V;if(E.key!=="ArrowLeft"&&E.key!=="ArrowRight")return;E.preventDefault();const I=(q+(E.key==="ArrowRight"?1:-1)+C.length)%C.length;x(C[I].id),(V=document.getElementById(`automation-tab-${C[I].id}`))==null||V.focus()}return a.taskType==="tencent_sheet_fill"?e.jsx(Xe,{id:a.id,name:a.name,back:r,changed:()=>{l().catch(()=>{})}},a.id):A?e.jsx(sn,{id:a.id,back:r,changed:l,openSettings:n}):a.taskType==="notion_fill"?e.jsx(an,{id:a.id,back:r,changed:l,openSettings:n}):e.jsxs("div",{className:"page daily-page automation-detail",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:r,children:[e.jsx(xe,{}),"返回任务列表"]}),e.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),e.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),e.jsx("span",{className:`job-status ${a.status}`,children:dn(a.status)})]}),e.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:C.map((E,q)=>e.jsx("button",{type:"button",role:"tab",id:`automation-tab-${E.id}`,"aria-selected":p===E.id,"aria-controls":`automation-panel-${E.id}`,tabIndex:p===E.id?0:-1,onClick:()=>x(E.id),onKeyDown:I=>D(I,q),children:E.label},E.id))}),e.jsxs("div",{children:[d&&e.jsx("div",{className:`notice ${d.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:d.title}),e.jsx("span",{children:d.message})]})}),!!c.length&&e.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[e.jsxs("div",{className:"automation-issues-heading",children:[e.jsx(kn,{}),e.jsxs("div",{children:[e.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),e.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),e.jsxs("span",{children:[c.length," 项"]})]}),e.jsx("ul",{children:c.map(E=>{var q;return e.jsxs("li",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:E.title}),e.jsx("span",{children:E.message})]}),e.jsxs("button",{type:"button",onClick:()=>{x(E.section)},children:["前往",((q=C.find(I=>I.id===E.section))==null?void 0:q.label)||"处理",e.jsx(jn,{})]})]},E.id)})})]}),e.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${p}`,"aria-labelledby":`automation-tab-${p}`,children:[e.jsx("div",{hidden:p==="runs",children:s.renderEditor({id:a.id,section:p,openSettings:n,navigate:x,changed:()=>{l().catch(()=>{})}})}),p==="runs"&&e.jsxs("section",{className:"surface automation-runs",children:[e.jsxs("div",{className:"automation-runs-heading",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"运行记录"}),e.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),e.jsxs("button",{className:"secondary",disabled:$,onClick:N,children:[$?e.jsx(re,{className:"spin"}):e.jsx(Nn,{}),"刷新"]})]}),y&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"运行记录读取失败"}),e.jsx("span",{children:y})]})}),e.jsx("div",{className:"automation-run-list",children:j==null?void 0:j.map(E=>e.jsxs("details",{children:[e.jsxs("summary",{children:[e.jsx("span",{children:E.time}),e.jsx("span",{children:E.source}),e.jsx("strong",{children:E.title}),e.jsx("b",{className:E.error?"error-text":"",children:E.status})]}),e.jsxs("div",{children:[E.details.map(q=>e.jsx("p",{children:q},q)),E.error&&e.jsxs("p",{className:"run-error",children:["错误：",E.error]})]})]},E.id))}),$&&!j&&e.jsxs("p",{role:"status",children:[e.jsx(re,{className:"spin"}),"正在读取运行记录…"]}),!$&&j&&!j.length&&e.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function dn(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}export{Xn as AutomationPage};
