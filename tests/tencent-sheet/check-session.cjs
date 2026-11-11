'use strict';
const assert=require('node:assert/strict');
const {TencentSession,closed,documentUrl}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/session.cjs');

async function unitChecks() {
  for(const value of ['http://docs.qq.com/a','https://docs.qq.com.evil.invalid/a','https://user:password@docs.qq.com/a','https://docs.qq.com:8080/a'])
    assert.throws(()=>documentUrl(value));
  assert.equal(documentUrl('https://doc.weixin.qq.com/sheet/a'),'https://doc.weixin.qq.com/sheet/a');
  let evidence={},failure,opens=[],focuses=0;
  const url='https://docs.qq.com/sheet/fixture';
  const browser={context:{},page:{isClosed:()=>false,url:()=>url,bringToFront:async()=>{focuses++;},evaluate:async()=>{if(failure)throw failure;return evidence;}},
    documentUrl:url,open:async(config,headless)=>opens.push(headless),close:async()=>{browser.context=null;}};
  const session=new TencentSession(browser);
  const run=operation=>session.run(operation,{documentUrl:url,timeout:5});
  assert.equal((await run('sessionStatus')).state,'unverified');
  evidence={document:true,login:true};
  assert.equal((await run('sessionOpen')).state,'login-required');
  assert.deepEqual(opens,[],'opening an existing document reuses it without navigation');
  assert.equal(focuses,1);
  evidence={account:true,document:true};
  let status=await run('sessionVerify');
  assert.equal(status.state,'authenticated');assert.equal(status.editPermission,'unknown');
  evidence={account:true,denied:true};status=await run('sessionStatus');
  assert.equal(status.authentication,'authenticated');assert.equal(status.documentAccess,'denied');
  evidence={account:true,document:true,readOnly:true};assert.equal((await run('sessionStatus')).editPermission,'read-only');
  failure=Error('Execution context was destroyed');assert.equal((await run('sessionStatus')).state,'loading');
  failure=Error('Frame has been detached');assert.equal((await run('sessionStatus')).state,'loading');
  failure=Error('secret fixture diagnostic');status=await run('sessionStatus');
  assert.equal(status.state,'unavailable');assert.ok(!JSON.stringify(status).includes('secret'));
  for(const code of ['ProfileBusy','BrowserUnavailable']) {
    browser.documentUrl=null;
    browser.open=async()=>{throw Object.assign(Error('private launch diagnostic'),{code});};
    const unavailable=await run('sessionOpen');
    assert.equal(unavailable.code,code);assert.equal(unavailable.authentication,'unknown');
    assert.ok(unavailable.recoveryHint);assert.ok(!JSON.stringify(unavailable).includes('private'));
  }
  assert.deepEqual(await run('sessionClose'),closed());
  assert.deepEqual(await run('sessionStatus'),closed());
  await assert.rejects(run('unknown'),/不支持/);
  console.log('PASS session contract: explicit evidence, unknown permissions, visible login, redirects, closed state, sanitized failures, URL boundary');
}

async function verifyFreshnessChecks() {
  let reads=0;
  const url='https://docs.qq.com/sheet/fixture';
  const browser={documentUrl:url,context:{},page:{isClosed:()=>false,url:()=>url,
    evaluate:async()=>++reads<3?{}:{account:true,document:true}}};
  const session=new TencentSession(browser);
  const status=await session.run('sessionVerify',{documentUrl:url,timeout:1});
  assert.equal(status.state,'authenticated');assert.equal(reads,3);assert.ok(status.verifiedAt);
  browser.page.evaluate=async()=>({});
  assert.equal((await session.run('sessionVerify',{documentUrl:url,timeout:0.01})).state,'unverified');
  browser.page.evaluate=async()=>({login:true,document:true});
  assert.equal((await session.run('sessionVerify',{documentUrl:url,timeout:1})).state,'login-required');
  console.log('PASS Verify waits for fresh SPA evidence and never reuses past authentication');
}

