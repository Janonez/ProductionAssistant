'use strict';
const assert=require('node:assert/strict');
const {assertNoLogin}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/site-adapter.cjs');

function frame({child=false,visible=true,login=0,elementError,countError}={}) {
  return {
    parentFrame:()=>child?{}:null,
    frameElement:async()=>{
      if(elementError)throw elementError;
      return {isVisible:async()=>visible};
    },
    url:()=>'about:blank',
    locator:()=>({filter:()=>({count:async()=>{
      if(countError)throw countError;
      return login;
    }})}),
  };
}

function page(...snapshots) {
  let scans=0;
  return {isClosed:()=>false,frames:()=>snapshots[Math.min(scans++,snapshots.length-1)],scans:()=>scans};
}

async function browserCheck() {
  const {chromium}=require('playwright');
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    const document=await browser.newPage();
    for(const showLogin of [false,true]) {
      await document.setContent('<iframe id="embedded"></iframe>');
      const stale=document.frames().find(frame=>frame!==document.mainFrame());
      const original=stale.frameElement.bind(stale);
      stale.frameElement=async()=>{
        await document.locator('#embedded').evaluate(element=>element.remove());
        if(showLogin)await document.evaluate(()=>{
          const dialog=document.createElement('dialog');dialog.textContent='请先登录';dialog.open=true;document.body.append(dialog);
        });
        return original();
      };
      if(showLogin)await assert.rejects(assertNoLogin(document),error=>error.code==='LoginRequired');
      else await assertNoLogin(document);
      assert.equal(stale.isDetached(),true);
    }
    console.log('PASS browser: real iframe removal recovers and replacement login blocks; local content only, no business input');
  } finally {await browser.close();}
}

async function main() {
  for(const message of ['frame.frameElement: Frame has been detached.','Frame was detached']) {
    const stale=frame({child:true,elementError:Error(message)});
    const replacement=page([frame(),stale],[frame(),frame({child:true})]);
    await assertNoLogin(replacement);
    assert.equal(replacement.scans(),2,'use a fresh frame list after detachment');

    const loginReplacement=page([stale],[frame({login:1})]);
    await assert.rejects(assertNoLogin(loginReplacement),error=>error.code==='LoginRequired');
    assert.equal(loginReplacement.scans(),2,'the replacement page must still be checked for login');
  }
  const duringQuery=page([frame({countError:Error('locator.count: Frame has been detached.')})],[frame()]);
  await assertNoLogin(duringQuery);
  assert.equal(duringQuery.scans(),2,'detachment can also happen during the DOM query');

  const original=Error('frame.frameElement: Frame has been detached.');
  const unstable=page([frame({child:true,elementError:original})]);
  await assert.rejects(assertNoLogin(unstable),error=>error===original);
  assert.equal(unstable.scans(),3,'persistent frame churn is bounded and preserves the error');

  for(const message of ['Target page, context or browser has been closed','Timeout 3000ms exceeded','Invalid selector']) {
    const error=Error(message),failed=page([frame({child:true,elementError:error})]);
    await assert.rejects(assertNoLogin(failed),actual=>actual===error);
    assert.equal(failed.scans(),1,'other errors must not be retried');
  }
  const visibleLogin=page([frame({login:1})]);
  await assert.rejects(assertNoLogin(visibleLogin),error=>error.code==='LoginRequired');
  assert.equal(visibleLogin.scans(),1);
  const hidden=page([frame(),frame({child:true,visible:false,countError:Error('hidden frame must not be queried')})]);
  await assertNoLogin(hidden);
  assert.equal(hidden.scans(),1);
  console.log('PASS: detached-frame scans refresh, replacement login blocks, persistent churn is bounded, other errors propagate; no browser or business writes');
  if(process.argv.includes('--browser'))await browserCheck();
}
main().catch(error=>{console.error(error);process.exitCode=1;});
