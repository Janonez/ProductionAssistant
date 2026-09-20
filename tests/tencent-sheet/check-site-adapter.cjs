'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');

function fixture(custom=false) {
  return `<style>body{font-family:sans-serif}button,.leaf{display:inline-block;padding:15px}input{padding:10px}</style>
  <nav><button role="tab" aria-selected="true">与表格无关的标签</button></nav>
  <section id="workbook" class="workbook"><input id="address" class="address-control" aria-label="自定义地址" placeholder="请选择单元格" value="A1"><input id="business-data" value="业务内容未修改"></section>
  <div id="tabs" class="tabs-container">${['7','8','9'].map((month,i)=>custom?`<div class="leaf ${i===0?'is-active':''}"><span>项目月报 ${month}月</span></div>`:`<button class="sheet-item" role="tab" aria-selected="${i===0}"><span>项目月报 ${month}月</span></button>`).join('')}</div>
  <script>window.tabClicks=0;document.querySelector('#tabs').onclick=e=>{const el=e.target.closest('#tabs > *');if(!el)return;window.tabClicks++;for(const tab of el.parentElement.children){${custom?"tab.classList.toggle('is-active',tab===el)":"tab.setAttribute('aria-selected',String(tab===el))"}}};document.querySelector('#address').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();window.lastAddress=e.target.value;}};</script>`;
}

async function pick(page,key,target) {
  const promise=site.recordControl(page,key);
  promise.catch(()=>{});
  await page.locator('[data-pa-site-picker]').waitFor({state:'attached'});
  await target.hover();
  await target.click();
  return promise;
}

