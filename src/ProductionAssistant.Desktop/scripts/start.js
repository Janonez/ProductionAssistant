'use strict';

const path = require('node:path');
const { spawn } = require('node:child_process');
const { requireRuntime } = require('../lib/electron-runtime');
try {
  const runtime = requireRuntime(path.join(__dirname, '../node_modules/electron'));
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  const child = spawn(runtime.executable, ['.', ...process.argv.slice(2)], {
    cwd: path.join(__dirname, '..'), env, stdio: 'inherit', windowsHide: false,
  });
  child.once('error', error => { console.error(`Electron 启动失败（${error.code}）。`); process.exitCode = 1; });
  child.once('exit', code => { process.exitCode = code ?? 1; });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
