'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const site=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
async function main(){
  const browser=await chromium.launch({channel:'msedge',headless:true,args:['--no-proxy-server']});
  const page=await browser.newPage();page.setDefaultTimeout(3000);
  try {
    for(const attribute of ['text','title','aria-label']){
      await page.setContent(`<button id="save" class="save-indicator saved" onclick="window.clicked=true" ${attribute==='text'?'':`${attribute}="已保存"`}>${attribute==='text'?'已保存':'✓'}</button><div role="status">已保存</div>`);
      await page.mouse.move(0,0);
      const pending=site.recordControl(page,'saveStatus');
      pending.catch(()=>{});
      const hint=page.locator('[data-pa-site-picker]');await hint.waitFor({state:'attached'});
      assert.ok((await hint.evaluate(el=>el.getBoundingClientRect().y))>(await page.locator('#save').boundingBox()).y+30);
      await page.locator('#save').evaluate(el=>{el.style.position='fixed';el.style.bottom='0';});
      await page.locator('#save').hover();
      assert.equal(await hint.evaluate(el=>getComputedStyle(el).visibility),'hidden');
      await page.locator('#save').click();
      const binding=await pending;
      assert.equal(await page.evaluate(()=>!!window.clicked),false);
      const config={webControls:site.normalizeControls(JSON.parse(JSON.stringify({saveStatus:binding})))};
      const client=new TencentSheetClient({page,requirePage:()=>{}});
      assert.equal(await client.saveState(config),'saved');
      for(const [text,state] of [['正在保存','saving'],['保存成功','saved'],['未保存','failed'],['离线','failed'],['状态未知','unknown']]){
        await page.locator('#save').evaluate((el,{attribute,text})=>{el.className='save-indicator saving';if(attribute==='text')el.textContent=text;else el.setAttribute(attribute,text);},{attribute,text});
        if(state==='failed')await assert.rejects(client.saveState(config),/不会重复写入/);
        else assert.equal(await client.saveState(config),state);
      }
      await page.locator('#save').evaluate(el=>el.remove());
      assert.equal(await client.saveState(config),'unknown');
    }
    for(const text of ['未保存','not saved','unsaved','保存失败'])assert.equal(site.classifySaveState(text),'failed');
    assert.throws(()=>site.normalizeControls({saveStatus:{frame:[],sampleText:'未保存',strategies:[{type:'css',value:'#save'}]}}),/已保存/);
    console.log('PASS: recorded text/title/aria-label status survives transitions; picker suppresses original click; missing status never falls back to unrelated saved label; failures stop confirmation');
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
