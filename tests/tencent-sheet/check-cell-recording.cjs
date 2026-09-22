'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');

async function pick(page,key,selector) {
  const pending=site.recordControl(page,key);pending.catch(()=>{});
  await page.locator('[data-pa-site-picker]').waitFor({state:'attached'});
  await page.locator(selector).click();
  return pending;
}
async function main() {
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const page=await browser.newPage();page.setDefaultTimeout(3000);
    await page.setContent(`<style>.control{padding:20px;margin:12px;border:1px solid gray}input{padding:8px}</style>
      <div id="tabs"><button role="tab" aria-selected="true">生产（26年9月）</button></div>
      <div class="control" id="address-wrapper"><span id="address-icon">地址</span><input id="address" value="Z9"></div>
      <div class="control" id="editor-wrapper"><span id="editor-icon">内容</span><input id="editor"></div>
      <script>
        window.businessInputs=0;window.values={Z9:'',AA20:'',F9:'',B2:'不能覆盖'};
        window.current='Z9';const address=document.querySelector('#address'),editor=document.querySelector('#editor');
        address.onkeydown=e=>{if(e.key==='Enter'){window.current=address.value;editor.value=window.values[window.current]??'';editor.readOnly=window.current==='F9';}};
        editor.oninput=()=>{window.businessInputs++;window.values[window.current]=editor.value;};
      </script>`);
    const sheetTab={frame:[],sampleText:'生产（26年9月）',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > button',selectedSelector:'[aria-selected="true"]'}]};
    // Clicking the wrapper label resolves its nearby unique input, not the label itself.
    const cellAddressBox=await pick(page,'cellAddressBox','#address-icon');
    assert.equal(cellAddressBox.strategies[0].value,'#address');
    let controls=site.normalizeControls({sheetTab,cellAddressBox});
    const temporary=await site.captureTestCell(page,controls,500,sheetTab.sampleText);
    assert.equal(temporary.address,'Z9');
    assert.equal(await page.evaluate(()=>window.businessInputs),0);
    const cellEditor=await pick(page,'cellEditor','#editor-icon');
    assert.equal(cellEditor.strategies[0].value,'#editor');
    controls=site.normalizeControls({...controls,cellEditor});
    const navigate=async address=>{await page.locator('#address').fill(address);await page.locator('#address').press('Enter');};
    await navigate('AA20');
    const steps=await site.testCellControls(page,controls,500,temporary);
    assert.ok(steps.some(step=>step.label==='名称框定位 Z9'));
    assert.equal(await page.locator('#address').inputValue(),'Z9','uses remembered temporary cell, not current selection or business date');
    await navigate('AA20');
    const replacement=await site.captureTestCell(page,controls,500,sheetTab.sampleText);
    await site.testCellControls(page,controls,500,replacement);
    assert.equal(await page.locator('#address').inputValue(),'AA20','replacement requires no rerecording');
    await assert.rejects(site.testCellControls(page,controls,200,{sheet:temporary.sheet,address:'F9'}),/当前测试单元格不可编辑.*重新选择/);
    await assert.rejects(site.testCellControls(page,controls,500,{sheet:temporary.sheet,address:'B2'}),/已有内容.*未清空或填写/);
    assert.equal(await page.locator('#editor').inputValue(),'不能覆盖');
    assert.equal(await page.evaluate(()=>window.businessInputs),0,'tests must never write business input');
    assert.deepEqual(await page.evaluate(()=>window.values),{Z9:'',AA20:'',F9:'',B2:'不能覆盖'});
    await page.locator('#address').fill('A1:B2');
    await assert.rejects(site.captureTestCell(page,controls,500,temporary.sheet),/不要框选多个单元格/);
    await page.locator('#address').fill('$aa$20');
    assert.equal((await site.captureTestCell(page,controls,500,temporary.sheet)).address,'AA20');
    console.log('PASS: wrapper/sibling input recording, temporary cell capture and replacement, locked/nonblank rejection, no business writes');

    await page.setContent('<div id="wrap" style="padding:30px"><div id="editable" contenteditable="true" role="textbox" style="height:30px"><span id="inner">输入区域</span></div></div><div id="ambiguous" style="padding:30px"><span id="label">两个输入框</span><input id="one"><textarea id="two"></textarea></div>');
    const rich=await pick(page,'cellEditor','#inner');
    assert.equal(rich.strategies[0].value,'#editable');
    assert.equal(rich.evidence.isContentEditable,true);
    await assert.rejects(pick(page,'cellEditor','#label'),/多个输入控件/);
    console.log('PASS: contenteditable textbox child resolves to input; ambiguous nearby inputs require precise picking');
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
