'use strict';
const core = require('./core.js');
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
  else if (/(?:locator|page|browserType|frameLocator|browserContext)\.\w+:|Call log:|strict mode violation/.test(original)) message='网页控件操作未完成。请检查网页操作设置；具体原因可展开技术详情查看。';
  return {error:message,details:details || (message!==original?original:''),field:error.field||null};
}

const anchorSpecs = [
  ['cuttingDate','下料日期','{date}'], ['weldingDate','装焊日期','{date}'],
  ['sectionDate','型材日期','{date}'], ['plateDate','板材日期','{date}'],
  ['cuttingCompany','下料公司','{company}'], ['weldingCompany','装焊公司','{company}'],
  ['park','入库园区','{park}'], ['sectionType','型材表头','型材'], ['plateType','板材表头','板材']
];
const adapterDefaults = {
  frame: '', nameBox: '', valueBox: '', sheetTabs: '', activeSheet: '', ready: '', saved: '',
  dateFormat: '{yyyy}年{M}月{d}日', stateMode:'auto',
  anchors: Object.fromEntries(anchorSpecs.map(([key,,expected]) => [key,{address:'',expected}]))
};
function normalizeAdapter(raw = {}) {
  const result = {};
  result.stateMode=raw.stateMode ?? 'auto';
  if(!['auto','selectors'].includes(result.stateMode))throw Error('请选择有效的页面状态判断方式');
  for (const key of ['frame','nameBox','valueBox','sheetTabs','activeSheet','ready','saved','dateFormat']) {
    const value = raw[key] ?? adapterDefaults[key];
    if (typeof value !== 'string' || value.length > 1000) throw fieldError(key,'网页配置格式无效：'+fieldLabels[key]);
    result[key] = value.trim();
  }
  result.anchors = {};
  for (const [key,,expected] of anchorSpecs) {
    const item = raw.anchors?.[key] ?? {address:'',expected};
    if (typeof item.address !== 'string' || typeof item.expected !== 'string' || item.address.length > 150 || item.expected.length > 300) throw Error('校验格配置无效：'+key);
    result.anchors[key] = {address:item.address.trim(),expected:item.expected.trim()};
  }
  return result;
}
function expand(value, config, plan) {
  const [year,month,day] = plan.date.split('-');
  const tokens = {yyyy:year,yy:year.slice(-2),M:String(Number(month)),MM:month,d:String(Number(day)),dd:day,company:config.company,park:config.park};
  tokens.date = config.adapter.dateFormat.replace(/\{([^}]+)\}/g, (_,k) => tokens[k] ?? '{'+k+'}');
  for (const row of plan.rows) tokens[row.key+'Column'] = row.address.replace(/\d+$/, '');
  const result = value.replace(/\{([^}]+)\}/g, (_,k) => tokens[k] ?? '{'+k+'}');
  if (/[{}]/.test(result)) throw Error('校验格包含不支持的占位符：'+result);
  return result;
}
function a1(value) {
  const match = /^([A-Z]{1,3})([1-9]\d{0,6})$/.exec(value);
  if (!match || Number(match[2]) > 1048576) throw Error('请输入单个 A1 地址，例如 J9');
  const n = [...match[1]].reduce((v,c) => v*26+c.charCodeAt(0)-64,0);
  core.columnName(n);
  return value;
}
function sameNumber(current, expected) {
  return /^(?:\d+\.?\d*|\.\d+)$/.test(String(current).trim()) && Number(current) === expected;
}

