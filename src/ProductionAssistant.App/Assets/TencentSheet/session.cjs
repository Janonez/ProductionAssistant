'use strict';
const crypto=require('node:crypto');
const {performance}=require('node:perf_hooks');
const {evidenceLifetimeMs}=require('./authentication.cjs');
const {openEnterpriseLogin,selectEnterpriseLogin,returnedHome,readEnterpriseLogin,captureEnterpriseQr,isNavigationChange,qrTiming}=require('./login.cjs');
const loginMetadata=Symbol('confirmed-login-metadata');
const closed=()=>({state:'closed',browserOpen:false,authentication:'unknown',documentAccess:'unknown',editPermission:'unknown',verifiedAt:null,code:null,recoveryHint:null,message:'当前没有受管浏览器会话；持久化资料可能仍在，需要后台核验。'});
function documentUrl(value) {
  const url=new URL(value);
  if(url.protocol!=='https:'||!['docs.qq.com','doc.weixin.qq.com'].includes(url.hostname)||url.username||url.password||url.port)throw Error('请使用腾讯文档或企业微信文档的 HTTPS 分享链接。');
  return url.href;
}
const sameTarget=(left,right)=>{try{const a=new URL(left),b=new URL(right);return a.origin===b.origin&&a.pathname.replace(/\/$/,'')===b.pathname.replace(/\/$/,'');}catch{return false;}};
const qrLifetimeMs=180000; // Local upper bound; the provider may expire it first.
const loginTerminal=new Set(['expired','rejected','timeout','failed','cancelled']);
const loginMessages={
  'starting-browser':'正在启动浏览器…','getting-qr':'正在获取二维码…',
  consent:'请确认腾讯文档服务协议和隐私政策。',waiting:'请使用企业微信扫码',
  scanned:'已扫码，请在手机上确认',confirming:'正在确认登录…',
  expired:'二维码已过期。',rejected:'手机端已拒绝或取消登录。',timeout:'扫码登录超时。',
};
const loginTimeoutMessages={
  'starting-browser':'启动浏览器超时，请重试。','getting-qr':'获取二维码超时，请重试。',
  consent:'等待同意协议超时，请重试。',scanned:'等待手机确认超时，请重试。',
  confirming:'确认登录超时，请重试。',
};

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
    if(this.loginCleanup)await this.loginCleanup;
    if(operation==='sessionClose'){this.releaseLogin();this.cached=null;await this.browser.close();return closed();}
    if(operation==='sessionStatus')return this.status(config);
    if(operation==='sessionClear')return this.clear(config);
    if(operation==='sessionLoginCancel')return this.cancelLogin(config);
    if(operation==='sessionLoginBegin'||operation==='sessionLoginRefresh')return this.beginLogin(config,operation==='sessionLoginRefresh');
    if(operation==='sessionLoginStatus')return this.loginStatus(config);
    if(operation==='sessionLoginConsent')return this.confirmLoginAgreement(config);
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
    const summaryDiagnostic=/ERR_.*TIMED_OUT|timeout|timed out/i.test(error.message)?'Timeout':
      /net::ERR_/.test(error.message)?'NetworkError':undefined;
    return {...this.unavailable(config,code,message),state:code==='ProfileBusy'?'profile-busy':'unavailable',summaryDiagnostic};
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
    if(this.login&&!loginTerminal.has(this.login.state))return {...this.base(config),state:'unverified',code:'LoginFinishing',message:'扫码会话正在进行。'};
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
  async connectionObservation(result,operation) {
    if(result.code==='LoginCleared')return {invalidation:'LoginCleared'};
    if(result.loginState==='cancelled'||result.loginState==='timeout')
      return {diagnostic:result.loginState==='cancelled'?'Cancelled':'Timeout'};
    if(result.authentication==='required'&&result.authenticationSource==='server'&&!result.authenticationStale||
       result.code==='LoginCredentialsMissing')return {invalidation:'LoginExpired'};
    const metadata=result[loginMetadata]??(result.authentication==='authenticated'&&result.authenticationSource==='server'&&!result.authenticationStale
      ? await this.browser.authentication?.connectionMetadata?.(result.authenticationObservedAt) : null);
    const connection=metadata?{authenticated:true,...metadata}:{};
    if(result.documentAccess==='denied')return {...connection,invalidation:'AccessDenied'};
    if(result.documentAccess==='allowed'&&result.editPermission==='read-only')return {...connection,invalidation:'ReadOnly'};
    if(metadata&&result.documentAccess==='allowed'&&result.editPermission==='editable'&&result.documentType==='spreadsheet'&&result.documentIdentity&&result.documentCheckedAt)
      return {...connection,documentIdentity:result.documentIdentity,documentName:result.documentName,editableConfirmedAt:result.documentCheckedAt};
    if(operation==='sessionVerify'||result.state==='unavailable'||result.state==='profile-busy') {
      const diagnostic=result.summaryDiagnostic||
        (result.authenticationReason==='timeout'||result.code==='PermissionInitializationTimeout'?'Timeout':
          result.authenticationReason==='network-error'?'NetworkError':
          ['PermissionPageChanged','PermissionConflict','AuthenticationUnknown','LoginFinishing','TargetMismatch',null].includes(result.code)?'PageIncomplete':'Unavailable');
      return {...connection,diagnostic};
    }
    return metadata?connection:null;
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
  loginMatches(job,config) {
    return !!job&&job.generation===this.browser.generation&&job.revision===(config.configRevision??null)&&sameTarget(job.target,config.documentUrl);
  }
  validLogin(config) {return this.loginMatches(this.login,config)&&this.login.id===config.loginOperationId?this.login:null;}
  setLoginPhase(job,state,lifetime=0,code=null,message=loginMessages[state]) {
    clearTimeout(job.timer);
    Object.assign(job,{state,until:lifetime?Date.now()+lifetime:0,code,message});
    if(state!=='waiting')job.qrImage=null;
    if(lifetime&&['consent','waiting','scanned','confirming'].includes(state)) {
      job.timer=setTimeout(()=>this.expireLogin(job),lifetime);
      job.timer.unref?.();
    }
  }
  expireLogin(job) {
    if(!job.until||Date.now()<job.until)return;
    const state=job.state;
    if(state==='waiting')this.setLoginPhase(job,'expired');
    else this.setLoginPhase(job,'timeout',0,'LoginTimeout',loginTimeoutMessages[state]);
  }
  loginSnapshot(config,job,includeImage=false) {
    return {...this.base(config),state:'login-required',interaction:'qr',loginOperationId:job.id,loginState:job.state,
      loginWaitUntil:job.until?new Date(job.until).toISOString():null,code:job.code,message:job.message,
      ...(includeImage&&job.qrImage?{qrImage:job.qrImage}:{})};
  }
  staleLogin(config) {
    return {...this.unavailable(config,'LoginSuperseded','扫码会话已结束，请重试。'),loginState:'cancelled'};
  }
  beginLogin(config,refresh=false) {
    if(this.login?.generation!==this.browser.generation)this.releaseLogin();
    const previous=this.login,matching=this.loginMatches(previous,config);
    if(refresh&&!this.validLogin(config))return this.staleLogin(config);
    if(previous) {
      this.expireLogin(previous);
      if(!loginTerminal.has(previous.state))return matching?this.loginSnapshot(config,previous,true):
        {...this.unavailable(config,'LoginBusy','已有其他文档正在扫码，请先结束该会话。'),loginState:'failed'};
    }
    if(this.browser.context&&!this.browser.headless)
      return {...this.unavailable(config,'ManualSessionBusy','请先结束当前人工网页会话，再扫码登录。'),interaction:'manual',loginState:'failed'};
    this.releaseLogin();this.cached=null;
    const job={id:crypto.randomUUID(),generation:this.browser.generation,target:config.documentUrl,revision:config.configRevision??null,
      page:previous?.page,pagesBefore:previous?.pagesBefore,reload:matching,agreementAccepted:refresh&&matching&&previous.agreementAccepted};
    this.login=job;
    this.setLoginPhase(job,'starting-browser',12000);
    return this.openLoginBrowser(config,job);
  }
  async openLoginBrowser(config,job) {
    const started=performance.now(),warm=!!this.browser.context;
    try {
      const context=this.browser.ensureContext(true);
      job.generation=this.browser.generation;
      await context;
      if(!warm)job.page=this.browser.context.pages()[0];
      if(this.login===job)this.setLoginPhase(job,'getting-qr',30000);
    } catch(error){this.failLogin(job,error,'BrowserStartFailed');}
    finally {
      job.generation=this.browser.generation;
      qrTiming(warm?'edge-warm':'edge-cold',started);
    }
    return this.loginSnapshot(config,job);
  }
  async openLoginDialog(config,job) {
    if(job.pagesBefore)await this.closeLoginPages(job,true);
    job.pagesBefore=new Set(this.browser.context.pages());
    const started=performance.now();
    let page;
    try {page=await this.browser.backgroundPage(config,{waitUntil:'commit',reload:job.reload});}
    finally {job.page=this.browser.page??job.page;qrTiming('document-navigation',started);}
    await openEnterpriseLogin(page,12000);
    const agreementStarted=performance.now();
    const providerStarted=await selectEnterpriseLogin(page,job.agreementAccepted);
    if(providerStarted===false)qrTiming('agreement-ready',agreementStarted);
    if(providerStarted===false)this.setLoginPhase(job,'consent',qrLifetimeMs);
    else this.startQrWait(job,providerStarted);
    return this.loginSnapshot(config,job);
  }
  startQrWait(job,providerStarted) {
    job.providerStarted=providerStarted;
    this.setLoginPhase(job,'getting-qr',8000);
  }
  async confirmLoginAgreement(config) {
    const job=this.validLogin(config);
    if(!job)return this.staleLogin(config);
    this.expireLogin(job);
    if(job.state!=='consent')return this.loginSnapshot(config,job,true);
    job.agreementAccepted=true;
    try {
      const started=await selectEnterpriseLogin(this.browser.page,true);
      this.startQrWait(job,started);
      return this.getLoginQr(config);
    } catch(error){this.failLogin(job,error,'AgreementPageChanged');return this.loginSnapshot(config,job);}
  }
  // Other callers can fetch the same in-memory image and expiry through this method.
  async getLoginQr(config) {
    const job=this.validLogin(config);
    if(!job)return this.staleLogin(config);
    this.expireLogin(job);
    if(job.state!=='getting-qr'||job.providerStarted===undefined)return this.loginSnapshot(config,job,true);
    try {
      while(job.state==='getting-qr'&&Date.now()<job.until) {
        const result=await this.readLoginProvider(job,true);
        if(result.state==='waiting') {
          qrTiming('qr-visible',job.providerStarted);
          const image=await captureEnterpriseQr(result.image,qrLifetimeMs);
          this.setLoginPhase(job,'waiting',qrLifetimeMs);
          job.until=Date.parse(image.loginWaitUntil);
          job.qrImage=image.qrImage;
          return this.loginSnapshot(config,job,true);
        }
        if(this.acceptLoginProgress(job,result))return this.loginSnapshot(config,job);
        await new Promise(resolve=>setTimeout(resolve,150));
      }
      this.expireLogin(job);
    } catch(error){this.failLogin(job,error,'QrUnavailable');}
    return this.loginSnapshot(config,job);
  }
  async readLoginProvider(job,findQr=false) {
    if(!this.browser.page||this.browser.page.isClosed())throw Object.assign(Error('登录页面已关闭。'),{code:'SessionClosed'});
    if(returnedHome(this.browser,job))return {state:'confirming',returnedHome:true};
    try {return await readEnterpriseLogin(this.browser,job,{findQr});}
    catch(error){if(!isNavigationChange(error))throw error;return {};}
  }
  acceptLoginProgress(job,result) {
    if(result.state==='scanned'&&job.state!=='scanned') {
      this.setLoginPhase(job,'scanned',60000);
      return true;
    }
    if(result.state==='expired'||result.state==='rejected') {
      this.setLoginPhase(job,result.state);
      return true;
    }
    if(result.state==='confirming') {
      job.returnedHome=result.returnedHome;
      this.setLoginPhase(job,'confirming',30000);
      return true;
    }
    return false;
  }
  failLogin(job,error,code) {
    const timeout=error.name==='TimeoutError'||error.cause?.name==='TimeoutError'||/ERR_.*TIMED_OUT/.test(error.message);
    if(timeout) {
      this.setLoginPhase(job,'timeout',0,'LoginTimeout',loginTimeoutMessages[job.state]);
      return;
    }
    const reason=error.code==='ProfileBusy'?'专用浏览器配置正被其他进程使用。':
      error.code==='AgreementPageChanged'?'登录协议页面已变化，请重试。':
      code==='BrowserStartFailed'?'无法启动后台 Edge，请重试。':
      code==='LoginEntryUnavailable'?'无法打开腾讯文档登录入口，请检查网络后重试。':
      code==='LoginCheckFailed'?'暂时无法确认登录，请重试。':'暂时无法取得企业微信二维码，请重试。';
    this.setLoginPhase(job,'failed',0,error.code||code,reason);
  }
  async closeLoginPages(job,keepDocument=false) {
    if(!this.browser.headless||!this.browser.context||job.generation!==this.browser.generation)return;
    const owned=this.browser.context.pages().filter(page=>page===job.page?!keepDocument:job.pagesBefore&&!job.pagesBefore.has(page));
    if(!owned.length)return;
    const started=performance.now();
    await Promise.all(owned.map(page=>page.close()));
    if(this.browser.page===job.page&&job.page?.isClosed())this.browser.documentUrl=null;
    qrTiming('login-pages-closed',started);
  }
  async cancelLogin(config) {
    const job=this.validLogin(config);
    if(!job)return {...this.base(config),loginState:'cancelled'};
    this.releaseLogin();
    await this.closeLoginPages(job);
    return {...this.base(config),loginState:'cancelled'};
  }
  async verifyLoginAccount(config,job) {
    const auth=this.browser.authentication;
    if(job.returnedHome) {
      await this.browser.backgroundPage(config,{reload:true});
      job.returnedHome=false;
    }
    this.expireLogin(job);
    if(job.state!=='confirming')return this.loginSnapshot(config,job);
    await auth.waitForObservation?.();
    const isConfirmed=evidence=>evidence.authentication==='authenticated'&&evidence.authenticationSource==='server'&&!evidence.authenticationStale;
    const latest=auth.snapshot(),evidence=isConfirmed(latest)?latest:await auth.verify(Math.max(1,job.until-Date.now()));
    this.expireLogin(job);
    if(job.state!=='confirming'||!isConfirmed(evidence))return this.loginSnapshot(config,job);
    const metadata=await auth.connectionMetadata?.(evidence.authenticationObservedAt);
    const current=auth.snapshot();
    if(!isConfirmed(current))return this.loginSnapshot(config,job);
    this.releaseLogin();
    this.loginCleanup=this.closeLoginPages(job).catch(()=>{}).finally(()=>{this.loginCleanup=null;});
    return {...this.base(config),...current,state:'unverified',interaction:'qr',loginState:'authenticated',
      loginOperationId:job.id,message:'登录成功',
      [loginMetadata]:current.authenticationObservedAt===evidence.authenticationObservedAt?metadata:null};
  }
  async loginStatus(config) {
    const job=this.validLogin(config);
    if(!job)return this.staleLogin(config);
    this.expireLogin(job);
    if(job.state==='starting-browser')return this.loginSnapshot(config,job);
    if(job.state==='getting-qr') {
      if(job.providerStarted!==undefined)return this.getLoginQr(config);
      try {return await this.openLoginDialog(config,job);}
      catch(error){this.failLogin(job,error,'LoginEntryUnavailable');return this.loginSnapshot(config,job);}
    }
    if(!['waiting','scanned','confirming'].includes(job.state))return this.loginSnapshot(config,job);
    try {
      if(job.state==='confirming')return await this.verifyLoginAccount(config,job);
      const result=await this.readLoginProvider(job);
      this.expireLogin(job);
      if(loginTerminal.has(job.state))return this.loginSnapshot(config,job);
      if(!this.acceptLoginProgress(job,result)) {
        const auth=this.browser.authentication.snapshot();
        if(auth.authentication==='authenticated'&&auth.authenticationSource==='server'&&!auth.authenticationStale)
          this.setLoginPhase(job,'confirming',30000);
      }
    } catch(error){this.failLogin(job,error,'LoginCheckFailed');}
    return this.loginSnapshot(config,job);
  }
}
module.exports={TencentSession,closed,documentUrl};
