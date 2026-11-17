'use strict';
const assert=require('node:assert/strict');
const {TencentSession,closed,documentUrl}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/session.cjs');

async function unitChecks() {
  for(const value of ['http://docs.qq.com/a','https://docs.qq.com.evil.invalid/a','https://user:password@docs.qq.com/a','https://docs.qq.com:8080/a'])assert.throws(()=>documentUrl(value));
  assert.equal(documentUrl('https://doc.weixin.qq.com/sheet/a'),'https://doc.weixin.qq.com/sheet/a');
  const url='https://docs.qq.com/sheet/fixture';
  let evidence={sheet:true,title:'集团日报 - 腾讯文档'},reads=0,background=0,opens=0,auth={authentication:'authenticated',authenticationSource:'server',authenticationObservedAt:new Date().toISOString()};
  const browser={context:{},headless:true,generation:1,documentUrl:url,
    page:{isClosed:()=>false,url:()=>url,evaluate:async()=>{reads++;return evidence;}},
    authentication:{snapshot:()=>auth,verify:async()=>auth},
    ensureContext:async()=>{},checkGeneration(value){if(value!==this.generation)throw Object.assign(Error('closed'),{code:'SessionClosed'});},
    backgroundPage:async()=>{background++;return browser.page;},open:async()=>{opens++;},
    close:async()=>{browser.context=null;browser.authentication=null;browser.generation++;}};
  browser.permissions={inspect:async()=>{reads++;return {documentAccess:evidence.denied?'denied':evidence.sheet?'allowed':'unknown',documentName:evidence.title?.replace(' - 腾讯文档','')??null,editPermission:evidence.readOnly?'read-only':'unknown'};}};
  const session=new TencentSession(browser),config={documentUrl:url,configRevision:3,timeout:0.01};
  assert.equal((await session.run('sessionStatus',config)).state,'unverified');assert.equal(reads,0);assert.equal(background,0);
  const results=await Promise.all([session.run('sessionVerify',config),session.run('sessionVerify',config)]);
  assert.equal(reads,1,'concurrent verification is merged');
  assert.equal(results[0].documentAccess,'allowed');assert.equal(results[0].documentName,'集团日报');
  assert.equal(results[0].editPermission,'unknown','missing read-only markers never imply editing');
  assert.equal(results[0].documentIdentity,url);assert.equal(opens,0,'Verify never opens a visible page');
  assert.equal((await session.run('sessionStatus',config)).documentAccess,'allowed');assert.equal(reads,1);
  assert.equal((await session.run('sessionStatus',{...config,configRevision:4})).state,'unverified','revision mismatch drops cached document evidence');
  evidence={sheet:true,readOnly:true};assert.equal((await session.run('sessionVerify',config)).editPermission,'read-only');
  evidence={denied:true};assert.equal((await session.run('sessionVerify',config)).state,'access-denied');
  auth={authentication:'required',authenticationPreviouslyConfirmed:false};assert.equal((await session.run('sessionVerify',config)).state,'login-required');assert.equal(opens,0);
  auth={authentication:'unknown',authenticationReason:'network-error'};assert.equal((await session.run('sessionVerify',config)).code,'AuthenticationUnknown');
  auth={authentication:'unknown',authenticationReason:'token-not-observed',authenticationDiagnostics:{cookieEvidence:'empty'}};
  const navigations=background,missing=await session.run('sessionVerify',config);
  assert.equal(missing.state,'login-required');assert.equal(missing.code,'LoginCredentialsMissing');assert.equal(missing.authentication,'unknown','a local login prompt does not invent a server conclusion');
  assert.equal(background,navigations,'empty local credentials need no speculative navigation');
  auth={authentication:'unknown',authenticationReason:'token-not-observed'};
  const bootstrap=[];
  browser.backgroundPage=async input=>{bootstrap.push(input.documentUrl);auth={authentication:'required',authenticationSource:'server'};return browser.page;};
  assert.equal((await session.run('sessionVerify',config)).state,'login-required');
  assert.deepEqual(bootstrap,[url],'cold authentication observes the saved target, not an unrelated landing page');
  assert.equal((await session.run('sessionVerify',{...config,documentUrl:'https://docs.qq.com/doc/one'})).code,'NotSpreadsheet');
  assert.equal((await session.run('sessionVerify',{...config,documentUrl:'https://doc.weixin.qq.com/sheet/one'})).code,'AuthenticationScopeUnsupported');
  assert.equal((await session.run('sessionClear',config)).code,'ClearConfirmationRequired');
  assert.equal((await session.run('sessionClear',{...config,confirmClear:true})).code,'ClearScopeUnverified');assert.ok(browser.context,'unsafe clearing never closes or deletes profile data');
  browser.open=async()=>{throw Object.assign(Error('private diagnostic'),{code:'ProfileBusy'});};
  const busy=await session.run('sessionOpen',config);assert.equal(busy.code,'ProfileBusy');assert.ok(!JSON.stringify(busy).includes('private'));
  assert.deepEqual(await session.run('sessionClose'),closed());assert.equal((await session.run('sessionStatus',config)).state,'closed');
  await assert.rejects(session.run('unknown',config),/不支持/);
  console.log('PASS session: passive Status, merged background Verify, independent authentication/document/permission facts, revision guard, safe unsupported scope and clearing');
}
async function verifyFreshnessChecks() {await require('./check-permissions.cjs').permissionChecks();await require('./check-authentication.cjs').authenticationChecks();await require('./check-login.cjs').loginChecks();await require('./check-clear.cjs').clearChecks();}

