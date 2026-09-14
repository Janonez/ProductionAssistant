'use strict';
// Protocol boundaries only; no external browser, profile, document or scheduler.
const assert=require('node:assert/strict');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
let calls=[],conflict=false,failWrite=false;
TencentDocsBrowser.prototype.open=async(_,headless)=>{calls.push(['open',headless]);};
TencentDocsBrowser.prototype.close=async()=>{calls.push(['close']);};
TencentSheetClient.prototype.inspect=async()=>{calls.push(['inspect']);return {prewriteVerified:!conflict,conflict,rows:[]};};
TencentSheetClient.prototype.write=async(_,plan,baseline)=>{calls.push(['write',plan.date,plan.rows[0].value]);assert.equal(baseline.prewriteVerified,true);if(failWrite)throw Error('保存待确认');return {message:'已保存'};};
const request={config:require('./fixture-config.cjs')(),date:'2026-09-09',values:{cutting:1,welding:2,section:3,plate:4}};
async function main(){
  const preview=await dispatch({...request,operation:'inspect'});calls=[];
  await dispatch({...request,operation:'background'});
  assert.deepEqual(calls,[['open',true],['inspect'],['write','2026-09-09',1],['close']]);
  await assert.rejects(dispatch({...request,operation:'write',token:preview.token}),/预览已失效/);
  calls=[];conflict=true;
  await assert.rejects(dispatch({...request,operation:'background'}),/已有内容/);
  assert.deepEqual(calls,[['open',true],['inspect'],['close']]);
  conflict=false;failWrite=true;calls=[];
  await assert.rejects(dispatch({...request,operation:'background'}),/保存待确认/);
  assert.equal(calls.filter(call=>call[0]==='write').length,1);
  assert.deepEqual(calls.at(-1),['close']);
  failWrite=false;calls=[];
  await dispatch({...request,operation:'open'});
  assert.deepEqual(calls,[['open',undefined]]);
  await dispatch({operation:'close'});
  assert.deepEqual(calls.at(-1),['close']);
  console.log('PASS: background uses headless, fresh inspection, same date/data, no conflict writes, no retries, closes on failure and invalidates foreground proof; foreground remains available');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
