'use strict';

const endpoint='https://docs.qq.com/cgi-bin/online_docs/user_info?get_vip_info=1';
// Product policy: bound Verify latency and reuse only short-lived server observations.
// These limits do not describe Tencent's token/session expiry.
const evidenceLifetimeMs=30000, probeIntervalMs=5000, probeTimeoutMs=8000;
const principalEvidence=Symbol('server-principal');
const unknown=reason=>({authentication:'unknown',authenticationReason:reason,authenticationSource:null,authenticationObservedAt:null});
function classify(status,body) {
  if(status!==200)return unknown('http-error');
  if(!body||typeof body!=='object'||Array.isArray(body))return unknown('invalid-response');
  const codes=['ret','retcode','cgicode'].filter(key=>Object.hasOwn(body,key)).map(key=>body[key]);
  if(codes.some(code=>!Number.isInteger(code))||(Object.hasOwn(body,'login')&&typeof body.login!=='boolean'))return unknown('invalid-response');
  if(codes.length&&codes.every(code=>code===12100)&&body.login!==true)return {authentication:'required',authenticationReason:'server-requires-login'};
  if(body.login===true&&body.ret===0&&codes.every(code=>code===0))return {authentication:'authenticated',authenticationReason:'server-confirmed'};
  return unknown('conflicting-or-unknown-response');
}
function matches(request) {
  try {const url=new URL(request.url());return request.method()==='POST'&&url.origin==='https://docs.qq.com'&&url.pathname==='/cgi-bin/online_docs/user_info'&&url.searchParams.get('get_vip_info')==='1';}
  catch{return false;}
}
function requestLocation(request) {
  try {
    const url=new URL(request.url());
    if(!['https://docs.qq.com','https://open.weixin.qq.com','https://open.work.weixin.qq.com','https://login.work.weixin.qq.com'].includes(url.origin))return null;
    const known=['/','/desktop/','/cgi-bin/online_docs/user_info','/cgi-bin/online_docs/auth_info/get','/dop-api/opendoc','/connect/qrconnect','/wwopen/sso/qrConnect'];
    const path=known.includes(url.pathname)?url.pathname:/^\/sheets?\//.test(url.pathname)?'/sheet/[document]':
      url.pathname.startsWith('/connect/qrcode/')?'/connect/qrcode/[redacted]':'/[other-resource]';
    return {origin:url.origin,path,method:request.method(),httpStatus:null};
  } catch{return null;}
}

