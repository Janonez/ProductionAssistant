'use strict';

// Confirmed in the current Tencent sheet bundle (enum module 973864), not permission levels.
const rangeTypes=Object.freeze({Named:1,Filter:2,Protected:3,Chart:4,Private:5,Pivot:6,Linked:7,ArrayFormula:8,Notify:9,Subscribed:10});
const documentLifetimeMs=15000,rangeLifetimeMs=15000;
const identity=value=>{try{const u=new URL(value);return u.origin+u.pathname.replace(/\/$/,'');}catch{return null;}};
function documentPermission(primary,secondary,expired) {
  const normalized=secondary===true||secondary===1?true:secondary===false||secondary===0?false:null;
  if(typeof primary!=='boolean'||normalized===null)return {value:'unknown',reason:'permission-initializing'};
  if(primary!==normalized)return {value:'unknown',reason:'permission-conflict'};
  // The current real page exposes privilegeExpire=0 (P2's report normalized it to false).
  if(expired!==false&&expired!==0)return {value:'unknown',reason:'permission-expired-or-unconfirmed'};
  return {value:primary?'editable':'read-only',reason:'consistent-page-fields'};
}
function normalizeTargets(input) {
  if(input==null)return [];
  if(!Array.isArray(input)||input.length>100)throw Error('目标位置列表无效。');
  return input.map(target=>{
    if(!target||typeof target!=='object'||!['sheetId','sheetName'].some(k=>typeof target[k]==='string'&&target[k].trim()&&target[k].length<=200))throw Error('请指定目标工作表。');
    const address=typeof target.address==='string'?target.address.trim().toUpperCase():'';
    const {row,column}=require('./core.js').addressParts(address);
    return {sheetId:target.sheetId||null,sheetName:target.sheetName||null,address,row:row-1,column:column-1,
      label:typeof target.label==='string'?target.label.slice(0,200):null};
  });
}
// Deliberately no mapping from privilege=2 to eligibility until a real positive sample exists.
function targetPermission(model,document,authentication,privileges) {
  if(authentication==='required')return {eligibility:'denied',reason:'authentication-required'};
  if(authentication!=='authenticated')return {eligibility:'unknown',reason:'authentication-unconfirmed'};
  if(model.accessDenied)return {eligibility:'denied',reason:'document-access-denied'};
  if(document==='read-only')return {eligibility:'denied',reason:'document-read-only'};
  if(document!=='editable')return {eligibility:'unknown',reason:'document-permission-unconfirmed'};
  if(!model.complete)return {eligibility:'unknown',reason:model.reason||'range-model-incomplete'};
  if(model.matches.length) {
    if(model.matches.some(id=>privileges.get(id)?.rangePrivilege===1&&privileges.get(id)?.isOwner===false))return {eligibility:'denied',reason:'protected-read-only'};
    return {eligibility:'unknown',reason:model.matches.every(id=>privileges.has(id))?'range-privilege-unvalidated':'range-privilege-missing'};
  }
  return model.restrictionsConfirmed?{eligibility:'eligible',reason:'verified-prerequisites'}:{eligibility:'unknown',reason:'other-restrictions-unconfirmed'};
}
function rangeResponse(status,body) {
  if(status!==200||!body||body.retcode!==0||!body.data||typeof body.data!=='object')return {reason:'range-response-error',records:[]};
  if(['ret','cgicode'].some(k=>Object.hasOwn(body,k)&&body[k]!==0))return {reason:'range-response-error',records:[]};
  const records=[],owners=[];
  const walk=(value,depth=0)=>{
    if(!value||typeof value!=='object'||depth>7)return;
    if(Object.hasOwn(value,'isOwner')&&typeof value.isOwner==='boolean')owners.push(value.isOwner);
    if(typeof value.rangeId==='string'&&value.rangeId.length>0&&value.rangeId.length<=200&&
      ['rangePolicy','rangePrivilege','rangeOtherPrivilegeType'].every(k=>Number.isInteger(value[k])))
      records.push({rangeId:value.rangeId,rangePolicy:value.rangePolicy,rangePrivilege:value.rangePrivilege,rangeOtherPrivilegeType:value.rangeOtherPrivilegeType});
    for(const item of Object.values(value).slice(0,10000))walk(item,depth+1);
  };
  walk(body.data);
  if(!owners.length||owners.some(owner=>owner!==owners[0]))return {reason:'range-response-unrecognized',records:[]};
  const map=new Map();for(const row of records) {
    if(map.has(row.rangeId)&&JSON.stringify(map.get(row.rangeId))!==JSON.stringify(row))return {reason:'range-response-conflict',records:[]};
    map.set(row.rangeId,{...row,isOwner:owners[0]});
  }
  return {reason:records.length?'server-observed':'range-response-empty',records:[...map.values()]};
}

