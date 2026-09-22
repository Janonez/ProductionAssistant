'use strict';

// The QR belongs to the dedicated browser. Never return cookies, callback URLs or page HTML.
class TencentLogin {
  constructor(browser) { this.browser=browser; this.session=null; }
  async guard() {
    if(this.session && this.session.expires<Date.now()) {this.session=null;await this.browser.close();}
    if(this.session)throw Error('请先完成或关闭扫码登录，再进行文档操作。');
  }
  require(request,config) {
    const s=this.session;
    if(!s || s.token!==request.sessionToken || s.jobId!==request.jobId || (config && s.url!==config.documentUrl))
      throw Error('扫码会话已失效，请关闭弹窗后重新登录。');
    return s;
  }
  async run(request,config) {
    if(!['start','poll','refresh','consent','cancel'].includes(request.stage))throw Error('不支持的登录操作。');
    if(request.stage==='cancel' && !this.session)return {state:'closed'};
    if(request.stage==='refresh' && !this.session)return this.run({...request,stage:'start'},config);
    if(request.stage==='start') {
      await this.guard();
      if(typeof request.sessionToken!=='string' || !/^[a-zA-Z0-9-]{16,100}$/.test(request.sessionToken))throw Error('扫码会话标识无效。');
      this.session={token:request.sessionToken,jobId:request.jobId,url:config.documentUrl,expires:Date.now()+600000};
      try {await this.browser.open(config,true);}catch(error){this.session=null;await this.browser.close();throw error;}
    }
    const s=this.require(request,config);
    if(request.stage==='cancel') {
      this.session=null;
      if(!s.success)await this.browser.close();
      return {state:'closed'};
    }
    if(s.expires<Date.now()){
      this.session=null;await this.browser.close();
      if(request.stage==='refresh')return this.run({...request,stage:'start'},config);
      throw Error('扫码会话已超时，请重新登录。');
    }
    if(request.stage==='refresh') {
      if(this.browser.context)for(const pg of this.browser.context.pages())if(pg!==this.browser.page)await pg.close();
      await this.browser.open(config,true);s.enterprise=false;s.opened=false;s.success=false;s.returnedToDocument=false;
    }
    const page=this.browser.page;
    if(!page || page.isClosed())throw Error('登录页面已关闭，请重新登录。');
    const current=new URL(page.url());
    if(s.enterprise && !s.returnedToDocument && ['docs.qq.com','doc.weixin.qq.com'].includes(current.hostname) && current.pathname.startsWith('/home/')) {
      s.returnedToDocument=true;
      s.opened=false;s.enterprise=false;
      await this.browser.open(config,true);
      return {state:'loading'};
    }
    if(request.stage==='consent') {
      const checkbox=page.locator('.login-modal input[type="checkbox"]');
      if(await checkbox.count()!==1)throw Error('登录协议页面已变化，请刷新后重试。');
      await checkbox.check({timeout:3000});
      s.consented=true;
    }
    try {return await this.readState(config,s);}catch(error) {
      // A normal login callback replaces frames and execution contexts while we are reading them.
      if(this.browser.page && !this.browser.page.isClosed() && /Execution context was destroyed|[Ff]rame was detached|detached from the DOM/.test(error.message))return {state:'loading'};
      throw error;
    }
  }
  async readState(config,s) {
    const page=this.browser.page;
    if(await this.authenticated(config)) {s.success=true;return {state:'success'};}
    const modal=page.locator('.login-modal:visible');
    if(await modal.count()) {
      const checkbox=modal.locator('input[type="checkbox"]');
      if(await checkbox.count()===1 && !await checkbox.isChecked()) {
        if(!s.consented)return {state:'consent'};
        await checkbox.check({timeout:3000});
      }
      if(!s.enterprise) {
        const entry=modal.getByText('企业微信',{exact:true});
        if(await entry.count()===1 && await entry.isVisible()) {
          await entry.click({timeout:3000});s.enterprise=true;
          return {state:'loading'};
        }
      }
    } else if(!s.opened) {
      // The skeleton also says "登录腾讯文档", but it has no login handler.
      const entry=page.locator('#header-login-btn');
      if(await entry.isVisible()) {await entry.click({timeout:3000});s.opened=true;return {state:'loading'};}
    }
    for(const pg of this.browser.context.pages())for(const frame of pg.frames()) {
      const url=new URL(frame.url());
      if(url.protocol!=='https:' || !['open.work.weixin.qq.com','login.work.weixin.qq.com'].includes(url.hostname))continue;
      if(frame.parentFrame() && !await (await frame.frameElement()).isVisible())continue;
      const text=await frame.locator('body').innerText({timeout:1500});
      if(/二维码.*(?:失效|过期)|(?:已过期|已失效)|登录超时/.test(text))return {state:'expired'};
      if(/扫码成功|扫描成功|请在.*(?:确认|允许)|已扫码/.test(text))return {state:'scanned'};
      if(/拒绝|取消登录/.test(text))return {state:'failed',message:'手机端已取消登录，请刷新二维码重试。'};
      const images=frame.locator('img[class*="qr" i],img[src*="qr" i],canvas').filter({visible:true});
      const candidates=[];
      for(const candidate of await images.all()) {
        const size=await candidate.boundingBox();
        if(size && size.width>=100 && size.width<=420 && Math.abs(size.width-size.height)<12 &&
          await candidate.evaluate(el=>el.tagName!=='IMG' || (el.complete && el.naturalWidth>0)))candidates.push(candidate);
      }
      if(candidates.length===1)return {state:'waiting',qr:'data:image/png;base64,'+(await candidates[0].screenshot({timeout:2000})).toString('base64')};
    }
    return {state:'loading'};
  }
  async authenticated(config) {
    const page=this.browser.page;
    const expected=new URL(config.documentUrl),actual=new URL(page.url());
    if(expected.origin!==actual.origin || expected.pathname!==actual.pathname)return false;
    if(await page.locator('#header-login-btn').isVisible() || await page.locator('.login-modal:visible').count())return false;
    // Positive account evidence is required: anonymous documents also render a complete sheet.
    return await page.locator('.user-info-wrap:has(#self-info):visible,.user-info-ent-wrap:has(#self-info):visible').count()===1 &&
      await page.locator('.tab-bar-item:visible').count()>0;
  }
}
module.exports={TencentLogin};
