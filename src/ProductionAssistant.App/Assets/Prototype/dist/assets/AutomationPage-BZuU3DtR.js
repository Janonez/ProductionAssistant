import{c as je,r as u,j as e,C as ae,D as ce,i as M,u as sn,B as ue,L as pe,T as Ne,I as an,S as we,a as Ue,g as on,n as dn,A as ln,b as Ae,d as Ie,e as Re,f as ze,h as qe,k as Fe,R as cn}from"./index-B63HHE1C.js";import{P as pn,E as un,F as mn,T as hn,A as gn}from"./triangle-alert-D9jY5AX0.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=je("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=je("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=je("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),Me=["firstTarget","secondTarget","dateHeader","label"],Le=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function bn(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(s=>s.type==="year").value}-${n.find(s=>s.type==="month").value}`}function yn({id:n,metrics:s,initialMetric:r,businessDate:v,rules:d,fixedSheet:l,disabled:t,run:c,onActive:f,onSaved:S}){var a,T;const[g,E]=u.useState(r||((a=s[0])==null?void 0:a.value)||""),[p]=u.useState(()=>(v==null?void 0:v.slice(0,7))||bn()),[h,y]=u.useState(`${p}-01`),[$,z]=u.useState(`${p}-02`),[w,k]=u.useState(),[F,N]=u.useState({}),[D,P]=u.useState(""),o=!!w,j=((T=s.find(I=>I.value===g))==null?void 0:T.label)||"业务字段",b={firstTarget:`${h} 的${j}填报格`,secondTarget:`${$} 的${j}填报格`,dateHeader:`${h} 的日期单元格`,label:"项目名称、公司或材料表头"};async function A(I){P(""),await c(I==="preview"?"验证排列并定位第三个日期":I==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const C=await M("tencentSheet.teach",{id:n,stage:I,metric:g,firstDate:h,secondDate:$,sessionToken:w==null?void 0:w.sessionToken,previewToken:w==null?void 0:w.previewToken,slot:w==null?void 0:w.step},3e5);I==="confirm"||I==="cancel"?(k(void 0),N({}),f(!1),I==="confirm"&&await S()):(k(U=>({...U,...C})),f(!0),C.capture&&C.slot&&N(U=>({...U,[C.slot]:C.capture})))}catch(C){P(C instanceof Error?C.message:String(C)),I==="cancel"&&(k(void 0),N({}),f(!1))}})}return e.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:t,children:[e.jsx("legend",{children:"示范填报位置"}),e.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范只读取位置与表头，受保护或已有数据的单元格也可使用，不检查是否可编辑、不填写数据。程序学习两个日期的排列关系，再请你确认第三个位置；正式填报前才检查目标是否可编辑。"}),e.jsx("div",{className:"tencent-teaching-rules",children:s.map(I=>e.jsxs("div",{children:[e.jsx("strong",{children:I.label}),e.jsx("span",{children:d!=null&&d[I.value]?Le(d[I.value]):"待示范位置"})]},I.value))}),D&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"示范未完成"}),e.jsx("span",{children:D})]})}),o?e.jsxs(e.Fragment,{children:[e.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Me.map((I,C)=>{var U;return e.jsxs("li",{"aria-current":w.step===I?"step":void 0,className:F[I]?"done":"",children:[e.jsxs("span",{children:[C+1,". ",b[I]]}),e.jsx("strong",{children:((U=F[I])==null?void 0:U.address)||"待选取"})]},I)})}),Me.includes(w.step)&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:["请在网页中单击：",b[w.step]]}),e.jsx("p",{children:w.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":w.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可。受保护或已有数据的格子也可示范，无需解除保护或输入数据。"}),e.jsx("button",{className:"primary",onClick:()=>A("capture"),children:"记住当前选中的单元格"})]}),w.step==="preview"&&e.jsx("button",{className:"primary",onClick:()=>A("preview"),children:"验证规则并查看第三个位置"}),w.step==="confirm"&&w.rule&&w.prediction&&e.jsxs("div",{className:"tencent-teaching-prompt",children:[e.jsxs("strong",{children:[j,"：",Le(w.rule)]}),e.jsxs("p",{children:["程序已选中 ",w.prediction.date," 的预测位置 ",e.jsx("b",{children:w.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),e.jsxs("p",{children:["日期及“",w.rule.labelAnchor.expected,"”已通过只读校验。"]}),(w.sheetMode==="fixed"||!w.sheetMode&&l)&&!w.rule.dateAnchor.format.includes("{yyyy}")&&e.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>A("preview"),children:"再次定位预测位置"}),e.jsx("button",{className:"primary",onClick:()=>A("confirm"),children:"位置正确，保存此项目"})]})]}),e.jsx("button",{className:"ghost",onClick:()=>A("cancel"),children:"取消示范，保留原配置"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("label",{children:["要示范哪个项目？",e.jsx(ae,{value:g,options:s,placeholder:"选择项目",disabled:t,ariaLabel:"要示范的项目",onChange:E})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsx(ce,{value:h,onChange:y,label:"第一个示范日期",disabled:t}),e.jsx(ce,{value:$,onChange:z,label:"第二个示范日期",disabled:t})]}),e.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),e.jsx("button",{className:"secondary",disabled:t||!g||!h||!$,onClick:()=>A("start"),children:d!=null&&d[g]?"重新示范此项目":"开始示范此项目"})]})]})}const ge=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击保存状态控件的位置，无需等待特定文字。"}];function vn({id:n,value:s,disabled:r,onSaved:v,onActive:d}){var A;const[l,t]=u.useState(),[c,f]=u.useState(!1),[S,g]=u.useState(""),[E,p]=u.useState(""),[h,y]=u.useState(!1),[$,z]=u.useState(""),[w,k]=u.useState([]),[F,N]=u.useState(),[D,P]=u.useState();function o(){z(""),k([])}function j(){t(structuredClone(s??{})),f(!1),p(""),y(!1),N(void 0),P(void 0),o(),d(!0)}async function b(a,T){if(!l)return;g(T??a),y(!1),p(T?ge.find(C=>C.key===T).prompt:"正在操作…");const I=$;a!=="save"&&o(),(a==="open"||a==="testSheet"||T==="sheetTab")&&N(void 0),(a==="open"||a==="testSheet"||a==="captureCell"||T==="sheetTab"||T==="cellAddressBox")&&P(void 0);try{let C=await M(`tencentSite.${a}`,{id:n,controls:l,key:T,token:I},3e5);a==="pick"&&T==="sheetTab"&&(C.controls&&t(C.controls),g("testSheet"),p("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…"),C=await M("tencentSite.testSheet",{id:n,controls:C.controls??l},3e5)),p(C.message),y(C.passed===!1),a==="open"&&f(!0),C.controls&&t(C.controls),"testCell"in C&&P(C.testCell??void 0),(a==="testSheet"||T==="sheetTab")&&N(C),C.sheetRequired&&(N({passed:!1,message:C.message}),P(void 0)),a==="test"&&(z(C.token??""),k(C.steps)),a==="save"&&(await v(),t(void 0),d(!1))}catch(C){y(!0),p(C instanceof Error?C.message:String(C)),o()}finally{g("")}}return e.jsxs("fieldset",{className:"card tencent-web-controls tencent-sheet-panel","aria-busy":!!S,disabled:r,children:[e.jsx("h2",{children:"网页控件录制"}),e.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在“业务字段”中单独配置。"}),l?e.jsx(e.Fragment,{children:e.jsxs("fieldset",{className:"tencent-site-fields",disabled:r||!!S,children:[e.jsx("button",{className:c?"secondary":"primary",onClick:()=>b("open"),children:c?"重新打开配置文档":"开始配置"}),e.jsxs("div",{className:"tencent-site-recording",children:[e.jsx("div",{className:"tencent-site-controls",children:ge.map(a=>e.jsxs("div",{children:[e.jsx("strong",{children:a.title}),e.jsxs("span",{className:"tencent-control-state",children:[a.key==="sheetTab"&&(F!=null&&F.passed)?"已录制 · 检验通过":l[a.key]?"已录制":"未配置",a.key==="saveStatus"&&l.saveStatus?` · ${l.saveStatus.sampleText}`:""]}),e.jsxs("button",{className:"secondary",disabled:!c||a.key!=="sheetTab"&&!(F!=null&&F.passed)||a.key==="cellEditor"&&!D,onClick:()=>b("pick",a.key),children:["录制",a.key==="sheetTab"?" Sheet 标签":a.key==="cellEditor"?"内容编辑区":a.key==="saveStatus"?"保存状态":"单元格名称框"]}),a.key==="sheetTab"&&l.sheetTab&&e.jsx("button",{className:"secondary",disabled:!c,onClick:()=>b("testSheet"),children:"重新检验 Sheet"}),a.key==="saveStatus"&&l.saveStatus&&e.jsx("button",{className:"secondary",onClick:()=>{const T={...l};delete T.saveStatus,t(T),o()},children:"移除保存状态"})]},a.key))}),e.jsxs("div",{className:"tencent-site-instructions",children:[e.jsx("strong",{children:ge.some(a=>a.key===S)?"正在等待网页点选":S==="testSheet"?"正在检验 Sheet":"控件录制模式"}),e.jsx("p",{children:"先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。"}),e.jsx("p",{children:"录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。"}),F&&e.jsxs("div",{className:`notice tencent-sheet-check ${F.passed?"info":"error"}`,role:F.passed?"status":"alert",children:[e.jsx("strong",{children:F.passed?"Sheet 检验通过":"Sheet 检验未通过"}),e.jsx("ol",{className:"tencent-site-results",children:(A=F.steps)==null?void 0:A.map(a=>e.jsxs("li",{children:[e.jsx("strong",{children:a.label}),e.jsx("span",{children:a.detail}),a.names&&e.jsxs("details",{children:[e.jsx("summary",{children:"查看全部 Sheet 名称"}),e.jsx("ul",{children:a.names.map((T,I)=>e.jsx("li",{children:T},`${I}:${T}`))})]})]},a.label))}),!F.passed&&e.jsx("p",{children:F.message})]}),(F==null?void 0:F.passed)&&e.jsxs("div",{className:"tencent-sheet-guidance tencent-test-cell",role:"status",children:[e.jsx("strong",{children:D?`临时测试格：${D.sheet}!${D.address}`:"请选择一个可编辑的空白格"}),e.jsx("p",{children:D?"此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。":"在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}),e.jsx("button",{className:"secondary",disabled:!c||!l.cellAddressBox,onClick:()=>b("captureCell"),children:"读取当前测试格"})]})]})]}),!!(w!=null&&w.length)&&e.jsx("ol",{className:"tencent-site-results",children:w.map(a=>e.jsxs("li",{children:[e.jsx("strong",{children:a.label}),e.jsx("span",{children:a.detail})]},a.label))}),e.jsx("p",{className:"tencent-sheet-help",children:"录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"secondary",disabled:!c||!(F!=null&&F.passed)||!D||!l.cellAddressBox||!l.cellEditor,onClick:()=>b("test"),children:"检验单元格控件"}),e.jsx("button",{className:c?"primary":"secondary",disabled:!$,onClick:()=>b("save"),children:"保存网页控件"}),e.jsx("button",{className:"secondary",onClick:()=>{t(void 0),N(void 0),P(void 0),d(!1),o(),p("")},children:"取消"})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"checklist",children:ge.map(a=>e.jsxs("div",{className:"check-item",children:[e.jsx("span",{className:`mark ${s!=null&&s[a.key]?"":"pending"}`,children:s!=null&&s[a.key]?"✓":"·"}),a.title.slice(2),e.jsx("span",{className:"tencent-control-state",children:s!=null&&s[a.key]?"已录制":a.key==="saveStatus"?"未配置":"待录制"})]},a.key))}),e.jsx("button",{className:"secondary",onClick:j,children:s?"重新录制网页控件":"录制网页控件"})]}),E&&e.jsx("div",{className:`notice ${h?"error":"info"}`,role:h?"alert":"status",children:E})]})}function wn({id:n,field:s,disabled:r,continueToTeaching:v=!1,onSave:d,onCancel:l}){const[t,c]=u.useState(s.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[f,S]=u.useState(!0),[g,E]=u.useState([]),[p,h]=u.useState([]),[y,$]=u.useState([]),[z,w]=u.useState(!1),[k,F]=u.useState(!1),[N,D]=u.useState("");u.useEffect(()=>{let a=!0;return S(!0),M("tencentSheet.sources",{id:n}).then(T=>{a&&E(T.sources)}).catch(T=>{a&&D(String(T))}).finally(()=>{a&&S(!1)}),()=>{a=!1}},[n]),u.useEffect(()=>{let a=!0;if(h([]),D(""),w(!1),!!t.sourceId)return w(!0),M("tencentSheet.schema",{id:n,sourceId:t.sourceId}).then(T=>{a&&h(T.fields)}).catch(T=>{a&&D(String(T))}).finally(()=>{a&&w(!1)}),()=>{a=!1}},[n,t.sourceId]),u.useEffect(()=>{let a=!0;if($([]),F(!1),!(t.queryMode!=="view"||!t.sourceId))return F(!0),M("tencentSheet.views",{id:n,sourceId:t.sourceId},12e4).then(T=>{a&&$(T.views)}).catch(T=>{a&&D(String(T))}).finally(()=>{a&&F(!1)}),()=>{a=!1}},[n,t.sourceId,t.queryMode]);const P=a=>a.map(T=>({value:T.id,label:T.name})),o=p.filter(a=>["number","formula","rollup"].includes(a.type??"")),j=p.filter(a=>a.type==="date"),b=r||f||z||t.queryMode==="view"&&k,A=g.some(a=>a.id===t.sourceId)&&o.some(a=>a.id===t.valueFieldId)&&(t.queryMode==="date"?j.some(a=>a.id===t.dateFieldId):y.some(a=>a.id===t.datasetId));return e.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:r,children:[e.jsxs("legend",{children:["绑定 Teable：",s.name]}),e.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),e.jsxs("label",{children:["Teable 数据库",e.jsx(ae,{loading:f,value:t.sourceId,options:P(g),placeholder:"选择已有数据库",ariaLabel:"Teable 数据库",disabled:b,onChange:a=>c({...t,sourceId:a,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),e.jsxs("label",{children:["取数方式",e.jsx(ae,{value:t.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:b,onChange:a=>{D(""),c({...t,queryMode:a})}})]}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["数值字段",e.jsx(ae,{loading:z,value:t.valueFieldId,options:P(o),placeholder:"选择要汇总的数值字段",disabled:b,onChange:a=>c({...t,valueFieldId:a})})]}),t.queryMode==="date"?e.jsxs("label",{children:["日期字段",e.jsx(ae,{loading:z,value:t.dateFieldId,options:P(j),placeholder:"选择用于筛选的日期字段",disabled:b,onChange:a=>c({...t,dateFieldId:a})})]}):e.jsxs("label",{children:["Teable View",e.jsx(ae,{loading:k,value:t.datasetId,options:P(y),placeholder:"选择真实 View",disabled:b,onChange:a=>c({...t,datasetId:a})})]})]}),t.queryMode==="date"?e.jsxs("label",{children:["统计范围",e.jsx(ae,{value:t.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:b,onChange:a=>c({...t,period:a})})]}):e.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Teable 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),N&&e.jsx("p",{role:"alert",children:N}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"primary",disabled:b||!A,onClick:()=>{var a,T,I;return d({...t,sourceName:(a=g.find(C=>C.id===t.sourceId))==null?void 0:a.name,valueFieldName:(T=o.find(C=>C.id===t.valueFieldId))==null?void 0:T.name,datasetName:(I=y.find(C=>C.id===t.datasetId))==null?void 0:I.name})},children:v?"下一步 · 录制位置":"保存数据绑定"}),e.jsx("button",{className:"secondary",disabled:r,onClick:l,children:"稍后继续"})]})]})}const We={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},kn=["周日","周一","周二","周三","周四","周五","周六"];function jn({rule:n,schedule:s,disabled:r,onChange:v}){const[d,l]=u.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),t=n.kind==="fixed"?"fixed":d?"offset":n.offsetDays===0?"today":"previous";return e.jsxs("fieldset",{className:"card tencent-sheet-panel",disabled:r,children:[e.jsx("h2",{children:"执行频率与业务日期"}),e.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["执行频率",e.jsxs("select",{value:s.weekdays.length===7?"daily":"weekly",disabled:r,onChange:c=>v(n,{...s,weekdays:c.target.value==="daily"?[...We.weekdays]:[1,2,3,4,5]}),children:[e.jsx("option",{value:"daily",children:"每天"}),e.jsx("option",{value:"weekly",children:"指定星期"})]})]}),e.jsxs("label",{children:["业务日期",e.jsxs("select",{value:t,disabled:r,onChange:c=>{const f=c.target.value;l(f==="offset"),v(f==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:f==="today"?0:n.kind==="relative"&&f==="offset"?n.offsetDays:-1},s)},children:[e.jsx("option",{value:"previous",children:"执行当天的前一天"}),e.jsx("option",{value:"today",children:"执行当天"}),e.jsx("option",{value:"offset",children:"相对执行当天偏移 N 天"}),e.jsx("option",{value:"fixed",children:"指定固定日期"})]})]})]}),s.weekdays.length!==7&&e.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(c=>e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:s.weekdays.includes(c),onChange:f=>v(n,{...s,weekdays:f.target.checked?[...s.weekdays,c]:s.weekdays.filter(S=>S!==c)})}),kn[c]]},c))}),t==="offset"&&n.kind==="relative"&&e.jsxs("label",{children:["偏移天数（负数向前，正数向后）",e.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:c=>v({kind:"relative",offsetDays:c.target.value===""?NaN:Number(c.target.value)},s)})]}),n.kind==="fixed"&&e.jsx(ce,{label:"固定业务日期",value:n.date,onChange:c=>v({kind:"fixed",date:c},s),disabled:r}),e.jsx("div",{className:"divider"}),e.jsx("div",{className:"tencent-sheet-grid",children:s.times.map((c,f)=>e.jsxs("div",{children:[e.jsxs("label",{children:["执行时刻 ",f+1,"（北京时间）"]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("input",{type:"time","aria-label":`执行时刻 ${f+1}（北京时间）`,value:c,onChange:S=>v(n,{...s,times:s.times.map((g,E)=>E===f?S.target.value:g)})}),e.jsxs("button",{className:"ghost",disabled:s.times.length===1,onClick:()=>v(n,{...s,times:s.times.filter((S,g)=>g!==f)}),children:["移除时刻 ",f+1]})]})]},f))}),e.jsx("button",{className:"secondary",disabled:s.times.length>=24,onClick:()=>{const c=Array.from({length:24},(f,S)=>`${String(S).padStart(2,"0")}:00`).find(f=>!s.times.includes(f));c&&v(n,{...s,times:[...s.times,c]})},children:"添加执行时刻"}),e.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}const Nn={Open:"正在打开并检查…",Verify:"正在重新检查登录与文档访问…",Status:"正在读取浏览器状态…",Close:"正在关闭浏览器…"},Pe={closed:"浏览器已关闭","login-required":"等待登录",authenticated:"登录与访问已确认","access-denied":"无文档访问权限",loading:"页面跳转中",unverified:"尚未确认",unavailable:"暂时无法验证","profile-busy":"会话被占用"};function Sn({documentUrl:n,disabled:s=!1,onActive:r}){const{resolvedTheme:v}=sn(),[d,l]=u.useState(),[t,c]=u.useState(),[f,S]=u.useState(""),[g,E]=u.useState(null),p=u.useRef(0),h=u.useRef(void 0),y=n.trim(),$=u.useCallback(async z=>{if(h.current&&z!=="Close"||h.current==="Close")return;const w=++p.current;h.current=z,c(z),S(""),l(void 0);try{const k=await M(`tencentSheet.session${z}`,{documentUrl:y.trim()},6e4);if(!k||!(k.state in Pe)||typeof k.browserOpen!="boolean")throw new Error("会话状态响应无效，请重新检查。");w===p.current&&(l(k.browserOpen?k:{...k,authentication:"unknown",documentAccess:"unknown",editPermission:"unknown",verifiedAt:null}),k.verifiedAt&&k.browserOpen&&E(k.verifiedAt))}catch(k){w===p.current&&S(k instanceof Error?k.message:String(k))}finally{w===p.current&&(h.current=void 0,c(void 0))}},[y]);return u.useEffect(()=>{const z=++p.current;return h.current=void 0,E(null),queueMicrotask(()=>{z===p.current&&$("Status")}),()=>{p.current++,h.current=void 0}},[$]),u.useEffect(()=>{r==null||r(!!t)},[t,r]),u.useEffect(()=>{const z=()=>{!s&&!h.current&&$("Status")};window.addEventListener("focus",z);const w=d!=null&&d.browserOpen&&!f?window.setInterval(z,5e3):void 0;return()=>{window.removeEventListener("focus",z),window.clearInterval(w)}},[$,d==null?void 0:d.browserOpen,f,s]),e.jsxs("section",{"aria-label":"腾讯文档登录与会话","aria-busy":!!t,"data-shadcn-surface":"",className:`pa-shell-theme rounded-lg border bg-card p-5 text-card-foreground ${v==="dark"?"dark":""}`,children:[e.jsxs("div",{className:"mb-4 space-y-1",children:[e.jsx("h2",{className:"text-lg font-semibold",children:"腾讯文档登录与会话"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"检查上方已保存的文档。请在 Edge 中扫码登录，再返回重新检查。关闭浏览器会保留登录资料。"})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(ue,{disabled:!!t||s||!y,onClick:()=>$("Open"),children:"打开并检查"}),e.jsx(ue,{variant:"outline",disabled:!!t||s||!y,onClick:()=>$("Verify"),children:"重新检查"})]}),e.jsx(ue,{variant:"ghost",disabled:s||t==="Close"||!t&&!(d!=null&&d.browserOpen)&&!f,onClick:()=>$("Close"),children:"关闭浏览器"})]}),e.jsxs("div",{className:"mt-4 space-y-2 text-sm",role:"status","aria-live":"polite",children:[t?e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(pe,{className:"size-4 animate-spin"}),Nn[t]]}):d?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-medium",children:Pe[d.state]}),e.jsx("p",{children:d.message}),d.recoveryHint&&e.jsx("p",{children:d.recoveryHint}),e.jsxs("dl",{className:"grid gap-1 sm:grid-cols-3",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"浏览器"}),e.jsx("dd",{children:d.browserOpen?"运行中":d.state==="closed"?"已关闭":"未确认"})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"登录"}),e.jsx("dd",{children:d.authentication==="authenticated"?"已登录":d.authentication==="required"?"需要登录":"未知"})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground",children:"文档访问"}),e.jsx("dd",{children:d.documentAccess==="allowed"?"可访问":d.documentAccess==="denied"?"无权限":"未知"})]})]}),e.jsxs("p",{className:"text-muted-foreground",children:["编辑权限：",d.editPermission==="read-only"?"只读":"未知（本阶段不试写）"]})]}):e.jsx("p",{className:"text-muted-foreground",children:"当前状态未知，请重新检查。"}),e.jsx("p",{className:"text-muted-foreground",children:d!=null&&d.verifiedAt?`最近检查：${new Date(d.verifiedAt).toLocaleString()}（检查时的结果）。`:g?`历史检查：${new Date(g).toLocaleString()}，不能据此判断当前登录状态。`:"最近检查：尚未完成。"})]}),f&&e.jsxs("p",{role:"alert",className:"mt-3 text-sm text-destructive",children:[f," 请确认浏览器和服务可用，然后重新检查或关闭后打开。"]})]})}const ke=n=>n instanceof Error?n.message:String(n);function Cn({onCreated:n,onCancel:s}){const[r,v]=u.useState(""),[d,l]=u.useState(!1),[t,c]=u.useState("");async function f(){l(!0),c("");try{await n(await M("tencentSheet.create",{documentUrl:r}))}catch(S){c(ke(S))}finally{l(!1)}}return e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"新建文档填报任务"}),e.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),e.jsxs("label",{children:["文档分享链接",e.jsx("input",{type:"url",disabled:d,value:r,onChange:S=>v(S.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),t&&e.jsx("p",{role:"alert",children:t}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",disabled:d,onClick:s,children:"取消"}),e.jsxs("button",{className:"primary",disabled:d||!r.trim(),onClick:f,children:[d&&e.jsx(pe,{className:"spin"}),"创建并配置"]})]})]})}function Ye({id:n,changed:s,back:r,name:v}){var Ee,Te;const d=[{id:"doc",label:"文档与账号"},{id:"control",label:"网页控件"},{id:"fields",label:"业务字段"},{id:"rule",label:"执行规则"},{id:"test",label:"测试与上线"}],[l,t]=u.useState("doc"),[c,f]=u.useState("front"),[S,g]=u.useState(!1),[E,p]=u.useState(),[h,y]=u.useState(),[$,z]=u.useState(""),[w,k]=u.useState(""),[F,N]=u.useState(!1),[D,P]=u.useState(!1),[o,j]=u.useState(""),[b,A]=u.useState(),[a,T]=u.useState(!1),[I,C]=u.useState(""),[U,x]=u.useState(!1),[B,W]=u.useState(!1),[m,q]=u.useState(!1),[R,O]=u.useState([]),[G,ne]=u.useState(""),[re,Q]=u.useState(""),[se,K]=u.useState(""),[ie,he]=u.useState(""),Se=u.useRef(null),[Y,Ce]=u.useState();u.useEffect(()=>{if(!w||F)return;const i=window.setTimeout(()=>k(""),2400);return()=>window.clearTimeout(i)},[w,F]);const fe=i=>{y(i),C(i.config.documentUrl)},oe=()=>M("tencentSheet.get",{id:n}).then(fe);u.useEffect(()=>{let i=!0;return M("tencentSheet.get",{id:n}).then(L=>{i&&fe(L)}).catch(L=>{i&&(N(!0),k(ke(L)))}),()=>{i=!1}},[n]),u.useEffect(()=>{var i,L;(se||ie)&&((L=(i=Se.current)==null?void 0:i.scrollIntoView)==null||L.call(i,{block:"start"}))},[se,ie]);async function _(i,L){z(i),k(""),N(!1);try{await L()}catch(Z){N(!0),k(ke(Z))}finally{z("")}}function H(){Ce(void 0),A(void 0)}function be(i){y(L=>L&&{...L,config:i}),T(!0),H()}async function rn(i,L){var Z;H(),y(await M("tencentSheet.updateField",{id:n,fieldId:i.id,name:i.name,unit:i.unit,...L?{notion:L}:{}})),he(""),(Z=h==null?void 0:h.config.rules)!=null&&Z[i.id]||(K(de?i.id:""),k(de?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),s()}async function ye(){if(!h)return;const i=await M("tencentSheet.save",{id:n,config:h.config,configRevision:h.configRevision??0});fe(i),T(!1),H(),s()}async function tn(i){a&&await ye(),H();const L=await M(`tencentSheet.${i}`,{id:n},3e5);k(L.message),L.sheets&&O([...new Set(L.sheets)]),await oe()}if(!h)return w?e.jsx("div",{className:"notice",role:"alert",children:w}):e.jsx(Ne,{kind:"tencent"});const V=h.config,de=!!((Ee=V.webControls)!=null&&Ee.sheetTab&&V.webControls.cellAddressBox&&V.webControls.cellEditor),X=V.fields??[],le=X.find(i=>i.id===se),te=X.find(i=>i.id===ie),J=!!$||U||!!te||m||B;return e.jsx("div",{className:"tencent-demo","aria-busy":!!$,children:e.jsxs("div",{className:"page tencent-sheet-workbench",children:[r&&e.jsx("button",{className:"crumb",onClick:r,disabled:J,children:"← 返回任务列表"}),e.jsxs("div",{className:"titlebar",children:[e.jsxs("div",{children:[e.jsx("h1",{children:v||"腾讯文档填报"}),e.jsxs("div",{className:"subtitle",children:["腾讯文档填报 · 业务日期 ",h.businessDate??"获取数据时确定"]})]}),e.jsxs("div",{className:"tencent-badges",children:[e.jsxs("span",{className:`badge ${h.enabled?"success":"warning"}`,children:["● 定时",h.enabled?"已启用":"未启用"]}),e.jsx("span",{className:"badge neutral",children:h.validated&&!a?"已验证":"待验证"})]})]}),h.enabled&&e.jsxs("div",{className:"banner",children:[e.jsxs("p",{children:["定时填报当前处于",e.jsx("strong",{children:"已启用"}),"状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。"]}),e.jsx("button",{className:"btn btn-secondary",disabled:J,onClick:()=>_("停用定时填报",async()=>{await M("automation.setEnabled",{taskType:"tencent_sheet_fill",id:n,enabled:!1},6e4),await oe(),s(),k("已停用定时填报，现在可以修改配置。")}),children:"立即停用"})]}),e.jsx("div",{className:"status-strip",children:[{ok:de,text:de?"网页控件已录制":"网页控件待录制"},{ok:X.length>0&&X.every(i=>{var L;return i.notion&&((L=V.rules)==null?void 0:L[i.id])}),text:`业务字段 ${X.filter(i=>{var L;return i.notion&&((L=V.rules)==null?void 0:L[i.id])}).length}/${X.length} 已绑定`},{ok:!!h.enabled,text:h.enabled?"定时已启用":"定时未启用"}].map(i=>e.jsxs("span",{className:`status-chip ${i.ok?"ok":"pending"}`,children:[e.jsx("span",{className:"dot"}),i.text]},i.text))}),e.jsx("div",{className:"tabs",role:"tablist","aria-label":"腾讯文档配置",children:d.map((i,L)=>e.jsx("button",{id:`tencent-tab-${i.id}`,role:"tab","aria-selected":l===i.id,"aria-controls":`tencent-panel-${i.id}`,tabIndex:l===i.id?0:-1,disabled:J,className:`tab ${l===i.id?"active":""}`,onClick:()=>t(i.id),onKeyDown:Z=>{var De;if(!["ArrowLeft","ArrowRight","Home","End"].includes(Z.key))return;Z.preventDefault();const $e=Z.key==="Home"?0:Z.key==="End"?d.length-1:(L+(Z.key==="ArrowRight"?1:-1)+d.length)%d.length;t(d[$e].id),(De=document.getElementById(`tencent-tab-${d[$e].id}`))==null||De.focus()},children:i.label},i.id))}),e.jsxs("div",{className:"panel active",role:"tabpanel",id:`tencent-panel-${l}`,"aria-labelledby":`tencent-tab-${l}`,children:[l==="doc"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:J,className:"card tencent-sheet-panel",children:[e.jsx("h2",{children:"目标文档"}),e.jsx("p",{className:"hint",children:"填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。"}),e.jsxs("div",{"data-shadcn-surface":"",className:"space-y-2",children:[e.jsx("label",{htmlFor:`document-url-${n}`,children:"文档链接"}),e.jsx(an,{id:`document-url-${n}`,type:"url",disabled:h.enabled,value:V.documentUrl,onChange:i=>be({...V,documentUrl:i.target.value})}),e.jsx("p",{className:"text-sm text-muted-foreground",children:V.documentUrl!==I?"链接尚未保存。保存后才能检查新文档；离开页面会放弃未保存修改。":"文档链接已保存。切换页面或重启应用后自动恢复。"}),a&&e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(ue,{disabled:J||!!h.enabled,onClick:()=>_("保存文档配置",async()=>{await ye(),k("文档配置已保存，可打开浏览器检查。")}),children:"保存文档配置"}),e.jsx(ue,{variant:"outline",disabled:J,onClick:()=>_("放弃未保存修改",async()=>{await oe(),T(!1),H()}),children:"放弃修改"})]})]}),e.jsxs("details",{className:"tencent-document-check",children:[e.jsx("summary",{children:"工作表识别与检查"}),e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"secondary",disabled:h.enabled,onClick:()=>_("识别页面",()=>tn("recognize")),children:"识别并检查"})}),e.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!R.length&&e.jsxs("label",{children:["工作表名称",e.jsx(ae,{value:V.sheetReferenceName??V.capturedSheet??V.sheetName??"",options:R.map(i=>({value:i,label:i})),placeholder:"选择识别到的工作表名称",disabled:J||!!h.enabled,onChange:i=>be({...V,sheetReferenceName:i})})]}),(V.sheetReferenceName||V.capturedSheet||V.sheetMode==="fixed")&&e.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",V.sheetReferenceName??V.capturedSheet??V.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]})]}),e.jsx(Sn,{documentUrl:I,disabled:a||!!$||U||m,onActive:W},n)]}),l==="control"&&e.jsx(vn,{id:n,value:V.webControls,disabled:!!$||U||!!te||a||!!h.enabled,onActive:i=>{q(i),i&&H()},onSaved:async()=>{await oe(),H(),s()}},n),l==="fields"&&e.jsxs(e.Fragment,{children:[e.jsxs("fieldset",{disabled:J||a||h.enabled,className:"card tencent-sheet-panel",children:[e.jsxs("div",{className:"add-field-toggle",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"已绑定的业务字段"}),e.jsx("p",{className:"hint",children:"取数、月份和填写位置共用本次业务日期。"})]}),e.jsx("button",{className:"secondary",onClick:()=>g(!S),children:"+ 添加业务字段"})]}),S&&e.jsxs("div",{className:"add-field-form open",children:[e.jsxs("div",{className:"tencent-sheet-grid",children:[e.jsxs("label",{children:["业务字段名称",e.jsx("input",{value:G,placeholder:"例如：合格数量",onChange:i=>ne(i.target.value)})]}),e.jsxs("label",{children:["单位（可选）",e.jsx("input",{value:re,placeholder:"例如：件",onChange:i=>Q(i.target.value)})]})]}),e.jsx("button",{className:"primary",disabled:!G.trim(),onClick:()=>_("新增业务字段",async()=>{var L,Z;H();const i=await M("tencentSheet.addField",{id:n,name:G,unit:re});y(i),K(""),he(((Z=(L=i.config.fields)==null?void 0:L.at(-1))==null?void 0:Z.id)??""),ne(""),Q(""),g(!1),s()}),children:"下一步 · 选择数据库"}),e.jsx("button",{className:"ghost",onClick:()=>g(!1),children:"取消"})]}),!X.length&&e.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),e.jsx("div",{className:"field-list",children:X.map(i=>{var L;return e.jsxs("div",{className:"field-row",children:[e.jsxs("span",{children:[e.jsxs("strong",{children:[i.name,i.unit?`（${i.unit}）`:""]}),e.jsxs("small",{className:"tencent-control-state",children:[(L=V.rules)!=null&&L[i.id]?"位置已示范":"待示范位置"," · ",i.notion?`${i.notion.sourceName??"Teable"} / ${i.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),e.jsxs("div",{className:"tencent-sheet-actions",children:[e.jsx("button",{className:"ghost",disabled:!de||!i.notion,onClick:()=>{K(i.id),H()},"aria-label":`示范位置：${i.name}`,children:"示范位置"}),e.jsx("button",{className:"ghost",onClick:()=>{he(i.id),K(""),H()},"aria-label":`绑定数据：${i.name}`,children:"绑定数据"}),e.jsx("button",{className:"btn-danger-ghost",onClick:()=>_("删除业务字段",async()=>{H(),y(await M("tencentSheet.deleteField",{id:n,fieldId:i.id})),se===i.id&&K(""),s()}),"aria-label":`删除：${i.name}`,children:"删除"})]})]},i.id)})})]}),(le||te)&&e.jsxs("div",{ref:Se,children:[le&&!te&&e.jsx(yn,{id:n,businessDate:D&&o?o:h.businessDate,metrics:[{value:le.id,label:le.name}],initialMetric:le.id,rules:V.rules,fixedSheet:V.sheetMode==="fixed",disabled:!!$||a||m,run:_,onActive:i=>{x(i),i&&H()},onSaved:async()=>{await oe(),H(),K(""),k("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),s()}},`${n}:${le.id}:${JSON.stringify(V.rules)}`),te&&e.jsx(wn,{id:n,field:te,continueToTeaching:de&&!((Te=V.rules)!=null&&Te[te.id]),disabled:!!$,onCancel:()=>he(""),onSave:i=>_("保存数据绑定",()=>rn(te,i))},te.id)]})]}),l==="rule"&&e.jsx(e.Fragment,{children:e.jsx(jn,{rule:V.businessDateRule??{kind:"relative",offsetDays:-1},schedule:V.executionSchedule??We,disabled:J||!!h.enabled,onChange:(i,L)=>be({...V,businessDateRule:i,executionSchedule:L})})}),a&&l==="rule"&&e.jsx("div",{className:"btn-row",children:e.jsx("button",{className:"primary",disabled:J,onClick:()=>_("保存任务配置",async()=>{await ye(),k("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"})}),l==="test"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card",children:[e.jsx("h2",{children:"运行测试"}),e.jsx("div",{className:"segmented",role:"group","aria-label":"测试模式",children:[{id:"front",label:"前台测试"},{id:"back",label:"后台自动测试"}].map(i=>e.jsx("button",{"aria-pressed":c===i.id,disabled:J,className:c===i.id?"active":"",onClick:()=>f(i.id),children:i.label},i.id))}),c==="front"&&e.jsxs("fieldset",{disabled:J||a,className:"test-mode active tencent-test-fields",children:[e.jsx("p",{className:"test-desc",children:"浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。"}),e.jsxs("label",{className:"tencent-sheet-date-mode",children:[e.jsx("input",{type:"checkbox",checked:D,onChange:i=>{P(i.target.checked),H()}}),"指定补填日期"]}),D?e.jsx(ce,{label:"本次业务日期",disabled:!!$,value:o,onChange:i=>{j(i),H()}}):e.jsxs("p",{children:["按已保存规则计算的业务日期：",(Y==null?void 0:Y.date)??h.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),e.jsx("button",{className:"secondary",disabled:!X.length||D&&!o||X.some(i=>{var L;return!((L=V.rules)!=null&&L[i.id])||!i.notion}),onClick:()=>_("获取 Teable 数据",async()=>{H(),Ce(await M("tencentSheet.fetch",{id:n,businessDate:D?o:void 0},3e5)),k("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Teable 数据"}),$==="获取 Teable 数据"&&!Y&&e.jsx(we,{rows:4,label:"正在加载业务数据"}),Y&&e.jsxs("div",{className:"tencent-sheet-table",children:[e.jsxs("p",{children:["业务日期：",Y.date]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"业务字段"}),e.jsx("th",{children:"数值"}),e.jsx("th",{children:"来源与范围"}),e.jsx("th",{children:"记录数"})]})}),e.jsx("tbody",{children:Y.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.name}),e.jsxs("td",{children:[i.value," ",i.unit]}),e.jsxs("td",{children:[i.source," · ",i.period]}),e.jsx("td",{children:i.recordCount})]},i.id))})]})]}),e.jsx("button",{className:"primary",disabled:!X.length||D&&!o||!Y,onClick:()=>_("检查填报位置",async()=>{A(void 0);const i=await M("tencentSheet.inspect",{id:n,dataToken:Y==null?void 0:Y.dataToken,businessDate:(Y==null?void 0:Y.date)??(D?o:void 0)},3e5);A(i),k(i.message),s()}),children:"检查本次数据与位置"})]}),c==="back"&&e.jsxs("fieldset",{disabled:J||a,className:"test-mode active tencent-test-fields",children:[e.jsxs("p",{className:"hint",children:["本次业务日期：",D?o||"请在前台测试选择补填日期":h.businessDate??"执行时确定",D?"（指定补填日期）":"（按已保存规则）"]}),e.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),e.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Teable。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),e.jsx("button",{className:"primary",disabled:!X.length||X.some(i=>{var L;return!i.notion||!((L=V.rules)!=null&&L[i.id])})||D&&!o,onClick:()=>_("后台取数、填报并确认保存",async()=>{H();try{const i=await M("tencentSheet.backgroundTest",{id:n,businessDate:D?o:void 0},6e5);k(i.message)}finally{await oe(),s()}}),children:"后台自动测试并填写"}),h.enabled&&e.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]})]}),c==="front"&&b&&e.jsxs("section",{className:"card tencent-sheet-panel",children:[e.jsx("h3",{children:"确认填报"}),e.jsxs("p",{children:["业务日期：",b.date," · ",b.sheet]}),e.jsx("div",{className:"tencent-sheet-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"项目"}),e.jsx("th",{children:"位置"}),e.jsx("th",{children:"原内容"}),e.jsx("th",{children:"本次填报"})]})}),e.jsx("tbody",{children:b.rows.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.label}),e.jsx("td",{children:i.address}),e.jsx("td",{children:i.current||"空白"}),e.jsx("td",{children:i.value})]},i.address))})]})}),e.jsx("p",{children:b.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),e.jsxs("button",{className:"primary",disabled:J||!b.token||b.conflict,onClick:()=>_("填报并确认保存",async()=>{const i=b;A(void 0);const L=await M("tencentSheet.write",{id:n,dataToken:Y==null?void 0:Y.dataToken,businessDate:i.date,token:i.token},31e4);k(L.message),s()}),children:["确认填报以上 ",b.rows.length," 项"]})]}),e.jsxs("details",{className:"tencent-run-history",children:[e.jsx("summary",{onClick:()=>{E||_("读取运行记录",async()=>{const i=await M("tencentSheet.runs",{id:n});p(i.runs)})},children:"运行记录"}),$==="读取运行记录"&&!E&&e.jsx(we,{label:"正在加载运行记录"}),E==null?void 0:E.map(i=>e.jsxs("div",{children:[e.jsxs("p",{children:[i.time," · ",i.businessDate," · ",i.status]}),e.jsx("p",{children:i.error||i.message})]},i.id)),(E==null?void 0:E.length)===0&&e.jsx("p",{children:"暂无运行记录"})]})]})]},l),e.jsxs("div",{className:`toast ${w?"show":""} ${F?"error":""}`,role:F?"alert":"status",children:[w,w&&e.jsx("button",{className:"ghost","aria-label":"关闭提示",onClick:()=>k(""),children:"×"})]}),$&&e.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[e.jsx(pe,{className:"spin"}),$,"… 请等待操作结束"]})]})})}const He=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,_e=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,En=`<!doctype html>\r
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
`,Je=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Ge=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Ke=`/* Static neutral placeholders: never animate position, size or opacity on arrival. */\r
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
`;function ee(n,s){if(!n)return;s&&(n.style.minHeight=`${Math.max(n.getBoundingClientRect().height,100)}px`),n.classList.toggle("skeleton-region",s);const r=n.querySelector(":scope > .skeleton-region-placeholder");if(s){if(n.setAttribute("aria-busy","true"),!r){const v=n.ownerDocument.createElement("span");v.className="skeleton-region-placeholder",v.setAttribute("aria-hidden","true");for(let d=0;d<3;d++){const l=n.ownerDocument.createElement("span");l.className="skeleton-block",v.append(l)}n.append(v)}}else n.removeAttribute("aria-busy"),r==null||r.remove()}const xe=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(s=>({key:s.key,label:s.label,spec:{granularity:s.granularity,yearOffset:n}}))),Xe={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function Tn(n){return Xe[n]||n}function Be(n){const s=[[]];function r(d){d.replace(/\u00a0/g," ").split(`
`).forEach((l,t)=>{var f;if(t&&s.push([]),!l)return;const c=s.at(-1);((f=c.at(-1))==null?void 0:f.type)==="text"?c.at(-1).text+=l:c.push({type:"text",text:l})})}function v(d){var l;if(d.nodeType===3){r(d.textContent||"");return}if(d instanceof n.ownerDocument.defaultView.HTMLElement){if(d.dataset.key){const t=Tn(d.dataset.key);s.at(-1).push({type:t.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:t,label:d.textContent||"",...d.dataset.legacySpec?{dateRangeSpec:JSON.parse(d.dataset.legacySpec)}:{}}});return}if(d.tagName==="BR"){r(`
`);return}d!==n&&["DIV","P"].includes(d.tagName)&&d.childNodes.length===1&&((l=d.firstChild)==null?void 0:l.nodeName)==="BR"||Array.from(d.childNodes).forEach((t,c)=>{c&&t.nodeType===1&&["DIV","P"].includes(t.tagName)&&r(`
`),v(t)})}}return v(n),{text:s.map(d=>d.map(l=>l.type==="text"?l.text:l.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:s.map(d=>({type:"paragraph",content:d}))})}}function $n(n,s,r,v){const d=[...r,...Object.entries(Xe).map(([t,c])=>({key:c,label:t==="system.date"?"业务日期":t==="system.year"?"业务年份":t==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(t=>t.field||t.metric==="date").sort((t,c)=>c.key.length-t.key.length);let l=s;for(;l;){const t=d.map(c=>({d:c,index:l.indexOf(c.key)})).filter(c=>c.index>=0).sort((c,f)=>c.index-f.index)[0];if(!t){n.append(n.ownerDocument.createTextNode(l));break}t.index&&n.append(n.ownerDocument.createTextNode(l.slice(0,t.index))),n.append(v(t.d)),l=l.slice(t.index+t.d.key.length)}}function Dn(n,s,r,v){if(!s)return!1;let d;try{d=JSON.parse(s)}catch{return!1}if(d.type!=="doc")return!1;function l(t){var c,f,S,g;if(t.type==="text"){n.append(n.ownerDocument.createTextNode(t.text||""));return}if(t.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(t.type==="fieldToken"||t.type==="dateToken"){const E=((c=t.attrs)==null?void 0:c.placeholder)||"";let p=r.find(y=>y.key===E);p||(p={key:E,label:t.type==="dateToken"?"业务日期":((f=t.attrs)==null?void 0:f.label)||"已有数据",metric:t.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((S=t.attrs)==null?void 0:S.label)||""},r.push(p));const h=v(p);(g=t.attrs)!=null&&g.dateRangeSpec&&(h.dataset.legacySpec=JSON.stringify(t.attrs.dateRangeSpec)),n.append(h);return}(t.content||[]).forEach((E,p)=>{t.type==="doc"&&p&&n.append(n.ownerDocument.createTextNode(`
`)),l(E)})}return l(d),!0}function Ze({id:n,back:s,changed:r,openSettings:v}){const d=u.useRef(null),[l,t]=u.useState(""),[c,f]=u.useState(!0);return u.useEffect(()=>{let S=!1;const g=d.current;return f(!0),t(""),g.onload=()=>{var E,p;!S&&((E=g.contentDocument)!=null&&E.getElementById("editor"))&&Promise.resolve((p=g.contentDocument.fonts)==null?void 0:p.ready).then(()=>{S||f(!1)})},M("daily.get",{id:n}).then(E=>{if(S)return;const p=An(E,{back:s,changed:r,openSettings:v});g.dailyRuntime=p,g.srcdoc=En.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Je,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ge,window.location.href).href)}).catch(E=>{S||t(String(E.message||E))}),()=>{var E;S=!0,g.onload=null,(E=g.dailyRuntime)==null||E.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[l&&e.jsx("p",{role:"alert",children:l}),e.jsx("iframe",{ref:d,title:"日报消息模板",style:{visibility:c?"hidden":void 0}}),c&&!l&&e.jsx(Ne,{})]})}function An(n,s){var P;let r=!1,v=!1,d,l,t=Promise.resolve(),c=0,f;const S=new Date,g=n.fields.map(o=>{var j,b,A;return{key:o.placeholder,label:o.label.replace(" · ",""),metric:`${o.databaseId||((j=o.binding)==null?void 0:j.dataSourceId)}:${o.businessId||((b=o.binding)==null?void 0:b.businessMetricId)}`,scope:((A=xe.find(a=>JSON.stringify(a.spec)===JSON.stringify(o.dateRangeSpec)))==null?void 0:A.key)||"legacy",keywords:o.label,field:o}}),E=[];let p=(P=n.metricSourceIds)!=null&&P.length?n.metricSourceIds:[...new Set(n.fields.map(o=>{var j;return o.databaseId||((j=o.binding)==null?void 0:j.dataSourceId)}).filter(Boolean))];const h=new Map(n.fields.map(o=>[o.placeholder,o])),y=new Map;function $(o){const j=l==null?void 0:l.querySelector("#preview-status");j&&(j.textContent=o)}function z(){l==null||l.querySelectorAll("[data-send]").forEach(o=>o.disabled=v||!n.notificationConfigured)}async function w(o){o.text===n.draftTemplate&&o.document===n.draftTemplateDocument||(await M("daily.saveTemplate",{id:N,...o}),n.draftTemplate=o.text,n.draftTemplateDocument=o.document)}async function k(){var o;try{const j=await M("daily.get",{id:N});if(r)return;n.notificationConfigured=j.notificationConfigured,n.sources=j.sources,z(),(o=l==null?void 0:l.querySelector("[data-notification-notice]"))==null||o.toggleAttribute("hidden",!!n.notificationConfigured),await F()}catch(j){$(String(j))}}async function F(){var j;const o=await Promise.allSettled(p.map(async b=>({sourceId:b,metrics:(await on(N,b)).metrics})));if(!r){g.splice(0,g.length,...g.filter(b=>b.field)),E.length=0;for(const b of o)if(b.status==="fulfilled")for(const A of b.value.metrics){const a=`${b.value.sourceId}:${A.id}`;E.push([a,A.name,A.name,0]);const T=A.granularity==="monthly"?[{key:"month",label:"本月"}]:xe;for(const I of T)g.push({key:`${a}:${I.key}`,metric:a,scope:I.key,label:A.granularity==="monthly"?A.name:I.label+A.name,keywords:A.name+" "+I.label+" "+(((j=n.sources.find(C=>C.id===b.value.sourceId))==null?void 0:j.name)||""),sourceId:b.value.sourceId,metricId:A.id});for(const I of g.filter(C=>C.metric===a&&C.field))I.sourceId=b.value.sourceId,I.metricId=A.id}o.some(b=>b.status==="rejected")?$("部分指标目录读取失败，请到系统设置刷新数据库。"):p.length||$("请在右上角任务设置中配置本任务的指标范围。")}}const N=n.id,D={dirty(){c++,f=void 0},id:N,name:n.name,sendTime:n.sendTime,businessDate:`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}-${String(S.getDate()).padStart(2,"0")}`,definitions:g,metrics:E,value:o=>{var j,b,A;return o.metric==="date"?"业务日期":((j=f==null?void 0:f.fieldValues)==null?void 0:j[o.key])||((A=f==null?void 0:f.fieldValues)==null?void 0:A[((b=g.find(a=>a.field&&a.metric===o.metric&&a.scope===o.scope))==null?void 0:b.key)||""])||""},mount:(o,j)=>{Dn(o,n.draftTemplateDocument,g,j)||$n(o,n.draftTemplate,g,j)},async materialize(o){var I;if(o.field||o.metric==="date")return o;const j=g.find(C=>C.metric===o.metric&&C.sourceId),b=o.sourceId||(j==null?void 0:j.sourceId),A=o.metricId||(j==null?void 0:j.metricId);if(!b||!A)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const a=JSON.stringify([b,A,o.scope,o.label]);let T=y.get(a);return T||(T=M("daily.addField",{id:N,sourceId:b,metricId:A,placeholder:"",displayName:o.label,...o.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(I=xe.find(C=>C.key===o.scope))==null?void 0:I.spec}}).then(({field:C})=>{h.set(C.placeholder,C);const U={...o,key:C.placeholder,field:C,sourceId:b,metricId:A};return g.some(x=>x.key===U.key)||g.push(U),s.changed(),U}).catch(C=>{throw y.delete(a),C}),y.set(a,T)),T},save(o){const j=Be(o),b=t.catch(()=>{}).then(()=>r?void 0:w(j));return t=b,b},preview(o,j){const b=l==null?void 0:l.querySelector("#preview");ee(b,!0);const A=Be(o),a=++c,T=t.catch(()=>{}).then(async()=>{if(r||a!==c)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await w(A);const I=await M("daily.preview",{id:N,businessDate:j},12e4),C={...I,errors:I.fieldErrors||[],message:I.succeeded?"已生成 · "+j:I.message};return a===c&&!r&&(f=C),C}).finally(()=>ee(b,!1));return t=T,T},async send(o,j,b){if(!v){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");v=!0,z();try{await D.save(o);const A=await M(j==="test"?"daily.test":"daily.sendToday",j==="test"?{id:N,businessDate:b}:{id:N},12e4);if(!A.succeeded)throw new Error(A.message||"发送失败，请查看运行记录");$(A.alreadySent?"今日当前内容已发送":j==="test"?"测试发送成功":"今日消息已发送"),s.changed()}finally{v=!1,z()}}},configureAdvanced(o,j){const b=g.some(T=>T.metric===o&&T.scope==="month"),A=b?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];j.replaceChildren(...A.map(T=>new Option(T.label,T.key)));const a=j.ownerDocument.querySelector("#scope-year");a&&(a.disabled=b,a.value="0")},resolveAdvanced(o,j){return o==="month"?"month":xe.find(b=>b.spec.granularity===o&&b.spec.yearOffset===Number(j)).key},async saveBasics(o,j){const b=Array.from((l==null?void 0:l.querySelectorAll("[data-context-source]:checked"))||[]).map(A=>A.value);await M("daily.saveBasics",{id:N,name:o,sendTime:j,metricSourceIds:b}),n.name=o,n.sendTime=j,p=b,D.name=o,await F(),s.changed()},connect(o){var W;l=o,o.title=n.name,o.querySelector("#runs p").textContent="";const j=o.querySelector("header > span");j.removeAttribute("aria-hidden"),j.setAttribute("role","button"),j.setAttribute("tabindex","0"),j.setAttribute("aria-label","返回任务列表");const b=async()=>{const m=o.querySelector("#editor");m.contentEditable="false",c++;try{await D.save(m),s.back()}catch(q){$(String(q)),m.contentEditable="true"}};j.addEventListener("click",b),j.addEventListener("keydown",m=>{m.key==="Enter"&&b()});const A=o.querySelector("#settings"),a=o.createElement("fieldset");a.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const T=o.createElement("legend");T.textContent="本任务的指标范围",a.append(T);for(const m of n.sources){const q=o.createElement("label");q.style.cssText="display:flex;gap:8px;margin:8px 0";const R=o.createElement("input");R.type="checkbox",R.value=m.id,R.dataset.contextSource="",R.checked=p.includes(m.id),R.style.width="auto",q.append(R,o.createTextNode(m.name)),a.append(q)}(W=A.querySelector("p"))==null||W.replaceWith(a);const I=o.createElement("button");I.textContent="数据库设置",I.type="button",I.onclick=()=>{var m;A.close(),(m=s.openSettings)==null||m.call(s)},a.after(I);const C=o.querySelector("footer");for(const[m,q]of[["test","测试发送"],["today","发送今日消息"]]){const R=o.createElement("button");R.textContent=q,R.dataset.send=m,R.onclick=async()=>{const O=o.querySelector("#editor");O.contentEditable="false";try{await D.send(O,m,o.querySelector("#date").value)}catch(G){$(String(G))}finally{O.contentEditable="true"}},C.append(R)}const U=o.createElement("style");U.textContent=He+`
`+_e+`
`+Ke+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,o.head.append(U);const x=o.createElement("span");x.className="production-message-demo",x.hidden=!0,o.body.append(x),d=Ue.createRoot(o.querySelector("#date-picker")),d.render(e.jsx(In,{input:o.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const B=o.querySelector("#runs");if(B.ontoggle=async()=>{if(!B.open)return;const m=B.querySelector("p");ee(m,!0);try{const q=await M("daily.runs",{id:N});m.textContent=q.runs.length?"":"暂无运行记录";for(const R of q.runs){const O=o.createElement("div");O.textContent=`${R.time} · ${R.status} · ${R.businessDate}${R.error?" · "+R.error:""}`,m.append(O)}}catch(q){m.textContent=String(q)}finally{ee(m,!1)}},!n.notificationConfigured){const m=o.createElement("div");m.className="notice",m.dataset.notificationNotice="",m.append(o.createTextNode("通知渠道尚未配置。 "));const q=o.createElement("button");q.textContent="通知设置",q.onclick=s.openSettings||null,m.append(q),o.querySelector("#message").before(m)}z(),F().catch(m=>$(String(m)))},dispose(){r=!0,c++,d==null||d.unmount(),window.removeEventListener("production-settings-updated",k)}};return D}function In({input:n}){const[s,r]=u.useState(n.value);return e.jsx(ce,{value:s,onChange:v=>{var d;r(v),n.value=v,n.dispatchEvent(new(((d=n.ownerDocument.defaultView)==null?void 0:d.Event)||Event)("change",{bubbles:!0}))}})}const Rn=`<!doctype html>\r
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
`,Oe=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Qe({id:n,...s}){const r=u.useRef(null),[v,d]=u.useState(""),[l,t]=u.useState(!0);return u.useEffect(()=>{let c=!1,f;const S=r.current;return d(""),t(!0),M("notionFill.get",{id:n}).then(g=>{c||(f=zn(g,s),S.onload=()=>{var E,p;if(!c&&((E=S.contentDocument)!=null&&E.getElementById("date-picker")))try{f.connect(S.contentDocument),Promise.resolve((p=S.contentDocument.fonts)==null?void 0:p.ready).then(()=>{c||t(!1)})}catch(h){d(String(h))}},S.srcdoc=Rn.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Je,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ge,window.location.href).href))}).catch(g=>{c||d(String(g.message||g))}),()=>{c=!0,S.onload=null,f==null||f.dispose()}},[n]),e.jsxs("div",{className:"message-template-host",children:[v&&e.jsx("p",{role:"alert",children:v}),e.jsx("iframe",{ref:r,title:"原材料自动入库",style:{visibility:l?"hidden":void 0}}),l&&!v&&e.jsx(Ne,{kind:"notion"})]})}function zn(n,s){let r={...n,runTime:n.runTime||"00:00"},v,d,l=!1,t=!1,c=0,f=0,S=Oe(),g,E=r.isEnabled;const p=m=>v.getElementById(m),h=m=>p(m),y=m=>p(m),$=m=>p(m),z=m=>m instanceof Error?m.message:String(m),w=m=>m.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function k(m,q=!1){p("feedback").textContent=m,p("feedback").className=q?"callout error":""}function F(){return!!(r.sourcePageUrl&&r.username&&r.passwordConfigured)}function N(){d==null||d.render(e.jsx(ce,{value:S,disabled:t,onChange:o}))}function D(){for(const m of["preview","source-test","yesterday","settings-open","back","confirm-run"])y(m).disabled=t;y("preview").disabled=t||!F()||!r.notionConfigured,y("source-test").disabled=t||!F(),y("run").disabled=t||!g,v.querySelectorAll("#settings button, #settings input").forEach(m=>m.disabled=t),y("toggle").disabled=t||!r.schedulingAvailable,y("preview").textContent=t?"处理中…":"生成预览",p("name").textContent=r.name,p("enabled").textContent=r.isEnabled?r.schedulerInstalled?"已启用":"计划异常":"未启用",p("target-name").textContent=r.targetDataSourceName,p("settings-target-name").textContent=r.targetDataSourceName,h("password").placeholder=r.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",N()}function P(m="尚未生成预览"){c++,g=void 0,p("source-empty").hidden=!1,p("source-values").hidden=!0,p("source-error").hidden=!0,p("record").hidden=!0,p("target-status").hidden=!0,p("target-empty").hidden=!1,p("target-empty").querySelector("strong").textContent=m,p("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",y("run").textContent="执行本日期",y("run").disabled=!0,$("confirm").open&&$("confirm").close()}function o(m){t||(S=m,h("date").value=m,P("待重新预览"),k(""),N())}function j(m){p("source-empty").hidden=!0,p("source-values").hidden=!1;for(const[q,R]of[["plate",m.plateWeight],["section",m.sectionWeight],["total",m.totalWeight]])p(q).textContent=w(R)}function b(m){j(m),p("target-empty").hidden=!0,p("record").hidden=!1,p("record-title").textContent=`${m.businessDate} 入库`,p("record-date").textContent=m.businessDate,p("record-plate").textContent=`${w(m.plateWeight)} 吨`,p("record-section").textContent=`${w(m.sectionWeight)} 吨`,p("target-status").hidden=!1,p("target-status").textContent=m.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",y("run").textContent=m.targetRecordExists?"验证查重":"执行本日期"}function A(m){p("run-count").textContent=m.length?`· ${m.length}`:"";const q=m.map(R=>{const O=v.createElement("div");O.className="run";const G=v.createElement("span");G.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[R.source]||R.source;const ne=v.createElement("div");ne.textContent=R.error||R.message||(R.status==="created"?"已新增":R.status==="failed"?"执行失败":"已检查"),R.status==="failed"&&(ne.style.color="#B91C1C");const re=v.createElement("p");re.textContent=R.status==="failed"?R.businessDate:`${R.businessDate} · 板材 ${w(R.plateWeight)} 吨 · 型材 ${w(R.sectionWeight)} 吨`,ne.append(re);const Q=v.createElement("small");return Q.textContent=R.time,O.append(G,ne,Q),O});p("runs-body").replaceChildren(...q),m.length||(p("runs-body").textContent="暂无运行记录")}async function a(){const m=++f;ee(p("runs-body"),!0);try{const q=await M("notionFill.runs",{id:r.id});!l&&m===f&&A(q.runs)}catch(q){!l&&m===f&&(p("runs-body").textContent=`运行记录读取失败：${z(q)}；重新展开可重试。`)}finally{!l&&m===f&&ee(p("runs-body"),!1)}}function T(){Promise.resolve(s.changed()).catch(()=>{})}async function I(m){if(t||!S)return;t=!0,P("正在读取…"),ee(p("source-empty"),!0),ee(p("target-empty"),!0);const q=c;D(),k("");try{const R=await M(m?"notionFill.testSource":"notionFill.test",{id:r.id,businessDate:S},12e4);if(l||q!==c)return;if(!R.succeeded)throw new Error(R.message||"读取失败");m?(j(R),p("target-empty").querySelector("strong").textContent="尚未检查数据库",p("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(r.validated=!0,g=R,b(R)),T()}catch(R){if(l||q!==c)return;P("本次预览未完成"),p("source-error").hidden=!1,p("source-error").textContent=z(R)}finally{l||(ee(p("source-empty"),!1),ee(p("target-empty"),!1),t=!1,D(),a())}}async function C(){if(t||!g||!$("confirm").open)return;const m=g.businessDate;$("confirm").close(),t=!0,D(),k("");try{const q=await M("notionFill.runNow",{id:r.id,businessDate:m},12e4);if(l)return;if(!q.succeeded)throw new Error(q.message||"执行失败");g={...g,targetRecordExists:!0},p("target-status").textContent=q.message,y("run").textContent="验证查重",k(q.created?"数据库写入成功。":"该日期已有记录，本次已跳过。"),T()}catch(q){l||(P("执行未完成，请重新预览"),k(z(q),!0))}finally{l||(t=!1,D(),a())}}function U(){return h("task-name").value.trim()!==r.name||h("url").value.trim().replace(/\/+$/,"")!==r.sourcePageUrl||h("username").value.trim()!==r.username||!!h("password").value}function x(){y("toggle").setAttribute("aria-checked",String(E)),p("schedule-hint").textContent=r.schedulingAvailable?U()?"配置已修改：保存后需重新预览，再启用。":r.isEnabled&&!r.schedulerInstalled?r.schedulerMessage:r.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function B(m){if(m.preventDefault(),t)return;const q=h("task-name").value.trim(),R=h("username").value.trim();if(!q||!R){p("settings-note").textContent="任务名称和用户名不能为空。";return}const O=U(),G=h("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(G)){p("settings-note").textContent="请选择有效的执行时间。";return}const ne=O||G!==r.runTime,re=O?!1:E;let Q=!1;t=!0,D();try{if(ne){const K=h("url").value.trim().replace(/\/+$/,""),ie=h("password").value;if(await M("notionFill.save",{id:r.id,name:q,sourcePageUrl:K,username:R,password:ie,runTime:G}),l)return;Q=!0,r={...r,name:q,sourcePageUrl:K,username:R,runTime:G,passwordConfigured:r.passwordConfigured||!!ie,isEnabled:O?!1:r.isEnabled,validated:O?!1:r.validated},h("password").value="",O&&P("配置已修改，请重新预览")}if(re!==r.isEnabled){const K=await M("automation.setEnabled",{id:r.id,taskType:"notion_fill",enabled:re});if(l)return;if(r.isEnabled=K.enabled,K.enabled!==re)throw new Error(K.message||"定时任务状态未更新");Q=!0}const se=await M("notionFill.get",{id:r.id});if(l)return;r=se,$("settings").close(),k(O?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(se){l||(p("settings-note").textContent=`${Q?"设置已更新，但后续操作失败：":""}${z(se)}`)}finally{l||(t=!1,E=r.isEnabled,D(),x(),Q&&T())}}async function W(){if(t||l)return;const m=c;try{const q=await M("notionFill.get",{id:r.id});if(l||t||m!==c)return;r=q,P("系统设置已更新，请重新预览"),D(),k(r.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"数据库连接尚未配置，仍可仅测试 93 读取。")}catch(q){l||k(z(q),!0)}}return{connect(m){d==null||d.unmount(),v=m;const q=v.createElement("style");q.textContent=He+`
`+_e+`
`+Ke+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,v.head.append(q);const R=v.createElement("span");R.className="production-message-demo",R.hidden=!0,v.body.append(R),d=Ue.createRoot(p("date-picker")),h("date").value=S,h("date").onchange=()=>o(h("date").value),y("yesterday").onclick=()=>o(Oe()),y("preview").onclick=()=>{I(!1)},y("source-test").onclick=()=>{I(!0)},y("back").onclick=s.back,y("run").onclick=()=>{t||!g||(p("confirm-title").textContent=g.targetRecordExists?"验证查重":"执行本日期",p("confirm-copy").textContent=g.targetRecordExists?`${g.businessDate} 已有记录，本次执行应跳过。`:`将向“${r.targetDataSourceName}”新增 ${g.businessDate} 的记录：板材 ${w(g.plateWeight)} 吨，型材 ${w(g.sectionWeight)} 吨。`,$("confirm").showModal())},y("confirm-run").onclick=()=>{C()},y("settings-open").onclick=()=>{h("task-name").value=r.name,h("url").value=r.sourcePageUrl,h("username").value=r.username,h("password").value="",h("run-time").value=r.runTime,h("password").required=!r.passwordConfigured,p("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",E=r.isEnabled,x(),$("settings").showModal()},y("toggle").onclick=()=>{if(r.schedulingAvailable){if(!E&&(!r.validated||U())){p("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}E=!E,x()}};for(const O of["task-name","url","username","password"])h(O).oninput=()=>{U()&&(E=!1),x()};p("settings-form").onsubmit=O=>{B(O)},$("settings").onclose=()=>{h("password").value=""},$("settings").oncancel=O=>{t&&O.preventDefault()},v.querySelectorAll("[data-close]").forEach(O=>O.onclick=()=>{t||$(O.dataset.close).close()}),y("system-settings").hidden=!s.openSettings,y("system-settings").onclick=()=>{var O;$("settings").close(),(O=s.openSettings)==null||O.call(s)},v.querySelector(".runs").ontoggle=O=>{O.currentTarget.open&&a()},window.addEventListener("production-settings-updated",W),P(),D(),F()?r.notionConfigured||k("数据库连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):k("请先在任务设置中补全 93 系统连接配置。")},dispose(){l=!0,c++,f++,d==null||d.unmount(),window.removeEventListener("production-settings-updated",W)}}}function qn({onCreated:n,onBack:s,onCancel:r}){const[v,d]=u.useState(2),[l,t]=u.useState("日报任务"),[c,f]=u.useState("17:30"),[S,g]=u.useState(!1),[E,p]=u.useState("");async function h(){g(!0),p("");try{const y=await M("daily.create",{name:l.trim(),sendTime:c});await n(y)}catch(y){p(y instanceof Error?y.message:String(y))}finally{g(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(Fn,{current:v}),E&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:E})]})}),v===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:y=>t(y.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:s,children:[e.jsx(me,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>d(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"日报必要配置"}),e.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),e.jsxs("label",{children:["每天发送时间",e.jsx("input",{type:"time",value:c,onChange:y=>f(y.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"任务类型"}),e.jsx("strong",{children:"日报推送"}),e.jsx("span",{children:"创建后继续"}),e.jsx("strong",{children:"消息内容 → 预览与测试"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:S,onClick:()=>d(2),children:[e.jsx(me,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:S,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:S||!c,onClick:h,children:[S&&e.jsx(pe,{className:"spin"}),"创建任务"]})]})]})]})}function Fn({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Mn({onCreated:n,onBack:s,onCancel:r}){const[v,d]=u.useState(2),[l,t]=u.useState("原材料入库自动填报"),[c,f]=u.useState(""),[S,g]=u.useState(""),[E,p]=u.useState(""),[h,y]=u.useState(!1),[$,z]=u.useState("");async function w(){y(!0),z("");try{const k=await M("notionFill.create",{name:l.trim(),sourcePageUrl:c.trim(),username:S.trim(),password:E});await n(k)}catch(k){z(k instanceof Error?k.message:String(k))}finally{y(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(Ln,{current:v}),$&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"创建失败"}),e.jsx("span",{children:$})]})}),v===2?e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"基本信息"}),e.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),e.jsxs("label",{children:["任务名称",e.jsx("input",{value:l,autoFocus:!0,onChange:k=>t(k.target.value)})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",onClick:s,children:[e.jsx(me,{}),"返回选择类型"]}),e.jsx("button",{className:"primary",disabled:!l.trim(),onClick:()=>d(3),children:"下一步"})]})]}):e.jsxs("div",{className:"automation-create-step",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"93 系统连接"}),e.jsx("p",{children:"凭据只归当前自动填报任务所有，并使用现有 Windows 加密存储。"})]}),e.jsxs("label",{children:["材料入库业务页面",e.jsx("input",{type:"url",value:c,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>f(k.target.value)})]}),e.jsxs("label",{children:["93 系统用户名",e.jsx("input",{value:S,autoComplete:"username",onChange:k=>g(k.target.value)})]}),e.jsxs("label",{children:["93 系统密码",e.jsx("input",{type:"password",value:E,autoComplete:"new-password",onChange:k=>p(k.target.value)})]}),e.jsxs("div",{className:"automation-create-summary",children:[e.jsx("span",{children:"填报目标"}),e.jsx("strong",{children:"原材料入库数据库"}),e.jsx("span",{children:"执行时间"}),e.jsx("strong",{children:"每天 00:00 · 填报前一天"}),e.jsx("span",{children:"写入方式"}),e.jsx("strong",{children:"按日期查重，仅新增"})]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsxs("button",{className:"ghost",disabled:h,onClick:()=>d(2),children:[e.jsx(me,{}),"上一步"]}),e.jsx("button",{className:"secondary",disabled:h,onClick:r,children:"取消"}),e.jsxs("button",{className:"primary",disabled:h||!c.trim()||!S.trim()||!E,onClick:w,children:[h&&e.jsx(pe,{className:"spin"}),"创建任务"]})]})]})]})}function Ln({current:n}){return e.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[e.jsx("li",{className:"done",children:"1 选择类型"}),e.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),e.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const en=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Teable 取数填报。",renderCreate:n=>e.jsx(Cn,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>e.jsx(Ye,{id:n.id,changed:n.changed},n.id),loadRuns:n=>M("tencentSheet.runs",{id:n}).then(({runs:s})=>s.map(r=>({...r,source:r.source==="background-test"?"后台自动测试":r.source==="automatic"?"定时填报":"前台测试",title:r.businessDate,details:r.message?[r.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>e.jsx(qn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>e.jsx(Ze,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("daily.runs",{id:n}).then(({runs:s})=>s.map(r=>({id:r.id,time:r.time,source:r.source,status:r.status,title:r.textSummary||`业务日期 ${r.businessDate||"—"}`,details:[`业务日期：${r.businessDate||"—"}`,`阶段：${r.stage}`,`尝试：${r.attempts}`],error:r.error})))},{taskType:"notion_fill",name:"Teable 自动填报",description:"读取 93 系统前一天入库数据并新增到 Teable。",renderCreate:n=>e.jsx(Mn,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Teable 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>e.jsx(Qe,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>M("notionFill.runs",{id:n}).then(({runs:s})=>s.map(r=>({id:r.id,time:r.time,source:r.source==="source-test"?"93读取测试":r.source==="test"?"只读测试":r.source==="manual"?"手动执行":"自动执行",status:r.status==="created"?"已新增":r.status==="checked"?"已检查":"失败",title:`${r.businessDate} · 板材 ${r.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${r.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[r.message].filter(Boolean),error:r.error})))}];function Ve(n){return en.find(s=>s.taskType===n)}const ve=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function Vn({openSettings:n,taskType:s=""}){var U;const[r,v]=u.useState([]),[d,l]=u.useState(!0),[t,c]=u.useState(),[f,S]=u.useState(""),[g,E]=u.useState(""),[p,h]=u.useState(),[y,$]=u.useState(),[z,w]=u.useState(),[k,F]=u.useState(!1),[N,D]=u.useState(""),[P,o]=u.useState(["daily_report","notion_fill"]),j=s?r.filter(x=>x.taskType===s):r,b=en.filter(x=>P.includes(x.taskType)&&(!s||x.taskType===s)),A=dn(cn.dailyReport,s).name,a=()=>M("automation.list").then(x=>{x.availableTaskTypes&&o(x.availableTaskTypes);const B=Array.isArray(x.tasks)?x.tasks:r;return v(B),c(W=>W&&(B.find(m=>m.taskType===W.taskType&&m.id===W.id)||W)),B});u.useEffect(()=>{a().catch(x=>h(ve(x))).finally(()=>l(!1))},[]),u.useEffect(()=>{c(void 0),S(""),h(void 0),$(void 0),w(void 0),F(!1),D("")},[s]),u.useEffect(()=>{if(!y)return;const x=()=>$(void 0),B=W=>W.key==="Escape"&&x();return window.addEventListener("pointerdown",x),window.addEventListener("keydown",B),window.addEventListener("blur",x),()=>{window.removeEventListener("pointerdown",x),window.removeEventListener("keydown",B),window.removeEventListener("blur",x)}},[y]);async function T(x,B){const W=await a();F(!1),D(""),c(W.find(m=>m.taskType===x&&m.id===B.id))}async function I(x){E(x.id),h(void 0);try{const B=await M("automation.setEnabled",{taskType:x.taskType,id:x.id,enabled:!x.isEnabled},6e4);B.missingStep?(S(B.missingStep),c(x),h({tone:"warning",title:"配置尚未完成",message:B.message||""})):await a()}catch(B){h(ve(B))}finally{E("")}}async function C(x){if(!x.isEnabled){E(x.id);try{await M("automation.delete",{taskType:x.taskType,id:x.id}),w(void 0),await a()}catch(B){h(ve(B))}finally{E("")}}}if(d)return e.jsx(ln,{});if(t){const x=Ve(t.taskType);if(x)return e.jsx(Pn,{openSettings:n,task:t,definition:x,focusStep:f,notice:p,refresh:a,back:()=>{c(void 0),S(""),h(void 0),a()}})}return e.jsxs("div",{className:"page daily-page automation-list-page",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsx("h1",{children:A}),e.jsx("p",{children:s==="tencent_sheet_fill"?"先新建任务并保存文档链接，再打开浏览器登录和检查；网页控件、业务字段及定时配置保留在任务详情中。":"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),e.jsx("div",{className:"header-actions",children:e.jsxs("button",{className:"primary",disabled:!b.length,onClick:()=>{D(s),F(!0)},children:[e.jsx(pn,{}),"新建任务"]})})]}),p&&e.jsx("div",{className:`notice ${p.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:p.title}),e.jsx("span",{children:p.message})]})}),e.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[j.map(x=>e.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(x.status)?" needs-attention":""}`,onClick:()=>c(x),onContextMenu:B=>{B.preventDefault(),$({task:x,x:Math.min(B.clientX,window.innerWidth-176),y:Math.min(B.clientY,window.innerHeight-58)})},children:[e.jsxs("div",{className:"job-copy",children:[e.jsx("h2",{children:e.jsx("button",{type:"button",className:"automation-task-name",onClick:B=>{B.stopPropagation(),c(x)},children:x.name||"未命名任务"})}),e.jsxs("p",{children:[x.taskTypeName," · ",x.schedule," · ",x.connectionStatus]})]}),e.jsxs("div",{className:"job-actions",onClick:B=>B.stopPropagation(),children:[e.jsx("span",{className:`job-status ${x.status}`,children:nn(x.status)}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox","aria-label":`启用${x.name||"未命名任务"}`,checked:x.isEnabled,disabled:!x.schedulingAvailable||g===x.id,title:x.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>I(x)}),e.jsx("span",{})]}),e.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${x.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:B=>{const W=B.currentTarget.getBoundingClientRect();$({task:x,x:Math.min(W.left,window.innerWidth-176),y:Math.min(W.bottom+4,window.innerHeight-58)})},children:e.jsx(un,{})})]}),e.jsxs("div",{className:"automation-card-footer",children:["最近运行：",x.lastRun]})]},`${x.taskType}:${x.id}`)),!j.length&&e.jsxs("div",{className:"empty-state",children:[e.jsx(mn,{}),e.jsx("h2",{children:s?`暂无${A}任务`:"还没有自动化任务"}),e.jsx("p",{children:b.length?"新建任务后进入对应的专用配置界面。":"当前环境尚未开放此类任务创建。"})]})]}),!!j.length&&e.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置、运行与定时设置。"}),y&&e.jsx("div",{className:"job-context-menu",role:"menu",style:{left:y.x,top:y.y},onPointerDown:x=>x.stopPropagation(),children:e.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:y.task.isEnabled||g===y.task.id,onClick:()=>{w(y.task),$(void 0)},children:[e.jsx(fn,{}),y.task.isEnabled?"停用后可删除":"删除任务"]})}),e.jsx(Ae,{open:!!z,onOpenChange:x=>!x&&w(void 0),children:e.jsxs(Ie,{children:[e.jsx(Re,{className:"dialog-overlay"}),e.jsxs(ze,{className:"dialog",children:[e.jsx(qe,{children:"删除自动化任务？"}),e.jsxs(Fe,{children:["将删除“",z==null?void 0:z.name,"”及其业务记录，此操作无法撤销。"]}),e.jsxs("div",{className:"dialog-actions",children:[e.jsx("button",{className:"secondary",onClick:()=>w(void 0),children:"取消"}),e.jsx("button",{className:"danger",disabled:!!g,onClick:()=>z&&C(z),children:"确认删除"})]})]})]})}),e.jsx(Ae,{open:k,onOpenChange:x=>{F(x),x||D("")},children:e.jsxs(Ie,{children:[e.jsx(Re,{className:"dialog-overlay"}),e.jsxs(ze,{className:"dialog automation-create-dialog",children:[e.jsx(qe,{children:"新建自动化任务"}),e.jsx(Fe,{children:N?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),N?(U=Ve(N))==null?void 0:U.renderCreate({onCreated:x=>T(N,x),onBack:()=>D(""),onCancel:()=>{F(!1),D("")}}):e.jsx("div",{className:"automation-create-types",children:b.map(x=>e.jsxs("button",{onClick:()=>D(x.taskType),children:[e.jsx("strong",{children:x.name}),e.jsx("span",{children:x.description})]},x.taskType))})]})]})})]})}function Pn({openSettings:n,task:s,definition:r,focusStep:v,notice:d,refresh:l,back:t}){const[c,f]=u.useState(v?r.resolveSection(v):r.includeBasics===!1?r.taskTabs[0].id:"basics"),S=s.taskType==="daily_report",[g,E]=u.useState(),[p,h]=u.useState(""),[y,$]=u.useState(!1),z=[...r.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...r.taskTabs,{id:"runs",label:"运行记录"}],w=[...s.missingMessage?[{id:`configuration:${s.missingStep||"unknown"}`,title:r.issueTitle(s.missingStep||""),message:s.missingMessage,section:r.resolveSection(s.missingStep||"")}]:[],...s.status==="schedule-error"&&s.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:s.schedulerMessage,section:"basics"}]:[]];async function k(){$(!0),h("");try{E(await r.loadRuns(s.id))}catch(N){h(N instanceof Error?N.message:String(N))}finally{$(!1)}}u.useEffect(()=>{c==="runs"&&g===void 0&&k()},[c,g]);function F(N,D){var o;if(N.key!=="ArrowLeft"&&N.key!=="ArrowRight")return;N.preventDefault();const P=(D+(N.key==="ArrowRight"?1:-1)+z.length)%z.length;f(z[P].id),z[P].id==="basics"&&l().catch(()=>{}),(o=document.getElementById(`automation-tab-${z[P].id}`))==null||o.focus()}return s.taskType==="tencent_sheet_fill"?e.jsx(Ye,{id:s.id,name:s.name,back:t,changed:()=>{l().catch(()=>{})}},s.id):S?e.jsx(Ze,{id:s.id,back:t,changed:l,openSettings:n}):s.taskType==="notion_fill"?e.jsx(Qe,{id:s.id,back:t,changed:l,openSettings:n}):e.jsxs("div",{className:"page daily-page automation-detail",children:[e.jsxs("header",{children:[e.jsxs("div",{children:[e.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:t,children:[e.jsx(me,{}),"返回任务列表"]}),e.jsx("h1",{title:s.name||"未命名任务",children:s.name||"未命名任务"}),e.jsxs("p",{children:[s.taskTypeName," · ",s.schedule]})]}),e.jsx("span",{className:`job-status ${s.status}`,children:nn(s.status)})]}),e.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:z.map((N,D)=>e.jsx("button",{type:"button",role:"tab",id:`automation-tab-${N.id}`,"aria-selected":c===N.id,"aria-controls":`automation-panel-${N.id}`,tabIndex:c===N.id?0:-1,onClick:()=>{f(N.id),N.id==="basics"&&l().catch(()=>{})},onKeyDown:P=>F(P,D),children:N.label},N.id))}),e.jsxs("div",{children:[d&&e.jsx("div",{className:`notice ${d.tone}`,role:"status",children:e.jsxs("div",{children:[e.jsx("strong",{children:d.title}),e.jsx("span",{children:d.message})]})}),!!w.length&&e.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[e.jsxs("div",{className:"automation-issues-heading",children:[e.jsx(hn,{}),e.jsxs("div",{children:[e.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),e.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),e.jsxs("span",{children:[w.length," 项"]})]}),e.jsx("ul",{children:w.map(N=>{var D;return e.jsxs("li",{children:[e.jsxs("div",{children:[e.jsx("strong",{children:N.title}),e.jsx("span",{children:N.message})]}),e.jsxs("button",{type:"button",onClick:()=>{f(N.section)},children:["前往",((D=z.find(P=>P.id===N.section))==null?void 0:D.label)||"处理",e.jsx(gn,{})]})]},N.id)})})]}),e.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${c}`,"aria-labelledby":`automation-tab-${c}`,children:[e.jsx("div",{hidden:c==="runs",children:r.renderEditor({id:s.id,section:c,openSettings:n,navigate:f,changed:()=>{l().catch(()=>{})}})}),c==="runs"&&e.jsxs("section",{className:"surface automation-runs",children:[e.jsxs("div",{className:"automation-runs-heading",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"运行记录"}),e.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),e.jsxs("button",{className:"secondary",disabled:y,onClick:k,children:[y?e.jsx(pe,{className:"spin"}):e.jsx(xn,{}),"刷新"]})]}),p&&e.jsx("div",{className:"notice error",role:"alert",children:e.jsxs("div",{children:[e.jsx("strong",{children:"运行记录读取失败"}),e.jsx("span",{children:p})]})}),e.jsx("div",{className:"automation-run-list",children:g==null?void 0:g.map(N=>e.jsxs("details",{children:[e.jsxs("summary",{children:[e.jsx("span",{children:N.time}),e.jsx("span",{children:N.source}),e.jsx("strong",{children:N.title}),e.jsx("b",{className:N.error?"error-text":"",children:N.status})]}),e.jsxs("div",{children:[N.details.map(D=>e.jsx("p",{children:D},D)),N.error&&e.jsxs("p",{className:"run-error",children:["错误：",N.error]})]})]},N.id))}),y&&!g&&e.jsx(we,{label:"正在加载运行记录"}),!y&&g&&!g.length&&e.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function nn(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}export{Vn as AutomationPage};
