'use strict';
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../../src/ProductionAssistant.App/Assets/Prototype/dist');
async function checkBreadcrumbLayout(page){
  const layout=await page.evaluate(()=>{
    const header=document.querySelector('[aria-label="页面工具栏"]'),breadcrumb=header.querySelector('[data-slot="breadcrumb"]'),current=breadcrumb.querySelector('[data-slot="breadcrumb-page"]'),group=breadcrumb.querySelector('[data-slot="breadcrumb-item"] span'),actions=header.querySelector('[aria-label="打开设置"]').parentElement,style=getComputedStyle(breadcrumb);
    return {count:header.querySelectorAll('[data-slot="breadcrumb"]').length,height:header.getBoundingClientRect().height,overflow:header.scrollWidth>header.clientWidth,breadcrumbRight:breadcrumb.getBoundingClientRect().right,actionsLeft:actions.getBoundingClientRect().left,border:parseFloat(style.borderTopWidth)+parseFloat(style.borderRightWidth)+parseFloat(style.borderBottomWidth)+parseFloat(style.borderLeftWidth),background:style.backgroundColor,shadow:style.boxShadow,currentColor:getComputedStyle(current).color,groupColor:getComputedStyle(group).color};
  });
  assert.equal(layout.count,1);assert.equal(layout.height,64);assert.equal(layout.overflow,false);
  assert.ok(layout.breadcrumbRight<=layout.actionsLeft+1,'breadcrumb must not overlap Header actions');
  assert.equal(layout.border,0);assert.equal(layout.background,'rgba(0, 0, 0, 0)');assert.equal(layout.shadow,'none');
  assert.notEqual(layout.currentColor,layout.groupColor);
}
async function groupLayout(page){
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>![...document.querySelector('[aria-label="集团填报工作台"]').getAnimations({subtree:true})].some(animation=>animation.playState==='running'&&Number.isFinite(animation.effect?.getComputedTiming().endTime)));
  return page.evaluate(()=>{
    const workbench=document.querySelector('[aria-label="集团填报工作台"]'),scroll=document.querySelector('.pa-page-scroll'),panel=workbench.querySelector('[role="tabpanel"][data-state="active"]');
    // Compare the shared panel boundary and its immediate content across top-level tabs.
    return {left:workbench.getBoundingClientRect().left,width:workbench.getBoundingClientRect().width,contentLeft:panel.getBoundingClientRect().left,contentWidth:panel.firstElementChild?.getBoundingClientRect().width,tabLeft:workbench.querySelector('[role="tablist"]').getBoundingClientRect().left,clientWidth:scroll.clientWidth,scrollWidth:scroll.offsetWidth,gutter:getComputedStyle(scroll).scrollbarGutter,overflow:scroll.scrollHeight>scroll.clientHeight};
  });
}
async function main(){
  await fs.mkdir(path.resolve(__dirname,'../../artifacts'),{recursive:true});
  const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const file=path.resolve(dist,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true,ignoreDefaultArgs:['--hide-scrollbars'],args:['--no-proxy-server']});
  const page=await browser.newPage({viewport:{width:1200,height:900}}),pageErrors=[];
  page.on('pageerror',error=>pageErrors.push(error.message));
  try{
    await page.addInitScript(()=>{
      let receive;
      const config={documentUrl:'https://docs.qq.com/sheet/fixture',fields:[],rules:{}};
      window.chrome={webview:{addEventListener:(_,fn)=>receive=fn,postMessage:request=>{
        if(!request.id)return;
        window.operations=(window.operations||[]).concat(request.operation);
        let data=request.operation==='automation.list'?{availableTaskTypes:['daily_report','notion_fill','tencent_sheet_fill'],tasks:[{id:'fixture',taskType:'tencent_sheet_fill',taskTypeName:'腾讯文档填报',name:'生产月报填报（本地测试数据）',schedule:'手动测试',isEnabled:false,schedulingAvailable:false,status:'pending-test',connectionStatus:'腾讯文档',lastRun:'暂无运行记录'}]}:request.operation==='tencentSheet.get'?{id:'fixture',config,businessDate:'2026-08-31'}:{};
        if(request.operation==='tencentSheet.create'){config.documentUrl=request.payload.documentUrl;data={id:'fixture'};}
        if(request.operation==='tencentSheet.runs')data={runs:[{id:'old-run',businessDate:'2026-08-30',time:'2026-08-31 08:30:00',source:'automatic',status:'失败或待确认',phase:'write',error:'刷新回读未确认',data:[{Id:'cut',Name:'下料量',Value:0,Unit:'吨',Source:'本地历史来源',Period:'2026-08-30',RecordCount:1}]}]};
        if(request.operation==='tencentSheet.runs'&&Number.isInteger(window.historyCount))data.runs=Array.from({length:window.historyCount},(_,index)=>({...data.runs[0],id:`run-${index}`}));
        if(request.operation.startsWith('tencentSheet.session')){
          window.sessionOperations=(window.sessionOperations||[]).concat(request.operation);
          if(request.operation.endsWith('Open'))window.sessionState='login-required';
          if(request.operation.endsWith('Close'))window.sessionState='closed';
          const state=window.sessionState||'closed',authenticated=['authenticated','access-denied'].includes(state);
          data={state,browserOpen:state!=='closed',authentication:authenticated?'authenticated':state==='login-required'?'required':'unknown',documentAccess:state==='authenticated'?'allowed':state==='access-denied'?'denied':'unknown',editPermission:'unknown',verifiedAt:null,message:'本地会话 UI 测试状态'};
        }
        if(request.operation==='tencentSheet.save'){Object.assign(config,request.payload.config);window.savedConfig=request.payload.config;data={id:'fixture',config,businessDate:'2026-08-31'};}
        if(request.operation==='tencentSite.open')data={message:'已打开本地模拟文档'};
        if(request.operation==='tencentSite.pick')data={controls:{...request.payload.controls,[request.payload.key]:{frame:[],strategies:[{}],sampleText:'示例工作表'}},message:request.payload.key==='sheetTab'?'已识别 12 个同类 Sheet 标签。':'已录制单元格名称框。'};
        if(request.operation==='tencentSite.pick' && request.payload.key==='cellAddressBox')data.testCell={sheet:'下料/装焊（26年9月）',address:'Z9'};
        if(request.operation==='tencentSite.captureCell')data={testCell:{sheet:'下料/装焊（26年9月）',address:'AA20'},message:'已读取临时测试格'};
        if(request.operation==='tencentSite.testSheet')data={controls:request.payload.controls,passed:true,steps:[{label:'找到 Sheet 标签集合',detail:'2 个标签',names:['下料/装焊（26年8月）','下料/装焊（26年9月）']},{label:'本月匹配与选中状态',detail:'下料/装焊（26年9月）；已选中，无需再次点击'}],message:'Sheet 检验通过，请继续配置单元格控件。'};
        if(request.operation==='tencentSite.test')data={token:'test-receipt',steps:['找到 Sheet 标签集合','按名称找到并切换工作表','找到单元格名称框','名称框定位 Y9','核对名称框地址'].map(label=>({label,detail:'本地模拟通过'})),message:'5 项适配测试全部通过，可以保存。'};
        if(request.operation==='tencentSite.save'){window.controlsTask=request.payload.id;config.webControls=request.payload.controls;data={message:'已保存本任务控件'};}
        if(request.operation==='tencentSheet.addField'){config.fields.push({id:'custom',name:request.payload.name,unit:request.payload.unit});data={id:'fixture',config,businessDate:'2026-08-31'};}
        if(request.operation==='tencentSheet.sources')data={sources:[{id:'source',name:'质量数据库'}]};
        if(request.operation==='tencentSheet.schema')data={fields:[{id:'value',name:'合格件数',type:'number'},{id:'date',name:'生产日期',type:'date'}]};
        if(request.operation==='tencentSheet.updateField'){Object.assign(config.fields[0],{notion:request.payload.notion});data={id:'fixture',config,businessDate:'2026-08-31'};}
        if(request.operation==='tencentSheet.fetch')data={dataToken:'notion-proof',date:'2026-08-31',values:{custom:12},rows:[{id:'custom',name:'合格数量',unit:'件',value:12,source:'质量数据库',period:'2026-08-31',recordCount:2}]};
        if(request.operation==='tencentSheet.inspect')data={date:'2026-08-31',sheet:'质量月报',token:'write-proof',conflict:false,rows:[{label:'合格数量',address:'F30',value:12,current:''}],message:'本地位置检查通过'};
        if(request.operation==='tencentSheet.write'){window.written=request.payload;data={message:'本地模拟填报完成'};}
        if(request.operation==='tencentSheet.backgroundTest'){window.backgroundTest=request.payload;data={message:'后台模拟填报完成'};}
        if(request.operation==='tencentSheet.teach') {
          const {stage,slot}=request.payload,order=['firstTarget','secondTarget','dateHeader','label'];
          if(stage==='start'){window.teachingDate=request.payload.firstDate;data={sessionToken:'fixture-session',step:'firstTarget',sheetMode:'monthly'};}
          if(stage==='capture')data={step:order[order.indexOf(slot)+1]||'preview',slot,capture:{address:{firstTarget:'F9',secondTarget:'F12',dateHeader:'A9',label:'F2'}[slot],value:'本地测试'}};
          if(stage==='preview')data={step:'confirm',previewToken:'fixture-proof',prediction:{date:'2026-08-03',address:'F15'},rule:{rowStep:3,columnStep:0,dateAnchor:{format:'{yyyy}/{M}/{d}'},labelAnchor:{expected:'合格数量'}}};
          if(stage==='confirm'){config.rules.custom={rowStep:3,columnStep:0};data={step:'done',message:'已保存位置'};}
        }
        queueMicrotask(()=>{
          const response={id:request.id,ok:true,data};
          receive({data:response});
          if(request.operation==='tencentSheet.backgroundTest')window.backgroundResponse=response;
        });
      }}};
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/?route=daily-report`);
    await page.getByRole('button',{name:'生产月报填报（本地测试数据）',exact:true}).waitFor();
    assert.deepEqual(await page.locator('[data-slot="breadcrumb-item"]').allTextContents(),['工作管理','任务清单']);
    await page.evaluate(()=>{
      window.groupFlashes=[];
      window.groupObserver=new MutationObserver(()=>{
        if(document.querySelector('[data-current-page-title]')?.textContent==='集团填报'){
          const legacy=document.querySelector('.automation-list-page');
          if(legacy)window.groupFlashes.push(legacy.textContent);
        }
      });
      window.groupObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
    });
    await page.getByRole('button',{name:'集团填报',exact:true}).click();
    await page.getByRole('heading',{name:'集团填报',exact:true}).waitFor();
    assert.deepEqual(await page.locator('[data-slot="breadcrumb-item"]').allTextContents(),['数据报送','集团填报']);
    assert.equal(await page.locator('[data-slot="breadcrumb"] a').count(),0,'navigation categories have no link target');
    assert.equal(await page.getByRole('button',{name:'集团填报',exact:true}).getAttribute('aria-current'),'page');
    const workbench=page.getByRole('region',{name:'集团填报工作台',exact:true});
    assert.deepEqual(await workbench.getByRole('tab').allTextContents(),['概览','记录','设置']);
    assert.equal(await workbench.locator('.automation-list-page').count(),0);
    assert.equal(await workbench.getByRole('button',{name:'新建任务',exact:true}).count(),0);
    assert.equal(await workbench.getByRole('table',{name:'本次填报数据'}).locator('tbody tr').count(),4);
    assert.equal(await workbench.getByLabel('填报日期',{exact:true}).inputValue(),'2026-08-31');
    assert.deepEqual(await page.evaluate(()=>{window.groupObserver.disconnect();return window.groupFlashes;}),[],'no automation task content while entering the cold group route');
    await page.setViewportSize({width:1600,height:900});
    const shortLayout=await groupLayout(page);
    await workbench.getByRole('tab',{name:'设置',exact:true}).click();
    const tallLayout=await groupLayout(page);
    console.log('Group layout measurement:',JSON.stringify({shortLayout,tallLayout}));
    assert.equal(shortLayout.gutter,'stable');assert.equal(tallLayout.gutter,'stable');
    assert.equal(shortLayout.overflow,false);
    assert.equal(shortLayout.left,tallLayout.left);assert.equal(shortLayout.width,tallLayout.width);
    await workbench.getByRole('tab',{name:'概览',exact:true}).click();
    await page.setViewportSize({width:1200,height:900});
    assert.equal(await workbench.locator('[data-slot=table]').evaluate(el=>!!el.closest('[data-shadcn-surface]')&&!el.closest('.pa-legacy-content')),true);
    await workbench.getByRole('button',{name:'检查文档连接',exact:true}).click();
    const connectionInput=workbench.getByLabel('文档链接',{exact:true});
    await connectionInput.fill('https://docs.qq.com/sheet/t2-saved');
    assert.equal(await workbench.locator('[data-connection-state=idle]').count(),1);
    assert.equal(await workbench.locator('[data-slot=input-group]').count(),1);
    await workbench.getByRole('tab',{name:'概览',exact:true}).click();
    await workbench.getByRole('tab',{name:'设置',exact:true}).click();
    assert.equal(await connectionInput.inputValue(),'https://docs.qq.com/sheet/t2-saved');
    await workbench.getByRole('button',{name:'保存',exact:true}).click();
    await workbench.getByRole('status').filter({hasText:/^已保存$/}).waitFor();
    assert.deepEqual(await page.evaluate(()=>window.savedConfig),{documentUrl:'https://docs.qq.com/sheet/t2-saved'});
    await workbench.getByRole('tab',{name:'记录',exact:true}).click();
    await workbench.getByRole('table',{name:'集团填报历史'}).getByRole('cell',{name:'失败或待确认',exact:true}).waitFor();
    await workbench.getByRole('button',{name:'查看 2026-08-31 08:30:00 的填报详情',exact:true}).click();
    const historyDialog=page.getByRole('dialog',{name:'填报详情',exact:true});
    await historyDialog.getByRole('cell',{name:'0 吨',exact:true}).waitFor();
    await historyDialog.getByText('刷新回读未确认',{exact:true}).waitFor();
    await historyDialog.getByRole('button',{name:'关闭',exact:true}).click();
    await workbench.getByRole('tab',{name:'概览',exact:true}).click();
    for(const width of [1600,960]){
      await page.setViewportSize({width,height:900});
      const reference=await groupLayout(page);
      for(const count of [0,60]){
        await page.evaluate(count=>window.historyCount=count,count);
        for(const tab of ['记录','设置','概览']){
          await workbench.getByRole('tab',{name:tab,exact:true}).click();
          if(tab==='记录'){
            if(count===0)await workbench.getByRole('cell',{name:'暂无执行记录。',exact:true}).waitFor();
            else await page.waitForFunction(count=>document.querySelector('[aria-label="集团填报历史"] tbody')?.rows.length===count,count);
          }
          const current=await groupLayout(page);
          assert.deepEqual(await page.locator('[data-slot="breadcrumb-item"]').allTextContents(),['数据报送','集团填报'],'page tabs do not create route levels');
          for(const key of ['left','width','contentLeft','contentWidth','tabLeft','clientWidth'])assert.equal(current[key],reference[key],`${width}px / ${count} history rows / ${tab} / ${key}`);
          if(tab==='记录')assert.equal(current.overflow,count>0);
        }
      }
      console.log(`PASS: stable tab and content edges at ${width}px with empty/60-row history and settings navigation, after finite animations finish`);
    }
    await page.evaluate(()=>delete window.historyCount);
    await page.setViewportSize({width:1200,height:900});
    await page.evaluate(()=>document.fonts.ready);
    for(const width of [1100,960,720]){
      await page.setViewportSize({width,height:760});
      assert.equal(await workbench.evaluate(el=>el.scrollWidth>el.clientWidth),false,`group workbench overflow at ${width}`);
      await checkBreadcrumbLayout(page);
    }
    await page.setViewportSize({width:390,height:760});
    await checkBreadcrumbLayout(page);
    await page.locator('[aria-label="页面工具栏"]').screenshot({path:path.resolve(__dirname,'../../artifacts/global-breadcrumb-narrow.png')});
    await page.setViewportSize({width:1200,height:900});
    await page.locator('[data-slot="sidebar-trigger"]').click();
    await page.waitForFunction(()=>![...document.querySelector('[data-slot="sidebar-wrapper"]').getAnimations({subtree:true})].some(animation=>animation.playState==='running'&&Number.isFinite(animation.effect?.getComputedTiming().endTime)));
    await checkBreadcrumbLayout(page);
    assert.deepEqual(await page.locator('[data-slot="breadcrumb-item"]').allTextContents(),['数据报送','集团填报']);
    await page.locator('[data-slot="sidebar-trigger"]').click();
    await page.waitForFunction(()=>![...document.querySelector('[data-slot="sidebar-wrapper"]').getAnimations({subtree:true})].some(animation=>animation.playState==='running'&&Number.isFinite(animation.effect?.getComputedTiming().endTime)));
    await checkBreadcrumbLayout(page);
    await page.locator('[aria-label="页面工具栏"]').screenshot({path:path.resolve(__dirname,'../../artifacts/global-breadcrumb-desktop.png')});
    console.log('PASS: official global Breadcrumb updates on navigation, ignores page tabs and fits 390/720/960/1100/1200px Headers with expanded/collapsed sidebar');
    await workbench.screenshot({path:path.resolve(__dirname,'../../artifacts/group-submission-workbench.png')});
    assert.equal((await page.evaluate(()=>window.operations)).some(operation=>['tencentSheet.fetch','tencentSheet.inspect','tencentSheet.write','tencentSheet.backgroundTest','automation.setEnabled'].includes(operation)),false);
    console.log('PASS: independent group business route, real-operation link save contract, draft retention, existing history snapshot and responsive shadcn surface');
    await require('./check-business-configuration.cjs')(page);
    // Keep the full original recording, teaching and write-contract regression through its remaining consumer.
    await page.getByRole('button',{name:'任务清单',exact:true}).click();
    await page.getByRole('heading',{name:'任务清单',exact:true}).waitFor();
    assert.equal(await page.getByRole('button',{name:'网页适配配置',exact:true}).count(),0);
    await page.getByRole('button',{name:'新建任务',exact:true}).click();
    const createDialog=page.getByRole('dialog',{name:'新建自动化任务',exact:true});
    await createDialog.getByRole('button',{name:'腾讯文档填报',exact:false}).waitFor();
    assert.equal(await createDialog.getByLabel('文档分享链接',{exact:true}).count(),0,'the unfiltered task list requires an explicit task type');
    await createDialog.getByRole('button',{name:'腾讯文档填报',exact:false}).click();
    await createDialog.getByRole('heading',{name:'新建文档填报任务',exact:true}).waitFor();
    await createDialog.getByLabel('文档分享链接',{exact:true}).fill('https://docs.qq.com/sheet/fixture');
    console.log('PASS: legacy task list selects the Tencent task type before showing its document form');
    assert.equal(await page.getByRole('button',{name:'录制网页控件',exact:true}).count(),0);
    await page.getByRole('button',{name:'创建并配置',exact:true}).click();
    const session=page.getByRole('region',{name:'腾讯文档登录与会话',exact:true});
    const sessionSummary=session.getByRole('status').getByRole('paragraph');
    await sessionSummary.filter({hasText:/^浏览器已关闭$/}).waitFor();
    assert.deepEqual(await session.getByRole('definition').allTextContents(),['已关闭','未知','未知']);
    assert.equal(await page.getByRole('button',{name:'读取当前状态',exact:true}).count(),0);
    assert.ok((await page.evaluate(()=>window.sessionOperations)).includes('tencentSheet.sessionStatus'));
    await page.getByRole('button',{name:'打开并检查',exact:true}).click();
    await sessionSummary.filter({hasText:/^等待登录$/}).waitFor();
    assert.deepEqual(await session.getByRole('definition').allTextContents(),['运行中','需要登录','未知']);
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-session-integrated.png')});
    await page.setViewportSize({width:390,height:760});
    assert.equal(await session.evaluate(el=>el.scrollWidth>el.clientWidth),false);
    await page.setViewportSize({width:1200,height:900});
    await page.evaluate(()=>window.sessionState='authenticated');
    await page.getByRole('button',{name:'重新检查',exact:true}).click();
    await sessionSummary.filter({hasText:/^登录与访问已确认$/}).waitFor();
    assert.deepEqual(await session.getByRole('definition').allTextContents(),['运行中','已登录','可访问']);
    assert.equal(await sessionSummary.filter({hasText:/^编辑权限：未知（本阶段不试写）$/}).count(),1);
    await page.evaluate(()=>window.sessionState='access-denied');
    await page.getByRole('button',{name:'重新检查',exact:true}).click();
    await sessionSummary.filter({hasText:/^无文档访问权限$/}).waitFor();
    assert.equal(await session.getByRole('definition').filter({hasText:/^已登录$/}).count(),1);
    await page.evaluate(()=>window.sessionState='unverified');
    await page.getByRole('button',{name:'重新检查',exact:true}).click();
    await sessionSummary.filter({hasText:/^尚未确认$/}).waitFor();
    assert.equal(await session.getByRole('definition').filter({hasText:/^未知$/}).count(),2);
    await page.getByRole('button',{name:'关闭浏览器',exact:true}).click();
    await sessionSummary.filter({hasText:/^浏览器已关闭$/}).waitFor();
    assert.deepEqual(await session.getByRole('definition').allTextContents(),['已关闭','未知','未知']);
    assert.equal((await page.evaluate(()=>window.sessionOperations)).at(-1),'tencentSheet.sessionClose');
    assert.deepEqual([...new Set(await page.evaluate(()=>window.sessionOperations))].sort(),['tencentSheet.sessionClose','tencentSheet.sessionOpen','tencentSheet.sessionStatus','tencentSheet.sessionVerify']);
    await page.getByRole('tab',{name:'网页控件',exact:true}).click();
    await page.getByRole('heading',{name:'网页控件录制',exact:true}).waitFor();
    assert.equal(await page.getByRole('button',{name:'开始配置',exact:true}).count(),0,'configuration is opt-in, independent of login');
    await page.getByRole('button',{name:'录制网页控件',exact:true}).click();
    assert.equal(await page.getByRole('tab',{name:'文档与账号',exact:true}).isDisabled(),true,'recording owns document operations until save or cancel');
    await page.getByRole('button',{name:'开始配置',exact:true}).click();
    await page.getByRole('button',{name:'录制 Sheet 标签',exact:true}).click();
    await page.getByText('Sheet 检验通过',{exact:true}).waitFor();
    const sheetResult=page.getByRole('status').filter({has:page.getByText('Sheet 检验通过',{exact:true})});
    const resultHeading=await sheetResult.getByText('Sheet 检验通过',{exact:true}).boundingBox(),resultSteps=await sheetResult.getByRole('list').boundingBox();
    assert.ok(resultHeading&&resultSteps&&resultHeading.y+resultHeading.height<=resultSteps.y,'Sheet result heading must appear above its steps');
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-sheet-independent-validation.png'),fullPage:true});
    await page.getByRole('button',{name:'录制单元格名称框',exact:true}).click();
    await page.getByText('临时测试格：下料/装焊（26年9月）!Z9',{exact:true}).waitFor();
    await page.getByRole('button',{name:'读取当前测试格',exact:true}).click();
    await page.getByText('临时测试格：下料/装焊（26年9月）!AA20',{exact:true}).waitFor();
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-cell-recording.png'),fullPage:true});
    assert.equal(await page.getByRole('button',{name:'检验单元格控件',exact:true}).isDisabled(),true);
    await page.getByRole('button',{name:'录制内容编辑区',exact:true}).click();
    await page.getByRole('button',{name:'检验单元格控件',exact:true}).click();
    await page.getByRole('button',{name:'保存网页控件',exact:true}).click();
    await page.getByRole('button',{name:'重新录制网页控件',exact:true}).waitFor();
    assert.equal(await page.evaluate(()=>window.controlsTask),'fixture');
    assert.deepEqual(await page.getByRole('tab').allTextContents(),['文档与账号','网页控件','业务字段','执行规则','测试与上线']);
    assert.equal(await page.getByRole('tabpanel').count(),1);
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-sheet-integrated-desktop.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.setViewportSize({width:1100,height:700});
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-sheet-integrated-minimum.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.getByText('调整模板与高级设置',{exact:true}).count(),0);
    assert.equal(await page.getByText('记住网页当前工作表',{exact:true}).count(),0);
    assert.equal(await page.getByRole('button',{name:'新建腾讯文档适配',exact:true}).count(),0);
    await page.getByRole('tab',{name:'测试与上线',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.getByRole('tab',{name:'执行规则',exact:true}).click();
    const frequency=page.getByRole('combobox',{name:'执行频率',exact:true});
    assert.equal(await frequency.evaluate(element=>element.tagName),'SELECT');
    await frequency.selectOption('weekly');
    await page.getByRole('button',{name:'添加执行时刻',exact:true}).click();
    await page.getByRole('combobox',{name:'业务日期',exact:true}).selectOption('offset');
    await page.getByLabel('偏移天数（负数向前，正数向后）').fill('-12');
    await page.getByRole('button',{name:'保存任务配置',exact:true}).click();
    assert.deepEqual(await page.evaluate(()=>window.savedConfig.executionSchedule),{weekdays:[1,2,3,4,5],times:['08:00','00:00']});
    assert.deepEqual(await page.evaluate(()=>window.savedConfig.businessDateRule),{kind:'relative',offsetDays:-12});
    await page.getByRole('tab',{name:'业务字段',exact:true}).click();
    await page.getByRole('button',{name:'+ 添加业务字段',exact:true}).click();
    await page.getByLabel('业务字段名称',{exact:true}).fill('合格数量');
    await page.getByLabel('单位（可选）',{exact:true}).fill('件');
    await page.getByRole('button',{name:'下一步 · 选择数据库',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'开始示范此项目',exact:true}).count(),0);
    await page.getByRole('button',{name:'Teable 数据库',exact:true}).click();
    await page.getByRole('listbox').getByRole('option',{name:'质量数据库',exact:true}).click();
    await page.getByRole('button',{name:'数值字段',exact:true}).click();
    await page.getByRole('listbox').getByRole('option',{name:'合格件数',exact:true}).click();
    await page.getByRole('button',{name:'日期字段',exact:true}).click();
    await page.getByRole('listbox').getByRole('option',{name:'生产日期',exact:true}).click();
    await page.getByRole('button',{name:'下一步 · 录制位置',exact:true}).click();
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).scrollIntoViewIfNeeded();
    await page.getByRole('group',{name:'示范填报位置',exact:true}).screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-setup.png')});
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).click();
    assert.equal(await page.evaluate(()=>window.teachingDate),'2026-08-01');
    for(let index=0;index<4;index++)await page.getByRole('button',{name:'记住当前选中的单元格',exact:true}).click();
    await page.getByRole('button',{name:'验证规则并查看第三个位置',exact:true}).click();
    await page.getByText('合格数量：每天向下 3 行',{exact:true}).waitFor();
    await page.getByText('程序已选中 2026-08-03 的预测位置 F15。请查看网页，确认它确实是当天的填报格。',{exact:true}).waitFor();
    assert.equal(await page.getByRole('tab',{name:'测试与上线',exact:true}).isDisabled(),true,'teaching blocks navigation to submission');
    await page.getByRole('group',{name:'示范填报位置',exact:true}).screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-confirm.png')});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.getByRole('button',{name:'位置正确，保存此项目',exact:true}).click();
    await page.getByRole('tab',{name:'测试与上线',exact:true}).click();
    await page.getByRole('button',{name:'获取本次 Teable 数据',exact:true}).click();
    await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).click();
    await page.getByRole('button',{name:'确认填报以上 1 项',exact:true}).click();
    assert.equal(await page.evaluate(()=>window.written.dataToken),'notion-proof');
    assert.equal(await page.evaluate(()=>window.written.businessDate),'2026-08-31');
    await page.getByRole('button',{name:'后台自动测试',exact:true}).click();
    const backgroundNotice=page.getByRole('status').filter({hasText:'后台模拟填报完成'});
    const backgroundCompleted=backgroundNotice.waitFor();
    await page.getByRole('button',{name:'后台自动测试并填写',exact:true}).click();
    await backgroundCompleted;
    console.log('Background completion notice:',await backgroundNotice.innerText());
    await page.getByRole('button',{name:'后台自动测试并填写',exact:true,disabled:false}).waitFor();
    assert.deepEqual(await page.evaluate(()=>window.backgroundTest),{id:'fixture',businessDate:undefined});
    assert.deepEqual(await page.evaluate(()=>({ok:window.backgroundResponse.ok,data:window.backgroundResponse.data})),{ok:true,data:{message:'后台模拟填报完成'}});
    assert.equal((await page.evaluate(()=>window.operations)).filter(operation=>operation==='tencentSheet.backgroundTest').length,1);
    assert.equal(await page.getByRole('alert').count(),0);
    await page.getByRole('tabpanel',{name:'测试与上线',exact:true}).screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-background-test.png')});
    await page.setViewportSize({width:1100,height:3000});
    await page.getByRole('tabpanel',{name:'测试与上线',exact:true}).screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-custom-fields.png')});
    assert.deepEqual(pageErrors,[]);
    assert.equal((await page.evaluate(()=>window.operations)).some(operation=>['tencentSheet.login','tencentSheet.loginAgreement','tencentSheet.open','tencentSheet.close'].includes(operation)),false);
    console.log('PASS: task tabs, explicit control recording, combined timing rules, then business name -> database -> teaching -> frozen business date submission');
    console.log('PASS: formal route, visual-only configuration without advanced settings, 1100px layout');
    console.log('PASS: teaching setup, four captures, third-date preview and write controls disabled during teaching');
    console.log('PASS: task-owned recording controls, required test before save and document operation isolation');
    console.log('PASS: one background submission, delivered successful Bridge response, visible completion notice and enabled controls after completion');
    console.log('PASS: four session operations, login/access/unknown/closed states, recording isolation and narrow viewport; no retired login calls');
  }catch(error){
    try {console.error(JSON.stringify({url:page.url(),buttons:await page.getByRole('button').allTextContents(),controls:await page.getByRole('tabpanel').ariaSnapshot(),background:await page.evaluate(()=>({request:window.backgroundTest,response:window.backgroundResponse})),pageErrors},null,2));}
    catch {console.error('UI page diagnostics unavailable');}
    throw error;
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
