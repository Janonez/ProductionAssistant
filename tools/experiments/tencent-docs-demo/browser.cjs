'use strict';
const core = require('./core.js');

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
  dateFormat: '{yyyy}年{M}月{d}日',
  anchors: Object.fromEntries(anchorSpecs.map(([key,,expected]) => [key,{address:'',expected}]))
};
function normalizeAdapter(raw = {}) {
  const result = {};
  for (const key of ['frame','nameBox','valueBox','sheetTabs','activeSheet','ready','saved','dateFormat']) {
    const value = raw[key] ?? adapterDefaults[key];
    if (typeof value !== 'string' || value.length > 1000) throw Error('网页配置字段格式无效：'+key);
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
    if (!config.adapter[key]) throw Error('请在网页操作设置中填写：'+key);
    const locator = this.scope(config).locator(config.adapter[key]);
    await locator.waitFor({state:'visible'});
    if (await locator.count() !== 1) throw Error(key+' 选择器必须唯一匹配可见元素');
    return locator;
  }
  async text(locator) {
    return (await locator.evaluate(el => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ? el.value : el.innerText ?? el.textContent ?? '')).trim();
  }
  async ready(config) {
    this.requirePage(config);
    await this.one(config,'ready');
    const name = await this.one(config,'nameBox'), value = await this.one(config,'valueBox');
    if (!await name.isEditable() || !await value.isEditable()) throw Error('名称框或值编辑区不可编辑，请检查登录和填写权限');
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
    const name = await this.one(config,'nameBox');
    await name.fill(address);
    await name.press('Enter');
    await name.press('Tab');
    // Do not await requestAnimationFrame: an occluded/minimized sheet can suspend it indefinitely.
    // The concrete page binding must be validated by reading anchors before any write.
    await new Promise(resolve => setTimeout(resolve,100));
    const selected = (await this.text(name)).replace(/\$/g,'').toUpperCase();
    if (selected !== address) throw Error('选中地址不一致：期望 '+address+'，实际 '+selected);
    return this.one(config,'valueBox');
  }
  async read(config, address) { return this.text(await this.locate(config,address)); }
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
    return {sheet:plan.sheet,rows,anchors,conflict:rows.some(r=>r.action==='conflict')};
  }
  async write(config, plan, baseline) {
    const completed = [];
    let attempted = null;
    try {
      if (!config.adapter.saved) throw Error('请先配置网页「已保存」状态选择器');
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
        const editor = await this.locate(config,row.address);
        attempted = row.address;
        await editor.fill(String(row.value));
        await editor.press('Enter');
        await this.one(config,'saved');
        // Navigate away and back so this is a fresh formula-bar read, not the text just typed.
        const other = inspection.rows.find(r => r.address !== row.address).address;
        await this.read(config,other);
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 写后回读不一致');
        completed.push({...row,result:'written',actual}); attempted = null;
      }
      // A reload verifies the server-persisted document rather than only the editor's local value.
      await this.page.reload({waitUntil:'domcontentloaded'});
      await this.selectSheet(config,plan.sheet);
      for (const row of inspection.rows) {
        const actual = await this.read(config,row.address);
        if (!sameNumber(actual,row.value)) throw Error(row.address+' 刷新后回读不一致，服务端保存尚未确认');
      }
      return {completed,message:'真实填报完成，刷新后回读一致。'};
    } catch(error) {
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
    return locator.evaluate((body,kind) => new Promise(resolve => {
      const banner = document.createElement('div');
      banner.textContent = 'Demo 选取模式：点击目标控件，仅记录位置，不执行原操作。Esc 取消（60 秒后自动结束）。';
      Object.assign(banner.style,{position:'fixed',top:'0',left:'0',right:'0',padding:'14px',background:'#292524',color:'white',zIndex:'2147483647',pointerEvents:'none'});
      body.append(banner);
      const timer = setTimeout(()=>finish({error:'选取超时，请重试'}),60000);
      const block = e => {e.preventDefault();e.stopImmediatePropagation();};
      function finish(result) {clearTimeout(timer);banner.remove();for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.removeEventListener(type,block,true);document.removeEventListener('click',click,true);document.removeEventListener('keydown',keydown,true);resolve(result);}
      function keydown(e) {if(e.key==='Escape'){block(e);finish({error:'已取消控件选取'});}}
      function click(e) {
        block(e);
        let el=e.target.closest('input,textarea,[contenteditable=true],[role=tab],[role=status]') || e.target;
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
    }),key);
  }
  async close() { if (this.context) await this.context.close(); }
}
module.exports = {BrowserSession,adapterDefaults,anchorSpecs,normalizeAdapter,expand,a1,playwright};
