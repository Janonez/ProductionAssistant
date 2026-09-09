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
  function validate(config) {
    const c = { ...defaults, ...config };
    if (c.documentUrl) {
      const url = new URL(c.documentUrl);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw Error('文档地址必须为不含账号密码的 HTTP(S) 地址');
    }
    if (!c.sheetPattern.includes('{M}') || !/\{yy(?:yy)?\}/.test(c.sheetPattern)) throw Error('工作表名称必须包含 {yy} 或 {yyyy}，以及 {M}');
    if (c.sheetPattern.replace(/\{(?:yyyy|yy|M)\}/g, '').match(/[{}]/)) throw Error('工作表名称存在不支持的占位符');
    if (!c.company.trim() || !c.park.trim()) throw Error('请填写公司和园区名称');
    columnName(columnNumber(c.startColumn));
    for (const key of ['cuttingRow', 'weldingRow', 'inboundRow']) {
      if (!Number.isInteger(c[key]) || c[key] < 1 || c[key] > 1048576) throw Error('目标行必须为 1–1048576 的整数');
    }
    if (!Number.isInteger(c.timeout) || c.timeout < 5 || c.timeout > 120) throw Error('超时时间须为 5–120 秒的整数');
    return c;
  }
  function plan(config, date, values) {
    const c = validate(config);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw Error('请选择完整业务日期');
    const d = new Date(date + 'T00:00:00Z');
    if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== date) throw Error('业务日期无效');
    const [year, month, day] = date.split('-').map(Number);
    const sheet = c.sheetPattern.replace(/\{yyyy\}/g, String(year)).replace(/\{yy\}/g, String(year).slice(-2)).replace(/\{M\}/g, String(month));
    const start = columnNumber(c.startColumn);
    const specs = [
      ['cutting', '下料量', start + day - 1, c.cuttingRow, c.company],
      ['welding', '装焊量', start + day - 1, c.weldingRow, c.company],
      ['section', '型材入库量', start + (day - 1) * 2, c.inboundRow, c.park],
      ['plate', '板材入库量', start + (day - 1) * 2 + 1, c.inboundRow, c.park]
    ];
    const rows = specs.map(([key, label, col, row, owner]) => {
      const raw = String(values[key] ?? '').trim();
      if (!/^(?:\d+\.?\d*|\.\d+)$/.test(raw) || !Number.isFinite(Number(raw))) throw Error(label + '必须填写非负数字，空值不会视为 0');
      return { key, label, address: columnName(col) + row, owner, value: Number(raw) };
    });
    if (new Set(rows.map(r => r.address)).size !== rows.length) throw Error('目标单元格重复，请检查行号配置');
    return { sheet, date, rows };
  }
  function preflight(plan, cells, scenario) {
    const failures = { login: '模拟登录已失效，需要重新扫码', permission: '模拟账号没有编辑权限', anchor: '模拟日期 / 公司 / 材料锚点不匹配', sheet: '模拟目标工作表不存在' };
    if (failures[scenario]) throw Error(failures[scenario]);
    return plan.rows.map(r => {
      const current = String(cells[r.address] ?? '');
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
  const api = { defaults, validate, plan, preflight, simulate, columnName };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TencentDemo = api;
})(globalThis);
