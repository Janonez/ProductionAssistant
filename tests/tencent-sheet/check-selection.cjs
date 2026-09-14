'use strict';
// Fresh local DOM on every case; no real document, login profile or business writes.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
async function fixture(page,styleOnly=false,stuck=false) {
 await page.setContent(`<style>#sheets button{padding:16px}</style><div id="sheets"><button role="tab"><span>9月</span></button><button role="tab"><span>8月</span></button></div><input id="address" value="A1"><input id="editor" value="原内容"><script>(()=>{
 const loaded=new Set(['9月']);let busy=false;window.events=[];
 function select(target){for(const tab of document.querySelector('#sheets').children){if(${styleOnly})tab.querySelector('span').style.color=tab===target?'rgb(1, 90, 200)':'rgb(30, 30, 30)';else tab.setAttribute('aria-selected',String(tab===target));}}
 select(document.querySelector('#sheets button'));
 document.querySelector('#sheets').onclick=e=>{const target=e.target.closest('button');if(!target)return;const name=target.textContent;
  window.events.push({event:'click',name,busy});if(busy)return;
  if(${stuck})return;
  busy=true;select(null);setTimeout(()=>{select(target);loaded.add(name);busy=false;window.events.push({event:'selected',name});},loaded.has(name)?40:650);
 };
 })();</script>`);
}
async function controls(page,label){
 const pending=site.recordControl(page,'sheetTab');await page.locator('[data-pa-site-picker]').waitFor();await page.getByRole('tab',{name:label,exact:true}).click();
 return site.normalizeControls({sheetTab:await pending,cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#address'}]},cellEditor:{frame:[],sampleText:'',strategies:[{type:'css',value:'#editor'}]}});
}
async function main(){
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage();page.setDefaultTimeout(5000);
  for(const styleOnly of [false,true]) {
   await fixture(page,styleOnly);
   const recorded=await controls(page,'8月');
   assert.equal((await site.testControls(page,recorded,2000)).length,6,'cold first switch must pass without rerecording');
   assert.equal((await (await site.resolveControl(page,recorded.sheetTab,'sheetTab',true)).innerText()).trim(),'8月');
   assert.equal((await page.evaluate(()=>window.events)).filter(event=>event.busy).length,0,'no click while the previous switch is pending');
   assert.equal(await page.locator('#editor').inputValue(),'原内容');
   // New recording while both sheets are warm must still work in both directions.
   assert.equal((await site.testControls(page,await controls(page,'9月'),2000)).length,6);
   // The persisted style binding must also wait/reacquire during actual sheet selection.
   await fixture(page,styleOnly);
   const client=new TencentSheetClient({page,requirePage:()=>{}});client.ready=async()=>{};
   await client.selectSheet({webControls:recorded,timeout:3},'8月');
   assert.equal((await (await site.resolveControl(page,recorded.sheetTab,'sheetTab',true)).innerText()).trim(),'8月');
   console.log('PASS: cold 9月 -> recorded 8月, warm rerecording and runtime delayed switch ('+(styleOnly?'style':'ARIA')+')');
  }
  await fixture(page,false,true);
  const stuck=await controls(page,'8月'),before=JSON.stringify(stuck);
  await assert.rejects(site.testControls(page,stuck,400),/未能确认切换到「8月」.*未确认切回/);
  assert.equal(JSON.stringify(stuck),before,'failed learning must not change the binding');
  assert.deepEqual((await page.evaluate(()=>window.events)).map(event=>event.name),['8月'],'timeout must not start later clicks');
  assert.equal(await page.locator('[aria-selected=true]').innerText(),'9月');
  assert.equal(await page.locator('#address').inputValue(),'A1','no address operation after failed switching');
  console.log('PASS: unresponsive selection stops after one click without claiming restoration or saving a rule');
 } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
