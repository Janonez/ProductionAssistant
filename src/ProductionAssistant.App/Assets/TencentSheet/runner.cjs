'use strict';
const readline=require('node:readline');
const crypto=require('node:crypto');
const {TencentDocsBrowser}=require('./browser.cjs');
const {TencentSheetClient,explainError}=require('./client.cjs');
const core=require('./core.js');
const site=require('./site-adapter.cjs');
const browser=new TencentDocsBrowser(process.argv[2]);
const {TencentLogin}=require('./login.cjs');
const login=new TencentLogin(browser);
const client=new TencentSheetClient(browser);
let confirmation=null;
let teaching=null;
let siteValidation=null;
let sheetValidation=null;
let siteTestCell=null;
const signature=(config,plan,jobId)=>JSON.stringify({config,plan,jobId});
function normalize(raw={}) {
  const config=core.validate(raw);
  const url=new URL(config.documentUrl);
  if(url.protocol!=='https:'||!['doc.weixin.qq.com','docs.qq.com'].includes(url.hostname))throw Error('请粘贴腾讯文档或企业微信文档的 HTTPS 分享链接。');
  if(raw.webControls)config.webControls=site.normalizeControls(raw.webControls);
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
    if(config.sheetReferenceName)await client.selectSheet(config,core.sheetName(config,request.firstDate),{readOnly:true});
    else await client.ready(config,{readOnly:true});
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
  if(operation==='login') {
    confirmation=null;teaching=null;siteValidation=null;sheetValidation=null;siteTestCell=null;
    return login.run(request,request.stage==='cancel'?undefined:normalize(request.config));
  }
  await login.guard();
  if(operation==='close'){confirmation=null;teaching=null;siteValidation=null;sheetValidation=null;siteTestCell=null;await browser.close();return {message:'已结束填报浏览器会话，登录状态已保留。'};}
  if(operation.startsWith('site')) {
    confirmation=null;teaching=null;
    const tested=siteValidation;siteValidation=null;
    const config=normalize(request.config);
    const controls=site.normalizeControls(request.controls);
    const testTime=Date.now();
    const sheetTarget=()=>core.controlTestTarget({...config,webControls:controls,sheetReferenceName:controls.sheetTab?.sampleText},testTime);
    const proof=()=>JSON.stringify({controls,url:config.documentUrl,jobId:request.jobId,configSignature:request.configSignature,date:sheetTarget()?.date,testCell:siteTestCell?.target});
    const sheetProof=()=>JSON.stringify({binding:controls.sheetTab,url:config.documentUrl,jobId:request.jobId,configSignature:request.configSignature,date:sheetTarget()?.date});
    const cellProof=()=>JSON.stringify({sheet:sheetProof(),addressBox:controls.cellAddressBox});
    const sheetInvalid=()=>!sheetValidation || sheetValidation.proof!==sheetProof() || sheetValidation.expires<Date.now();
    const requireSheet=()=>({passed:false,sheetRequired:true,testCell:null,message:'Sheet 检验已失效，请先重新检验 Sheet。'});
    async function rememberTestCell() {
      siteTestCell=null;
      if(sheetInvalid())return {...requireSheet(),controls};
      try {
        const target=await site.captureTestCell(browser.page,controls,config.timeout*1000,sheetTarget().sheet);
        siteTestCell={target,proof:cellProof(),expires:Date.now()+600000};
        return {controls,testCell:target,message:'已读取临时测试格 '+target.sheet+'!'+target.address+'。仅用于控件检验，不保存为业务填写位置。'};
      } catch(error) {return {controls,passed:false,testCell:null,message:error.message};}
    }
    if(operation==='siteSave') {
      browser.requirePage(config);
      if(!tested || tested.token!==request.token || tested.proof!==proof() || tested.expires<Date.now())throw Error('控件测试已失效，请重新测试后保存。');
      await site.assertNoLogin(browser.page);
      for(const key of ['sheetTab','cellAddressBox','cellEditor'])await site.waitForControl(browser.page,controls[key],key,config.timeout*1000,{collectionOnly:key==='sheetTab',locationOnly:true});
      if(controls.saveStatus)await site.waitForControl(browser.page,controls.saveStatus,'saveStatus',config.timeout*1000);
      siteTestCell=null;sheetValidation=null;
      return {controls,message:'控件测试通过，可以保存。'};
    }
    if(operation==='siteOpen'){sheetValidation=null;siteTestCell=null;return browser.open(config);}
    browser.requirePage(config);
    if(operation==='sitePick') {
      if(request.key==='sheetTab'){sheetValidation=null;siteTestCell=null;}
      if(request.key==='cellAddressBox')siteTestCell=null;
      await site.assertNoLogin(browser.page);
      const binding=await site.recordControl(browser.page,request.key);
      controls[request.key]=site.normalizeControls({[request.key]:binding})[request.key];
      if(request.key==='cellAddressBox')return rememberTestCell();
      return {controls:site.normalizeControls(controls),count:binding.count,message:request.key==='sheetTab'?`已识别 ${binding.count} 个同类 Sheet 标签。`:request.key==='cellEditor'?'已录制内容编辑区。':request.key==='saveStatus'?'已录制保存状态位置。':'已录制单元格名称框。'};
    }
    if(operation==='siteCaptureCell')return rememberTestCell();
    if(operation==='siteTestSheet') {
      sheetValidation=null;siteTestCell=null;
      try {
        const steps=await site.testSheet(browser.page,controls,config.timeout*1000,sheetTarget());
        sheetValidation={proof:sheetProof(),expires:Date.now()+600000};
        return {steps,controls,testCell:null,passed:true,message:'Sheet 检验通过。请在该工作表中选一个可编辑的空白格，再录制名称框和编辑区。'};
      } catch(error) {
        return {steps:error.steps || [],controls,testCell:null,passed:false,message:error.message};
      }
    }
    if(operation==='siteTest') {
      if(sheetInvalid())return requireSheet();
      if(!siteTestCell || siteTestCell.proof!==cellProof() || siteTestCell.expires<Date.now())return {passed:false,testCell:null,message:'临时测试格尚未读取或已失效，请选择可编辑的空白格，再读取当前测试格。'};
      const steps=await site.testCellControls(browser.page,controls,config.timeout*1000,siteTestCell.target);
      const token=crypto.randomUUID();siteValidation={token,proof:proof(),expires:Date.now()+600000};
      return {steps,token,controls,message:`${steps.length} 项控件测试全部通过，可以保存。`};
    }
    throw Error('不支持的控件录制操作。');
  }
  siteValidation=null;sheetValidation=null;siteTestCell=null;
  const config=normalize(request.config);
  if(operation==='validate'){confirmation=null;teaching=null;return {config};}
  if(operation==='open'){confirmation=null;teaching=null;return browser.open(config);}
  if(operation==='recognize'){confirmation=null;teaching=null;return client.recognize(config);}
  if(operation==='teach')return teach(request,config);
  teaching=null;
  const plan=core.plan(config,request.date,request.values);
  if(operation==='background') {
    confirmation=null;
    try {
      let inspection;
      try {
        for(let attempt=1;;attempt++) {
          try {
            await browser.open(config,true);
            inspection=await client.inspect(config,plan);
            if(!inspection.prewriteVerified||inspection.conflict)throw Error('后台检查未通过或目标格已有内容，本次未填写。');
            break;
          } catch(error) {
            const transient=error.code==='AnchorContentPending' || (error.code==='ControlUnavailable'&&!error.ambiguous) || /net::ERR_(?:CONNECTION_RESET|CONNECTION_TIMED_OUT|NETWORK_CHANGED)/.test(error.message);
            if(attempt>=3||!transient)throw error;
            await new Promise(resolve=>setTimeout(resolve,attempt*1000));
          }
        }
      } catch(error) {error.phase='check';throw error;}
      // Never include write() in the retry scope, even when its first check fails.
      return await client.write(config,plan,inspection);
    } finally {await browser.close();}
  }
  if(operation==='inspect') {
    confirmation=null;
    const inspection=await readRetry(()=>client.inspect(config,plan));
    const token=inspection.prewriteVerified?crypto.randomUUID():null;
    if(token)confirmation={token,signature:signature(config,plan,request.jobId),expires:Date.now()+120000,inspection};
    return {...inspection,date:plan.date,token,message:inspection.conflict?'目标格已有内容，请检查；不会覆盖。':'位置与空值检查通过，请确认本次数据后填报。'};
  }
  if(operation==='write') {
    const saved=confirmation;confirmation=null;
    if(!saved||saved.token!==request.token||saved.expires<Date.now()||saved.signature!==signature(config,plan,request.jobId))throw Error('预览已失效，请重新检查本次数据。');
    return client.write(config,plan,saved.inspection);
  }
  throw Error('不支持的填报操作。');
}
async function main() {
  for await(const line of readline.createInterface({input:process.stdin,crlfDelay:Infinity})) {
    try {process.stdout.write(JSON.stringify({ok:true,data:await dispatch(JSON.parse(line))})+'\n');}
    catch(error){process.stdout.write(JSON.stringify({ok:false,...explainError(error),phase:error.phase||null,completed:error.completed||[],uncertainAddress:error.uncertainAddress||null})+'\n');}
  }
  await browser.close();
}
if(require.main===module)main().catch(()=>process.exitCode=1);
module.exports={normalize,readRetry,dispatch};
