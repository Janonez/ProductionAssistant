'use strict';
const crypto=require('node:crypto');
const {evidenceLifetimeMs}=require('./authentication.cjs');
const {readEnterpriseLogin}=require('./login.cjs');
const closed=()=>({state:'closed',browserOpen:false,authentication:'unknown',documentAccess:'unknown',editPermission:'unknown',verifiedAt:null,code:null,recoveryHint:null,message:'当前没有受管浏览器会话；持久化资料可能仍在，需要后台核验。'});
function documentUrl(value) {
  const url=new URL(value);
  if(url.protocol!=='https:'||!['docs.qq.com','doc.weixin.qq.com'].includes(url.hostname)||url.username||url.password||url.port)throw Error('请使用腾讯文档或企业微信文档的 HTTPS 分享链接。');
  return url.href;
}
const sameTarget=(left,right)=>{try{const a=new URL(left),b=new URL(right);return a.origin===b.origin&&a.pathname.replace(/\/$/,'')===b.pathname.replace(/\/$/,'');}catch{return false;}};
const qrLifetimeMs=180000; // Local observation budget; not Tencent's QR expiry.

class TencentSession {
  constructor(browser){this.browser=browser;this.cached=null;this.flight=null;this.login=null;}
  releaseLogin(){if(this.login?.timer)clearTimeout(this.login.timer);this.login=null;}
  base(config={}) {
    return {...closed(),state:this.browser.context?'unverified':'closed',browserOpen:!!this.browser.context,sessionGeneration:this.browser.generation,
      sessionScope:'current-environment-shared',targetDocumentUrl:config.documentUrl??null,configRevision:config.configRevision??null,
      pageGeneration:this.browser.pageGeneration??0,permissionCheck:null,
      documentIdentity:null,documentType:'unknown',documentName:null,documentCheckedAt:null,interaction:'none',
      ...this.browser.authentication?.snapshot()};
  }
  unavailable(config,code,message,hint=null) {return {...this.base(config),state:'unavailable',code,message,recoveryHint:hint};}
  async status(config) {
    const base=this.base(config),cached=this.cached;
    if(!this.browser.context)return base;
    if(base.authentication==='required')return {...base,state:'login-required',code:'LoginRequired',interaction:'qr',message:base.authenticationPreviouslyConfirmed?'当前认证已失效，请扫码登录。':'当前需要登录，请扫码登录。'};
    if(cached&&cached.sessionGeneration===base.sessionGeneration&&cached.pageGeneration===base.pageGeneration&&sameTarget(cached.targetDocumentUrl,config.documentUrl)&&cached.configRevision===base.configRevision) {
      const fresh=cached.documentCheckedAt&&Date.now()-Date.parse(cached.documentCheckedAt)<=evidenceLifetimeMs&&
        (!cached.permissionCheck||Date.parse(cached.permissionCheck.expiresAt)>Date.now());
      const result={...cached,...this.browser.authentication?.snapshot()};
      if(fresh&&result.authentication!=='unknown'&&(!cached.permissionCheck||await this.browser.permissions?.current(cached.permissionCheck,this.browser.page,config)))return result;
    }
    return {...base,state:'unverified',message:'尚未完成当前文档的认证及权限检测。'};
  }
  async run(operation,config={}) {
    if(operation==='sessionClose'){this.releaseLogin();this.cached=null;await this.browser.close();return closed();}
    if(operation==='sessionStatus')return this.status(config);
    if(operation==='sessionClear')return this.clear(config);
    if(operation==='sessionLoginCancel')return this.cancelLogin(config);
    if(operation==='sessionLoginBegin'||operation==='sessionLoginRefresh')return this.beginLogin(config,operation==='sessionLoginRefresh');
    if(operation==='sessionLoginStatus')return this.loginStatus(config);
    if(operation==='sessionLoginConsent')return this.prepareLogin(config,true);
    if(operation==='sessionOpen') {
      this.releaseLogin();this.cached=null;
      try {await this.browser.open(config,false);return {...this.base(config),state:'unverified',message:'已打开文档；打开网页不代表认证及编辑权限已确认。'};}
      catch(error){return this.failure(config,error);}
    }
    if(operation!=='sessionVerify')throw Error('不支持的会话操作。');
    const key=JSON.stringify([config.documentUrl,config.configRevision,config.permissionTargets,config.refreshPermissions]);
    if(this.flight)return this.flight.key===key?this.flight.promise:this.unavailable(config,'SessionBusy','已有其他文档检测正在进行。');
    const promise=this.verify(config).finally(()=>{if(this.flight?.promise===promise)this.flight=null;});
    this.flight={key,promise};return promise;
  }
  failure(config,error) {
    if(error.code==='SessionClosed')return this.base(config);
    const code=['ProfileBusy','BrowserUnavailable','ManualSessionBusy'].includes(error.code)?error.code:'DocumentUnavailable';
    const message={ProfileBusy:'专用浏览器配置正被其他进程使用。',BrowserUnavailable:'无法启动受管后台浏览器。',ManualSessionBusy:'人工网页正在使用，未导航或关闭该页面。',DocumentUnavailable:'文档未能完成检测，请检查网络或重试。'}[code];
    return {...this.unavailable(config,code,message),state:code==='ProfileBusy'?'profile-busy':'unavailable'};
  }
  async clear(config) {
    if(config.confirmClear!==true)return this.unavailable(config,'ClearConfirmationRequired','请先确认清空当前环境的共享浏览器资料。');
    const fs=require('node:fs/promises'),path=require('node:path');
    const profile=this.browser.profile;
    if(typeof profile!=='string'||!path.isAbsolute(profile)||path.basename(profile)!=='tencent-sheet-profile')
      return this.unavailable(config,'ClearScopeUnverified','无法确认专属浏览器目录，未清除资料。');
    const same=(a,b)=>process.platform==='win32'?a.toLowerCase()===b.toLowerCase():a===b;
    async function target() {
      const parent=await fs.realpath(path.dirname(profile));
      let stat;
      try {stat=await fs.lstat(profile);}catch(error){if(error.code==='ENOENT')return null;throw error;}
      if(!stat.isDirectory()||stat.isSymbolicLink())throw Error('UnsafeProfile');
      const resolved=await fs.realpath(profile),expected=path.join(parent,'tencent-sheet-profile');
      if(!same(resolved,expected))throw Error('UnsafeProfile');
      return resolved;
    }
    let changed=false;
    try {
      const existing=await target();
      // The owner probes the profile lock without navigation; external occupancy is never stolen.
      if(existing)await this.browser.ensureContext(true);
      this.releaseLogin();this.cached=null;changed=true;
      await this.browser.close();
      const resolved=await target();
      // Revalidate the canonical absolute target after close. No force, retry or parent deletion.
      if(resolved)await fs.rm(resolved,{recursive:true,force:false,maxRetries:0});
      if(await target())throw Error('ProfileStillPresent');
      return {...this.base(config),code:'LoginCleared',message:'已清空当前环境的专属浏览器资料及缓存，共用会话的腾讯文档和旧任务需要重新登录。'};
    } catch(error) {
      if(!changed&&['ProfileBusy','BrowserUnavailable'].includes(error.code))return this.failure(config,error);
      return this.unavailable(config,changed?'ClearIncomplete':'ClearScopeUnverified',changed?'清除结果尚未确认，部分资料可能已清除；请重新检测。':'无法确认专属目录或安全占用状态，未执行清除。');
    }
  }
  async verify(config) {
    require('./permissions.cjs').normalizeTargets(config.permissionTargets);
    const target=config.documentUrl;
    if(!/^\/sheets?\/[^/\s]+\/?$/.test(new URL(target).pathname))return this.unavailable(config,'NotSpreadsheet','请使用表格分享链接。');
    if(new URL(target).hostname!=='docs.qq.com')return this.unavailable(config,'AuthenticationScopeUnsupported','企业微信文档的服务端认证尚未验证，无法确认连接。');
    try {
      await this.browser.ensureContext(true);
      const generation=this.browser.generation,auth=this.browser.authentication;
      await auth.waitForObservation?.();
      let authentication=await auth.verify();
      let page;
      if(authentication.authentication==='unknown'&&authentication.authenticationReason==='token-not-observed'&&authentication.authenticationDiagnostics?.cookieEvidence==='empty')
        return {...this.base(config),...authentication,state:'login-required',interaction:'qr',code:'LoginCredentialsMissing',message:'当前专属会话未发现保存的登录资料，请先登录后检测。'};
      if(authentication.authentication==='unknown'&&authentication.authenticationReason==='token-not-observed') {
        // The saved target is a verified source of natural user_info requests.
        // A desktop landing page is not guaranteed to provide a usable token.
        page=await this.browser.backgroundPage(config);
        const until=Date.now()+Math.min(2500,(config.timeout||15)*1000);
        while(auth.snapshot().authentication==='unknown'&&Date.now()<until)await new Promise(resolve=>setTimeout(resolve,100));
        authentication=await auth.verify();
      }
      this.browser.checkGeneration(generation);
      const base={...this.base(config),...authentication};
      if(authentication.authentication==='required')return {...base,state:'login-required',interaction:'qr',code:'LoginRequired',message:authentication.authenticationPreviouslyConfirmed?'当前认证已失效，请扫码登录。':'当前需要登录，请扫码登录。'};
      if(authentication.authentication!=='authenticated')return {...base,state:'unavailable',code:'AuthenticationUnknown',message:'暂时无法确认登录状态，请重新检测。',recoveryHint:'网络或认证检测失败不能视为未登录。'};
      if(this.login)return {...base,state:'unverified',code:'LoginFinishing',message:'认证已确认，正在结束扫码任务。'};
      page=await this.browser.backgroundPage(config);
      if(config.refreshPermissions===true) {
        if(!this.browser.headless)return this.unavailable(config,'ManualSessionBusy','人工网页正在使用，权限检查未刷新该页面。');
        await page.reload({waitUntil:'domcontentloaded',timeout:15000});
      }
      let result;
      const until=Date.now()+Math.min(2500,(config.timeout||15)*1000);
      do {
        result=await this.inspectDocument(config,page);
        if(result.documentAccess!=='unknown'||result.state==='unavailable')break;
        await new Promise(resolve=>setTimeout(resolve,150));
      } while(Date.now()<until);
      this.browser.checkGeneration(generation);
      await auth.waitForObservation?.();
      const latest=auth.snapshot();
      if(latest.authentication!=='authenticated')return {...this.base(config),...latest,state:latest.authentication==='required'?'login-required':'unavailable',code:latest.authentication==='required'?'LoginRequired':'AuthenticationUnknown',message:'文档检查期间认证状态发生变化，请重新检测。'};
      if(result.permissionCheck&&result.permissionCheck.userGeneration!==(auth.scopeVersion||0))return {...this.base(config),state:'unverified',code:'PermissionUserChanged',message:'检查期间账号证据发生变化，请重新核验。'};
      this.cached={...result,...latest};
      return this.cached;
    } catch(error){return this.failure(config,error);}
  }
  async inspectDocument(config,page) {
    const base=this.base(config);
    if(!sameTarget(page.url(),config.documentUrl))return this.unavailable(config,'TargetMismatch','当前网页未确认是目标表格。');
    const result=await this.browser.permissions.inspect(config,page,base),checked=new Date().toISOString();
    const value={...base,...result,documentCheckedAt:checked,verifiedAt:checked,
      documentIdentity:result.documentAccess==='allowed'?new URL(config.documentUrl).origin+new URL(config.documentUrl).pathname.replace(/\/$/,''):null,
      documentType:result.documentAccess==='allowed'?'spreadsheet':'unknown'};
    return {...value,state:result.documentAccess==='denied'?'access-denied':result.documentAccess==='allowed'?'authenticated':'unverified',
      code:result.documentAccess==='denied'?'AccessDenied':result.code,
      message:result.documentAccess==='denied'?'当前账号没有目标文档的访问权限。':result.editPermission==='editable'?'文档编辑权限已确认。':result.editPermission==='read-only'?'当前文档只有查看权限。':result.code==='PermissionConflict'?'文档权限信息不一致，请重新核验。':'权限尚未完成初始化或证据不足，请重新核验。'};
  }
  validLogin(config) {const job=this.login;return job&&job.id===config.loginOperationId&&job.generation===this.browser.generation&&job.revision===(config.configRevision??null)&&sameTarget(job.target,config.documentUrl)?job:null;}
  async beginLogin(config,refresh=false) {
    if(this.login?.generation!==this.browser.generation)this.releaseLogin();
    if(refresh&&!this.validLogin(config))return this.unavailable(config,'LoginSuperseded','扫码任务已结束，请重新开始。');
    if(this.login&&!refresh)return this.unavailable(config,'LoginBusy','已有扫码任务正在进行。');
    if(this.browser.context&&!this.browser.headless)return {...this.unavailable(config,'ManualSessionBusy','请先结束当前人工网页会话，再在 Metis 中扫码。'),interaction:'manual'};
    const previous=refresh?this.login:null,consented=!!previous?.consented;
    this.releaseLogin();this.cached=null;
    try {
      if(previous?.pagesBefore)for(const extra of this.browser.context.pages())if(!previous.pagesBefore.has(extra))await extra.close();
      const page=await this.browser.backgroundPage(config);
      if(refresh)await page.reload({waitUntil:'domcontentloaded',timeout:15000});
      const generation=this.browser.generation,job={id:crypto.randomUUID(),generation,target:config.documentUrl,revision:config.configRevision??null,until:Date.now()+qrLifetimeMs,consented,pagesBefore:new Set(this.browser.context.pages())};
      this.login=job;
      job.timer=setTimeout(()=>{if(this.login===job)void this.cancelLogin({...config,loginOperationId:job.id}).catch(()=>{});},qrLifetimeMs);
      job.timer.unref?.();
      return await this.prepareLogin({...config,loginOperationId:job.id});
    } catch(error){const job=this.login;if(job)await this.cancelLogin({...config,loginOperationId:job.id}).catch(()=>{});return {...this.failure(config,error),loginState:'failed'};}
  }
  async prepareLogin(config,consent=false) {
    const job=this.validLogin(config);
    if(!job)return {...this.unavailable(config,'LoginSuperseded','扫码任务已结束，请重新开始。'),loginState:'cancelled'};
    try {
      const until=Date.now()+8000;
      do {
        let result;
        try {result=await readEnterpriseLogin(this.browser,config,job,{consent,image:true});}
        catch(error){if(!/Execution context was destroyed|[Ff]rame (?:was|has been) detached|detached from the DOM/.test(error.message))throw error;result={loginState:'loading'};}
        this.browser.checkGeneration(job.generation);
        if(this.login!==job)return {...this.base(config),loginState:'cancelled'};
        if(result.loginState!=='loading')return {...this.base(config),state:'login-required',...result,loginOperationId:job.id,loginWaitUntil:new Date(job.until).toISOString(),interaction:'qr'};
        await new Promise(resolve=>setTimeout(resolve,200));
      } while(Date.now()<until&&this.login===job);
      await this.cancelLogin(config);
      return {...this.unavailable(config,'QrUnavailable','暂时无法取得企业微信二维码，请重试。'),loginState:'failed'};
    } catch(error){await this.cancelLogin(config).catch(()=>{});return {...this.failure(config,error),loginState:'failed'};}
  }
  async cancelLogin(config) {
    const job=this.validLogin(config);
    if(!job)return {...this.base(config),loginState:'cancelled'};
    this.releaseLogin();
    if(this.browser.headless&&this.browser.context&&job.pagesBefore)for(const extra of this.browser.context.pages())if(!job.pagesBefore.has(extra))await extra.close();
    const page=this.browser.page;
    if(this.browser.headless&&page&&!page.isClosed()) {
      await page.goto('about:blank',{timeout:3000});this.browser.documentUrl=null;
    }
    return {...this.base(config),loginState:'cancelled'};
  }
  async loginStatus(config) {
    const job=this.validLogin(config);
    if(!job)return {...this.unavailable(config,'LoginSuperseded','扫码任务已结束。'),loginState:'cancelled'};
    if(Date.now()>job.until){await this.cancelLogin(config);return {...this.base(config),loginState:'timeout',message:'本地等待已超时，请刷新二维码。'};}
    const auth=await this.browser.authentication.verify();
    if(auth.authentication==='authenticated') {
      await this.cancelLogin(config);
      return {...await this.run('sessionVerify',config),loginState:'authenticated',loginOperationId:job.id};
    }
    let result;
    try {result=await readEnterpriseLogin(this.browser,config,job);}
    catch(error){if(!/Execution context was destroyed|[Ff]rame (?:was|has been) detached|detached from the DOM/.test(error.message))throw error;result={loginState:'loading',message:'登录页面正在跳转。'};}
    return {...this.base(config),...auth,state:auth.authentication==='required'?'login-required':'unverified',loginOperationId:job.id,loginWaitUntil:new Date(job.until).toISOString(),...result};
  }
}
module.exports={TencentSession,closed,documentUrl};
