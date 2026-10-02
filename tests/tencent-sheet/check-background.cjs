'use strict';
// Protocol boundaries only; no external browser, profile, document or scheduler.
const assert=require('node:assert/strict');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
let calls=[],conflict=false,failWrite=false,inspectionFailures=0,inspectionCode='AnchorContentPending';
TencentDocsBrowser.prototype.open=async(_,headless)=>{calls.push(['open',headless]);};
TencentDocsBrowser.prototype.close=async()=>{calls.push(['close']);};
TencentSheetClient.prototype.inspect=async()=>{calls.push(['inspect']);if(inspectionFailures-->0)throw Object.assign(Error('fixture preflight'),{code:inspectionCode});return {prewriteVerified:!conflict,conflict,rows:[]};};
TencentSheetClient.prototype.write=async(_,plan,baseline)=>{calls.push(['write',plan.date,plan.rows[0].value]);assert.equal(baseline.prewriteVerified,true);if(failWrite)throw Error('保存待确认');return {message:'已保存'};};
const request={config:require('./fixture-config.cjs')(),date:'2026-09-09',values:{cutting:1,welding:2,section:3,plate:4}};
async function main(){
  const preview=await dispatch({...request,operation:'inspect'});calls=[];
  await dispatch({...request,operation:'background'});
  assert.deepEqual(calls,[['open',true],['inspect'],['write','2026-09-09',1],['close']]);
  await assert.rejects(dispatch({...request,operation:'write',token:preview.token}),/预览已失效/);
  calls=[];conflict=true;
  await assert.rejects(dispatch({...request,operation:'background'}),e=>/已有内容/.test(e.message)&&e.phase==='check');
  assert.deepEqual(calls,[['open',true],['inspect'],['close']]);
  conflict=false;failWrite=true;calls=[];
  await assert.rejects(dispatch({...request,operation:'background'}),e=>/保存待确认/.test(e.message)&&e.phase===undefined);
  assert.equal(calls.filter(call=>call[0]==='write').length,1);
  assert.deepEqual(calls.at(-1),['close']);
  failWrite=false;calls=[];
  inspectionFailures=2;
  await dispatch({...request,operation:'background'});
  assert.equal(calls.filter(call=>call[0]==='inspect').length,3);
  assert.equal(calls.filter(call=>call[0]==='open').length,3);
  assert.equal(calls.filter(call=>call[0]==='write').length,1);
  inspectionFailures=3;calls=[];
  await assert.rejects(dispatch({...request,operation:'background'}),e=>e.phase==='check');
  assert.equal(calls.filter(call=>call[0]==='inspect').length,3);
  assert.equal(calls.filter(call=>call[0]==='write').length,0);
  for(const code of ['LoginRequired','AnchorMismatch']) {
    inspectionFailures=3;inspectionCode=code;calls=[];
    await assert.rejects(dispatch({...request,operation:'background'}),e=>e.code===code&&e.phase==='check');
    assert.equal(calls.filter(call=>call[0]==='inspect').length,1);
    assert.equal(calls.filter(call=>call[0]==='write').length,0);
  }
  inspectionFailures=0;calls=[];
  await dispatch({...request,operation:'open'});
  assert.deepEqual(calls,[['open',undefined]]);
  await dispatch({operation:'close'});
  assert.deepEqual(calls.at(-1),['close']);
  console.log('PASS: transient preflight retries at most three times with fresh open, permanent failures stop, only preflight errors report check phase; write never retries');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
