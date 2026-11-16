'use strict';

const path = require('node:path');
const { prepareRuntime } = require('../lib/electron-runtime');
try {
  const result = prepareRuntime(path.join(__dirname, '../node_modules/electron'));
  console.log(`Electron ${result.version} Runtime 已准备（${result.installed ? '官方安装器完成' : '复用现有 Runtime'}）。`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
