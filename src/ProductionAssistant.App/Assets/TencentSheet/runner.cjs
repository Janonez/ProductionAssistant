'use strict';
const readline=require('node:readline');
const crypto=require('node:crypto');
const {TencentDocsBrowser}=require('./browser.cjs');
const {TencentSheetClient,normalizeAdapter,explainError}=require('./client.cjs');
const core=require('./core.js');
const site=require('./site-adapter.cjs');
const browser=new TencentDocsBrowser(process.argv[2]);
const client=new TencentSheetClient(browser);
let confirmation=null;
let teaching=null;
let siteValidation=null;
const signature=(config,plan)=>JSON.stringify({config,plan});
const defaultAnchors={cuttingDate:['{cuttingColumn}2','{date}'],weldingDate:['{weldingColumn}2','{date}'],sectionDate:['{sectionColumn}24','{date}'],plateDate:['{sectionColumn}24','{date}'],cuttingCompany:['C9','{company}'],weldingCompany:['C19','{company}'],park:['B35','{park}'],sectionType:['{sectionColumn}25','型材'],plateType:['{plateColumn}25','板材']};
function normalize(raw={}) {
  const config=core.validate(raw);
  const url=new URL(config.documentUrl);
  if(url.protocol!=='https:'||!['doc.weixin.qq.com','docs.qq.com'].includes(url.hostname))throw Error('请粘贴腾讯文档或企业微信文档的 HTTPS 分享链接。');
  config.adapter=normalizeAdapter({dateFormat:'{yyyy}/{M}/{d}',anchors:Object.fromEntries(Object.entries(defaultAnchors).map(([key,[address,expected]])=>[key,{address,expected}])),...raw.adapter});
  if(raw.siteProfile)config.siteProfile=site.normalizeProfile(raw.siteProfile);
  return config;
}
async function readRetry(action) {
  for(let attempt=0;;attempt++)try{return await action();}catch(error){
    if(attempt===2||!/net::ERR_(?:CONNECTION_RESET|CONNECTION_TIMED_OUT|NETWORK_CHANGED)|temporarily unavailable/.test(error.message))throw error;
    await new Promise(resolve=>setTimeout(resolve,(attempt+1)*1000));
  }
}
async function teach(request,config) {
  confirmation=null;
  const {stage}=request;
  if(stage==='cancel'){teaching=null;return {message:'已取消本次示范，原模板保持不变。'};}
  if(stage==='start') {
    teaching=null;
    if(!core.fieldKeys(config).includes(request.metric))throw Error('请选择要示范的业务字段');
    const first=core.dateParts(request.firstDate),second=core.dateParts(request.secondDate);
    if(first.monthKey!==second.monthKey||second.day<=first.day)throw Error('请选择同一个月的两个日期，第二个日期须晚于第一个');
    await client.ready(config);
    if(config.sheetReferenceName)await client.selectSheet(config,core.sheetName(config,request.firstDate));
    const sheet=await client.text(await client.one(config,'activeSheet'));
    const binding=core.sheetBinding(sheet), candidate={...config,...binding,capturedSheet:sheet,sheetReferenceName:sheet};
    if(core.sheetName(candidate,request.firstDate)!==sheet)
      throw Error('示范日期与当前月份工作表不一致，请选择该工作表中的日期');
    teaching={id:crypto.randomUUID(),jobId:request.jobId,signature:JSON.stringify(config),candidate,sheet,metric:request.metric,dates:[request.firstDate,request.secondDate],captures:{},expires:Date.now()+600000};
    return {sessionToken:teaching.id,step:'firstTarget',sheet,sheetMode:binding.sheetMode,message:'请在网页中选中第一个日期的填报格，然后记住位置。'};
  }
  const draft=teaching;
  if(!draft||draft.id!==request.sessionToken||draft.jobId!==request.jobId||draft.signature!==JSON.stringify(config)||draft.expires<Date.now())
    throw Error('示范已失效，请重新开始；已保存的模板未改变');
  if(stage==='capture') {
    const order=['firstTarget','secondTarget','dateHeader','label'];
    const slot=order.find(key=>!draft.captures[key]);
    if(!slot||request.slot!==slot)throw Error('请按引导顺序记住位置');
    const capture=await client.captureSelection(config,draft.sheet);
    if(slot==='secondTarget')core.inferRule([{date:draft.dates[0],address:draft.captures.firstTarget.address},{date:draft.dates[1],address:capture.address}]);
    if(slot==='dateHeader'&&!core.dateFormats.some(format=>core.formatDate(draft.dates[0],format)===capture.value))
      throw Error('此单元格未显示第一个示范日期，请选中对应的日期表头');
    if(slot==='label'&&(!capture.value.trim()||capture.value.length>300||/^\d+(?:\.\d+)?$/.test(capture.value.trim())))
      throw Error('请选择带文字的项目名称、公司或材料表头，不要选择数字或空白格');
    draft.captures[slot]=capture;
    return {step:order.find(key=>!draft.captures[key])||'preview',capture,slot,message:'已记住 '+capture.address+'，未填写数据。'};
  }
  if(stage==='preview') {
    const c=draft.captures;
    if(!c.firstTarget||!c.secondTarget||!c.dateHeader||!c.label)throw Error('请先完成四次位置示范');
    const inferred=core.inferRule([{date:draft.dates[0],address:c.firstTarget.address},{date:draft.dates[1],address:c.secondTarget.address}]);
    const rule={...inferred,confirmation:core.prediction(inferred),dateAnchor:{address:c.dateHeader.address},labelAnchor:{address:c.label.address,expected:c.label.value}};
    const proof=await client.verifyTeaching({...draft.candidate,rules:{}},rule);
    draft.proof=proof;draft.previewToken=crypto.randomUUID();
    return {...proof,prediction:proof.rule.confirmation,previewToken:draft.previewToken,step:'confirm',message:'程序已选中第三个日期的预测位置，请检查后确认。'};
  }
  if(stage==='confirm') {
    if(!draft.proof||!request.previewToken||request.previewToken!==draft.previewToken)throw Error('请先查看第三个日期的预测位置');
    const selected=await client.captureSelection(config,draft.sheet);
    if(selected.address!==draft.proof.rule.confirmation.address)throw Error('当前选区与预测位置不一致，请重新查看预测位置，或重新示范');
    const proof=await client.verifyTeaching({...draft.candidate,rules:{}},draft.proof.rule);
    const updated=normalize({...draft.candidate,rules:{...config.rules,[draft.metric]:proof.rule}});
    teaching=null;
    return {config:updated,message:'已保存此项目的排列规则。其他项目仍沿用各自配置；填报前会再次校验日期和项目标志。'};
  }
  throw Error('不支持的示范步骤');
}
async function dispatch(request) {
  const {operation}=request;
  if(operation==='close'){confirmation=null;teaching=null;siteValidation=null;await browser.close();return {message:'已结束填报浏览器会话，登录状态已保留。'};}
  if(operation.startsWith('site')) {
    confirmation=null;teaching=null;
    const tested=siteValidation;siteValidation=null;
    const config=normalize(request.config);
    const profile=site.normalizeProfile(request.profile);
    const proof=JSON.stringify({profile,url:config.documentUrl,id:request.profile.id??'',revision:request.profile.revision??0});
    if(operation==='siteSave') {
      browser.requirePage(config);
      if(!tested || tested.token!==request.token || tested.proof!==proof || tested.expires<Date.now())throw Error('适配测试已失效，请重新测试后保存。');
      await site.assertNoLogin(browser.page);
      for(const key of ['sheetTab','cellAddressBox','cellEditor'])await site.resolveControl(browser.page,profile.controls[key],key);
      return {profile,message:'适配测试通过，可以保存。'};
    }
    if(operation==='siteOpen')return browser.open(config);
    browser.requirePage(config);
    if(operation==='sitePick') {
      await site.assertNoLogin(browser.page);
      const binding=await site.recordControl(browser.page,request.key);
      profile.controls[request.key]=binding;
      return {profile:site.normalizeProfile(profile),count:binding.count,message:request.key==='sheetTab'?`已识别 ${binding.count} 个同类 Sheet 标签。`:request.key==='cellEditor'?'已录制内容编辑区。':'已录制单元格名称框。'};
    }
    if(operation==='siteTest') {
      const steps=await site.testProfile(browser.page,profile);
      const token=crypto.randomUUID();siteValidation={token,proof:JSON.stringify({profile,url:config.documentUrl,id:request.profile.id??'',revision:request.profile.revision??0}),expires:Date.now()+600000};
      return {steps,token,profile,message:`已通过切换学习选中状态，${steps.length} 项适配测试全部通过，可以保存。`};
    }
    throw Error('不支持的适配操作。');
  }
  siteValidation=null;
  const config=normalize(request.config);
  if(operation==='validate'){confirmation=null;teaching=null;return {config};}
  if(operation==='open'){confirmation=null;teaching=null;return browser.open(config);}
  if(operation==='recognize'){confirmation=null;teaching=null;return client.recognize(config);}
  if(operation==='pick'){confirmation=null;teaching=null;const result=await client.pick(config,request.key);config.adapter[request.key]=result.selector;if(request.key==='activeSheet')config.adapter.sheetTabs=result.sheetTabs;return {config,message:result.warning||'已记住位置。'};}
  if(operation==='teach')return teach(request,config);
  if(operation==='captureSheet') {
    confirmation=null;teaching=null;
    await client.ready(config);
    const sheet=await client.text(await client.one(config,'activeSheet'));
    return {config:normalize({...config,...core.sheetBinding(sheet),capturedSheet:sheet}),sheet,message:'已记住工作表「'+sheet+'」。'};
  }
  teaching=null;
  const plan=core.plan(config,request.date,request.values);
  if(operation==='background') {
    confirmation=null;
    try {
      await browser.open(config,true);
      const inspection=await readRetry(()=>client.inspect(config,plan));
      if(!inspection.prewriteVerified||inspection.conflict)throw Error('后台检查未通过或目标格已有内容，本次未填写。');
      return await client.write(config,plan,inspection);
    } finally {await browser.close();}
  }
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
