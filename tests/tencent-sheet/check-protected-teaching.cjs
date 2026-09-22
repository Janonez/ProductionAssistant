'use strict';
// Exercise the real teaching dispatcher/client against a disposable protected-sheet DOM.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const core=require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const {dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
async function main() {
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const page=await browser.newPage();page.setDefaultTimeout(2000);
    // Only replace browser ownership. Keep the actual capture/validation and editing guards.
    Object.defineProperty(TencentSheetClient.prototype,'page',{get:()=>page});
    TencentDocsBrowser.prototype.requirePage=()=>{};
    const client=new TencentSheetClient(new TencentDocsBrowser());
    for(const rich of [false,true]) {
      await page.setContent(`<div id="tabs"><button aria-selected="${rich}">生产（26年8月）</button><button aria-selected="${!rich}">生产（26年9月）</button></div>
        <input id="name" value="C4">
        ${rich?'<div id="editor" contenteditable="false" style="height:30px"></div>':'<input id="editor" readonly>'}
        <script>(()=>{
          window.cells={C4:'18.25',C5:'20',C6:'30',A4:'2026/9/1',A5:'2026/9/2',A6:'2026/9/3',C2:'下料'};
          window.editorInputs=0;window.editorFocus=0;
          const nameBox=document.querySelector('#name'),editor=document.querySelector('#editor');
          window.choose=address=>{nameBox.value=address;if(editor.tagName==='INPUT')editor.value=window.cells[address]??'';else editor.textContent=window.cells[address]??'';};
          nameBox.onkeydown=e=>{if(e.key==='Enter')window.choose(nameBox.value);};
          editor.oninput=()=>window.editorInputs++;editor.onfocus=()=>window.editorFocus++;
          document.querySelector('#tabs').onclick=e=>{for(const tab of e.currentTarget.children)tab.setAttribute('aria-selected',String(tab===e.target));};
          window.choose('C4');
        })();</script>`);
      const config={documentUrl:'https://docs.qq.com/sheet/fixture',timeout:5,fields:[{id:'cutting',name:'下料'}],rules:{},
        ...(rich?{sheetReferenceName:'生产（26年9月）'}:{}),
        webControls:{sheetTab:{frame:[],sampleText:'生产（26年9月）',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > button',selectedSelector:'[aria-selected="true"]'}]},
          cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#name'}]},cellEditor:{frame:[],sampleText:'',strategies:[{type:'css',value:'#editor'}]}}};
      const request={operation:'teach',jobId:'protected',config,metric:'cutting',firstDate:'2026-09-01',secondDate:'2026-09-02'};
      const start=await dispatch({...request,stage:'start'});
      const next={...request,sessionToken:start.sessionToken};
      for(const [slot,address] of [['firstTarget','C4'],['secondTarget','C5'],['dateHeader','A4'],['label','C2']]) {
        await page.evaluate(address=>{window.choose(address);document.querySelector('#name').readOnly=true;},address);
        const captured=await dispatch({...next,stage:'capture',slot});
        assert.equal(captured.capture.address,address,'capture only reads the user selection');
        await page.locator('#name').evaluate(el=>el.readOnly=false);
      }
      await page.evaluate(()=>window.cells.A5='错误日期');
      await assert.rejects(dispatch({...next,stage:'preview'}),/日期校验未通过/);
      await page.evaluate(()=>window.cells.A5='2026/9/2');
      const preview=await dispatch({...next,stage:'preview'});
      assert.equal(preview.prediction.address,'C6');
      assert.equal(await page.locator('#name').inputValue(),'C6');
      await page.evaluate(()=>window.choose('C5'));
      await assert.rejects(dispatch({...next,stage:'confirm',previewToken:preview.previewToken}),/当前选区与预测位置不一致/);
      await page.evaluate(()=>window.choose('C6'));
      const saved=await dispatch({...next,stage:'confirm',previewToken:preview.previewToken});
      assert.equal(core.plan(saved.config,'2026-09-09',{cutting:7}).rows[0].address,'C12');
      assert.equal(saved.config.rules.cutting.rowStep,1);
      assert.equal(await page.evaluate(()=>window.editorInputs),0);
      assert.equal(await page.evaluate(()=>window.editorFocus),0,'teaching never activates the cell editor');
      assert.deepEqual(await page.evaluate(()=>window.cells),{C4:'18.25',C5:'20',C6:'30',A4:'2026/9/1',A5:'2026/9/2',A6:'2026/9/3',C2:'下料'});
      // The same protected control must still be rejected by the ordinary write path.
      await assert.rejects(client.ready({...saved.config,timeout:0.2}),/不可编辑/);
      await assert.rejects(client.prepareEdit({...saved.config,timeout:0.2},'C12',''),/不可编辑/);
      assert.equal(await page.evaluate(()=>window.editorInputs),0);
      console.log('PASS: protected '+(rich?'contenteditable':'input')+' teaches through capture, prediction and save; anchors/selection remain checked; ordinary editing stays blocked');
    }
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
