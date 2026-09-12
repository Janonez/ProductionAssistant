'use strict';
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../../src/ProductionAssistant.App/Assets/Prototype/dist');
async function main(){
  const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const file=path.resolve(dist,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1200,height:900}});
    await page.addInitScript(()=>{
      let receive,profiles=[];
      const config={documentUrl:'https://docs.qq.com/sheet/fixture',fields:[],rules:{},requireTeaching:true,sheetPattern:'下料、装焊（{yy}年{M}月）',company:'滨海公司',park:'滨海园区',startColumn:'F',cuttingRow:9,weldingRow:19,inboundRow:35,adapter:{anchors:{}}};
      window.chrome={webview:{addEventListener:(_,fn)=>receive=fn,postMessage:request=>{
        if(!request.id)return;
        let data=request.operation==='automation.list'?{availableTaskTypes:['daily_report','notion_fill','tencent_sheet_fill'],tasks:[{id:'fixture',taskType:'tencent_sheet_fill',taskTypeName:'腾讯文档填报',name:'生产月报填报（本地测试数据）',schedule:'手动测试',isEnabled:false,schedulingAvailable:false,status:'pending-test',connectionStatus:'腾讯文档',lastRun:'暂无运行记录'}]}:request.operation==='tencentSheet.get'?{id:'fixture',config}:{};
        if(request.operation==='tencentSite.list')data={profiles};
        if(request.operation==='tencentSite.open')data={message:'已打开本地模拟文档'};
        if(request.operation==='tencentSite.pick')data={profile:{...request.payload.profile,controls:{...request.payload.profile.controls,[request.payload.key]:{frame:[],strategies:[{}],sampleText:'示例工作表'}}},message:request.payload.key==='sheetTab'?'已识别 12 个同类 Sheet 标签。':'已录制单元格名称框。'};
        if(request.operation==='tencentSite.test')data={token:'test-receipt',steps:['找到 Sheet 标签集合','按名称找到并切换工作表','找到单元格名称框','名称框定位 J9','核对名称框地址'].map(label=>({label,detail:'本地模拟通过'})),message:'5 项适配测试全部通过，可以保存。'};
        if(request.operation==='tencentSite.save'){profiles=[{...request.payload.profile,id:'shared-profile'}];data={profile:profiles[0],message:'已保存共享适配'};}
        if(request.operation==='tencentSheet.addField'){config.fields.push({id:'custom',name:request.payload.name,unit:request.payload.unit});data={id:'fixture',config};}
        if(request.operation==='tencentSheet.sources')data={sources:[{id:'source',name:'质量数据库'}]};
        if(request.operation==='tencentSheet.schema')data={fields:[{id:'value',name:'合格件数',type:'number'},{id:'date',name:'生产日期',type:'date'}]};
        if(request.operation==='tencentSheet.updateField'){Object.assign(config.fields[0],{notion:request.payload.notion});data={id:'fixture',config};}
        if(request.operation==='tencentSheet.fetch')data={dataToken:'notion-proof',date:'2026-09-08',values:{custom:12},rows:[{id:'custom',name:'合格数量',unit:'件',value:12,source:'质量数据库',period:'2026-09-08',recordCount:2}]};
        if(request.operation==='tencentSheet.inspect')data={date:'2026-09-08',sheet:'质量月报',token:'write-proof',conflict:false,rows:[{label:'合格数量',address:'F30',value:12,current:''}],message:'本地位置检查通过'};
        if(request.operation==='tencentSheet.write'){window.written=request.payload;data={message:'本地模拟填报完成'};}
        if(request.operation==='tencentSheet.teach') {
          const {stage,slot}=request.payload,order=['firstTarget','secondTarget','dateHeader','label'];
          if(stage==='start')data={sessionToken:'fixture-session',step:'firstTarget',sheetMode:'monthly'};
          if(stage==='capture')data={step:order[order.indexOf(slot)+1]||'preview',slot,capture:{address:{firstTarget:'F9',secondTarget:'F12',dateHeader:'A9',label:'F2'}[slot],value:'本地测试'}};
          if(stage==='preview')data={step:'confirm',previewToken:'fixture-proof',prediction:{date:'2026-09-03',address:'F15'},rule:{rowStep:3,columnStep:0,dateAnchor:{format:'{yyyy}/{M}/{d}'},labelAnchor:{expected:'下料量'}}};
          if(stage==='confirm'){config.rules.custom={rowStep:3,columnStep:0};data={step:'done',message:'已保存位置'};}
        }
        queueMicrotask(()=>receive({data:{id:request.id,ok:true,data}}));
      }}};
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/?route=daily-report`);
    await page.getByRole('button',{name:'网页适配配置',exact:true}).click();
    await page.getByRole('button',{name:'新建腾讯文档适配',exact:true}).click();
    await page.getByLabel('用于配置的文档地址').fill('https://docs.qq.com/sheet/fixture');
    await page.getByRole('button',{name:'开始配置',exact:true}).click();
    await page.getByRole('button',{name:'录制 Sheet 标签',exact:true}).click();
    await page.getByRole('button',{name:'录制单元格名称框',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'测试适配',exact:true}).isDisabled(),true);
    await page.getByRole('button',{name:'录制内容编辑区',exact:true}).click();
    await page.getByRole('button',{name:'测试适配',exact:true}).click();
    await page.getByRole('button',{name:'保存适配配置',exact:true}).click();
    await page.getByRole('button',{name:'返回任务列表',exact:true}).click();
    await page.getByRole('button',{name:'生产月报填报（本地测试数据）',exact:true}).click();
    await page.getByText('1 · 连接文档',{exact:true}).waitFor();
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-sheet-integrated-desktop.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.setViewportSize({width:1100,height:700});
    await page.screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-sheet-integrated-minimum.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.getByText('调整模板与高级设置',{exact:true}).count(),0);
    assert.equal(await page.getByText('记住网页当前工作表',{exact:true}).count(),1);
    assert.equal(await page.getByRole('button',{name:'新建腾讯文档适配',exact:true}).count(),0);
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.getByLabel('业务字段名称',{exact:true}).fill('合格数量');
    await page.getByLabel('单位（可选）',{exact:true}).fill('件');
    await page.getByRole('button',{name:'新增业务字段',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'绑定数据：合格数量',exact:true}).isDisabled(),true);
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).scrollIntoViewIfNeeded();
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-setup.png')});
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).click();
    for(let index=0;index<4;index++)await page.getByRole('button',{name:'记住当前选中的单元格',exact:true}).click();
    await page.getByRole('button',{name:'验证规则并查看第三个位置',exact:true}).click();
    await page.getByText('合格数量：每天向下 3 行',{exact:true}).waitFor();
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-confirm.png')});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.getByRole('button',{name:'位置正确，保存此项目',exact:true}).click();
    await page.getByRole('button',{name:'Notion 数据库',exact:true}).click();
    await page.getByRole('option',{name:'质量数据库',exact:true}).click();
    await page.getByRole('button',{name:'数值字段',exact:true}).click();
    await page.getByRole('option',{name:'合格件数',exact:true}).click();
    await page.getByRole('button',{name:'日期字段',exact:true}).click();
    await page.getByRole('option',{name:'生产日期',exact:true}).click();
    await page.getByRole('button',{name:'保存数据绑定',exact:true}).click();
    await page.getByRole('button',{name:'获取本次 Notion 数据',exact:true}).click();
    await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).click();
    await page.getByRole('button',{name:'确认填报以上 1 项',exact:true}).click();
    assert.equal(await page.evaluate(()=>window.written.dataToken),'notion-proof');
    assert.equal(await page.evaluate(()=>window.written.businessDate),'2026-09-08');
    await page.setViewportSize({width:1100,height:3000});
    await page.locator('.tencent-sheet-workbench').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-custom-fields.png')});
    console.log('PASS: custom field creation, teaching, Notion binding, data preview and data-token-bound submission');
    console.log('PASS: formal route, visual-only configuration without advanced settings, 1100px layout');
    console.log('PASS: teaching setup, four captures, third-date preview and write controls disabled during teaching');
    console.log('PASS: shared site profile recording controls, required test before save and document operation isolation');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
