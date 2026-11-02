'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { parseEnvironment, resolveSidecarPath, resolveDistRoot, resolveUserDataDir } = require('../lib/environment');

test('defaults to Development without arguments or an environment variable', () => {
  assert.equal(parseEnvironment([], {}), 'Development');
});

test('normalizes the environment variable and both command line forms, with command line precedence', () => {
  assert.equal(parseEnvironment([], { PRODUCTIONASSISTANT_ENVIRONMENT: ' production ' }), 'Production');
  assert.equal(parseEnvironment(['app', '--environment', ' dEVelopment '], { PRODUCTIONASSISTANT_ENVIRONMENT: 'Production' }), 'Development');
  assert.equal(parseEnvironment(['--environment= PRODUCTION '], { PRODUCTIONASSISTANT_ENVIRONMENT: 'invalid' }), 'Production');
});

test('rejects unsupported, empty, and missing environment values', () => {
  for (const value of ['', ' ', 'other']) {
    assert.throws(() => parseEnvironment(['--environment', value], {}), /不支持运行环境/);
    assert.throws(() => parseEnvironment([], { PRODUCTIONASSISTANT_ENVIRONMENT: value }), /不支持运行环境/);
  }
  assert.throws(() => parseEnvironment(['--environment'], {}), /不支持运行环境/);
});

test('resolves the default sidecar and frontend locations relative to the Desktop directory', () => {
  const base = path.resolve('fixture', 'Desktop');
  assert.equal(resolveSidecarPath(base, {}), path.resolve(base, '..', 'ProductionAssistant.Sidecar', 'bin', 'x64', 'Release', 'net8.0-windows10.0.19041.0', 'ProductionAssistant.Sidecar.exe'));
  assert.equal(resolveDistRoot(base, {}), path.resolve(base, '..', 'ProductionAssistant.App', 'Assets', 'Prototype', 'dist'));
});

test('prefers explicit sidecar and frontend paths without mutating the environment', () => {
  const env = Object.freeze({ PRODUCTIONASSISTANT_SIDECAR: 'fixture.exe', PRODUCTIONASSISTANT_DIST: 'fixture-dist' });
  assert.equal(resolveSidecarPath('unused', env), 'fixture.exe');
  assert.equal(resolveDistRoot('unused', env), 'fixture-dist');
});

test('isolates user data by environment and rejects missing LOCALAPPDATA', () => {
  const local = path.resolve('fixture-local');
  assert.equal(resolveUserDataDir({ LOCALAPPDATA: local }, 'Development'), path.join(local, 'ProductionAssistant', 'Electron', 'Development'));
  assert.equal(resolveUserDataDir({ LOCALAPPDATA: local }, 'Production'), path.join(local, 'ProductionAssistant', 'Electron', 'Production'));
  assert.throws(() => resolveUserDataDir({}, 'Development'), /LOCALAPPDATA/);
  assert.throws(() => resolveUserDataDir({ LOCALAPPDATA: '' }, 'Development'), /LOCALAPPDATA/);
});
