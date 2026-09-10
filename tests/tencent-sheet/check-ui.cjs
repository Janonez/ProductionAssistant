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
      let receive;
      const config={documentUrl:'https://docs.qq.com/sheet/fixture',sheetPattern:'下料、装焊（{yy}年{M}月）',company:'滨海公司',park:'滨海园区',startColumn:'F',cuttingRow:9,weldingRow:19,inboundRow:35,adapter:{anchors:{}}};
      window.chrome={webview:{addEventListener:(_,fn)=>receive=fn,postMessage:request=>{
        if(!request.id)return;
        let data=request.operation==='automation.list'?{availableTaskTypes:['daily_report','notion_fill','tencent_sheet_fill'],tasks:[{id:'fixture',taskType:'tencent_sheet_fill',taskTypeName:'腾讯文档填报',name:'生产月报填报（本地测试数据）',schedule:'手动测试',isEnabled:false,schedulingAvailable:false,status:'pending-test',connectionStatus:'腾讯文档',lastRun:'暂无运行记录'}]}:request.operation==='tencentSheet.get'?{id:'fixture',config}:{};
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
    assert.equal(await page.getByText('调整模板与高级设置',{exact:true}).evaluate(el=>el.parentElement.open),false);
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).scrollIntoViewIfNeeded();
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-setup.png')});
    await page.getByRole('button',{name:'开始示范此项目',exact:true}).click();
    for(let index=0;index<4;index++)await page.getByRole('button',{name:'记住当前选中的单元格',exact:true}).click();
    await page.getByRole('button',{name:'验证规则并查看第三个位置',exact:true}).click();
    await page.getByText('下料量：每天向下 3 行',{exact:true}).waitFor();
    assert.equal(await page.getByRole('button',{name:'检查本次数据与位置',exact:true}).isDisabled(),true);
    await page.locator('.tencent-teaching').screenshot({path:path.resolve(__dirname,'../../artifacts/tencent-template-teaching-confirm.png')});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    console.log('PASS: formal route, dedicated task editor, collapsed advanced settings, 1100px layout');
    console.log('PASS: teaching setup, four captures, third-date preview and write controls disabled during teaching');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
