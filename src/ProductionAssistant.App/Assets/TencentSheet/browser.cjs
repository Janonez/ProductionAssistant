'use strict';
const {chromium}=require('playwright');

// One owner for the dedicated profile; clients borrow its page and never reopen it on errors.
class TencentDocsBrowser {
  constructor(profile,{headless=false,viewport,args=[]}={}) {this.profile=profile;this.options={headless,viewport,args};this.context=null;this.page=null;this.documentUrl=null;this.generation=0;}
  checkGeneration(value) {
    if(value!==this.generation)throw Object.assign(Error('浏览器会话已结束。'),{code:'SessionClosed'});
  }
  async open(config,headless=this.options.headless??false) {
    const {viewport={width:1440,height:1000},args}=this.options;
    // Only the existing local-test proxy switch is accepted; profile/channel stay owned here.
    if(typeof headless!=='boolean'||!Array.isArray(args)||args.some(arg=>arg!=='--no-proxy-server'))
      throw Error('不支持的浏览器运行模式或启动参数。');
    const generation=++this.generation;
    if(this.closing)await this.closing;
    this.checkGeneration(generation);
    if(this.context&&this.headless!==headless)await this.context.close();
    this.checkGeneration(generation);
    if(!this.context) {
      this.headless=headless;
      let context;
      try {
        this.launching=chromium.launchPersistentContext(this.profile,{channel:'msedge',headless,viewport:headless?viewport:null,args});
        context=await this.launching;
      }
      catch(error){
        const busy=/ProcessSingleton|SingletonLock|exitCode=21|profile.*(?:in use|used)|user data directory.*in use/i.test(error.message);
        const failure=Error(busy?'专用浏览器配置正被其他进程使用，请先结束该会话。':'无法打开专用 Edge 浏览器，请确认 Edge 已安装并重试。',{cause:error});
        failure.code=busy?'ProfileBusy':'BrowserUnavailable';throw failure;
      }
      finally {this.launching=null;}
      if(generation!==this.generation){await context.close();this.checkGeneration(generation);}
      this.context=context;
      context.on('close',()=>{if(this.context===context){this.context=null;this.page=null;this.documentUrl=null;}});
    }
    const context=this.context;
    const page=this.page&&!this.page.isClosed()?this.page:context.pages()[0]||await context.newPage();
    this.checkGeneration(generation);
    this.page=page;
    page.setDefaultTimeout(config.timeout*1000);
    try {
      await page.goto(config.documentUrl,{waitUntil:'domcontentloaded'});
      if(!headless)await page.bringToFront();
    } catch(error) {
      this.checkGeneration(generation);
      if(page.isClosed()||this.context!==context)throw Object.assign(Error('浏览器会话已结束。'),{code:'SessionClosed'});
      throw error;
    }
    this.checkGeneration(generation);
    if(page.isClosed()||this.context!==context)throw Object.assign(Error('浏览器会话已结束。'),{code:'SessionClosed'});
    this.documentUrl=config.documentUrl;
    return {message:'已打开专用浏览器。完成登录后，请验证登录与文档访问状态。'};
  }
  requirePage(config) {
    if(!this.page||this.page.isClosed())throw Error('请先打开文档并扫码登录。');
    if(this.documentUrl!==config.documentUrl)throw Error('文档链接已变更，请重新打开文档。');
    const expected=new URL(config.documentUrl),actual=new URL(this.page.url());
    if(actual.origin!==expected.origin||actual.pathname!==expected.pathname)throw Error('当前不在目标文档，请完成登录后重新打开文档。');
    this.page.setDefaultTimeout(config.timeout*1000);
  }
  async close(){
    ++this.generation;
    if(this.closing)return this.closing;
    const context=this.context,launching=this.launching;
    this.closing=(async()=>{
      if(context)await context.close();
      const started=await launching?.catch(()=>null);
      if(started&&started!==context)await started.close();
    })();
    try {await this.closing;} finally {this.closing=null;}
  }
}
module.exports={TencentDocsBrowser};
