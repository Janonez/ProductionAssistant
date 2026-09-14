'use strict';

const controlNames = {sheetTab:'Sheet 标签',cellAddressBox:'单元格名称框',cellEditor:'内容编辑区／公式栏'};
const editable = 'input:not([type]),input[type="text"],input[type="search"],textarea,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"]';

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
        throw Error('单元格名称框定位规则无效，请重新录制。');
      return strategy.type === 'role' ? {type:strategy.type,value:strategy.value,name:strategy.name} : {type:strategy.type,value:strategy.value};
    });
    if (typeof value.sampleText !== 'string' || value.sampleText.length > 300) throw Error('控件示例文字无效。');
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
  for (const strategy of binding.strategies) {
    try {
      if (key === 'sheetTab') {
        const parent = scope.locator(strategy.parentSelector);
        if (await parent.count() !== 1 || !await parent.isVisible()) continue;
        const items = parent.locator(strategy.itemSelector).filter({visible:true});
        if (!await items.count()) continue;
        if(collectionOnly)return items;
        let selected;
        if(strategy.selectedStyle) {
          const matches=await items.evaluateAll((elements,rule)=>elements.map((el,index)=>({index,match:(rule.selector===':scope'?[el]:[...el.querySelectorAll(rule.selector)]).some(node=>getComputedStyle(node)[rule.property]===rule.value)})).filter(item=>item.match).map(item=>item.index),strategy.selectedStyle);
          if(matches.length!==1)continue;
          selected=items.nth(matches[0]);
        } else {
          if(!strategy.selectedSelector)continue;
          selected=items.and(parent.locator(strategy.selectedSelector));
        }
        if (await selected.count() !== 1) continue;
        return active ? selected : items;
      }
      const locator = (strategy.type === 'role' ? scope.getByRole(strategy.value,{name:strategy.name,exact:true})
        : strategy.type === 'placeholder' ? scope.getByPlaceholder(strategy.value,{exact:true}) : scope.locator(strategy.value)).filter({visible:true});
      if (await locator.count() !== 1) continue;
      if (!await locator.evaluate((el,selector)=>el.matches(selector) && !el.disabled && !el.readOnly && el.getAttribute('aria-readonly')!=='true',editable)) continue;
      const address = await locator.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.textContent);
      if(key==='cellAddressBox' && !/^\$?[A-Z]{1,3}\$?[1-9]\d{0,6}(?::\$?[A-Z]{1,3}\$?[1-9]\d{0,6})?$/i.test(String(address).trim()))continue;
      return locator;
    } catch { /* A stale candidate may fail; try the next recorded, independently validated candidate. */ }
  }
  const error=Error(controlNames[key]+'定位失败，请重新录制对应网页控件。');
  error.code='ControlUnavailable';
  throw error;
}