class TencentSheetClient {
  constructor(browser) {this.browser=browser;}
  get page(){return this.browser.page;}
  requirePage(config){this.browser.requirePage(config);}
  scope(config) { return config.adapter.frame ? this.page.frameLocator(config.adapter.frame) : this.page; }
  async one(config, key) {
    const label=fieldLabels[key];
    if (!config.adapter[key]) throw fieldError(key,'尚未设置「'+label+'」。请到“环境与模板设置 → 网页操作设置”选取对应控件。');
    const locator = this.scope(config).locator(config.adapter[key]);
    try {
      await locator.first().waitFor({state:'visible'});
      if (await locator.count() !== 1) throw fieldError(key,'「'+label+'」匹配到了多个元素，请重新选取唯一的目标控件。');
    } catch(error) {
      if(error.field)throw error;
      throw fieldError(key,'未找到可见的「'+label+'」。请确认网页已打开、相关区域已展开，并检查该项设置。',error.message);
    }
    return locator;
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
    if(config.adapter.stateMode==='selectors')await this.one(config,'ready');
    await this.control(config,'nameBox');
    await this.control(config,'valueBox');
    return {message:'网页编辑控件可用；尚未校验目标工作表与单元格。'};
  }
  async selectSheet(config, sheet) {
    await this.ready(config);
    let active = await this.one(config,'activeSheet');
    if (await this.text(active) !== sheet) {
      if (!config.adapter.sheetTabs) throw Error('请配置工作表标签选择器');
      const exact = new RegExp('^'+sheet.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$');
      const tab = this.scope(config).locator(config.adapter.sheetTabs).filter({hasText:exact});
      if (await tab.count() !== 1) throw Error('未找到唯一的月份工作表：'+sheet);
      await tab.click();
      active = await this.one(config,'activeSheet');
    }
    const deadline = Date.now() + config.timeout*1000;
    while (await this.text(active) !== sheet) {
      if (Date.now() > deadline) throw Error('当前工作表名称与预期不一致：'+sheet);
      await new Promise(resolve => setTimeout(resolve,100));
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
    for (const [key,label] of anchorSpecs) {
      const item = config.adapter.anchors[key];
      if (!item?.address || !item?.expected) throw Error('请配置校验格：'+label);
      const address = a1(expand(item.address,config,plan));
      const expected = expand(item.expected,config,plan);
      const actual = await this.read(config,address);
      if (actual !== expected) throw Error(label+'校验失败：'+address+' 期望「'+expected+'」，实际「'+actual+'」；未开始填报');
      results.push({label,address,expected,actual});
    }
    return results;
  }
  async inspect(config, plan) {
    await this.selectSheet(config,plan.sheet);
    const anchors = await this.anchors(config,plan), cells = {};
    for (const row of plan.rows) cells[row.address] = await this.read(config,row.address);
    const rows = core.preflight(plan,cells,'ready');
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
      if (config.adapter.stateMode==='selectors' && !config.adapter.saved) throw fieldError('saved','额外状态检查已启用，请设置「已保存状态标志」，或改用自动检查。');
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
        const other = inspection.rows.find(r => r.address !== row.address).address;
        await this.read(config,other);
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 写后回读不一致：期望「'+row.value+'」，实际「'+actual+'」');
        completed.push({...row,result:'written',actual}); attempted = null;
      }
      await this.confirmSaved(config,plan,inspection.rows);
      return {completed,message:'真实填报完成，刷新后回读一致。'};
    } catch(error) {
      await this.page?.keyboard.press('Escape').catch(()=>{});
      error.completed = completed;
      error.uncertainAddress = attempted;
      throw error;
    }
  }
  async saveState(config) {
    const texts=await this.scope(config).locator('[role="status"]:visible,[aria-live="polite"]:visible').allTextContents();
    if(config.adapter.stateMode==='selectors' && config.adapter.saved) {
      const saved=this.scope(config).locator(config.adapter.saved);
      if(await saved.count()===1 && await saved.isVisible())texts.push(await this.text(saved));
    }
    const text=texts.join(' ');
    if(/保存失败|无法保存|同步失败/.test(text))throw Error('文档提示保存失败，请检查网页；不会重复写入。');
    return /正在保存|保存中|同步中/.test(text)?'saving':/已保存|保存成功|已同步/.test(text)?'saved':'unknown';
  }
  async confirmSaved(config,plan,rows) {
    const deadline=Date.now()+30000;
    let sawSaving=false;
    // A saved label already present before this batch is never sufficient evidence.
    for(let attempt=0;attempt<3;attempt++) {
      await new Promise(resolve=>setTimeout(resolve,[2000,2000,4000][attempt]));
      let status=await this.saveState(config);
      while(status==='saving') {
        sawSaving=true;
        if(Date.now()>=deadline)throw Error('保存等待超过 30 秒，结果待确认；不会重复写入。');
        await new Promise(resolve=>setTimeout(resolve,250));
        status=await this.saveState(config);
      }
      if(Date.now()>=deadline)break;
      await this.page.reload({waitUntil:'domcontentloaded',timeout:Math.max(1,deadline-Date.now())});
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
  async recognize(config) {
    this.requirePage(config);
    const scope=this.scope(config),missing=[];
    for(const [key,candidates] of Object.entries({
      nameBox:['input[aria-label*="名称"]','input[placeholder*="名称"]','input[aria-label*="单元格"]'],
      valueBox:['#alloy-simple-text-editor'],
      activeSheet:['[role="tab"][aria-selected="true"]','[aria-selected="true"][aria-label]'],
      sheetTabs:['[role="tab"]','[aria-selected][aria-label]']
    })) {
      let found=false;
      for(const selector of [...candidates,config.adapter[key]].filter(Boolean)) {
        const locator=scope.locator(selector),count=await locator.count();
        if((key==='sheetTabs'?count>0:count===1) && await locator.first().isVisible()) {
          config.adapter[key]=selector;found=true;break;
        }
      }
      if(!found)missing.push(key);
    }
    // A visible input containing a single A1 address is only accepted when unique.
    if(missing.includes('nameBox')) {
      const inputs=scope.locator('input:visible');const matches=[];
      for(let i=0;i<await inputs.count();i++)if(/^[A-Z]{1,3}[1-9]\d*$/.test(await inputs.nth(i).inputValue()))matches.push(i);
      if(matches.length===1){config.adapter.nameBox='input:visible >> nth='+matches[0];missing.splice(missing.indexOf('nameBox'),1);}
    }
    const sheets=missing.includes('sheetTabs')?[]:await scope.locator(config.adapter.sheetTabs).allTextContents();
    return {config,missing,sheets:sheets.map(s=>s.trim()).filter(Boolean),message:missing.length?'还有 '+missing.length+' 项需要点选，请按页面提示完成。':'已识别网页控件。请检查工作表及填报位置。'};
  }
  async discover(config) {
    this.requirePage(config);
    const frames = [];
    for (const frame of this.page.frames()) {
      const controls = await frame.locator('input:not([type=password]):not([type=hidden]),textarea,[contenteditable=true],[role=tab],[role=status]').evaluateAll(elements => elements.filter(el => el.getBoundingClientRect().width && el.getBoundingClientRect().height).slice(0,60).map(el => ({
        tag:el.tagName.toLowerCase(),id:el.id,classes:typeof el.className==='string'?el.className:'',
        role:el.getAttribute('role')||'',label:el.getAttribute('aria-label')||'',placeholder:el.getAttribute('placeholder')||'',
        text:['tab','status'].includes(el.getAttribute('role')) ? el.textContent.trim().slice(0,80) : ''
      })));
      frames.push({main:frame === this.page.mainFrame(),name:frame.name(),controls});
    }
    return {frames,message:'仅列出可见 DOM 控件属性，不读取密码、Cookie 或网页内部数据。'};
  }
  async pick(config, key) {
    if(!['nameBox','valueBox','sheetTabs','activeSheet','ready','saved'].includes(key)) throw Error('不支持选取此字段');
    this.requirePage(config);
    const locator = this.scope(config).locator('body');
    await this.page.bringToFront();
    const result=await locator.evaluate((body,{kind,label,textControls}) => new Promise(resolve => {
      const banner = document.createElement('div');
      banner.textContent = '填报配置引导：正在选取「'+label+'」。点击目标控件，仅记录位置，不执行原操作。Esc 取消（60 秒后自动结束）。';
      Object.assign(banner.style,{position:'fixed',top:'0',left:'0',right:'0',padding:'14px',background:'#292524',color:'white',zIndex:'2147483647',pointerEvents:'none'});
      body.append(banner);
      const timer = setTimeout(()=>finish({error:'选取超时，请重试'}),60000);
      const block = e => {e.preventDefault();e.stopImmediatePropagation();};
      function finish(result) {clearTimeout(timer);banner.remove();for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.removeEventListener(type,block,true);document.removeEventListener('click',click,true);document.removeEventListener('keydown',keydown,true);resolve(result);}
      function keydown(e) {if(e.key==='Escape'){block(e);finish({error:'已取消控件选取'});}}
      function click(e) {
        block(e);
        let el=e.target.closest(textControls+',[role=tab],[role=status]') || e.target;
        if(kind==='nameBox' || kind==='valueBox') {
          const visible=node=>!!node.getClientRects().length && getComputedStyle(node).visibility!=='hidden';
          if(!el.matches(textControls) && !el.isContentEditable) {
            const children=[...el.querySelectorAll(textControls)].filter(visible);
            if(children.length!==1) {finish({error:'「'+label+'」选中了普通页面区域，'+(children.length?'里面有多个输入框。':'没有找到可输入的控件。')+'请先在网页中点出输入光标，再重新选取。'});return;}
            el=children[0];
          }
          if(el.disabled || el.readOnly || el.getAttribute('aria-readonly')==='true') {finish({error:'「'+label+'」当前只读或已禁用，请确认编辑权限后再选取。'});return;}
        }
        const attr=(name,value)=>'['+name+'='+JSON.stringify(value)+']';
        let selector='';
        if(kind==='sheetTabs') {
          if(el.getAttribute('role')==='tab') selector='[role="tab"]';
          else if(el.classList.length) selector=el.tagName.toLowerCase()+[...el.classList].filter(c=>!/active|selected|current/i.test(c)).map(c=>'.'+CSS.escape(c)).join('');
        } else if(kind==='activeSheet' && el.getAttribute('aria-selected')==='true') selector=el.getAttribute('role')==='tab'?'[role="tab"][aria-selected="true"]':'[aria-selected="true"][aria-label]';
        for(const candidate of [el.id?'#'+CSS.escape(el.id):'',el.getAttribute('data-testid')?attr('data-testid',el.getAttribute('data-testid')):'',el.getAttribute('aria-label')?attr('aria-label',el.getAttribute('aria-label')):'']) {
          if(!selector && candidate && document.querySelectorAll(candidate).length===1) selector=candidate;
        }
        if(!selector) {
          const segments=[];let node=el;
          while(node && node!==body && node.parentElement) {
            const siblings=[...node.parentElement.children].filter(s=>s.tagName===node.tagName);
            segments.unshift(node.tagName.toLowerCase()+':nth-of-type('+(siblings.indexOf(node)+1)+')');
            const candidate=segments.join(' > ');
            if(document.querySelectorAll(candidate).length===1){selector=candidate;break;}
            node=node.parentElement;
          }
        }
        const warning=kind==='activeSheet' && !selector.includes('aria-selected') ? '请确认选择器只匹配当前激活的工作表，不能固定指向某个月份标签。' : kind==='saved' ? '请确认此元素仅在保存完成时可见；必要时补充文本条件。' : '';
        finish(selector?{selector,warning}:{error:'无法生成唯一选择器，请手动填写'});
      }
      for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.addEventListener(type,block,true);
      document.addEventListener('click',click,true);document.addEventListener('keydown',keydown,true);
    }),{kind:key,label:fieldLabels[key],textControls});
    if(result.error)throw fieldError(key,result.error);
    return result;
  }

}
module.exports = {TencentSheetClient,adapterDefaults,anchorSpecs,normalizeAdapter,expand,a1,explainError};
