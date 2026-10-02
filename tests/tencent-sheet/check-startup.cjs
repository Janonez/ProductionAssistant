'use strict';
// Full cold-start path against a local page with the same nested tab structure as the recorded binding.
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const core=require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const sheet='下料、装焊（26年9月）';
async function main(){
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><meta charset="utf-8"><div id="root"><input class="bar-label" value="A1"><div class="formula-input" contenteditable="true"></div></div><script>(()=>{
  const cells={};window.events=[];window.inputs=0;
  setTimeout(()=>Object.assign(cells,{R2:'2026/9/13',C9:'测试字段',R9:''}),2300);
  const name=document.querySelector('.bar-label'),editor=document.querySelector('.formula-input');
  editor.oninput=()=>window.inputs++;
  name.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();editor.textContent=cells[name.value]??'';editor.blur();}};
  setTimeout(()=>{
   const parent=document.createElement('div');parent.className='docs-tab-bar-scrollable-scroller drag-and-drop-scroller';document.body.append(parent);
   parent.innerHTML='<div class="tab-bar-item-container"><div>下料、装焊（26年8月）</div></div>';
   setTimeout(()=>{parent.insertAdjacentHTML('beforeend','<div class="tab-bar-item-container"><div>${sheet}</div></div>');},250);
   parent.onclick=e=>{const target=e.target.closest('.tab-bar-item-container');if(!target)return;window.events.push(target.textContent);
    for(const tab of parent.children)tab.firstElementChild.className='';name.value='';editor.contentEditable='false';
    setTimeout(()=>{target.firstElementChild.className='tab-bar-item-selected';setTimeout(()=>{name.value='A1';editor.contentEditable='true';},250);},350);
   };
  },350);
 })();</script>`);});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const profile=await fs.mkdtemp(path.resolve(__dirname,'../../artifacts/tencent-startup-'));
 const browser=new TencentDocsBrowser(profile,{args:['--no-proxy-server']});let client;
 try{
  const rule=core.inferRule([{date:'2026-09-01',address:'F9'},{date:'2026-09-02',address:'G9'}]);
  const config=core.validate({documentUrl:`http://127.0.0.1:${server.address().port}/`,timeout:5,sheetReferenceName:sheet,fields:[{id:'quantity',name:'测试字段'}],rules:{quantity:core.normalizeRule({...rule,confirmation:core.prediction(rule),dateAnchor:{address:'F2',format:'{yyyy}/{M}/{d}'},labelAnchor:{address:'C9',expected:'测试字段'}})},webControls:{
   cellAddressBox:{frame:[],strategies:[{type:'css',value:'input.bar-label'}]},cellEditor:{frame:[],strategies:[{type:'css',value:'div.formula-input'}]},
   sheetTab:{frame:[],strategies:[{type:'collection',parentSelector:'div.docs-tab-bar-scrollable-scroller.drag-and-drop-scroller',itemSelector:':scope > div.tab-bar-item-container',selectedSelector:':has(div.tab-bar-item-selected)'}]}
  }});
  await browser.open(config,true);client=new TencentSheetClient(browser);
  const inspection=await client.inspect(config,core.plan(config,'2026-09-13',{quantity:22}));
  assert.equal(inspection.prewriteVerified,true);assert.equal(inspection.rows[0].address,'R9');assert.equal(inspection.rows[0].current,'');
  assert.deepEqual(await browser.page.evaluate(()=>window.events),[sheet],'one click after the target appears, none while waiting');
  assert.equal(await browser.page.evaluate(()=>window.inputs),0);
  console.log('PASS: cold open -> delayed tabs/selection/controls -> separately delayed cell data -> real anchor and empty-cell inspection, no business input');
  for(const [markup,reason] of [
   ['<div></div>',/标签容器尚未出现/],
   ['<div class="docs-tab-bar-scrollable-scroller drag-and-drop-scroller" style="height:30px"></div>',/尚无可见标签/],
   ['<div class="docs-tab-bar-scrollable-scroller drag-and-drop-scroller"><div class="tab-bar-item-container"><div>其他月份</div></div></div>',/目标工作表尚未出现/]
  ]){
   await browser.page.setContent(markup);
   await assert.rejects(site.waitForControl(browser.page,config.webControls.sheetTab,'sheetTab',300,{collectionOnly:true,text:sheet}),e=>e.code==='ControlUnavailable'&&reason.test(e.message));
  }
  await browser.page.setContent('<div class="docs-tab-bar-scrollable-scroller drag-and-drop-scroller"><div class="tab-bar-item-container"><div>'+sheet+'</div></div></div>');
  await assert.rejects(site.waitForControl(browser.page,config.webControls.sheetTab,'sheetTab',300,{active:true,text:sheet}),e=>/选中状态尚未匹配/.test(e.message));
  console.log('PASS: distinct timeout reasons for missing container, empty collection, absent target and missing selected marker');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
