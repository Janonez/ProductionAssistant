'use strict';

// Exercise the unmodified official installer in a fresh package directory.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { prepareRuntime, inspectRuntime } = require('../src/ProductionAssistant.Desktop/lib/electron-runtime');
const { fileManifest } = require('../src/ProductionAssistant.Desktop/lib/renderer-build');
const desktop = path.resolve(__dirname, '../src/ProductionAssistant.Desktop');
const source = path.join(desktop, 'node_modules/electron');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'metis-official-runtime-'));
try {
  for (const file of ['package.json', 'install.js', 'checksums.json']) fs.copyFileSync(path.join(source, file), path.join(temp, file));
  assert.equal(inspectRuntime(temp).ok, false);
  let calls = 0;
  const install = () => {
    calls++;
    return spawnSync(process.execPath, [path.join(temp, 'install.js')], {
      env: { ...process.env, NODE_PATH: path.join(desktop, 'node_modules') }, stdio: 'inherit', windowsHide: true,
    });
  };
  assert.equal(prepareRuntime(temp, install).installed, true);
  assert.equal(prepareRuntime(temp, install).installed, false);
  assert.equal(calls, 1);
  assert.equal(inspectRuntime(source).ok, true);
  assert.deepEqual(fileManifest(path.join(source, 'dist')), fileManifest(path.join(temp, 'dist')));
  console.log('Official isolated recovery + idempotence + full extracted Runtime SHA256 comparison: 3 passed; real Runtime retained.');
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
