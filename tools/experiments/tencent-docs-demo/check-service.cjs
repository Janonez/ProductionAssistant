'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const core = require('./core.js');
const {createServer} = require('./server.cjs');
const {anchorSpecs,normalizeAdapter,expand,a1,explainError} = require('./browser.cjs');

async function main() {
  const runtime = await fs.mkdtemp(path.resolve(__dirname,'../../../artifacts/tencent-demo-test-'));
  const config = {...core.defaults,documentUrl:'http://127.0.0.1/sheet/test',adapter:normalizeAdapter()};
  const plan = core.plan(config,'2026-09-05',{cutting:0,welding:2,section:3,plate:4});
  assert.equal(expand('{cuttingColumn}8',config,plan),'J8');
  assert.equal(expand('{date}',config,plan),'2026年9月5日');
  assert.throws(()=>a1('XFE1')); assert.throws(()=>a1('A0')); assert.throws(()=>a1('A1:B2'));
  const readable=explainError(Error('locator.isEditable: Error: Element is not an <input>\nCall log: \u001b[2mwaiting\u001b[22m'));
  assert.ok(readable.error.includes('网页控件'));assert.ok(!readable.error.includes('locator'));
  assert.ok(readable.details.includes('locator.isEditable'));assert.ok(!readable.details.includes('\u001b'));
  let writes=0;
  const driver = {
    async close(){},async open(){return {message:'test open'};},
    async inspect(c,p){return {rows:core.preflight(p,{},'ready'),anchors:anchorSpecs.map(([label])=>({label})),conflict:false,prewriteVerified:true};},
    async write(c,p,b){writes++;return {completed:b.rows,message:'test written'};}
  };
  const app = await createServer({runtime,driver,port:0});
  const headers={'X-Demo-Token':app.token,'Content-Type':'application/json','Origin':app.origin};
  const post=async(route,body={})=> {const r=await fetch(app.origin+'/api/'+route,{method:'POST',headers,body:JSON.stringify(body)});return {status:r.status,body:await r.json()};};
  try {
    assert.equal((await fetch(app.origin+'/api/config')).status,403);
    assert.equal((await fetch(app.origin+'/api/config',{headers:{...headers,Origin:'https://evil.test'}})).status,403);
    const wrongHost = await new Promise((resolve,reject)=> {
      require('node:http').get(app.origin+'/api/config',{headers:{...headers,Host:'evil.test'}},res=>{res.resume();resolve(res.statusCode);}).on('error',reject);
    });
    assert.equal(wrongHost,403);
    assert.equal((await fetch(app.origin+'/server.cjs')).status,404);
    assert.equal((await fetch(app.origin+'/')).status,200);
    assert.equal((await post('config',config)).status,200);
    const input={date:plan.date,values:{cutting:0,welding:2,section:3,plate:4}};
    assert.equal((await post('write',{inspectionId:'invented'})).status,400);
    const first=await post('inspect',input);assert.equal(first.status,200);
    await post('config',config);
    assert.equal((await post('write',{inspectionId:first.body.inspectionId})).status,400);
    const second=await post('inspect',input);
    assert.equal((await post('write',{inspectionId:second.body.inspectionId})).status,200);
    assert.equal((await post('write',{inspectionId:second.body.inspectionId})).status,400);
    assert.equal(writes,1);
    const deferred={}; driver.open=()=>new Promise(resolve=>deferred.resolve=resolve);
    const opening=post('open');
    while(!deferred.resolve)await new Promise(resolve=>setTimeout(resolve,5));
    assert.equal((await post('inspect',input)).status,409);
    deferred.resolve({message:'opened'});await opening;
    driver.write=async()=>{const e=Error('save failed');e.completed=[{address:'J9',result:'written'}];e.uncertainAddress='J19';throw e;};
    const third=await post('inspect',input), failed=await post('write',{inspectionId:third.body.inspectionId});
    assert.equal(failed.body.uncertainAddress,'J19');assert.equal(failed.body.completed[0].address,'J9');
    assert.equal((await post('write',{inspectionId:third.body.inspectionId})).status,400);
    console.log('PASS: loopback host/origin/token, config persistence, serialization, one-use preview, stale config, partial-result reporting');
    await checkRealUI(app.origin,app.token,config);
    driver.inspect=async(c,p)=>({rows:core.preflight(p,{},'ready'),anchors:[],conflict:false,prewriteVerified:false});
    const blocked=await post('inspect',input);assert.equal(blocked.status,400);assert.match(blocked.body.error,/地址与原值未通过检查/);
    assert.equal((await post('write',{})).status,400);
    console.log('PASS: failed prewrite check cannot issue a write preview or reach the writer');
  } finally {await app.close();}
}
async function checkRealUI(origin,token,config) {
  const {JSDOM}=require('../../../src/ProductionAssistant.App/Assets/Prototype/node_modules/jsdom');
  const html=await fs.readFile(path.join(__dirname,'index.html'),'utf8');
  const dom=new JSDOM(html,{url:origin,runScripts:'outside-only'}), w=dom.window;
  w.DEMO_SERVICE={origin,token};
  w.fetch=(url,opts)=>fetch(new URL(url,origin),opts);
  w.eval(await fs.readFile(path.join(__dirname,'core.js'),'utf8'));
  w.eval(await fs.readFile(path.join(__dirname,'app.js'),'utf8'));
  await w.demoInitialized;
  const $=id=>w.document.getElementById(id);
  assert.equal($('mode').value,'real');assert.equal($('browserPanel').hidden,false);
  assert.equal($('stateMode').value,'auto');assert.equal($('stateSelectors').hidden,true);
  $('sample').click();$('date').value='2026-09-05';$('dataForm').dispatchEvent(new w.Event('submit',{cancelable:true}));
  $('check').click();
  for(let i=0;i<100 && $('execute').disabled;i++)await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal($('execute').disabled,false,$('status').textContent);
  assert.equal($('preview').querySelectorAll('input').length,0);
  assert.match($('preview').textContent,/42.35/);
  $('dataForm').elements.cutting.value='99';$('dataForm').dispatchEvent(new w.Event('input'));
  assert.equal($('execute').disabled,true);
  $('settingsTab').click();$('configForm').elements.company.value='新公司';
  $('configForm').dispatchEvent(new w.Event('submit',{cancelable:true}));
  for(let i=0;i<100;i++){await new Promise(resolve=>setTimeout(resolve,10));if($('status').textContent.includes('设置已保存'))break;}
  const r=await fetch(origin+'/api/config',{headers:{'X-Demo-Token':token}});assert.equal((await r.json()).config.company,'新公司');
  dom.window.close();console.log('PASS: real-mode UI payload survives locking, read-only values, stale-plan invalidation, server settings save');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
