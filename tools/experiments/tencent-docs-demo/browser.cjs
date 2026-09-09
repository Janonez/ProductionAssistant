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

function playwright() {
  try { return require('playwright'); }
  catch { return require('../machining_summary/playwright_test/FineReportTest/node_modules/playwright'); }
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

class BrowserSession {
  constructor(profile, options = {}) { this.profile = profile; this.options = options; this.context = null; this.page = null; this.documentUrl = null; }
  async open(config) {
    if (!config.documentUrl) throw Error('请先在环境设置中保存测试网页地址');
    if (!this.context) {
      this.context = await playwright().chromium.launchPersistentContext(this.profile, {
        channel:'msedge',headless:false,viewport:null,...this.options
      });
      this.context.on('close', () => { this.context = null; this.page = null; this.documentUrl = null; });
    }
    if (!this.page || this.page.isClosed()) this.page = this.context.pages()[0] || await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout * 1000);
    this.documentUrl = config.documentUrl;
    await this.page.goto(config.documentUrl,{waitUntil:'domcontentloaded',timeout:config.timeout*1000});
    await this.page.bringToFront();
    return {title:await this.page.title(),message:'已打开专用浏览器。请在网页中完成扫码，再检查连接。'};
  }
  requirePage(config) {
    if (!this.page || this.page.isClosed()) throw Error('请先点击「打开网页 / 扫码登录」');
    if (this.documentUrl !== config.documentUrl) throw Error('文档地址已变更，请重新打开网页');
    const expected = new URL(config.documentUrl), actual = new URL(this.page.url());
    if (actual.origin !== expected.origin || actual.pathname !== expected.pathname) throw Error('浏览器不在目标文档，可能需要完成登录；请重新打开文档');
    this.page.setDefaultTimeout(config.timeout*1000);
  }
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
  async text(locator) {
    return (await locator.evaluate(el => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ? el.value : el.innerText ?? el.textContent ?? '')).trim();
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
  async read(config, address) { return this.text(await this.locate(config,address)); }
  async selectedAddress(config) {
    return (await this.text(await this.control(config,'nameBox'))).replace(/\$/g,'').toUpperCase();
  }
  async waitAddress(config,expected) {
    const until=Date.now()+Math.min(config.timeout*1000,3000);let actual;
    do {
      actual=await this.selectedAddress(config);
      if(actual===expected)return;
      await new Promise(resolve=>setTimeout(resolve,50));
    } while(Date.now()<until);
    throw Error('定位验证未通过：期望实际选区 '+expected+'，名称框返回 '+actual+'。未输入填报值。');
  }
  async editorFocused(editor) {
    return editor.evaluate(el=>el===el.ownerDocument.activeElement || el.contains(el.ownerDocument.activeElement));
  }
  async prepareEdit(config,address,expected) {
    let editor=await this.locate(config,address);
    const name=await this.control(config,'nameBox');
    // A field echoing the address we just typed is not independent selection evidence.
    // Native arrow navigation must update that address without writing into the name box.
    if(await this.editorFocused(name))throw fieldError('nameBox','名称框输入地址后没有把焦点交回表格，无法确认实际选区。未输入填报值。');
    const focus=await this.scope(config).locator('body').evaluate(body=>{
      const el=body.ownerDocument.activeElement;
      return {tag:el?.tagName||'',editable:!!el?.isContentEditable,role:el?.getAttribute('role')||''};
    });
    if((/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(focus.tag) || focus.editable) && !await this.editorFocused(editor))throw Error('焦点不在表格或配置的编辑器中，停止定位验证。未输入填报值。');
    const [,column,rowText]=/^([A-Z]+)(\d+)$/.exec(address), row=Number(rowText);
    const direction=row===1048576?-1:1, neighbour=column+(row+direction);
    await this.page.keyboard.press(direction===1?'ArrowDown':'ArrowUp');
    await this.waitAddress(config,neighbour);
    await this.page.keyboard.press(direction===1?'ArrowUp':'ArrowDown');
    await this.waitAddress(config,address);
    // Enter cell edit mode through the sheet's own keyboard handler. Do not focus/fill
    // the shared editor directly: its DOM can show a new value while its edit target is old.
    await this.page.keyboard.press('F2');
    editor=await this.control(config,'valueBox');
    if(!await this.editorFocused(editor))throw fieldError('valueBox','按 F2 后，编辑焦点没有进入配置的值编辑区。未输入填报值，请使用定位与编辑诊断检查。');
    const actualAddress=await this.selectedAddress(config), actualValue=await this.text(editor);
    if(actualAddress!==address)throw Error('进入编辑后选区变成 '+actualAddress+'，目标应为 '+address+'。未输入填报值。');
    if(actualValue!==expected)throw Error(address+' 进入编辑后的原值不一致：期望「'+expected+'」，实际「'+actualValue+'」。未输入填报值。');
    return {editor,evidence:{address,neighbour,returnedAddress:actualAddress,editorValue:actualValue,editingVerified:true}};
  }
  async diagnose(config,address) {
    const current=await this.read(config,address);
    try {
      const {evidence}=await this.prepareEdit(config,address,current);
      return {...evidence,message:'定位往返、编辑焦点和原值验证通过；未输入或提交填报数据。'};
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
    return {sheet:plan.sheet,rows,anchors,conflict,editing,editingVerified:!conflict && editing.length===rows.length};
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
        if (row.action === 'skip') { completed.push({...row,result:'skipped'}); continue; }
        const {editor}=await this.prepareEdit(config,row.address,current);
        await this.page.keyboard.press('Control+A');
        if(!await this.editorFocused(editor) || await this.selectedAddress(config)!==row.address)throw Error(row.address+' 输入前焦点或选区发生变化，未输入填报值。');
        attempted = row.address;
        await this.page.keyboard.insertText(String(row.value));
        await this.page.keyboard.press('Enter');
        if(config.adapter.stateMode==='selectors')await this.one(config,'saved');
        // Navigate away and back so this is a fresh formula-bar read, not the text just typed.
        const other = inspection.rows.find(r => r.address !== row.address).address;
        await this.read(config,other);
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 写后回读不一致：期望「'+row.value+'」，实际「'+actual+'」');
        completed.push({...row,result:'written',actual}); attempted = null;
      }
      // Allow debounced autosave to start; the delay is NOT evidence of a successful save.
      // Only the subsequent reload/readback can mark the run complete.
      if(config.adapter.stateMode!=='selectors' && completed.some(r=>r.result==='written'))await new Promise(resolve=>setTimeout(resolve,2000));
      // A reload verifies the reopened document rather than only the text just entered.
      await this.page.reload({waitUntil:'domcontentloaded'});
      await this.selectSheet(config,plan.sheet);
      for (const row of inspection.rows) {
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 刷新后回读不一致，服务端保存尚未确认');
      }
      return {completed,message:'真实填报完成，刷新后回读一致。'};
    } catch(error) {
      await this.page?.keyboard.press('Escape').catch(()=>{});
      error.completed = completed;
      error.uncertainAddress = attempted;
      throw error;
    }
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
      banner.textContent = 'Demo 选取模式：正在选取「'+label+'」。点击目标控件，仅记录位置，不执行原操作。Esc 取消（60 秒后自动结束）。';
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
        } else if(kind==='activeSheet' && el.getAttribute('aria-selected')==='true') selector='[role="tab"][aria-selected="true"]';
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
  async close() { if (this.context) await this.context.close(); }
}
module.exports = {BrowserSession,adapterDefaults,anchorSpecs,normalizeAdapter,expand,a1,playwright,explainError};
