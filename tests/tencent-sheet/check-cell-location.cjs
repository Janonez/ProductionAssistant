'use strict';
// Disposable DOM only; never opens the user's document or browser profile.
const assert=require('node:assert/strict');
const {chromium}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/node_modules/playwright');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
async function main(){
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage();page.setDefaultTimeout(3000);
  const client=new TencentSheetClient({page,requirePage:()=>{}});
  const config={timeout:3,webControls:{cellAddressBox:{frame:[],strategies:[{type:'css',value:'#name'}]},cellEditor:{frame:[],strategies:[{type:'css',value:'#editor'}]}}};
  for(const mode of ['delayed','retry','rebound','stuck','login']) {
   await page.setContent('<input id="name" value="AF9"><input id="editor" value="old">');
   await page.evaluate(mode=>{
    window.attempts=0;window.inputs=0;
    const name=document.querySelector('#name'),editor=document.querySelector('#editor');
    editor.oninput=()=>window.inputs++;
    let selected='AF9';name.onblur=()=>{name.value=selected;};
    const select=address=>{selected=address;name.value=address;editor.value=address==='AG2'?'2026/9/28':'old';};
    name.onkeydown=e=>{
     if(e.key!=='Enter')return;e.preventDefault();window.attempts++;
     const address=name.value;select('AF9');
     if(mode==='delayed')setTimeout(()=>select(address),650);
     if(mode==='retry'&&window.attempts===2)select(address);
     if(mode==='rebound') {select(address);setTimeout(()=>select('AF9'),150);setTimeout(()=>select(address),650);}
     if(mode==='login')document.body.insertAdjacentHTML('beforeend','<dialog open>请先登录</dialog>');
    };
   },mode);
   const started=Date.now();
   if(mode==='stuck') {
    await assert.rejects(client.read(config,'AG2'),error=>/期望 AG2，实际 AF9/.test(error.message)&&/第1次定位前 AF9/.test(error.message)&&/第2次/.test(error.message)&&/总耗时/.test(error.message));
    assert.equal(await page.evaluate(()=>window.attempts),2);
    assert.ok(Date.now()-started<10000,'bounded navigation failure');
   } else if(mode==='login') {
    await assert.rejects(client.read(config,'AG2'),error=>error.code==='LoginRequired');
    assert.equal(await page.evaluate(()=>window.attempts),1);
   } else {
    assert.equal(await client.read(config,'AG2'),'2026/9/28');
    assert.equal(await page.evaluate(()=>window.attempts),mode==='retry'?2:1);
    assert.ok(Date.now()-started>=650,'must wait for committed, stable selection');
   }
   assert.equal(await page.evaluate(()=>window.inputs),0,'navigation never enters business values');
  }
  console.log('PASS: delayed selection, one relocation, transient rebound, bounded mismatch diagnostics and immediate login stop; zero business input');
  const anchorConfig={...config,timeout:1.5,rules:{cutting:{samples:[{date:'2026-10-01',address:'F9'}],rowStep:0,columnStep:1,dateAnchor:{address:'F2',format:'{yyyy}/{M}/{d}'},labelAnchor:{address:'C9',expected:'滨海公司'}}}};
  const plan={date:'2026-10-01',rows:[{key:'cutting',label:'下料'}]};
  for(const mode of ['late-content','empty','wrong-date','moved']) {
   await page.setContent('<input id="name" value="F9"><input id="editor" value="">');
   await page.evaluate(mode=>{
    const name=document.querySelector('#name'),editor=document.querySelector('#editor');
    window.inputs=0;editor.oninput=()=>window.inputs++;
    let selected='F9',loaded=false;
    const render=()=>{name.value=selected;editor.value=selected==='C9'?'滨海公司':loaded?'2026/10/1':mode==='wrong-date'?'2026/9/1':'';};
    name.onblur=render;
    name.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();selected=mode==='moved'?'F9':name.value;render();}};
    if(mode==='late-content')setTimeout(()=>{loaded=true;render();},800);
   },mode);
   const started=Date.now();
   if(mode==='late-content') {
    const checks=await client.anchors(anchorConfig,plan);
    assert.equal(checks[0].actual,'2026/10/1');
    assert.ok(Date.now()-started>=800);
   } else {
    await assert.rejects(client.anchors(anchorConfig,plan),mode==='moved'?/选中地址不一致/:/下料日期校验失败/);
    if(mode==='empty')assert.ok(Date.now()-started>=1500,'empty anchors wait for the configured deadline');
    if(mode==='wrong-date')assert.ok(Date.now()-started<1500,'nonempty mismatch stops immediately');
   }
   assert.ok(Date.now()-started<6000,'anchor failure is bounded');
   assert.equal(await page.evaluate(()=>window.inputs),0,'anchor checks never enter business values');
  }
  console.log('PASS: cold-sheet empty date waits for content; permanent empty, wrong date and moved selection fail without business input');
 } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