// One instance per owned Context. Secrets stay here; snapshot is an explicit allowlist.
class TencentAuthentication {
  constructor(context,{now=()=>Date.now()}={}) {
    this.context=context;this.now=now;this.stopped=false;this.token=null;this.tokenVersion=0;
    this.sequence=0;this.records=new WeakMap();this.pending=new Set();this.cached=unknown('not-observed');
    this.everAuthenticated=false;this.lastProbe=-Infinity;this.flight=null;
    this.scopeVersion=0;this.lastServerState=null;this.principalScope=null;
    this.traffic=[];this.trafficRecords=new WeakMap();this.userInfoSeen=0;this.userInfoAccepted=0;
    this.cookieEvidence='not-inspected';this.tokenMatchesCookie=false;this.tokenInUrl=false;this.tokenInResponse=false;
    this.listeners={request:request=>this.onRequest(request),response:response=>this.onResponse(response),
      requestfailed:request=>this.onFailed(request),close:()=>this.dispose()};
    for(const [event,listener] of Object.entries(this.listeners))context.on(event,listener);
  }
  onRequest(request) {
    if(this.stopped)return;
    const location=requestLocation(request);
    if(location) {
      let row=this.traffic.find(row=>row.origin===location.origin&&row.path===location.path&&row.method===location.method);
      if(!row){row=location;this.traffic.push(row);if(this.traffic.length>12)this.traffic.shift();}
      this.trafficRecords.set(request,row);
      if(location.origin==='https://docs.qq.com'&&location.path==='/cgi-bin/online_docs/user_info')this.userInfoSeen++;
    }
    if(this.stopped||!matches(request))return;
    this.userInfoAccepted++;
    this.records.set(request,{sequence:++this.sequence});
    this.cached=unknown('observation-pending');
    let value=null;
    try {const body=request.postDataJSON();if(typeof body?.xsrf==='string'&&body.xsrf.length>0&&body.xsrf.length<=4096)value=body.xsrf;}catch{}
    if(value!==this.token){if(this.token!==null)this.scopeVersion++;this.token=value;this.tokenVersion++;}
    this.tokenMatchesCookie=false;this.tokenInResponse=false;
    this.tokenInUrl=!!value&&[...new URL(request.url()).searchParams.values()].includes(value);
  }
  onResponse(response) {
    const traffic=this.trafficRecords.get(response.request());
    if(!this.stopped&&traffic)traffic.httpStatus=response.status();
    const record=this.records.get(response.request());
    if(this.stopped||!record)return;
    const pending=(async()=>{const result=await this.read(response);if(!this.stopped&&record.sequence===this.sequence)this.publish(result);})();
    this.pending.add(pending);void pending.finally(()=>this.pending.delete(pending));
  }
  onFailed(request) {
    const record=this.records.get(request);
    if(!this.stopped&&record?.sequence===this.sequence)this.publish(unknown('network-error'),false);
  }
  async read(response) {
    try {
      const body=response.status()===200?await response.json():null;
      const token=this.token;
      const contains=(value,depth=0)=>typeof value==='string'?value===token:depth<3&&value&&typeof value==='object'&&Object.values(value).slice(0,100).some(item=>contains(item,depth+1));
      if(token&&!this.stopped)this.tokenInResponse=!!contains(body);
      const result=classify(response.status(),body);
      // Verified against the real user_info schema. Identity stays private and is never serialized.
      if(result.authentication==='authenticated'&&Number.isInteger(body.uid_source)) {
        const account=typeof body.uid==='string'&&body.uid.length>0?['uid',body.uid,body.domain_id??'',body.uid_source]:
          typeof body.work_id==='string'&&body.work_id.length>0&&typeof body.corp_id==='string'&&body.corp_id.length>0?['work',body.work_id,body.corp_id,body.uid_source]:
          Number.isSafeInteger(body.uin)&&body.uin>0?['uin',body.uin,body.uid_source]:null;
        if(account)Object.defineProperty(result,principalEvidence,{value:require('node:crypto').createHash('sha256').update(JSON.stringify(account)).digest('hex')});
      }
      return result;
    }
    catch{return unknown('invalid-response');}
  }
  publish(result,serverObserved=true) {
    const principal=result[principalEvidence];
    if(serverObserved&&principal){if(this.principalScope!==null&&this.principalScope!==principal)this.scopeVersion++;this.principalScope=principal;}
    if(serverObserved&&result.authentication!==this.lastServerState){if(this.lastServerState!==null)this.scopeVersion++;this.lastServerState=result.authentication;}
    this.cached={...result,authenticationSource:serverObserved?'server':null,authenticationObservedAt:serverObserved?new Date(this.now()).toISOString():null};
    if(result.authentication==='authenticated')this.everAuthenticated=true;
    return this.snapshot();
  }
  snapshot() {
    const value=this.cached,at=value.authenticationObservedAt;
    const stale=!!at&&this.now()-Date.parse(at)>evidenceLifetimeMs;
    return {authentication:stale?'unknown':value.authentication,authenticationReason:stale?'stale-evidence':value.authenticationReason,
      authenticationSource:value.authenticationSource??null,authenticationObservedAt:at??null,authenticationStale:stale,
      authenticationPreviouslyConfirmed:this.everAuthenticated,
      authenticationDiagnostics:{cookieEvidence:this.cookieEvidence,tokenReadSource:this.token?'request-body':'none',tokenMatchesCookie:this.tokenMatchesCookie,
        tokenInUrl:this.tokenInUrl,tokenInResponse:this.tokenInResponse,userInfoRequestsSeen:this.userInfoSeen,userInfoRequestsAccepted:this.userInfoAccepted,
        requests:this.traffic.map(row=>({...row}))}};
  }
  verify(timeoutMs=probeTimeoutMs) {
    if(this.flight)return this.flight;
    if(this.stopped)return Promise.resolve({...unknown('session-closed'),authenticationPreviouslyConfirmed:this.everAuthenticated});
    this.flight=(async()=>{
      let response,sequence=this.sequence;
      try {
        // A naturally observed value must still match a cookie in this Context at this endpoint.
        // No cookie key, derived token, or guessed algorithm is used.
        const cookies=await this.context.cookies(endpoint);
        this.cookieEvidence=cookies.length?'present-unclassified':'empty';
        this.tokenMatchesCookie=!!this.token&&cookies.some(cookie=>cookie.value===this.token);
        if(this.stopped)return {...unknown('session-closed'),authenticationPreviouslyConfirmed:this.everAuthenticated};
        const cached=this.snapshot();
        if(cached.authentication!=='unknown')return cached;
        if(this.now()-this.lastProbe<probeIntervalMs)return {...cached,authenticationReason:'rate-limited'};
        if(!this.token)return {...cached,authenticationReason:'token-not-observed'};
        const token=this.token,version=this.tokenVersion;
        sequence=++this.sequence;this.lastProbe=this.now();
        if(version!==this.tokenVersion||!cookies.some(cookie=>cookie.value===token))return this.publish(unknown('token-source-unconfirmed'),false);
        response=await this.context.request.post(endpoint,{data:{xsrf:token},headers:{'Content-Type':'application/json'},
          timeout:Math.max(1,Math.min(timeoutMs,probeTimeoutMs)),maxRedirects:0,maxRetries:0,ignoreHTTPSErrors:false,failOnStatusCode:false});
        const result=await this.read(response);
        if(this.stopped)return {...unknown('session-closed'),authenticationPreviouslyConfirmed:this.everAuthenticated};
        if(version!==this.tokenVersion||sequence!==this.sequence)return {...this.snapshot(),authentication:'unknown',authenticationReason:'superseded'};
        return this.publish(result);
      } catch(error) {
        if(this.stopped)return {...unknown('session-closed'),authenticationPreviouslyConfirmed:this.everAuthenticated};
        const reason=/timeout|timed out/i.test(String(error?.message))?'timeout':'network-error';
        if(sequence!==this.sequence)return {...this.snapshot(),authentication:'unknown',authenticationReason:'superseded'};
        return this.publish(unknown(reason),false);
      } finally {if(response)await response.dispose().catch(()=>{});}
    })().finally(()=>{this.flight=null;});
    return this.flight;
  }
  async settle(){await Promise.all([...this.pending]);}
  async waitForObservation(timeoutMs=1200) {
    const until=Date.now()+timeoutMs;
    while(!this.stopped&&this.cached.authenticationReason==='observation-pending'&&Date.now()<until)await new Promise(resolve=>setTimeout(resolve,25));
  }
  dispose() {
    if(this.stopped)return;
    this.stopped=true;this.token=null;this.tokenVersion++;this.sequence++;this.cached=unknown('session-closed');
    for(const [event,listener] of Object.entries(this.listeners))this.context.off(event,listener);
  }
}
module.exports={TencentAuthentication,classify,endpoint,evidenceLifetimeMs,probeIntervalMs};
