'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
async function main(){
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();page.setDefaultTimeout(3000);
  const client=new TencentSheetClient({page,requirePage:()=>{}});
  const config={timeout:3,webControls:{cellAddressBox:{frame:[],strategies:[{type:'css',value:'input.bar-label'}]},cellEditor:{frame:[],strategies:[{type:'css',value:'#editor'}]}}};
  const html=(address='<input class="bar-label" value="A1">',editor='')=>'<div id="root">'+address+'</div><input id="editor" value="untouched" '+editor+'>';
  for(const mode of ['late-render','empty-address','readonly-editor']){
   await page.setContent(html(mode==='late-render'?'':'<input class="bar-label" value="'+(mode==='empty-address'?'':'A1')+'">',mode==='readonly-editor'?'readonly':''));
   await page.evaluate(mode=>{
    window.businessInputs=0;document.querySelector('#editor').oninput=()=>window.businessInputs++;
    setTimeout(()=>{if(mode==='late-render')document.querySelector('#root').innerHTML='<input class="bar-label" value="A1">';else if(mode==='empty-address')document.querySelector('input.bar-label').value='A1';else document.querySelector('#editor').readOnly=false;},650);
   },mode);
   await client.ready(config);
   assert.equal(await page.locator('input.bar-label').inputValue(),'A1');
   assert.equal(await page.locator('#editor').inputValue(),'untouched');
   assert.equal(await page.evaluate(()=>window.businessInputs),0);
  }
  for(const [address,editor,reason] of [
   ['', '', /尚未出现可见控件/],
   ['<input class="bar-label" value="A1"><input class="bar-label" value="B2">','',/多个可见控件/],
   ['<input class="bar-label" value="">','',/有效单元格地址/],
   ['<input class="bar-label" value="A1">','readonly',/不可编辑/]
  ]){
   await page.setContent(html(address,editor));
   await assert.rejects(client.ready({...config,timeout:0.3}),error=>error.code==='ControlUnavailable'&&/就绪超时/.test(error.message)&&reason.test(error.message));
   assert.equal(await page.locator('#editor').inputValue(),'untouched');
  }
  await page.setContent(html()+'<dialog open>请先登录</dialog>');
  await assert.rejects(client.ready(config),error=>error.code==='LoginRequired');
  await page.close();
  await assert.rejects(site.waitForControl(page,config.webControls.cellAddressBox,'cellAddressBox',3000),/浏览器已关闭/);
  console.log('PASS: delayed DOM, empty A1 and temporarily readonly editor recover with unchanged bindings and zero business input');
  console.log('PASS: missing, ambiguous, invalid A1 and readonly controls remain blocked with distinct timeout reasons; login/close stop immediately');
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
