'use strict';
const {performance}=require('node:perf_hooks');

function qrTiming(stage,started=performance.now()) {
  const file=process.env.PRODUCTIONASSISTANT_TENCENT_QR_TIMINGS;
  if(!file)return;
  try {require('node:fs').appendFileSync(file,JSON.stringify({stage,ms:Math.round(performance.now()-started),at:Date.now()})+'\n');}
  catch { /* Optional diagnostics cannot interrupt login. */ }
}

function isNavigationChange(error) {
  return /Execution context was destroyed|[Ff]rame (?:was|has been) detached|detached from the DOM/.test(error.message);
}

async function openEnterpriseLogin(page,timeout) {
  const started=performance.now();
  const modal=page.locator('.login-modal:visible');
  const entry=page.locator('#header-login-btn:visible');
  // The visible ID avoids the similarly worded skeleton while the spreadsheet loads.
  await modal.or(entry).first().waitFor({state:'visible',timeout});
  qrTiming('login-entry-ready',started);
  const remaining=()=>Math.max(1,timeout-(performance.now()-started));
  if(await modal.count()!==1) {
    await entry.click({timeout:remaining()});
    await modal.waitFor({state:'visible',timeout:remaining()});
  }
  qrTiming('login-dialog',started);
  return modal;
}

async function selectEnterpriseLogin(page,agree=false) {
  const modal=page.locator('.login-modal:visible');
  const entry=modal.getByText('企业微信',{exact:true});
  await entry.waitFor({state:'visible',timeout:2000});
  const checkbox=modal.locator('input[type="checkbox"]');
  const count=await checkbox.count();
  if(await modal.count()!==1||count>1)
    throw Object.assign(Error('登录协议页面已变化，请重试。'),{code:'AgreementPageChanged'});
  if(count===1&&!await checkbox.isChecked()) {
    if(!agree)return false;
    await checkbox.check({timeout:1000});
  }
  const started=performance.now();
  await entry.click({timeout:2000});
  return started;
}

function loginPages(browser,job) {
  return browser.context.pages().filter(page=>page===browser.page||!job.pagesBefore.has(page));
}

function returnedHome(browser,job) {
  return loginPages(browser,job).some(page=>{
    let url;try{url=new URL(page.url());}catch{return false;}
    return url.protocol==='https:'&&['docs.qq.com','doc.weixin.qq.com'].includes(url.hostname)&&url.pathname.startsWith('/home/');
  });
}

async function readEnterpriseLogin(browser,job,{findQr=false}={}) {
  for(const page of loginPages(browser,job))for(const frame of page.frames()) {
    let url;try{url=new URL(frame.url());}catch{continue;}
    if(url.protocol!=='https:'||!['open.work.weixin.qq.com','login.work.weixin.qq.com'].includes(url.hostname))continue;
    if(frame.parentFrame()) {
      const element=await frame.frameElement();
      try {if(!await element.isVisible())continue;}finally {await element.dispose();}
    }
    const text=await frame.locator('body').innerText({timeout:800});
    if(/已拒绝|拒绝登录|已取消登录|取消了登录/.test(text))return {state:'rejected'};
    if(/二维码.*(?:失效|过期)|(?:已过期|已失效)|登录超时/.test(text))return {state:'expired'};
    if(/扫码成功|扫描成功|已扫码|已扫描/.test(text))return {state:'scanned'};
    if(!findQr)continue;
    const images=frame.locator('img[class*="qr" i],img[src*="qr" i],canvas').filter({visible:true}),candidates=[];
    for(const candidate of await images.all()) {
      const size=await candidate.boundingBox();
      if(size&&size.width>=100&&size.width<=420&&Math.abs(size.width-size.height)<12&&
        await candidate.evaluate(el=>el.tagName!=='IMG'||(el.complete&&el.naturalWidth>0)))candidates.push(candidate);
    }
    if(candidates.length===1)return {state:'waiting',image:candidates[0]};
  }
  return {};
}

async function captureEnterpriseQr(image,lifetimeMs) {
  const started=performance.now();
  const bytes=await image.screenshot({type:'png',timeout:2000});
  qrTiming('qr-screenshot',started);
  if(bytes.length===0||bytes.length>100000)throw Error('QR image size invalid');
  return {qrImage:'data:image/png;base64,'+bytes.toString('base64'),loginWaitUntil:new Date(Date.now()+lifetimeMs).toISOString()};
}

module.exports={openEnterpriseLogin,selectEnterpriseLogin,returnedHome,readEnterpriseLogin,captureEnterpriseQr,isNavigationChange,qrTiming};
