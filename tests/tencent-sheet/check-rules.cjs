'use strict';
const assert=require('node:assert/strict');
const core=require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
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
assert.deepEqual(core.plan(core.defaults,'2026-09-09',values).rows.map(row=>row.address),['N9','N19','V35','W35']);
const config={...core.defaults,rules:{cutting:down}};
assert.equal(core.plan(config,'2026-09-09',values).rows[0].address,'F33');
assert.equal(core.plan({...config,rules:JSON.parse(JSON.stringify(config.rules))},'2026-09-09',values).rows[0].address,'F33');
const fixed={...config,sheetMode:'fixed',sheetName:'生产明细',rules:{cutting:{...down,dateAnchor:{...down.dateAnchor,format:'{d}'}}}};
assert.equal(core.plan(fixed,'2026-09-09',values).sheet,'生产明细');
assert.throws(()=>core.plan(fixed,'2026-10-09',values),/跨月/);
assert.equal(core.plan({...fixed,rules:{cutting:down}},'2026-10-09',values).rows[0].address,'F33');
assert.throws(()=>core.plan({...config,rules:{cutting:right,welding:right}},'2026-09-09',values),/重复/);
console.log('PASS: horizontal/vertical strides, backward extrapolation, bounds, month transitions, fixed sheets, persisted rules and legacy mapping');
