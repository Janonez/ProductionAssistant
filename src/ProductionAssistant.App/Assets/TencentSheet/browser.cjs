'use strict';
const {chromium}=require('playwright');
const {TencentAuthentication}=require('./authentication.cjs');
const {TencentPermissions}=require('./permissions.cjs');

// One owner for the dedicated profile; clients borrow its page and never reopen it on errors.
class TencentDocsBrowser {
  constructor(profile,{headless=false,viewport,args=[]}={}) {this.profile=profile;this.options={headless,viewport,args};this.context=null;this.page=null;this.documentUrl=null;this.generation=0;this.pageGeneration=0;this.authentication=null;this.permissions=null;}
  adoptPage(page) {
    if(this.page===page)return;
    this.unwatchPage?.();this.page=page;++this.pageGeneration;this.permissions?.reset();
    const invalidate=()=>{++this.pageGeneration;this.permissions?.reset();};
    const relevant=new WeakSet(),navigating=new WeakSet(),locations=new WeakMap();
    const frameIdentity=frame=>{try{const u=new URL(frame.url());return u.origin+u.pathname;}catch{return null;}};
    const documentFrame=frame=>{try{const u=new URL(frame.url()),target=new URL(this.documentUrl||page.url());return frame===page.mainFrame?.()||(u.origin===target.origin&&u.pathname===target.pathname);}catch{return frame===page.mainFrame?.();}};
    const frameChanged=frame=>{if(documentFrame(frame)||relevant.has(frame)){
      relevant.add(frame);const current=frameIdentity(frame);
      if(navigating.has(frame))navigating.delete(frame);else if(locations.get(frame)!==current)invalidate();
      locations.set(frame,current);
    }};
    const frameDetached=frame=>{if(documentFrame(frame)||relevant.has(frame))invalidate();};
    // Ignore unrelated login/telemetry subframes; invalidate the actual document realm only.
    page.on?.('framenavigated',frameChanged);page.on?.('framedetached',frameDetached);page.on?.('close',invalidate);
    const navigation=request=>{try{const frame=request.frame();if(request.isNavigationRequest()&&frame.page()===page&&documentFrame(frame)){navigating.add(frame);invalidate();}}catch{}};
    this.context?.on('request',navigation);
    this.unwatchPage=()=>{page.off?.('framenavigated',frameChanged);page.off?.('framedetached',frameDetached);page.off?.('close',invalidate);this.context?.off('request',navigation);};
  }
  checkGeneration(value) {
    if(value!==this.generation)throw Object.assign(Error('浏览器会话已结束。'),{code:'SessionClosed'});
  }
  async ensureContext(headless=true) {
    const {viewport={width:1440,height:1000},args}=this.options;
    // Only the existing local-test proxy switch is accepted; profile/channel stay owned here.
    if(typeof headless!=='boolean'||!Array.isArray(args)||args.some(arg=>arg!=='--no-proxy-server'))
      throw Error('不支持的浏览器运行模式或启动参数。');
    if(this.closing)await this.closing;
    if(this.context)return this.context;
    if(this.launching){await this.launching;return this.context;}
    const generation=++this.generation;
    if(!this.context) {
      this.headless=headless;
      let context;
      try {
        this.launching=chromium.launchPersistentContext(this.profile,{channel:'msedge',headless,viewport:headless?viewport:null,args,timeout:12000});
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
      this.authentication=new TencentAuthentication(context);
      this.permissions=new TencentPermissions(this);
      context.on('close',()=>{if(this.context===context){this.unwatchPage?.();this.permissions?.dispose();this.permissions=null;this.authentication?.dispose();this.authentication=null;this.context=null;this.page=null;this.documentUrl=null;++this.generation;++this.pageGeneration;}});
    }
    return this.context;
  }
  // Only an explicit manual open / existing write flow may change browser mode.
  async open(config,headless=this.options.headless??false) {
    if(this.context&&this.headless!==headless)await this.close();
    const context=await this.ensureContext(headless),generation=this.generation;
    const page=this.page&&!this.page.isClosed()?this.page:context.pages()[0]||await context.newPage();
    this.checkGeneration(generation);
    this.adoptPage(page);
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
  async backgroundPage(config) {
    const context=await this.ensureContext(true),generation=this.generation;
    if(!this.headless) {
      const page=this.page;
      if(page&&!page.isClosed()&&this.documentUrl===config.documentUrl)return page;
      throw Object.assign(Error('当前有人工网页正在使用，后台检测不会切换该页面。'),{code:'ManualSessionBusy'});
    }
    const page=this.page&&!this.page.isClosed()?this.page:context.pages()[0]||await context.newPage();
    this.adoptPage(page);page.setDefaultTimeout(Math.min(config.timeout||15,15)*1000);
    let matches=false;
    try {const actual=new URL(page.url()),expected=new URL(config.documentUrl);matches=actual.origin===expected.origin&&actual.pathname===expected.pathname;}catch{}
    if(this.documentUrl!==config.documentUrl||!matches) {
      await page.goto(config.documentUrl,{waitUntil:'domcontentloaded',timeout:Math.min(config.timeout||15,15)*1000});
      this.checkGeneration(generation);this.documentUrl=config.documentUrl;
    }
    this.checkGeneration(generation);
    return page;
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
    ++this.pageGeneration;this.permissions?.dispose();
    this.authentication?.dispose();
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