async function browserOptionChecks() {
  const {readFileSync}=require('node:fs'),{runInNewContext}=require('node:vm'),{EventEmitter}=require('node:events');
  const launches=[],module={exports:{}};
  runInNewContext(readFileSync(require.resolve('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs'),'utf8'),{
    module,require:name=>name==='./authentication.cjs'?require('../../src/ProductionAssistant.App/Assets/TencentSheet/authentication.cjs'):name==='./permissions.cjs'?require('../../src/ProductionAssistant.App/Assets/TencentSheet/permissions.cjs'):({chromium:{launchPersistentContext:async(profile,options)=>{
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
      module,require:name=>name==='./authentication.cjs'?require('../../src/ProductionAssistant.App/Assets/TencentSheet/authentication.cjs'):name==='./permissions.cjs'?require('../../src/ProductionAssistant.App/Assets/TencentSheet/permissions.cjs'):({chromium:{launchPersistentContext:()=>{launches++;return launch.promise;}}})
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

async function installFixture(browser) {
  const context=await browser.ensureContext(true);
  const authBody=async()=>{
    const loggedIn=(await context.cookies('https://docs.qq.com')).some(cookie=>cookie.name==='fixture-login'&&cookie.value==='yes');
    return loggedIn?{login:true,ret:0,uid:'synthetic-user',domain_id:'synthetic-domain',uid_source:1}:{ret:12100};
  };
  // APIRequestContext bypasses BrowserContext.route; intercept the read-only recheck as well.
  context.request.post=async url=>{assert.equal(url,require('../../src/ProductionAssistant.App/Assets/TencentSheet/authentication.cjs').endpoint);const body=await authBody();return {status:()=>200,json:async()=>body,dispose:async()=>{}};};
  await context.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.origin!=='https://docs.qq.com'){await route.abort();return;}
    if(url.pathname==='/cgi-bin/online_docs/user_info') {
      await route.fulfill({contentType:'application/json',body:JSON.stringify(await authBody())});return;
    }
    if(url.pathname==='/service/rpc') {
      await route.fulfill({contentType:'application/json',body:JSON.stringify({retcode:0,data:{isOwner:false,rangeCheckResList:[{rangeId:'blocked',rangePolicy:1,rangePrivilege:1,rangeOtherPrivilegeType:1}]}})});return;
    }
    const denied=url.pathname.includes('denied'),readOnly=url.pathname.includes('readonly');
    const protectedSheet=url.pathname.endsWith('/protected');
    await route.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><title>合成日报 - 腾讯文档</title>'+
      (denied?'<p role="alert">没有访问权限</p>':'<div class="tab-bar-item">合成工作表</div>')+
      (readOnly?'<p aria-label="只读">只读</p>':'')+
      '<input id="name" value="A1"><textarea id="value"></textarea>'+
      '<script>'+require('./fixtures/permission-page.cjs').permissionPage({readOnly,ranges:protectedSheet?[{id:'blocked',sr:1,er:20,sc:0,ec:4}]:[]})+'</script>'+
      (protectedSheet?'<script>setTimeout(()=>fetch("/service/rpc",{method:"POST",body:"service=get_user_range_privilege"}),150)</script>':'')+
      '<script>fetch("/cgi-bin/online_docs/user_info?get_vip_info=1",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({xsrf:"synthetic-xsrf"})})</script>'});
  });
  await context.addCookies([{name:'fixture-xsrf',value:'synthetic-xsrf',domain:'docs.qq.com',path:'/',secure:true,expires:Math.floor(Date.now()/1000)+3600}]);
}
async function browserChecks() {
  const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
  const {execFile}=require('node:child_process'),{promisify}=require('node:util');
  const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
  const folder=await fs.mkdtemp(path.join(os.tmpdir(),'metis-session-'));
  const profile=path.join(folder,'profile'),browser=new TencentDocsBrowser(profile,{headless:true});
  const config={documentUrl:'https://docs.qq.com/sheet/fixture',timeout:5,webControls:require('./fixture-config.cjs')().webControls};
  const session=new TencentSession(browser);
  try {
    assert.equal((await session.run('sessionStatus',config)).state,'closed');
    await installFixture(browser);
    assert.equal((await session.run('sessionVerify',config)).authentication,'required');
    assert.equal(browser.headless,true);assert.equal(browser.context.pages().length,1);
    await browser.context.addCookies([{name:'fixture-login',value:'yes',domain:'docs.qq.com',path:'/',httpOnly:true,secure:true,expires:Math.floor(Date.now()/1000)+3600}]);
    const refreshed=browser.page.waitForResponse(response=>response.url().includes('/cgi-bin/online_docs/user_info?get_vip_info=1'));
    await browser.page.reload({waitUntil:'domcontentloaded'});await refreshed;await browser.authentication.settle();
    let status=await session.run('sessionVerify',config);
    assert.equal(status.authentication,'authenticated');assert.equal(status.editPermission,'editable');assert.equal(status.documentName,'合成日报');
    assert.equal(await browser.page.locator('#value').inputValue(),'');
    const context=browser.context,page=browser.page;
    for(let n=0;n<3;n++)assert.equal((await session.run('sessionVerify',config)).editPermission,'editable');
    assert.equal(browser.context,context);assert.equal(browser.page,page);assert.equal(context.pages().length,1);
    status=await session.run('sessionVerify',{...config,permissionTargets:[{sheetName:'合成工作表',address:'A25'}]});
    assert.equal(status.permissionCheck.targets[0].eligibility,'eligible','fully initialized zero-range fixture');
    const pageGeneration=browser.pageGeneration;
    await page.reload({waitUntil:'domcontentloaded'});assert.ok(browser.pageGeneration>pageGeneration);
    assert.equal((await session.run('sessionStatus',config)).editPermission,'unknown','reload immediately invalidates cached document evidence');
    status=await session.run('sessionVerify',{...config,documentUrl:'https://docs.qq.com/sheet/protected',permissionTargets:[{sheetName:'合成工作表',address:'A8'},{sheetName:'合成工作表',address:'A25'}]});
    assert.ok(status.permissionCheck,JSON.stringify(status));
    assert.equal(status.permissionCheck.targets[0].eligibility,'denied');assert.equal(status.permissionCheck.targets[1].eligibility,'eligible');
    await browser.page.close();
    status=await session.run('sessionVerify',config);assert.equal(status.editPermission,'editable');assert.equal(browser.context,context);
    status=await session.run('sessionVerify',{...config,documentUrl:'https://docs.qq.com/sheet/readonly'});assert.equal(status.editPermission,'read-only');
    status=await session.run('sessionVerify',{...config,documentUrl:'https://docs.qq.com/sheet/denied'});assert.equal(status.documentAccess,'denied');
    await browser.close();await installFixture(browser);
    assert.equal((await session.run('sessionVerify',config)).authentication,'authenticated','persistent fixture cookie survives close and reopen');
    await browser.close();
    const child=await promisify(execFile)(process.execPath,[__filename,'--child',profile],{timeout:30000,windowsHide:true});
    assert.equal(JSON.parse(child.stdout).authentication,'authenticated','a separate process reuses only this synthetic profile');
    console.log('PASS real headless Edge with fully intercepted synthetic resources: persistent profile, API/DOM separation, permissions, page/context reuse and no business input');
  } finally {
    await browser.close();
    assert.ok(path.resolve(folder).startsWith(path.resolve(os.tmpdir())+path.sep)&&path.basename(folder).startsWith('metis-session-'));
    await fs.rm(folder,{recursive:true,force:true});
  }
}
async function childCheck() {
  const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
  const browser=new TencentDocsBrowser(process.argv[3],{headless:true});
  try {await installFixture(browser);process.stdout.write(JSON.stringify(await new TencentSession(browser).run('sessionVerify',{documentUrl:'https://docs.qq.com/sheet/fixture',timeout:5})));}
  finally {await browser.close();}
}
(async()=>{if(process.argv.includes('--child'))await childCheck();else {await unitChecks();await verifyFreshnessChecks();await browserOptionChecks();await browserRaceChecks();if(process.argv.includes('--browser'))await browserChecks();}})()
  .catch(error=>{console.error(error);process.exitCode=1;});
