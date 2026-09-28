import{c as ae,r as m,j as e,C as se,D as le,i as M,a as Ze,b as Pe}from"./index-Cknr5ziZ.js";import{D as ye,a as ve,b as we,c as ke,d as je,e as Ne}from"./index-DzXFAW5X.js";import{X as Qe}from"./x-BPQldM6f.js";import{L as ce}from"./loader-circle-NCvlPMnh.js";import{g as en}from"./dailyFieldCache-BeRhmNx4.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=ae("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=ae("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=ae("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=ae("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=ae("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=ae("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=ae("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=ae("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),Re=["firstTarget","secondTarget","dateHeader","label"],ze=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function ln(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(i=>i.type==="year").value}-${n.find(i=>i.type==="month").value}`}function cn({id:n,metrics:i,initialMetric:r,businessDate:v,rules:u,fixedSheet:l,disabled:t,run:c,onActive:y,onSaved:N}){var d,E;const[f,$]=m.useState(r||((d=i[0])==null?void 0:d.value)||""),[h]=m.useState(()=>(v==null?void 0:v.slice(0,7))||ln()),[x,j]=m.useState(`${h}-01`),[S,I]=m.useState(`${h}-02`),[k,C]=m.useState(),[z,w]=m.useState({}),[T,L]=m.useState(""),s=!!k,b=((E=i.find(A=>A.value===f))==null?void 0:E.label)||"业务字段",p={firstTarget:`${x} 的${b}填报格`,secondTarget:`${S} 的${b}填报格`,dateHeader:`${x} 的日期单元格`,label:"项目名称、公司或材料表头"};async function o(A){L(""),await c(A==="preview"?"验证排列并定位第三个日期":A==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const D=await M("tencentSheet.teach",{id:n,stage:A,metric:f,firstDate:x,secondDate:S,sessionToken:k==null?void 0:k.sessionToken,previewToken:k==null?void 0:k.previewToken,slot:k==null?void 0:k.step},3e5);A==="confirm"||A==="cancel"?(C(void 0),w({}),y(!1),A==="confirm"&&await N()):(C(V=>({...V,...D})),y(!0),D.capture&&D.slot&&w(V=>({...V,[D.slot]:D.capture})))}catch(D){L(D instanceof Error?D.message:String(D)),A==="cancel"&&(C(void 0),w({}),y(!1))}})}return e.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:t,children:[e.jsx("legend",{children:"示范填报位置"}),e.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范只读取位置与表头，受保护或已有数据的单元格也可使用，不检查是否可编辑、不填写数据。程序学习两个日期的排列关系，再请你确认第三个位置；正式填报前才检查目标是否可编辑。"}),e.jsx("div",{className:"tencent-teaching-rules",children:i.map(A=>e.jsxs("div",{children:[e.jsx("strong",{children:A.label}),e.jsx("span",{children:u!=null&&u[A.value]?ze(u[A.value]):"待示范位置"})]},A.value))}),T&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"示范未完成"}),e.jsx("span",{children:T})]})}),s?e.jsxs(e.Fragment,{children:[e.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Re.map((A,D)=>{var V;return e.jsxs("li",{"aria-current":k.step===A?"step":void 0,className:z[A]?"done":"",children:[e.jsxs("span",{children:[D+1,". ",p[A]]}),e.jsx("strong",{children:((V=z[A])==null?void 0:V.address)||"待选取"})]},A)})}),Re.includes(k.step)&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:["请在网页中单击：",p[k.step]]}),e.jsx("p",{children:k.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":k.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可。受保护或已有数据的格子也可示范，无需解除保护或输入数据。"}),e.jsx("button",{className:"primary",onClick:()=>o("capture"),children:"记住当前选中的单元格"})]}),k.step==="preview"&&e.jsx("button",{className:"primary",onClick:()=>o("preview"),children:"验证规则并查看第三个位置"}),k.step==="confirm"&&k.rule&&k.prediction&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:[b,"：",ze(k.rule)]}),e.jsxs("p",{children:["程序已选中 ",k.prediction.date," 的预测位置 ",e.jsx("b",{children:k.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),e.jsxs("p",{children:["日期及“",k.rule.labelAnchor.expected,"”已通过只读校验。"]}),(k.sheetMode==="fixed"||!k.sheetMode&&l)&&!k.rule.dateAnchor.format.includes("{yyyy}")&&e.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>o("preview"),children:"再次定位预测位置"}),e.jsx("button",{className:"primary",onClick:()=>o("confirm"),children:"位置正确，保存此项目"})]})]}),e.jsx("button",{className:"ghost",onClick:()=>o("cancel"),children:"取消示范，保留原配置"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("label",{children:["要示范哪个项目？",e.jsx(se,{value:f,options:i,placeholder:"选择项目",disabled:t,ariaLabel:"要示范的项目",onChange:$})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsx(le,{value:x,onChange:j,label:"第一个示范日期",disabled:t}),e.jsx(le,{value:S,onChange:I,label:"第二个示范日期",disabled:t})]}),e.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),e.jsx("button",{className:"secondary",disabled:t||!f||!x||!S,onClick:()=>o("start"),children:u!=null&&u[f]?"重新示范此项目":"开始示范此项目"})]})]})}const he=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击保存状态控件的位置，无需等待特定文字。"}];function pn({id:n,value:i,disabled:r,onSaved:v,onActive:u}){var o;const[l,t]=m.useState(),[c,y]=m.useState(!1),[N,f]=m.useState(""),[$,h]=m.useState(""),[x,j]=m.useState(!1),[S,I]=m.useState(""),[k,C]=m.useState([]),[z,w]=m.useState(),[T,L]=m.useState();function s(){I(""),C([])}function b(){t(structuredClone(i??{})),y(!1),h(""),j(!1),w(void 0),L(void 0),s(),u(!0)}async function p(d,E){if(!l)return;f(E??d),j(!1),h(E?he.find(D=>D.key===E).prompt:"正在操作…");const A=S;d!=="save"&&s(),(d==="open"||d==="testSheet"||E==="sheetTab")&&w(void 0),(d==="open"||d==="testSheet"||d==="captureCell"||E==="sheetTab"||E==="cellAddressBox")&&L(void 0);try{let D=await M(`tencentSite.${d}`,{id:n,controls:l,key:E,token:A},3e5);d==="pick"&&E==="sheetTab"&&(D.controls&&t(D.controls),f("testSheet"),h("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…"),D=await M("tencentSite.testSheet",{id:n,controls:D.controls??l},3e5)),h(D.message),j(D.passed===!1),d==="open"&&y(!0),D.controls&&t(D.controls),"testCell"in D&&L(D.testCell??void 0),(d==="testSheet"||E==="sheetTab")&&w(D),D.sheetRequired&&(w({passed:!1,message:D.message}),L(void 0)),d==="test"&&(I(D.token??""),C(D.steps)),d==="save"&&(await v(),t(void 0),u(!1))}catch(D){j(!0),h(D instanceof Error?D.message:String(D)),s()}finally{f("")}}return e.jsxs("fieldset",{className:"card tencent-web-controls tencent-sheet-panel","aria-busy":!!N,disabled:r,children:[e.jsx("h2",{children:"网页控件录制"}),e.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在“业务字段”中单独配置。"}),l?e.jsx(e.Fragment,{children:e.jsxs("fieldset",{className:"tencent-site-fields",disabled:r||!!N,children:[e.jsx("button",{className:c?"secondary":"primary",onClick:()=>p("open"),children:c?"重新打开配置文档":"开始配置"}),e.jsxs("div",{className:"tencent-site-recording",children:[e.jsx("div",{className:"tencent-site-controls",children:he.map(d=>e.jsxs("div",{children:[e.jsx("strong",{children:d.title}),e.jsxs("span",{className:"tencent-control-state",children:[d.key==="sheetTab"&&(z!=null&&z.passed)?"已录制 · 检验通过":l[d.key]?"已录制":"未配置",d.key==="saveStatus"&&l.saveStatus?` · ${l.saveStatus.sampleText}`:""]}),e.jsxs("button",{className:"secondary",disabled:!c||d.key!=="sheetTab"&&!(z!=null&&z.passed)||d.key==="cellEditor"&&!T,onClick:()=>p("pick",d.key),children:["录制",d.key==="sheetTab"?" Sheet 标签":d.key==="cellEditor"?"内容编辑区":d.key==="saveStatus"?"保存状态":"单元格名称框"]}),d.key==="sheetTab"&&l.sheetTab&&e.jsx("button",{className:"secondary",disabled:!c,onClick:()=>p("testSheet"),children:"重新检验 Sheet"}),d.key==="saveStatus"&&l.saveStatus&&e.jsx("button",{className:"secondary",onClick:()=>{const E={...l};delete E.saveStatus,t(E),s()},children:"移除保存状态"})]},d.key))}),e.jsxs("div",{className:"tencent-site-instructions",children:[e.jsx("strong",{children:he.some(d=>d.key===N)?"正在等待网页点选":N==="testSheet"?"正在检验 Sheet":"控件录制模式"}),e.jsx("p",{children:"先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。"}),e.jsx("p",{children:"录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。"}),z&&e.jsxs("div",{className:`notice tencent-sheet-check ${z.passed?"info":"error"}`,role:z.passed?"status":"alert",children:[e.jsx("strong",{children:z.passed?"Sheet 检验通过":"Sheet 检验未通过"}),e.jsx("ol",{className:"tencent-site-results",children:(o=z.steps)==null?void 0:o.map(d=>e.jsxs("li",{children:[e.jsx("strong",{children:d.label}),e.jsx("span",{children:d.detail}),d.names&&e.jsxs("details",{children:[e.jsx("summary",{children:"查看全部 Sheet 名称"}),e.jsx("ul",{children:d.names.map((E,A)=>e.jsx("li",{children:E},`${A}:${E}`))})]})]},d.label))}),!z.passed&&e.jsx("p",{children:z.message})]}),(z==null?void 0:z.passed)&&e.jsxs("div",{className:"tencent-sheet-guidance tencent-test-cell",role:"status",children:[e.jsx("strong",{children:T?`临时测试格：${T.sheet}!${T.address}`:"请选择一个可编辑的空白格"}),e.jsx("p",{children:T?"此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。":"在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}),e.jsx("button",{className:"secondary",disabled:!c||!l.cellAddressBox,onClick:()=>p("captureCell"),children:"读取当前测试格"})]})]})]}),!!(k!=null&&k.length)&&e.jsx("ol",{className:"tencent-site-results",children:k.map(d=>e.jsxs("li",{children:[e.jsx("strong",{children:d.label}),e.jsx("span",{children:d.detail})]},d.label))}),e.jsx("p",{className:"tencent-sheet-help",children:"录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",disabled:!c||!(z!=null&&z.passed)||!T||!l.cellAddressBox||!l.cellEditor,onClick:()=>p("test"),children:"检验单元格控件"}),e.jsx("button",{className:c?"primary":"secondary",disabled:!S,onClick:()=>p("save"),children:"保存网页控件"}),e.jsx("button",{className:"secondary",onClick:()=>{t(void 0),w(void 0),L(void 0),u(!1),s(),h("")},children:"取消"})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"checklist",children:he.map(d=>e.jsxs("div",{className:"check-item",children:[e.jsx("span",{className:`mark ${i!=null&&i[d.key]?"":"pending"}`,children:i!=null&&i[d.key]?"✓":"·"}),d.title.slice(2),e.jsx("span",{className:"tencent-control-state",children:i!=null&&i[d.key]?"已录制":d.key==="saveStatus"?"未配置":"待录制"})]},d.key))}),e.jsx("button",{className:"secondary",onClick:b,children:i?"重新录制网页控件":"录制网页控件"})]}),$&&e.jsx("div",{className:`notice ${x?"error":"info"}`,role:x?"alert":"status",children:$})]})}function un({id:n,field:i,disabled:r,continueToTeaching:v=!1,onSave:u,onCancel:l}){const[t,c]=m.useState(i.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[y,N]=m.useState([]),[f,$]=m.useState([]),[h,x]=m.useState([]),[j,S]=m.useState(!1),[I,k]=m.useState(!1),[C,z]=m.useState("");m.useEffect(()=>{let p=!0;return M("tencentSheet.sources",{id:n}).then(o=>{p&&N(o.sources)}).catch(o=>{p&&z(String(o))}),()=>{p=!1}},[n]),m.useEffect(()=>{let p=!0;if($([]),z(""),S(!1),!!t.sourceId)return S(!0),M("tencentSheet.schema",{id:n,sourceId:t.sourceId}).then(o=>{p&&$(o.fields)}).catch(o=>{p&&z(String(o))}).finally(()=>{p&&S(!1)}),()=>{p=!1}},[n,t.sourceId]),m.useEffect(()=>{let p=!0;if(x([]),k(!1),!(t.queryMode!=="view"||!t.sourceId))return k(!0),M("tencentSheet.views",{id:n,sourceId:t.sourceId},12e4).then(o=>{p&&x(o.views)}).catch(o=>{p&&z(String(o))}).finally(()=>{p&&k(!1)}),()=>{p=!1}},[n,t.sourceId,t.queryMode]);const w=p=>p.map(o=>({value:o.id,label:o.name})),T=f.filter(p=>["number","formula","rollup"].includes(p.type??"")),L=f.filter(p=>p.type==="date"),s=r||j||t.queryMode==="view"&&I,b=y.some(p=>p.id===t.sourceId)&&T.some(p=>p.id===t.valueFieldId)&&(t.queryMode==="date"?L.some(p=>p.id===t.dateFieldId):h.some(p=>p.id===t.datasetId));return e.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:r,children:[e.jsxs("legend",{children:["绑定 Notion：",i.name]}),e.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),e.jsxs("label",{children:["Notion 数据库",e.jsx(se,{value:t.sourceId,options:w(y),placeholder:"选择已有数据库",ariaLabel:"Notion 数据库",disabled:s,onChange:p=>c({...t,sourceId:p,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),e.jsxs("label",{children:["取数方式",e.jsx(se,{value:t.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:s,onChange:p=>{z(""),c({...t,queryMode:p})}})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["数值字段",e.jsx(se,{value:t.valueFieldId,options:w(T),placeholder:"选择要汇总的数值字段",disabled:s,onChange:p=>c({...t,valueFieldId:p})})]}),t.queryMode==="date"?e.jsxs("label",{children:["日期字段",e.jsx(se,{value:t.dateFieldId,options:w(L),placeholder:"选择用于筛选的日期字段",disabled:s,onChange:p=>c({...t,dateFieldId:p})})]}):e.jsxs("label",{children:["Notion View",e.jsx(se,{value:t.datasetId,options:w(h),placeholder:"选择真实 View",disabled:s,onChange:p=>c({...t,datasetId:p})})]})]}),t.queryMode==="date"?e.jsxs("label",{children:["统计范围",e.jsx(se,{value:t.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:s,onChange:p=>c({...t,period:p})})]}):e.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),(j||I)&&e.jsx("p",{role:"status",children:"正在读取数据库结构…"}),C&&e.jsx("p",{role:"alert",children:C}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"primary",disabled:s||!b,onClick:()=>{var p,o,d;return u({...t,sourceName:(p=y.find(E=>E.id===t.sourceId))==null?void 0:p.name,valueFieldName:(o=T.find(E=>E.id===t.valueFieldId))==null?void 0:o.name,datasetName:(d=h.find(E=>E.id===t.datasetId))==null?void 0:d.name})},children:v?"下一步 · 录制位置":"保存数据绑定"}),e.jsx("button",{className:"secondary",disabled:r,onClick:l,children:"稍后继续"})]})]})}const Be={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},mn=["周日","周一","周二","周三","周四","周五","周六"];function hn({rule:n,schedule:i,disabled:r,onChange:v}){const[u,l]=m.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),t=n.kind==="fixed"?"fixed":u?"offset":n.offsetDays===0?"today":"previous";return e.jsxs("fieldset",{className:"card tencent-sheet-panel",disabled:r,children:[e.jsx("h2",{children:"执行频率与业务日期"}),e.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["执行频率",e.jsxs("select",{value:i.weekdays.length===7?"daily":"weekly",disabled:r,onChange:c=>v(n,{...i,weekdays:c.target.value==="daily"?[...Be.weekdays]:[1,2,3,4,5]}),children:[e.jsx("option",{value:"daily",children:"每天"}),e.jsx("option",{value:"weekly",children:"指定星期"})]})]}),e.jsxs("label",{children:["业务日期",e.jsxs("select",{value:t,disabled:r,onChange:c=>{const y=c.target.value;l(y==="offset"),v(y==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:y==="today"?0:n.kind==="relative"&&y==="offset"?n.offsetDays:-1},i)},children:[e.jsx("option",{value:"previous",children:"执行当天的前一天"}),e.jsx("option",{value:"today",children:"执行当天"}),e.jsx("option",{value:"offset",children:"相对执行当天偏移 N 天"}),e.jsx("option",{value:"fixed",children:"指定固定日期"})]})]})]}),i.weekdays.length!==7&&e.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(c=>e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:i.weekdays.includes(c),onChange:y=>v(n,{...i,weekdays:y.target.checked?[...i.weekdays,c]:i.weekdays.filter(N=>N!==c)})}),mn[c]]},c))}),t==="offset"&&n.kind==="relative"&&e.jsxs("label",{children:["偏移天数（负数向前，正数向后）",e.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:c=>v({kind:"relative",offsetDays:c.target.value===""?NaN:Number(c.target.value)},i)})]}),n.kind==="fixed"&&e.jsx(le,{label:"固定业务日期",value:n.date,onChange:c=>v({kind:"fixed",date:c},i),disabled:r}),e.jsx("div",{className:"divider"}),e.jsx("div",{className:"tencent-sheet-grid",children:i.times.map((c,y)=>e.jsxs("div",{children:[e.jsxs("label",{children:["执行时刻 ",y+1,"（北京时间）"]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("input",{type:"time","aria-label":`执行时刻 ${y+1}（北京时间）`,value:c,onChange:N=>v(n,{...i,times:i.times.map((f,$)=>$===y?N.target.value:f)})}),e.jsxs("button",{className:"ghost",disabled:i.times.length===1,onClick:()=>v(n,{...i,times:i.times.filter((N,f)=>f!==y)}),children:["移除时刻 ",y+1]})]})]},y))}),e.jsx("button",{className:"secondary",disabled:i.times.length>=24,onClick:()=>{const c=Array.from({length:24},(y,N)=>`${String(N).padStart(2,"0")}:00`).find(y=>!i.times.includes(y));c&&v(n,{...i,times:[...i.times,c]})},children:"添加执行时刻"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}let qe=Promise.resolve();const gn={loading:["正在准备二维码","正在连接腾讯文档，请稍候。"],consent:["确认腾讯文档登录协议","继续前，请阅读腾讯文档的服务协议与隐私政策。"],waiting:["请使用企业微信扫一扫","打开手机企业微信，扫描上方二维码。"],scanned:["已扫码，请在手机上确认","确认后将检查目标文档是否可访问。"],expired:["二维码已过期","刷新后，使用企业微信重新扫码。"],failed:["暂时无法完成登录","请检查网络连接后重试。"],success:["登录完成","已连接腾讯文档，可以继续识别并检查。"]};function xn({id:n,onClose:i}){const[r,v]=m.useState({state:"loading"}),[u,l]=m.useState(!0),[t,c]=m.useState(!1),[y,N]=m.useState(""),f=m.useRef(void 0),$=m.useRef(i);$.current=i,m.useEffect(()=>{const S=crypto.randomUUID();let I=!1,k=!1,C=!1,z,w=Date.now();const T=s=>{const b=qe.then(()=>M("tencentSheet.login",{id:n,sessionToken:S,stage:s},3e5));return qe=b.catch(()=>{}),b},L=s=>{clearTimeout(z),s!=="poll"&&(w=Date.now(),v({state:"loading"})),l(!0),(async()=>{try{const b=await T(s);if(I||k)return;if(b.state==="loading"){if(w??(w=Date.now()),Date.now()-w>45e3)throw new Error("暂时无法确认登录状态或加载企业微信二维码，请刷新重试，或打开文档检查登录页面。")}else w=void 0;C=b.state==="success",v(b),["loading","waiting","scanned"].includes(b.state)&&(z=setTimeout(()=>L("poll"),1200))}catch(b){!I&&!k&&v({state:"failed",message:b instanceof Error?b.message:String(b)})}finally{I||l(!1)}})()};return f.current={run:L,close:()=>{k||(k=!0,clearTimeout(z),c(!0),T("cancel").then(()=>{I||$.current(C)}).catch(s=>{I||(k=!1,c(!1),v({state:"failed",message:`关闭登录会话失败：${s instanceof Error?s.message:String(s)}`}))}))}},L("start"),()=>{I=!0,clearTimeout(z),k||T("cancel").catch(()=>{})}},[n]);async function h(S){N("");try{await M("tencentSheet.loginAgreement",{kind:S})}catch(I){N(I instanceof Error?I.message:String(I))}}const[x,j]=gn[r.state];return e.jsx(ye,{open:!0,onOpenChange:S=>{var I;S||(I=f.current)==null||I.close()},children:e.jsxs(ve,{children:[e.jsx(we,{className:"dialog-overlay"}),e.jsxs(ke,{className:"tencent-login-dialog",onPointerDownOutside:S=>S.preventDefault(),children:[e.jsxs("div",{className:"tencent-login-header",children:[e.jsx(je,{children:"登录腾讯文档"}),e.jsx("button",{className:"secondary","aria-label":"关闭登录弹窗",disabled:t,onClick:()=>{var S;return(S=f.current)==null?void 0:S.close()},children:e.jsx(Qe,{size:20})})]}),e.jsx("div",{className:"tencent-login-method",children:"企业微信扫码"}),e.jsx("div",{className:"tencent-login-qr",children:r.state==="waiting"&&r.qr?e.jsx("img",{src:r.qr,alt:"企业微信登录二维码"}):r.state==="success"?e.jsx(Ze,{size:48}):r.state==="loading"?e.jsx(ce,{className:"spin",size:36}):e.jsx("span",{children:r.state==="scanned"?"等待确认":r.state==="consent"?"登录协议":r.state==="expired"?"已过期":"请重试"})}),e.jsxs("div",{className:"tencent-login-status","aria-live":"polite",children:[e.jsx("h3",{children:x}),e.jsx(Ne,{children:r.message||j})]}),r.state==="consent"&&e.jsxs("p",{className:"tencent-login-terms",children:[e.jsx("a",{href:"https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe",onClick:S=>{S.preventDefault(),h("service")},children:"服务协议"}),e.jsx("span",{children:"与"}),e.jsx("a",{href:"https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940",onClick:S=>{S.preventDefault(),h("privacy")},children:"隐私政策"})]}),y&&e.jsx("p",{role:"alert",className:"tencent-sheet-help",children:y}),e.jsx("button",{className:"primary tencent-login-submit",disabled:u||t,onClick:()=>{var S,I;return r.state==="success"?(S=f.current)==null?void 0:S.close():(I=f.current)==null?void 0:I.run(r.state==="consent"?"consent":"refresh")},children:t?"正在关闭…":r.state==="success"?"完成":r.state==="consent"?"同意协议并继续":r.state==="failed"?"重新加载":"刷新二维码"}),e.jsx("p",{className:"tencent-sheet-help tencent-login-footnote",children:"关闭弹窗可取消本次登录。已有登录状态会保留。"})]})]})})}const Se=n=>n instanceof Error?n.message:String(n);function fn({onCreated:n,onCancel:i}){const[r,v]=m.useState(""),[u,l]=m.useState(!1),[t,c]=m.useState("");async function y(){l(!0),c("");try{await n(await M("tencentSheet.create",{documentUrl:r}))}catch(N){c(Se(N))}finally{l(!1)}}return e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"新建文档填报任务"}),e.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),e.jsxs("label",{children:["文档分享链接",e.jsx("input",{type:"url",disabled:u,value:r,onChange:N=>v(N.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),t&&e.jsx("p",{role:"alert",children:t}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",disabled:u,onClick:i,children:"取消"}),e.jsxs("button",{className:"primary",disabled:u||!r.trim(),onClick:y,children:[u&&e.jsx(ce,{className:"spin"}),"创建并配置"]})]})]})}function Ve({id:n,changed:i,back:r,name:v}){var $e,De;const u=[{id:"doc",label:"文档与账号"},{id:"control",label:"网页控件"},{id:"fields",label:"业务字段"},{id:"rule",label:"执行规则"},{id:"test",label:"测试与上线"}],[l,t]=m.useState("doc"),[c,y]=m.useState("front"),[N,f]=m.useState(!1),[$,h]=m.useState(),[x,j]=m.useState(),[S,I]=m.useState(""),[k,C]=m.useState(""),[z,w]=m.useState(!1),[T,L]=m.useState(!1),[s,b]=m.useState(""),[p,o]=m.useState(),[d,E]=m.useState(!1),[A,D]=m.useState(!1),[V,Y]=m.useState(!1),[Q,X]=m.useState(!1),[g,q]=m.useState(!1),[R,P]=m.useState([]),[H,ee]=m.useState(""),[ne,Z]=m.useState(""),[te,_]=m.useState(""),[ie,me]=m.useState(""),Ce=m.useRef(null),[U,Ee]=m.useState();m.useEffect(()=>{if(!k||z)return;const a=window.setTimeout(()=>C(""),2400);return()=>window.clearTimeout(a)},[k,z]);const pe=()=>M("tencentSheet.get",{id:n}).then(j);m.useEffect(()=>{let a=!0;return X(!1),Y(!1),M("tencentSheet.get",{id:n}).then(F=>{a&&j(F)}).catch(F=>{a&&(w(!0),C(Se(F)))}),()=>{a=!1}},[n]),m.useEffect(()=>{var a,F;(te||ie)&&((F=(a=Ce.current)==null?void 0:a.scrollIntoView)==null||F.call(a,{block:"start"}))},[te,ie]);async function W(a,F){I(a),C(""),w(!1);try{await F()}catch(G){w(!0),C(Se(G))}finally{I("")}}function O(){Ee(void 0),o(void 0)}function xe(a){j(F=>F&&{...F,config:a}),X(!1),E(!0),O()}async function Xe(a,F){var G;O(),j(await M("tencentSheet.updateField",{id:n,fieldId:a.id,name:a.name,unit:a.unit,...F?{notion:F}:{}})),me(""),(G=x==null?void 0:x.config.rules)!=null&&G[a.id]||(_(oe?a.id:""),C(oe?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),i()}async function fe(){if(!x)return;const a=await M("tencentSheet.save",{id:n,config:x.config,configRevision:x.configRevision??0});j(a),E(!1),O(),i()}async function Te(a){d&&await fe(),O();const F=await M(`tencentSheet.${a}`,{id:n},3e5);C(F.message),F.sheets&&P([...new Set(F.sheets)]),await pe()}if(!x)return e.jsx("div",{className:"notice",role:"status",children:k||"正在读取填报配置…"});const B=x.config,oe=!!(($e=B.webControls)!=null&&$e.sheetTab&&B.webControls.cellAddressBox&&B.webControls.cellEditor),J=B.fields??[],de=J.find(a=>a.id===te),re=J.find(a=>a.id===ie),K=!!S||A||!!re||g||V;return e.jsx("div",{className:"tencent-demo","aria-busy":!!S,children:e.jsxs("div",{className:"page tencent-sheet-workbench",children:[r&&e.jsx("button",{className:"crumb",onClick:r,disabled:K,children:"← 返回任务列表"}),e.jsxs("div",{className:"titlebar",children:[e.jsxs("div",{children:[e.jsx("h1",{children:v||"腾讯文档填报"}),e.jsxs("div",{className:"subtitle",children:["腾讯文档填报 · 业务日期 ",x.businessDate??"获取数据时确定"]})]}),e.jsxs("div",{className:"tencent-badges",children:[e.jsxs("span",{className:`badge ${x.enabled?"success":"warning"}`,children:["● 定时",x.enabled?"已启用":"未启用"]}),e.jsx("span",{className:"badge neutral",children:x.validated&&!d?"已验证":"待验证"})]})]}),x.enabled&&e.jsxs("div",{className:"banner",children:[e.jsxs("p",{children:["定时填报当前处于",e.jsx("strong",{children:"已启用"}),"状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。"]}),e.jsx("button",{className:"btn btn-secondary",disabled:K,onClick:()=>W("停用定时填报",async()=>{await M("automation.setEnabled",{taskType:"tencent_sheet_fill",id:n,enabled:!1},6e4),await pe(),i(),C("已停用定时填报，现在可以修改配置。")}),children:"立即停用"})]}),e.jsx("div",{className:"status-strip",children:[{ok:Q,text:Q?"文档已连接":"文档连接待检查"},{ok:oe,text:oe?"网页控件已录制":"网页控件待录制"},{ok:J.length>0&&J.every(a=>{var F;return a.notion&&((F=B.rules)==null?void 0:F[a.id])}),text:`业务字段 ${J.filter(a=>{var F;return a.notion&&((F=B.rules)==null?void 0:F[a.id])}).length}/${J.length} 已绑定`},{ok:!!x.enabled,text:x.enabled?"定时已启用":"定时未启用"}].map(a=>e.jsxs("span",{className:`status-chip ${a.ok?"ok":"pending"}`,children:[e.jsx("span",{className:"dot"}),a.text]},a.text))}),e.jsx("div",{className:"tabs",role:"tablist","aria-label":"腾讯文档配置",children:u.map((a,F)=>e.jsx("button",{id:`tencent-tab-${a.id}`,role:"tab","aria-selected":l===a.id,"aria-controls":`tencent-panel-${a.id}`,tabIndex:l===a.id?0:-1,disabled:K,className:`tab ${l===a.id?"active":""}`,onClick:()=>t(a.id),onKeyDown:G=>{var Ie;if(!["ArrowLeft","ArrowRight","Home","End"].includes(G.key))return;G.preventDefault();const Ae=G.key==="Home"?0:G.key==="End"?u.length-1:(F+(G.key==="ArrowRight"?1:-1)+u.length)%u.length;t(u[Ae].id),(Ie=document.getElementById(`tencent-tab-${u[Ae].id}`))==null||Ie.focus()},children:a.label},a.id))}),e.jsxs("div",{className:"panel active",role:"tabpanel",id:`tencent-panel-${l}`,"aria-labelledby":`tencent-tab-${l}`,children:[l==="doc"&&e.jsx(e.Fragment,{children:e.jsxs("fieldset",{disabled:K,className:"card tencent-sheet-panel",children:[e.jsx("h2",{children:"目标文档"}),e.jsx("p",{className:"hint",children:"填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。"}),e.jsxs("label",{children:["文档链接",e.jsx("input",{type:"url",disabled:x.enabled,value:B.documentUrl,onChange:a=>xe({...B,documentUrl:a.target.value})})]}),e.jsx("div",{className:"divider"}),e.jsx("h2",{children:"填报账号"}),e.jsx("p",{className:"hint",children:"使用企业微信扫码登录，已有登录状态会自动复用。"}),e.jsxs("div",{className:"btn-row",children:[e.jsx("button",{className:"primary",onClick:()=>W("准备扫码登录",async()=>{d&&await fe(),O(),X(!1),Y(!0)}),children:Q?"检查登录":"扫码登录"}),e.jsx("button",{className:"secondary",onClick:()=>W("打开文档",()=>Te("open")),children:"打开文档"}),e.jsx("button",{className:"ghost",onClick:()=>W("结束前台会话",async()=>{O();const a=await M("tencentSheet.close",{id:n});C(a.message)}),children:"结束前台会话"})]}),e.jsxs("details",{className:"tencent-document-check",children:[e.jsx("summary",{children:"工作表识别与检查"}),e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"secondary",disabled:x.enabled,onClick:()=>W("识别页面",()=>Te("recognize")),children:"识别并检查"})}),e.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!R.length&&e.jsxs("label",{children:["工作表名称",e.jsx(se,{value:B.sheetReferenceName??B.capturedSheet??B.sheetName??"",options:R.map(a=>({value:a,label:a})),placeholder:"选择识别到的工作表名称",disabled:K||!!x.enabled,onChange:a=>xe({...B,sheetReferenceName:a})})]}),(B.sheetReferenceName||B.capturedSheet||B.sheetMode==="fixed")&&e.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",B.sheetReferenceName??B.capturedSheet??B.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]})]})}),l==="control"&&e.jsx(pn,{id:n,value:B.webControls,disabled:!!S||A||!!re||d||!!x.enabled,onActive:a=>{q(a),a&&O()},onSaved:async()=>{await pe(),O(),i()}},n),l==="fields"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:K||d||x.enabled,className:"card tencent-sheet-panel",children:[e.jsxs("div",{className:"add-field-toggle",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"已绑定的业务字段"}),e.jsx("p",{className:"hint",children:"取数、月份和填写位置共用本次业务日期。"})]}),e.jsx("button",{className:"secondary",onClick:()=>f(!N),children:"+ 添加业务字段"})]}),N&&e.jsxs("div",{className:"add-field-form open",children:[e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["业务字段名称",e.jsx("input",{value:H,placeholder:"例如：合格数量",onChange:a=>ee(a.target.value)})]}),e.jsxs("label",{children:["单位（可选）",e.jsx("input",{value:ne,placeholder:"例如：件",onChange:a=>Z(a.target.value)})]})]}),e.jsx("button",{className:"primary",disabled:!H.trim(),onClick:()=>W("新增业务字段",async()=>{var F,G;O();const a=await M("tencentSheet.addField",{id:n,name:H,unit:ne});j(a),_(""),me(((G=(F=a.config.fields)==null?void 0:F.at(-1))==null?void 0:G.id)??""),ee(""),Z(""),f(!1),i()}),children:"下一步 · 选择数据库"}),e.jsx("button",{className:"ghost",onClick:()=>f(!1),children:"取消"})]}),!J.length&&e.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),e.jsx("div",{className:"field-list",children:J.map(a=>{var F;return e.jsxs("div",{className:"field-row",children:[e.jsxs("span",{children:[e.jsxs("strong",{children:[a.name,a.unit?`（${a.unit}）`:""]}),e.jsxs("small",{className:"tencent-control-state",children:[(F=B.rules)!=null&&F[a.id]?"位置已示范":"待示范位置"," · ",a.notion?`${a.notion.sourceName??"Notion"} / ${a.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"ghost",disabled:!oe||!a.notion,onClick:()=>{_(a.id),O()},"aria-label":`示范位置：${a.name}`,children:"示范位置"}),e.jsx("button",{className:"ghost",onClick:()=>{me(a.id),_(""),O()},"aria-label":`绑定数据：${a.name}`,children:"绑定数据"}),e.jsx("button",{className:"btn-danger-ghost",onClick:()=>W("删除业务字段",async()=>{O(),j(await M("tencentSheet.deleteField",{id:n,fieldId:a.id})),te===a.id&&_(""),i()}),"aria-label":`删除：${a.name}`,children:"删除"})]})]},a.id)})})]}),(de||re)&&e.jsxs("div",{ref:Ce,children:[de&&!re&&e.jsx(cn,{id:n,businessDate:T&&s?s:x.businessDate,metrics:[{value:de.id,label:de.name}],initialMetric:de.id,rules:B.rules,fixedSheet:B.sheetMode==="fixed",disabled:!!S||d||g,run:W,onActive:a=>{D(a),a&&O()},onSaved:async()=>{await pe(),O(),_(""),C("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),i()}},`${n}:${de.id}:${JSON.stringify(B.rules)}`),re&&e.jsx(un,{id:n,field:re,continueToTeaching:oe&&!((De=B.rules)!=null&&De[re.id]),disabled:!!S,onCancel:()=>me(""),onSave:a=>W("保存数据绑定",()=>Xe(re,a))},re.id)]})]}),l==="rule"&&e.jsx(e.Fragment,{children:e.jsx(hn,{rule:B.businessDateRule??{kind:"relative",offsetDays:-1},schedule:B.executionSchedule??Be,disabled:K||!!x.enabled,onChange:(a,F)=>xe({...B,businessDateRule:a,executionSchedule:F})})}),d&&(l==="doc"||l==="rule")&&e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"primary",disabled:K,onClick:()=>W("保存任务配置",async()=>{await fe(),C("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"})}),l==="test"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("h2",{children:"运行测试"}),e.jsx("div",{className:"segmented",role:"group","aria-label":"测试模式",children:[{id:"front",label:"前台测试"},{id:"back",label:"后台自动测试"}].map(a=>e.jsx("button",{"aria-pressed":c===a.id,disabled:K,className:c===a.id?"active":"",onClick:()=>y(a.id),children:a.label},a.id))}),c==="front"&&e.jsxs("fieldset",{disabled:K||d,className:"test-mode active tencent-test-fields",children:[e.jsx("p",{className:"test-desc",children:"浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。"}),e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:T,onChange:a=>{L(a.target.checked),O()}}),"指定补填日期"]}),T?e.jsx(le,{label:"本次业务日期",disabled:!!S,value:s,onChange:a=>{b(a),O()}}):e.jsxs("p",{children:["按已保存规则计算的业务日期：",(U==null?void 0:U.date)??x.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),e.jsx("button",{className:"secondary",disabled:!J.length||T&&!s||J.some(a=>{var F;return!((F=B.rules)!=null&&F[a.id])||!a.notion}),onClick:()=>W("获取 Notion 数据",async()=>{O(),Ee(await M("tencentSheet.fetch",{id:n,businessDate:T?s:void 0},3e5)),C("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Notion 数据"}),U&&e.jsxs("div",{className:"tencent-sheet-table",children:[e.jsxs("p",{children:["业务日期：",U.date]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"业务字段"}),e.jsx("th",{children:"数值"}),e.jsx("th",{children:"来源与范围"}),e.jsx("th",{children:"记录数"})]})}),e.jsx("tbody",{children:U.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.name}),e.jsxs("td",{children:[a.value," ",a.unit]}),e.jsxs("td",{children:[a.source," · ",a.period]}),e.jsx("td",{children:a.recordCount})]},a.id))})]})]}),e.jsx("button",{className:"primary",disabled:!J.length||T&&!s||!U,onClick:()=>W("检查填报位置",async()=>{o(void 0);const a=await M("tencentSheet.inspect",{id:n,dataToken:U==null?void 0:U.dataToken,businessDate:(U==null?void 0:U.date)??(T?s:void 0)},3e5);o(a),C(a.message),i()}),children:"检查本次数据与位置"})]}),c==="back"&&e.jsxs("fieldset",{disabled:K||d,className:"test-mode active tencent-test-fields",children:[e.jsxs("p",{className:"hint",children:["本次业务日期：",T?s||"请在前台测试选择补填日期":x.businessDate??"执行时确定",T?"（指定补填日期）":"（按已保存规则）"]}),e.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),e.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),e.jsx("button",{className:"primary",disabled:!J.length||J.some(a=>{var F;return!a.notion||!((F=B.rules)!=null&&F[a.id])})||T&&!s,onClick:()=>W("后台取数、填报并确认保存",async()=>{O();try{const a=await M("tencentSheet.backgroundTest",{id:n,businessDate:T?s:void 0},6e5);C(a.message)}finally{await pe(),i()}}),children:"后台自动测试并填写"}),x.enabled&&e.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]})]}),c==="front"&&p&&e.jsxs("section",{className:"card tencent-sheet-panel",children:[e.jsx("h3",{children:"确认填报"}),e.jsxs("p",{children:["业务日期：",p.date," · ",p.sheet]}),e.jsx("div",{className:"tencent-sheet-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"项目"}),e.jsx("th",{children:"位置"}),e.jsx("th",{children:"原内容"}),e.jsx("th",{children:"本次填报"})]})}),e.jsx("tbody",{children:p.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.address}),e.jsx("td",{children:a.current||"空白"}),e.jsx("td",{children:a.value})]},a.address))})]})}),e.jsx("p",{children:p.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),e.jsxs("button",{className:"primary",disabled:K||!p.token||p.conflict,onClick:()=>W("填报并确认保存",async()=>{const a=p;o(void 0);const F=await M("tencentSheet.write",{id:n,dataToken:U==null?void 0:U.dataToken,businessDate:a.date,token:a.token},31e4);C(F.message),i()}),children:["确认填报以上 ",p.rows.length," 项"]})]}),e.jsxs("details",{className:"tencent-run-history",children:[e.jsx("summary",{onClick:()=>{$||W("读取运行记录",async()=>{const a=await M("tencentSheet.runs",{id:n});h(a.runs)})},children:"运行记录"}),$==null?void 0:$.map(a=>e.jsxs("div",{children:[e.jsxs("p",{children:[a.time," · ",a.businessDate," · ",a.status]}),e.jsx("p",{children:a.error||a.message})]},a.id)),($==null?void 0:$.length)===0&&e.jsx("p",{children:"暂无运行记录"})]})]})]},l),V&&e.jsx(xn,{id:n,onClose:a=>{X(a),Y(!1),C(a?"已登录腾讯文档，可以继续识别并检查。":"已关闭扫码登录，原有登录状态已保留。")}},`login:${n}`),e.jsxs("div",{className:`toast ${k?"show":""} ${z?"error":""}`,role:z?"alert":"status",children:[k,k&&e.jsx("button",{className:"ghost","aria-label":"关闭提示",onClick:()=>C(""),children:"×"})]}),S&&e.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[e.jsx(ce,{className:"spin"}),S,"… 请等待操作结束"]})]})})}const Oe=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
.production-message-demo .sidebar-item-active\r
.home-roof {\r
  animation:\r
    home-roof-enter\r
    320ms\r
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
.home-door {\r
  animation:\r
    fade-rise\r
    280ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
home-roof-enter {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  65% {\r
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
.production-message-demo .field-row-conflict {\r
  border-bottom:\r
    none;\r
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
.production-message-demo .pill-ok {\r
  color:\r
    var(--status-ok-text);\r
\r
  background:\r
    var(--status-ok-bg);\r
}\r
\r
\r
.production-message-demo .pill-info {\r
  color:\r
    var(--status-info-text);\r
\r
  background:\r
    var(--status-info-bg);\r
}\r
\r
\r
.production-message-demo .pill-warn {\r
  color:\r
    var(--status-warn-text);\r
\r
  background:\r
    var(--status-warn-bg);\r
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
`,Ue=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,bn=`<!doctype html>\r
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
`,We=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Ye=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,ge=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(i=>({key:i.key,label:i.label,spec:{granularity:i.granularity,yearOffset:n}}))),He={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function yn(n){return He[n]||n}function Me(n){const i=[[]];function r(u){u.replace(/\u00a0/g," ").split(`
`).forEach((l,t)=>{var y;if(t&&i.push([]),!l)return;const c=i.at(-1);((y=c.at(-1))==null?void 0:y.type)==="text"?c.at(-1).text+=l:c.push({type:"text",text:l})})}function v(u){var l;if(u.nodeType===3){r(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const t=yn(u.dataset.key);i.at(-1).push({type:t.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:t,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){r(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((l=u.firstChild)==null?void 0:l.nodeName)==="BR"||Array.from(u.childNodes).forEach((t,c)=>{c&&t.nodeType===1&&["DIV","P"].includes(t.tagName)&&r(`
`),v(t)})}}return v(n),{text:i.map(u=>u.map(l=>l.type==="text"?l.text:l.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:i.map(u=>({type:"paragraph",content:u}))})}}function vn(n,i,r,v){const u=[...r,...Object.entries(He).map(([t,c])=>({key:c,label:t==="system.date"?"业务日期":t==="system.year"?"业务年份":t==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(t=>t.field||t.metric==="date").sort((t,c)=>c.key.length-t.key.length);let l=i;for(;l;){const t=u.map(c=>({d:c,index:l.indexOf(c.key)})).filter(c=>c.index>=0).sort((c,y)=>c.index-y.index)[0];if(!t){n.append(n.ownerDocument.createTextNode(l));break}t.index&&n.append(n.ownerDocument.createTextNode(l.slice(0,t.index))),n.append(v(t.d)),l=l.slice(t.index+t.d.key.length)}}function wn(n,i,r,v){if(!i)return!1;let u;try{u=JSON.parse(i)}catch{return!1}if(u.type!=="doc")return!1;function l(t){var c,y,N,f;if(t.type==="text"){n.append(n.ownerDocument.createTextNode(t.text||""));return}if(t.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(t.type==="fieldToken"||t.type==="dateToken"){const $=((c=t.attrs)==null?void 0:c.placeholder)||"";let h=r.find(j=>j.key===$);h||(h={key:$,label:t.type==="dateToken"?"业务日期":((y=t.attrs)==null?void 0:y.label)||"已有数据",metric:t.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((N=t.attrs)==null?void 0:N.label)||""},r.push(h));const x=v(h);(f=t.attrs)!=null&&f.dateRangeSpec&&(x.dataset.legacySpec=JSON.stringify(t.attrs.dateRangeSpec)),n.append(x);return}(t.content||[]).forEach(($,h)=>{t.type==="doc"&&h&&n.append(n.ownerDocument.createTextNode(`
`)),l($)})}return l(u),!0}function _e({id:n,back:i,changed:r,openSettings:v}){const u=m.useRef(null),[l,t]=m.useState("");return m.useEffect(()=>{let c=!1;const y=u.current;return M("daily.get",{id:n}).then(N=>{if(c)return;const f=kn(N,{back:i,changed:r,openSettings:v});y.dailyRuntime=f,y.srcdoc=bn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(We,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ye,window.location.href).href)}).catch(N=>{c||t(String(N.message||N))}),()=>{var N;c=!0,(N=y.dailyRuntime)==null||N.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[l&&e.jsx("p",{role:"alert",children:l}),e.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function kn(n,i){var L;let r=!1,v=!1,u,l,t=Promise.resolve(),c=0,y;const N=new Date,f=n.fields.map(s=>{var b,p,o;return{key:s.placeholder,label:s.label.replace(" · ",""),metric:`${s.databaseId||((b=s.binding)==null?void 0:b.dataSourceId)}:${s.businessId||((p=s.binding)==null?void 0:p.businessMetricId)}`,scope:((o=ge.find(d=>JSON.stringify(d.spec)===JSON.stringify(s.dateRangeSpec)))==null?void 0:o.key)||"legacy",keywords:s.label,field:s}}),$=[];let h=(L=n.metricSourceIds)!=null&&L.length?n.metricSourceIds:[...new Set(n.fields.map(s=>{var b;return s.databaseId||((b=s.binding)==null?void 0:b.dataSourceId)}).filter(Boolean))];const x=new Map(n.fields.map(s=>[s.placeholder,s])),j=new Map;function S(s){const b=l==null?void 0:l.querySelector("#preview-status");b&&(b.textContent=s)}function I(){l==null||l.querySelectorAll("[data-send]").forEach(s=>s.disabled=v||!n.notificationConfigured)}async function k(s){s.text===n.draftTemplate&&s.document===n.draftTemplateDocument||(await M("daily.saveTemplate",{id:w,...s}),n.draftTemplate=s.text,n.draftTemplateDocument=s.document)}async function C(){var s;try{const b=await M("daily.get",{id:w});if(r)return;n.notificationConfigured=b.notificationConfigured,n.sources=b.sources,I(),(s=l==null?void 0:l.querySelector("[data-notification-notice]"))==null||s.toggleAttribute("hidden",!!n.notificationConfigured),await z()}catch(b){S(String(b))}}async function z(){var b;const s=await Promise.allSettled(h.map(async p=>({sourceId:p,metrics:(await en(w,p)).metrics})));if(!r){f.splice(0,f.length,...f.filter(p=>p.field)),$.length=0;for(const p of s)if(p.status==="fulfilled")for(const o of p.value.metrics){const d=`${p.value.sourceId}:${o.id}`;$.push([d,o.name,o.name,0]);const E=o.granularity==="monthly"?[{key:"month",label:"本月"}]:ge;for(const A of E)f.push({key:`${d}:${A.key}`,metric:d,scope:A.key,label:o.granularity==="monthly"?o.name:A.label+o.name,keywords:o.name+" "+A.label+" "+(((b=n.sources.find(D=>D.id===p.value.sourceId))==null?void 0:b.name)||""),sourceId:p.value.sourceId,metricId:o.id});for(const A of f.filter(D=>D.metric===d&&D.field))A.sourceId=p.value.sourceId,A.metricId=o.id}s.some(p=>p.status==="rejected")?S("部分指标目录读取失败，请到系统设置刷新数据库。"):h.length||S("请在右上角任务设置中配置本任务的指标范围。")}}const w=n.id,T={dirty(){c++,y=void 0},id:w,name:n.name,sendTime:n.sendTime,businessDate:`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}-${String(N.getDate()).padStart(2,"0")}`,definitions:f,metrics:$,value:s=>{var b,p,o;return s.metric==="date"?"业务日期":((b=y==null?void 0:y.fieldValues)==null?void 0:b[s.key])||((o=y==null?void 0:y.fieldValues)==null?void 0:o[((p=f.find(d=>d.field&&d.metric===s.metric&&d.scope===s.scope))==null?void 0:p.key)||""])||""},mount:(s,b)=>{wn(s,n.draftTemplateDocument,f,b)||vn(s,n.draftTemplate,f,b)},async materialize(s){var A;if(s.field||s.metric==="date")return s;const b=f.find(D=>D.metric===s.metric&&D.sourceId),p=s.sourceId||(b==null?void 0:b.sourceId),o=s.metricId||(b==null?void 0:b.metricId);if(!p||!o)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const d=JSON.stringify([p,o,s.scope,s.label]);let E=j.get(d);return E||(E=M("daily.addField",{id:w,sourceId:p,metricId:o,placeholder:"",displayName:s.label,...s.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(A=ge.find(D=>D.key===s.scope))==null?void 0:A.spec}}).then(({field:D})=>{x.set(D.placeholder,D);const V={...s,key:D.placeholder,field:D,sourceId:p,metricId:o};return f.some(Y=>Y.key===V.key)||f.push(V),i.changed(),V}).catch(D=>{throw j.delete(d),D}),j.set(d,E)),E},save(s){const b=Me(s),p=t.catch(()=>{}).then(()=>r?void 0:k(b));return t=p,p},preview(s,b){const p=Me(s),o=++c,d=t.catch(()=>{}).then(async()=>{if(r||o!==c)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await k(p);const E=await M("daily.preview",{id:w,businessDate:b},12e4),A={...E,errors:E.fieldErrors||[],message:E.succeeded?"已生成 · "+b:E.message};return o===c&&!r&&(y=A),A});return t=d,d},async send(s,b,p){if(!v){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");v=!0,I();try{await T.save(s);const o=await M(b==="test"?"daily.test":"daily.sendToday",b==="test"?{id:w,businessDate:p}:{id:w},12e4);if(!o.succeeded)throw new Error(o.message||"发送失败，请查看运行记录");S(o.alreadySent?"今日当前内容已发送":b==="test"?"测试发送成功":"今日消息已发送"),i.changed()}finally{v=!1,I()}}},configureAdvanced(s,b){const p=f.some(E=>E.metric===s&&E.scope==="month"),o=p?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];b.replaceChildren(...o.map(E=>new Option(E.label,E.key)));const d=b.ownerDocument.querySelector("#scope-year");d&&(d.disabled=p,d.value="0")},resolveAdvanced(s,b){return s==="month"?"month":ge.find(p=>p.spec.granularity===s&&p.spec.yearOffset===Number(b)).key},async saveBasics(s,b){const p=Array.from((l==null?void 0:l.querySelectorAll("[data-context-source]:checked"))||[]).map(o=>o.value);await M("daily.saveBasics",{id:w,name:s,sendTime:b,metricSourceIds:p}),n.name=s,n.sendTime=b,h=p,T.name=s,await z(),i.changed()},connect(s){var X;l=s,s.title=n.name,s.querySelector("#runs p").textContent="";const b=s.querySelector("header > span");b.removeAttribute("aria-hidden"),b.setAttribute("role","button"),b.setAttribute("tabindex","0"),b.setAttribute("aria-label","返回任务列表");const p=async()=>{const g=s.querySelector("#editor");g.contentEditable="false",c++;try{await T.save(g),i.back()}catch(q){S(String(q)),g.contentEditable="true"}};b.addEventListener("click",p),b.addEventListener("keydown",g=>{g.key==="Enter"&&p()});const o=s.querySelector("#settings"),d=s.createElement("fieldset");d.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const E=s.createElement("legend");E.textContent="本任务的指标范围",d.append(E);for(const g of n.sources){const q=s.createElement("label");q.style.cssText="display:flex;gap:8px;margin:8px 0";const R=s.createElement("input");R.type="checkbox",R.value=g.id,R.dataset.contextSource="",R.checked=h.includes(g.id),R.style.width="auto",q.append(R,s.createTextNode(g.name)),d.append(q)}(X=o.querySelector("p"))==null||X.replaceWith(d);const A=s.createElement("button");A.textContent="数据库设置",A.type="button",A.onclick=()=>{var g;o.close(),(g=i.openSettings)==null||g.call(i)},d.after(A);const D=s.querySelector("footer");for(const[g,q]of[["test","测试发送"],["today","发送今日消息"]]){const R=s.createElement("button");R.textContent=q,R.dataset.send=g,R.onclick=async()=>{const P=s.querySelector("#editor");P.contentEditable="false";try{await T.send(P,g,s.querySelector("#date").value)}catch(H){S(String(H))}finally{P.contentEditable="true"}},D.append(R)}const V=s.createElement("style");V.textContent=Oe+`
`+Ue+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,s.head.append(V);const Y=s.createElement("span");Y.className="production-message-demo",Y.hidden=!0,s.body.append(Y),u=Pe.createRoot(s.querySelector("#date-picker")),u.render(e.jsx(jn,{input:s.querySelector("#date")})),window.addEventListener("production-settings-updated",C);const Q=s.querySelector("#runs");if(Q.ontoggle=async()=>{if(!Q.open)return;const g=Q.querySelector("p");g.textContent="正在读取…";try{const q=await M("daily.runs",{id:w});g.textContent=q.runs.length?"":"暂无运行记录";for(const R of q.runs){const P=s.createElement("div");P.textContent=`${R.time} · ${R.status} · ${R.businessDate}${R.error?" · "+R.error:""}`,g.append(P)}}catch(q){g.textContent=String(q)}},!n.notificationConfigured){const g=s.createElement("div");g.className="notice",g.dataset.notificationNotice="",g.append(s.createTextNode("通知渠道尚未配置。 "));const q=s.createElement("button");q.textContent="通知设置",q.onclick=i.openSettings||null,g.append(q),s.querySelector("#message").before(g)}I(),z().catch(g=>S(String(g)))},dispose(){r=!0,c++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",C)}};return T}function jn({input:n}){const[i,r]=m.useState(n.value);return e.jsx(le,{value:i,onChange:v=>{var u;r(v),n.value=v,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const Nn=`<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>原材料自动入库</title>
<style>
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf');font-weight:100 900}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf');font-weight:100 900}
:root{font-family:"Inter Variable","Noto Sans SC Variable",sans-serif;color:#292524;background:#fafaf9;font-size:15px;--line:#e7e5e4;--muted:#78716c;--accent:#c2703d}*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0}button,input,select{font:inherit;color:inherit}button,input,select,.work,dialog{corner-shape:squircle}button{height:44px;border:1px solid #e7e5e4;border-radius:14px;padding:0 16px;background:white;cursor:pointer;white-space:nowrap;font-weight:400}button:hover{background:#f5f5f4}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid #78716c;outline-offset:3px}.primary{background:var(--accent);border-color:var(--accent);color:white}.primary:hover{background:#a85c2e}.quiet{border:0;background:transparent}.icon{width:44px;padding:0;display:grid;place-items:center}svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}h1,h2,h3,p{margin:0}h1{font-size:26px;font-weight:600;letter-spacing:-.02em}h2{font-size:16px;font-weight:500}h3{font-size:15px;font-weight:500}small,.muted{font-size:14px;color:var(--muted)}p{line-height:1.7}main{max-width:1420px;margin:auto;padding:30px 36px}.top{display:flex;align-items:center;gap:14px;padding-bottom:24px;background:#fafaf9;position:sticky;top:0;z-index:2}.title{flex:1;min-width:0}.title h1{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.title small{display:block;margin-top:7px}.pill{font-size:14px;border-radius:999px;background:#f5f5f4;padding:5px 10px;white-space:nowrap}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #e7e5e4;border-radius:20px;background:white;overflow:hidden;min-height:440px}.pane{padding:24px;min-width:0}.pane+.pane{border-left:1px solid var(--line)}.pane-head{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:24px;min-height:44px}.datebar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}input,select{height:44px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:14px;padding:0 12px;min-width:0}input[type=date]{width:163px}.plain{padding:0 4px;height:32px;background:none;border:0;color:var(--muted)}.sheet{border-top:1px solid var(--line)}.line{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--line)}.line .number{font-size:24px;font-weight:500;font-variant-numeric:tabular-nums}.line small{margin-left:6px}.line.total{border-bottom:0}.line.total .number{font-size:18px}.annotation{margin-top:24px;display:flex;align-items:flex-start;gap:9px;color:var(--muted);font-size:14px;line-height:1.7}.annotation svg{flex-shrink:0;margin-top:2px}.empty{min-height:230px;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:12px;color:var(--muted);text-align:center;line-height:1.8}.empty svg{width:32px;height:32px;stroke:#a8a29e}.empty strong{color:#57534e;font-weight:500}.record{margin-top:22px}.record .line{font-size:15px;padding:13px 0}.record .line span:first-child{color:var(--muted)}.record .line span:last-child{text-align:right}.callout{background:#f5f5f4;border-radius:14px;corner-shape:squircle;padding:13px 15px;margin-top:20px;font-size:14px;line-height:1.7}.callout.error{background:#fef2f2;color:#b91c1c}.callout.warn{background:rgb(249, 220, 164);color:#57534e}.action-row{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:16px}.action-row p{font-size:14px;color:var(--muted);flex:1}.action-row button{flex-shrink:0}details.runs{margin-top:24px;border-top:1px solid var(--line)}summary{cursor:pointer;padding:18px 0;font-size:15px}summary::marker{color:var(--muted)}.runs-body{padding-bottom:15px}.run{border-top:1px solid var(--line);padding:14px 0;display:grid;grid-template-columns:85px 1fr auto;gap:16px;font-size:14px}.run p{color:var(--muted);font-size:14px}.demo{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px dashed #e7e5e4;padding-top:16px;margin-top:12px;color:var(--muted);font-size:14px}.demo select{height:36px;font-size:14px}.demo button{height:36px;font-size:14px}.demo label{margin-left:auto;display:flex;align-items:center;gap:8px}dialog{width:510px;max-width:calc(100vw - 32px);max-height:calc(100vh - 48px);overflow:auto;border:1px solid #e7e5e4;border-radius:20px;padding:24px;color:#292524}dialog::backdrop{background:#29252460}dialog header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}dialog label{display:grid;gap:8px;font-size:14px;margin-top:16px}dialog label input{width:100%}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.section{border-top:1px solid var(--line);margin-top:22px;padding-top:20px}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.switch-row{display:flex;align-items:center;justify-content:space-between;gap:15px}.switch-row small{display:block;margin-top:6px}.toggle{width:44px;height:26px;border-radius:999px;padding:3px;background:#d6d3d1;border:0;corner-shape:round}.toggle::after{content:'';display:block;width:20px;height:20px;background:white;border-radius:50%;transition:transform .15s}.toggle[aria-checked=true]{background:#57534e}.toggle[aria-checked=true]::after{transform:translateX(18px)}[hidden]{display:none!important}#feedback{margin:0 0 18px}#feedback:empty{display:none}@media(max-width:900px){main{padding:24px}.pane{padding:20px}.work{grid-template-columns:1.2fr 1fr}.datebar{gap:8px}.top{gap:10px}.top>small{display:none}}@media(max-width:700px){main{padding:16px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid var(--line)}h1{font-size:22px}.action-row{align-items:flex-start;flex-wrap:wrap}.demo label{margin-left:0}.two{grid-template-columns:1fr}.top{position:static}.run{grid-template-columns:70px 1fr}.run>small{display:none}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<main>
<header class="top"><button class="icon quiet" id="back" aria-label="返回任务列表"><svg viewBox="0 0 24 24"><path d="m14 6-6 6 6 6M8 12h12"/></svg></button><div class="title"><h1 id="name">原材料入库自动填报</h1></div><span class="pill" id="enabled">未启用</span><button class="icon" id="settings-open" aria-label="任务设置" title="任务设置"><svg viewBox="0 0 24 24"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>
<p id="feedback" role="status" aria-live="polite"></p>
<section class="work" aria-label="入库工作区"><div class="pane"><div class="pane-head"><h2>入库数据</h2></div><div class="datebar"><span id="date-label">业务日期</span><input type="hidden" id="date"><span id="date-picker"></span><button class="plain" id="yesterday">昨天</button><button id="preview" class="primary">生成预览</button></div><div id="source-empty" class="empty"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h6m-6 3h4"/></svg><strong>选择日期，查看入库汇总</strong><span>手动读取板材、型材重量<br>同时检查 Notion 中是否已有记录</span></div><div id="source-values" hidden><div class="sheet"><div class="line"><span>板材</span><span><b class="number" id="plate">—</b><small>吨</small></span></div><div class="line"><span>型材</span><span><b class="number" id="section">—</b><small>吨</small></span></div><div class="line total"><span>合计</span><span><b class="number" id="total">—</b><small>吨</small></span></div></div></div><div id="source-error" class="callout error" role="alert" hidden></div></div>
<div class="pane"><div class="pane-head"><h2>写入预览</h2><span class="pill">Notion</span></div><small id="target-name">原材料入库数据库</small><div id="target-empty" class="empty"><strong>尚未生成预览</strong><span>预览只读取数据，不会新增记录</span></div><div class="record" id="record" hidden><div class="line"><span>业务</span><span id="record-title"></span></div><div class="line"><span>日期</span><span id="record-date"></span></div><div class="line"><span>板材</span><span id="record-plate"></span></div><div class="line"><span>型材</span><span id="record-section"></span></div></div><div id="target-status" class="callout" role="status" hidden></div></div></section>
<div class="action-row"><button id="source-test">仅测试 93 读取</button><button id="run" disabled>执行本日期</button></div>
<details class="runs"><summary>运行记录 <small id="run-count"></small></summary><div class="runs-body" id="runs-body"><p class="muted">暂无运行记录</p></div></details>
</main>
<dialog id="settings" aria-labelledby="settings-title"><form id="settings-form"><header><h2 id="settings-title">任务设置</h2><button type="button" class="icon quiet" data-close="settings" aria-label="关闭任务设置">✕</button></header><label>任务名称<input id="task-name" required maxlength="80"></label><div class="section"><h3>93 系统连接</h3><label>材料入库业务页面<input type="url" id="url" required placeholder="http://服务器/业务页面"></label><div class="two"><label>用户名<input id="username" required autocomplete="off"></label><label>密码<input id="password" type="password" placeholder="已保存；留空不修改" autocomplete="new-password"></label></div></div><div class="section"><div class="switch-row"><div><h3>定时入库</h3><small>填报前一天</small></div><button type="button" id="toggle" class="toggle" role="switch" aria-checked="false" aria-label="定时入库"></button></div><label>每天执行时间<input id="run-time" type="time" step="60" required></label><p id="schedule-hint" class="muted" style="margin-top:12px">完成一次“生成预览”后可启用。</p></div><div class="section"><h3>固定写入目标</h3><p class="muted" style="margin-top:8px"><span id="settings-target-name">原材料入库数据库</span> · 业务、日期、板材、型材<br>Notion 连接与数据库目录在系统设置中维护。<br><button type="button" class="plain" id="system-settings">打开系统设置</button></p></div><p class="callout" id="settings-note">修改名称或连接后，需重新预览并启用定时任务。</p><div class="actions"><button type="button" data-close="settings">取消</button><button class="primary" type="submit">保存设置</button></div></form></dialog>
<dialog id="confirm" aria-labelledby="confirm-title"><header><h2 id="confirm-title">执行本日期</h2><button class="icon quiet" data-close="confirm" aria-label="关闭确认">✕</button></header><p id="confirm-copy"></p><p class="callout">执行时会重新读取并查重，以当时的数据为准；已有记录则跳过。</p><div class="actions"><button data-close="confirm">取消</button><button class="primary" id="confirm-run">确认执行</button></div></dialog>

</html>
`,Fe=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Je({id:n,...i}){const r=m.useRef(null),[v,u]=m.useState("");return m.useEffect(()=>{let l=!1,t;const c=r.current;return u(""),M("notionFill.get",{id:n}).then(y=>{l||(t=Sn(y,i),c.onload=()=>{var N;!l&&((N=c.contentDocument)!=null&&N.getElementById("date-picker"))&&t.connect(c.contentDocument)},c.srcdoc=Nn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(We,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ye,window.location.href).href))}).catch(y=>{l||u(String(y.message||y))}),()=>{l=!0,c.onload=null,t==null||t.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[v&&e.jsx("p",{role:"alert",children:v}),e.jsx("iframe",{ref:r,title:"原材料自动入库"})]})}function Sn(n,i){let r={...n,runTime:n.runTime||"00:00"},v,u,l=!1,t=!1,c=0,y=0,N=Fe(),f,$=r.isEnabled;const h=g=>v.getElementById(g),x=g=>h(g),j=g=>h(g),S=g=>h(g),I=g=>g instanceof Error?g.message:String(g),k=g=>g.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function C(g,q=!1){h("feedback").textContent=g,h("feedback").className=q?"callout error":""}function z(){return!!(r.sourcePageUrl&&r.username&&r.passwordConfigured)}function w(){u==null||u.render(e.jsx(le,{value:N,disabled:t,onChange:s}))}function T(){for(const g of["preview","source-test","yesterday","settings-open","back","confirm-run"])j(g).disabled=t;j("preview").disabled=t||!z()||!r.notionConfigured,j("source-test").disabled=t||!z(),j("run").disabled=t||!f,v.querySelectorAll("#settings button, #settings input").forEach(g=>g.disabled=t),j("toggle").disabled=t||!r.schedulingAvailable,j("preview").textContent=t?"处理中…":"生成预览",h("name").textContent=r.name,h("enabled").textContent=r.isEnabled?r.schedulerInstalled?"已启用":"计划异常":"未启用",h("target-name").textContent=r.targetDataSourceName,h("settings-target-name").textContent=r.targetDataSourceName,x("password").placeholder=r.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",w()}function L(g="尚未生成预览"){c++,f=void 0,h("source-empty").hidden=!1,h("source-values").hidden=!0,h("source-error").hidden=!0,h("record").hidden=!0,h("target-status").hidden=!0,h("target-empty").hidden=!1,h("target-empty").querySelector("strong").textContent=g,h("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",j("run").textContent="执行本日期",j("run").disabled=!0,S("confirm").open&&S("confirm").close()}function s(g){t||(N=g,x("date").value=g,L("待重新预览"),C(""),w())}function b(g){h("source-empty").hidden=!0,h("source-values").hidden=!1;for(const[q,R]of[["plate",g.plateWeight],["section",g.sectionWeight],["total",g.totalWeight]])h(q).textContent=k(R)}function p(g){b(g),h("target-empty").hidden=!0,h("record").hidden=!1,h("record-title").textContent=`${g.businessDate} 入库`,h("record-date").textContent=g.businessDate,h("record-plate").textContent=`${k(g.plateWeight)} 吨`,h("record-section").textContent=`${k(g.sectionWeight)} 吨`,h("target-status").hidden=!1,h("target-status").textContent=g.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",j("run").textContent=g.targetRecordExists?"验证查重":"执行本日期"}function o(g){h("run-count").textContent=g.length?`· ${g.length}`:"";const q=g.map(R=>{const P=v.createElement("div");P.className="run";const H=v.createElement("span");H.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[R.source]||R.source;const ee=v.createElement("div");ee.textContent=R.error||R.message||(R.status==="created"?"已新增":R.status==="failed"?"执行失败":"已检查"),R.status==="failed"&&(ee.style.color="#B91C1C");const ne=v.createElement("p");ne.textContent=R.status==="failed"?R.businessDate:`${R.businessDate} · 板材 ${k(R.plateWeight)} 吨 · 型材 ${k(R.sectionWeight)} 吨`,ee.append(ne);const Z=v.createElement("small");return Z.textContent=R.time,P.append(H,ee,Z),P});h("runs-body").replaceChildren(...q),g.length||(h("runs-body").textContent="暂无运行记录")}async function d(){const g=++y;try{const q=await M("notionFill.runs",{id:r.id});!l&&g===y&&o(q.runs)}catch(q){!l&&g===y&&(h("runs-body").textContent=`运行记录读取失败：${I(q)}；重新展开可重试。`)}}function E(){Promise.resolve(i.changed()).catch(()=>{})}async function A(g){if(t||!N)return;t=!0,L("正在读取…");const q=c;T(),C("");try{const R=await M(g?"notionFill.testSource":"notionFill.test",{id:r.id,businessDate:N},12e4);if(l||q!==c)return;if(!R.succeeded)throw new Error(R.message||"读取失败");g?(b(R),h("target-empty").querySelector("strong").textContent="尚未检查 Notion",h("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(r.validated=!0,f=R,p(R)),E()}catch(R){if(l||q!==c)return;L("本次预览未完成"),h("source-error").hidden=!1,h("source-error").textContent=I(R)}finally{l||(t=!1,T(),d())}}async function D(){if(t||!f||!S("confirm").open)return;const g=f.businessDate;S("confirm").close(),t=!0,T(),C("");try{const q=await M("notionFill.runNow",{id:r.id,businessDate:g},12e4);if(l)return;if(!q.succeeded)throw new Error(q.message||"执行失败");f={...f,targetRecordExists:!0},h("target-status").textContent=q.message,j("run").textContent="验证查重",C(q.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),E()}catch(q){l||(L("执行未完成，请重新预览"),C(I(q),!0))}finally{l||(t=!1,T(),d())}}function V(){return x("task-name").value.trim()!==r.name||x("url").value.trim().replace(/\/+$/,"")!==r.sourcePageUrl||x("username").value.trim()!==r.username||!!x("password").value}function Y(){j("toggle").setAttribute("aria-checked",String($)),h("schedule-hint").textContent=r.schedulingAvailable?V()?"配置已修改：保存后需重新预览，再启用。":r.isEnabled&&!r.schedulerInstalled?r.schedulerMessage:r.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function Q(g){if(g.preventDefault(),t)return;const q=x("task-name").value.trim(),R=x("username").value.trim();if(!q||!R){h("settings-note").textContent="任务名称和用户名不能为空。";return}const P=V(),H=x("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(H)){h("settings-note").textContent="请选择有效的执行时间。";return}const ee=P||H!==r.runTime,ne=P?!1:$;let Z=!1;t=!0,T();try{if(ee){const _=x("url").value.trim().replace(/\/+$/,""),ie=x("password").value;if(await M("notionFill.save",{id:r.id,name:q,sourcePageUrl:_,username:R,password:ie,runTime:H}),l)return;Z=!0,r={...r,name:q,sourcePageUrl:_,username:R,runTime:H,passwordConfigured:r.passwordConfigured||!!ie,isEnabled:P?!1:r.isEnabled,validated:P?!1:r.validated},x("password").value="",P&&L("配置已修改，请重新预览")}if(ne!==r.isEnabled){const _=await M("automation.setEnabled",{id:r.id,taskType:"notion_fill",enabled:ne});if(l)return;if(r.isEnabled=_.enabled,_.enabled!==ne)throw new Error(_.message||"定时任务状态未更新");Z=!0}const te=await M("notionFill.get",{id:r.id});if(l)return;r=te,S("settings").close(),C(P?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(te){l||(h("settings-note").textContent=`${Z?"设置已更新，但后续操作失败：":""}${I(te)}`)}finally{l||(t=!1,$=r.isEnabled,T(),Y(),Z&&E())}}async function X(){if(t||l)return;const g=c;try{const q=await M("notionFill.get",{id:r.id});if(l||t||g!==c)return;r=q,L("系统设置已更新，请重新预览"),T(),C(r.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(q){l||C(I(q),!0)}}return{connect(g){u==null||u.unmount(),v=g;const q=v.createElement("style");q.textContent=Oe+`
`+Ue+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,v.head.append(q);const R=v.createElement("span");R.className="production-message-demo",R.hidden=!0,v.body.append(R),u=Pe.createRoot(h("date-picker")),x("date").value=N,x("date").onchange=()=>s(x("date").value),j("yesterday").onclick=()=>s(Fe()),j("preview").onclick=()=>{A(!1)},j("source-test").onclick=()=>{A(!0)},j("back").onclick=i.back,j("run").onclick=()=>{t||!f||(h("confirm-title").textContent=f.targetRecordExists?"验证查重":"执行本日期",h("confirm-copy").textContent=f.targetRecordExists?`${f.businessDate} 已有记录，本次执行应跳过。`:`将向“${r.targetDataSourceName}”新增 ${f.businessDate} 的记录：板材 ${k(f.plateWeight)} 吨，型材 ${k(f.sectionWeight)} 吨。`,S("confirm").showModal())},j("confirm-run").onclick=()=>{D()},j("settings-open").onclick=()=>{x("task-name").value=r.name,x("url").value=r.sourcePageUrl,x("username").value=r.username,x("password").value="",x("run-time").value=r.runTime,x("password").required=!r.passwordConfigured,h("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",$=r.isEnabled,Y(),S("settings").showModal()},j("toggle").onclick=()=>{if(r.schedulingAvailable){if(!$&&(!r.validated||V())){h("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}$=!$,Y()}};for(const P of["task-name","url","username","password"])x(P).oninput=()=>{V()&&($=!1),Y()};h("settings-form").onsubmit=P=>{Q(P)},S("settings").onclose=()=>{x("password").value=""},S("settings").oncancel=P=>{t&&P.preventDefault()},v.querySelectorAll("[data-close]").forEach(P=>P.onclick=()=>{t||S(P.dataset.close).close()}),j("system-settings").hidden=!i.openSettings,j("system-settings").onclick=()=>{var P;S("settings").close(),(P=i.openSettings)==null||P.call(i)},v.querySelector(".runs").ontoggle=P=>{P.currentTarget.open&&d()},window.addEventListener("production-settings-updated",X),L(),T(),z()?r.notionConfigured||C("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):C("请先在任务设置中补全 93 系统连接配置。")},dispose(){l=!0,c++,y++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",X)}}}function Cn({onCreated:n,onBack:i,onCancel:r}){const[v,u]=m.useState(2),[l,t]=m.useState("日报任务"),[c,y]=m.useState("17:30"),[N,f]=m.useState(!1),[$,h]=m.useState("");async function x(){f(!0),h("");try{const j=await M("daily.create",{name:l.trim(),sendTime:c});await n(j)}catch(j){h(j instanceof Error?j.message:String(j))}finally{f(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(En,{current:v}),$&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:$})]})}),v===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:j=>t(j.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:i,children:[e.jsx(ue,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>u(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"日报必要配置"}),e.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),e.jsxs("label",{children:["每天发送时间",e.jsx("input",{type:"time",value:c,onChange:j=>y(j.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"任务类型"}),e.jsx("strong",{children:"日报推送"}),e.jsx("span",{children:"创建后继续"}),e.jsx("strong",{children:"消息内容 → 预览与测试"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:N,onClick:()=>u(2),children:[e.jsx(ue,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:N,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:N||!c,onClick:x,children:[N&&e.jsx(ce,{className:"spin"}),"创建任务"]})]})]})]})}function En({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Tn({onCreated:n,onBack:i,onCancel:r}){const[v,u]=m.useState(2),[l,t]=m.useState("原材料入库自动填报"),[c,y]=m.useState(""),[N,f]=m.useState(""),[$,h]=m.useState(""),[x,j]=m.useState(!1),[S,I]=m.useState("");async function k(){j(!0),I("");try{const C=await M("notionFill.create",{name:l.trim(),sourcePageUrl:c.trim(),username:N.trim(),password:$});await n(C)}catch(C){I(C instanceof Error?C.message:String(C))}finally{j(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx($n,{current:v}),S&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:S})]})}),v===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:C=>t(C.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:i,children:[e.jsx(ue,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>u(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"93 系统连接"}),e.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),e.jsxs("label",{children:["材料入库业务页面",e.jsx("input",{type:"url",value:c,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:C=>y(C.target.value)})]}),e.jsxs("label",{children:["93 系统用户名",e.jsx("input",{value:N,autoComplete:"username",onChange:C=>f(C.target.value)})]}),e.jsxs("label",{children:["93 系统密码",e.jsx("input",{type:"password",value:$,autoComplete:"new-password",onChange:C=>h(C.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"填报目标"}),e.jsx("strong",{children:"原材料入库数据库"}),e.jsx("span",{children:"执行时间"}),e.jsx("strong",{children:"每天 00:00 · 填报前一天"}),e.jsx("span",{children:"写入方式"}),e.jsx("strong",{children:"按日期查重，仅新增"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:x,onClick:()=>u(2),children:[e.jsx(ue,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:x,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:x||!c.trim()||!N.trim()||!$,onClick:k,children:[x&&e.jsx(ce,{className:"spin"}),"创建任务"]})]})]})]})}function $n({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const Ge=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Notion 取数填报。",renderCreate:n=>e.jsx(fn,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>e.jsx(Ve,{id:n.id,changed:n.changed},n.id),loadRuns:n=>M("tencentSheet.runs",{id:n}).then(({runs:i})=>i.map(r=>({...r,source:r.source==="background-test"?"后台自动测试":r.source==="automatic"?"定时填报":"前台测试",title:r.businessDate,details:r.message?[r.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>e.jsx(Cn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>e.jsx(_e,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("daily.runs",{id:n}).then(({runs:i})=>i.map(r=>({id:r.id,time:r.time,source:r.source,status:r.status,title:r.textSummary||`业务日期 ${r.businessDate||"—"}`,details:[`业务日期：${r.businessDate||"—"}`,`阶段：${r.stage}`,`尝试：${r.attempts}`],error:r.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>e.jsx(Tn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>e.jsx(Je,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("notionFill.runs",{id:n}).then(({runs:i})=>i.map(r=>({id:r.id,time:r.time,source:r.source==="source-test"?"93读取测试":r.source==="test"?"只读测试":r.source==="manual"?"手动执行":"自动执行",status:r.status==="created"?"已新增":r.status==="checked"?"已检查":"失败",title:`${r.businessDate} · 板材 ${r.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${r.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[r.message].filter(Boolean),error:r.error})))}];function Le(n){return Ge.find(i=>i.taskType===n)}const be=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function Mn({openSettings:n}){var p;const[i,r]=m.useState([]),[v,u]=m.useState(),[l,t]=m.useState(""),[c,y]=m.useState(""),[N,f]=m.useState(),[$,h]=m.useState(),[x,j]=m.useState(),[S,I]=m.useState(!1),[k,C]=m.useState(""),[z,w]=m.useState(["daily_report","notion_fill"]),T=()=>M("automation.list").then(o=>{o.availableTaskTypes&&w(o.availableTaskTypes);const d=Array.isArray(o.tasks)?o.tasks:i;return r(d),u(E=>E&&(d.find(A=>A.taskType===E.taskType&&A.id===E.id)||E)),d});m.useEffect(()=>{T().catch(o=>f(be(o)))},[]),m.useEffect(()=>{if(!$)return;const o=()=>h(void 0),d=E=>E.key==="Escape"&&o();return window.addEventListener("pointerdown",o),window.addEventListener("keydown",d),window.addEventListener("blur",o),()=>{window.removeEventListener("pointerdown",o),window.removeEventListener("keydown",d),window.removeEventListener("blur",o)}},[$]);async function L(o,d){const E=await T();I(!1),C(""),u(E.find(A=>A.taskType===o&&A.id===d.id))}async function s(o){y(o.id),f(void 0);try{const d=await M("automation.setEnabled",{taskType:o.taskType,id:o.id,enabled:!o.isEnabled},6e4);d.missingStep?(t(d.missingStep),u(o),f({tone:"warning",title:"配置尚未完成",message:d.message||""})):await T()}catch(d){f(be(d))}finally{y("")}}async function b(o){if(!o.isEnabled){y(o.id);try{await M("automation.delete",{taskType:o.taskType,id:o.id}),j(void 0),await T()}catch(d){f(be(d))}finally{y("")}}}if(v){const o=Le(v.taskType);if(o)return e.jsx(Dn,{openSettings:n,task:v,definition:o,focusStep:l,notice:N,refresh:T,back:()=>{u(void 0),t(""),f(void 0),T()}})}return e.jsxs("div",{className:"page daily-page automation-list-page",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsx("h1",{children:"自动化任务"}),e.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),e.jsx("div",{className:"header-actions",children:e.jsxs("button",{className:"primary",onClick:()=>I(!0),children:[e.jsx(sn,{}),"新建任务"]})})]}),N&&e.jsx("div",{className:`notice ${N.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:N.title}),e.jsx("span",{children:N.message})]})}),e.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[i.map(o=>e.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(o.status)?" needs-attention":""}`,onClick:()=>u(o),onContextMenu:d=>{d.preventDefault(),h({task:o,x:Math.min(d.clientX,window.innerWidth-176),y:Math.min(d.clientY,window.innerHeight-58)})},children:[e.jsxs("div",{className:"job-copy",children:[e.jsx("h2",{children:e.jsx("button",{type:"button",className:"automation-task-name",onClick:d=>{d.stopPropagation(),u(o)},children:o.name||"未命名任务"})}),e.jsxs("p",{children:[o.taskTypeName," · ",o.schedule," · ",o.connectionStatus]})]}),e.jsxs("div",{className:"job-actions",onClick:d=>d.stopPropagation(),children:[e.jsx("span",{className:`job-status ${o.status}`,children:Ke(o.status)}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox","aria-label":`启用${o.name||"未命名任务"}`,checked:o.isEnabled,disabled:!o.schedulingAvailable||c===o.id,title:o.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>s(o)}),e.jsx("span",{})]}),e.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${o.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:d=>{const E=d.currentTarget.getBoundingClientRect();h({task:o,x:Math.min(E.left,window.innerWidth-176),y:Math.min(E.bottom+4,window.innerHeight-58)})},children:e.jsx(rn,{})})]}),e.jsxs("div",{className:"automation-card-footer",children:["最近运行：",o.lastRun]})]},`${o.taskType}:${o.id}`)),!i.length&&e.jsxs("div",{className:"empty-state",children:[e.jsx(tn,{}),e.jsx("h2",{children:"还没有自动化任务"}),e.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!i.length&&e.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),$&&e.jsx("div",{className:"job-context-menu",role:"menu",style:{left:$.x,top:$.y},onPointerDown:o=>o.stopPropagation(),children:e.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:$.task.isEnabled||c===$.task.id,onClick:()=>{j($.task),h(void 0)},children:[e.jsx(on,{}),$.task.isEnabled?"停用后可删除":"删除任务"]})}),e.jsx(ye,{open:!!x,onOpenChange:o=>!o&&j(void 0),children:e.jsxs(ve,{children:[e.jsx(we,{className:"dialog-overlay"}),e.jsxs(ke,{className:"dialog",children:[e.jsx(je,{children:"删除自动化任务？"}),e.jsxs(Ne,{children:["将删除“",x==null?void 0:x.name,"”及其业务记录，此操作无法撤销。"]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>j(void 0),children:"取消"}),e.jsx("button",{className:"danger",disabled:!!c,onClick:()=>x&&b(x),children:"确认删除"})]})]})]})}),e.jsx(ye,{open:S,onOpenChange:o=>{I(o),o||C("")},children:e.jsxs(ve,{children:[e.jsx(we,{className:"dialog-overlay"}),e.jsxs(ke,{className:"dialog automation-create-dialog",children:[e.jsx(je,{children:"新建自动化任务"}),e.jsx(Ne,{children:k?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),k?(p=Le(k))==null?void 0:p.renderCreate({onCreated:o=>L(k,o),onBack:()=>C(""),onCancel:()=>{I(!1),C("")}}):e.jsx("div",{className:"automation-create-types",children:Ge.filter(o=>z.includes(o.taskType)).map(o=>e.jsxs("button",{onClick:()=>C(o.taskType),children:[e.jsx("strong",{children:o.name}),e.jsx("span",{children:o.description})]},o.taskType))})]})]})})]})}function Dn({openSettings:n,task:i,definition:r,focusStep:v,notice:u,refresh:l,back:t}){const[c,y]=m.useState(v?r.resolveSection(v):r.includeBasics===!1?r.taskTabs[0].id:"basics"),N=i.taskType==="daily_report",[f,$]=m.useState(),[h,x]=m.useState(""),[j,S]=m.useState(!1),I=[...r.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...r.taskTabs,{id:"runs",label:"运行记录"}],k=[...i.missingMessage?[{id:`configuration:${i.missingStep||"unknown"}`,title:r.issueTitle(i.missingStep||""),message:i.missingMessage,section:r.resolveSection(i.missingStep||"")}]:[],...i.status==="schedule-error"&&i.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:i.schedulerMessage,section:"basics"}]:[]];async function C(){S(!0),x("");try{$(await r.loadRuns(i.id))}catch(w){x(w instanceof Error?w.message:String(w))}finally{S(!1)}}m.useEffect(()=>{c==="runs"&&f===void 0&&C()},[c,f]);function z(w,T){var s;if(w.key!=="ArrowLeft"&&w.key!=="ArrowRight")return;w.preventDefault();const L=(T+(w.key==="ArrowRight"?1:-1)+I.length)%I.length;y(I[L].id),I[L].id==="basics"&&l().catch(()=>{}),(s=document.getElementById(`automation-tab-${I[L].id}`))==null||s.focus()}return i.taskType==="tencent_sheet_fill"?e.jsx(Ve,{id:i.id,name:i.name,back:t,changed:()=>{l().catch(()=>{})}},i.id):N?e.jsx(_e,{id:i.id,back:t,changed:l,openSettings:n}):i.taskType==="notion_fill"?e.jsx(Je,{id:i.id,back:t,changed:l,openSettings:n}):e.jsxs("div",{className:"page daily-page automation-detail",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:t,children:[e.jsx(ue,{}),"返回任务列表"]}),e.jsx("h1",{title:i.name||"未命名任务",children:i.name||"未命名任务"}),e.jsxs("p",{children:[i.taskTypeName," · ",i.schedule]})]}),e.jsx("span",{className:`job-status ${i.status}`,children:Ke(i.status)})]}),e.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:I.map((w,T)=>e.jsx("button",{type:"button",role:"tab",id:`automation-tab-${w.id}`,"aria-selected":c===w.id,"aria-controls":`automation-panel-${w.id}`,tabIndex:c===w.id?0:-1,onClick:()=>{y(w.id),w.id==="basics"&&l().catch(()=>{})},onKeyDown:L=>z(L,T),children:w.label},w.id))}),e.jsxs("div",{children:[u&&e.jsx("div",{className:`notice ${u.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:u.title}),e.jsx("span",{children:u.message})]})}),!!k.length&&e.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[e.jsxs("div",{className:"automation-issues-heading",children:[e.jsx(dn,{}),e.jsxs("div",{children:[e.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),e.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),e.jsxs("span",{children:[k.length," 项"]})]}),e.jsx("ul",{children:k.map(w=>{var T;return e.jsxs("li",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:w.title}),e.jsx("span",{children:w.message})]}),e.jsxs("button",{type:"button",onClick:()=>{y(w.section)},children:["前往",((T=I.find(L=>L.id===w.section))==null?void 0:T.label)||"处理",e.jsx(nn,{})]})]},w.id)})})]}),e.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${c}`,"aria-labelledby":`automation-tab-${c}`,children:[e.jsx("div",{hidden:c==="runs",children:r.renderEditor({id:i.id,section:c,openSettings:n,navigate:y,changed:()=>{l().catch(()=>{})}})}),c==="runs"&&e.jsxs("section",{className:"surface automation-runs",children:[e.jsxs("div",{className:"automation-runs-heading",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"运行记录"}),e.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),e.jsxs("button",{className:"secondary",disabled:j,onClick:C,children:[j?e.jsx(ce,{className:"spin"}):e.jsx(an,{}),"刷新"]})]}),h&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"运行记录读取失败"}),e.jsx("span",{children:h})]})}),e.jsx("div",{className:"automation-run-list",children:f==null?void 0:f.map(w=>e.jsxs("details",{children:[e.jsxs("summary",{children:[e.jsx("span",{children:w.time}),e.jsx("span",{children:w.source}),e.jsx("strong",{children:w.title}),e.jsx("b",{className:w.error?"error-text":"",children:w.status})]}),e.jsxs("div",{children:[w.details.map(T=>e.jsx("p",{children:T},T)),w.error&&e.jsxs("p",{className:"run-error",children:["错误：",w.error]})]})]},w.id))}),!j&&f&&!f.length&&e.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function Ke(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}export{Mn as AutomationPage};
