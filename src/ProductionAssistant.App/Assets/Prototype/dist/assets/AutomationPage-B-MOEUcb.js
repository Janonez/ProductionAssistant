import{c as ie,r as u,j as e,C as ae,D as pe,i as M,T as je,I as tn,B as De,a as sn,S as we,L as me,b as Ue,g as an,n as on,A as dn,d as Ae,e as Ie,f as Re,h as ze,k as qe,l as Me,R as ln}from"./index-DLijEEBb.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=ie("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=ie("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn=ie("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=ie("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=ie("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=ie("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gn=ie("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=ie("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),Fe=["firstTarget","secondTarget","dateHeader","label"],Le=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function fn(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(t=>t.type==="year").value}-${n.find(t=>t.type==="month").value}`}function bn({id:n,metrics:t,initialMetric:r,businessDate:y,rules:p,fixedSheet:d,disabled:a,run:l,onActive:b,onSaved:C}){var s,N;const[g,E]=u.useState(r||((s=t[0])==null?void 0:s.value)||""),[c]=u.useState(()=>(y==null?void 0:y.slice(0,7))||fn()),[h,v]=u.useState(`${c}-01`),[I,L]=u.useState(`${c}-02`),[S,$]=u.useState(),[q,k]=u.useState({}),[T,P]=u.useState(""),o=!!S,w=((N=t.find(A=>A.value===g))==null?void 0:N.label)||"业务字段",f={firstTarget:`${h} 的${w}填报格`,secondTarget:`${I} 的${w}填报格`,dateHeader:`${h} 的日期单元格`,label:"项目名称、公司或材料表头"};async function D(A){P(""),await l(A==="preview"?"验证排列并定位第三个日期":A==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const j=await M("tencentSheet.teach",{id:n,stage:A,metric:g,firstDate:h,secondDate:I,sessionToken:S==null?void 0:S.sessionToken,previewToken:S==null?void 0:S.previewToken,slot:S==null?void 0:S.step},3e5);A==="confirm"||A==="cancel"?($(void 0),k({}),b(!1),A==="confirm"&&await C()):($(O=>({...O,...j})),b(!0),j.capture&&j.slot&&k(O=>({...O,[j.slot]:j.capture})))}catch(j){P(j instanceof Error?j.message:String(j)),A==="cancel"&&($(void 0),k({}),b(!1))}})}return e.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:a,children:[e.jsx("legend",{children:"示范填报位置"}),e.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范只读取位置与表头，受保护或已有数据的单元格也可使用，不检查是否可编辑、不填写数据。程序学习两个日期的排列关系，再请你确认第三个位置；正式填报前才检查目标是否可编辑。"}),e.jsx("div",{className:"tencent-teaching-rules",children:t.map(A=>e.jsxs("div",{children:[e.jsx("strong",{children:A.label}),e.jsx("span",{children:p!=null&&p[A.value]?Le(p[A.value]):"待示范位置"})]},A.value))}),T&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"示范未完成"}),e.jsx("span",{children:T})]})}),o?e.jsxs(e.Fragment,{children:[e.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Fe.map((A,j)=>{var O;return e.jsxs("li",{"aria-current":S.step===A?"step":void 0,className:q[A]?"done":"",children:[e.jsxs("span",{children:[j+1,". ",f[A]]}),e.jsx("strong",{children:((O=q[A])==null?void 0:O.address)||"待选取"})]},A)})}),Fe.includes(S.step)&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:["请在网页中单击：",f[S.step]]}),e.jsx("p",{children:S.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":S.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可。受保护或已有数据的格子也可示范，无需解除保护或输入数据。"}),e.jsx("button",{className:"primary",onClick:()=>D("capture"),children:"记住当前选中的单元格"})]}),S.step==="preview"&&e.jsx("button",{className:"primary",onClick:()=>D("preview"),children:"验证规则并查看第三个位置"}),S.step==="confirm"&&S.rule&&S.prediction&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:[w,"：",Le(S.rule)]}),e.jsxs("p",{children:["程序已选中 ",S.prediction.date," 的预测位置 ",e.jsx("b",{children:S.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),e.jsxs("p",{children:["日期及“",S.rule.labelAnchor.expected,"”已通过只读校验。"]}),(S.sheetMode==="fixed"||!S.sheetMode&&d)&&!S.rule.dateAnchor.format.includes("{yyyy}")&&e.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>D("preview"),children:"再次定位预测位置"}),e.jsx("button",{className:"primary",onClick:()=>D("confirm"),children:"位置正确，保存此项目"})]})]}),e.jsx("button",{className:"ghost",onClick:()=>D("cancel"),children:"取消示范，保留原配置"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("label",{children:["要示范哪个项目？",e.jsx(ae,{value:g,options:t,placeholder:"选择项目",disabled:a,ariaLabel:"要示范的项目",onChange:E})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsx(pe,{value:h,onChange:v,label:"第一个示范日期",disabled:a}),e.jsx(pe,{value:I,onChange:L,label:"第二个示范日期",disabled:a})]}),e.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),e.jsx("button",{className:"secondary",disabled:a||!g||!h||!I,onClick:()=>D("start"),children:p!=null&&p[g]?"重新示范此项目":"开始示范此项目"})]})]})}const ge=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击保存状态控件的位置，无需等待特定文字。"}];function yn({id:n,value:t,disabled:r,onSaved:y,onActive:p}){var D;const[d,a]=u.useState(),[l,b]=u.useState(!1),[C,g]=u.useState(""),[E,c]=u.useState(""),[h,v]=u.useState(!1),[I,L]=u.useState(""),[S,$]=u.useState([]),[q,k]=u.useState(),[T,P]=u.useState();function o(){L(""),$([])}function w(){a(structuredClone(t??{})),b(!1),c(""),v(!1),k(void 0),P(void 0),o(),p(!0)}async function f(s,N){if(!d)return;g(N??s),v(!1),c(N?ge.find(j=>j.key===N).prompt:"正在操作…");const A=I;s!=="save"&&o(),(s==="open"||s==="testSheet"||N==="sheetTab")&&k(void 0),(s==="open"||s==="testSheet"||s==="captureCell"||N==="sheetTab"||N==="cellAddressBox")&&P(void 0);try{let j=await M(`tencentSite.${s}`,{id:n,controls:d,key:N,token:A},3e5);s==="pick"&&N==="sheetTab"&&(j.controls&&a(j.controls),g("testSheet"),c("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…"),j=await M("tencentSite.testSheet",{id:n,controls:j.controls??d},3e5)),c(j.message),v(j.passed===!1),s==="open"&&b(!0),j.controls&&a(j.controls),"testCell"in j&&P(j.testCell??void 0),(s==="testSheet"||N==="sheetTab")&&k(j),j.sheetRequired&&(k({passed:!1,message:j.message}),P(void 0)),s==="test"&&(L(j.token??""),$(j.steps)),s==="save"&&(await y(),a(void 0),p(!1))}catch(j){v(!0),c(j instanceof Error?j.message:String(j)),o()}finally{g("")}}return e.jsxs("fieldset",{className:"card tencent-web-controls tencent-sheet-panel","aria-busy":!!C,disabled:r,children:[e.jsx("h2",{children:"网页控件录制"}),e.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在“业务字段”中单独配置。"}),d?e.jsx(e.Fragment,{children:e.jsxs("fieldset",{className:"tencent-site-fields",disabled:r||!!C,children:[e.jsx("button",{className:l?"secondary":"primary",onClick:()=>f("open"),children:l?"重新打开配置文档":"开始配置"}),e.jsxs("div",{className:"tencent-site-recording",children:[e.jsx("div",{className:"tencent-site-controls",children:ge.map(s=>e.jsxs("div",{children:[e.jsx("strong",{children:s.title}),e.jsxs("span",{className:"tencent-control-state",children:[s.key==="sheetTab"&&(q!=null&&q.passed)?"已录制 · 检验通过":d[s.key]?"已录制":"未配置",s.key==="saveStatus"&&d.saveStatus?` · ${d.saveStatus.sampleText}`:""]}),e.jsxs("button",{className:"secondary",disabled:!l||s.key!=="sheetTab"&&!(q!=null&&q.passed)||s.key==="cellEditor"&&!T,onClick:()=>f("pick",s.key),children:["录制",s.key==="sheetTab"?" Sheet 标签":s.key==="cellEditor"?"内容编辑区":s.key==="saveStatus"?"保存状态":"单元格名称框"]}),s.key==="sheetTab"&&d.sheetTab&&e.jsx("button",{className:"secondary",disabled:!l,onClick:()=>f("testSheet"),children:"重新检验 Sheet"}),s.key==="saveStatus"&&d.saveStatus&&e.jsx("button",{className:"secondary",onClick:()=>{const N={...d};delete N.saveStatus,a(N),o()},children:"移除保存状态"})]},s.key))}),e.jsxs("div",{className:"tencent-site-instructions",children:[e.jsx("strong",{children:ge.some(s=>s.key===C)?"正在等待网页点选":C==="testSheet"?"正在检验 Sheet":"控件录制模式"}),e.jsx("p",{children:"先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。"}),e.jsx("p",{children:"录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。"}),q&&e.jsxs("div",{className:`notice tencent-sheet-check ${q.passed?"info":"error"}`,role:q.passed?"status":"alert",children:[e.jsx("strong",{children:q.passed?"Sheet 检验通过":"Sheet 检验未通过"}),e.jsx("ol",{className:"tencent-site-results",children:(D=q.steps)==null?void 0:D.map(s=>e.jsxs("li",{children:[e.jsx("strong",{children:s.label}),e.jsx("span",{children:s.detail}),s.names&&e.jsxs("details",{children:[e.jsx("summary",{children:"查看全部 Sheet 名称"}),e.jsx("ul",{children:s.names.map((N,A)=>e.jsx("li",{children:N},`${A}:${N}`))})]})]},s.label))}),!q.passed&&e.jsx("p",{children:q.message})]}),(q==null?void 0:q.passed)&&e.jsxs("div",{className:"tencent-sheet-guidance tencent-test-cell",role:"status",children:[e.jsx("strong",{children:T?`临时测试格：${T.sheet}!${T.address}`:"请选择一个可编辑的空白格"}),e.jsx("p",{children:T?"此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。":"在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}),e.jsx("button",{className:"secondary",disabled:!l||!d.cellAddressBox,onClick:()=>f("captureCell"),children:"读取当前测试格"})]})]})]}),!!(S!=null&&S.length)&&e.jsx("ol",{className:"tencent-site-results",children:S.map(s=>e.jsxs("li",{children:[e.jsx("strong",{children:s.label}),e.jsx("span",{children:s.detail})]},s.label))}),e.jsx("p",{className:"tencent-sheet-help",children:"录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",disabled:!l||!(q!=null&&q.passed)||!T||!d.cellAddressBox||!d.cellEditor,onClick:()=>f("test"),children:"检验单元格控件"}),e.jsx("button",{className:l?"primary":"secondary",disabled:!I,onClick:()=>f("save"),children:"保存网页控件"}),e.jsx("button",{className:"secondary",onClick:()=>{a(void 0),k(void 0),P(void 0),p(!1),o(),c("")},children:"取消"})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"checklist",children:ge.map(s=>e.jsxs("div",{className:"check-item",children:[e.jsx("span",{className:`mark ${t!=null&&t[s.key]?"":"pending"}`,children:t!=null&&t[s.key]?"✓":"·"}),s.title.slice(2),e.jsx("span",{className:"tencent-control-state",children:t!=null&&t[s.key]?"已录制":s.key==="saveStatus"?"未配置":"待录制"})]},s.key))}),e.jsx("button",{className:"secondary",onClick:w,children:t?"重新录制网页控件":"录制网页控件"})]}),E&&e.jsx("div",{className:`notice ${h?"error":"info"}`,role:h?"alert":"status",children:E})]})}function vn({id:n,field:t,disabled:r,continueToTeaching:y=!1,onSave:p,onCancel:d}){const[a,l]=u.useState(t.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[b,C]=u.useState(!0),[g,E]=u.useState([]),[c,h]=u.useState([]),[v,I]=u.useState([]),[L,S]=u.useState(!1),[$,q]=u.useState(!1),[k,T]=u.useState("");u.useEffect(()=>{let s=!0;return C(!0),M("tencentSheet.sources",{id:n}).then(N=>{s&&E(N.sources)}).catch(N=>{s&&T(String(N))}).finally(()=>{s&&C(!1)}),()=>{s=!1}},[n]),u.useEffect(()=>{let s=!0;if(h([]),T(""),S(!1),!!a.sourceId)return S(!0),M("tencentSheet.schema",{id:n,sourceId:a.sourceId}).then(N=>{s&&h(N.fields)}).catch(N=>{s&&T(String(N))}).finally(()=>{s&&S(!1)}),()=>{s=!1}},[n,a.sourceId]),u.useEffect(()=>{let s=!0;if(I([]),q(!1),!(a.queryMode!=="view"||!a.sourceId))return q(!0),M("tencentSheet.views",{id:n,sourceId:a.sourceId},12e4).then(N=>{s&&I(N.views)}).catch(N=>{s&&T(String(N))}).finally(()=>{s&&q(!1)}),()=>{s=!1}},[n,a.sourceId,a.queryMode]);const P=s=>s.map(N=>({value:N.id,label:N.name})),o=c.filter(s=>["number","formula","rollup"].includes(s.type??"")),w=c.filter(s=>s.type==="date"),f=r||b||L||a.queryMode==="view"&&$,D=g.some(s=>s.id===a.sourceId)&&o.some(s=>s.id===a.valueFieldId)&&(a.queryMode==="date"?w.some(s=>s.id===a.dateFieldId):v.some(s=>s.id===a.datasetId));return e.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:r,children:[e.jsxs("legend",{children:["绑定 Teable：",t.name]}),e.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),e.jsxs("label",{children:["Teable 数据库",e.jsx(ae,{loading:b,value:a.sourceId,options:P(g),placeholder:"选择已有数据库",ariaLabel:"Teable 数据库",disabled:f,onChange:s=>l({...a,sourceId:s,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),e.jsxs("label",{children:["取数方式",e.jsx(ae,{value:a.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:f,onChange:s=>{T(""),l({...a,queryMode:s})}})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["数值字段",e.jsx(ae,{loading:L,value:a.valueFieldId,options:P(o),placeholder:"选择要汇总的数值字段",disabled:f,onChange:s=>l({...a,valueFieldId:s})})]}),a.queryMode==="date"?e.jsxs("label",{children:["日期字段",e.jsx(ae,{loading:L,value:a.dateFieldId,options:P(w),placeholder:"选择用于筛选的日期字段",disabled:f,onChange:s=>l({...a,dateFieldId:s})})]}):e.jsxs("label",{children:["Teable View",e.jsx(ae,{loading:$,value:a.datasetId,options:P(v),placeholder:"选择真实 View",disabled:f,onChange:s=>l({...a,datasetId:s})})]})]}),a.queryMode==="date"?e.jsxs("label",{children:["统计范围",e.jsx(ae,{value:a.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:f,onChange:s=>l({...a,period:s})})]}):e.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Teable 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),k&&e.jsx("p",{role:"alert",children:k}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"primary",disabled:f||!D,onClick:()=>{var s,N,A;return p({...a,sourceName:(s=g.find(j=>j.id===a.sourceId))==null?void 0:s.name,valueFieldName:(N=o.find(j=>j.id===a.valueFieldId))==null?void 0:N.name,datasetName:(A=v.find(j=>j.id===a.datasetId))==null?void 0:A.name})},children:y?"下一步 · 录制位置":"保存数据绑定"}),e.jsx("button",{className:"secondary",disabled:r,onClick:d,children:"稍后继续"})]})]})}const Oe={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},wn=["周日","周一","周二","周三","周四","周五","周六"];function kn({rule:n,schedule:t,disabled:r,onChange:y}){const[p,d]=u.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),a=n.kind==="fixed"?"fixed":p?"offset":n.offsetDays===0?"today":"previous";return e.jsxs("fieldset",{className:"card tencent-sheet-panel",disabled:r,children:[e.jsx("h2",{children:"执行频率与业务日期"}),e.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["执行频率",e.jsxs("select",{value:t.weekdays.length===7?"daily":"weekly",disabled:r,onChange:l=>y(n,{...t,weekdays:l.target.value==="daily"?[...Oe.weekdays]:[1,2,3,4,5]}),children:[e.jsx("option",{value:"daily",children:"每天"}),e.jsx("option",{value:"weekly",children:"指定星期"})]})]}),e.jsxs("label",{children:["业务日期",e.jsxs("select",{value:a,disabled:r,onChange:l=>{const b=l.target.value;d(b==="offset"),y(b==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:b==="today"?0:n.kind==="relative"&&b==="offset"?n.offsetDays:-1},t)},children:[e.jsx("option",{value:"previous",children:"执行当天的前一天"}),e.jsx("option",{value:"today",children:"执行当天"}),e.jsx("option",{value:"offset",children:"相对执行当天偏移 N 天"}),e.jsx("option",{value:"fixed",children:"指定固定日期"})]})]})]}),t.weekdays.length!==7&&e.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(l=>e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:t.weekdays.includes(l),onChange:b=>y(n,{...t,weekdays:b.target.checked?[...t.weekdays,l]:t.weekdays.filter(C=>C!==l)})}),wn[l]]},l))}),a==="offset"&&n.kind==="relative"&&e.jsxs("label",{children:["偏移天数（负数向前，正数向后）",e.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:l=>y({kind:"relative",offsetDays:l.target.value===""?NaN:Number(l.target.value)},t)})]}),n.kind==="fixed"&&e.jsx(pe,{label:"固定业务日期",value:n.date,onChange:l=>y({kind:"fixed",date:l},t),disabled:r}),e.jsx("div",{className:"divider"}),e.jsx("div",{className:"tencent-sheet-grid",children:t.times.map((l,b)=>e.jsxs("div",{children:[e.jsxs("label",{children:["执行时刻 ",b+1,"（北京时间）"]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("input",{type:"time","aria-label":`执行时刻 ${b+1}（北京时间）`,value:l,onChange:C=>y(n,{...t,times:t.times.map((g,E)=>E===b?C.target.value:g)})}),e.jsxs("button",{className:"ghost",disabled:t.times.length===1,onClick:()=>y(n,{...t,times:t.times.filter((C,g)=>g!==b)}),children:["移除时刻 ",b+1]})]})]},b))}),e.jsx("button",{className:"secondary",disabled:t.times.length>=24,onClick:()=>{const l=Array.from({length:24},(b,C)=>`${String(C).padStart(2,"0")}:00`).find(b=>!t.times.includes(b));l&&y(n,{...t,times:[...t.times,l]})},children:"添加执行时刻"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}const ke=n=>n instanceof Error?n.message:String(n);function jn({onCreated:n,onCancel:t}){const[r,y]=u.useState(""),[p,d]=u.useState(!1),[a,l]=u.useState("");async function b(){d(!0),l("");try{await n(await M("tencentSheet.create",{documentUrl:r}))}catch(C){l(ke(C))}finally{d(!1)}}return e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"新建文档填报任务"}),e.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),e.jsxs("label",{children:["文档分享链接",e.jsx("input",{type:"url",disabled:p,value:r,onChange:C=>y(C.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),a&&e.jsx("p",{role:"alert",children:a}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",disabled:p,onClick:t,children:"取消"}),e.jsxs("button",{className:"primary",disabled:p||!r.trim(),onClick:b,children:[p&&e.jsx(me,{className:"spin"}),"创建并配置"]})]})]})}function We({id:n,changed:t,back:r,name:y}){var Ce,Ee;const p=[{id:"doc",label:"文档与账号"},{id:"control",label:"网页控件"},{id:"fields",label:"业务字段"},{id:"rule",label:"执行规则"},{id:"test",label:"测试与上线"}],[d,a]=u.useState("doc"),[l,b]=u.useState("front"),[C,g]=u.useState(!1),[E,c]=u.useState(),[h,v]=u.useState(),[I,L]=u.useState(""),[S,$]=u.useState(""),[q,k]=u.useState(!1),[T,P]=u.useState(!1),[o,w]=u.useState(""),[f,D]=u.useState(),[s,N]=u.useState(!1),[A,j]=u.useState(""),[O,x]=u.useState(!1),[B,W]=u.useState(!1),[m,z]=u.useState(!1),[R,V]=u.useState([]),[G,ne]=u.useState(""),[re,Q]=u.useState(""),[se,K]=u.useState(""),[oe,he]=u.useState(""),Se=u.useRef(null),[Y,Ne]=u.useState();u.useEffect(()=>{if(!S||q)return;const i=window.setTimeout(()=>$(""),2400);return()=>window.clearTimeout(i)},[S,q]);const fe=i=>{v(i),j(i.config.documentUrl)},de=()=>M("tencentSheet.get",{id:n}).then(fe);u.useEffect(()=>{let i=!0;return M("tencentSheet.get",{id:n}).then(F=>{i&&fe(F)}).catch(F=>{i&&(k(!0),$(ke(F)))}),()=>{i=!1}},[n]),u.useEffect(()=>{var i,F;(se||oe)&&((F=(i=Se.current)==null?void 0:i.scrollIntoView)==null||F.call(i,{block:"start"}))},[se,oe]);async function _(i,F){L(i),$(""),k(!1);try{await F()}catch(Z){k(!0),$(ke(Z))}finally{L("")}}function H(){Ne(void 0),D(void 0)}function be(i){v(F=>F&&{...F,config:i}),N(!0),H()}async function nn(i,F){var Z;H(),v(await M("tencentSheet.updateField",{id:n,fieldId:i.id,name:i.name,unit:i.unit,...F?{notion:F}:{}})),he(""),(Z=h==null?void 0:h.config.rules)!=null&&Z[i.id]||(K(le?i.id:""),$(le?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),t()}async function ye(){if(!h)return;const i=await M("tencentSheet.save",{id:n,config:h.config,configRevision:h.configRevision??0});fe(i),N(!1),H(),t()}async function rn(i){s&&await ye(),H();const F=await M(`tencentSheet.${i}`,{id:n},3e5);$(F.message),F.sheets&&V([...new Set(F.sheets)]),await de()}if(!h)return S?e.jsx("div",{className:"notice",role:"alert",children:S}):e.jsx(je,{kind:"tencent"});const U=h.config,le=!!((Ce=U.webControls)!=null&&Ce.sheetTab&&U.webControls.cellAddressBox&&U.webControls.cellEditor),X=U.fields??[],ce=X.find(i=>i.id===se),te=X.find(i=>i.id===oe),J=!!I||O||!!te||m||B;return e.jsx("div",{className:"tencent-demo","aria-busy":!!I,children:e.jsxs("div",{className:"page tencent-sheet-workbench",children:[r&&e.jsx("button",{className:"crumb",onClick:r,disabled:J,children:"← 返回任务列表"}),e.jsxs("div",{className:"titlebar",children:[e.jsxs("div",{children:[e.jsx("h1",{children:y||"腾讯文档填报"}),e.jsxs("div",{className:"subtitle",children:["腾讯文档填报 · 业务日期 ",h.businessDate??"获取数据时确定"]})]}),e.jsxs("div",{className:"tencent-badges",children:[e.jsxs("span",{className:`badge ${h.enabled?"success":"warning"}`,children:["● 定时",h.enabled?"已启用":"未启用"]}),e.jsx("span",{className:"badge neutral",children:h.validated&&!s?"已验证":"待验证"})]})]}),h.enabled&&e.jsxs("div",{className:"banner",children:[e.jsxs("p",{children:["定时填报当前处于",e.jsx("strong",{children:"已启用"}),"状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。"]}),e.jsx("button",{className:"btn btn-secondary",disabled:J,onClick:()=>_("停用定时填报",async()=>{await M("automation.setEnabled",{taskType:"tencent_sheet_fill",id:n,enabled:!1},6e4),await de(),t(),$("已停用定时填报，现在可以修改配置。")}),children:"立即停用"})]}),e.jsx("div",{className:"status-strip",children:[{ok:le,text:le?"网页控件已录制":"网页控件待录制"},{ok:X.length>0&&X.every(i=>{var F;return i.notion&&((F=U.rules)==null?void 0:F[i.id])}),text:`业务字段 ${X.filter(i=>{var F;return i.notion&&((F=U.rules)==null?void 0:F[i.id])}).length}/${X.length} 已绑定`},{ok:!!h.enabled,text:h.enabled?"定时已启用":"定时未启用"}].map(i=>e.jsxs("span",{className:`status-chip ${i.ok?"ok":"pending"}`,children:[e.jsx("span",{className:"dot"}),i.text]},i.text))}),e.jsx("div",{className:"tabs",role:"tablist","aria-label":"腾讯文档配置",children:p.map((i,F)=>e.jsx("button",{id:`tencent-tab-${i.id}`,role:"tab","aria-selected":d===i.id,"aria-controls":`tencent-panel-${i.id}`,tabIndex:d===i.id?0:-1,disabled:J,className:`tab ${d===i.id?"active":""}`,onClick:()=>a(i.id),onKeyDown:Z=>{var $e;if(!["ArrowLeft","ArrowRight","Home","End"].includes(Z.key))return;Z.preventDefault();const Te=Z.key==="Home"?0:Z.key==="End"?p.length-1:(F+(Z.key==="ArrowRight"?1:-1)+p.length)%p.length;a(p[Te].id),($e=document.getElementById(`tencent-tab-${p[Te].id}`))==null||$e.focus()},children:i.label},i.id))}),e.jsxs("div",{className:"panel active",role:"tabpanel",id:`tencent-panel-${d}`,"aria-labelledby":`tencent-tab-${d}`,children:[d==="doc"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:J,className:"card tencent-sheet-panel",children:[e.jsx("h2",{children:"目标文档"}),e.jsx("p",{className:"hint",children:"填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。"}),e.jsxs("div",{"data-shadcn-surface":"",className:"space-y-2",children:[e.jsx("label",{htmlFor:`document-url-${n}`,children:"文档链接"}),e.jsx(tn,{id:`document-url-${n}`,type:"url",disabled:h.enabled,value:U.documentUrl,onChange:i=>be({...U,documentUrl:i.target.value})}),e.jsx("p",{className:"text-sm text-muted-foreground",children:U.documentUrl!==A?"链接尚未保存。保存后才能检查新文档；离开页面会放弃未保存修改。":"文档链接已保存。切换页面或重启应用后自动恢复。"}),s&&e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(De,{disabled:J||!!h.enabled,onClick:()=>_("保存文档配置",async()=>{await ye(),$("文档配置已保存，可打开浏览器检查。")}),children:"保存文档配置"}),e.jsx(De,{variant:"outline",disabled:J,onClick:()=>_("放弃未保存修改",async()=>{await de(),N(!1),H()}),children:"放弃修改"})]})]}),e.jsxs("details",{className:"tencent-document-check",children:[e.jsx("summary",{children:"工作表识别与检查"}),e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"secondary",disabled:h.enabled,onClick:()=>_("识别页面",()=>rn("recognize")),children:"识别并检查"})}),e.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!R.length&&e.jsxs("label",{children:["工作表名称",e.jsx(ae,{value:U.sheetReferenceName??U.capturedSheet??U.sheetName??"",options:R.map(i=>({value:i,label:i})),placeholder:"选择识别到的工作表名称",disabled:J||!!h.enabled,onChange:i=>be({...U,sheetReferenceName:i})})]}),(U.sheetReferenceName||U.capturedSheet||U.sheetMode==="fixed")&&e.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",U.sheetReferenceName??U.capturedSheet??U.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]})]}),e.jsx(sn,{documentUrl:A,disabled:s||!!I||O||m,onActive:W},n)]}),d==="control"&&e.jsx(yn,{id:n,value:U.webControls,disabled:!!I||O||!!te||s||!!h.enabled,onActive:i=>{z(i),i&&H()},onSaved:async()=>{await de(),H(),t()}},n),d==="fields"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:J||s||h.enabled,className:"card tencent-sheet-panel",children:[e.jsxs("div",{className:"add-field-toggle",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"已绑定的业务字段"}),e.jsx("p",{className:"hint",children:"取数、月份和填写位置共用本次业务日期。"})]}),e.jsx("button",{className:"secondary",onClick:()=>g(!C),children:"+ 添加业务字段"})]}),C&&e.jsxs("div",{className:"add-field-form open",children:[e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["业务字段名称",e.jsx("input",{value:G,placeholder:"例如：合格数量",onChange:i=>ne(i.target.value)})]}),e.jsxs("label",{children:["单位（可选）",e.jsx("input",{value:re,placeholder:"例如：件",onChange:i=>Q(i.target.value)})]})]}),e.jsx("button",{className:"primary",disabled:!G.trim(),onClick:()=>_("新增业务字段",async()=>{var F,Z;H();const i=await M("tencentSheet.addField",{id:n,name:G,unit:re});v(i),K(""),he(((Z=(F=i.config.fields)==null?void 0:F.at(-1))==null?void 0:Z.id)??""),ne(""),Q(""),g(!1),t()}),children:"下一步 · 选择数据库"}),e.jsx("button",{className:"ghost",onClick:()=>g(!1),children:"取消"})]}),!X.length&&e.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),e.jsx("div",{className:"field-list",children:X.map(i=>{var F;return e.jsxs("div",{className:"field-row",children:[e.jsxs("span",{children:[e.jsxs("strong",{children:[i.name,i.unit?`（${i.unit}）`:""]}),e.jsxs("small",{className:"tencent-control-state",children:[(F=U.rules)!=null&&F[i.id]?"位置已示范":"待示范位置"," · ",i.notion?`${i.notion.sourceName??"Teable"} / ${i.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"ghost",disabled:!le||!i.notion,onClick:()=>{K(i.id),H()},"aria-label":`示范位置：${i.name}`,children:"示范位置"}),e.jsx("button",{className:"ghost",onClick:()=>{he(i.id),K(""),H()},"aria-label":`绑定数据：${i.name}`,children:"绑定数据"}),e.jsx("button",{className:"btn-danger-ghost",onClick:()=>_("删除业务字段",async()=>{H(),v(await M("tencentSheet.deleteField",{id:n,fieldId:i.id})),se===i.id&&K(""),t()}),"aria-label":`删除：${i.name}`,children:"删除"})]})]},i.id)})})]}),(ce||te)&&e.jsxs("div",{ref:Se,children:[ce&&!te&&e.jsx(bn,{id:n,businessDate:T&&o?o:h.businessDate,metrics:[{value:ce.id,label:ce.name}],initialMetric:ce.id,rules:U.rules,fixedSheet:U.sheetMode==="fixed",disabled:!!I||s||m,run:_,onActive:i=>{x(i),i&&H()},onSaved:async()=>{await de(),H(),K(""),$("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),t()}},`${n}:${ce.id}:${JSON.stringify(U.rules)}`),te&&e.jsx(vn,{id:n,field:te,continueToTeaching:le&&!((Ee=U.rules)!=null&&Ee[te.id]),disabled:!!I,onCancel:()=>he(""),onSave:i=>_("保存数据绑定",()=>nn(te,i))},te.id)]})]}),d==="rule"&&e.jsx(e.Fragment,{children:e.jsx(kn,{rule:U.businessDateRule??{kind:"relative",offsetDays:-1},schedule:U.executionSchedule??Oe,disabled:J||!!h.enabled,onChange:(i,F)=>be({...U,businessDateRule:i,executionSchedule:F})})}),s&&d==="rule"&&e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"primary",disabled:J,onClick:()=>_("保存任务配置",async()=>{await ye(),$("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"})}),d==="test"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("h2",{children:"运行测试"}),e.jsx("div",{className:"segmented",role:"group","aria-label":"测试模式",children:[{id:"front",label:"前台测试"},{id:"back",label:"后台自动测试"}].map(i=>e.jsx("button",{"aria-pressed":l===i.id,disabled:J,className:l===i.id?"active":"",onClick:()=>b(i.id),children:i.label},i.id))}),l==="front"&&e.jsxs("fieldset",{disabled:J||s,className:"test-mode active tencent-test-fields",children:[e.jsx("p",{className:"test-desc",children:"浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。"}),e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:T,onChange:i=>{P(i.target.checked),H()}}),"指定补填日期"]}),T?e.jsx(pe,{label:"本次业务日期",disabled:!!I,value:o,onChange:i=>{w(i),H()}}):e.jsxs("p",{children:["按已保存规则计算的业务日期：",(Y==null?void 0:Y.date)??h.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),e.jsx("button",{className:"secondary",disabled:!X.length||T&&!o||X.some(i=>{var F;return!((F=U.rules)!=null&&F[i.id])||!i.notion}),onClick:()=>_("获取 Teable 数据",async()=>{H(),Ne(await M("tencentSheet.fetch",{id:n,businessDate:T?o:void 0},3e5)),$("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Teable 数据"}),I==="获取 Teable 数据"&&!Y&&e.jsx(we,{rows:4,label:"正在加载业务数据"}),Y&&e.jsxs("div",{className:"tencent-sheet-table",children:[e.jsxs("p",{children:["业务日期：",Y.date]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"业务字段"}),e.jsx("th",{children:"数值"}),e.jsx("th",{children:"来源与范围"}),e.jsx("th",{children:"记录数"})]})}),e.jsx("tbody",{children:Y.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.name}),e.jsxs("td",{children:[i.value," ",i.unit]}),e.jsxs("td",{children:[i.source," · ",i.period]}),e.jsx("td",{children:i.recordCount})]},i.id))})]})]}),e.jsx("button",{className:"primary",disabled:!X.length||T&&!o||!Y,onClick:()=>_("检查填报位置",async()=>{D(void 0);const i=await M("tencentSheet.inspect",{id:n,dataToken:Y==null?void 0:Y.dataToken,businessDate:(Y==null?void 0:Y.date)??(T?o:void 0)},3e5);D(i),$(i.message),t()}),children:"检查本次数据与位置"})]}),l==="back"&&e.jsxs("fieldset",{disabled:J||s,className:"test-mode active tencent-test-fields",children:[e.jsxs("p",{className:"hint",children:["本次业务日期：",T?o||"请在前台测试选择补填日期":h.businessDate??"执行时确定",T?"（指定补填日期）":"（按已保存规则）"]}),e.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),e.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Teable。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),e.jsx("button",{className:"primary",disabled:!X.length||X.some(i=>{var F;return!i.notion||!((F=U.rules)!=null&&F[i.id])})||T&&!o,onClick:()=>_("后台取数、填报并确认保存",async()=>{H();try{const i=await M("tencentSheet.backgroundTest",{id:n,businessDate:T?o:void 0},6e5);$(i.message)}finally{await de(),t()}}),children:"后台自动测试并填写"}),h.enabled&&e.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]})]}),l==="front"&&f&&e.jsxs("section",{className:"card tencent-sheet-panel",children:[e.jsx("h3",{children:"确认填报"}),e.jsxs("p",{children:["业务日期：",f.date," · ",f.sheet]}),e.jsx("div",{className:"tencent-sheet-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"项目"}),e.jsx("th",{children:"位置"}),e.jsx("th",{children:"原内容"}),e.jsx("th",{children:"本次填报"})]})}),e.jsx("tbody",{children:f.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.label}),e.jsx("td",{children:i.address}),e.jsx("td",{children:i.current||"空白"}),e.jsx("td",{children:i.value})]},i.address))})]})}),e.jsx("p",{children:f.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),e.jsxs("button",{className:"primary",disabled:J||!f.token||f.conflict,onClick:()=>_("填报并确认保存",async()=>{const i=f;D(void 0);const F=await M("tencentSheet.write",{id:n,dataToken:Y==null?void 0:Y.dataToken,businessDate:i.date,token:i.token},31e4);$(F.message),t()}),children:["确认填报以上 ",f.rows.length," 项"]})]}),e.jsxs("details",{className:"tencent-run-history",children:[e.jsx("summary",{onClick:()=>{E||_("读取运行记录",async()=>{const i=await M("tencentSheet.runs",{id:n});c(i.runs)})},children:"运行记录"}),I==="读取运行记录"&&!E&&e.jsx(we,{label:"正在加载运行记录"}),E==null?void 0:E.map(i=>e.jsxs("div",{children:[e.jsxs("p",{children:[i.time," · ",i.businessDate," · ",i.status]}),e.jsx("p",{children:i.error||i.message})]},i.id)),(E==null?void 0:E.length)===0&&e.jsx("p",{children:"暂无运行记录"})]})]})]},d),e.jsxs("div",{className:`toast ${S?"show":""} ${q?"error":""}`,role:q?"alert":"status",children:[S,S&&e.jsx("button",{className:"ghost","aria-label":"关闭提示",onClick:()=>$(""),children:"×"})]}),I&&e.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[e.jsx(me,{className:"spin"}),I,"… 请等待操作结束"]})]})})}const Ye=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,He=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,Sn=`<!doctype html>\r
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
`,_e=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Je=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Ge=`/* Static neutral placeholders: never animate position, size or opacity on arrival. */\r
.skeleton-block, .skeleton-text, .skeleton-page .skeleton-block { background: #e7e5e4; border-radius: var(--radius-skeleton, 20px); corner-shape: squircle; color: transparent; user-select: none; }\r
.skeleton-block { display: block; height: 16px; width: 100%; flex-shrink: 0; }\r
.skeleton-title { width: 180px; height: 28px; }\r
.skeleton-short { width: 88px; }\r
.skeleton-icon { width: 44px; height: 44px; }\r
.skeleton-button { width: 116px; height: 44px; }\r
.skeleton-toggle { width: 42px; height: 24px; }\r
.skeleton-input { height: 44px; flex-shrink: 1; }\r
.skeleton-lines { display: grid; gap: 16px; padding: 16px 0; min-width: 0; width: 100%; }\r
.plan-inspection > .skeleton-lines { min-height: 250px; }\r
.skeleton-lines .skeleton-block:nth-child(even) { width: 78%; }\r
.skeleton-lines .skeleton-block:last-child { width: 58%; }\r
.skeleton-field { display: grid; gap: 8px; }\r
.skeleton-settings-content { display: grid; gap: 24px; }\r
.skeleton-page .daily-job-card { cursor: default; pointer-events: none; }\r
.skeleton-page .automation-task-name { display: inline-block; }\r
.skeleton-page .skeleton-pane { padding: 24px; min-height: 300px; min-width: 0; }\r
.skeleton-page .skeleton-pane + .skeleton-pane { border-left: 1px solid var(--border); }\r
.skeleton-actions { display: flex; justify-content: flex-end; margin-top: 24px; }\r
.skeleton-page .skeleton-steps .step-circle, .skeleton-page .skeleton-steps .step-line, .skeleton-steps .step > span { background: #e7e5e4; color: transparent; border-color: transparent; box-shadow: none; animation: none; }\r
.skeleton-steps .step > span { border-radius: var(--radius-skeleton, 20px); corner-shape: squircle; }\r
.skeleton-steps .step-line::before, .skeleton-steps .step-line::after { display: none; }\r
.skeleton-task { padding: 30px 36px; max-width: 1420px; margin: auto; }\r
.skeleton-task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }\r
.skeleton-workspace { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); min-height: 440px; border: 1px solid #e7e5e4; border-radius: var(--radius-skeleton, 20px); corner-shape: squircle; background: white; overflow: hidden; }\r
.skeleton-workspace > div { padding: 24px; min-width: 0; }\r
.skeleton-workspace > div + div { border-left: 1px solid #e7e5e4; }\r
.skeleton-task-tencent { max-width: 1160px; }\r
.message-template-host { position: relative; }\r
.message-template-host > .skeleton-task { position: absolute; inset: 0; background: var(--canvas); }\r
.desktop-shell-content { scrollbar-gutter: stable; }\r
.plan-content, .meeting-content, .report-content, .settings-main { scrollbar-gutter: stable; }\r
.picker-trigger[aria-busy="true"] > span { color: transparent; background: #e7e5e4; border-radius: var(--radius-skeleton, 20px); corner-shape: squircle; min-width: 55%; height: 16px; }\r
.picker-trigger[aria-busy="true"] { opacity: 1; }\r
/* The iframe adapters use the same blocks without replacing editable DOM nodes. */\r
.skeleton-region { position: relative; min-height: 100px; color: transparent !important; }\r
.skeleton-region > :not(.skeleton-region-placeholder) { visibility: hidden; }\r
.skeleton-region-placeholder { position: absolute; inset: 16px 0; width: 85%; display: grid; align-content: start; gap: 18px; pointer-events: none; }\r
.skeleton-region-placeholder .skeleton-block { height: 14px; }\r
.tencent-login-qr > .skeleton-block { width: 100%; height: 100%; }\r
\r
/* Shared surfaces also need an explicit shape: some module cards predate squircles. */\r
.skeleton-page :is(.workspace-panel, .weld-plan-card, .database-query-panel, .daily-job-card, .plan-workspace, .meeting-workspace, .report-workspace) {\r
  border-radius: var(--radius-skeleton, 20px);\r
  corner-shape: squircle;\r
}\r
`;function ee(n,t){if(!n)return;t&&(n.style.minHeight=`${Math.max(n.getBoundingClientRect().height,100)}px`),n.classList.toggle("skeleton-region",t);const r=n.querySelector(":scope > .skeleton-region-placeholder");if(t){if(n.setAttribute("aria-busy","true"),!r){const y=n.ownerDocument.createElement("span");y.className="skeleton-region-placeholder",y.setAttribute("aria-hidden","true");for(let p=0;p<3;p++){const d=n.ownerDocument.createElement("span");d.className="skeleton-block",y.append(d)}n.append(y)}}else n.removeAttribute("aria-busy"),r==null||r.remove()}const xe=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(t=>({key:t.key,label:t.label,spec:{granularity:t.granularity,yearOffset:n}}))),Ke={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function Nn(n){return Ke[n]||n}function Pe(n){const t=[[]];function r(p){p.replace(/\u00a0/g," ").split(`
`).forEach((d,a)=>{var b;if(a&&t.push([]),!d)return;const l=t.at(-1);((b=l.at(-1))==null?void 0:b.type)==="text"?l.at(-1).text+=d:l.push({type:"text",text:d})})}function y(p){var d;if(p.nodeType===3){r(p.textContent||"");return}if(p instanceof n.ownerDocument.defaultView.HTMLElement){if(p.dataset.key){const a=Nn(p.dataset.key);t.at(-1).push({type:a.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:a,label:p.textContent||"",...p.dataset.legacySpec?{dateRangeSpec:JSON.parse(p.dataset.legacySpec)}:{}}});return}if(p.tagName==="BR"){r(`
`);return}p!==n&&["DIV","P"].includes(p.tagName)&&p.childNodes.length===1&&((d=p.firstChild)==null?void 0:d.nodeName)==="BR"||Array.from(p.childNodes).forEach((a,l)=>{l&&a.nodeType===1&&["DIV","P"].includes(a.tagName)&&r(`
`),y(a)})}}return y(n),{text:t.map(p=>p.map(d=>d.type==="text"?d.text:d.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:t.map(p=>({type:"paragraph",content:p}))})}}function Cn(n,t,r,y){const p=[...r,...Object.entries(Ke).map(([a,l])=>({key:l,label:a==="system.date"?"业务日期":a==="system.year"?"业务年份":a==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(a=>a.field||a.metric==="date").sort((a,l)=>l.key.length-a.key.length);let d=t;for(;d;){const a=p.map(l=>({d:l,index:d.indexOf(l.key)})).filter(l=>l.index>=0).sort((l,b)=>l.index-b.index)[0];if(!a){n.append(n.ownerDocument.createTextNode(d));break}a.index&&n.append(n.ownerDocument.createTextNode(d.slice(0,a.index))),n.append(y(a.d)),d=d.slice(a.index+a.d.key.length)}}function En(n,t,r,y){if(!t)return!1;let p;try{p=JSON.parse(t)}catch{return!1}if(p.type!=="doc")return!1;function d(a){var l,b,C,g;if(a.type==="text"){n.append(n.ownerDocument.createTextNode(a.text||""));return}if(a.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(a.type==="fieldToken"||a.type==="dateToken"){const E=((l=a.attrs)==null?void 0:l.placeholder)||"";let c=r.find(v=>v.key===E);c||(c={key:E,label:a.type==="dateToken"?"业务日期":((b=a.attrs)==null?void 0:b.label)||"已有数据",metric:a.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((C=a.attrs)==null?void 0:C.label)||""},r.push(c));const h=y(c);(g=a.attrs)!=null&&g.dateRangeSpec&&(h.dataset.legacySpec=JSON.stringify(a.attrs.dateRangeSpec)),n.append(h);return}(a.content||[]).forEach((E,c)=>{a.type==="doc"&&c&&n.append(n.ownerDocument.createTextNode(`
`)),d(E)})}return d(p),!0}function Xe({id:n,back:t,changed:r,openSettings:y}){const p=u.useRef(null),[d,a]=u.useState(""),[l,b]=u.useState(!0);return u.useEffect(()=>{let C=!1;const g=p.current;return b(!0),a(""),g.onload=()=>{var E,c;!C&&((E=g.contentDocument)!=null&&E.getElementById("editor"))&&Promise.resolve((c=g.contentDocument.fonts)==null?void 0:c.ready).then(()=>{C||b(!1)})},M("daily.get",{id:n}).then(E=>{if(C)return;const c=Tn(E,{back:t,changed:r,openSettings:y});g.dailyRuntime=c,g.srcdoc=Sn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(_e,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Je,window.location.href).href)}).catch(E=>{C||a(String(E.message||E))}),()=>{var E;C=!0,g.onload=null,(E=g.dailyRuntime)==null||E.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[d&&e.jsx("p",{role:"alert",children:d}),e.jsx("iframe",{ref:p,title:"日报消息模板",style:{visibility:l?"hidden":void 0}}),l&&!d&&e.jsx(je,{})]})}function Tn(n,t){var P;let r=!1,y=!1,p,d,a=Promise.resolve(),l=0,b;const C=new Date,g=n.fields.map(o=>{var w,f,D;return{key:o.placeholder,label:o.label.replace(" · ",""),metric:`${o.databaseId||((w=o.binding)==null?void 0:w.dataSourceId)}:${o.businessId||((f=o.binding)==null?void 0:f.businessMetricId)}`,scope:((D=xe.find(s=>JSON.stringify(s.spec)===JSON.stringify(o.dateRangeSpec)))==null?void 0:D.key)||"legacy",keywords:o.label,field:o}}),E=[];let c=(P=n.metricSourceIds)!=null&&P.length?n.metricSourceIds:[...new Set(n.fields.map(o=>{var w;return o.databaseId||((w=o.binding)==null?void 0:w.dataSourceId)}).filter(Boolean))];const h=new Map(n.fields.map(o=>[o.placeholder,o])),v=new Map;function I(o){const w=d==null?void 0:d.querySelector("#preview-status");w&&(w.textContent=o)}function L(){d==null||d.querySelectorAll("[data-send]").forEach(o=>o.disabled=y||!n.notificationConfigured)}async function S(o){o.text===n.draftTemplate&&o.document===n.draftTemplateDocument||(await M("daily.saveTemplate",{id:k,...o}),n.draftTemplate=o.text,n.draftTemplateDocument=o.document)}async function $(){var o;try{const w=await M("daily.get",{id:k});if(r)return;n.notificationConfigured=w.notificationConfigured,n.sources=w.sources,L(),(o=d==null?void 0:d.querySelector("[data-notification-notice]"))==null||o.toggleAttribute("hidden",!!n.notificationConfigured),await q()}catch(w){I(String(w))}}async function q(){var w;const o=await Promise.allSettled(c.map(async f=>({sourceId:f,metrics:(await an(k,f)).metrics})));if(!r){g.splice(0,g.length,...g.filter(f=>f.field)),E.length=0;for(const f of o)if(f.status==="fulfilled")for(const D of f.value.metrics){const s=`${f.value.sourceId}:${D.id}`;E.push([s,D.name,D.name,0]);const N=D.granularity==="monthly"?[{key:"month",label:"本月"}]:xe;for(const A of N)g.push({key:`${s}:${A.key}`,metric:s,scope:A.key,label:D.granularity==="monthly"?D.name:A.label+D.name,keywords:D.name+" "+A.label+" "+(((w=n.sources.find(j=>j.id===f.value.sourceId))==null?void 0:w.name)||""),sourceId:f.value.sourceId,metricId:D.id});for(const A of g.filter(j=>j.metric===s&&j.field))A.sourceId=f.value.sourceId,A.metricId=D.id}o.some(f=>f.status==="rejected")?I("部分指标目录读取失败，请到系统设置刷新数据库。"):c.length||I("请在右上角任务设置中配置本任务的指标范围。")}}const k=n.id,T={dirty(){l++,b=void 0},id:k,name:n.name,sendTime:n.sendTime,businessDate:`${C.getFullYear()}-${String(C.getMonth()+1).padStart(2,"0")}-${String(C.getDate()).padStart(2,"0")}`,definitions:g,metrics:E,value:o=>{var w,f,D;return o.metric==="date"?"业务日期":((w=b==null?void 0:b.fieldValues)==null?void 0:w[o.key])||((D=b==null?void 0:b.fieldValues)==null?void 0:D[((f=g.find(s=>s.field&&s.metric===o.metric&&s.scope===o.scope))==null?void 0:f.key)||""])||""},mount:(o,w)=>{En(o,n.draftTemplateDocument,g,w)||Cn(o,n.draftTemplate,g,w)},async materialize(o){var A;if(o.field||o.metric==="date")return o;const w=g.find(j=>j.metric===o.metric&&j.sourceId),f=o.sourceId||(w==null?void 0:w.sourceId),D=o.metricId||(w==null?void 0:w.metricId);if(!f||!D)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const s=JSON.stringify([f,D,o.scope,o.label]);let N=v.get(s);return N||(N=M("daily.addField",{id:k,sourceId:f,metricId:D,placeholder:"",displayName:o.label,...o.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(A=xe.find(j=>j.key===o.scope))==null?void 0:A.spec}}).then(({field:j})=>{h.set(j.placeholder,j);const O={...o,key:j.placeholder,field:j,sourceId:f,metricId:D};return g.some(x=>x.key===O.key)||g.push(O),t.changed(),O}).catch(j=>{throw v.delete(s),j}),v.set(s,N)),N},save(o){const w=Pe(o),f=a.catch(()=>{}).then(()=>r?void 0:S(w));return a=f,f},preview(o,w){const f=d==null?void 0:d.querySelector("#preview");ee(f,!0);const D=Pe(o),s=++l,N=a.catch(()=>{}).then(async()=>{if(r||s!==l)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await S(D);const A=await M("daily.preview",{id:k,businessDate:w},12e4),j={...A,errors:A.fieldErrors||[],message:A.succeeded?"已生成 · "+w:A.message};return s===l&&!r&&(b=j),j}).finally(()=>ee(f,!1));return a=N,N},async send(o,w,f){if(!y){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");y=!0,L();try{await T.save(o);const D=await M(w==="test"?"daily.test":"daily.sendToday",w==="test"?{id:k,businessDate:f}:{id:k},12e4);if(!D.succeeded)throw new Error(D.message||"发送失败，请查看运行记录");I(D.alreadySent?"今日当前内容已发送":w==="test"?"测试发送成功":"今日消息已发送"),t.changed()}finally{y=!1,L()}}},configureAdvanced(o,w){const f=g.some(N=>N.metric===o&&N.scope==="month"),D=f?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];w.replaceChildren(...D.map(N=>new Option(N.label,N.key)));const s=w.ownerDocument.querySelector("#scope-year");s&&(s.disabled=f,s.value="0")},resolveAdvanced(o,w){return o==="month"?"month":xe.find(f=>f.spec.granularity===o&&f.spec.yearOffset===Number(w)).key},async saveBasics(o,w){const f=Array.from((d==null?void 0:d.querySelectorAll("[data-context-source]:checked"))||[]).map(D=>D.value);await M("daily.saveBasics",{id:k,name:o,sendTime:w,metricSourceIds:f}),n.name=o,n.sendTime=w,c=f,T.name=o,await q(),t.changed()},connect(o){var W;d=o,o.title=n.name,o.querySelector("#runs p").textContent="";const w=o.querySelector("header > span");w.removeAttribute("aria-hidden"),w.setAttribute("role","button"),w.setAttribute("tabindex","0"),w.setAttribute("aria-label","返回任务列表");const f=async()=>{const m=o.querySelector("#editor");m.contentEditable="false",l++;try{await T.save(m),t.back()}catch(z){I(String(z)),m.contentEditable="true"}};w.addEventListener("click",f),w.addEventListener("keydown",m=>{m.key==="Enter"&&f()});const D=o.querySelector("#settings"),s=o.createElement("fieldset");s.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const N=o.createElement("legend");N.textContent="本任务的指标范围",s.append(N);for(const m of n.sources){const z=o.createElement("label");z.style.cssText="display:flex;gap:8px;margin:8px 0";const R=o.createElement("input");R.type="checkbox",R.value=m.id,R.dataset.contextSource="",R.checked=c.includes(m.id),R.style.width="auto",z.append(R,o.createTextNode(m.name)),s.append(z)}(W=D.querySelector("p"))==null||W.replaceWith(s);const A=o.createElement("button");A.textContent="数据库设置",A.type="button",A.onclick=()=>{var m;D.close(),(m=t.openSettings)==null||m.call(t)},s.after(A);const j=o.querySelector("footer");for(const[m,z]of[["test","测试发送"],["today","发送今日消息"]]){const R=o.createElement("button");R.textContent=z,R.dataset.send=m,R.onclick=async()=>{const V=o.querySelector("#editor");V.contentEditable="false";try{await T.send(V,m,o.querySelector("#date").value)}catch(G){I(String(G))}finally{V.contentEditable="true"}},j.append(R)}const O=o.createElement("style");O.textContent=Ye+`
`+He+`
`+Ge+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,o.head.append(O);const x=o.createElement("span");x.className="production-message-demo",x.hidden=!0,o.body.append(x),p=Ue.createRoot(o.querySelector("#date-picker")),p.render(e.jsx($n,{input:o.querySelector("#date")})),window.addEventListener("production-settings-updated",$);const B=o.querySelector("#runs");if(B.ontoggle=async()=>{if(!B.open)return;const m=B.querySelector("p");ee(m,!0);try{const z=await M("daily.runs",{id:k});m.textContent=z.runs.length?"":"暂无运行记录";for(const R of z.runs){const V=o.createElement("div");V.textContent=`${R.time} · ${R.status} · ${R.businessDate}${R.error?" · "+R.error:""}`,m.append(V)}}catch(z){m.textContent=String(z)}finally{ee(m,!1)}},!n.notificationConfigured){const m=o.createElement("div");m.className="notice",m.dataset.notificationNotice="",m.append(o.createTextNode("通知渠道尚未配置。 "));const z=o.createElement("button");z.textContent="通知设置",z.onclick=t.openSettings||null,m.append(z),o.querySelector("#message").before(m)}L(),q().catch(m=>I(String(m)))},dispose(){r=!0,l++,p==null||p.unmount(),window.removeEventListener("production-settings-updated",$)}};return T}function $n({input:n}){const[t,r]=u.useState(n.value);return e.jsx(pe,{value:t,onChange:y=>{var p;r(y),n.value=y,n.dispatchEvent(new(((p=n.ownerDocument.defaultView)==null?void 0:p.Event)||Event)("change",{bubbles:!0}))}})}const Dn=`<!doctype html>\r
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
`,Be=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Ze({id:n,...t}){const r=u.useRef(null),[y,p]=u.useState(""),[d,a]=u.useState(!0);return u.useEffect(()=>{let l=!1,b;const C=r.current;return p(""),a(!0),M("notionFill.get",{id:n}).then(g=>{l||(b=An(g,t),C.onload=()=>{var E,c;if(!l&&((E=C.contentDocument)!=null&&E.getElementById("date-picker")))try{b.connect(C.contentDocument),Promise.resolve((c=C.contentDocument.fonts)==null?void 0:c.ready).then(()=>{l||a(!1)})}catch(h){p(String(h))}},C.srcdoc=Dn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(_e,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Je,window.location.href).href))}).catch(g=>{l||p(String(g.message||g))}),()=>{l=!0,C.onload=null,b==null||b.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[y&&e.jsx("p",{role:"alert",children:y}),e.jsx("iframe",{ref:r,title:"原材料自动入库",style:{visibility:d?"hidden":void 0}}),d&&!y&&e.jsx(je,{kind:"notion"})]})}function An(n,t){let r={...n,runTime:n.runTime||"00:00"},y,p,d=!1,a=!1,l=0,b=0,C=Be(),g,E=r.isEnabled;const c=m=>y.getElementById(m),h=m=>c(m),v=m=>c(m),I=m=>c(m),L=m=>m instanceof Error?m.message:String(m),S=m=>m.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function $(m,z=!1){c("feedback").textContent=m,c("feedback").className=z?"callout error":""}function q(){return!!(r.sourcePageUrl&&r.username&&r.passwordConfigured)}function k(){p==null||p.render(e.jsx(pe,{value:C,disabled:a,onChange:o}))}function T(){for(const m of["preview","source-test","yesterday","settings-open","back","confirm-run"])v(m).disabled=a;v("preview").disabled=a||!q()||!r.notionConfigured,v("source-test").disabled=a||!q(),v("run").disabled=a||!g,y.querySelectorAll("#settings button, #settings input").forEach(m=>m.disabled=a),v("toggle").disabled=a||!r.schedulingAvailable,v("preview").textContent=a?"处理中…":"生成预览",c("name").textContent=r.name,c("enabled").textContent=r.isEnabled?r.schedulerInstalled?"已启用":"计划异常":"未启用",c("target-name").textContent=r.targetDataSourceName,c("settings-target-name").textContent=r.targetDataSourceName,h("password").placeholder=r.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",k()}function P(m="尚未生成预览"){l++,g=void 0,c("source-empty").hidden=!1,c("source-values").hidden=!0,c("source-error").hidden=!0,c("record").hidden=!0,c("target-status").hidden=!0,c("target-empty").hidden=!1,c("target-empty").querySelector("strong").textContent=m,c("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",v("run").textContent="执行本日期",v("run").disabled=!0,I("confirm").open&&I("confirm").close()}function o(m){a||(C=m,h("date").value=m,P("待重新预览"),$(""),k())}function w(m){c("source-empty").hidden=!0,c("source-values").hidden=!1;for(const[z,R]of[["plate",m.plateWeight],["section",m.sectionWeight],["total",m.totalWeight]])c(z).textContent=S(R)}function f(m){w(m),c("target-empty").hidden=!0,c("record").hidden=!1,c("record-title").textContent=`${m.businessDate} 入库`,c("record-date").textContent=m.businessDate,c("record-plate").textContent=`${S(m.plateWeight)} 吨`,c("record-section").textContent=`${S(m.sectionWeight)} 吨`,c("target-status").hidden=!1,c("target-status").textContent=m.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",v("run").textContent=m.targetRecordExists?"验证查重":"执行本日期"}function D(m){c("run-count").textContent=m.length?`· ${m.length}`:"";const z=m.map(R=>{const V=y.createElement("div");V.className="run";const G=y.createElement("span");G.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[R.source]||R.source;const ne=y.createElement("div");ne.textContent=R.error||R.message||(R.status==="created"?"已新增":R.status==="failed"?"执行失败":"已检查"),R.status==="failed"&&(ne.style.color="#B91C1C");const re=y.createElement("p");re.textContent=R.status==="failed"?R.businessDate:`${R.businessDate} · 板材 ${S(R.plateWeight)} 吨 · 型材 ${S(R.sectionWeight)} 吨`,ne.append(re);const Q=y.createElement("small");return Q.textContent=R.time,V.append(G,ne,Q),V});c("runs-body").replaceChildren(...z),m.length||(c("runs-body").textContent="暂无运行记录")}async function s(){const m=++b;ee(c("runs-body"),!0);try{const z=await M("notionFill.runs",{id:r.id});!d&&m===b&&D(z.runs)}catch(z){!d&&m===b&&(c("runs-body").textContent=`运行记录读取失败：${L(z)}；重新展开可重试。`)}finally{!d&&m===b&&ee(c("runs-body"),!1)}}function N(){Promise.resolve(t.changed()).catch(()=>{})}async function A(m){if(a||!C)return;a=!0,P("正在读取…"),ee(c("source-empty"),!0),ee(c("target-empty"),!0);const z=l;T(),$("");try{const R=await M(m?"notionFill.testSource":"notionFill.test",{id:r.id,businessDate:C},12e4);if(d||z!==l)return;if(!R.succeeded)throw new Error(R.message||"读取失败");m?(w(R),c("target-empty").querySelector("strong").textContent="尚未检查数据库",c("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(r.validated=!0,g=R,f(R)),N()}catch(R){if(d||z!==l)return;P("本次预览未完成"),c("source-error").hidden=!1,c("source-error").textContent=L(R)}finally{d||(ee(c("source-empty"),!1),ee(c("target-empty"),!1),a=!1,T(),s())}}async function j(){if(a||!g||!I("confirm").open)return;const m=g.businessDate;I("confirm").close(),a=!0,T(),$("");try{const z=await M("notionFill.runNow",{id:r.id,businessDate:m},12e4);if(d)return;if(!z.succeeded)throw new Error(z.message||"执行失败");g={...g,targetRecordExists:!0},c("target-status").textContent=z.message,v("run").textContent="验证查重",$(z.created?"数据库写入成功。":"该日期已有记录，本次已跳过。"),N()}catch(z){d||(P("执行未完成，请重新预览"),$(L(z),!0))}finally{d||(a=!1,T(),s())}}function O(){return h("task-name").value.trim()!==r.name||h("url").value.trim().replace(/\/+$/,"")!==r.sourcePageUrl||h("username").value.trim()!==r.username||!!h("password").value}function x(){v("toggle").setAttribute("aria-checked",String(E)),c("schedule-hint").textContent=r.schedulingAvailable?O()?"配置已修改：保存后需重新预览，再启用。":r.isEnabled&&!r.schedulerInstalled?r.schedulerMessage:r.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function B(m){if(m.preventDefault(),a)return;const z=h("task-name").value.trim(),R=h("username").value.trim();if(!z||!R){c("settings-note").textContent="任务名称和用户名不能为空。";return}const V=O(),G=h("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(G)){c("settings-note").textContent="请选择有效的执行时间。";return}const ne=V||G!==r.runTime,re=V?!1:E;let Q=!1;a=!0,T();try{if(ne){const K=h("url").value.trim().replace(/\/+$/,""),oe=h("password").value;if(await M("notionFill.save",{id:r.id,name:z,sourcePageUrl:K,username:R,password:oe,runTime:G}),d)return;Q=!0,r={...r,name:z,sourcePageUrl:K,username:R,runTime:G,passwordConfigured:r.passwordConfigured||!!oe,isEnabled:V?!1:r.isEnabled,validated:V?!1:r.validated},h("password").value="",V&&P("配置已修改，请重新预览")}if(re!==r.isEnabled){const K=await M("automation.setEnabled",{id:r.id,taskType:"notion_fill",enabled:re});if(d)return;if(r.isEnabled=K.enabled,K.enabled!==re)throw new Error(K.message||"定时任务状态未更新");Q=!0}const se=await M("notionFill.get",{id:r.id});if(d)return;r=se,I("settings").close(),$(V?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(se){d||(c("settings-note").textContent=`${Q?"设置已更新，但后续操作失败：":""}${L(se)}`)}finally{d||(a=!1,E=r.isEnabled,T(),x(),Q&&N())}}async function W(){if(a||d)return;const m=l;try{const z=await M("notionFill.get",{id:r.id});if(d||a||m!==l)return;r=z,P("系统设置已更新，请重新预览"),T(),$(r.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"数据库连接尚未配置，仍可仅测试 93 读取。")}catch(z){d||$(L(z),!0)}}return{connect(m){p==null||p.unmount(),y=m;const z=y.createElement("style");z.textContent=Ye+`
`+He+`
`+Ge+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,y.head.append(z);const R=y.createElement("span");R.className="production-message-demo",R.hidden=!0,y.body.append(R),p=Ue.createRoot(c("date-picker")),h("date").value=C,h("date").onchange=()=>o(h("date").value),v("yesterday").onclick=()=>o(Be()),v("preview").onclick=()=>{A(!1)},v("source-test").onclick=()=>{A(!0)},v("back").onclick=t.back,v("run").onclick=()=>{a||!g||(c("confirm-title").textContent=g.targetRecordExists?"验证查重":"执行本日期",c("confirm-copy").textContent=g.targetRecordExists?`${g.businessDate} 已有记录，本次执行应跳过。`:`将向“${r.targetDataSourceName}”新增 ${g.businessDate} 的记录：板材 ${S(g.plateWeight)} 吨，型材 ${S(g.sectionWeight)} 吨。`,I("confirm").showModal())},v("confirm-run").onclick=()=>{j()},v("settings-open").onclick=()=>{h("task-name").value=r.name,h("url").value=r.sourcePageUrl,h("username").value=r.username,h("password").value="",h("run-time").value=r.runTime,h("password").required=!r.passwordConfigured,c("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",E=r.isEnabled,x(),I("settings").showModal()},v("toggle").onclick=()=>{if(r.schedulingAvailable){if(!E&&(!r.validated||O())){c("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}E=!E,x()}};for(const V of["task-name","url","username","password"])h(V).oninput=()=>{O()&&(E=!1),x()};c("settings-form").onsubmit=V=>{B(V)},I("settings").onclose=()=>{h("password").value=""},I("settings").oncancel=V=>{a&&V.preventDefault()},y.querySelectorAll("[data-close]").forEach(V=>V.onclick=()=>{a||I(V.dataset.close).close()}),v("system-settings").hidden=!t.openSettings,v("system-settings").onclick=()=>{var V;I("settings").close(),(V=t.openSettings)==null||V.call(t)},y.querySelector(".runs").ontoggle=V=>{V.currentTarget.open&&s()},window.addEventListener("production-settings-updated",W),P(),T(),q()?r.notionConfigured||$("数据库连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):$("请先在任务设置中补全 93 系统连接配置。")},dispose(){d=!0,l++,b++,p==null||p.unmount(),window.removeEventListener("production-settings-updated",W)}}}function In({onCreated:n,onBack:t,onCancel:r}){const[y,p]=u.useState(2),[d,a]=u.useState("日报任务"),[l,b]=u.useState("17:30"),[C,g]=u.useState(!1),[E,c]=u.useState("");async function h(){g(!0),c("");try{const v=await M("daily.create",{name:d.trim(),sendTime:l});await n(v)}catch(v){c(v instanceof Error?v.message:String(v))}finally{g(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(Rn,{current:y}),E&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:E})]})}),y===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:d,autoFocus:!0,onChange:v=>a(v.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:t,children:[e.jsx(ue,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!d.trim(),onClick:()=>p(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"日报必要配置"}),e.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),e.jsxs("label",{children:["每天发送时间",e.jsx("input",{type:"time",value:l,onChange:v=>b(v.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"任务类型"}),e.jsx("strong",{children:"日报推送"}),e.jsx("span",{children:"创建后继续"}),e.jsx("strong",{children:"消息内容 → 预览与测试"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:C,onClick:()=>p(2),children:[e.jsx(ue,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:C,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:C||!l,onClick:h,children:[C&&e.jsx(me,{className:"spin"}),"创建任务"]})]})]})]})}function Rn({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function zn({onCreated:n,onBack:t,onCancel:r}){const[y,p]=u.useState(2),[d,a]=u.useState("原材料入库自动填报"),[l,b]=u.useState(""),[C,g]=u.useState(""),[E,c]=u.useState(""),[h,v]=u.useState(!1),[I,L]=u.useState("");async function S(){v(!0),L("");try{const $=await M("notionFill.create",{name:d.trim(),sourcePageUrl:l.trim(),username:C.trim(),password:E});await n($)}catch($){L($ instanceof Error?$.message:String($))}finally{v(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(qn,{current:y}),I&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:I})]})}),y===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:d,autoFocus:!0,onChange:$=>a($.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:t,children:[e.jsx(ue,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!d.trim(),onClick:()=>p(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"93 系统连接"}),e.jsx("p",{children:"凭据只归当前自动填报任务所有，并使用现有 Windows 加密存储。"})]}),e.jsxs("label",{children:["材料入库业务页面",e.jsx("input",{type:"url",value:l,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:$=>b($.target.value)})]}),e.jsxs("label",{children:["93 系统用户名",e.jsx("input",{value:C,autoComplete:"username",onChange:$=>g($.target.value)})]}),e.jsxs("label",{children:["93 系统密码",e.jsx("input",{type:"password",value:E,autoComplete:"new-password",onChange:$=>c($.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"填报目标"}),e.jsx("strong",{children:"原材料入库数据库"}),e.jsx("span",{children:"执行时间"}),e.jsx("strong",{children:"每天 00:00 · 填报前一天"}),e.jsx("span",{children:"写入方式"}),e.jsx("strong",{children:"按日期查重，仅新增"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:h,onClick:()=>p(2),children:[e.jsx(ue,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:h,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:h||!l.trim()||!C.trim()||!E,onClick:S,children:[h&&e.jsx(me,{className:"spin"}),"创建任务"]})]})]})]})}function qn({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const Qe=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Teable 取数填报。",renderCreate:n=>e.jsx(jn,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>e.jsx(We,{id:n.id,changed:n.changed},n.id),loadRuns:n=>M("tencentSheet.runs",{id:n}).then(({runs:t})=>t.map(r=>({...r,source:r.source==="background-test"?"后台自动测试":r.source==="automatic"?"定时填报":"前台测试",title:r.businessDate,details:r.message?[r.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>e.jsx(In,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>e.jsx(Xe,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("daily.runs",{id:n}).then(({runs:t})=>t.map(r=>({id:r.id,time:r.time,source:r.source,status:r.status,title:r.textSummary||`业务日期 ${r.businessDate||"—"}`,details:[`业务日期：${r.businessDate||"—"}`,`阶段：${r.stage}`,`尝试：${r.attempts}`],error:r.error})))},{taskType:"notion_fill",name:"Teable 自动填报",description:"读取 93 系统前一天入库数据并新增到 Teable。",renderCreate:n=>e.jsx(zn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Teable 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>e.jsx(Ze,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("notionFill.runs",{id:n}).then(({runs:t})=>t.map(r=>({id:r.id,time:r.time,source:r.source==="source-test"?"93读取测试":r.source==="test"?"只读测试":r.source==="manual"?"手动执行":"自动执行",status:r.status==="created"?"已新增":r.status==="checked"?"已检查":"失败",title:`${r.businessDate} · 板材 ${r.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${r.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[r.message].filter(Boolean),error:r.error})))}];function Ve(n){return Qe.find(t=>t.taskType===n)}const ve=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function Ln({openSettings:n,taskType:t=""}){var O;const[r,y]=u.useState([]),[p,d]=u.useState(!0),[a,l]=u.useState(),[b,C]=u.useState(""),[g,E]=u.useState(""),[c,h]=u.useState(),[v,I]=u.useState(),[L,S]=u.useState(),[$,q]=u.useState(!1),[k,T]=u.useState(""),[P,o]=u.useState(["daily_report","notion_fill"]),w=t?r.filter(x=>x.taskType===t):r,f=Qe.filter(x=>P.includes(x.taskType)&&(!t||x.taskType===t)),D=on(ln.dailyReport,t).name,s=()=>M("automation.list").then(x=>{x.availableTaskTypes&&o(x.availableTaskTypes);const B=Array.isArray(x.tasks)?x.tasks:r;return y(B),l(W=>W&&(B.find(m=>m.taskType===W.taskType&&m.id===W.id)||W)),B});u.useEffect(()=>{s().catch(x=>h(ve(x))).finally(()=>d(!1))},[]),u.useEffect(()=>{l(void 0),C(""),h(void 0),I(void 0),S(void 0),q(!1),T("")},[t]),u.useEffect(()=>{if(!v)return;const x=()=>I(void 0),B=W=>W.key==="Escape"&&x();return window.addEventListener("pointerdown",x),window.addEventListener("keydown",B),window.addEventListener("blur",x),()=>{window.removeEventListener("pointerdown",x),window.removeEventListener("keydown",B),window.removeEventListener("blur",x)}},[v]);async function N(x,B){const W=await s();q(!1),T(""),l(W.find(m=>m.taskType===x&&m.id===B.id))}async function A(x){E(x.id),h(void 0);try{const B=await M("automation.setEnabled",{taskType:x.taskType,id:x.id,enabled:!x.isEnabled},6e4);B.missingStep?(C(B.missingStep),l(x),h({tone:"warning",title:"配置尚未完成",message:B.message||""})):await s()}catch(B){h(ve(B))}finally{E("")}}async function j(x){if(!x.isEnabled){E(x.id);try{await M("automation.delete",{taskType:x.taskType,id:x.id}),S(void 0),await s()}catch(B){h(ve(B))}finally{E("")}}}if(p)return e.jsx(dn,{});if(a){const x=Ve(a.taskType);if(x)return e.jsx(Mn,{openSettings:n,task:a,definition:x,focusStep:b,notice:c,refresh:s,back:()=>{l(void 0),C(""),h(void 0),s()}})}return e.jsxs("div",{className:"page daily-page automation-list-page",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsx("h1",{children:D}),e.jsx("p",{children:t==="tencent_sheet_fill"?"先新建任务并保存文档链接，再打开浏览器登录和检查；网页控件、业务字段及定时配置保留在任务详情中。":"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),e.jsx("div",{className:"header-actions",children:e.jsxs("button",{className:"primary",disabled:!f.length,onClick:()=>{T(t),q(!0)},children:[e.jsx(mn,{}),"新建任务"]})})]}),c&&e.jsx("div",{className:`notice ${c.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:c.title}),e.jsx("span",{children:c.message})]})}),e.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[w.map(x=>e.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(x.status)?" needs-attention":""}`,onClick:()=>l(x),onContextMenu:B=>{B.preventDefault(),I({task:x,x:Math.min(B.clientX,window.innerWidth-176),y:Math.min(B.clientY,window.innerHeight-58)})},children:[e.jsxs("div",{className:"job-copy",children:[e.jsx("h2",{children:e.jsx("button",{type:"button",className:"automation-task-name",onClick:B=>{B.stopPropagation(),l(x)},children:x.name||"未命名任务"})}),e.jsxs("p",{children:[x.taskTypeName," · ",x.schedule," · ",x.connectionStatus]})]}),e.jsxs("div",{className:"job-actions",onClick:B=>B.stopPropagation(),children:[e.jsx("span",{className:`job-status ${x.status}`,children:en(x.status)}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox","aria-label":`启用${x.name||"未命名任务"}`,checked:x.isEnabled,disabled:!x.schedulingAvailable||g===x.id,title:x.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>A(x)}),e.jsx("span",{})]}),e.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${x.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:B=>{const W=B.currentTarget.getBoundingClientRect();I({task:x,x:Math.min(W.left,window.innerWidth-176),y:Math.min(W.bottom+4,window.innerHeight-58)})},children:e.jsx(pn,{})})]}),e.jsxs("div",{className:"automation-card-footer",children:["最近运行：",x.lastRun]})]},`${x.taskType}:${x.id}`)),!w.length&&e.jsxs("div",{className:"empty-state",children:[e.jsx(un,{}),e.jsx("h2",{children:t?`暂无${D}任务`:"还没有自动化任务"}),e.jsx("p",{children:f.length?"新建任务后进入对应的专用配置界面。":"当前环境尚未开放此类任务创建。"})]})]}),!!w.length&&e.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置、运行与定时设置。"}),v&&e.jsx("div",{className:"job-context-menu",role:"menu",style:{left:v.x,top:v.y},onPointerDown:x=>x.stopPropagation(),children:e.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:v.task.isEnabled||g===v.task.id,onClick:()=>{S(v.task),I(void 0)},children:[e.jsx(gn,{}),v.task.isEnabled?"停用后可删除":"删除任务"]})}),e.jsx(Ae,{open:!!L,onOpenChange:x=>!x&&S(void 0),children:e.jsxs(Ie,{children:[e.jsx(Re,{className:"dialog-overlay"}),e.jsxs(ze,{className:"dialog",children:[e.jsx(qe,{children:"删除自动化任务？"}),e.jsxs(Me,{children:["将删除“",L==null?void 0:L.name,"”及其业务记录，此操作无法撤销。"]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>S(void 0),children:"取消"}),e.jsx("button",{className:"danger",disabled:!!g,onClick:()=>L&&j(L),children:"确认删除"})]})]})]})}),e.jsx(Ae,{open:$,onOpenChange:x=>{q(x),x||T("")},children:e.jsxs(Ie,{children:[e.jsx(Re,{className:"dialog-overlay"}),e.jsxs(ze,{className:"dialog automation-create-dialog",children:[e.jsx(qe,{children:"新建自动化任务"}),e.jsx(Me,{children:k?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),k?(O=Ve(k))==null?void 0:O.renderCreate({onCreated:x=>N(k,x),onBack:()=>T(""),onCancel:()=>{q(!1),T("")}}):e.jsx("div",{className:"automation-create-types",children:f.map(x=>e.jsxs("button",{onClick:()=>T(x.taskType),children:[e.jsx("strong",{children:x.name}),e.jsx("span",{children:x.description})]},x.taskType))})]})]})})]})}function Mn({openSettings:n,task:t,definition:r,focusStep:y,notice:p,refresh:d,back:a}){const[l,b]=u.useState(y?r.resolveSection(y):r.includeBasics===!1?r.taskTabs[0].id:"basics"),C=t.taskType==="daily_report",[g,E]=u.useState(),[c,h]=u.useState(""),[v,I]=u.useState(!1),L=[...r.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...r.taskTabs,{id:"runs",label:"运行记录"}],S=[...t.missingMessage?[{id:`configuration:${t.missingStep||"unknown"}`,title:r.issueTitle(t.missingStep||""),message:t.missingMessage,section:r.resolveSection(t.missingStep||"")}]:[],...t.status==="schedule-error"&&t.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:t.schedulerMessage,section:"basics"}]:[]];async function $(){I(!0),h("");try{E(await r.loadRuns(t.id))}catch(k){h(k instanceof Error?k.message:String(k))}finally{I(!1)}}u.useEffect(()=>{l==="runs"&&g===void 0&&$()},[l,g]);function q(k,T){var o;if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight")return;k.preventDefault();const P=(T+(k.key==="ArrowRight"?1:-1)+L.length)%L.length;b(L[P].id),L[P].id==="basics"&&d().catch(()=>{}),(o=document.getElementById(`automation-tab-${L[P].id}`))==null||o.focus()}return t.taskType==="tencent_sheet_fill"?e.jsx(We,{id:t.id,name:t.name,back:a,changed:()=>{d().catch(()=>{})}},t.id):C?e.jsx(Xe,{id:t.id,back:a,changed:d,openSettings:n}):t.taskType==="notion_fill"?e.jsx(Ze,{id:t.id,back:a,changed:d,openSettings:n}):e.jsxs("div",{className:"page daily-page automation-detail",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:a,children:[e.jsx(ue,{}),"返回任务列表"]}),e.jsx("h1",{title:t.name||"未命名任务",children:t.name||"未命名任务"}),e.jsxs("p",{children:[t.taskTypeName," · ",t.schedule]})]}),e.jsx("span",{className:`job-status ${t.status}`,children:en(t.status)})]}),e.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:L.map((k,T)=>e.jsx("button",{type:"button",role:"tab",id:`automation-tab-${k.id}`,"aria-selected":l===k.id,"aria-controls":`automation-panel-${k.id}`,tabIndex:l===k.id?0:-1,onClick:()=>{b(k.id),k.id==="basics"&&d().catch(()=>{})},onKeyDown:P=>q(P,T),children:k.label},k.id))}),e.jsxs("div",{children:[p&&e.jsx("div",{className:`notice ${p.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:p.title}),e.jsx("span",{children:p.message})]})}),!!S.length&&e.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[e.jsxs("div",{className:"automation-issues-heading",children:[e.jsx(xn,{}),e.jsxs("div",{children:[e.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),e.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),e.jsxs("span",{children:[S.length," 项"]})]}),e.jsx("ul",{children:S.map(k=>{var T;return e.jsxs("li",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:k.title}),e.jsx("span",{children:k.message})]}),e.jsxs("button",{type:"button",onClick:()=>{b(k.section)},children:["前往",((T=L.find(P=>P.id===k.section))==null?void 0:T.label)||"处理",e.jsx(cn,{})]})]},k.id)})})]}),e.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${l}`,"aria-labelledby":`automation-tab-${l}`,children:[e.jsx("div",{hidden:l==="runs",children:r.renderEditor({id:t.id,section:l,openSettings:n,navigate:b,changed:()=>{d().catch(()=>{})}})}),l==="runs"&&e.jsxs("section",{className:"surface automation-runs",children:[e.jsxs("div",{className:"automation-runs-heading",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"运行记录"}),e.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),e.jsxs("button",{className:"secondary",disabled:v,onClick:$,children:[v?e.jsx(me,{className:"spin"}):e.jsx(hn,{}),"刷新"]})]}),c&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"运行记录读取失败"}),e.jsx("span",{children:c})]})}),e.jsx("div",{className:"automation-run-list",children:g==null?void 0:g.map(k=>e.jsxs("details",{children:[e.jsxs("summary",{children:[e.jsx("span",{children:k.time}),e.jsx("span",{children:k.source}),e.jsx("strong",{children:k.title}),e.jsx("b",{className:k.error?"error-text":"",children:k.status})]}),e.jsxs("div",{children:[k.details.map(T=>e.jsx("p",{children:T},T)),k.error&&e.jsxs("p",{className:"run-error",children:["错误：",k.error]})]})]},k.id))}),v&&!g&&e.jsx(we,{label:"正在加载运行记录"}),!v&&g&&!g.length&&e.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function en(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}export{Ln as AutomationPage};
