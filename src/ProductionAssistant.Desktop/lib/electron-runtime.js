'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repair = 'npm.cmd --prefix src\\ProductionAssistant.Desktop run prepare:electron-runtime';
const requiredWindowsFiles = ['electron.exe', 'icudtl.dat', 'resources.pak', 'chrome_100_percent.pak',
  'chrome_200_percent.pak', 'snapshot_blob.bin', 'v8_context_snapshot.bin', 'ffmpeg.dll',
  'd3dcompiler_47.dll', 'dxcompiler.dll', 'electron_wer.dll', 'vk_swiftshader.dll',
  'vk_swiftshader_icd.json', 'vulkan-1.dll', 'resources/default_app.asar', 'locales/en-US.pak'];

// Never require('electron'): its index.js can synchronously invoke the installer.
function inspectRuntime(packageRoot) {
  try {
    const version = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')).version;
    const recorded = fs.readFileSync(path.join(packageRoot, 'path.txt'), 'utf8').trim();
    const expected = process.platform === 'win32' ? 'electron.exe' : process.platform === 'darwin' ? 'Electron.app/Contents/MacOS/Electron' : 'electron';
    if (recorded !== expected) throw new Error('path.txt 与当前平台不一致');
    if (fs.readFileSync(path.join(packageRoot, 'dist/version'), 'utf8').trim().replace(/^v/, '') !== version)
      throw new Error('Runtime 版本与锁定的 npm 包不一致');
    for (const file of process.platform === 'win32' ? requiredWindowsFiles : [expected]) {
      const stat = fs.statSync(path.join(packageRoot, 'dist', file));
      if (!stat.isFile() || stat.size === 0) throw new Error('Runtime 必需文件不完整');
    }
    return { ok: true, version, executable: path.join(packageRoot, 'dist', recorded) };
  } catch (error) {
    return { ok: false, reason: error.code === 'ENOENT' ? 'Runtime 必需文件缺失' : error.message };
  }
}

function requireRuntime(packageRoot) {
  const result = inspectRuntime(packageRoot);
  if (!result.ok) throw new Error(`${result.reason}。请先执行：${repair}。若仍不完整，先在 Desktop 目录执行 npm ci --ignore-scripts，再执行准备命令。`);
  return result;
}

function prepareRuntime(packageRoot, install = () => spawnSync(process.execPath, [path.join(packageRoot, 'install.js')], { stdio: 'inherit', windowsHide: true })) {
  const installed = inspectRuntime(packageRoot);
  if (installed.ok) return { ...installed, installed: false };
  const result = install();
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Electron 官方安装器失败（退出码 ${result.status}）；请检查缓存或网络后重试准备命令。`);
  return { ...requireRuntime(packageRoot), installed: true };
}

module.exports = { inspectRuntime, requireRuntime, prepareRuntime, requiredWindowsFiles };
