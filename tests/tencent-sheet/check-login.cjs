'use strict';
const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {TencentDocsBrowser}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/browser.cjs');
const {TencentLogin}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/login.cjs');
const qr='<canvas class="qrcode" width="200" height="200"></canvas><script>document.querySelector("canvas").getContext("2d").fillRect(25,25,150,150)</script>';
async function main(){
  const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><meta charset="utf-8"><div id="self-info"><button id="header-login-btn">登录腾讯文档</button></div><a class="tab-bar-item">月份</a><input id="business"><script>
  window.businessInputs=0;document.querySelector('#business').oninput=()=>window.businessInputs++;
  document.querySelector('#header-login-btn').onclick=()=>{const modal=document.createElement('div');modal.className='login-modal';modal.innerHTML='<label><input type="checkbox">我已阅读协议</label><button>企业微信</button>';document.body.append(modal);modal.querySelector('button').onclick=()=>{if(!modal.querySelector('input').checked)return;modal.insertAdjacentHTML('beforeend','<iframe src="https://open.work.weixin.qq.com/wwopen/sso/qrConnect" width="350" height="300"></iframe>');};};
  </script>`);});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const profile=await fs.mkdtemp(path.resolve(__dirname,'../../artifacts/tencent-login-test-'));
  const browser=new TencentDocsBrowser(profile,{args:['--no-proxy-server']}),login=new TencentLogin(browser);
  const config={documentUrl:`http://127.0.0.1:${server.address().port}/sheet`,timeout:15};
  const request={jobId:'one',sessionToken:'12345678-1234-1234-1234-123456789abc'};
  const run=stage=>login.run({...request,stage},config);
  try {
    assert.equal((await run('start')).state,'loading');
    assert.equal(await login.authenticated(config),false,'anonymous sheet cannot prove login');
    assert.equal((await run('poll')).state,'consent');
    assert.equal(await browser.page.locator('input[type=checkbox]').isChecked(),false,'do not accept terms during polling');
    await assert.rejects(login.guard(),/关闭扫码/);
    await assert.rejects(login.run({...request,jobId:'other',stage:'cancel'},config),/失效/);
    await assert.rejects(login.run({...request,stage:'poll'},{...config,documentUrl:config.documentUrl+'2'}),/失效/);
    await browser.context.route('https://open.work.weixin.qq.com/**',route=>route.fulfill({contentType:'text/html; charset=utf-8',body:qr}));
    assert.equal((await run('consent')).state,'loading');
    await browser.page.frameLocator('iframe').locator('canvas').waitFor();
    const waiting=await run('poll');assert.equal(waiting.state,'waiting');assert.match(waiting.qr,/^data:image\/png;base64,/);
    assert.deepEqual(Object.keys(waiting).sort(),['qr','state'],'no credentials, callback URLs or HTML');
    const frame=browser.page.frames()[1];
    await frame.locator('body').evaluate(el=>el.innerHTML='<p>扫码成功，请在手机上确认</p>');
    assert.deepEqual(await run('poll'),{state:'scanned'});
    await frame.locator('body').evaluate(el=>el.innerHTML='<p>二维码已过期</p>');
    assert.deepEqual(await run('poll'),{state:'expired'});
    assert.equal(await browser.page.locator('#business').inputValue(),'');
    assert.equal(await browser.page.evaluate(()=>window.businessInputs),0);
    await run('refresh');assert.equal(frame.isDetached(),true,'refresh destroys old QR frame');
    await run('poll');
    assert.equal(await browser.page.locator('input[type=checkbox]').isChecked(),true,'explicit consent is retained for refreshes within this session');
    await browser.context.route('https://doc.weixin.qq.com/home/recent',route=>route.fulfill({contentType:'text/html',body:'<p>Account home</p>'}));
    await browser.page.goto('https://doc.weixin.qq.com/home/recent');
    assert.deepEqual(await run('poll'),{state:'loading'});
    assert.equal(browser.page.url(),config.documentUrl,'provider landing page returns to the original target document');
    await run('poll');
    await browser.page.locator('.login-modal').evaluate(el=>el.remove());
    await browser.page.locator('#self-info').evaluate(el=>el.outerHTML='<div class="user-info-wrap"><div class="user-info-fake"><div class="user-info-container" id="self-info">账号</div></div></div>');
    assert.deepEqual(await run('poll'),{state:'success'});
    await run('cancel');await login.guard();assert.ok(browser.context,'completion retains browser for recognition');
    await run('start');await run('cancel');assert.equal(browser.context,null,'cancelled scan closes background browser');
    await run('cancel'); // idempotent cleanup after failed start/expired session
    await run('start');login.session.expires=0;await login.guard();assert.equal(browser.context,null);
    assert.equal(login.session,null);
    await run('refresh');assert.ok(login.session,'retry restarts an expired or failed session');
    await browser.close();await run('refresh');assert.ok(browser.context,'retry recovers a closed browser');
    await login.run({...request,stage:'cancel'}); // cleanup needs only ownership, not a still-existing task/config
    console.log('PASS login: consent, QR, phone confirmation, expiry, anonymous guard, owner/URL isolation, refresh, cancellation, no business writes');
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
