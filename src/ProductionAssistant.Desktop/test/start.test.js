'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');

for (const args of [[], ['--environment', 'Development'], ['--remote-debugging-port=0', '--environment', 'Development']]) {
  test(`normal/diagnostic entry preserves arguments and allows a visible native window: ${args.join(' ')}`, () => {
    let call;
    const env = { ELECTRON_RUN_AS_NODE: '1', KEEP: 'yes' };
    const source = path.join(__dirname, '../scripts/start.js');
    vm.runInNewContext(fs.readFileSync(source, 'utf8'), {
      __dirname: path.dirname(source), console, process: { argv: ['node', source, ...args], env },
      require(name) {
        if (name === '../lib/electron-runtime') return { requireRuntime: () => ({ executable: 'electron.exe' }) };
        if (name === 'node:child_process') return { spawn: (...values) => { call = values; return new EventEmitter(); } };
        return require(name);
      },
    });
    assert.equal(call[0], 'electron.exe');
    assert.deepEqual(Array.from(call[1]), ['.', ...args]);
    assert.equal(call[2].windowsHide, false);
    assert.equal(call[2].env.ELECTRON_RUN_AS_NODE, undefined);
    assert.equal(call[2].env.KEEP, 'yes');
    assert.equal(env.ELECTRON_RUN_AS_NODE, '1');
  });
}
