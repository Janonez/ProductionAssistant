'use strict';
// Real production renderer; all connection evidence here is an isolated UI fixture.
const {chromium,_electron}=require('playwright');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),dist=path.join(root,'src/ProductionAssistant.App/Assets/Prototype/dist');
const output=path.join(root,'artifacts/document-connection-ui');
const states={unconfigured:['','连接'],notConnected:['未连接','连接'],checking:['检测中…',null],connected:['已连接','打开文档'],restored:['已连接','打开文档'],notLoggedIn:['需要重新登录','扫码登录'],invalidLink:['不是表格链接','更换文档'],readOnly:['只读','打开文档'],accessDenied:['无编辑权限','重新检测']};
function installFixture() {
  const state=new URL(location.href).searchParams.get('fixture')||'notConnected';
  let receive;
  const config={documentUrl:state==='invalidLink'?'https://docs.qq.com/doc/fixture':'https://docs.qq.com/sheet/ui-fixture',fields:[],rules:{}};
  const evidence={state:'authenticated',browserOpen:true,authentication:'authenticated',authenticationSource:'server',authenticationObservedAt:'2026-11-16T01:30:00Z',documentAccess:'allowed',editPermission:'editable',verifiedAt:'2026-11-16T01:30:00Z',documentCheckedAt:'2026-11-16T01:30:00Z',documentType:'spreadsheet',documentIdentity:'https://docs.qq.com/sheet/ui-fixture',targetDocumentUrl:config.documentUrl,documentName:'集团生产日报（隔离模拟名称）'.repeat(24),message:''};
  const storageKey='pa.submission.last-connection.ui-fixture';
  localStorage.removeItem(storageKey);
  if(state==='restored')localStorage.setItem(storageKey,JSON.stringify({revision:1,checkedAt:evidence.documentCheckedAt,documentName:evidence.documentName}));
  const status=state==='connected'?evidence:state==='readOnly'?{...evidence,editPermission:'read-only'}:state==='notLoggedIn'?{...evidence,state:'login-required',authentication:'required',documentAccess:'unknown',editPermission:'unknown'}:state==='unavailable'?{...evidence,state:'unavailable',authentication:'unknown',documentAccess:'unknown',editPermission:'unknown'}:{...evidence,state:'closed',browserOpen:false,authentication:'unknown',documentAccess:'unknown',editPermission:'unknown',documentName:null,verifiedAt:null};
  let summary={configRevision:1,state:({connected:'Connected',readOnly:'ReadOnly',notLoggedIn:'NeedsLogin',accessDenied:'AccessDenied'})[state]||'NotConnected'};
  if(summary.state==='Connected')summary={...summary,confirmedAt:evidence.documentCheckedAt,documentName:evidence.documentName};
  window.uiCalls=[];
  window.chrome={webview:{addEventListener:(_,listener)=>{receive=listener;},postMessage:request=>{
    if(!request.id)return;
    window.uiCalls.push(request);
    let data={};
    if(request.operation==='automation.list')data={tasks:state==='unconfigured'?[]:[{id:'ui-fixture',name:'隔离 UI 夹具',taskType:'tencent_sheet_fill'}]};
    if(request.operation==='tencentSheet.get')data={id:'ui-fixture',config,configRevision:1};
    if(request.operation==='tencentSheet.runs')data={runs:[]};
    if(request.operation==='tencentSheet.getConnectionSummary')data=summary;
    if(request.operation==='tencentSheet.importConnectionSummaries'){
      window.acknowledgeLegacyConnection=()=>{
        const [entry]=request.payload.entries;
        if(entry)summary={...summary,state:'Connected',confirmedAt:entry.checkedAt,documentName:entry.documentName};
        receive({data:{id:request.id,ok:true,data:{acknowledged:true}}});
      };
      return;
    }
    if(request.operation==='groupSubmission.getConfiguration')data={revision:0,businesses:[],rules:{automatic:false,time:'09:00',weekdays:[1,2,3,4,5,6,0],missingData:'wait',retryMinutes:10,retryUntil:'18:00'},hasBusiness:false,nextRunAt:null,dataOptions:[]};
    if(request.operation==='tencentSheet.save'){config.documentUrl=request.payload.config.documentUrl;data={id:'ui-fixture',config,configRevision:2};}
    if(request.operation==='tencentSheet.create'){config.documentUrl=request.payload.documentUrl;data={id:'ui-fixture'};}
    if(request.operation.startsWith('tencentSheet.session')){
      if(state==='checking')return;
      data={...status,targetDocumentUrl:config.documentUrl};
    }
    queueMicrotask(()=>receive({data:{id:request.id,ok:true,data}}));
  }}};
}
async function main(){
  const electron=process.argv.includes('--electron'),kind=electron?'electron':'browser';
  await fs.mkdir(output,{recursive:true});
  let app,browser,server,temp;
  try{
    let page,baseUrl;
    if(electron){
      temp=await fs.mkdtemp(path.join(os.tmpdir(),'metis-document-ui-'));
      const desktop=path.join(root,'src/ProductionAssistant.Desktop');
      const {requireRuntime}=require(path.join(desktop,'lib/electron-runtime'));
      const env={...process.env,LOCALAPPDATA:path.join(temp,'local'),PRODUCTIONASSISTANT_DATA_DIR:path.join(temp,'data'),PRODUCTIONASSISTANT_DIST:dist};
      delete env.ELECTRON_RUN_AS_NODE;
      app=await _electron.launch({executablePath:requireRuntime(path.join(desktop,'node_modules/electron')).executable,args:[desktop,'--environment','Development'],env});
      page=await app.firstWindow();baseUrl='pa://app/index.html';
    } else {
      server=http.createServer(async(req,res)=>{
        try {
          const pathname=new URL(req.url,'http://localhost').pathname;
          const file=path.resolve(dist,'.'+(pathname==='/'?'/index.html':pathname));
          if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}
          res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');
          res.end(await fs.readFile(file));
        } catch {res.writeHead(404);res.end();}
      });
      await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
      browser=await chromium.launch({channel:'msedge',headless:true,args:['--no-proxy-server']});
      page=await browser.newPage();baseUrl='http://127.0.0.1:'+server.address().port+'/';
    }
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(installFixture);
    const measures=[];
    for(const theme of ['light','dark'])for(const width of [1400,960])for(const [state,[badge,primary]] of Object.entries(states)){
      if(app)await app.evaluate(({BrowserWindow},size)=>{const window=BrowserWindow.getAllWindows()[0];window.setContentSize(size.width,size.height);}, {width,height:width===960?600:860});
      else await page.setViewportSize({width,height:width===960?600:860});
      await page.emulateMedia({colorScheme:theme});
      await page.goto(baseUrl+'?route=daily-report&taskType=tencent_sheet_fill&fixture='+state);
      await page.getByRole('tab',{name:'设置',exact:true}).click();
      const item=page.locator('#submission-settings-web [data-slot=item]');
      if(state==='checking')await item.getByRole('button',{name:'连接',exact:true}).click();
      if(state==='restored'){
        await item.getByText('读取连接状态…',{exact:true}).waitFor();
        assert.equal(await item.getAttribute('data-connection-state'),'loadingSummary');
        assert.doesNotMatch(await item.innerText(),/未连接|检测中/);
        await page.waitForFunction(()=>typeof window.acknowledgeLegacyConnection==='function');
        const legacy=await page.evaluate(()=>JSON.parse(localStorage.getItem('pa.submission.last-connection.ui-fixture')));
        assert.equal(legacy.checkedAt,'2026-11-16T01:30:00Z');
        await page.evaluate(()=>window.acknowledgeLegacyConnection());
      }
      await page.locator('#submission-settings-web [data-slot=item][data-connection-state="'+(state==='restored'?'connected':state)+'"]').waitFor();
      await page.evaluate(()=>document.fonts.ready);
      assert.equal(await item.evaluate(element=>!!element.closest('.dark')),theme==='dark');
      const measure=await item.evaluate(element=>{
        const rect=element.getBoundingClientRect(),media=element.querySelector('[data-slot=item-media]'),icon=media.querySelector('svg').getBoundingClientRect(),style=getComputedStyle(element),actions=element.querySelector('[data-slot=item-actions]').getBoundingClientRect(),title=element.querySelector('[aria-label="文档名称"]');
        return {height:rect.height,left:rect.left,right:rect.right,icon:icon.width,iconX:icon.left-rect.left,border:style.borderTopWidth,mediaBackground:getComputedStyle(media).backgroundColor,actionsRight:actions.right,titleTruncated:title?title.scrollWidth>title.clientWidth:null,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert.equal(measure.height,56);assert.equal(measure.icon,20);assert.equal(measure.border,'1px');assert.equal(measure.mediaBackground,'rgba(0, 0, 0, 0)');assert.equal(measure.overflow,false);assert.ok(measure.actionsRight<=measure.right);
      const actions=item.locator('[data-slot=item-actions] > button:not([aria-label="文档更多操作"])');
      assert.equal(await actions.count(),primary?1:0);
      if(primary)assert.equal((await actions.textContent()).trim(),primary);
      if(['connected','restored'].includes(state))assert.match(await item.locator('[data-slot=badge]').textContent(),/^已连接 · .+确认$/);
      else if(badge)assert.equal(await item.locator('[data-slot=badge]').textContent(),badge);
      else assert.equal(await item.locator('[data-slot=badge]').count(),0);
      if(state==='connected')assert.equal(measure.titleTruncated,true);
      if(state==='checking'){assert.equal(await item.getByLabel('正在检测文档连接').count(),1);assert.equal(await item.getByRole('button',{name:'文档更多操作'}).isDisabled(),true);}
      if(state==='restored'){
        assert.equal(await page.evaluate(()=>window.uiCalls.some(call=>call.operation.startsWith('tencentSheet.session'))),false);
        assert.equal(await page.evaluate(()=>localStorage.getItem('pa.submission.last-connection.ui-fixture')),null);
        assert.equal(await page.evaluate(()=>window.uiCalls.filter(call=>call.operation==='tencentSheet.importConnectionSummaries').length),1);
      }
      if(state==='unconfigured'){
        const input=item.getByLabel('文档链接');
        assert.equal(await input.getAttribute('placeholder'),'粘贴腾讯文档链接');
        assert.equal(await actions.isDisabled(),true);
        assert.equal(await input.evaluate(element=>getComputedStyle(element).borderTopWidth),'0px');
        assert.equal(await input.evaluate(element=>getComputedStyle(element).backgroundColor),'rgba(0, 0, 0, 0)');
      }
      await page.locator('#submission-settings-web').screenshot({path:path.join(output,kind+'-'+theme+'-'+width+'-'+state+'.png')});
      measures.push({kind,theme,width,state,...measure});
      if(state==='unconfigured'&&width===960&&theme==='light'){
        await item.getByLabel('文档链接').fill('https://docs.qq.com/sheet/enter-fixture');
        await item.getByLabel('文档链接').press('Enter');
        await page.locator('#submission-settings-web [data-connection-state=notConnected]').waitFor();
        assert.equal(await page.evaluate(()=>window.uiCalls.filter(call=>call.operation==='tencentSheet.create').length),1);
      }
      if(state==='notConnected'&&width===960&&theme==='light'){
        const trigger=item.getByRole('button',{name:'文档更多操作'});
        await trigger.focus();await page.keyboard.press('ArrowDown');
        assert.deepEqual(await page.getByRole('menuitem').allTextContents(),['重新检测','更换文档','复制链接','清除登录状态']);
        await page.getByRole('menuitem',{name:'更换文档',exact:true}).click();
        assert.equal(await item.getByLabel('文档链接').inputValue(),'https://docs.qq.com/sheet/ui-fixture');
        await item.getByLabel('文档链接').fill('https://docs.qq.com/sheet/draft');
        await item.getByRole('button',{name:'取消',exact:true}).click();
        assert.equal(await item.getByLabel('文档链接').count(),0);
        assert.equal(await page.evaluate(()=>window.uiCalls.filter(call=>call.operation==='tencentSheet.save').length),0);
        await trigger.click();await page.getByRole('menuitem',{name:'清除登录状态',exact:true}).click();
        const dialog=page.getByRole('alertdialog');
        await dialog.getByText('全部腾讯文档和旧任务',{exact:false}).waitFor();
        assert.equal(await dialog.getByRole('button',{name:'清除登录状态',exact:true}).isDisabled(),false);
        await dialog.getByRole('button',{name:'取消',exact:true}).click();
      }
      if(state==='connected'&&width===1400&&theme==='light')await page.screenshot({path:path.join(output,kind+'-settings-fixture.png')});
    }
    assert.deepEqual(errors,[]);
    await fs.writeFile(path.join(output,kind+'-measurements.json'),JSON.stringify(measures,null,2));
    console.log('PASS '+kind+': '+measures.length+' isolated UI states, 56px Item, 20px icon, truncation, keyboard menu and cancellation. No live document, login clearing or business writes.');
  } finally {
    await app?.close();await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));
    if(temp){assert.ok(path.resolve(temp).startsWith(path.resolve(os.tmpdir())+path.sep));assert.ok(path.basename(temp).startsWith('metis-document-ui-'));await fs.rm(temp,{recursive:true,force:true});}
  }
}
module.exports=main;
if(require.main===module)main().catch(error=>{console.error(error);process.exitCode=1;});
