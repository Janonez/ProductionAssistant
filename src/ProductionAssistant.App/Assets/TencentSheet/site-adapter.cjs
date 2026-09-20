'use strict';

const controlNames = {sheetTab:'Sheet 标签',cellAddressBox:'单元格名称框',cellEditor:'内容编辑区／公式栏',saveStatus:'保存状态'};
const editable = 'input:not([type]),input[type="text"],input[type="search"],textarea,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"]';
const savedPattern = /保存成功|已(?:自动|成功)?保存|最近保存\s*[:：]?\s*(?:[01]?\d|2[0-3])[:：][0-5]\d(?!\d)|已同步|all changes saved|\bsaved\b/i;
const idlePattern = /上次修改(?:是)?在\s*\d+\s*(?:秒|分钟|小时|天)前进行的/;
function classifySaveState(text) {
  if(/保存失败|无法保存|同步失败|未保存|尚未保存|无法同步|未同步|离线|断网|save failed|not saved|unsaved|offline/i.test(text))return 'failed';
  if(/正在保存|保存中|同步中|正在同步|\bsaving\b|\bsyncing\b/i.test(text))return 'saving';
  return savedPattern.test(text)?'saved':idlePattern.test(text)?'idle':'unknown';
}
async function readSaveStatus(locator) {
  const text=await locator.evaluate(el=>[el.innerText || el.textContent || '',el.getAttribute('title'),el.getAttribute('aria-label'),el.getAttribute('data-tooltip')].filter(Boolean).join(' ').trim());
  return {text,state:classifySaveState(text)};
}

function normalizeControls(raw = {}) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('网页控件录制信息无效。');
  const controls = {};
  for (const key of Object.keys(controlNames)) {
    const value = raw[key];
    if (!value) continue;
    if (!Array.isArray(value.strategies) || !value.strategies.length || value.strategies.length > 12 || !Array.isArray(value.frame) || value.frame.length > 5)
      throw Error(controlNames[key]+'录制信息无效，请重新录制。');
    const short = text => typeof text === 'string' && text.length > 0 && text.length <= 1000;
    if (value.frame.some(selector => !short(selector))) throw Error('表格所在框架定位信息无效。');
    const strategies = value.strategies.map(strategy => {
      if (key === 'sheetTab') {
        if (strategy.type !== 'collection' || !short(strategy.parentSelector) || !short(strategy.itemSelector) || (typeof strategy.selectedSelector !== 'string' || strategy.selectedSelector.length > 1000))
          throw Error('Sheet 标签集合规则无效，请重新录制。');
        if(strategy.selectedStyle && (![':scope','span','div','button','a','label'].includes(strategy.selectedStyle.selector) || !['backgroundColor','color','borderBottomColor','borderBottomWidth','fontWeight','boxShadow'].includes(strategy.selectedStyle.property) || !short(strategy.selectedStyle.value)))throw Error('选中状态规则无效，请重新测试控件。');
        return {type:'collection',parentSelector:strategy.parentSelector,itemSelector:strategy.itemSelector,selectedSelector:strategy.selectedSelector,...(strategy.selectedStyle?{selectedStyle:strategy.selectedStyle}:{})};
      }
      if (!['css','role','placeholder'].includes(strategy.type) || !short(strategy.value) || (strategy.type === 'role' && !short(strategy.name)))
        throw Error(controlNames[key]+'定位规则无效，请重新录制。');
      return strategy.type === 'role' ? {type:strategy.type,value:strategy.value,name:strategy.name} : {type:strategy.type,value:strategy.value};
    });
    if (typeof value.sampleText !== 'string' || value.sampleText.length > 300) throw Error('控件示例文字无效。');
    if(key==='saveStatus' && !['saved','idle'].includes(classifySaveState(value.sampleText)))throw Error('请在显示“已保存／最近保存／上次修改时间”时录制保存状态。');
    // Evidence is display-only. Never execute or use user-supplied evidence as a locator.
    const evidence = value.evidence && JSON.stringify(value.evidence).length < 16000 ? value.evidence : {};
    controls[key] = {frame:[...value.frame],strategies,sampleText:value.sampleText,evidence};
  }
  return controls;
}

