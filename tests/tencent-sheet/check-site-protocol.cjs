'use strict';
const assert=require('node:assert/strict');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
const controls={
  sheetTab:{frame:[],sampleText:'测试工作表',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > div',selectedSelector:'[aria-selected="true"]'}]},
  cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#address'}]},
  saveStatus:{frame:[],sampleText:'',strategies:[{type:'css',value:'#status'}]}
};
const config={documentUrl:'https://docs.qq.com/sheet/test'};
TencentDocsBrowser.prototype.requirePage=()=>{};
site.assertNoLogin=async()=>{};
site.waitForControl=async()=>({});
site.testSheet=async()=>[{label:'Sheet fixture'}];
site.testCellControls=async()=>[{label:'Cell fixture'}];
let selectedAddress='Z9';
site.captureTestCell=async(_page,_controls,_timeout,sheet)=>({sheet,address:selectedAddress});
site.recordControl=async(_page,key)=>({...controls[key],count:1});
async function test(request={}) {
  const sheet=await dispatch({operation:'siteTestSheet',config,controls,...request});
  assert.equal(sheet.passed,true);
  await dispatch({operation:'siteCaptureCell',config,controls,...request});
  return dispatch({operation:'siteTest',config,controls,...request});
}
async function main(){
  assert.equal((await dispatch({operation:'siteTest',config,controls})).sheetRequired,true);
  await dispatch({operation:'siteTestSheet',config,controls});
  assert.equal((await dispatch({operation:'siteTest',config,controls})).testCell,null,'Sheet pass alone cannot test cells');
  const picked=await dispatch({operation:'sitePick',config,controls,key:'cellAddressBox'});
  assert.equal(picked.testCell.address,'Z9','recording address box immediately captures the selection');
  assert.ok((await dispatch({operation:'siteTest',config,controls:picked.controls})).token,'normalized returned controls retain the captured cell proof');
  assert.equal((await dispatch({operation:'siteTest',config,controls:{...controls,cellAddressBox:{...controls.cellAddressBox,strategies:[{type:'css',value:'#different-address'}]}}})).testCell,null,'changed name box cannot reuse the test cell');
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:'invented'}),/测试已失效/);
  let tested=await test();
  await assert.rejects(dispatch({operation:'siteSave',config,controls:{...controls,cellAddressBox:{...controls.cellAddressBox,sampleText:'changed'}},token:tested.token}),/测试已失效/);
  tested=await test();
  await assert.rejects(dispatch({operation:'siteSave',config,controls,configSignature:'changed',token:tested.token}),/测试已失效/);
  tested=await test();
  await assert.rejects(dispatch({operation:'siteSave',config,controls,jobId:'another-task',token:tested.token}),/测试已失效/);
  tested=await test();
  await assert.rejects(dispatch({operation:'siteSave',config:{documentUrl:'https://docs.qq.com/sheet/other'},controls,token:tested.token}),/测试已失效/);
  tested=await test();
  const saved=await dispatch({operation:'siteSave',config,controls,token:tested.token});
  assert.deepEqual(saved.controls,site.normalizeControls(controls));
  assert.equal('testCell' in saved.controls,false,'temporary test address must not be persisted');
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:tested.token}),/测试已失效/);
  tested=await test();
  site.testCellControls=async()=>{throw Error('编辑区定位失败');};
  await assert.rejects(dispatch({operation:'siteTest',config,controls}),/编辑区定位失败/);
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:tested.token}),/测试已失效/);
  site.testCellControls=async()=>[{label:'Cell retry'}];
  assert.ok((await dispatch({operation:'siteTest',config,controls})).token,'cell failure retains Sheet proof');
  const oldTest=await test();selectedAddress='AA20';
  const captured=await dispatch({operation:'siteCaptureCell',config,controls});
  assert.equal(captured.testCell.address,'AA20');
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:oldTest.token}),/测试已失效/);
  site.testCellControls=async(_page,_controls,_timeout,target)=>{assert.equal(target.address,'AA20');return [{label:'new test cell'}];};
  assert.ok((await dispatch({operation:'siteTest',config,controls,testCell:{address:'INJECTED'}})).token,'uses captured address, never request supplied address');
  assert.equal((await dispatch({operation:'siteTest',config,controls,jobId:'another'})).sheetRequired,true);
  assert.equal((await dispatch({operation:'siteTest',config,controls,configSignature:'changed'})).sheetRequired,true);
  assert.equal((await dispatch({operation:'siteTest',config:{documentUrl:'https://docs.qq.com/sheet/other'},controls})).sheetRequired,true);
  assert.equal((await dispatch({operation:'siteTest',config,controls:{...controls,sheetTab:{...controls.sheetTab,sampleText:'changed'}}})).sheetRequired,true);
  site.testSheet=async()=>{throw Object.assign(Error('选中状态未确认'),{steps:[{label:'集合已找到'}]});};
  const failed=await dispatch({operation:'siteTestSheet',config,controls});
  assert.equal(failed.passed,false);assert.equal(failed.steps[0].label,'集合已找到');
  assert.deepEqual(failed.controls,site.normalizeControls(controls));
  assert.equal((await dispatch({operation:'siteTest',config,controls})).sheetRequired,true);
  site.testSheet=async()=>[{label:'Sheet fixture'}];
  const businessConfig=require('./fixture-config.cjs')();
  const businessControls={...controls,sheetTab:{...controls.sheetTab,sampleText:businessConfig.sheetReferenceName}};
  assert.ok((await test({config:businessConfig,controls:businessControls})).token,'existing business rules do not choose the test cell');
  const realNow=Date.now;
  try {
    let now=Date.parse('2026-09-21T15:59:59Z');Date.now=()=>now;
    await test();
    now+=2000;
    assert.equal((await dispatch({operation:'siteTest',config,controls})).sheetRequired,true,'Beijing date rollover invalidates Sheet proof');
    await test();now+=600001;
    assert.equal((await dispatch({operation:'siteTest',config,controls})).sheetRequired,true,'expired Sheet proof cannot test cells');
  } finally {Date.now=realNow;}
  console.log('PASS: independent Sheet proof; cell failure preserves it; changed scope and failed Sheet retest block cell testing');
  console.log('PASS: save requires successful test; profile/url changes, failed retest and token reuse block save');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
