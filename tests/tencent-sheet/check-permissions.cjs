'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),{EventEmitter}=require('node:events');
const {TencentPermissions,documentPermission,targetPermission,normalizeTargets,rangeResponse,readPermissionPage,rangeTypes,rangeLifetimeMs}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/permissions.cjs');
const {permissionPage}=require('./fixtures/permission-page.cjs');
const url='https://docs.qq.com/sheet/fixture';
function realm(options={},clock=()=>Date.now()) {
  const context={window:{},document:{title:'合成日报 - 腾讯文档',querySelectorAll:()=>[]},performance:{timeOrigin:1},Date:class extends Date {static now(){return clock();}}};
  vm.createContext(context);vm.runInContext(permissionPage(options),context);
  return {context,read:targets=>vm.runInContext('('+readPermissionPage.toString()+')('+JSON.stringify({targets:normalizeTargets(targets),types:rangeTypes})+')',context)};
}
const target=address=>({sheetName:'合成工作表',address});
async function permissionChecks() {
  for(const [a,b,expected] of [[true,1,'editable'],[true,true,'editable'],[false,0,'read-only'],[false,false,'read-only'],[true,0,'unknown'],[false,1,'unknown'],[null,1,'unknown'],[true,null,'unknown'],[true,'1','unknown'],[true,2,'unknown']])assert.equal(documentPermission(a,b,false).value,expected);
  assert.equal(documentPermission(true,1,true).value,'unknown');assert.equal(documentPermission(true,1,undefined).value,'unknown');
  assert.equal(documentPermission(true,1,0).value,'editable');assert.equal(documentPermission(true,1,'0').value,'unknown');
  for(const item of [[{address:'A1'}],[{sheetName:'合成工作表',address:'XFE1'}],[{sheetId:'id',address:'A1048577'}]])assert.throws(()=>normalizeTargets(item));
  let fixture=realm(),raw=fixture.read([target('A25')]);
  assert.equal(raw.modelReady,true,'initialized zero-range document is valid');assert.equal(raw.targets[0].protection,'unprotected');
  assert.equal(targetPermission(raw.targets[0],'editable','authenticated',new Map()).eligibility,'eligible');
  fixture=realm({initializing:true});assert.equal(fixture.read([target('A25')]).modelReady,false,'empty initializing model never implies no protection');
  const regions=[{id:'blocked',sr:1,er:20,sc:0,ec:4},{id:'overlap',sr:5,er:10,sc:0,ec:1}];
  fixture=realm({ranges:regions});raw=fixture.read([target('A8'),target('A25')]);
  assert.deepEqual([...raw.targets[0].matches],['blocked','overlap']);assert.equal(raw.targets[1].protection,'unprotected');
  const allowedUnvalidated=new Map([['blocked',{rangePrivilege:2}],['overlap',{rangePrivilege:2}]]);
  assert.equal(targetPermission(raw.targets[0],'editable','authenticated',allowedUnvalidated).eligibility,'unknown');
  allowedUnvalidated.set('overlap',{rangePrivilege:1,isOwner:true});assert.equal(targetPermission(raw.targets[0],'editable','authenticated',allowedUnvalidated).eligibility,'unknown');
  allowedUnvalidated.set('overlap',{rangePrivilege:1,isOwner:false});assert.equal(targetPermission(raw.targets[0],'editable','authenticated',allowedUnvalidated).eligibility,'denied');
  assert.equal(targetPermission(raw.targets[0],'editable','authenticated',new Map()).eligibility,'unknown');
  assert.equal(targetPermission(raw.targets[1],'read-only','authenticated',new Map()).eligibility,'denied');
  assert.equal(targetPermission(raw.targets[1],'editable','required',new Map()).eligibility,'denied');
  assert.equal(targetPermission(raw.targets[1],'editable','unknown',new Map()).eligibility,'unknown');
  assert.equal(targetPermission({...raw.targets[1],accessDenied:true},'editable','authenticated',new Map()).eligibility,'denied');
  for(const region of [{sr:7,er:7,sc:0,ec:2147483647},{sr:0,er:2147483647,sc:0,ec:0},{sr:0,er:2147483647,sc:0,ec:2147483647}]) {
    assert.equal(realm({ranges:[region]}).read([target('A8')]).targets[0].protection,'protected','synthetic native row/column/all semantics');
  }
  assert.equal(realm({ranges:[{sr:-1,er:20,sc:0,ec:4}]}).read([target('A8')]).targets[0].complete,false);
  assert.equal(realm({ranges:[{sr:0,er:20,sc:0,ec:4,type:999}]}).read([target('A8')]).modelReady,false);
  assert.equal(realm({ranges:[{sr:0,er:20,sc:0,ec:4,type:rangeTypes.Private}]}).read([target('A8')]).targets[0].complete,false);
  assert.equal(realm().read([{sheetName:'其他表',address:'A1'}]).targets[0].complete,false);
  fixture=realm();const before=fixture.read([]).revision;fixture.context.window.SpreadsheetApp.event.rangeAuthEvent.trigger('rangeAuthChange');assert.ok(fixture.read([]).revision>before);
  const body={retcode:0,data:{isOwner:false,rangeCheckResList:[{rangeId:'blocked',rangePolicy:1,rangePrivilege:1,rangeOtherPrivilegeType:1}]}};
  assert.equal(rangeResponse(200,body).records.length,1);for(const b of [{...body,retcode:1},{...body,ret:1},{data:body.data},{retcode:0,data:{}}])assert.equal(rangeResponse(200,b).records.length,0);
  assert.equal(rangeResponse(500,body).records.length,0);
  const context=new EventEmitter();let now=1000,auth={authentication:'authenticated',authenticationSource:'server'};
  fixture=realm({ranges:regions.slice(0,1)},()=>now);
  const page={url:()=>url,isClosed:()=>false,evaluate:async(fn,arg)=>vm.runInContext('('+fn.toString()+')('+JSON.stringify(arg)+')',fixture.context)};
  const browser={context,page,generation:1,pageGeneration:1,authentication:{scopeVersion:1,principalScope:'synthetic-scope',snapshot:()=>auth}};
  const detector=new TencentPermissions(browser,{now:()=>now});
  const request={url:()=> 'https://docs.qq.com/service/rpc',postData:()=> 'service=get_user_range_privilege',frame:()=>({page:()=>page,url:()=>url})};
  context.emit('request',request);context.emit('response',{request:()=>request,status:()=>200,json:async()=>body});await Promise.all([...detector.pending]);
  assert.equal(detector.observations[0].records.length,1,'request-body dispatch works without a fixed URL');
  // Advance the injected monotonic policy clock on each sample so readiness settles without real-time sleeps.
  detector.now=()=>now+=100;
  let result=await detector.inspect({documentUrl:url,permissionTargets:[target('A8'),target('A25')],timeout:1},page,auth);
  assert.equal(result.permissionCheck.targets[0].eligibility,'denied');assert.equal(result.permissionCheck.targets[1].eligibility,'eligible');
  assert.equal(await detector.current(result.permissionCheck,page,{documentUrl:url}),true);
  fixture.context.window.SpreadsheetApp.event.rangeAuthEvent.trigger('rangeAuthChange');assert.equal(await detector.current(result.permissionCheck,page,{documentUrl:url}),false);
  result=await detector.inspect({documentUrl:url,permissionTargets:[target('A8')],timeout:1},page,auth);assert.equal(result.permissionCheck.targets[0].eligibility,'unknown','permission event invalidates server rows');
  context.emit('request',request);context.emit('response',{request:()=>request,status:()=>200,json:async()=>body});await Promise.all([...detector.pending]);
  result=await detector.inspect({documentUrl:url,permissionTargets:[target('A8')],timeout:1},page,auth);assert.equal(result.permissionCheck.targets[0].eligibility,'denied','fresh natural observation after policy change recovers');
  now+=rangeLifetimeMs+1;result=await detector.inspect({documentUrl:url,permissionTargets:[target('A8')],timeout:1},page,auth);assert.equal(result.permissionCheck.targets[0].eligibility,'unknown','expired range observations are not reused');
  browser.pageGeneration++;assert.equal(await detector.current(result.permissionCheck,page,{documentUrl:url}),false);
  browser.authentication.scopeVersion++;assert.equal(await detector.current(result.permissionCheck,page,{documentUrl:url}),false);
  context.emit('request',request);browser.pageGeneration++;context.emit('response',{request:()=>request,status:()=>200,json:async()=>body});await Promise.all([...detector.pending]);assert.equal(detector.observations.length,0,'late response cannot cross page generations');
  const secondRequest={...request,frame:()=>({page:()=>page,url:()=> 'https://docs.qq.com/sheet/other'})};
  context.emit('request',secondRequest);context.emit('response',{request:()=>secondRequest,status:()=>200,json:async()=>body});await Promise.all([...detector.pending]);
  result=await detector.inspect({documentUrl:url,permissionTargets:[target('A8')],timeout:1},page,auth);assert.equal(result.permissionCheck.targets[0].eligibility,'unknown','document observations are isolated');
  fixture=realm({initializing:true});result=await detector.inspect({documentUrl:url,permissionTargets:[target('A25')],timeout:.01},page,auth);assert.equal(result.permissionCheck.targets[0].eligibility,'unknown');
  detector.dispose();assert.equal(context.listenerCount('request'),0);
  console.log('PASS permissions unit/Mock: strict fields, initialization/zero ranges, native model shapes, overlap, unvalidated=2, scoped natural responses, expiry/events/navigation/user changes, errors and bounded timeout');
}
if(require.main===module)permissionChecks().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={permissionChecks};