// Runs in each visible document. Analysis and locator construction stay next to the picker
// so the injected code has no dependency on page globals or private application state.
function ElementPicker({kind,session}) {
  const stableClasses = el => [...el.classList].filter(value=>!/(?:active|selected|current|hover|focus|disabled)|\d{5}|^[a-f\d]{8,}$/i.test(value)).sort();
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
    if(el.getAttribute('aria-label'))add('css',tag+attr('aria-label',el.getAttribute('aria-label')));
    if(!parentOnly) {
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
    banner.textContent=kind==='sheetTab'?'请点击任意一个 Sheet 标签。鼠标高亮仅用于录制，Esc 取消。':kind==='cellEditor'?'请点击显示单元格内容、可以输入文字的编辑区或公式栏，Esc 取消。':'请点击左上角显示当前单元格地址的输入框，Esc 取消。';
    banner.dataset.paSitePicker=session;
    Object.assign(banner.style,{position:'fixed',top:'0',left:'0',right:'0',padding:'14px',background:'#292524',color:'#fff',zIndex:'2147483647',pointerEvents:'none'});
    Object.assign(outline.style,{position:'fixed',border:'2px solid #C2703D',background:'#C2703D18',zIndex:'2147483646',pointerEvents:'none',display:'none'});
    document.body.append(banner,outline);
    const block=e=>{e.preventDefault();e.stopImmediatePropagation();};
    const highlight=e=>{const rect=e.target.getBoundingClientRect();Object.assign(outline.style,{display:'block',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});};
    const hide=()=>{outline.style.display='none';};
    const finish=result=>{clearTimeout(timer);banner.remove();outline.remove();for(const type of ['pointerdown','mousedown','pointerup','mouseup'])document.removeEventListener(type,block,true);document.removeEventListener('mouseover',highlight,true);document.removeEventListener('mouseout',hide,true);document.removeEventListener('click',click,true);document.removeEventListener('keydown',keydown,true);delete window[session];resolve(result);};
    const timer=setTimeout(()=>finish({error:'录制超时，请重新开始选择。'}),60000);
    const keydown=e=>{if(e.key==='Escape'){block(e);finish({error:'已取消控件录制。'});}};
    const click=e=>{
      block(e);
      try {
        if(kind==='sheetTab'){finish({binding:collection(e.target)});return;}
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
    const {result,frame}=await Promise.race(frames.map(async frame=>({frame,result:await frame.evaluate(ElementPicker,{kind,session})})));
    if(result.error)throw Error(result.error);
    result.binding.frame=await framePath(frame);
    await resolveControl(page,result.binding,kind,false,kind==='sheetTab');
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

async function learnSelection(page, binding) {
  const tabs=await resolveControl(page,binding,'sheetTab',false,true);
  const names=(await tabs.allTextContents()).map(text=>text.trim());
  const first=names.indexOf(binding.sampleText),second=names.findIndex((name,index)=>index!==first && name && names.filter(value=>value===name).length===1);
  if(first<0 || names.filter(value=>value===binding.sampleText).length!==1 || second<0)throw Error('标签集合已找到，但需要两个名称不同且唯一的可见标签才能学习选中状态。');
  async function snapshot(index) {
    const current=await resolveControl(page,binding,'sheetTab',false,true);
    if(JSON.stringify((await current.allTextContents()).map(text=>text.trim()))!==JSON.stringify(names))throw Error('学习期间标签集合发生变化，请重新测试控件。');
    await assertNoLogin(page);
    await current.nth(index).click();
    await current.nth(index).evaluate(el=>el.blur());
    await page.mouse.move(0,0);
    await page.waitForTimeout(250);
    await assertNoLogin(page);
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
  const a=await snapshot(first),b=await snapshot(second),again=await snapshot(first);
  const unique=(states,index,key)=>states[index].includes(key) && states.every((keys,i)=>i===index || !keys.includes(key));
  const candidates=a[first].filter(key=>unique(a,first,key) && unique(b,second,key) && unique(again,first,key));
  candidates.sort((left,right)=>Number(left.includes('selectedStyle'))-Number(right.includes('selectedStyle')));
  if(!candidates.length)throw Error('标签集合已找到，但切换前后没有发现可验证的选中状态。已切回录制标签；请重新录制或反馈此状态识别失败。');
  const learned=JSON.parse(candidates[0]);
  for(const strategy of binding.strategies) {delete strategy.selectedStyle;strategy.selectedSelector=learned.selectedSelector || '';if(learned.selectedStyle)strategy.selectedStyle=learned.selectedStyle;}
  await resolveControl(page,binding,'sheetTab',true);
}

async function testControls(page, controls) {
  const steps=[];
  await assertNoLogin(page);
  await learnSelection(page,controls.sheetTab);
  const tabs=await resolveControl(page,controls.sheetTab,'sheetTab');
  steps.push({label:'找到 Sheet 标签集合',detail:`${await tabs.count()} 个标签`});
  const sample=controls.sheetTab.sampleText;
  const target=tabs.filter({hasText:new RegExp('^'+sample.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')});
  if(!sample || await target.count()!==1)throw Error('录制的 Sheet 标签未找到或不唯一，请重新录制一个 Sheet 标签。');
  await target.click();await assertNoLogin(page);
  const active=await resolveControl(page,controls.sheetTab,'sheetTab',true);
  if((await active.innerText()).trim()!==sample)throw Error('Sheet 切换后选中状态不一致，请重新录制 Sheet 标签。');
  steps.push({label:'按名称找到并切换工作表',detail:sample});
  const name=await resolveControl(page,controls.cellAddressBox,'cellAddressBox');
  steps.push({label:'找到单元格名称框',detail:'唯一可编辑控件'});
  await name.click();await assertNoLogin(page);await name.press('Control+A');await name.pressSequentially('J9');await name.press('Enter');
  steps.push({label:'名称框定位 J9',detail:'未向业务单元格输入数值'});
  await assertNoLogin(page);
  // Reacquire after blur; this tests the address control, not the document's business anchors.
  await name.evaluate(el=>el.blur());
  await page.waitForTimeout(150);
  const resolved=await resolveControl(page,controls.cellAddressBox,'cellAddressBox');
  const value=await resolved.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.textContent);
  if(String(value).replaceAll('$','').trim().toUpperCase()!=='J9')throw Error('名称框定位测试失败：离开输入框后不是 J9，请重新录制名称框。');
  steps.push({label:'核对名称框地址',detail:'J9'});
  const editor=await resolveControl(page,controls.cellEditor,'cellEditor');
  const nameHandle=await resolved.elementHandle(),editorHandle=await editor.elementHandle();
  try {
    if(await nameHandle.ownerFrame()===await editorHandle.ownerFrame() && await nameHandle.evaluate((el,other)=>el===other,editorHandle))throw Error('编辑区与名称框录成了同一控件，请重新录制内容编辑区。');
  } finally {await nameHandle.dispose();await editorHandle.dispose();}
  const readEditor=()=>editor.evaluate(el=>/^(INPUT|TEXTAREA)$/.test(el.tagName)?el.value:el.innerText??el.textContent??'');
  const before=await readEditor();await editor.focus();await assertNoLogin(page);
  if(await readEditor()!==before || (await resolved.evaluate(el=>el.value??el.textContent)).replaceAll('$','').trim().toUpperCase()!=='J9')throw Error('聚焦编辑区后内容或单元格地址发生变化，请重新录制编辑区。');
  steps.push({label:'找到并检查内容编辑区',detail:'聚焦后原值与地址保持一致，未输入数据'});
  return steps;
}

module.exports={normalizeControls,resolveControl,recordControl,assertNoLogin,testControls};
