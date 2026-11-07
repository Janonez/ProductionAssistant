'use strict';
const assert=require('node:assert/strict');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');

async function confirmationChecks() {
  const realNow=Date.now;
  try {
    for(const state of ['idle','unknown','saving']) {
      let now=0,reloads=0,timeout;
      Date.now=()=>now;
      const page={isClosed:()=>false,setDefaultTimeout:value=>{timeout=value;},waitForTimeout:async ms=>{now+=ms;},reload:async()=>{reloads++;}};
      const client=new TencentSheetClient({page});
      client.saveState=async()=>state;
      await assert.rejects(client.confirmSaved({timeout:10,webControls:{saveStatus:{}}},{sheet:'fixture'},[]),state==='idle'?/上次修改时间/:/未确认已保存/);
      assert.equal(reloads,0,'unconfirmed saves must not be interrupted by reload');
      assert.equal(now,30000);
      assert.equal(timeout,10000,'restore the normal timeout after failure');
    }
    for(const persisted of [true,false]) {
      let now=0,reloads=0,timeout;
      Date.now=()=>now;
      const page={isClosed:()=>false,setDefaultTimeout:value=>{timeout=value;},waitForTimeout:async ms=>{now+=ms;},reload:async()=>{assert.ok(now>=5000);reloads++;}};
      const client=new TencentSheetClient({page});
      client.saveState=async()=>now<5000?'saving':'saved';
      client.waitForReloadControls=async()=>{};
      client.selectSheet=async()=>{};
      client.read=async config=>{assert.ok(config.timeout<=30-now/1000);return persisted?'0':'';};
      const result=client.confirmSaved({timeout:10},{sheet:'fixture'},[{address:'D4',value:0}]);
      if(persisted) {assert.equal((await result).transitionObserved,true);assert.equal(reloads,1);}
      else {await assert.rejects(result,/刷新后回读不一致/);assert.equal(reloads,3,'only readback reloads may repeat');}
      assert.equal(timeout,10000);
    }
  } finally {Date.now=realNow;}
  console.log('PASS: modification history/unknown/saving never triggers reload; delayed save waits, persisted zero succeeds, blank zero fails without input replay');
}

async function browserChecks() {
  const {chromium}=require('playwright');
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const page=await browser.newPage();page.setDefaultTimeout(1000);
    const client=new TencentSheetClient({page,requirePage:()=>{}});
    const config={timeout:1,webControls:{cellAddressBox:{frame:[],strategies:[{type:'css',value:'#name'}]},cellEditor:{frame:[],strategies:[{type:'css',value:'#editor'}]},sheetTab:{frame:[],strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > button',selectedSelector:'[aria-selected="true"]'}]}}};
    const html='<div id="tabs"><button aria-selected="true">fixture</button></div><input id="name" value="A1"><input id="editor" value=""><div id="cover" style="position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.01)"></div><script>window.inputs=0;window.clicks=0;document.querySelector("#editor").oninput=()=>window.inputs++;document.querySelector("#name").onclick=()=>window.clicks++;</script>';
    await page.setContent(html);
    await page.evaluate(()=>setTimeout(()=>document.querySelector('#cover').remove(),250));
    const started=Date.now();
    await client.waitForReloadControls(config,Date.now()+2000);
    assert.ok(Date.now()-started>=200,'wait for the overlay to disappear');
    assert.equal(await page.evaluate(()=>window.clicks),0,'trial probes never click');
    assert.equal(await page.evaluate(()=>window.inputs),0);

    await page.setContent(html);
    await assert.rejects(client.waitForReloadControls(config,Date.now()+700),error=>/恢复超时/.test(error.message)&&/不可点击/.test(error.details));
    assert.equal(await page.evaluate(()=>window.clicks),0);
    assert.equal(await page.evaluate(()=>window.inputs),0);

    await page.setContent(html+'<dialog open>请先登录</dialog>');
    await assert.rejects(client.waitForReloadControls(config,Date.now()+2000),error=>error.code==='LoginRequired');
    console.log('PASS browser: overlay recovery waits for trial actionability, permanent overlay times out, login blocks; no clicks or business input');
  } finally {await browser.close();}
}

async function main() {
  await confirmationChecks();
  if(process.argv.includes('--browser'))await browserChecks();
}
main().catch(error=>{console.error(error);process.exitCode=1;});
