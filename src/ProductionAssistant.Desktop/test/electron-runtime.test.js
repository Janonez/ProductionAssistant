'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { inspectRuntime, requireRuntime, prepareRuntime, requiredWindowsFiles } = require('../lib/electron-runtime');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'metis-runtime-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ version: '45.0.0' }));
  const populate = (version = '45.0.0') => {
    const executable = process.platform === 'win32' ? 'electron.exe' : process.platform === 'darwin' ? 'Electron.app/Contents/MacOS/Electron' : 'electron';
    for (const file of [...requiredWindowsFiles, executable, 'version']) {
      const target = path.join(root, 'dist', file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file === 'version' ? version : 'fixture');
    }
    fs.writeFileSync(path.join(root, 'path.txt'), executable);
  };
  return { root, populate };
}

test('missing runtime fails quickly with an explicit repair command', t => {
  const { root } = fixture(t);
  assert.equal(inspectRuntime(root).ok, false);
  assert.throws(() => requireRuntime(root), /prepare:electron-runtime/);
});
test('complete runtime is reused and repeated preparation never calls the installer', t => {
  const { root, populate } = fixture(t); populate();
  for (let i = 0; i < 2; i++) assert.equal(prepareRuntime(root, () => assert.fail('installer invoked')).installed, false);
});
test('version mismatch is repaired through the official installer entry', t => {
  const { root, populate } = fixture(t); populate('44.0.0');
  assert.equal(inspectRuntime(root).ok, false);
  let calls = 0;
  const install = () => { calls++; populate(); return { status: 0 }; };
  assert.equal(prepareRuntime(root, install).installed, true);
  prepareRuntime(root, install);
  assert.equal(calls, 1);
});
test('installer failure and incomplete installation stay failures', t => {
  const { root } = fixture(t);
  assert.throws(() => prepareRuntime(root, () => ({ status: 7 })), /退出码 7/);
  assert.throws(() => prepareRuntime(root, () => ({ status: 0 })), /必需文件缺失/);
});
test('missing executable and unsafe path record cannot pass the startup check', t => {
  const { root, populate } = fixture(t); populate();
  const executable = requireRuntime(root).executable;
  fs.unlinkSync(executable);
  assert.equal(inspectRuntime(root).ok, false);
  populate();
  fs.writeFileSync(path.join(root, 'path.txt'), '../elsewhere.exe');
  assert.equal(inspectRuntime(root).ok, false);
});
