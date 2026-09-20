'use strict';
// Disposable localhost fixture only. Never opens the user's document or daily browser profile.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const core = require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
const {TencentSheetClient} = require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');


async function main() {
  const cells = {N2:'2026/9/9',J8:'2026年9月5日',J18:'2026年9月5日',N34:'2026年9月5日',O34:'2026年9月5日',B9:'滨海公司',B19:'滨海公司',B35:'滨海园区',N33:'型材',O33:'板材'};
  let writes = 0, failedSave = false, denyEdit = false, reloads = 0, reloadDelay = 0;
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
      <span id="editable" ${denyEdit?'hidden':''}>可编辑</span><span id="saved">上次修改是在36分钟前进行的</span>
      <div id="ordinary">普通页面区域</div><div id="nameWrap"><label>名称框<input id="name" value="A1"></label></div><label>公式栏<input id="value" ${denyEdit?'readonly':''}></label>
      <div id="grid" role="grid" tabindex="0">表格键盘操作区</div>
      <script>
      const cells=${JSON.stringify(cells)},nameBox=document.querySelector('#name'),valueBox=document.querySelector('#value'),grid=document.querySelector('#grid');let address='N2',editAddress='N2';
      function render(){nameBox.value=address;valueBox.value=cells[address]??'';}
      render();
      document.querySelectorAll('[role=tab]').forEach(tab=>tab.onclick=()=>{document.querySelectorAll('[role=tab]').forEach(t=>t.setAttribute('aria-selected','false'));tab.setAttribute('aria-selected','true');});
      nameBox.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();address=nameBox.value;render();grid.focus();}};
      valueBox.onfocus=()=>{editAddress=address;};
      document.addEventListener('keydown',e=>{if(['F2','Tab','ArrowDown','ArrowUp','Backspace','Delete'].includes(e.key))throw Error('Unexpected navigation key: '+e.key);});
      valueBox.onkeydown=async e=>{
        if(e.key==='Escape'){e.preventDefault();render();grid.focus();}
        if(e.key==='Enter'){e.preventDefault();document.querySelector('#saved').hidden=true;cells[editAddress]=valueBox.value;await fetch('/',{method:'POST',body:JSON.stringify({address:editAddress,value:valueBox.value})});document.querySelector('#saved').hidden=false;render();grid.focus();}
      };
      if(${reloadDelay}){nameBox.value='';valueBox.hidden=true;document.querySelectorAll('[role=tab]').forEach(el=>el.hidden=true);setTimeout(()=>{render();valueBox.hidden=false;document.querySelectorAll('[role=tab]').forEach(el=>el.hidden=false);},${reloadDelay});}
      </script>`);
  });
  await new Promise(resolve=>fixture.listen(0,'127.0.0.1',resolve));
  const profile = await fs.mkdtemp(path.resolve(__dirname,'../../artifacts/tencent-integrated-test-'));
  const browser=new TencentDocsBrowser(profile,{headless:true,args:['--no-proxy-server'],viewport:{width:1200,height:800}});
  const driver=new TencentSheetClient(browser);
  const config=core.validate({...require('./fixture-config.cjs')(),timeout:15,documentUrl:`http://127.0.0.1:${fixture.address().port}/`});
  const plan=core.plan(config,'2026-09-05',{cutting:0,welding:2,section:3,plate:4});
  try {
    await browser.open(config);
    driver.page.on('pageerror',error=>{throw error;});
    await driver.page.locator('body').evaluate(el=>{const editor=el.ownerDocument.createElement('div');editor.id='blankEditor';editor.contentEditable='true';editor.innerHTML='<div><br></div>';el.append(editor);});
    const blankEditor=driver.page.locator('#blankEditor');
    assert.equal(await driver.text(blankEditor,false),'');
    await blankEditor.evaluate(el=>el.textContent='\u200b');assert.equal(await driver.text(blankEditor,false),'');
    await blankEditor.evaluate(el=>el.textContent='0');assert.equal(await driver.text(blankEditor,false),'0');
    await blankEditor.evaluate(el=>el.remove());
    const diagnosis=await driver.diagnose(config,'N9');assert.equal(diagnosis.returnedAddress,'N9');assert.equal(writes,0);assert.equal(cells.N2,'2026/9/9');
    await assert.rejects(driver.prepareEdit(config,'N2','unexpected'),/写前原值不一致/);
    assert.equal(writes,0);
    await driver.page.locator('#value').evaluate(el=>el.addEventListener('focus',()=>{el.value='stale';}));
    await assert.rejects(driver.diagnose(config,'N9'),/聚焦内容编辑区后的原值不一致/);
    assert.equal(writes,0);await driver.page.reload();
    await driver.page.locator('#value').evaluate(el=>el.addEventListener('focus',()=>{el.ownerDocument.querySelector('#name').value='N2';}));
    await assert.rejects(driver.diagnose(config,'N9'),/聚焦内容编辑区后地址变成/);
    assert.equal(writes,0);await driver.page.reload();
    console.log('PASS: Direct content editor input without F2; changed value/address stops before input');
    const inputBaseline=await driver.inspect(config,plan);
    await driver.page.locator('#value').evaluate(el=>el.addEventListener('keydown',e=>{if(/^[0-9.]$/.test(e.key))e.preventDefault();}));
    await assert.rejects(driver.write(config,plan,inputBaseline),/内容编辑区输入未生效/);
    assert.equal(writes,0);assert.equal(cells.N2,'2026/9/9');await driver.page.reload();
    if(process.argv.includes('--location-only'))return;
    await driver.ready(config);
    const check=await driver.inspect(config,plan);assert.equal(check.anchors.length,8);assert.equal(writes,0);
    const sharedConfig=config;
    reloadDelay=600;
    const result=await driver.write(sharedConfig,plan,check);assert.equal(result.completed.length,4);assert.equal(writes,4);assert.equal(cells.J9,'0');assert.ok(reloads>=2);
    reloadDelay=0;
    const recoveredAddress=await driver.page.locator('#name').inputValue();
    await driver.page.locator('#name').evaluate(el=>el.value='');
    await assert.rejects(driver.waitForReloadControls(sharedConfig,Date.now()+250),/恢复超时/);
    assert.equal(writes,4);
    await driver.page.locator('#name').evaluate((el,address)=>el.value=address,recoveredAddress);
    await driver.page.evaluate(()=>{const dialog=document.createElement('div');dialog.setAttribute('role','dialog');dialog.textContent='请先登录';document.body.append(dialog);});
    await assert.rejects(driver.waitForReloadControls(sharedConfig,Date.now()+1000),error=>error.code==='LoginRequired');
    await driver.page.locator('[role=dialog]').evaluate(el=>el.remove());
    console.log('PASS: delayed post-reload A1/editor/tabs recover without duplicate writes; permanent unavailability times out and login stops');
    assert.equal(cells.N2,'2026/9/9');
    await assert.rejects(driver.write(config,plan,await driver.inspect(config,plan)),/冲突/);assert.equal(writes,4);
    cells.J9='99';await driver.page.reload();
    const conflict=await driver.inspect(config,plan);assert.equal(conflict.conflict,true);
    await assert.rejects(driver.write(config,plan,conflict),/冲突/);assert.equal(writes,4);
    cells.J9='0';cells.B9='别的公司';await driver.page.reload();
    await assert.rejects(driver.inspect(config,plan),/项目标志校验失败/);assert.equal(writes,4);
    cells.B9='滨海公司';for(const row of plan.rows)delete cells[row.address];await driver.page.reload();
    config.webControls.saveStatus={frame:[],sampleText:'上次修改是在36分钟前进行的',strategies:[{type:'css',value:'#saved'}]};
    const baseline=await driver.inspect(config,plan);failedSave=true;
    await assert.rejects(driver.write(config,plan,baseline),error=>error.code==='SaveConfirmationPending' && error.completed.length===4 && /已填写 4 项/.test(error.message) && /刷新后回读不一致/.test(error.details));assert.equal(writes,8);
    denyEdit=true;await driver.page.reload();await assert.rejects(driver.ready(config));
    console.log('PASS: actual DOM navigation, 8 anchors, read-only inspect, write and reload verification, occupied-cell rejection, conflict, anchor failure, unsaved data and permission failure');
    failedSave=false;denyEdit=false;for(const row of plan.rows)delete cells[row.address];await driver.page.reload();
    for(let day=1;day<=30;day++)cells['A'+(day+3)]='2026/9/'+day;
    const rules={};
    for(const [key,column,label] of [['cutting','C','下料量'],['welding','D','装焊量'],['section','E','型材'],['plate','F','板材']]) {
      cells[column+'2']=label;
      const rule=core.inferRule([{date:'2026-09-01',address:column+'4'},{date:'2026-09-02',address:column+'5'}]);
      rules[key]=core.normalizeRule({...rule,confirmation:core.prediction(rule),dateAnchor:{address:'A4',format:'{yyyy}/{M}/{d}'},labelAnchor:{address:column+'2',expected:label}});
    }
    await driver.page.reload();await driver.selectSheet(config,plan.sheet);
    await driver.read(config,'C4');
    assert.equal((await driver.captureSelection(config,plan.sheet)).address,'C4');
    await assert.rejects(driver.captureSelection(config,'错误工作表'),/工作表发生变化/);
    const proof=await driver.verifyTeaching(config,rules.cutting);
    assert.equal(proof.rule.confirmation.address,'C6');
    assert.equal(await driver.selectedAddress(config),'C6');
    const learnedConfig=core.validate({...config,rules});
    const learnedPlan=core.plan(learnedConfig,'2026-09-05',{cutting:1,welding:2,section:3,plate:4});
    assert.deepEqual(learnedPlan.rows.map(row=>row.address),['C8','D8','E8','F8']);
    const beforeWrites=writes;
    const learnedPreview=await driver.inspect(learnedConfig,learnedPlan);
    assert.equal(learnedPreview.anchors.length,8);assert.equal(writes,beforeWrites);
    await driver.write(learnedConfig,learnedPlan,learnedPreview);
    assert.equal(writes,beforeWrites+4);assert.equal(cells.C8,'1');assert.equal(cells.F8,'4');assert.equal(cells.A8,'2026/9/5');
    cells.A8='日期错误';await driver.page.reload();
    await assert.rejects(driver.inspect(learnedConfig,learnedPlan),/日期校验失败/);
    assert.equal(writes,beforeWrites+4);
    cells.A8='2026/9/5';delete cells.C8;await driver.page.reload();
    const customConfig=core.validate({...config,requireTeaching:true,fields:[{id:'quality',name:'合格数量',unit:'件'}],rules:{quality:rules.cutting}});
    const customPlan=core.plan(customConfig,'2026-09-06',{quality:-2.5});
    assert.deepEqual(customPlan.rows.map(row=>row.address),['C9']);
    const customPreview=await driver.inspect(customConfig,customPlan);
    await driver.write(customConfig,customPlan,customPreview);
    assert.equal(cells.C9,'-2.5');assert.equal(cells.A9,'2026/9/6');assert.equal(writes,beforeWrites+5);
    console.log('PASS: single custom field uses learned rule and anchor for leave-and-return verification, preserving signed decimal value');
    console.log('PASS: actual selection capture, third-cell preview, vertical date anchors and four persisted vertical writes');

  } finally {await browser.close();await new Promise(resolve=>fixture.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