// Runs inside the actual document frame. No DOM edits, selection changes or network calls.
function readPermissionPage({targets,types}) {
  const app=window.SpreadsheetApp,w=app?.workbook,manager=w?.workbookRangeManager,vars=window.clientVars;
  const fields={primary:window.basicClientVars?.authInfo?.attribute?.canEdit??null,secondary:vars?.privilegeAttribute?.can_edit??null,expired:vars?.privilegeExpire??null};
  const sheet=w?.activeSheet,actualId=sheet?.getSheetId?.();
  // Permission listeners are scoped to this document realm and disposed on realm destruction.
  const key='__metisReadOnlyPermissionsV1';
  let state=window[key];
  if(!state||state.workbook!==w||state.manager!==manager) {
    if(state)for(const dispose of state.dispose)try{dispose();}catch{}
    state={workbook:w,manager,revision:(state?.revision||0)+1,policyChangedAt:0,dispose:[]};window[key]=state;
    const changed=()=>{state.revision++;};
    const policyChanged=()=>{state.revision++;state.policyChangedAt=Date.now();};
    const listen=(event,name,callback=changed)=>{if(event?.listen&&event?.remove){event.listen(name,callback);state.dispose.push(()=>event.remove(name,callback));}};
    for(const name of ['rangeAuthChange','updateRangeAuth','cooperationAddNewRangeDone'])listen(app?.event?.rangeAuthEvent,name,policyChanged);
    for(const name of ['cooperation_inited','authInited','ownerInited'])listen(app?.event?.rangeAuthEvent,name);
    for(const name of ['after_all_loaded','after_all_render'])listen(app?.event?.init,name);
    // These workbook events use the platform's disposable event contract.
    for(const name of ['onProtectedRanges','onChangeSheetProtectionsEvent','onChangeWorkBookProtectionEvent','onChangeDiff']) {
      const event=w?.event?.[name];if(typeof event==='function'){const d=event(name==='onChangeDiff'?changed:policyChanged);if(d?.dispose)state.dispose.push(()=>d.dispose());}
    }
  }
  const base={...fields,title:document.title,revision:state.revision,policyChangedAt:state.policyChangedAt,realm:performance.timeOrigin,sheet:!!actualId,modelReady:false,targets:[],
    denied:[...document.querySelectorAll('[role="alert"],.permission-tips,.permission-denied')].some(el=>el.getBoundingClientRect().height>0&&/无权访问|没有访问权限|申请访问|无权限查看/.test(el.textContent||''))};
  if(!w||!manager||!actualId||vars?.dataIniting!==false||sheet?.getIsInitialized?.()!==true||typeof fields.primary!=='boolean'||![true,false,0,1].includes(fields.secondary))return base;
  if(!['getAllWorkbookRanges','getWorkbookRangesByType','getWorkbookRangeById','getWorkbookRangeBySheetId'].every(k=>typeof manager[k]==='function'))return base;
  const all=manager.getAllWorkbookRanges(),protectedRanges=manager.getWorkbookRangesByType(types.Protected);
  if(!Array.isArray(all)||!Array.isArray(protectedRanges)||all.length>50000)return base;
  const known=new Set(Object.values(types));
  if(all.some(r=>typeof r?.getType!=='function'||!known.has(r.getType())||typeof r.getRange!=='function'||!r.getRange()||typeof r.getRange().sheetId!=='string'||!r.getRange().sheetId||manager.getWorkbookRangeById(r.getId())!==r))return base;
  if(all.filter(r=>r.getType()===types.Protected).length!==protectedRanges.length)return base;
  base.modelReady=true;
  base.fingerprint=JSON.stringify([actualId,...all.map(r=>{const p=r.getRange();return [r.getId(),r.getType(),p.sheetId,p.startRowIndex,p.endRowIndex,p.startColIndex,p.endColIndex];})]);
  base.targets=targets.map(target=>{
    const result={...target,complete:false,reason:'sheet-unavailable',matches:[],protection:'unknown',restrictionsConfirmed:false};
    const wm=w.worksheetManager;
    const targetSheet=target.sheetId?wm?.getSheetBySheetId?.(target.sheetId):wm?.getSheetBySheetName?.(target.sheetName);
    if(!targetSheet||(target.sheetName&&targetSheet.getSheetName?.()!==target.sheetName)||targetSheet.getIsInitialized?.()!==true)return result;
    const sheetId=targetSheet.getSheetId();result.sheetId=sheetId;result.sheetName=targetSheet.getSheetName();
    const rowCount=targetSheet.getRowCount?.(),colCount=targetSheet.getColCount?.();
    if(!Number.isInteger(rowCount)||!Number.isInteger(colCount)||rowCount<1||colCount<1)return {...result,reason:'coordinate-model-unknown'};
    if(target.row>=rowCount||target.column>=colCount)return {...result,reason:'coordinate-out-of-bounds'};
    const bySheet=manager.getWorkbookRangeBySheetId(sheetId,types.Protected);
    if(!Array.isArray(bySheet)||bySheet.length!==protectedRanges.filter(r=>r.getRange().sheetId===sheetId).length)return {...result,reason:'range-model-inconsistent'};
    // Clone only the native coordinate type; the target is always supplied explicitly.
    const exemplar=all[0]?.getRange()||app?.view?.getSelectionRanges?.()[0];
    if(!exemplar||typeof exemplar.clone!=='function')return {...result,reason:'coordinate-model-unknown'};
    const point=exemplar.clone();Object.assign(point,{sheetId,startRowIndex:target.row,endRowIndex:target.row,startColIndex:target.column,endColIndex:target.column});
    if(typeof point.isInvalid!=='function'||point.isInvalid())return {...result,reason:'coordinate-model-unknown'};
    for(const item of all) {
      const range=item.getRange();
      if(range.sheetId!==sheetId)continue;
      if(!['contains','isInvalid','isAll','isRow','isCol'].every(k=>typeof range[k]==='function')||range.isInvalid())return {...result,reason:'coordinate-model-unknown'};
      const bounds=[range.startRowIndex,range.endRowIndex,range.startColIndex,range.endColIndex];
      if(bounds.some(v=>!Number.isInteger(v)||v<0))return {...result,reason:'coordinate-model-unknown'};
      if(range.contains(point)) {
        if(item.getType()===types.Protected)result.matches.push(item.getId());
        if([types.Private,types.ArrayFormula].includes(item.getType()))return {...result,reason:'unsupported-range-restriction'};
      }
    }
    result.complete=true;result.reason='loaded-model';result.protection=result.matches.length?'protected':'unprotected';
    // Native sheet status is only a further restriction, never authority for protected ranges.
    result.restrictionsConfirmed=targetSheet.getSheetProtection?.()===undefined&&typeof app?.sheetStatus?.getRangeCanEdit==='function'&&app.sheetStatus.getRangeCanEdit(point)===true;
    return result;
  });
  return base;
}

