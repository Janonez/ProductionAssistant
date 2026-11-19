'use strict';
const assert=require('node:assert/strict');
const {TencentSession}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/session.cjs');
const {captureEnterpriseQr,openEnterpriseLogin,readEnterpriseLogin,selectEnterpriseLogin}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/login.cjs');

async function loginChecks() {
  const target='https://docs.qq.com/sheet/fixture',config={documentUrl:target,configRevision:1};
  let currentUrl=target,modalVisible=false,checked=false,text='请在企业微信确认',authentication='required',requiresAgreement=true;
  let screenshots=0,opens=0,checks=0,closedPopups=0,permissionChecks=0,duplicates=false,oversized=false;
  const pageVisits=[],popups=[];
  const qr={boundingBox:async()=>({width:202,height:202}),evaluate:async()=>true,screenshot:async(options)=>{
    assert.equal(options.type,'png');screenshots++;return Buffer.alloc(oversized?100001:20);
  }};
  const frame={url:()=> 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?synthetic',parentFrame:()=>true,
    frameElement:async()=>({isVisible:async()=>true,dispose:async()=>{}}),
    locator:selector=>selector==='body'?{innerText:async()=>text}:{filter:()=>({all:async()=>duplicates?[qr,qr]:[qr]})}};
  const checkbox={count:async()=>requiresAgreement?1:0,isChecked:async()=>checked,check:async()=>{checks++;checked=true;}};
  const modal={count:async()=>modalVisible?1:0,locator:()=>checkbox,or:()=>({first:()=>({waitFor:async()=>{}})}),waitFor:async()=>assert.ok(modalVisible),
    getByText:(label,options)=>{
      assert.equal(label,'企业微信');assert.equal(options.exact,true);
      return {waitFor:async()=>{},click:async()=>{
        assert.equal(checked||!requiresAgreement,true,'enterprise provider cannot be selected before agreement');
        const popup={closed:false,url:frame.url,frames:()=>[frame],close:async()=>{popup.closed=true;closedPopups++;}};popups.push(popup);
      }};
    }};
  const page={closed:false,isClosed:()=>page.closed,url:()=>currentUrl,frames:()=>[],locator:selector=>{
    if(selector==='.login-modal:visible')return modal;
    assert.equal(selector,'#header-login-btn:visible');
    return {click:async()=>{modalVisible=true;}};
  },close:async()=>{page.closed=true;modalVisible=checked=false;}};
  const account=()=>({authentication,authenticationSource:'server',authenticationObservedAt:'2026-11-19T03:00:00Z'});
  const metadata={accountId:'account-fixture',loginExpiresAt:null};
  const browser={context:{pages:()=>[page,...popups].filter(entry=>!entry.closed)},headless:true,generation:2,page,documentUrl:target,
    authentication:{snapshot:account,verify:async()=>account(),connectionMetadata:async()=>metadata},
    ensureContext:async()=>{},
    backgroundPage:async(_config,options)=>{pageVisits.push(options);currentUrl=target;page.closed=false;
      if(options?.reload)modalVisible=checked=false;
      return page;
    },checkGeneration:()=>{},open:async()=>{opens++;}};
  const session=new TencentSession(browser);
  const begin=()=>session.run('sessionLoginBegin',config);
  const status=operation=>session.run('sessionLoginStatus',operation);
  const consentFor=async start=>{
    assert.equal(start.loginState,'getting-qr');
    const operation={...config,loginOperationId:start.loginOperationId};
    const agreement=await status(operation);
    assert.equal(agreement.loginState,'consent');assert.equal(agreement.qrImage,undefined);
    return operation;
  };
  try {
    let openContext;
    browser.ensureContext=()=>new Promise(resolve=>{openContext=resolve;});
    const opening=begin();
    const concurrent=await begin();
    assert.equal(concurrent.loginState,'starting-browser');
    openContext();
    const start=await opening;
    assert.equal(concurrent.loginOperationId,start.loginOperationId);
    browser.ensureContext=async()=>{};
    assert.equal((await begin()).loginOperationId,start.loginOperationId);
    assert.equal((await session.run('sessionLoginBegin',{...config,documentUrl:target+'-other'})).code,'LoginBusy');
    const operation=await consentFor(start);
    assert.equal(checks,0);assert.equal((await status(operation)).loginState,'consent');assert.equal(checks,0);
    const first=await session.run('sessionLoginConsent',operation);
    assert.equal(first.loginState,'waiting');assert.ok(first.qrImage.startsWith('data:image/png;base64,'));
    assert.ok(Date.parse(first.loginWaitUntil)>Date.now());assert.equal(checks,1);assert.equal(screenshots,1);
    assert.equal((await status(operation)).qrImage,undefined,'polls omit the base64');
    const reused=await session.getLoginQr(operation);
    assert.equal(reused.qrImage,first.qrImage);assert.equal(reused.loginWaitUntil,first.loginWaitUntil);
    assert.equal((await begin()).qrImage,first.qrImage);
    assert.equal(screenshots,1,'other callers receive the same image without a second capture');

    text='扫码成功，请在企业微信确认';
    assert.equal((await status(operation)).loginState,'scanned');
    text='请在企业微信确认';
    assert.equal((await status(operation)).loginState,'scanned','provider loading or QR reset cannot regress the phase');
    assert.equal((await session.run('sessionLoginRefresh',operation)).loginState,'scanned');
    assert.equal((await session.run('sessionLoginConsent',operation)).loginState,'scanned');
    assert.equal((await begin()).loginOperationId,start.loginOperationId);
    assert.equal(screenshots,1);assert.equal(checks,1);

    currentUrl='https://docs.qq.com/home/';
    const confirming=await status(operation);
    assert.equal(confirming.loginState,'confirming');assert.equal(confirming.qrImage,undefined);
    assert.equal(pageVisits.length,1,'home returns a visible phase before navigation or permission checks');
    authentication='authenticated';
    session.verify=async()=>{permissionChecks++;return {...account(),state:'authenticated',documentAccess:'allowed',editPermission:'read-only'};};
    const success=await status(operation);
    assert.equal(success.loginState,'authenticated');assert.equal(success.authenticationSource,'server');
    assert.equal(success.editPermission,'unknown');assert.equal(permissionChecks,0);assert.equal(session.login,null);
    assert.deepEqual(await session.connectionObservation(success,'sessionLoginStatus'),{authenticated:true,...metadata});
    const permission=await session.run('sessionVerify',config);
    assert.deepEqual(await session.connectionObservation(permission,'sessionVerify'),{authenticated:true,...metadata,invalidation:'ReadOnly'});
    assert.equal(permissionChecks,1);
    assert.equal(browser.context.pages().length,0,'success releases its preheated page and popup before the permission check');

    authentication='required';
    modalVisible=checked=false;
    const expiring=await consentFor(await begin());
    text='请在企业微信确认';
    await session.run('sessionLoginConsent',expiring);
    text='二维码已过期';assert.equal((await status(expiring)).loginState,'expired');
    assert.equal((await session.run('sessionLoginRefresh',{...expiring,configRevision:2})).code,'LoginSuperseded');
    text='请在企业微信确认';
    const retry=await session.run('sessionLoginRefresh',expiring);
    assert.notEqual(retry.loginOperationId,expiring.loginOperationId);
    const rejected={...config,loginOperationId:retry.loginOperationId};
    assert.equal((await status(rejected)).loginState,'getting-qr','refresh reuses consent from the same dialog');
    assert.deepEqual(pageVisits.at(-1),{waitUntil:'commit',reload:true});
    const second=await status(rejected);
    assert.equal(second.loginState,'waiting');assert.equal(checks,3);assert.equal(closedPopups,2);
    await session.run('sessionLoginCancel',expiring);assert.ok(session.login,'late cancel cannot kill a new session');
    text='手机端已拒绝登录'; assert.equal((await status(rejected)).loginState,'rejected');
    const cancelled=await session.run('sessionLoginCancel',rejected);
    assert.equal(cancelled.loginState,'cancelled');assert.equal(browser.context.pages().length,0);assert.equal(opens,0);

    modalVisible=checked=false;
    const expiredConsent=await consentFor(await begin());
    session.login.until=Date.now()-1;
    const timeout=await session.confirmLoginAgreement(expiredConsent);
    assert.equal(timeout.loginState,'timeout');assert.match(timeout.message,/等待同意协议超时/);assert.equal(checks,3);
    await session.run('sessionLoginCancel',expiredConsent);
    assert.equal(browser.context.pages().length,0,'cancel on the agreement placeholder closes the preheated page');
    requiresAgreement=false;text='使用企业微信扫码';
    const direct=await begin(),directConfig={...config,loginOperationId:direct.loginOperationId};
    assert.equal((await status(directConfig)).loginState,'getting-qr');
    assert.equal((await status(directConfig)).loginState,'waiting','provider requiring no check goes straight to QR');
    assert.equal(checks,3);
    await session.run('sessionLoginCancel',directConfig);
    browser.headless=false;assert.equal((await begin()).code,'ManualSessionBusy');

    const ordinary={...frame,url:()=> 'https://open.weixin.qq.com/connect/qrconnect',locator:()=>{throw Error('ordinary WeChat must not be read');}};
    {
      const owned={frames:()=>[ordinary,frame]};
      browser.context.pages=()=>[owned];
      text='使用企业微信扫码';duplicates=true;
      assert.equal((await readEnterpriseLogin(browser,{pagesBefore:new Set()},{findQr:true})).state,undefined);
    }
    oversized=true;await assert.rejects(captureEnterpriseQr(qr,1000),/size invalid/);
  } finally {session.releaseLogin();}
  await loginPageSelectorChecks();
  console.log('PASS enterprise QR: active session reuse, explicit consent, same-dialog agreement refresh, page cleanup, shared image/expiry, scanned/home/authenticated and independent permissions, retry and timeout');
}
async function loginPageSelectorChecks() {
  const {chromium}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/node_modules/playwright');
  const fs=require('node:fs/promises'),path=require('node:path');
  const html=await fs.readFile(path.join(__dirname,'fixtures','enterprise-login.html'),'utf8');
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const page=await browser.newPage();
    await page.setContent(html);
    const modal=await openEnterpriseLogin(page,2000);
    assert.equal(await modal.getByText('服务协议',{exact:true}).count(),1);
    assert.equal(await modal.getByText('隐私政策',{exact:true}).count(),1);
    const consent=modal.locator('input[type="checkbox"]');
    assert.equal(await selectEnterpriseLogin(page),false);
    assert.equal(await consent.isChecked(),false);
    assert.equal(await page.locator('body').getAttribute('data-provider'),null);
    assert.equal(await page.locator('body').getAttribute('data-decoy'),null);
    await selectEnterpriseLogin(page,true);
    assert.equal(await consent.isChecked(),true);
    assert.equal(await page.locator('body').getAttribute('data-consent'),'explicit');
    assert.equal(await page.locator('body').getAttribute('data-provider'),'enterprise');
    const confirmed=await browser.newPage();
    await confirmed.setContent(html);
    const pending=await openEnterpriseLogin(confirmed,2000);
    await pending.locator('input[type="checkbox"]').evaluate(input=>{input.checked=true;});
    assert.equal(typeof await selectEnterpriseLogin(confirmed),'number');
    assert.equal(await confirmed.locator('body').getAttribute('data-consent'),null);
    assert.equal(await confirmed.locator('body').getAttribute('data-provider'),'enterprise');
  } finally {await browser.close();}
}
if(require.main===module)loginChecks().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={loginChecks};
