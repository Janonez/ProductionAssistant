'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {TencentSession}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/session.cjs');
async function clearChecks() {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'metis-clear-'));
  const profile=path.join(root,'tencent-sheet-profile'),outside=path.join(root,'tencent-sheet-jobs.json'),production=path.join(root,'production-profile');
  const config={documentUrl:'https://docs.qq.com/sheet/fixture',confirmClear:true};
  let closes=0,ensures=0,busy=false;
  const browser={profile,context:{},generation:4,authentication:{snapshot:()=>({authentication:'authenticated'})},
    ensureContext:async()=>{ensures++;if(busy)throw Object.assign(Error('busy'),{code:'ProfileBusy'});},
    close:async()=>{closes++;browser.context=null;browser.authentication=null;browser.generation++;}};
  const session=new TencentSession(browser);
  const reset=async()=>{await fs.mkdir(profile,{recursive:true});await fs.writeFile(path.join(profile,'synthetic-cookie'),'synthetic');};
  try {
    await reset();await fs.writeFile(outside,'synthetic configuration and history');await fs.mkdir(production);await fs.writeFile(path.join(production,'keep'),'synthetic');
    assert.equal((await session.run('sessionClear',{...config,confirmClear:false})).code,'ClearConfirmationRequired');assert.equal(ensures,0);assert.equal(closes,0);
    browser.profile=path.join(root,'Default');
    assert.equal((await session.run('sessionClear',config)).code,'ClearScopeUnverified');assert.equal(ensures,0);browser.profile=profile;
    const originalRealpath=fs.realpath;
    fs.realpath=async input=>input===profile?path.join(root,'unexpected-target'):originalRealpath(input);
    try {assert.equal((await session.run('sessionClear',config)).code,'ClearScopeUnverified');assert.equal(ensures,0);}
    finally {fs.realpath=originalRealpath;}
    busy=true;
    assert.equal((await session.run('sessionClear',config)).code,'ProfileBusy');assert.equal(closes,0);assert.equal(await fs.readFile(path.join(profile,'synthetic-cookie'),'utf8'),'synthetic');
    busy=false;session.login={id:'synthetic-task',timer:setTimeout(()=>{},60000)};
    const cleared=await session.run('sessionClear',config);
    assert.equal(cleared.code,'LoginCleared');assert.equal(cleared.authentication,'unknown');assert.equal(session.login,null);assert.equal(closes,1);
    await assert.rejects(fs.stat(profile),{code:'ENOENT'});
    assert.equal(await fs.readFile(outside,'utf8'),'synthetic configuration and history');assert.equal(await fs.readFile(path.join(production,'keep'),'utf8'),'synthetic');
    await reset();const originalRemove=fs.rm;
    fs.rm=async(target,options)=>{assert.equal(target,await fs.realpath(profile));assert.equal(options.force,false);assert.equal(options.maxRetries,0);await fs.unlink(path.join(target,'synthetic-cookie'));await fs.writeFile(path.join(target,'retained'),'synthetic');throw Object.assign(Error('synthetic locked file'),{code:'EBUSY'});};
    try {assert.equal((await session.run('sessionClear',config)).code,'ClearIncomplete');}
    finally {fs.rm=originalRemove;}
    assert.equal(await fs.readFile(outside,'utf8'),'synthetic configuration and history');
    console.log('PASS clear: explicit confirmation, canonical dedicated profile scope, external occupancy, owned close, QR invalidation, outside configuration/environment preservation and truthful incomplete failure');
  } finally {
    session.releaseLogin();
    assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep)&&path.basename(root).startsWith('metis-clear-'));
    await fs.rm(root,{recursive:true,force:false});
  }
}
if(require.main===module)clearChecks().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={clearChecks};
