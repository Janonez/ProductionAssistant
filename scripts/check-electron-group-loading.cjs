'use strict';

// Run the published UI. Gate read-only IPC in this process, never edit stored configuration.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { _electron } = require('../src/ProductionAssistant.App/Assets/TencentSheet/node_modules/playwright');
const { requireRuntime } = require('../src/ProductionAssistant.Desktop/lib/electron-runtime');
const { resolveRendererBuild } = require('../src/ProductionAssistant.Desktop/lib/renderer-build');
const root = path.resolve(__dirname, '..');
const desktop = path.join(root, 'src/ProductionAssistant.Desktop');
const dist = path.join(root, 'deployments/development/Assets/Prototype');
const output = path.join(root, 'artifacts/startup');

async function main() {
  const env = { ...process.env, PRODUCTIONASSISTANT_DIST: dist };
  delete env.ELECTRON_RUN_AS_NODE;
  fs.mkdirSync(output, { recursive: true });
  const runtime = requireRuntime(path.join(desktop, 'node_modules/electron'));
  const instance = await _electron.launch({ executablePath: runtime.executable, args: [desktop, '--environment', 'Development'], env, timeout: 30000 });
  try {
    const page = await instance.firstWindow();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.getByRole('button', { name: '集团填报', exact: true }).waitFor();
    await instance.evaluate(({ ipcMain }) => {
      const gate = { originals: ipcMain.listeners('bridge:message'), pending: [], blocked: true };
      gate.handler = (event, message) => {
        if (gate.blocked && message.operation === 'automation.list') gate.pending.push({ event, message });
        else for (const handler of gate.originals) handler(event, message);
      };
      for (const handler of gate.originals) ipcMain.removeListener('bridge:message', handler);
      ipcMain.on('bridge:message', gate.handler);
      globalThis.__metisReadGate = gate;
    });
    await page.getByRole('button', { name: '集团填报', exact: true }).click();
    await page.getByRole('table', { name: '本次填报数据', exact: true }).waitFor();
    assert.equal(await page.getByText('获取数据 → 检查目标 → 确认填报', { exact: true }).isVisible(), true);
    assert.equal(await page.getByLabel('正在读取填报日期', { exact: true }).count(), 1);
    assert.equal(await page.getByRole('button', { name: '配置文档连接', exact: true }).isEnabled(), true);
    await page.screenshot({ path: path.join(output, 'acceptance-overview-loading.png') });
    await page.getByRole('button', { name: '配置文档连接', exact: true }).click();
    const panel = page.locator('[role=tabpanel][data-state=active]');
    await panel.getByText('正在读取设置配置…', { exact: true }).waitFor();
    assert.deepEqual(await panel.locator('h2').allTextContents(), ['网页配置', '业务配置', '执行规则']);
    assert.equal(await panel.getByRole('table', { name: '本次填报数据', exact: true }).count(), 0);
    await page.screenshot({ path: path.join(output, 'acceptance-settings-loading.png') });
    await instance.evaluate(() => {
      const gate = globalThis.__metisReadGate;
      if (gate.pending.length !== 1) throw new Error('Expected exactly one held read');
      const { event, message } = gate.pending.shift();
      event.sender.send('bridge:response', { id: message.id, ok: false, error: '专项模拟：连接列表读取失败', errorCode: 'TEST_READ_FAILED', retryable: true });
      gate.blocked = false;
    });
    await panel.getByRole('alert').filter({ hasText: '专项模拟：连接列表读取失败' }).waitFor();
    assert.deepEqual(await panel.locator('h2').allTextContents(), ['网页配置', '业务配置', '执行规则']);
    assert.equal(await panel.locator('[aria-busy=false]').count(), 1);
    await page.screenshot({ path: path.join(output, 'acceptance-settings-read-error.png') });
    await panel.getByRole('button', { name: '重新读取连接列表', exact: true }).click();
    await panel.getByLabel('集团填报设置', { exact: true }).waitFor();
    assert.deepEqual(await panel.locator('h2').allTextContents(), ['网页配置', '业务配置', '执行规则']);
    assert.deepEqual(pageErrors, []);
    assert.equal(await instance.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().some(window => window.isVisible() && !window.isMinimized())), true);
    await page.screenshot({ path: path.join(output, 'acceptance-settings-ready.png') });
    console.log(JSON.stringify({ buildId: resolveRendererBuild(dist).buildId, passed: ['fixed overview during held read', 'matching settings loading sections', 'local read error', 'explicit retry to real settings', 'visible native window', 'no page errors'], simulated: 'one read-only list failure; no business writes' }, null, 2));
  } finally {
    await instance.evaluate(({ ipcMain }) => {
      const gate = globalThis.__metisReadGate;
      if (!gate) return;
      ipcMain.removeListener('bridge:message', gate.handler);
      for (const handler of gate.originals) ipcMain.on('bridge:message', handler);
      delete globalThis.__metisReadGate;
    });
    await instance.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
