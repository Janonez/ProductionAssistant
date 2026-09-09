'use strict';
const api = TencentDemo, $ = id => document.getElementById(id), storageKey = 'pa.tencent-docs-demo.v1';
const service = window.DEMO_SERVICE;
const anchorSpecs = [
  ['cuttingDate','下料日期','{date}'], ['weldingDate','装焊日期','{date}'],
  ['sectionDate','型材日期','{date}'], ['plateDate','板材日期','{date}'],
  ['cuttingCompany','下料公司','{company}'], ['weldingCompany','装焊公司','{company}'],
  ['park','入库园区','{park}'], ['sectionType','型材表头','型材'], ['plateType','板材表头','板材']
];
let config = {...api.defaults}, pending = null, books = {}, checked = false, inspectionId = null, inspectionRows = [], busy = false, dirty = false, writeEnabled=false;
function real() { return $('mode').value === 'real'; }
function status(message, error = false) {
  $('status').textContent = message; $('status').classList.toggle('error', error);
  $('errorDetails').hidden=true;$('errorDetails').open=false;$('errorText').textContent='';$('fixSetting').hidden=true;
}
function showErrorDetails(error) {
  if(error.details){$('errorText').textContent=error.details;$('errorDetails').hidden=false;}
  const field=[...document.querySelectorAll('[data-adapter]')].find(el=>el.dataset.adapter===error.field);
  if(field){$('fixSetting').hidden=false;$('fixSetting').onclick=()=>{showSettings(true);field.focus();field.scrollIntoView({block:'center'});};}
}
function syncStateMode() { $('stateSelectors').hidden=$('stateMode').value!=='selectors'; }
function log(message, error = false) {
  const li = document.createElement('li'); li.textContent = new Date().toLocaleTimeString() + (real() ? ' · 真实网页 · ' : ' · 本地模拟 · ') + message;
  $('logs').prepend(li); while ($('logs').children.length > 40) $('logs').lastElementChild.remove(); status(message,error);
}
function showSettings(show) { $('settings').hidden = !show; $('run').hidden = show; $('settingsTab').setAttribute('aria-selected', show); $('runTab').setAttribute('aria-selected', !show); }
function step(n) { [1,2,3].forEach(i => $('step'+i).classList.toggle('active', i === n)); }
function syncButtons() { $('check').disabled = busy || !pending || dirty; $('execute').disabled = busy || dirty || !pending || !(real() ? writeEnabled && inspectionId : checked); }
function invalidate() { checked = false; inspectionId = null; inspectionRows = []; syncButtons(); }
function discardPlan() { pending = null; invalidate(); $('preview').hidden = true; $('empty').hidden = false; $('previewMeta').textContent = '数据或设置已更改，请重新生成预览'; step(1); }
function configToForm() {
  for (const key in api.defaults) $('configForm').elements[key].value = config[key];
  const adapter = config.adapter || {};
  document.querySelectorAll('[data-adapter]').forEach(input => input.value = adapter[input.dataset.adapter] ?? (input.dataset.adapter==='dateFormat' ? '{yyyy}年{M}月{d}日' : input.dataset.adapter==='stateMode'?'auto':''));
  syncStateMode();
  $('anchorSettings').replaceChildren();
  for(const [key,label,expected] of anchorSpecs) {
    const tr = document.createElement('tr'), name = document.createElement('td'); name.textContent = label; tr.append(name);
    for (const field of ['address','expected']) {
      const td = document.createElement('td'), input = document.createElement('input');
      input.dataset.anchor = key; input.dataset.field = field; input.setAttribute('aria-label',label+(field==='address'?'地址':'期望文本'));
      input.value = adapter.anchors?.[key]?.[field] ?? (field==='expected' ? expected : ''); td.append(input); tr.append(td);
    }
    $('anchorSettings').append(tr);
  }
}
for (const input of document.querySelectorAll('[data-adapter]')) {
  if(['frame','dateFormat','stateMode'].includes(input.dataset.adapter)) continue;
  const button=document.createElement('button');button.type='button';button.textContent='从网页选取';button.hidden=!service;
  button.onclick=()=>operation(async()=> {
    if($('configForm').elements.documentUrl.value.trim()!==config.documentUrl)throw Error('网页地址已修改，请先保存地址并重新打开网页');
    const result=await request('pick',{key:input.dataset.adapter,frame:document.querySelector('[data-adapter="frame"]').value.trim()});input.value=result.selector;dirty=true;discardPlan();
    status('已选取，请保存设置。'+(result.warning||''));
  });
  input.parentElement.append(button);
}
function fromForm() {
  const next = Object.fromEntries(Object.keys(api.defaults).map(key=>[key,$('configForm').elements[key].value]));
  for (const key of ['timeout','cuttingRow','weldingRow','inboundRow']) next[key] = Number(next[key]);
  next.startColumn = next.startColumn.trim().toUpperCase(); next.documentUrl = next.documentUrl.trim();
  next.adapter = {anchors:{}};
  document.querySelectorAll('[data-adapter]').forEach(input => next.adapter[input.dataset.adapter] = input.value.trim());
  document.querySelectorAll('[data-anchor]').forEach(input => { (next.adapter.anchors[input.dataset.anchor] ||= {})[input.dataset.field] = input.value.trim(); });
  return api.validate(next);
}
async function request(route, body) {
  if(!service) throw Error('请先运行 start.cmd，然后迁移当前配置到本地服务');
  const response = await fetch('/api/'+route,{method:body === undefined?'GET':'POST',headers:{'X-Demo-Token':service.token,'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const result = await response.json();
  if(!response.ok) {
    let message = result.error || '本地服务请求失败';
    if(result.completed?.length) message += '；已完成：'+result.completed.map(r=>r.address+'（已写入）').join('、');
    if(result.uncertainAddress) message += '；结果不确定：'+result.uncertainAddress+'，请读取确认，勿直接重试';
    const error=Error(message);error.details=result.details;error.field=result.field;throw error;
  }
  return result;
}
async function operation(action) {
  if(busy) return;
  busy = true;
  const states = [...document.querySelectorAll('button,input,select,textarea')].map(el=>[el,el.disabled]);
  states.forEach(([el]) => el.disabled = true);
  status('正在执行，请等待；不要操作专用浏览器…');
  try { await action(); }
  catch(e) { invalidate(); log(e.message,true);showErrorDetails(e); }
  finally { busy = false; states.forEach(([el,disabled]) => el.disabled = disabled); syncButtons(); }
}
async function save(next) {
  next = api.validate(next);
  if(service) {const result=await request('config',next);next=result.config;writeEnabled=result.writeEnabled===true && result.protocol==='content-edit-v3.2';}
  let localWarning = '';
  try { localStorage.setItem(storageKey,JSON.stringify(next)); }
  catch { if(!service) throw Error('浏览器不允许保存本地配置，请导出配置备份'); localWarning = '；浏览器缓存不可用，但本机服务已保存'; }
  config = next; dirty = false; configToForm(); discardPlan(); status((service?'设置已保存到本机服务':'设置已保存到当前浏览器')+localWarning);
}
function modeChanged() {
  if(real() && !service) { $('mode').value = 'simulation'; status('真实模式需先启动 start.cmd，然后点击「迁移当前配置到本地服务」。',true); }
  const isReal = real();
  $('browserPanel').hidden = !isReal; $('simulationPanel').hidden = isReal; $('realPolicy').hidden = !isReal;
  $('modeNotice').textContent = isReal ? '真实网页模式：操作由本机 Playwright 服务执行。检查只读，确认填报后才修改文档。请先保存配置并打开专用浏览器。' : '本地模拟模式：所有填报只改变内存中的模拟表格，不访问真实文档。';
  $('currentHeading').textContent = isReal ? '网页已有值' : '模拟已有值';
  $('check').textContent = isReal ? '检查真实目标（只读）' : '检查模拟目标';
  $('execute').textContent = isReal ? writeEnabled ? '确认真实填报…' : '真实写入已暂停' : '模拟填报并回读';
  $('writeBlockNotice').hidden=!isReal || writeEnabled;
  $('logTag').textContent = isReal ? '真实网页' : '本地模拟'; discardPlan();
}
$('settingsShortcut').onclick = $('settingsTab').onclick = () => showSettings(true);
$('runTab').onclick = () => showSettings(false);
$('mode').onchange = modeChanged;
$('stateMode').onchange = syncStateMode;
$('configForm').oninput = () => { dirty = true; discardPlan(); status('设置尚未保存。请保存后再执行。'); };
$('configForm').onsubmit = event => { event.preventDefault(); operation(async()=>save(fromForm())); };
$('exportConfig').onclick = () => {
  const blob = new Blob([JSON.stringify(config,null,2)],{type:'application/json'}), url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = 'tencent-docs-demo-config.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
};
$('importConfig').onclick = () => $('configFile').click();
$('configFile').onchange = event => operation(async()=> {
  try {
    const file = event.target.files[0]; if(!file) return;
    if(file.size > 60000) throw Error('配置文件过大');
    const parsed = JSON.parse(await file.text());
    if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) throw Error('配置格式无效');
    const next = {...api.defaults}; for(const key in next) next[key] = parsed[key] ?? next[key];
    if(parsed.adapter) next.adapter = parsed.adapter;
    await save(next);
  } finally { event.target.value=''; }
});
$('migrate').onclick = () => {
  if(dirty) return status('请先保存当前设置再迁移。',true);
  window.open('http://127.0.0.1:43128/#import='+encodeURIComponent(JSON.stringify(config)),'_blank','noopener');
};
function inputPlan() {
  if(dirty) throw Error('设置尚未保存');
  return api.plan(config,$('date').value,requestData().values);
}
function requestData() { return {date:$('date').value,values:Object.fromEntries(['cutting','welding','section','plate'].map(key=>[key,$('dataForm').elements[key].value]))}; }
$('dataForm').oninput = discardPlan;
$('sample').onclick = () => { ['42.35','28.6','12.8','19.2'].forEach((v,i)=>$('dataForm').elements[['cutting','welding','section','plate'][i]].value=v); discardPlan(); status('已填入示例数据，请生成预览。'); };
function cells() { return books[pending.sheet] ||= {}; }
function render(rows) {
  const tbody = $('preview').querySelector('tbody'); tbody.replaceChildren();
  for(const row of rows) {
    const tr = document.createElement('tr');
    [row.label,row.owner,row.address,String(row.value)].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});
    const td = document.createElement('td');
    if(real()) td.textContent = row.current === undefined ? '未读取' : row.current === '' ? '空' : row.current;
    else {
      const input = document.createElement('input'); input.value = cells()[row.address] ?? ''; input.placeholder='空'; input.setAttribute('aria-label',row.address+' 模拟已有值');
      input.oninput = () => { cells()[row.address]=input.value; invalidate(); tbody.querySelectorAll('[data-result]').forEach(el=>{el.textContent='待重新检查';el.className='';});step(2); };
      td.append(input);
    }
    tr.append(td); const result = document.createElement('td'); result.dataset.result='';
    result.textContent = ({write:'待填报',conflict:'冲突 · 停止',written:'已写入并回读'})[row.result||row.action] || '待检查';
    result.className = row.action==='conflict'?'error':''; tr.append(result); tbody.append(tr);
  }
}
$('dataForm').onsubmit = event => {
  event.preventDefault();
  try { pending=inputPlan();invalidate();render(pending.rows);$('preview').hidden=false;$('empty').hidden=true;$('previewMeta').textContent=`${pending.sheet} · 业务日期 ${pending.date}`;step(2);log('已计算 4 个目标地址，尚未读取或写入网页。'); }
  catch(e) {discardPlan();status(e.message,true);}
};
$('scenario').onchange = () => {invalidate();if(pending)render(pending.rows);step(pending?2:1);};
$('clearCells').onclick = () => {books={};invalidate();if(pending)render(pending.rows);log('已清空本地模拟表格。');};
$('check').onclick = () => operation(async()=> {
  if(!pending) return; invalidate();
  if(real()) {
    const result = await request('inspect',requestData()); render(result.rows);
    $('connection').textContent='已读取目标文档';
    if(result.conflict) throw Error('已有值冲突，未写入任何单元格');
    inspectionId=result.inspectionId; inspectionRows=result.rows; step(3);
    log('真实检查通过：已读取 '+result.anchors.length+' 个校验格，并验证 4 个目标格的实际选区、编辑焦点和原值。检查结果 2 分钟内有效。');
  } else {
    const rows=api.preflight(pending,cells(),$('scenario').value);render(rows);
    if(rows.some(r=>r.action==='conflict'))throw Error('发现已有值冲突，整批停止，未写入。');
    checked=true;step(3);log('模拟检查通过，尚未填报。');
  }
});
$('execute').onclick = () => {
  if(!pending) return;
  if(real()) {
    if(!writeEnabled)return;
    if(!inspectionId) return;
    $('writeSummary').textContent = pending.sheet+' · '+pending.date+'：'+inspectionRows.map(r=>`${r.address} = ${r.value}`).join('；');
    $('confirmWrite').showModal();
  } else if(checked) operation(async()=> {
    const result=api.simulate(pending,cells(),$('scenario').value);books[pending.sheet]=result.cells;render(result.rows.map(r=>({...r,result:'written'})));
    log(`模拟回读通过：填报 ${result.rows.filter(r=>r.action==='write').length} 格。未访问真实文档。`);invalidate();
  });
};
$('cancelWrite').onclick = () => $('confirmWrite').close();
$('submitWrite').onclick = () => { $('confirmWrite').close(); operation(async()=> {
  const id=inspectionId;invalidate();const result=await request('write',{inspectionId:id});
  render(result.completed.map(r=>({...r,current:r.actual ?? r.current})));log(result.message);
  $('connection').textContent='网页填报及刷新回读已完成';
}); };
for(const [id,route] of [['openBrowser','open'],['browserStatus','status'],['closeBrowser','close']]) $(id).onclick=()=>operation(async()=> {
  if(dirty)throw Error('请先保存设置'); invalidate(); const result=await request(route,{});$('connection').textContent=result.message;log(result.message);
});
$('discover').onclick=()=>operation(async()=> {
  if(dirty)throw Error('请先保存设置');const result=await request('discover',{});$('discovery').hidden=false;$('discovery').open=true;$('discoveryOutput').textContent=JSON.stringify(result.frames,null,2);log(result.message);
});
$('readCell').onclick=()=>operation(async()=> {
  if(dirty)throw Error('请先保存设置');invalidate();const result=await request('read',{date:$('date').value,address:$('readAddress').value.trim().toUpperCase()});
  $('readResult').textContent=`${result.sheet} / ${result.address} = ${result.value===''?'（空）':result.value}`;log('已从真实网页读取 '+result.address+'，未写入。');
  $('connection').textContent='已读取目标文档';
});
$('diagnoseCell').onclick=()=>operation(async()=> {
  if(dirty)throw Error('请先保存设置');invalidate();
  const result=await request('diagnose',{date:$('date').value,address:$('readAddress').value.trim().toUpperCase()});
  $('readResult').textContent=`选区验证：${result.address}；聚焦后地址：${result.returnedAddress}；编辑原值：${result.editorValue===''?'（空）':result.editorValue}。已退出编辑，未输入数据。原始字符：${result.rawCodePoints?.join(" ")||"（无）"}。`;
  log(result.message);
});
async function initialize() {
  let warning='';
  try {const stored=localStorage.getItem(storageKey);if(stored)config=api.validate(JSON.parse(stored));}catch{warning='本地浏览器配置读取失败，请导入备份。';}
  const today=new Date();$('date').value=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  if(service) {
    try {
      const saved=await request('config');config=saved.config;warning=saved.warning;writeEnabled=saved.writeEnabled===true && saved.protocol==='content-edit-v3.2';
      if(location.hash.startsWith('#import=')) {
        const imported=JSON.parse(decodeURIComponent(location.hash.slice(8)));
        history.replaceState(null,'',location.pathname);await save(imported);warning='原 Demo 配置已迁移。网页操作设置可在此继续补充。';
      }
      $('mode').value='real';$('serviceLabel').textContent=writeEnabled?'本机服务 · 单元格编辑写入 v3.2':'服务版本过旧，请重启 start.cmd';
    } catch(e) {warning='本机服务初始化失败：'+e.message;}
  } else $('serviceLabel').textContent='文件预览 · 请运行 start.cmd 启用真实操作';
  $('migrate').hidden=!!service;configToForm();modeChanged();if(warning)status(warning);
}
window.demoInitialized=initialize();
