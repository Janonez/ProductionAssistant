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
      const config={documentUrl:'https://docs.qq.com/sheet/fixture',sheetPattern:'下料、装焊（{yy}年{M}月）',company:'滨海公司',park:'滨海园区',startColumn:'F',cuttingRow:9,weldingRow:19,inboundRow:35,adapter:{anchors:{}}};
      window.chrome={webview:{addEventListener:(_,fn)=>receive=fn,postMessage:request=>{
        if(!request.id)return;
        let data=request.operation==='automation.list'?{availableTaskTypes:['daily_report','notion_fill','tencent_sheet_fill'],tasks:[{id:'fixture',taskType:'tencent_sheet_fill',taskTypeName:'腾讯文档填报',name:'生产月报填报（本地测试数据）',schedule:'手动测试',isEnabled:false,schedulingAvailable:false,status:'pending-test',connectionStatus:'腾讯文档',lastRun:'暂无运行记录'}]}:request.operation==='tencentSheet.get'?{id:'fixture',config}:{};
        if(request.operation==='tencentSite.list')data={profiles};
        if(request.operation==='tencentSite.open')data={message:'已打开本地模拟文档'};
        if(request.operation==='tencentSite.pick')data={profile:{...request.payload.profile,controls:{...request.payload.profile.controls,[request.payload.key]:{frame:[],strategies:[{}],sampleText:'示例工作表'}}},message:request.payload.key==='sheetTab'?'已识别 12 个同类 Sheet 标签。':'已录制单元格名称框。'};
        if(request.operation==='tencentSite.test')data={token:'test-receipt',steps:['找到 Sheet 标签集合','按名称找到并切换工作表','找到单元格名称框','名称框定位 J9','核对名称框地址'].map(label=>({label,detail:'本地模拟通过'})),message:'5 项适配测试全部通过，可以保存。'};
        if(request.operation==='tencentSite.save'){profiles=[{...request.payload.profile,id:'shared-profile'}];data={profile:profiles[0],message:'已保存共享适配'};}
        if(request.operation==='tencentSheet.teach') {
          const {stage,slot}=request.payload,order=['firstTarget','secondTarget','dateHeader','label'];
          if(stage==='start')data={sessionToken:'fixture-session',step:'firstTarget',sheetMode:'monthly'};
          if(stage==='capture')data={step:order[order.indexOf(slot)+1]||'preview',slot,capture:{address:{firstTarget:'F9',secondTarget:'F12',dateHeader:'A9',label:'F2'}[slot],value:'本地测试'}};
          if(stage==='preview')data={step:'confirm',previewToken:'fixture-proof',prediction:{date:'2026-09-03',address:'F15'},rule:{rowStep:3,columnStep:0,dateAnchor:{format:'{yyyy}/{M}/{d}'},labelAnchor:{expected:'下料量'}}};
        }
        queueMicrotask(()=>receive({data:{id:request.id,ok:true,data}}));
      }}};
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/?route=daily-report`);
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
    await page.getByRole('button',{name:'新建腾讯文档适配',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'保存适配配置',exact:true}).isDisabled(),true);
    await page.getByRole('button',{name:'开始配置',exact:true}).click();
    await page.getByRole('button',{name:'录制 Sheet 标签',exact:true}).click();
    await page.getByRole('button',{name:'录制单元格名称框',exact:true}).click();
    await page.getByRole('button',{name:'测试适配',exact:true}).click();
    await page.setViewportSize({width:1100,height:1500});
    await page.locator('.tencent-site-profiles').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-site-profile-tested.png')});
    await page.setViewportSize({width:1100,height:700});
    assert.equal(await page.getByRole('button',{name:'保存适配配置',exact:true}).isDisabled(),false);
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.locator('.tencent-site-profiles').getByRole('button',{name:'取消',exact:true}).click();
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).scrollIntoViewIfNeeded();
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-setup.png')});
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).click();
    for(let index=0;index<4;index++)await page.getByRole('button',{name:'记住当前选中的单元格',exact:true}).click();
    await page.getByRole('button',{name:'验证规则并查看第三个位置',exact:true}).click();
    await page.getByText('下料量：每天向下 3 行',{exact:true}).waitFor();
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-confirm.png')});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    console.log('PASS: formal route, visual-only configuration without advanced settings, 1100px layout');
    console.log('PASS: teaching setup, four captures, third-date preview and write controls disabled during teaching');
    console.log('PASS: shared site profile recording controls, required test before save and document operation isolation');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
