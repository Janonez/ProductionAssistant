'use strict';
// Disposable localhost fixture only. Never opens the user's document or daily browser profile.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const core = require('./core.js');
const {BrowserSession,normalizeAdapter} = require('./browser.cjs');
const {createServer} = require('./server.cjs');

async function main() {
  const cells = {N2:'2026/9/9',J8:'2026年9月5日',J18:'2026年9月5日',N34:'2026年9月5日',O34:'2026年9月5日',B9:'滨海公司',B19:'滨海公司',B35:'滨海园区',N33:'型材',O33:'板材'};
  let writes = 0, failedSave = false, denyEdit = false, reloads = 0;
  const fixture = http.createServer(async(req,res)=> {
    if(req.method==='POST') {
      let text='';for await(const chunk of req)text+=chunk;
      const {address,value}=JSON.parse(text);writes++;
      if(!failedSave)cells[address]=value;
      res.end('{}');return;
    }
    reloads++;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(`<!doctype html><meta charset="utf-8"><title>Local sheet fixture</title>
      <button role="tab" aria-selected="true">其他工作表</button><button role="tab" aria-selected="false">下料、装焊（26年9月）</button>
      <span id="editable" ${denyEdit?'hidden':''}>可编辑</span><span id="saved">已保存</span>
      <div id="ordinary">普通页面区域</div><div id="nameWrap"><label>名称框<input id="name" value="A1"></label></div><label>公式栏<input id="value" ${denyEdit?'readonly':''}></label>
      <input id="cellEditor" aria-label="单元格编辑器"><div id="grid" role="grid" tabindex="0">表格键盘操作区</div>
      <script>
      const cells=${JSON.stringify(cells)},nameBox=document.querySelector('#name'),valueBox=document.querySelector('#value'),grid=document.querySelector('#grid'),cellEditor=document.querySelector('#cellEditor');let address='N2',editAddress='N2';
      function render(){nameBox.value=address;valueBox.value=cells[address]??'';}
      render();
      document.querySelectorAll('[role=tab]').forEach(tab=>tab.onclick=()=>{document.querySelectorAll('[role=tab]').forEach(t=>t.setAttribute('aria-selected','false'));tab.setAttribute('aria-selected','true');});
      nameBox.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();address=nameBox.value;render();grid.focus();}};
      grid.onkeydown=e=>{if(e.key==='F2'){e.preventDefault();editAddress=address;cellEditor.value=cells[address]??'';cellEditor.focus();}};
      // The tested page contract uses F2 editor entry; no grid navigation is needed.
      document.addEventListener('keydown',e=>{if(['Tab','ArrowDown','ArrowUp','Backspace','Delete'].includes(e.key))throw Error('Unexpected navigation key: '+e.key);});
      cellEditor.onkeydown=async e=>{
        if(e.key==='Escape'){e.preventDefault();render();grid.focus();}
        if(e.key==='Enter'){e.preventDefault();document.querySelector('#saved').hidden=true;cells[editAddress]=cellEditor.value;await fetch('/',{method:'POST',body:JSON.stringify({address:editAddress,value:cellEditor.value})});document.querySelector('#saved').hidden=false;render();grid.focus();}
      };
      </script>`);
  });
  await new Promise(resolve=>fixture.listen(0,'127.0.0.1',resolve));
  const profile = await fs.mkdtemp(path.resolve(__dirname,'../../../artifacts/tencent-browser-test-'));
  const driver = new BrowserSession(profile,{headless:true,viewport:{width:1200,height:800}});
  const adapter=normalizeAdapter({nameBox:'#name',valueBox:'#value',sheetTabs:'[role=tab]',activeSheet:'[aria-selected=true]',ready:'',saved:''});
  for(const [key,address] of Object.entries({cuttingDate:'J8',weldingDate:'J18',sectionDate:'N34',plateDate:'O34',cuttingCompany:'B9',weldingCompany:'B19',park:'B35',sectionType:'N33',plateType:'O33'}))adapter.anchors[key].address=address;
  const config={...core.defaults,timeout:5,documentUrl:`http://127.0.0.1:${fixture.address().port}/`,adapter};
  const plan=core.plan(config,'2026-09-05',{cutting:0,welding:2,section:3,plate:4});
  try {
    await driver.open(config);
    driver.page.on('pageerror',error=>{throw error;});
    await driver.page.locator('body').evaluate(el=>{const editor=el.ownerDocument.createElement('div');editor.id='blankEditor';editor.contentEditable='true';editor.innerHTML='<div><br></div>';el.append(editor);});
    const blankEditor=driver.page.locator('#blankEditor');
    assert.equal(await driver.text(blankEditor,false),'');
    await blankEditor.evaluate(el=>el.textContent='\u200b');assert.equal(await driver.text(blankEditor,false),'');
    await blankEditor.evaluate(el=>el.textContent='0');assert.equal(await driver.text(blankEditor,false),'0');
    await blankEditor.evaluate(el=>el.remove());
    const diagnosis=await driver.diagnose(config,'N9');assert.equal(diagnosis.returnedAddress,'N9');assert.equal(writes,0);assert.equal(cells.N2,'2026/9/9');
    await driver.page.locator('#grid').evaluate(el=>el.onkeydown=null);
    await assert.rejects(driver.diagnose(config,'N9'),/未获得焦点/);
    assert.equal(writes,0);await driver.page.reload();
    await assert.rejects(driver.prepareEdit(config,'N2','unexpected'),/写前原值不一致/);
    assert.equal(writes,0);
    await driver.page.locator('#cellEditor').evaluate(el=>el.addEventListener('focus',()=>{el.value='stale';}));
    await assert.rejects(driver.diagnose(config,'N9'),/聚焦后的原值不一致/);
    assert.equal(writes,0);assert.equal(cells.N2,'2026/9/9');await driver.page.reload();
    await driver.page.locator('#cellEditor').evaluate(el=>el.addEventListener('focus',()=>{el.ownerDocument.querySelector('#name').value='N2';}));
    await assert.rejects(driver.diagnose(config,'N9'),/聚焦后地址变成/);
    assert.equal(writes,0);await driver.page.reload();
    console.log('PASS: F2 editor entry diagnosis writes nothing; original-value and address changes stop before input');
    if(process.argv.includes('--location-only'))return;
    assert.equal(config.adapter.stateMode,'auto');
    await driver.ready(config);
    await driver.ready({...config,adapter:{...adapter,ready:'#obsolete',saved:'#obsolete'}});
    assert.equal(await (await driver.control({...config,adapter:{...adapter,nameBox:'#nameWrap'}},'nameBox')).getAttribute('id'),'name');
    await assert.rejects(driver.control({...config,adapter:{...adapter,nameBox:'#ordinary'}},'nameBox'),e=>e.field==='nameBox' && e.message.includes('普通页面区域'));
    await assert.rejects(driver.ready({...config,adapter:{...adapter,stateMode:'selectors'}}),e=>e.field==='ready' && e.message.includes('编辑状态标志') && !e.message.includes('ready'));
    const badPick=driver.pick(config,'nameBox');
    const badPickCheck=assert.rejects(badPick,e=>e.field==='nameBox' && e.message.includes('普通页面区域'));
    await driver.page.getByText('Demo 选取模式：',{exact:false}).waitFor();
    await driver.page.locator('#ordinary').click();await badPickCheck;
    const picking=driver.pick(config,'nameBox');
    await driver.page.getByText('Demo 选取模式：',{exact:false}).waitFor();
    await driver.page.locator('#name').click();
    assert.equal((await picking).selector,'#name');
    console.log('PASS: automatic state checks with empty/legacy markers, wrapper recovery, invalid picker rejection and Chinese field errors');
    const discovered=await driver.discover(config);assert.ok(discovered.frames[0].controls.some(c=>c.id==='name'));
    const check=await driver.inspect(config,plan);assert.equal(check.anchors.length,9);assert.equal(writes,0);
    const result=await driver.write(config,plan,check);assert.equal(result.completed.length,4);assert.equal(writes,4);assert.equal(cells.J9,'0');assert.ok(reloads>=2);
    assert.equal(cells.N2,'2026/9/9');
    await assert.rejects(driver.write(config,plan,await driver.inspect(config,plan)),/冲突/);assert.equal(writes,4);
    cells.J9='99';await driver.page.reload();
    const conflict=await driver.inspect(config,plan);assert.equal(conflict.conflict,true);
    await assert.rejects(driver.write(config,plan,conflict),/冲突/);assert.equal(writes,4);
    cells.J9='0';cells.B9='别的公司';await driver.page.reload();
    await assert.rejects(driver.inspect(config,plan),/公司校验失败/);assert.equal(writes,4);
    cells.B9='滨海公司';for(const row of plan.rows)delete cells[row.address];await driver.page.reload();
    const baseline=await driver.inspect(config,plan);failedSave=true;
    await assert.rejects(driver.write(config,plan,baseline),/刷新后回读不一致/);assert.equal(writes,8);
    denyEdit=true;await driver.page.reload();await assert.rejects(driver.ready(config));
    console.log('PASS: actual DOM navigation, 9 anchors, read-only inspect, write and reload verification, occupied-cell rejection, conflict, anchor failure, unsaved data and permission failure');
    failedSave=false;denyEdit=false;for(const row of plan.rows)delete cells[row.address];await driver.page.reload();
    await checkApplication(driver,config,profile);
  } finally {await driver.close();await new Promise(resolve=>fixture.close(resolve));}
}
async function checkApplication(driver,config,runtime) {
  const app=await createServer({runtime:path.join(runtime,'app-test'),driver,port:0});
  const page=await driver.context.newPage();
  try {
    await page.goto(app.origin+'/#import='+encodeURIComponent(JSON.stringify(config)));
    await page.getByText('原 Demo 配置已迁移。网页操作设置可在此继续补充。',{exact:true}).waitFor();
    assert.equal(new URL(page.url()).hash,'');
    await page.locator('#sample').click();await page.locator('#date').fill('2026-09-05');
    await page.locator('#dataForm button[type=submit]').click();
    await page.locator('#check').click();
    await page.waitForFunction(()=>!document.getElementById('check').disabled,undefined,{polling:100,timeout:30000});
    assert.equal(await page.locator('#execute').isDisabled(),false,await page.locator('#status').innerText());
    await page.locator('#execute').click();await page.locator('#confirmWrite').waitFor({state:'visible'});
    assert.match(await page.locator('#writeSummary').innerText(),/J9 = 42.35/);
    await page.locator('#submitWrite').click();
    await page.waitForFunction(()=>document.getElementById('status').textContent !== '正在执行，请等待；不要操作专用浏览器…',undefined,{polling:100,timeout:30000});
    assert.equal(await page.locator('#status').innerText(),'真实填报完成，刷新后回读一致。');
    await page.screenshot({path:path.resolve(__dirname,'../../../artifacts/tencent-docs-demo-preview.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.locator('#settingsTab').click();
    await page.screenshot({path:path.resolve(__dirname,'../../../artifacts/tencent-docs-demo-settings-mobile.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    console.log('PASS: config migration, full application HTTP-to-browser write, confirmation dialog, refresh readback and mobile layouts');
  } finally {await app.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