async function main() {
  const browser=await chromium.launch({channel:'msedge',headless:true});
  const page=await browser.newPage();page.setDefaultTimeout(5000);
  try {
    for(const custom of [false,true]) {
      await page.setContent(fixture(custom));
      const sheetTab=await pick(page,'sheetTab',page.getByText('项目月报 8月',{exact:true}));
      assert.equal(sheetTab.count,3);assert.equal(await page.evaluate(()=>window.tabClicks),0);
      assert.ok(!JSON.stringify(sheetTab.strategies).includes('nth-'));
      const cellAddressBox=await pick(page,'cellAddressBox',page.locator('#address'));
      assert.ok(cellAddressBox.strategies.length>=3);
      const profile=site.normalizeControls({sheetTab,cellAddressBox,cellEditor:{sampleText:'',frame:cellAddressBox.frame,strategies:[{type:'css',value:'#business-data'}]}});
      assert.equal((await site.testControls(page,profile)).length,6);
      assert.equal(await page.evaluate(()=>window.lastAddress),'A1');
      assert.equal(await page.locator('#business-data').inputValue(),'业务内容未修改');
      // Simulate another workbook, changed id, reordered tabs and a new month.
      await page.setContent(fixture(custom));
      await page.locator('#address').evaluate(el=>{el.removeAttribute('id');el.removeAttribute('aria-label');});
      await page.locator('#tabs').evaluate(parent=>{parent.prepend(parent.lastElementChild);const extra=parent.firstElementChild.cloneNode(true);extra.textContent='项目月报 10月';parent.append(extra);});
      const resolved=await site.resolveControl(page,profile.cellAddressBox,'cellAddressBox');
      assert.equal(await resolved.inputValue(),'A1');
      const tabs=await site.resolveControl(page,profile.sheetTab,'sheetTab');
      assert.equal(await tabs.count(),4);
      await tabs.filter({hasText:/^项目月报 10月$/}).click();
      assert.equal((await (await site.resolveControl(page,profile.sheetTab,'sheetTab',true)).innerText()).trim(),'项目月报 10月');
      const client=new TencentSheetClient({page,requirePage:()=>{}});
      // Filling consumes the recorded collection, never the unrelated role=tab outside its parent.
      client.ready=async()=>{};
      const config={webControls:profile,timeout:5};
      await client.selectSheet(config,'项目月报 9月');
      assert.equal((await (await client.one(config,'activeSheet')).innerText()).trim(),'项目月报 9月');
      assert.equal(await page.locator('nav button').getAttribute('aria-selected'),'true');
      await page.locator('#tabs').evaluate(parent=>parent.append(parent.firstElementChild.cloneNode(true)));
      await assert.rejects(client.selectSheet(config,'项目月报 10月'),/Sheet 标签定位失败|唯一/);
    }
    for(const styleOnly of [false,true]) {
      await page.setContent(`<div id="tabs"><div class="leaf extra"><span>甲表</span></div><div class="leaf"><span>乙表</span></div></div><input id="address" value="A1"><input id="business-data" value="内容"><style>.leaf{display:inline-block;padding:12px}</style>`);
      await page.locator('#tabs').evaluate((parent,styleOnly)=>{
        const select=chosen=>{for(const node of parent.children){const text=node.querySelector('span');if(styleOnly)text.style.color=node===chosen?'rgb(1, 90, 200)':'rgb(30, 30, 30)';else text.setAttribute('data-mode',node===chosen?'x1':'x0');}};
        select(parent.lastElementChild);parent.onclick=e=>select(e.target.closest('.leaf'));
      },styleOnly);
      const sheetTab=await pick(page,'sheetTab',page.getByText('甲表',{exact:true}));
      assert.equal(sheetTab.strategies[0].selectedSelector,'');
      const cellAddressBox=await pick(page,'cellAddressBox',page.locator('#address'));
      const profile=site.normalizeControls({sheetTab,cellAddressBox,cellEditor:{sampleText:'',frame:cellAddressBox.frame,strategies:[{type:'css',value:'#business-data'}]}});
      await site.testControls(page,profile);
      if(styleOnly)assert.ok(profile.sheetTab.strategies[0].selectedStyle);
      else assert.match(profile.sheetTab.strategies[0].selectedSelector,/:has/);
      const persisted=site.normalizeControls(JSON.parse(JSON.stringify(profile)));
      await page.getByText('乙表',{exact:true}).click();
      assert.equal(await (await site.resolveControl(page,persisted.sheetTab,'sheetTab',true)).innerText(),'乙表');
    }
    for(const testTarget of [null,{date:'2026-09-20',sheet:'项目月报 9月',address:'Y9'}]) {
      await page.setContent(fixture());
      await page.evaluate(hasTarget=>{
        const address=document.querySelector('#address'),editor=document.querySelector('#business-data');
        if(!hasTarget)for(const tab of document.querySelector('#tabs').children)tab.setAttribute('aria-selected',String(tab.textContent==='项目月报 8月'));
        address.value=hasTarget?'J9':'Y9';editor.readOnly=hasTarget;window.businessInputs=0;
        window.testTabClicks=[];
        editor.addEventListener('input',()=>window.businessInputs++);
        document.querySelector('#tabs').addEventListener('click',e=>{window.testTabClicks.push(e.target.textContent);address.value='J9';editor.readOnly=true;});
        address.addEventListener('keydown',e=>{if(e.key==='Enter')editor.readOnly=address.value!=='Y9';});
      },!!testTarget);
      const profile={sheetTab:{frame:[],sampleText:'项目月报 8月',strategies:[{type:'collection',parentSelector:'#tabs',itemSelector:':scope > button',selectedSelector:'[aria-selected="true"]'}]},cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#address'}]},cellEditor:{frame:[],sampleText:'',strategies:[{type:'css',value:'#business-data'}]}};
      const steps=await site.testControls(page,profile,3000,testTarget);
      assert.equal(await page.locator('#address').inputValue(),'Y9');
      assert.equal(await page.evaluate(()=>window.businessInputs),0);
      assert.deepEqual(await page.evaluate(()=>window.testTabClicks),testTarget?['项目月报 9月']:[]);
      assert.equal(await page.locator('#business-data').inputValue(),'业务内容未修改');
      assert.ok(steps.some(step=>step.label==='名称框定位 Y9'));
      assert.equal(await (await site.resolveControl(page,profile.sheetTab,'sheetTab',true)).innerText(),testTarget?.sheet || profile.sheetTab.sampleText);
      const clicks=await page.evaluate(()=>window.testTabClicks);
      await assert.rejects(site.testControls(page,profile,500,{date:'2026-10-01',sheet:'项目月报 10月',address:'F9'}),/未找到或不唯一/);
      assert.deepEqual(await page.evaluate(()=>window.testTabClicks),clicks);
      assert.equal(await page.locator('#address').inputValue(),'Y9');
    }
    await page.setContent(fixture());
    const cancelling=site.recordControl(page,'sheetTab');
    const rejected=assert.rejects(cancelling,/取消/);
    await page.locator('[data-pa-site-picker]').waitFor({state:'attached'});await page.keyboard.press('Escape');await rejected;
    assert.equal(await page.locator('[data-pa-site-picker]').count(),0);
    await page.locator('body').evaluate(body=>{const modal=document.createElement('div');modal.setAttribute('role','dialog');modal.textContent='请先登录，使用微信扫码登录';body.append(modal);});
    await assert.rejects(site.assertNoLogin(page),error=>error.code==='LoginRequired');
    await page.locator('[role=dialog]').evaluate(el=>el.hidden=true);await site.assertNoLogin(page);
    await page.setContent('<iframe id="embedded" style="width:900px;height:600px"></iframe>');
    const frame=page.frames().find(frame=>frame!==page.mainFrame());await frame.setContent(fixture(true));
    const sheetTab=await pick(page,'sheetTab',frame.getByText('项目月报 8月',{exact:true}));
    const cellAddressBox=await pick(page,'cellAddressBox',frame.locator('#address'));
    assert.deepEqual(sheetTab.frame,['#embedded']);assert.deepEqual(cellAddressBox.frame,['#embedded']);
    const profile=site.normalizeControls({sheetTab,cellAddressBox,cellEditor:{sampleText:'',frame:cellAddressBox.frame,strategies:[{type:'css',value:'#business-data'}]}});
    await site.testControls(page,profile);
    assert.equal(await frame.locator('#address').inputValue(),'A1');
    assert.equal(await page.locator('[data-pa-site-picker]').count(),0);
    await frame.locator('#address').evaluate(el=>{el.onfocus=()=>{const modal=document.createElement('dialog');modal.textContent='请先登录';document.body.append(modal);modal.showModal();};});
    await assert.rejects(site.testControls(page,profile),error=>error.code==='LoginRequired');
    const client=new TencentSheetClient({page,requirePage:()=>{}});
    await assert.rejects(client.inspect({fields:[{id:'missing'}],rules:{}},{}),/尚未完成/);
    console.log('PASS: control recording, target-date navigation and preserved selection avoid protected history; zero business input, iframe, cancellation and login checks');
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
