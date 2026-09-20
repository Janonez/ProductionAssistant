'use strict';
const core = require('./core.js');
const site = require('./site-adapter.cjs');
const fieldLabels = {nameBox:'名称框',valueBox:'值编辑区 / 公式栏',sheetTabs:'工作表标签集合',activeSheet:'当前选中的工作表',ready:'编辑状态标志',saved:'已保存状态标志',frame:'表格所在 iframe',dateFormat:'日期表头格式'};
const textControls = 'input:not([type=hidden]):not([type=password]):not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=reset]):not([type=file]):not([type=range]):not([type=color]):not([type=image]),textarea,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"]';
function fieldError(key,message,details='') {
  const error=Error(message);error.field=key;error.details=details;return error;
}
function explainError(error) {
  const clean=value=>String(value||'').replace(/\u001b\[[0-?]*[ -/]*[@-~]/g,'').trim();
  const original=clean(error.message), details=clean(error.details);
  let message=original;
  if (/Target.*closed|has been closed/.test(original)) message='专用浏览器已关闭，操作已中断。请重新打开网页后检查。';
  else if (/Timeout \d+ms|TimeoutError/.test(original)) message='等待网页响应超时。请确认页面加载完成，并检查相关控件配置。';
  else if (/net::ERR_/.test(original)) message='网页连接失败。请检查测试地址和网络连接后重试。';
  else if (/(?:locator|page|browserType|frameLocator|browserContext)\.\w+:|Call log:|strict mode violation/.test(original)) message='网页控件操作未完成。请在“网页控件”中重新点选对应控件。';
  return {error:message,details:details || (message!==original?original:''),field:error.field||null,code:error.code||null};
}

function a1(value) {
  const match = /^([A-Z]{1,3})([1-9]\d{0,6})$/.exec(value);
  if (!match || Number(match[2]) > 1048576) throw Error('请输入单个 A1 地址，例如 J9');
  const n = [...match[1]].reduce((v,c) => v*26+c.charCodeAt(0)-64,0);
  core.columnName(n);
  return value;
}
function sameNumber(current, expected) {
  return /^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(String(current).trim()) && Number(current) === expected;
}

class TencentSheetClient {
  constructor(browser) {this.browser=browser;}
  get page(){return this.browser.page;}
  requirePage(config){this.browser.requirePage(config);}
  scope(config) {
    return (config.webControls?.cellAddressBox?.frame || []).reduce((scope,selector)=>scope.frameLocator(selector),this.page);
  }
  async one(config, key) {
    const role={nameBox:'cellAddressBox',activeSheet:'sheetTab',valueBox:'cellEditor'}[key];
    return site.waitForControl(this.page,config.webControls?.[role],role,config.timeout*1000,{active:key==='activeSheet'});
  }
  async control(config,key) {
    let locator=await this.one(config,key);
    const supported=await locator.evaluate((el,selector)=>el.matches(selector) || el.isContentEditable,textControls);
    if(!supported) {
      const children=locator.locator(':is('+textControls+'):visible');
      const count=await children.count();
      if(count!==1) throw fieldError(key,'「'+fieldLabels[key]+'」选中了普通页面区域，'+(count>1?'里面有多个输入框，无法确定目标。':'没有找到可输入的控件。')+'请先在网页中点出输入光标，再重新选取该项。');
      locator=children.first();
    }
    if(!await locator.isEditable()) throw fieldError(key,'「'+fieldLabels[key]+'」当前只读或已禁用。请确认已登录、具有编辑权限，并激活该输入框。');
    return locator;
  }
  async text(locator,trim=true) {
    const value=await locator.evaluate(el => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ? el.value : el.innerText ?? el.textContent ?? '');
    return trim?value.trim():core.cellText(value);
  }
  async ready(config) {
    this.requirePage(config);
    await site.assertNoLogin(this.page);
    const deadline=Date.now()+config.timeout*1000;
    for(const key of ['nameBox','valueBox'])await this.control({...config,timeout:Math.max(0,deadline-Date.now())/1000},key);
    return {message:'网页编辑控件可用；尚未校验目标工作表与单元格。'};
  }
  async selectSheet(config, sheet) {
    this.requirePage(config);
    const binding=config.webControls?.sheetTab,deadline=Date.now()+config.timeout*1000;
    const remaining=()=>Math.max(0,deadline-Date.now());
    try {
      // The toolbar and active marker may load after the tab collection. Find the
      // target by name without requiring an already selected sheet or an A1 value.
      const target=await site.waitForControl(this.page,binding,'sheetTab',remaining(),{collectionOnly:true,text:sheet});
      let current='';
      try {current=await this.text(await site.resolveControl(this.page,binding,'sheetTab',true));}
      catch(error) {
        if(error.ambiguous){error.message='Sheet 标签状态不唯一：'+error.reason+'。未切换或填写，请检查网页。';throw error;}
        if(error.code!=='ControlUnavailable')throw error;
      }
      if(current!==sheet)await target.click({timeout:Math.max(1,remaining())});
      await site.waitForControl(this.page,binding,'sheetTab',remaining(),{active:true,text:sheet});
      await this.ready({...config,timeout:remaining()/1000});
    } finally {
      if(this.page && !this.page.isClosed())this.page.setDefaultTimeout(config.timeout*1000);
    }
  }
  async locate(config, address) {
    a1(address);
    await this.page.bringToFront();
    const name = await this.control(config,'nameBox');
    await name.click();
    await name.press('Control+A');
    await name.pressSequentially(address);
    await name.press('Enter');
    await site.assertNoLogin(this.page);
    // Do not await requestAnimationFrame: an occluded/minimized sheet can suspend it indefinitely.
    // The concrete page binding must be validated by reading anchors before any write.
    await new Promise(resolve => setTimeout(resolve,100));
    const selected = (await this.text(name)).replace(/\$/g,'').toUpperCase();
    if (selected !== address) throw Error('选中地址不一致：期望 '+address+'，实际 '+selected);
    return this.control(config,'valueBox');
  }
  async read(config, address) { return this.text(await this.locate(config,address),false); }
  async selectedAddress(config) {
    return (await this.text(await this.control(config,'nameBox'))).replace(/\$/g,'').toUpperCase();
  }
  async captureSelection(config, expectedSheet) {
    await this.ready(config);
    const sheet = await this.text(await this.one(config,'activeSheet'));
    if (!sheet || (expectedSheet && sheet !== expectedSheet)) throw Error('示范期间工作表发生变化，请回到原工作表后再记住位置');
    const address = await this.selectedAddress(config);
    core.addressParts(address);
    const value = await this.read(config,address);
    return { sheet, address, value };
  }
  async verifyTeaching(config, rule) {
    await this.ready(config);
    const sheet = core.sheetName(config,rule.samples[0].date);
    if (await this.text(await this.one(config,'activeSheet')) !== sheet) throw Error('请回到示范时选中的工作表');
    let formats = core.dateFormats;
    const checks = [];
    for (const sample of [...rule.samples,rule.confirmation]) {
      const address = core.ruleAddress(rule,sample.date,rule.dateAnchor.address);
      const actual = await this.read(config,address);
      formats = formats.filter(format => core.formatDate(sample.date,format) === actual);
      if (!formats.length) throw Error('日期校验未通过：'+sample.date+' 对应 '+address+'，读到「'+actual+'」。请确认日期表头也按相同间隔排列，并重新示范');
      checks.push({date:sample.date,address,actual});
    }
    const label = await this.read(config,rule.labelAnchor.address);
    if (label !== rule.labelAnchor.expected) throw Error('项目名称或公司表头在示范期间发生变化，请重新示范');
    rule.dateAnchor.format = formats[0];
    // Date/identity cells must never also be target cells for this metric.
    const parts=core.dateParts(rule.samples[0].date);
    for(let day=1;day<=parts.days;day++) {
      const date=parts.monthKey+'-'+String(day).padStart(2,'0'),target=core.ruleAddress(rule,date);
      if(target===core.ruleAddress(rule,date,rule.dateAnchor.address)||target===rule.labelAnchor.address)
        throw Error('填报位置与日期或项目名称重叠，请重新示范');
    }
    await this.read(config,rule.confirmation.address);
    return {rule:core.normalizeRule(rule),checks};
  }
  async prepareEdit(config,address,expected) {
    const valueBox=await this.locate(config,address);
    const before=await this.text(valueBox,false);
    if(before!==expected)throw Error(address+' 写前原值不一致：期望「'+expected+'」，实际「'+before+'」。未输入填报值。');
    await valueBox.focus();
    const actualAddress=await this.selectedAddress(config), actualValue=await this.text(valueBox,false);
    if(actualAddress!==address)throw Error('聚焦内容编辑区后地址变成 '+actualAddress+'，目标应为 '+address+'。未输入填报值。');
    if(actualValue!==expected)throw Error(address+' 聚焦内容编辑区后的原值不一致：期望「'+expected+'」，实际「'+actualValue+'」。未输入填报值。');
    return {valueBox,evidence:{address,returnedAddress:actualAddress,editorValue:actualValue,prewriteVerified:true}};
  }
  async diagnose(config,address) {
    const current=await this.read(config,address);
    try {
      const {evidence}=await this.prepareEdit(config,address,current);
      const raw=await (await this.control(config,'valueBox')).evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.innerText??el.textContent??'');
      return {...evidence,rawEditorValue:raw,rawCodePoints:[...raw].map(c=>'U+'+c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')),message:'名称框地址与原值检查通过，已聚焦内容编辑区；尚未验证实际输入效果；未输入或提交填报数据。'};
    } finally {await this.page.keyboard.press('Escape').catch(()=>{});}
  }
  async anchors(config, plan) {
    const results = [];
    for (const row of plan.rows) {
      const rule=config.rules?.[row.key];
      if(!rule)throw Error(row.label+'尚未示范位置');
      for(const check of [
        {label:row.label+'日期',address:core.ruleAddress(rule,plan.date,rule.dateAnchor.address),expected:core.formatDate(plan.date,rule.dateAnchor.format)},
        {label:row.label+'项目标志',...rule.labelAnchor}
      ]) {
        const actual=await this.read(config,check.address);
        if(actual!==check.expected)throw Error(check.label+'校验失败：'+check.address+' 期望「'+check.expected+'」，实际「'+actual+'」；未开始填报');
        results.push({...check,actual});
      }
    }
    return results;
  }
  async inspect(config, plan) {
    if(core.fieldKeys(config).some(key=>!config.rules?.[key]))throw Error('这份新文档尚未完成所有字段的位置示范。请在业务字段与填写位置板块逐项示范。');
    await this.selectSheet(config,plan.sheet);
    const anchors = await this.anchors(config,plan), cells = {};
    for (const row of plan.rows) cells[row.address] = await this.read(config,row.address);
    const rows = core.preflight(plan,cells);
    const conflict=rows.some(r=>r.action==='conflict'), editing=[];
    if(!conflict)for(const row of rows) {
      try {editing.push((await this.prepareEdit(config,row.address,row.current)).evidence);}
      finally {await this.page.keyboard.press('Escape').catch(()=>{});}
    }
    return {sheet:plan.sheet,rows,anchors,conflict,editing,prewriteVerified:!conflict && editing.length===rows.length};
  }
  async write(config, plan, baseline) {
    const completed = [];
    let attempted = null;
    try {
      const inspection = await this.inspect(config,plan);
      if (inspection.conflict) throw Error('已有值冲突，整批停止');
      if (inspection.rows.some((row,i) => row.current !== baseline.rows[i].current)) throw Error('网页数据在预览后发生变化，请重新检查');
      for (const row of inspection.rows) {
        // Recheck immediately before each write; web sheets do not offer atomic batch transactions.
        await this.ready(config);
        if (await this.text(await this.one(config,'activeSheet')) !== plan.sheet) throw Error('当前工作表发生变化');
        const current = await this.read(config,row.address);
        if (current !== row.current) throw Error(row.address+' 在执行期间被修改，停止后续写入');
        if (current !== '') throw Error(row.address+' 已有内容，停止填报；未清空或覆盖。');
        const {valueBox}=await this.prepareEdit(config,row.address,current);
        if(await this.selectedAddress(config)!==row.address)throw Error(row.address+' 输入前地址发生变化，未输入填报值。');
        if(await this.text(valueBox,false)!=='')throw Error(row.address+' 输入前内容不为空，停止填报；未清空或覆盖。');
        attempted = row.address;
        await valueBox.pressSequentially(String(row.value));
        const entered=await this.text(valueBox,false);
        if(!sameNumber(entered,row.value))throw Error(row.address+' 内容编辑区输入未生效：期望「'+row.value+'」，实际「'+entered+'」。未按 Enter 提交。');
        await valueBox.press('Enter');
        // Navigate away and back so this is a fresh formula-bar read, not the text just typed.
        const other = inspection.rows.find(r => r.address !== row.address)?.address || inspection.anchors.find(anchor=>anchor.address!==row.address)?.address;
        if(!other)throw Error('缺少用于离开单元格并回读的校验位置');
        await this.read(config,other);
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 写后回读不一致：期望「'+row.value+'」，实际「'+actual+'」');
        completed.push({...row,result:'written',actual}); attempted = null;
      }
      await this.confirmSaved(config,plan,inspection.rows);
      return {completed,message:'真实填报完成，刷新后回读一致。'};
    } catch(error) {
      try {await site.assertNoLogin(this.page);} catch(login) {if(login.code==='LoginRequired')error=login;}
      await this.page?.keyboard.press('Escape').catch(()=>{});
      if(completed.length===plan.rows.length && !attempted) {
        const reason=error.message;
        error=Object.assign(Error(`已填写 ${completed.length} 项，刷新后的保存确认未完成。${error.code==='LoginRequired'?'请完成登录后检查网页。':'请检查网页中的数值及保存状态。'}不会重复写入。`),{code:'SaveConfirmationPending',details:reason});
      }
      error.completed = completed;
      error.uncertainAddress = attempted;
      throw error;
    }
  }
  async saveState(config) {
    await site.assertNoLogin(this.page);
    let state;
    if(config.webControls?.saveStatus) {
      try {state=(await site.readSaveStatus(await site.resolveControl(this.page,config.webControls.saveStatus,'saveStatus'))).state;}
      catch(error) {if(error.code!=='ControlUnavailable' || error.ambiguous)throw error;return 'unknown';}
    } else {
      const texts=await this.scope(config).locator('[role="status"]:visible,[aria-live="polite"]:visible').allTextContents();
      state=site.classifySaveState(texts.join(' '));
    }
    if(state==='failed')throw Error('文档提示保存失败、未保存或离线，请检查网页；不会重复写入。');
    return state;
  }
  async confirmSaved(config,plan,rows) {
    const deadline=Date.now()+30000;
    let sawSaving=false;
    // A saved label already present before this batch is never sufficient evidence.
    for(let attempt=0;attempt<3;attempt++) {
      const settledAfter=Date.now()+[2000,2000,4000][attempt];
      let status=await this.saveState(config);
      while(Date.now()<settledAfter || status==='saving' || (config.webControls?.saveStatus && !['saved','idle'].includes(status))) {
        sawSaving ||= status==='saving';
        if(Date.now()>=deadline)throw Error(config.webControls?.saveStatus?'等待录制的保存状态确认超过 30 秒，请检查控件和网页保存状态；不会重复写入。':'保存等待超过 30 秒，结果待确认；不会重复写入。');
        await this.page.waitForTimeout(Math.min(250,deadline-Date.now()));
        status=await this.saveState(config);
      }
      if(Date.now()>=deadline)break;
      await this.page.reload({waitUntil:'domcontentloaded',timeout:Math.max(1,deadline-Date.now())});
      await this.waitForReloadControls(config,deadline);
      await this.selectSheet(config,plan.sheet);
      let consistent=true;
      for(const row of rows) {
        if(Date.now()>=deadline)throw Error('保存确认超时，结果待确认；不会重复写入。');
        if(!sameNumber(await this.read(config,row.address),row.value))consistent=false;
      }
      if(consistent)return {transitionObserved:sawSaving};
    }
    throw Error('刷新后回读不一致，服务端保存尚未确认；不会重复写入。');
  }
  async waitForReloadControls(config,deadline) {
    let lastError;
    try {
      while(Date.now()<deadline) {
        // DOMContentLoaded precedes the sheet application's controls and A1 state.
        // Only retry control discovery here; never replay any part of write().
        const probe={...config,timeout:Math.min(0.5,(deadline-Date.now())/1000)};
        this.requirePage(probe);
        await site.assertNoLogin(this.page);
        try {
          await this.ready(probe);
          await this.one(probe,'activeSheet');
          return;
        } catch(error) {
          if(error.code!=='ControlUnavailable' && !['nameBox','valueBox','activeSheet','ready'].includes(error.field))throw error;
          lastError=error;
        }
        await new Promise(resolve=>setTimeout(resolve,Math.min(200,Math.max(0,deadline-Date.now()))));
      }
      throw Object.assign(Error('刷新后等待表格控件恢复超时，保存结果待确认。'),{details:lastError?.message});
    } finally { if(this.page&&!this.page.isClosed())this.page.setDefaultTimeout(config.timeout*1000); }
  }
  async recognize(config) {
    this.requirePage(config);
    await site.assertNoLogin(this.page);
    const missing=[];
    for(const key of ['nameBox','valueBox','activeSheet']) {
      try {await this.one(config,key);} catch {missing.push(key);}
    }
    if(missing.includes('activeSheet'))missing.push('sheetTabs');
    const sheets=missing.includes('sheetTabs')?[]:await (await site.waitForControl(this.page,config.webControls?.sheetTab,'sheetTab',config.timeout*1000,{collectionOnly:true})).allTextContents();
    if(!missing.includes('activeSheet') && !config.sheetReferenceName) {
      const name=(await this.text(await this.one(config,'activeSheet'))).trim();
      Object.assign(config,core.sheetBinding(name),{sheetReferenceName:name,capturedSheet:name});
    }
    return {config,missing,sheets:sheets.map(s=>s.trim()).filter(Boolean),message:missing.length?'还有 '+missing.length+' 项控件不可用，请在网页控件板块重新录制。':'已识别网页控件和工作表名称；填报时按业务日期匹配月份。'};
  }
}
module.exports = {TencentSheetClient,a1,explainError};
