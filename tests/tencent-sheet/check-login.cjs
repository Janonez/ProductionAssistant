'use strict';
const assert=require('node:assert/strict');
const {TencentSession}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/session.cjs');
async function loginChecks() {
  const {readEnterpriseLogin}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/login.cjs');
  const target='https://docs.qq.com/sheet/fixture',config={documentUrl:target,configRevision:1};
  let currentUrl=target,modalVisible=false,checked=false,text='请在企业微信确认',authentication='required';
  let screenshots=0,reloads=0,opens=0,checks=0,closedPopups=0,navigation=0,duplicates=false,oversized=false;
  const popups=[];
  const qr={boundingBox:async()=>({width:202,height:202}),evaluate:async()=>true,screenshot:async()=>{screenshots++;return Buffer.alloc(oversized?100001:20);}};
  const frame={url:()=> 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?synthetic',parentFrame:()=>true,
    frameElement:async()=>({isVisible:async()=>true,dispose:async()=>{}}),
    locator:selector=>selector==='body'?{innerText:async()=>text}:{filter:()=>({all:async()=>duplicates?[qr,qr]:[qr]})}};
  const checkbox={count:async()=>1,isChecked:async()=>checked,check:async()=>{checks++;checked=true;}};
  const modal={count:async()=>modalVisible?1:0,locator:()=>checkbox,getByText:(label,options)=>{
    assert.equal(label,'企业微信');assert.equal(options.exact,true);
    return {count:async()=>1,isVisible:async()=>true,click:async()=>{
      assert.equal(checked,true,'enterprise provider cannot be selected before agreement');
      modalVisible=false;const popup={closed:false,frames:()=>[frame],close:async()=>{popup.closed=true;closedPopups++;}};popups.push(popup);
    }};
  }};
  const page={isClosed:()=>false,url:()=>currentUrl,frames:()=>[],locator:selector=>{
    if(selector==='.login-modal:visible')return modal;
    assert.equal(selector,'#header-login-btn');
    return {count:async()=>1,isVisible:async()=>true,click:async()=>{modalVisible=true;}};
  },goto:async value=>{assert.equal(value,'about:blank');currentUrl=value;navigation++;},
  reload:async()=>{reloads++;modalVisible=false;checked=false;}};
  const browser={context:{pages:()=>[page,...popups.filter(popup=>!popup.closed)]},headless:true,generation:2,page,documentUrl:target,
    authentication:{snapshot:()=>({authentication}),verify:async()=>({authentication,authenticationSource:authentication==='authenticated'?'server':null})},
    backgroundPage:async()=>{currentUrl=target;return page;},checkGeneration:()=>{},open:async()=>{opens++;}};
  const session=new TencentSession(browser);
  try {
    const consent=await session.run('sessionLoginBegin',config);
    assert.equal(consent.loginState,'consent');assert.equal(consent.qrImage,undefined);assert.equal(checks,0);
    assert.equal((await session.run('sessionLoginBegin',config)).code,'LoginBusy');
    const operation={...config,loginOperationId:consent.loginOperationId};
    assert.equal((await session.run('sessionLoginStatus',operation)).loginState,'consent');assert.equal(checks,0,'polling never agrees');
    const first=await session.run('sessionLoginConsent',operation);
    assert.equal(first.loginState,'waiting');assert.ok(first.qrImage.startsWith('data:image/png;base64,'));assert.equal(checks,1);assert.equal(screenshots,1);
    assert.equal((await session.run('sessionLoginStatus',operation)).loginState,'waiting','static confirmation instructions are not scanned evidence');
    assert.equal(screenshots,1,'polls do not re-export an image');
    text='扫码成功，请在企业微信确认';
    const scanned=await session.run('sessionLoginStatus',operation);
    assert.equal(scanned.loginState,'scanned');assert.equal(scanned.authentication,'required','provider DOM never authenticates');
    text='二维码已过期';assert.equal((await session.run('sessionLoginStatus',operation)).loginState,'expired');
    assert.equal((await session.run('sessionLoginRefresh',{...operation,configRevision:2})).code,'LoginSuperseded');
    text='请在企业微信确认';
    const second=await session.run('sessionLoginRefresh',operation);
    assert.equal(second.loginState,'waiting');assert.notEqual(second.loginOperationId,first.loginOperationId);
    assert.equal(reloads,1);assert.equal(closedPopups,1);assert.equal(checks,2,'explicit agreement is retained only within this refresh chain');
    await session.run('sessionLoginCancel',operation);assert.ok(session.login,'late cancellation cannot kill the new QR task');
    const next={...config,loginOperationId:second.loginOperationId};
    duplicates=true;assert.equal((await readEnterpriseLogin(browser,config,session.login,{image:true})).loginState,'loading');duplicates=false;
    oversized=true;await assert.rejects(readEnterpriseLogin(browser,config,session.login,{image:true}),/too large/);oversized=false;
    const cancelled=await session.run('sessionLoginCancel',next);
    assert.equal(cancelled.state,'unverified');assert.equal(cancelled.browserOpen,true);assert.equal(closedPopups,2);
    assert.equal(session.login,null);assert.equal(navigation,1);assert.equal(opens,0);
    modalVisible=false;checked=false;
    const again=await session.run('sessionLoginBegin',config);
    assert.equal(again.loginState,'consent','a new task must ask for consent again');
    await session.run('sessionLoginConsent',{...config,loginOperationId:again.loginOperationId});
    authentication='authenticated';
    session.verify=async()=>({authentication,authenticationSource:'server',editPermission:'unknown'});
    const success=await session.run('sessionLoginStatus',{...config,loginOperationId:again.loginOperationId});
    assert.equal(success.loginState,'authenticated');assert.equal(success.authenticationSource,'server');assert.equal(session.login,null);
    browser.headless=false;assert.equal((await session.run('sessionLoginBegin',config)).code,'ManualSessionBusy');
    assert.equal((await session.run('sessionLoginStatus',operation)).loginState,'cancelled');
    const ordinary={...frame,url:()=> 'https://open.weixin.qq.com/connect/qrconnect',locator:()=>{throw Error('ordinary WeChat must not be read');}};
    browser.context.pages=()=>[{frames:()=>[ordinary]}];
    assert.equal((await readEnterpriseLogin(browser,config,{opened:true})).loginState,'loading');
  } finally {session.releaseLogin();}
  console.log('PASS enterprise QR: explicit consent, provider scope, scanned/expired states, server authentication, image bounds, refresh/cancel and stale-task protection');
}
if(require.main===module)loginChecks().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={loginChecks};
