'use strict';
const readline=require('node:readline');
const crypto=require('node:crypto');
const {TencentDocsBrowser}=require('./browser.cjs');
const {TencentSheetClient,normalizeAdapter,explainError}=require('./client.cjs');
const core=require('./core.js');
const browser=new TencentDocsBrowser(process.argv[2]);
const client=new TencentSheetClient(browser);
let confirmation=null;
const signature=(config,plan)=>JSON.stringify({config,plan});
const defaultAnchors={cuttingDate:['{cuttingColumn}2','{date}'],weldingDate:['{weldingColumn}2','{date}'],sectionDate:['{sectionColumn}24','{date}'],plateDate:['{sectionColumn}24','{date}'],cuttingCompany:['C9','{company}'],weldingCompany:['C19','{company}'],park:['B35','{park}'],sectionType:['{sectionColumn}25','型材'],plateType:['{plateColumn}25','板材']};
function normalize(raw={}) {
  const config=core.validate(raw);
  const url=new URL(config.documentUrl);
  if(url.protocol!=='https:'||!['doc.weixin.qq.com','docs.qq.com'].includes(url.hostname))throw Error('请粘贴腾讯文档或企业微信文档的 HTTPS 分享链接。');
  config.adapter=normalizeAdapter({dateFormat:'{yyyy}/{M}/{d}',anchors:Object.fromEntries(Object.entries(defaultAnchors).map(([key,[address,expected]])=>[key,{address,expected}])),...raw.adapter});
  return config;
}
async function readRetry(action) {
  for(let attempt=0;;attempt++)try{return await action();}catch(error){
    if(attempt===2||!/net::ERR_(?:CONNECTION_RESET|CONNECTION_TIMED_OUT|NETWORK_CHANGED)|temporarily unavailable/.test(error.message))throw error;
    await new Promise(resolve=>setTimeout(resolve,(attempt+1)*1000));
  }
}
async function dispatch(request) {
  const {operation}=request;
  const config=normalize(request.config);
  if(operation==='validate')return {config};
  if(operation==='open'){confirmation=null;return browser.open(config);}
  if(operation==='recognize'){confirmation=null;return client.recognize(config);}
  if(operation==='pick'){confirmation=null;const result=await client.pick(config,request.key);config.adapter[request.key]=result.selector;return {config,message:result.warning||'已记住位置。'};}
  const plan=core.plan(config,request.date,request.values);
  if(operation==='inspect') {
    confirmation=null;
    const inspection=await readRetry(()=>client.inspect(config,plan));
    const token=inspection.prewriteVerified?crypto.randomUUID():null;
    if(token)confirmation={token,signature:signature(config,plan),expires:Date.now()+120000,inspection};
    return {...inspection,date:plan.date,token,message:inspection.conflict?'目标格已有内容，请检查；不会覆盖。':'位置与空值检查通过，请确认本次数据后填报。'};
  }
  if(operation==='write') {
    const saved=confirmation;confirmation=null;
    if(!saved||saved.token!==request.token||saved.expires<Date.now()||saved.signature!==signature(config,plan))throw Error('预览已失效，请重新检查本次数据。');
    return client.write(config,plan,saved.inspection);
  }
  throw Error('不支持的填报操作。');
}
async function main() {
  for await(const line of readline.createInterface({input:process.stdin,crlfDelay:Infinity})) {
    try {process.stdout.write(JSON.stringify({ok:true,data:await dispatch(JSON.parse(line))})+'\n');}
    catch(error){process.stdout.write(JSON.stringify({ok:false,...explainError(error),completed:error.completed||[],uncertainAddress:error.uncertainAddress||null})+'\n');}
  }
  await browser.close();
}
if(require.main===module)main().catch(()=>process.exitCode=1);
module.exports={normalize,readRetry,dispatch};
