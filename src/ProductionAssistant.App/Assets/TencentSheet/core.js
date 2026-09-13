(function (root) {
  'use strict';
  const defaults = {
    documentUrl: '', sheetPattern: '下料、装焊（{yy}年{M}月）',
    company: '滨海公司', park: '滨海园区', startColumn: 'F',
    cuttingRow: 9, weldingRow: 19, inboundRow: 35, timeout: 30
  };
  function columnNumber(value) {
    if (!/^[A-Z]{1,3}$/.test(value)) throw Error('起始列请填写 A–XFD 的列字母');
    return [...value].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
  }
  function columnName(n) {
    if (!Number.isInteger(n) || n < 1 || n > 16384) throw Error('目标列超出 A–XFD 范围');
    let s = '';
    while (n) { n--; s = String.fromCharCode(65 + n % 26) + s; n = Math.floor(n / 26); }
    return s;
  }
  const metricKeys = ['cutting', 'welding', 'section', 'plate'];
  function fieldKeys(config) { return config.fields ? config.fields.map(field=>field.id) : metricKeys; }
  function sheetName(config, date) {
    const {year,month}=dateParts(date);
    return config.sheetMode==='fixed'?config.sheetName:config.sheetPattern.replace(/\{yyyy\}/g,String(year)).replace(/\{yy\}/g,String(year).slice(-2)).replace(/\{M\}/g,String(month));
  }
  const dateFormats = ['{yyyy}/{M}/{d}', '{yyyy}/{MM}/{dd}', '{yyyy}-{MM}-{dd}', '{yyyy}-{M}-{d}', '{yyyy}年{M}月{d}日', '{M}月{d}日', '{M}/{d}', '{MM}/{dd}', '{M}.{d}', '{d}日', '{dd}日', '{d}', '{dd}'];
  function dateParts(date) {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw Error('请选择完整业务日期');
    const parsed = new Date(date + 'T00:00:00Z');
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw Error('业务日期无效');
    const [year, month, day] = date.split('-').map(Number);
    return { year, month, day, monthKey: date.slice(0, 7), days: new Date(Date.UTC(year, month, 0)).getUTCDate() };
  }
  function addressParts(address) {
    const match = typeof address === 'string' && /^([A-Z]{1,3})([1-9]\d{0,6})$/.exec(address);
    if (!match) throw Error('请单击一个单元格，不要框选多个单元格；合并格请使用左上角地址');
    const column = columnNumber(match[1]), row = Number(match[2]);
    columnName(column);
    if (row > 1048576) throw Error('目标行超出表格范围');
    return { column, row };
  }
  function movedAddress(address, dayOffset, rule) {
    const base = addressParts(address), row = base.row + dayOffset * rule.rowStep;
    if (!Number.isInteger(row) || row < 1 || row > 1048576) throw Error('按此规则计算的位置超出表格范围，请重新示范');
    return columnName(base.column + dayOffset * rule.columnStep) + row;
  }
  function inferRule(samples) {
    if (!Array.isArray(samples) || samples.length !== 2) throw Error('请先示范两个日期的填报位置');
    const [first, second] = samples, a = dateParts(first.date), b = dateParts(second.date);
    if (a.monthKey !== b.monthKey || b.day <= a.day) throw Error('请选择同一个月的两个日期，第二个日期须晚于第一个');
    const start = addressParts(first.address), end = addressParts(second.address), gap = b.day - a.day;
    const rowStep = (end.row - start.row) / gap, columnStep = (end.column - start.column) / gap;
    if (!Number.isInteger(rowStep) || !Number.isInteger(columnStep) || !((rowStep > 0 && columnStep === 0) || (columnStep > 0 && rowStep === 0)))
      throw Error('两次示范须按固定间隔向右或向下排列，且每天移动完整行列；请检查日期与位置');
    const rule = { samples: samples.map(sample => ({ date: sample.date, address: sample.address })), rowStep, columnStep };
    // Check both ends, including dates preceding the first demonstration.
    movedAddress(first.address, 1 - a.day, rule);
    movedAddress(first.address, a.days - a.day, rule);
    return rule;
  }
  function ruleAddress(rule, date, anchor = rule.samples[0].address) {
    return movedAddress(anchor, dateParts(date).day - dateParts(rule.samples[0].date).day, rule);
  }
  function prediction(rule) {
    const first = dateParts(rule.samples[0].date), second = dateParts(rule.samples[1].date);
    const day = second.day < second.days ? second.day + 1 : first.day > 1 ? first.day - 1 : 2;
    const date = `${first.monthKey}-${String(day).padStart(2, '0')}`;
    return { date, address: ruleAddress(rule, date) };
  }
  function formatDate(date, format) {
    const { year, month, day } = dateParts(date);
    const tokens = { yyyy: String(year), MM: String(month).padStart(2, '0'), M: String(month), dd: String(day).padStart(2, '0'), d: String(day) };
    return format.replace(/\{([^}]+)\}/g, (_, key) => tokens[key] ?? '{' + key + '}');
  }
  function normalizeRule(raw) {
    if (!raw || typeof raw !== 'object') throw Error('示范规则无效，请重新示范');
    const rule = inferRule(raw.samples);
    const expected = prediction(rule);
    if (raw.confirmation?.date !== expected.date || raw.confirmation?.address !== expected.address)
      throw Error('示范规则尚未确认第三个日期的位置');
    const dateAnchor = raw.dateAnchor, labelAnchor = raw.labelAnchor;
    if (!dateAnchor || !dateFormats.includes(dateAnchor.format)) throw Error('日期校验位置尚未完成示范');
    addressParts(dateAnchor.address);
    if (!labelAnchor || typeof labelAnchor.expected !== 'string' || !labelAnchor.expected.trim() || labelAnchor.expected.length > 300)
      throw Error('请选择有文字的项目名称、公司或材料表头用于校验');
    addressParts(labelAnchor.address);
    const first = dateParts(rule.samples[0].date);
    movedAddress(dateAnchor.address, 1 - first.day, rule);
    movedAddress(dateAnchor.address, first.days - first.day, rule);
    return { ...rule, confirmation: expected, dateAnchor: { address: dateAnchor.address, format: dateAnchor.format }, labelAnchor: { address: labelAnchor.address, expected: labelAnchor.expected } };
  }
  function sheetBinding(sheet) {
    if (typeof sheet !== 'string' || !sheet.trim() || sheet.length > 200) throw Error('请先选中要填写的工作表');
    const match = /(\d{4}|\d{2})年\d{1,2}月/.exec(sheet);
    return match
      ? { sheetMode: 'monthly', sheetPattern: sheet.replace(match[0], `${match[1].length === 4 ? '{yyyy}' : '{yy}'}年{M}月`) }
      : { sheetMode: 'fixed', sheetName: sheet };
  }
  function validate(config) {
    const c = { ...defaults, ...config };
    if (c.sheetReferenceName !== undefined) Object.assign(c, sheetBinding(c.sheetReferenceName));
    if (c.documentUrl) {
      const url = new URL(c.documentUrl);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw Error('文档地址必须为不含账号密码的 HTTP(S) 地址');
    }
    if (c.sheetMode === 'fixed') {
      if (typeof c.sheetName !== 'string' || !c.sheetName.trim() || c.sheetName.length > 200) throw Error('请选择固定工作表');
    } else {
      if (c.sheetMode && c.sheetMode !== 'monthly') throw Error('工作表选择方式无效');
      if (!c.sheetPattern.includes('{M}') || !/\{yy(?:yy)?\}/.test(c.sheetPattern)) throw Error('工作表名称必须包含 {yy} 或 {yyyy}，以及 {M}');
      if (c.sheetPattern.replace(/\{(?:yyyy|yy|M)\}/g, '').match(/[{}]/)) throw Error('工作表名称存在不支持的占位符');
    }
    if (!c.company.trim() || !c.park.trim()) throw Error('请填写公司和园区名称');
    columnName(columnNumber(c.startColumn));
    for (const key of ['cuttingRow', 'weldingRow', 'inboundRow']) {
      if (!Number.isInteger(c[key]) || c[key] < 1 || c[key] > 1048576) throw Error('目标行必须为 1–1048576 的整数');
    }
    if (!Number.isInteger(c.timeout) || c.timeout < 5 || c.timeout > 120) throw Error('超时时间须为 5–120 秒的整数');
    if(c.fields!==undefined) {
      if(!Array.isArray(c.fields) || c.fields.length>100)throw Error('业务字段列表无效');
      const ids=new Set();
      for(const field of c.fields) {
        if(!field || typeof field.id!=='string' || !/^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(field.id) || ['__proto__','constructor','prototype'].includes(field.id) || ids.has(field.id))throw Error('业务字段标识无效或重复');
        ids.add(field.id);
        if(typeof field.name!=='string' || !field.name.trim() || field.name.length>80 || (field.unit!==undefined && (typeof field.unit!=='string' || field.unit.length>20)))throw Error('请填写有效的业务名称和单位');
        if(field.legacyKey && (field.legacyKey!==field.id || !metricKeys.includes(field.id)))throw Error('原业务位置引用无效');
      }
    }
    if (c.rules !== undefined) {
      if (!c.rules || typeof c.rules !== 'object' || Array.isArray(c.rules) || Object.keys(c.rules).some(key => !fieldKeys(c).includes(key))) throw Error('填报项目的示范规则无效');
      c.rules = Object.fromEntries(Object.entries(c.rules).map(([key, rule]) => [key, normalizeRule(rule)]));
    }
    return c;
  }
  function plan(config, date, values) {
    const c = validate(config);
    const { year, month, day, monthKey } = dateParts(date);
    const sheet = sheetName(c,date);
    const start = columnNumber(c.startColumn);
    const specs = [
      ['cutting', '下料量', start + day - 1, c.cuttingRow, c.company],
      ['welding', '装焊量', start + day - 1, c.weldingRow, c.company],
      ['section', '型材入库量', start + (day - 1) * 2, c.inboundRow, c.park],
      ['plate', '板材入库量', start + (day - 1) * 2 + 1, c.inboundRow, c.park]
    ];
    const definitions=c.fields?c.fields.map(field=>{
      const legacy=field.legacyKey?specs.find(spec=>spec[0]===field.legacyKey):null;
      if(!c.rules?.[field.id] && !legacy)throw Error(field.name+'尚未示范填报位置');
      return [field.id,field.name,legacy?.[2],legacy?.[3],legacy?.[4] || '',field.unit || ''];
    }):specs;
    if(!definitions.length)throw Error('请先新增业务字段并录制填报位置');
    const rows = definitions.map(([key, label, col, row, owner, unit]) => {
      const raw = String(values[key] ?? '').trim();
      const numeric=c.fields?/^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/:/^(?:\d+\.?\d*|\.\d+)$/;
      if (!numeric.test(raw) || !Number.isFinite(Number(raw))) throw Error(label + '必须提供有效数字，空值不会视为 0');
      const rule = c.rules?.[key];
      if (rule && c.sheetMode === 'fixed' && !rule.dateAnchor.format.includes('{yyyy}') && monthKey !== dateParts(rule.samples[0].date).monthKey)
        throw Error(label + '的日期表头不含完整年月，固定工作表跨月前请重新示范并确认');
      return { key, label, address: rule ? ruleAddress(rule, date) : columnName(col) + row, owner: rule ? rule.labelAnchor.expected : owner, value: Number(raw),unit:unit || '' };
    });
    if (new Set(rows.map(r => r.address)).size !== rows.length) throw Error('目标单元格重复，请检查行号配置');
    return { sheet, date, rows };
  }
  function cellText(value) {
    const text=String(value ?? '');
    // Blank contenteditable controls can expose line breaks or invisible placeholders.
    return /^[\s\u200B\uFEFF]*$/.test(text) ? '' : text;
  }
  function preflight(plan, cells, scenario) {
    const failures = { login: '模拟登录已失效，需要重新扫码', permission: '模拟账号没有编辑权限', anchor: '模拟日期 / 公司 / 材料锚点不匹配', sheet: '模拟目标工作表不存在' };
    if (failures[scenario]) throw Error(failures[scenario]);
    return plan.rows.map(r => {
      const current = cellText(cells[r.address]);
      return { ...r, current, action: current === '' ? 'write' : 'conflict' };
    });
  }
  // Local simulation only. A real page adapter must verify its own anchors and saved values.
  function simulate(plan, cells, scenario) {
    const rows = preflight(plan, cells, scenario);
    if (rows.some(r => r.action === 'conflict')) throw Error('目标格已有内容，整批停止；未写入任何单元格');
    const next = { ...cells };
    rows.filter(r => r.action === 'write').forEach(r => { next[r.address] = String(r.value); });
    if (!rows.every(r => Number(next[r.address]) === r.value)) throw Error('模拟回读不一致');
    return { cells: next, rows };
  }
  const api = { defaults, validate, plan, preflight, simulate, columnName, cellText, metricKeys, fieldKeys, sheetName, dateFormats, dateParts, addressParts, inferRule, ruleAddress, prediction, formatDate, normalizeRule, sheetBinding };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TencentDemo = api;
})(globalThis);