function scopeFor(page, frame) {
  return frame.reduce((scope, selector) => scope.frameLocator(selector), page);
}

async function resolveControl(page, binding, key, active = false, collectionOnly = false) {
  if (!binding) throw Error('尚未录制'+controlNames[key]+'，请先录制网页控件。');
  const scope = scopeFor(page,binding.frame);
  const reasons=new Set();
  let ambiguous=false;
  for (const strategy of binding.strategies) {
    try {
      if (key === 'sheetTab') {
        const parent = scope.locator(strategy.parentSelector);
        const parents=await parent.count();
        if(parents!==1){ambiguous ||= parents>1;reasons.add(parents?'匹配到了多个标签容器':'标签容器尚未出现');continue;}
        if(!await parent.isVisible()){reasons.add('标签容器尚不可见');continue;}
        const items = parent.locator(strategy.itemSelector).filter({visible:true});
        if (!await items.count()) {reasons.add('集合中尚无可见标签');continue;}
        if(collectionOnly)return items;
        let selected;
        if(strategy.selectedStyle) {
          const matches=await items.evaluateAll((elements,rule)=>elements.map((el,index)=>({index,match:(rule.selector===':scope'?[el]:[...el.querySelectorAll(rule.selector)]).some(node=>getComputedStyle(node)[rule.property]===rule.value)})).filter(item=>item.match).map(item=>item.index),strategy.selectedStyle);
          if(matches.length!==1){ambiguous ||= matches.length>1;reasons.add(matches.length?'选中状态匹配多个标签':'选中状态尚未匹配任何标签');continue;}
          selected=items.nth(matches[0]);
        } else {
          if(!strategy.selectedSelector){reasons.add('尚未配置选中状态规则');continue;}
          selected=items.and(parent.locator(strategy.selectedSelector));
        }
        const selectedCount=await selected.count();
        if(selectedCount!==1){ambiguous ||= selectedCount>1;reasons.add(selectedCount?'选中状态匹配多个标签':'选中状态尚未匹配任何标签');continue;}
        return active ? selected : items;
      }
      const locator = (strategy.type === 'role' ? scope.getByRole(strategy.value,{name:strategy.name,exact:true})
        : strategy.type === 'placeholder' ? scope.getByPlaceholder(strategy.value,{exact:true}) : scope.locator(strategy.value)).filter({visible:true});
      const count=await locator.count();
      if (count !== 1) {ambiguous ||= count>1;reasons.add(count?'匹配到了多个可见控件':'尚未出现可见控件');continue;}
      if(key==='saveStatus')return locator;
      if (!await locator.evaluate((el,selector)=>el.matches(selector) && !el.disabled && !el.readOnly && el.getAttribute('aria-readonly')!=='true',editable)) {reasons.add('控件尚不可编辑');continue;}
      const address = await locator.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.textContent);
      if(key==='cellAddressBox' && !/^\$?[A-Z]{1,3}\$?[1-9]\d{0,6}(?::\$?[A-Z]{1,3}\$?[1-9]\d{0,6})?$/i.test(String(address).trim())) {reasons.add('名称框尚未显示有效单元格地址');continue;}
      return locator;
    } catch { reasons.add('定位规则无法解析或控件正在更新'); }
  }
  const error=Error(controlNames[key]+'定位失败，请重新录制对应网页控件。');
  error.code='ControlUnavailable';
  error.reason=[...reasons].join('；');
  error.ambiguous=ambiguous;
  throw error;
}