class TencentPermissions {
  constructor(browser,{now=()=>Date.now()}={}) {
    this.browser=browser;this.context=browser.context;this.now=now;this.records=new WeakMap();this.pending=new Set();this.observations=[];this.sequence=0;this.stopped=false;
    this.listeners={request:r=>this.onRequest(r),response:r=>this.onResponse(r),requestfailed:r=>this.onFailed(r)};
    for(const [event,fn] of Object.entries(this.listeners))this.context.on(event,fn);
  }
  reset(){this.observations=[];this.sequence++;}
  async current(check,page,config) {
    if(!check||check.observationSequence!==this.sequence||!this.sameScope(check,this.scope())||Date.parse(check.expiresAt)<=this.now()||page?.isClosed()||identity(page?.url())!==identity(config.documentUrl))return false;
    try {
      const frames=page.frames?.()||[page],values=[];
      for(const frame of frames)if(identity(frame.url())===identity(config.documentUrl))values.push(await frame.evaluate(readPermissionPage,{targets:[],types:rangeTypes}));
      if(values.length!==1)return false;
      const raw=values[0],last=this.lastModel;
      return !!last&&raw.realm===last.realm&&raw.revision===last.revision&&raw.fingerprint===last.fingerprint&&
        documentPermission(raw.primary,raw.secondary,raw.expired).value===check.document.value;
    }catch{return false;}
  }
  scope(){return {generation:this.browser.generation,pageGeneration:this.browser.pageGeneration,userGeneration:this.browser.authentication?.scopeVersion||0};}
  sameScope(a,b){return a.generation===b.generation&&a.pageGeneration===b.pageGeneration&&a.userGeneration===b.userGeneration;}
  onRequest(request) {
    try {
      if(this.stopped||request.frame().page()!==this.browser.page)return;
      const u=new URL(request.url());if(u.origin!=='https://docs.qq.com')return;
      let signal=u.pathname+' '+(request.postData()||'').slice(0,131072);try{signal=decodeURIComponent(signal);}catch{}
      if(!signal.toLowerCase().replace(/[^a-z]/g,'').includes('getuserrangeprivilege'))return;
      this.records.set(request,{...this.scope(),documentIdentity:identity(request.frame().url()),sequence:++this.sequence,requestedAt:this.now()});
      this.observations=[]; // A newer natural request invalidates the old server snapshot immediately.
    }catch{}
  }
  onFailed(request){if(this.records.get(request)?.sequence===this.sequence)this.observations=[];}
  onResponse(response) {
    const request=this.records.get(response.request());if(!request||this.stopped)return;
    const task=(async()=>{
      try {
        const value=rangeResponse(response.status(),await response.json());
        if(!this.stopped&&request.sequence===this.sequence&&this.sameScope(request,this.scope()))
          this.observations=[{...request,...value,observedAt:new Date(this.now()).toISOString()}];
      } catch {if(request.sequence===this.sequence)this.observations=[];}
    })();this.pending.add(task);void task.finally(()=>this.pending.delete(task));
  }
  async inspect(config,page,authentication) {
    const targets=normalizeTargets(config.permissionTargets);let scope=this.scope();
    let raw,permission={value:'unknown',reason:'page-initializing'},frame,stable,stableSince=this.now();
    const until=Date.now()+Math.min(6000,Math.max(50,(config.timeout||15)*1000));
    do {
      if(this.stopped||scope.generation!==this.browser.generation||page.isClosed()||page!==this.browser.page)return {documentAccess:'unknown',editPermission:'unknown',code:'PermissionPageChanged',permissionCheck:this.empty(targets,'page-changed',scope)};
      if(!this.sameScope(scope,this.scope())){scope=this.scope();raw=null;stable=undefined;stableSince=this.now();}
      if(identity(page.url())!==identity(config.documentUrl)){await new Promise(resolve=>setTimeout(resolve,100));continue;}
      try {
        const frames=typeof page.frames==='function'?page.frames().filter(f=>identity(f.url())===identity(config.documentUrl)):[page];
        const candidates=[];for(const candidate of frames){const value=await candidate.evaluate(readPermissionPage,{targets,types:rangeTypes});if(value.sheet||value.denied)candidates.push([candidate,value]);}
        if(candidates.length!==1){raw=null;}else {[frame,raw]=candidates[0];}
        if(raw) {
          permission=documentPermission(raw.primary,raw.secondary,raw.expired);
          const fingerprint=JSON.stringify([raw.realm,raw.revision,raw.fingerprint,raw.primary,raw.secondary,raw.expired]);
          if(fingerprint!==stable){stable=fingerprint;stableSince=this.now();}
          if(raw.denied||permission.value==='read-only'||(permission.value==='editable'&&raw.modelReady&&this.now()-stableSince>=250))break;
        }
      }catch(error){if(page.isClosed())break;raw=null;}
      await new Promise(resolve=>setTimeout(resolve,100));
    }while(Date.now()<until);
    let observedAt=new Date(this.now()).toISOString();const documentIdentity=identity(config.documentUrl);
    if(!raw||!this.sameScope(scope,this.scope())||identity(page.url())!==documentIdentity)return {documentAccess:'unknown',editPermission:'unknown',code:'PermissionInitializationTimeout',permissionCheck:this.empty(targets,'initialization-timeout',scope)};
    // Drain already-observed response readers within the same bounded check budget.
    await Promise.race([Promise.all([...this.pending]),new Promise(resolve=>{const timer=setTimeout(resolve,200);timer.unref?.();})]);
    await this.browser.authentication?.waitForObservation?.(1200);
    const latestAuth=await this.browser.authentication?.verify?.()||this.browser.authentication?.snapshot()||authentication;
    if(!this.sameScope(scope,this.scope())||page.isClosed()||identity(page.url())!==documentIdentity)return {documentAccess:'unknown',editPermission:'unknown',code:'PermissionPageChanged',permissionCheck:this.empty(targets,'page-changed',scope)};
    // Loading the model and receiving the account's range snapshot are independent phases.
    const needsRanges=raw.targets.some(t=>t.matches?.length),rangeUntil=Math.min(until,Date.now()+1800);
    while(needsRanges&&!this.observations.some(o=>this.sameScope(o,scope)&&o.documentIdentity===documentIdentity)&&Date.now()<rangeUntil) {
      if(!this.sameScope(scope,this.scope())||page.isClosed())break;
      await new Promise(resolve=>setTimeout(resolve,50));
    }
    try {
      const latest=await frame.evaluate(readPermissionPage,{targets,types:rangeTypes});
      if(!this.sameScope(scope,this.scope())||latest.realm!==raw.realm||latest.fingerprint!==raw.fingerprint)
        return {documentAccess:'unknown',editPermission:'unknown',code:'PermissionPageChanged',permissionCheck:this.empty(targets,'model-changed',scope)};
      raw=latest;permission=documentPermission(raw.primary,raw.secondary,raw.expired);
      observedAt=new Date(this.now()).toISOString();
    }catch{return {documentAccess:'unknown',editPermission:'unknown',code:'PermissionPageChanged',permissionCheck:this.empty(targets,'page-changed',scope)};}
    const observation=this.observations.find(o=>this.sameScope(o,scope)&&o.documentIdentity===documentIdentity&&this.now()-Date.parse(o.observedAt)<=rangeLifetimeMs);
    const privileges=new Map((observation?.records||[]).map(row=>[row.rangeId,row]));
    // Event/model changes after the first sample cannot reuse earlier range responses.
    const previous=this.lastModel;
    if(observation&&(observation.requestedAt<raw.policyChangedAt||
      (previous&&previous.realm===raw.realm&&previous.fingerprint!==raw.fingerprint&&observation.requestedAt<=previous.observedAt))) {
      this.observations=[];privileges.clear();
    }
    this.lastModel={realm:raw.realm,revision:raw.revision,fingerprint:raw.fingerprint,observedAt:this.now()};
    const modelReady=raw.modelReady&&permission.value!=='unknown'&&this.now()-stableSince>=250;
    const source='tencent-page-fields',evidence={source,observedAt,documentIdentity,...scope,pageRealm:String(raw.realm),permissionRevision:raw.revision};
    const results=targets.map((target,index)=>{
      const model=raw.targets[index]||{...target,matches:[],complete:false,reason:'range-model-incomplete',protection:'unknown'};
      const verdict=targetPermission({...model,accessDenied:raw.denied,complete:modelReady&&model.complete},permission.value,
        latestAuth.authenticationSource==='server'&&!latestAuth.authenticationStale&&this.browser.authentication?.principalScope?latestAuth.authentication:'unknown',privileges);
      return {sheetId:model.sheetId,sheetName:model.sheetName,address:target.address,label:target.label,
        protection:modelReady?model.protection:'unknown',...verdict,
        modelEvidence:{...evidence,source:'tencent-workbook-range-model'},
        rangeEvidence:observation&&model.matches.length&&model.matches.every(id=>privileges.has(id))?{...evidence,source:'tencent-natural-range-response',observedAt:observation.observedAt}:null};
    });
    return {editPermission:permission.value,documentAccess:raw.denied?'denied':raw.sheet?'allowed':'unknown',
      documentName:typeof raw.title==='string'?raw.title.replace(/\s*[-–—|]\s*腾讯文档\s*$/,'').trim().slice(0,300):null,
      code:permission.value==='unknown'?(permission.reason==='permission-conflict'?'PermissionConflict':'PermissionInitializationTimeout'):null,
      permissionCheck:{document:{value:permission.value,reason:permission.reason,...evidence},model:{value:modelReady?'complete':'unknown',reason:modelReady?'initialized-and-stable':'initialization-incomplete',...evidence,source:'tencent-workbook-range-model'},
        targets:results,checkedAt:observedAt,expiresAt:new Date(Math.min(this.now()+documentLifetimeMs,
          results.some(t=>t.rangeEvidence)?Date.parse(observation.observedAt)+rangeLifetimeMs:Infinity)).toISOString(),observationSequence:this.sequence,...scope}};
  }
  empty(targets,reason,scope=this.scope()){return {document:{value:'unknown',reason},model:{value:'unknown',reason},targets:targets.map(t=>({sheetId:t.sheetId,sheetName:t.sheetName,address:t.address,label:t.label,protection:'unknown',eligibility:'unknown',reason})),checkedAt:new Date(this.now()).toISOString(),expiresAt:new Date(this.now()).toISOString(),...scope};}
  dispose(){this.stopped=true;this.reset();for(const [event,fn] of Object.entries(this.listeners))this.context.off(event,fn);}
}
module.exports={TencentPermissions,readPermissionPage,rangeTypes,documentPermission,targetPermission,normalizeTargets,rangeResponse,documentLifetimeMs,rangeLifetimeMs};