async function browserOptionChecks() {
  const {readFileSync}=require('node:fs'),{runInNewContext}=require('node:vm'),{EventEmitter}=require('node:events');
  const launches=[],module={exports:{}};
  runInNewContext(readFileSync(require.resolve('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs'),'utf8'),{
    module,require:()=>({chromium:{launchPersistentContext:async(profile,options)=>{
      const context=new EventEmitter(),record={profile,options,focuses:0,closed:false};
      context.pages=()=>[{isClosed:()=>record.closed,setDefaultTimeout(){},async goto(){},async bringToFront(){record.focuses++;}}];
      context.close=async()=>{record.closed=true;context.emit('close');};launches.push(record);return context;
    }}})
  });
  const Browser=module.exports.TencentDocsBrowser,config={documentUrl:'https://docs.qq.com/sheet/fixture',timeout:5};
  for(const [defaultMode,explicitMode,expected] of [[true,undefined,true],[true,false,false],[true,true,true],[false,true,true],[false,undefined,false]]) {
    const browser=new Browser('owned-test-profile',{headless:defaultMode,viewport:{width:1200,height:800},args:['--no-proxy-server'],
      channel:'chrome',userDataDir:'another-profile',executablePath:'another-browser',ignoreDefaultArgs:true});
    try {
      await browser.open(config,explicitMode);
      const launched=launches.at(-1);
      assert.equal(launched.profile,'owned-test-profile');
      assert.equal(launched.options.channel,'msedge');assert.equal(launched.options.executablePath,undefined);
      assert.equal(launched.options.userDataDir,undefined);assert.equal(launched.options.ignoreDefaultArgs,undefined);
      assert.equal(launched.options.headless,expected);assert.equal(browser.headless,expected);
      assert.equal(launched.focuses,expected?0:1);
      assert.equal(expected?launched.options.viewport.width:launched.options.viewport,expected?1200:null);
    } finally {await browser.close();}
    assert.equal(launches.at(-1).closed,true);
  }
  const before=launches.length;
  for(const args of [['--user-data-dir=another-profile'],['--headless'],['--remote-debugging-port=9222']])
    await assert.rejects(new Browser('owned-test-profile',{args}).open(config,false),/启动参数/);
  assert.equal(launches.length,before,'profile and mode switches cannot bypass the owner');
  console.log('PASS browser options: explicit mode overrides defaults; persistent profile and Edge channel stay owned');
}

async function browserRaceChecks() {
  const {readFileSync}=require('node:fs'),{runInNewContext}=require('node:vm'),{EventEmitter}=require('node:events');
  const deferred=()=>{let resolve;const promise=new Promise(done=>resolve=done);return {promise,resolve};};
  for(const phase of ['launch','navigation','focus']) {
    const launch=deferred(),entered=deferred(),continueOpen=deferred();
    let launches=0,closed=false,navigations=0;
    const context=new EventEmitter();
    const page={isClosed:()=>closed,setDefaultTimeout(){},
      async goto(){navigations++;if(phase==='navigation'){entered.resolve();await continueOpen.promise;}},
      async bringToFront(){if(phase==='focus'){entered.resolve();await continueOpen.promise;}}};
    context.pages=()=>[page];context.close=async()=>{closed=true;context.emit('close');};
    const module={exports:{}};
    runInNewContext(readFileSync(require.resolve('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs'),'utf8'),{
      module,require:()=>({chromium:{launchPersistentContext:()=>{launches++;return launch.promise;}}})
    });
    const browser=new module.exports.TencentDocsBrowser('test-only-profile');
    const opening=browser.open({documentUrl:'https://docs.qq.com/sheet/fixture',timeout:5})
      .then(()=>{throw Error('Cancelled open unexpectedly succeeded');},error=>error);
    if(phase!=='launch'){launch.resolve(context);await entered.promise;}
    const closing=browser.close(),secondClose=browser.close();
    launch.resolve(context);continueOpen.resolve();
    const error=await opening;
    await Promise.all([closing,secondClose]);
    assert.equal(error.code,'SessionClosed',phase);
    assert.equal(launches,1,'closing cannot relaunch an old open');
    assert.equal(closed,true);assert.equal(browser.context,null);assert.equal(browser.page,null);assert.equal(browser.documentUrl,null);
    if(phase==='launch')assert.equal(navigations,0,'cancelled launch never navigates to the document');
  }
  console.log('PASS browser races: close during launch/navigation/focus, repeated close, no late session resurrection');
}

