'use strict';

// Enterprise WeChat provider logic adapted from aac83de / pre-PR88 login.cjs.
// The existing session still owns the task, Context, deadline and server authentication.
async function readEnterpriseLogin(browser,config,job,{consent=false,image=false}={}) {
  const page=browser.page;
  if(!page||page.isClosed())throw Object.assign(Error('登录页面已关闭。'),{code:'SessionClosed'});
  const current=new URL(page.url());
  if(job.enterprise&&!job.returnedToDocument&&['docs.qq.com','doc.weixin.qq.com'].includes(current.hostname)&&current.pathname.startsWith('/home/')) {
    job.returnedToDocument=true;job.opened=false;job.enterprise=false;
    await browser.backgroundPage(config);
    return {loginState:'loading',message:'正在返回目标文档。'};
  }
  const modal=page.locator('.login-modal:visible');
  if(await modal.count()===1) {
    const checkbox=modal.locator('input[type="checkbox"]');
    if(consent&&!job.consented&&await checkbox.count()!==1)return {loginState:'failed',message:'登录协议页面已变化，请重新开始；未自动同意协议。'};
    if(await checkbox.count()===1&&!await checkbox.isChecked()) {
      if(!job.consented&&!consent)return {loginState:'consent',message:'腾讯文档要求先确认服务协议和隐私政策。'};
      await checkbox.check({timeout:1000});job.consented=true;
    }
    if(!job.enterprise) {
      const entry=modal.getByText('企业微信',{exact:true});
      if(await entry.count()===1&&await entry.isVisible()) {
        await entry.click({timeout:1000});job.enterprise=true;
        return {loginState:'loading',message:'正在加载企业微信二维码。'};
      }
    }
  } else if(!job.opened) {
    // The old implementation deliberately avoided the similarly worded skeleton.
    const entry=page.locator('#header-login-btn');
    if(await entry.count()===1&&await entry.isVisible()) {
      await entry.click({timeout:1000});job.opened=true;
      return {loginState:'loading',message:'正在打开腾讯文档登录入口。'};
    }
  }
  for(const ownedPage of browser.context.pages())for(const frame of ownedPage.frames()) {
    let url;try{url=new URL(frame.url());}catch{continue;}
    if(url.protocol!=='https:'||!['open.work.weixin.qq.com','login.work.weixin.qq.com'].includes(url.hostname))continue;
    if(frame.parentFrame()) {
      const element=await frame.frameElement();
      try {if(!await element.isVisible())continue;}finally {await element.dispose();}
    }
    const text=await frame.locator('body').innerText({timeout:800});
    if(/二维码.*(?:失效|过期)|(?:已过期|已失效)|登录超时/.test(text))return {loginState:'expired',message:'企业微信二维码已失效，请刷新。'};
    if(/扫码成功|扫描成功|已扫码|已扫描/.test(text))return {loginState:'scanned',message:'已扫码，请在企业微信确认；账号认证仍需核验。'};
    if(/已拒绝|已取消登录|取消了登录/.test(text))return {loginState:'failed',message:'手机端已取消登录，请重新开始。'};
    const images=frame.locator('img[class*="qr" i],img[src*="qr" i],canvas').filter({visible:true}),candidates=[];
    for(const candidate of await images.all()) {
      const size=await candidate.boundingBox();
      if(size&&size.width>=100&&size.width<=420&&Math.abs(size.width-size.height)<12&&
        await candidate.evaluate(el=>el.tagName!=='IMG'||(el.complete&&el.naturalWidth>0)))candidates.push(candidate);
    }
    if(candidates.length===1) {
      let qrImage;
      if(image) {
        const bytes=await candidates[0].screenshot({type:'png',timeout:2000});
        if(bytes.length>100000)throw Error('QR image too large');
        qrImage='data:image/png;base64,'+bytes.toString('base64');
      }
      return {loginState:'waiting',...(qrImage?{qrImage}:{}),message:'请使用企业微信扫一扫，并在手机确认。'};
    }
  }
  return {loginState:'loading',message:'正在准备企业微信扫码登录。'};
}
module.exports={readEnterpriseLogin};
