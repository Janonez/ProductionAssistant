'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

for (const name of ['main.js', 'preload.js']) {
  test(`${name} passes node --check without starting Electron`, () => {
    const result = spawnSync(process.execPath, ['--check', path.join(__dirname, '..', name)], { encoding: 'utf8', windowsHide: true });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
  });
}
