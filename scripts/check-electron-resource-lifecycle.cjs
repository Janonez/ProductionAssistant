'use strict';

// Real Electron + real source dist rebuild. Only read/navigation; no document writes.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { _electron } = require('../src/ProductionAssistant.App/Assets/TencentSheet/node_modules/playwright');
const { resolveRendererBuild, fileManifest } = require('../src/ProductionAssistant.Desktop/lib/renderer-build');
const { requireRuntime } = require('../src/ProductionAssistant.Desktop/lib/electron-runtime');
const root = path.resolve(__dirname, '..');
const desktop = path.join(root, 'src/ProductionAssistant.Desktop');
const dist = path.join(root, 'src/ProductionAssistant.App/Assets/Prototype/dist');
const runtime = requireRuntime(path.join(desktop, 'node_modules/electron'));
const env = { ...process.env, PRODUCTIONASSISTANT_DIST: dist };
delete env.ELECTRON_RUN_AS_NODE;

async function command(executable, args, options = {}) {
  const child = spawn(executable, args, { windowsHide: true, stdio: 'inherit', env, ...options });
  await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', code => code === 0 ? resolve() : reject(new Error(`Command exited ${code}`))); });
}
async function main() {
  const first = resolveRendererBuild(dist);
  const originalFiles = fileManifest(first.root);
  const app = await _electron.launch({ executablePath: runtime.executable, args: [desktop, '--environment', 'Development'], env });
  try {
    const page = await app.firstWindow();
    // Hold lazy settings code until after rebuilding, including experimental prefetch builds.
    await page.evaluate(() => { window.requestIdleCallback = undefined; });
    await page.getByRole('button', { name: '集团填报', exact: true }).click();
    await page.getByRole('table', { name: '本次填报数据' }).waitFor();
    await app.evaluate(({ app, dialog }) => {
      globalThis.__instanceEvents = [];
      globalThis.__versionPrompts = [];
      app.on('second-instance', (_event, _argv, _cwd, data) => globalThis.__instanceEvents.push(data.buildId));
      dialog.showMessageBox = async (_window, options) => { globalThis.__versionPrompts.push(options.title); return { response: 0 }; };
    });
    await command(process.execPath, [path.join(desktop, 'scripts/start.js'), '--environment', 'Development']);
    assert.equal(await app.evaluate(() => globalThis.__versionPrompts.length), 0);
    assert.equal(await app.evaluate(() => globalThis.__instanceEvents.length), 1);

    // The same production build command is used while the old window is alive.
    const npmCli = path.join(path.dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
    await command(process.execPath, [npmCli, '--prefix', path.join(root, 'src/ProductionAssistant.App/Assets/Prototype'), 'run', 'build']);
    const second = resolveRendererBuild(dist);
    assert.notEqual(second.buildId, first.buildId);
    assert.deepEqual(fileManifest(first.root), originalFiles);
    await command(process.execPath, [path.join(desktop, 'scripts/start.js'), '--environment', 'Development']);
    assert.equal(await app.evaluate(() => globalThis.__versionPrompts.length), 1);
    assert.equal(await app.evaluate(() => globalThis.__instanceEvents.at(-1)), second.buildId);
    await page.getByRole('tab', { name: '设置', exact: true }).click();
    await page.getByLabel('集团填报设置', { exact: true }).waitFor();
    assert.equal(await page.getByRole('alert').filter({ hasText: '界面加载失败' }).count(), 0);
    console.log('Real Electron: same-build focus, different-build prompt, rebuild with old instance, old lazy settings chunk: 4 passed.');
  } finally { await app.close(); }
  const updated = await _electron.launch({ executablePath: runtime.executable, args: [desktop, '--environment', 'Development'], env });
  try {
    const page = await updated.firstWindow();
    await page.getByRole('button', { name: '集团填报', exact: true }).click();
    await page.getByRole('table', { name: '本次填报数据' }).waitFor();
    console.log('Real Electron: restart into latest build: 1 passed.');
  } finally { await updated.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
