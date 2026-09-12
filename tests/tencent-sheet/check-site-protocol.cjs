'use strict';
const assert=require('node:assert/strict');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
const profile={name:'测试适配',siteType:'TencentDocs',controls:{
  sheetTab:{frame:[],sampleText:'测试工作表',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > div',selectedSelector:'[aria-selected="true"]'}]},
  cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#address'}]}
}};
const config={documentUrl:'https://docs.qq.com/sheet/test'};
TencentDocsBrowser.prototype.requirePage=()=>{};
site.assertNoLogin=async()=>{};
site.resolveControl=async()=>({});
site.testProfile=async()=>[{label:'fixture'}];
async function main(){
  await assert.rejects(dispatch({operation:'siteSave',config,profile,token:'invented'}),/测试已失效/);
  let tested=await dispatch({operation:'siteTest',config,profile});
  await assert.rejects(dispatch({operation:'siteSave',config,profile:{...profile,name:'changed'},token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,profile});
  await assert.rejects(dispatch({operation:'siteSave',config,profile:{...profile,id:'another-profile',revision:1},token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,profile});
  await assert.rejects(dispatch({operation:'siteSave',config:{documentUrl:'https://docs.qq.com/sheet/other'},profile,token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,profile});
  const saved=await dispatch({operation:'siteSave',config,profile,token:tested.token});
  assert.deepEqual(saved.profile,site.normalizeProfile(profile));
  await assert.rejects(dispatch({operation:'siteSave',config,profile,token:tested.token}),/测试已失效/);
  tested=await dispatch({operation:'siteTest',config,profile});
  site.testProfile=async()=>{throw Error('Sheet 标签定位失败');};
  await assert.rejects(dispatch({operation:'siteTest',config,profile}),/定位失败/);
  await assert.rejects(dispatch({operation:'siteSave',config,profile,token:tested.token}),/测试已失效/);
  console.log('PASS: save requires successful test; profile/url changes, failed retest and token reuse block save');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
