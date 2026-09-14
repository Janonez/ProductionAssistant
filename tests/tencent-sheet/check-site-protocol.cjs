'use strict';
const assert=require('node:assert/strict');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
const controls={
  sheetTab:{frame:[],sampleText:'测试工作表',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > div',selectedSelector:'[aria-selected="true"]'}]},
  cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#address'}]}
};
const config={documentUrl:'https://docs.qq.com/sheet/test'};
TencentDocsBrowser.prototype.requirePage=()=>{};
site.assertNoLogin=async()=>{};
site.waitForControl=async()=>({});
site.testControls=async()=>[{label:'fixture'}];
async function main(){
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:'invented'}),/测试已失效/);
  let tested=await dispatch({operation:'siteTest',config,controls});
  await assert.rejects(dispatch({operation:'siteSave',config,controls:{...controls,cellAddressBox:{...controls.cellAddressBox,sampleText:'changed'}},token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,controls});
  await assert.rejects(dispatch({operation:'siteSave',config,controls,configSignature:'changed',token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,controls});
  await assert.rejects(dispatch({operation:'siteSave',config,controls,jobId:'another-task',token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,controls});
  await assert.rejects(dispatch({operation:'siteSave',config:{documentUrl:'https://docs.qq.com/sheet/other'},controls,token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,controls});
  const saved=await dispatch({operation:'siteSave',config,controls,token:tested.token});
  assert.deepEqual(saved.controls,site.normalizeControls(controls));
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,controls});
  site.testControls=async()=>{throw Error('Sheet 标签定位失败');};
  await assert.rejects(dispatch({operation:'siteTest',config,controls}),/定位失败/);
  await assert.rejects(dispatch({operation:'siteSave',config,controls,token:tested.token}),/测试已失效/);
  console.log('PASS: save requires successful test; profile/url changes, failed retest and token reuse block save');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