async function browserChecks() {
  const http=require('node:http'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
  const {execFile}=require('node:child_process'),{promisify}=require('node:util');
  const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
  let navigationArrived;
  const navigationStarted=new Promise(resolve=>navigationArrived=resolve);
  const server=http.createServer((req,res)=>{
    if(req.url==='/pending-navigation'){navigationArrived();return;}
    if(req.url==='/login'||req.url==='/logout') {
      res.writeHead(302,{'Set-Cookie':req.url==='/login'?'session=fixture; HttpOnly; Max-Age=3600; Path=/':'session=; HttpOnly; Max-Age=0; Path=/','Location':'/sheet'});res.end();return;
    }
    const authenticated=/(?:^|; )session=fixture(?:;|$)/.test(req.headers.cookie||'');
    const body=authenticated?'<div class="user-info-wrap"><div id="self-info">fixture</div></div>':'<button id="header-login-btn">登录</button><a href="/login">Fixture login</a>';
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end('<!doctype html><meta charset="utf-8">'+body+(req.url==='/denied'?'<p role="alert">没有访问权限</p>':'<div class="tab-bar-item">fixture sheet</div>')+
      (req.url==='/readonly'?'<p aria-label="只读">只读</p>':'')+'<a href="/logout">Fixture logout</a><input id="business"><iframe src="about:blank"></iframe>');
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const folder=await fs.mkdtemp(path.join(os.tmpdir(),'metis-session-'));
  const profile=path.join(folder,'profile');
  const browser=new TencentDocsBrowser(profile,{headless:true,args:['--no-proxy-server']});
  const session=new TencentSession(browser),url=`http://127.0.0.1:${server.address().port}/sheet`;
  const config={documentUrl:url,timeout:10};
  const run=async(operation,request=config)=>{
    const status=await session.run(operation,request);
    console.log(JSON.stringify({operation,...status}));
    return status;
  };
  try {
    assert.equal((await run('sessionStatus',config)).state,'closed');
    assert.equal((await run('sessionOpen',config)).state,'login-required');
    console.log('Edge actual version: '+browser.context.browser()?.version()+'; channel=msedge; headless='+browser.headless);
    assert.equal(browser.headless,false,'login overrides the constructor headless default');
    assert.equal(await browser.page.evaluate(()=>CSS.supports('selector(:has(*))')),true);
    await Promise.all([browser.page.waitForURL(url),browser.page.locator('a[href="/login"]').click()]);
    await browser.page.locator('.user-info-wrap #self-info').waitFor();
    // HttpOnly cookie is set by HTTP and survives a real context close, never by DOM mutation.
    assert.equal((await run('sessionVerify',config)).state,'authenticated');
    assert.equal(await browser.page.locator('#business').inputValue(),'');
    await browser.page.locator('iframe').evaluate(element=>element.remove());
    assert.equal((await run('sessionStatus',config)).state,'authenticated','discarded iframe is irrelevant to top-level evidence');
    let status=await run('sessionOpen',{...config,documentUrl:url.replace('/sheet','/denied')});
    assert.equal(status.state,'access-denied');assert.equal(status.authentication,'authenticated');
    status=await run('sessionOpen',{...config,documentUrl:url.replace('/sheet','/readonly')});
    assert.equal(status.editPermission,'read-only');
    await run('sessionClose');
    assert.equal((await run('sessionVerify',config)).state,'authenticated','closed browser reuses the same persistent profile');
    await browser.context.close();
    assert.equal((await run('sessionStatus',config)).state,'closed','user closing Edge clears live status');
    const child=await promisify(execFile)(process.execPath,[__filename,'--child',profile,url],{timeout:30000,windowsHide:true});
    assert.equal(JSON.parse(child.stdout).state,'authenticated','new process reuses persisted login');
    assert.equal((await run('sessionVerify',config)).state,'authenticated');
    await browser.page.goto(url.replace('/sheet','/logout'));
    assert.equal((await run('sessionStatus',config)).state,'login-required','expired cookie must not retain a success flag');
    await run('sessionClose');
    console.log('PASS Edge lifecycle: real HTTP cookie, close/reopen, user close, independent process, access denied, read-only, logout, no business input');
    const starting=run('sessionOpen',config);
    const closing=run('sessionClose');
    assert.equal((await starting).state,'closed','closing a real launch cannot publish a late context');
    await closing;
    assert.equal(browser.context,null);
    const navigating=run('sessionOpen',{...config,documentUrl:url.replace('/sheet','/pending-navigation')});
    await Promise.race([navigationStarted,navigating.then(status=>{throw Error('Navigation ended before the server observed it: '+JSON.stringify(status));})]);
    await run('sessionClose');
    assert.equal((await navigating).state,'closed','closing real navigation is cancellation, not document failure');
    assert.equal(browser.context,null);
    assert.equal(browser.page,null);
    console.log('PASS real Edge cancellation: close during launch and pending navigation, no late context');
  } finally {
    await browser.close();await new Promise(resolve=>server.close(resolve));
    assert.ok(path.resolve(folder).startsWith(path.resolve(os.tmpdir())+path.sep));
    assert.ok(path.basename(folder).startsWith('metis-session-'));
    await fs.rm(folder,{recursive:true,force:true}); // Only this test-created OS temp directory.
  }
}
async function childCheck() {
  const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
  const browser=new TencentDocsBrowser(process.argv[3],{headless:true,args:['--no-proxy-server']});
  try {process.stdout.write(JSON.stringify(await new TencentSession(browser).run('sessionVerify',{documentUrl:process.argv[4],timeout:10})));}
  finally {await browser.close();}
}
(async()=>{if(process.argv.includes('--child'))await childCheck();else {await unitChecks();await verifyFreshnessChecks();await browserOptionChecks();await browserRaceChecks();if(process.argv.includes('--browser'))await browserChecks();}})()
  .catch(error=>{console.error(error);process.exitCode=1;});
