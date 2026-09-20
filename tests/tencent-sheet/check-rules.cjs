'use strict';
const assert=require('node:assert/strict');
const core=require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
const emptyJob=core.validate({documentUrl:'https://docs.qq.com/sheet/new',fields:[],rules:{},requireTeaching:true});
for(const key of ['company','park','startColumn','cuttingRow','weldingRow','inboundRow','sheetPattern'])assert.equal(emptyJob[key],undefined,'new tasks must not inherit fixed legacy business '+key);
assert.throws(()=>core.sheetName(emptyJob,'2026-09-14'),/工作表名称/);
const sample=(address,day)=>({address,date:'2026-09-'+String(day).padStart(2,'0')});
const learned=(first,second,dateAddress,labelAddress,format='{yyyy}/{M}/{d}')=>{
  const rule=core.inferRule([first,second]);
  return core.normalizeRule({...rule,confirmation:core.prediction(rule),dateAnchor:{address:dateAddress,format},labelAnchor:{address:labelAddress,expected:'项目'}});
};
const right=learned(sample('F9',1),sample('G9',2),'F2','C9');
assert.equal(core.ruleAddress(right,'2026-10-09'),'N9');
const down=learned(sample('F9',1),sample('F18',4),'A9','F2');
assert.equal(down.rowStep,3);assert.equal(core.ruleAddress(down,'2026-09-09'),'F33');
assert.equal(core.ruleAddress(down,'2026-09-09',down.dateAnchor.address),'A33');
const pairs=learned(sample('F35',1),sample('H35',2),'F24','F25');
assert.equal(core.ruleAddress(pairs,'2026-09-09'),'V35');
assert.equal(core.ruleAddress(pairs,'2026-09-09',pairs.dateAnchor.address),'V24');
for(const samples of [
  [sample('F9',1),sample('F9',2)], [sample('F9',1),sample('G10',2)],
  [sample('G9',1),sample('F9',2)], [sample('F9',1),sample('G9',3)],
  [sample('F9',2),sample('G9',1)], [sample('F9',1),{date:'2026-10-02',address:'G9'}],
  [sample('F1',10),sample('F2',11)], [sample('XFD9',1),sample('XFE9',2)]
])assert.throws(()=>core.inferRule(samples));
assert.throws(()=>core.dateParts('2026-02-29'));
assert.throws(()=>core.addressParts('F9:G9'));
assert.throws(()=>core.normalizeRule({...right,confirmation:{date:'2026-09-03',address:'Z9'}}),/第三个日期/);
assert.equal(core.normalizeRule({...down,rowStep:999}).rowStep,3);
assert.deepEqual(core.prediction(core.inferRule([sample('AC9',29),sample('AD9',30)])),{date:'2026-09-28',address:'AB9'});
assert.equal(core.ruleAddress(right,'2024-02-29'),'AH9');
assert.deepEqual(core.sheetBinding('生产明细'),{sheetMode:'fixed',sheetName:'生产明细'});
assert.equal(core.sheetBinding('下料、装焊（26年9月）').sheetPattern,'下料、装焊（{yy}年{M}月）');
const values={cutting:1,welding:2,section:3,plate:4};
assert.throws(()=>core.plan({sheetReferenceName:'月报'},'2026-09-09',values),/新增业务字段/);
const config={sheetReferenceName:'月报（26年9月）',fields:[{id:'cutting',name:'数量'}],rules:{cutting:down}};
assert.equal(core.plan(config,'2026-09-09',values).rows[0].address,'F33');
assert.equal(core.plan({...config,rules:JSON.parse(JSON.stringify(config.rules))},'2026-09-09',values).rows[0].address,'F33');
const fixed={...config,sheetReferenceName:'生产明细',sheetMode:'fixed',sheetName:'生产明细',rules:{cutting:{...down,dateAnchor:{...down.dateAnchor,format:'{d}'}}}};
assert.equal(core.plan(fixed,'2026-09-09',values).sheet,'生产明细');
assert.throws(()=>core.plan(fixed,'2026-10-09',values),/跨月/);
assert.equal(core.plan({...fixed,rules:{cutting:down}},'2026-10-09',values).rows[0].address,'F33');
assert.throws(()=>core.plan({...config,fields:[{id:'cutting',name:'甲'},{id:'welding',name:'乙'}],rules:{cutting:right,welding:right}},'2026-09-09',values),/重复/);
console.log('PASS: horizontal/vertical strides, backward extrapolation, bounds, month transitions, fixed sheets, persisted rules');
const custom={...config,fields:[{id:'quality',name:'合格数量',unit:'件'}],rules:{quality:down}};
assert.equal(core.plan(custom,'2026-09-09',{quality:7}).rows[0].address,'F33');
assert.equal(core.plan(custom,'2026-09-09',{quality:7}).rows[0].label,'合格数量');
assert.throws(()=>core.plan({...custom,rules:{}},'2026-09-09',{quality:7}),/尚未示范/);
assert.throws(()=>core.plan({...custom,fields:[],rules:{}},'2026-09-09',{}),/新增业务字段/);
assert.throws(()=>core.validate({...custom,fields:{}}),/字段列表/);
assert.throws(()=>core.validate({...custom,fields:[...custom.fields,...custom.fields]}),/重复/);
assert.throws(()=>core.validate({...custom,rules:{other:down}}),/示范规则无效/);
console.log('PASS: arbitrary business field mapping, empty and duplicate definitions, missing and orphaned rules');
const named={...custom,sheetReferenceName:'质量（26年9月）'};
assert.equal(core.plan(named,'2026-08-31',{quality:7}).sheet,'质量（26年8月）');
assert.equal(core.plan(named,'2026-12-31',{quality:7}).sheet,'质量（26年12月）');
assert.equal(core.plan(named,'2027-01-01',{quality:7}).sheet,'质量（27年1月）');
assert.equal(core.plan({...named,sheetReferenceName:'质量汇总'},'2027-01-01',{quality:7}).sheet,'质量汇总');
console.log('PASS: named sheets follow the explicit business month across backfills and year boundaries');
const todayConfig=core.validate(require('./fixture-config.cjs')());
assert.deepEqual(core.controlTestTarget(todayConfig,Date.parse('2026-09-19T16:00:00Z')),{date:'2026-09-20',sheet:'下料、装焊（26年9月）',address:'Y9'});
assert.equal(core.controlTestTarget(todayConfig,Date.parse('2026-09-19T15:59:59Z')).address,'X9');
assert.deepEqual(core.controlTestTarget(todayConfig,Date.parse('2026-09-30T16:00:00Z')),{date:'2026-10-01',sheet:'下料、装焊（26年10月）',address:'F9'});
assert.equal(core.controlTestTarget(core.validate({})),null);
assert.deepEqual(core.controlTestTarget(core.validate({webControls:{sheetTab:{sampleText:'下料、装焊（26年8月）'}}}),Date.parse('2026-09-20T00:00:00Z')),{date:'2026-09-20',sheet:'下料、装焊（26年9月）',address:null});
assert.equal(core.controlTestTarget(core.validate({webControls:{sheetTab:{sampleText:'项目月报 8月'}}}),Date.parse('2026-09-20T00:00:00Z')).sheet,'项目月报 9月');
assert.throws(()=>core.controlTestTarget(core.validate(fixed),Date.parse('2026-10-09T00:00:00Z')),/跨月/);
console.log('PASS: control tests use Beijing today, monthly target and existing rules; no-rule tasks require current selection');