// Read-only readiness probes. Never retry navigation, typing or submission here.
async function waitForControl(page, binding, key, timeout, {active=false,collectionOnly=false,text} = {}) {
  const deadline=Date.now()+timeout;
  let last;
  do {
    if(page.isClosed())throw Error('专用浏览器已关闭，操作已中断。');
    await assertNoLogin(page);
    try {
      let locator=await resolveControl(page,binding,key,active,collectionOnly);
      if(text!==undefined) {
        if(collectionOnly) {
          const exact=new RegExp('^'+text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$');
          locator=locator.filter({hasText:exact});
          const count=await locator.count();
          if(count!==1)throw Object.assign(Error(),{code:'ControlUnavailable',reason:count?'目标工作表名称不唯一：'+text:'目标工作表尚未出现：'+text});
        } else if((await locator.innerText()).trim()!==text) {
          throw Object.assign(Error(),{code:'ControlUnavailable',reason:'尚未切换到目标工作表：'+text});
        }
      }
      return locator;
    }
    catch(error) {if(error.code!=='ControlUnavailable')throw error;last=error;}
    await page.waitForTimeout(Math.min(100,Math.max(0,deadline-Date.now())));
  } while(Date.now()<deadline);
  last.message='等待'+controlNames[key]+'就绪超时：'+(last.reason || '定位未通过')+'。请确认网页加载完成并可编辑，再重试。';
  last.field=key;
  throw last;
}

// Runs in each visible document. Analysis and locator construction stay next to the picker
// so the injected code has no dependency on page globals or private application state.
function ElementPicker({kind,session,savedPattern}) {
  const stableClasses = el => [...el.classList].filter(value=>!/(?:active|selected|current|hover|focus|disabled)|\d{5}|^[a-f\d]{8,}$/i.test(value) && !(kind==='saveStatus' && /(?:saved|saving|success|error|failed|pending|complete)/i.test(value))).sort();
  const attr = (key,value) => '['+key+'='+JSON.stringify(value)+']';
  function ElementAnalyzer(el) {
    const feature = node => ({tag:node.tagName.toLowerCase(),id:node.id,class:[...node.classList],role:node.getAttribute('role'),ariaLabel:node.getAttribute('aria-label'),placeholder:node.getAttribute('placeholder')});
    const hierarchy=[];for(let node=el.parentElement;node && hierarchy.length<5;node=node.parentElement)hierarchy.push(feature(node));
    return {...feature(el),text:el.textContent.trim().slice(0,300),parent:el.parentElement?feature(el.parentElement):null,
      siblings:el.parentElement?[...el.parentElement.children].slice(0,20).map(feature):[],hierarchy};
  }
  function LocatorBuilder(el, parentOnly = false) {
    const tag=el.tagName.toLowerCase(),strategies=[];
    const add=(type,value,name) => {
      if (!value || strategies.some(item=>item.type===type && item.value===value)) return;
      if (type==='css' && (document.querySelectorAll(value).length!==1 || document.querySelector(value)!==el)) return;
      strategies.push(name?{type,value,name}:{type,value});
    };
    if(el.id && !/\d{5}|^[a-f\d-]{16,}$/i.test(el.id))add('css','#'+CSS.escape(el.id));
    if(el.getAttribute('aria-label') && kind!=='saveStatus')add('css',tag+attr('aria-label',el.getAttribute('aria-label')));
    if(!parentOnly && kind!=='saveStatus') {
      const role=el.getAttribute('role') || (tag==='input' || tag==='textarea'?'textbox':'');
      const name=el.getAttribute('aria-label') || (el.labels?.length===1?el.labels[0].textContent.trim():'');
      if(role && name)add('role',role,name);
      if(el.getAttribute('placeholder'))add('placeholder',el.getAttribute('placeholder'));
    }
    const classes=stableClasses(el);
    if(classes.length)add('css',tag+classes.map(value=>'.'+CSS.escape(value)).join(''));
    if(el.getAttribute('data-testid'))add('css',tag+attr('data-testid',el.getAttribute('data-testid')));
    // Prefer a stable ancestor and semantic child features; never record an index or coordinates.
    const child=tag+(classes.length?classes.map(value=>'.'+CSS.escape(value)).join(''):el.getAttribute('role')?attr('role',el.getAttribute('role')):'');
    for(let parent=el.parentElement,depth=0;parent && parent!==document.body && depth<4;parent=parent.parentElement,depth++) {
      const selectors=[];
      if(parent.id && !/\d{5}/.test(parent.id))selectors.push('#'+CSS.escape(parent.id));
      const parentClasses=stableClasses(parent);
      if(parentClasses.length)selectors.push(parent.tagName.toLowerCase()+parentClasses.map(value=>'.'+CSS.escape(value)).join(''));
      for(const selector of selectors)if(document.querySelectorAll(selector).length===1)add('css',selector+' '+child);
    }
    return strategies.slice(0,12);
  }
  function collection(target) {
    for(let el=target,depth=0;el && el!==document.body && depth<8;el=el.parentElement,depth++) {
      const parent=el.parentElement;if(!parent)continue;
      const ownClasses=stableClasses(el),role=el.getAttribute('role');
      const shape=node=>[...node.children].map(child=>child.tagName).join(',');
      const siblings=[...parent.children].filter(node=>node.tagName===el.tagName && node.getAttribute('role')===role && node.textContent.trim() && (role==='tab' || stableClasses(node).some(c=>ownClasses.includes(c)) || (shape(el) && shape(node)===shape(el))));
      const classes=ownClasses.filter(c=>siblings.every(node=>stableClasses(node).includes(c)));
      if(siblings.length<2)continue;
      const itemSelector=':scope > '+el.tagName.toLowerCase()+(role?attr('role',role):'')+classes.map(value=>'.'+CSS.escape(value)).join('');
      const matched=[...parent.querySelectorAll(itemSelector)];
      if(matched.length!==siblings.length || matched.some(node=>!siblings.includes(node)))continue;
      const selectors=['[aria-selected="true"]','[aria-current]:not([aria-current="false"]):not([aria-current=""])'];
      for(const node of siblings)for(const c of node.classList)
        if(/active|selected|current/i.test(c) && !/inactive|unselected|(?:not|non)[-_]?(?:active|selected|current)/i.test(c))selectors.push('.'+CSS.escape(c));
      const selectedSelector=selectors.find(selector=>siblings.filter(node=>node.matches(selector)).length===1);
      // Selection is learned by switching tabs during the explicit adapter test.
      const strategies=LocatorBuilder(parent,true).filter(value=>value.type==='css').map(value=>({type:'collection',parentSelector:value.value,itemSelector,selectedSelector:selectedSelector || ''}));
      if(!strategies.length)continue;
      if(!el.textContent.trim())continue;
      return {strategies,sampleText:el.textContent.trim().slice(0,300),evidence:ElementAnalyzer(el),count:siblings.length};
    }
    throw Error('标签集合识别失败：未找到有共同结构的标签及可复用的父容器。请点击标签文字或其外层区域；选中状态将在测试时单独学习。');
  }
  return new Promise(resolve=>{
    const banner=document.createElement('div'),outline=document.createElement('div');
    banner.textContent=kind==='saveStatus'?'请点击网页中显示“已保存／最近保存／上次修改时间”的状态控件，Esc 取消。':kind==='sheetTab'?'请点击任意一个 Sheet 标签。鼠标高亮仅用于录制，Esc 取消。':kind==='cellEditor'?'请点击显示单元格内容、可以输入文字的编辑区或公式栏，Esc 取消。':'请点击左上角显示当前单元格地址的输入框，Esc 取消。';
    banner.dataset.paSitePicker=session;
    Object.assign(banner.style,{position:'fixed',...(kind==='saveStatus'?{bottom:'0'}:{top:'0'}),left:'0',right:'0',padding:'14px',background:'#292524',color:'#fff',zIndex:'2147483647',pointerEvents:'none'});
    Object.assign(outline.style,{position:'fixed',border:'2px solid #C2703D',background:'#C2703D18',zIndex:'2147483646',pointerEvents:'none',display:'none'});
    document.body.append(banner,outline);
    const block=e=>{e.preventDefault();e.stopImmediatePropagation();};
    const highlight=e=>{const rect=e.target.getBoundingClientRect(),hint=banner.getBoundingClientRect();banner.style.visibility=rect.top<hint.bottom && rect.bottom>hint.top && rect.left<hint.right && rect.right>hint.left?'hidden':'visible';Object.assign(outline.style,{display:'block',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});};
    const hide=()=>{outline.style.display='none';};
    const finish=result=>{clearTimeout(timer);banner.remove();outline.remove();for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.removeEventListener(type,block,true);document.removeEventListener('mouseover',highlight,true);document.removeEventListener('mouseout',hide,true);document.removeEventListener('click',click,true);document.removeEventListener('keydown',keydown,true);delete window[session];resolve(result);};
    const timer=setTimeout(()=>finish({error:'录制超时，请重新开始选择。'}),60000);
    const keydown=e=>{if(e.key==='Escape'){block(e);finish({error:'已取消控件录制。'});}};
    const click=e=>{
      block(e);
      try {
        if(kind==='sheetTab'){finish({binding:collection(e.target)});return;}
        if(kind==='saveStatus') {
          const inspected=[];let matchedState=false;
          for(let el=e.target,depth=0;el && el!==document.body && depth<4;el=el.parentElement,depth++) {
            const text=[el.innerText || el.textContent || '',el.getAttribute('title'),el.getAttribute('aria-label'),el.getAttribute('data-tooltip')].filter(Boolean).join(' ').trim();
            inspected.push(`${el.tagName.toLowerCase()}${el.id?'#'+el.id:''}${[...el.classList].slice(0,4).map(value=>'.'+value).join('')}：${text?JSON.stringify(text.slice(0,160)):'（无文字或提示）'}${text.length>300?'（内容超过控件范围）':''}`);
            if(!text || text.length>300 || !new RegExp(savedPattern,'i').test(text))continue;
            matchedState=true;
            const strategies=LocatorBuilder(el);
            if(strategies.length){finish({binding:{strategies,sampleText:text,evidence:ElementAnalyzer(el),count:1}});return;}
          }
          throw Error((matchedState?'已读到保存状态，但无法生成唯一、可复用的控件定位。':'点击位置及其上层元素未读到可识别的保存状态。')+' 实际读取：'+inspected.join(' → '));
        }
        let el=e.target.closest('input,textarea,[contenteditable]') || e.target;
        if(!el.matches('input:not([type]),input[type="text"],input[type="search"],textarea,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"]')) {
          const children=[...el.querySelectorAll('input:not([type]),input[type="text"],input[type="search"],textarea,[contenteditable="true"]')].filter(node=>node.getClientRects().length);
          if(children.length!==1)throw Error('请点击左上角显示单元格地址的输入框，不要选择普通页面区域。');
          el=children[0];
        }
        if(el.disabled || el.readOnly)throw Error('此控件不可编辑，请先确认登录状态和文档权限。');
        const value=/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.textContent;
        if(kind==='cellAddressBox' && !/^\$?[A-Z]{1,3}\$?[1-9]\d{0,6}(?::\$?[A-Z]{1,3}\$?[1-9]\d{0,6})?$/i.test(value.trim()))throw Error('此控件没有显示单元格地址，请点击真正的名称框。');
        const strategies=LocatorBuilder(el);if(!strategies.length)throw Error('无法生成稳定的名称框定位规则，请重新选择。');
        finish({binding:{strategies,sampleText:'',evidence:ElementAnalyzer(el),count:1}});
      } catch(error){finish({error:error.message});}
    };
    window[session]=()=>finish({error:'已结束控件录制。'});
    for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.addEventListener(type,block,true);
    document.addEventListener('mouseover',highlight,true);document.addEventListener('mouseout',hide,true);document.addEventListener('click',click,true);document.addEventListener('keydown',keydown,true);
  });
}

async function framePath(frame) {
  const path=[];
  while(frame.parentFrame()) {
    const element=await frame.frameElement();
    const selector=await element.evaluate(el=>{
      const attr=(name,value)=>'iframe['+name+'='+JSON.stringify(value)+']';
      const candidates=[el.id?'#'+CSS.escape(el.id):'',...['name','title','src'].map(name=>el.getAttribute(name)?attr(name,el.getAttribute(name)):'')];
      return candidates.find(value=>value && document.querySelectorAll(value).length===1) || '';
    });
    if(!selector)throw Error('表格所在框架缺少稳定标识，无法保存可复用适配。');
    path.unshift(selector);frame=frame.parentFrame();
  }
  return path;
}

async function recordControl(page, kind) {
  if(!controlNames[kind])throw Error('不支持的网页控件。');
  const frames=[];
  for(const frame of page.frames()) {
    if(!await frame.locator('body').count())continue;
    if(frame.parentFrame() && !await (await frame.frameElement()).isVisible())continue;
    frames.push(frame);
  }
  if(!frames.length)throw Error('网页尚未加载完成。');
  const session='__paSitePicker_'+require('node:crypto').randomUUID().replaceAll('-','');
  await page.bringToFront();
  try {
    const {result,frame}=await Promise.race(frames.map(async frame=>({frame,result:await frame.evaluate(ElementPicker,{kind,session,savedPattern:savedPattern.source+'|'+idlePattern.source})})));
    if(result.error)throw Error(result.error);
    result.binding.frame=await framePath(frame);
    const locator=await resolveControl(page,result.binding,kind,false,kind==='sheetTab');
    if(kind==='saveStatus' && !['saved','idle'].includes((await readSaveStatus(locator)).state))throw Error('当前保存状态尚未稳定，请等待已保存或上次修改时间出现后重新录制。');
    return result.binding;
  } finally {
    await Promise.allSettled(frames.map(frame=>frame.evaluate(session=>window[session]?.(),session)));
  }
}

async function assertNoLogin(page) {
  if(!page || page.isClosed())return;
  for(const frame of page.frames()) {
    if(frame.parentFrame() && !await (await frame.frameElement()).isVisible())continue;
    const login=await frame.locator('[role="dialog"]:visible,[aria-modal="true"]:visible,dialog:visible,[class*="modal" i]:visible,[class*="overlay" i]:visible,[class*="mask" i]:visible,[class*="login" i]:visible,[id*="login" i]:visible')
      .filter({hasText:/请先登录|扫码|QQ\s*登录|微信\s*登录|登录/}).count();
    const loginFrame=frame.parentFrame() && /login|qrcode|passport/i.test(frame.url()) && /登录|扫码/.test(await frame.locator('body').innerText().catch(()=>''));
    if(login || loginFrame) {const error=Error('请重新扫码登录，然后重新测试控件或检查填报位置。');error.code='LoginRequired';throw error;}
  }
}

async function learnSelection(page, binding, timeout) {
  const tabs=await waitForControl(page,binding,'sheetTab',timeout,{collectionOnly:true});
  const names=(await tabs.allTextContents()).map(text=>text.trim());
  const first=names.indexOf(binding.sampleText),second=names.findIndex((name,index)=>index!==first && name && names.filter(value=>value===name).length===1);
  if(first<0 || names.filter(value=>value===binding.sampleText).length!==1 || second<0)throw Error('标签集合已找到，但需要两个名称不同且唯一的可见标签才能学习选中状态。');
  const unique=(states,index,key)=>states[index].includes(key) && states.every((keys,i)=>i===index || !keys.includes(key));
  async function collection() {
    const current=await resolveControl(page,binding,'sheetTab',false,true);
    if(JSON.stringify((await current.allTextContents()).map(text=>text.trim()))!==JSON.stringify(names))throw Error('学习期间标签集合发生变化，请重新测试控件。');
    await assertNoLogin(page);
    return current;
  }
  async function snapshot() {
    const current=await collection();
    return current.evaluateAll(elements=>elements.map(el=>{
      const rules=[];
      for(const node of [el,...el.querySelectorAll('*')].slice(0,25)) {
        const self=node===el,tag=node.tagName.toLowerCase();
        const css=selector=>rules.push(JSON.stringify({selectedSelector:self?selector:':has('+tag+selector+')'}));
        for(const c of node.classList)css('.'+CSS.escape(c));
        for(const attr of node.attributes)if(/^(aria-|data-)/.test(attr.name) && attr.value.length<200)css('['+CSS.escape(attr.name)+'='+JSON.stringify(attr.value)+']');
        if(self || ['span','div','button','a','label'].includes(tag))for(const property of ['backgroundColor','color','borderBottomColor','borderBottomWidth','fontWeight','boxShadow'])
          rules.push(JSON.stringify({selectedStyle:{selector:self?':scope':tag,property,value:getComputedStyle(node)[property]}}));
      }
      return [...new Set(rules)];
    }));
  }
  // Remove hover/focus before the baseline as well as after each click.
  await tabs.evaluateAll(elements=>elements.forEach(el=>el.blur()));
  await page.mouse.move(0,0);
  const before=await snapshot();
  const recorded=binding.strategies.map(strategy=>JSON.stringify(strategy.selectedStyle
    ? {selectedStyle:strategy.selectedStyle} : {selectedSelector:strategy.selectedSelector}));
  const known=recorded.filter(key=>before.some((_,index)=>unique(before,index,key)));
  async function select(index, keys, initial=false) {
    const current=await collection();
    await current.nth(index).click();
    await current.nth(index).evaluate(el=>el.blur());
    await page.mouse.move(0,0);
    const deadline=Date.now()+timeout;
    let stableSince=0, previous='', last;
    while(Date.now()<deadline) {
      try { last=await snapshot(); }
      catch(error) {
        if(error.code!=='ControlUnavailable')throw error;
        stableSince=0;previous='';await page.waitForTimeout(50);continue;
      }
      const matches=keys.filter(key=>unique(last,index,key));
      const signature=JSON.stringify(matches);
      if(matches.length) {
        if(signature!==previous)stableSince=Date.now();
        // Do not capture a transition frame; the same rule must remain on this tab.
        if(Date.now()-stableSince>=150)return last;
      } else stableSince=0;
      previous=signature;
      await page.waitForTimeout(50);
    }
    // With no known selection rule, clicking an already selected tab can be a no-op.
    // This is only a provisional baseline: the next two switches must prove the rule.
    if(initial && JSON.stringify(last)===JSON.stringify(before))return last;
    throw Error('未能确认切换到「'+names[index]+'」：等待选中状态超时。已停止后续切换，未确认切回录制标签；请检查网页并重试测试。');
  }
  // A new unknown rule must first move from another tab to the clicked tab.
  // Known rules can confirm an already selected target without a needless wait.
  const moved=before.flatMap((rules,index)=>index===first?[]:rules.filter(key=>unique(before,index,key)));
  const a=await select(first,known.length?known:moved,!known.length);
  const initial=a[first].filter(key=>unique(a,first,key));
  const b=await select(second,known.length?known:initial);
  const transferable=initial.filter(key=>unique(b,second,key));
  const again=await select(first,known.length?known:transferable);
  const candidates=transferable.filter(key=>unique(again,first,key));
  candidates.sort((left,right)=>Number(left.includes('selectedStyle'))-Number(right.includes('selectedStyle')));
  if(!candidates.length)throw Error('未发现能随 Sheet 来回切换的选中状态，未保存控件；请检查网页当前工作表后重试测试。');
  const learned=JSON.parse(candidates[0]);
  for(const strategy of binding.strategies) {delete strategy.selectedStyle;strategy.selectedSelector=learned.selectedSelector || '';if(learned.selectedStyle)strategy.selectedStyle=learned.selectedStyle;}
  await waitForControl(page,binding,'sheetTab',timeout,{active:true,text:binding.sampleText});
}

async function testControls(page, controls, timeout = 10000, testTarget = null) {
  const steps=[];
  await assertNoLogin(page);
  // Capture before switching tabs, which can change the current cell selection.
  const initialName=await waitForControl(page,controls.cellAddressBox,'cellAddressBox',timeout);
  const address=testTarget?.address || String(await initialName.evaluate(el=>el.value??el.textContent)).replaceAll('$','').trim().toUpperCase();
  require('./core.js').addressParts(address);
  if(controls.saveStatus) {
    const status=await readSaveStatus(await waitForControl(page,controls.saveStatus,'saveStatus',timeout));
    if(!['saved','idle'].includes(status.state))throw Error('保存状态控件尚未显示已保存或上次修改时间，请等待后重试测试。');
    steps.push({label:'读取保存状态',detail:status.text});
  }
  await learnSelection(page,controls.sheetTab,timeout);
  const tabs=await waitForControl(page,controls.sheetTab,'sheetTab',timeout,{collectionOnly:true});
  steps.push({label:'找到 Sheet 标签集合',detail:`${await tabs.count()} 个标签`});
  const sample=testTarget?.sheet || controls.sheetTab.sampleText;
  const target=tabs.filter({hasText:new RegExp('^'+sample.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')});
  if(!sample || await target.count()!==1)throw Error('测试工作表未找到或不唯一：'+sample+'。请确认今天对应的工作表已打开。');
  await assertNoLogin(page);
  if(testTarget)await target.click();
  await waitForControl(page,controls.sheetTab,'sheetTab',timeout,{active:true,text:sample});
  steps.push({label:'按名称找到并切换工作表',detail:sample});
  const name=await waitForControl(page,controls.cellAddressBox,'cellAddressBox',timeout);
  steps.push({label:'找到单元格名称框',detail:'唯一可编辑控件'});
  await name.click();await assertNoLogin(page);await name.press('Control+A');await name.pressSequentially(address);await name.press('Enter');
  steps.push({label:'名称框定位 '+address,detail:(testTarget?'北京时间今天 '+testTarget.date:'使用测试前选中的单元格，请确认它属于今天')+'；未向业务单元格输入数值'});
  await assertNoLogin(page);
  // Reacquire after blur; this tests the address control, not the document's business anchors.
  await name.evaluate(el=>el.blur());
  await page.waitForTimeout(150);
  const resolved=await waitForControl(page,controls.cellAddressBox,'cellAddressBox',timeout);
  const value=await resolved.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.textContent);
  if(String(value).replaceAll('$','').trim().toUpperCase()!==address)throw Error('名称框定位测试失败：离开输入框后不是 '+address+'，请重新录制名称框。');
  steps.push({label:'核对名称框地址',detail:address});
  let editor;
  try {editor=await waitForControl(page,controls.cellEditor,'cellEditor',timeout);}
  catch(error) {if(error.code==='ControlUnavailable')error.message+=' 测试位置：'+sample+'!'+address+'。请确认今天的这个单元格未受保护且允许编辑。';throw error;}
  const nameHandle=await resolved.elementHandle(),editorHandle=await editor.elementHandle();
  try {
    if(await nameHandle.ownerFrame()===await editorHandle.ownerFrame() && await nameHandle.evaluate((el,other)=>el===other,editorHandle))throw Error('编辑区与名称框录成了同一控件，请重新录制内容编辑区。');
  } finally {await nameHandle.dispose();await editorHandle.dispose();}
  const readEditor=()=>editor.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.innerText??el.textContent??'');
  const before=await readEditor();await editor.focus();await assertNoLogin(page);
  if(await readEditor()!==before || (await resolved.evaluate(el=>el.value??el.textContent)).replaceAll('$','').trim().toUpperCase()!==address)throw Error('聚焦编辑区后内容或单元格地址发生变化，请重新录制编辑区。');
  steps.push({label:'找到并检查内容编辑区',detail:'聚焦后原值与地址保持一致，未输入数据'});
  return steps;
}

module.exports={normalizeControls,resolveControl,waitForControl,recordControl,assertNoLogin,testControls,classifySaveState,readSaveStatus};
