'use strict';

const path = require('node:path');

function parseEnvironment(argv, env) {
  let value = env.PRODUCTIONASSISTANT_ENVIRONMENT ?? 'Development';
  for (let index = 0; index < argv.length; index++) {
    if (argv[index] === '--environment') {
      value = argv[index + 1];
      break;
    }
    if (argv[index].startsWith('--environment=')) {
      value = argv[index].slice('--environment='.length);
      break;
    }
  }
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (normalized === 'development') return 'Development';
  if (normalized === 'production') return 'Production';
  throw new Error('不支持运行环境');
}

function resolveSidecarPath(baseDir, env) {
  return env.PRODUCTIONASSISTANT_SIDECAR || path.resolve(baseDir, '..', 'ProductionAssistant.Sidecar', 'bin', 'x64', 'Release', 'net8.0-windows10.0.19041.0', 'ProductionAssistant.Sidecar.exe');
}

function resolveDistRoot(baseDir, env) {
  return env.PRODUCTIONASSISTANT_DIST || path.resolve(baseDir, '..', 'ProductionAssistant.App', 'Assets', 'Prototype', 'dist');
}

function resolveUserDataDir(env, environment) {
  if (!env.LOCALAPPDATA) throw new Error('缺少 LOCALAPPDATA');
  return path.join(env.LOCALAPPDATA, 'ProductionAssistant', 'Electron', environment);
}

module.exports = { parseEnvironment, resolveSidecarPath, resolveDistRoot, resolveUserDataDir };
