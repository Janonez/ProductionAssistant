'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { fileManifest, resolveRendererBuild } = require('../src/ProductionAssistant.Desktop/lib/renderer-build');
const { requireRuntime } = require('../src/ProductionAssistant.Desktop/lib/electron-runtime');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src/ProductionAssistant.App/Assets/Prototype/dist');
const deployment = path.join(root, 'deployments/development');
const target = path.join(deployment, 'Assets/Prototype');
const marker = JSON.parse(fs.readFileSync(path.join(deployment, 'runtime-environment.json'), 'utf8').replace(/^\uFEFF/, ''));
assert.equal(marker.environment, 'Development');
const sourceBuild = resolveRendererBuild(source), deployedBuild = resolveRendererBuild(target);
const expected = fileManifest(source);
assert.equal(sourceBuild.buildId, deployedBuild.buildId);
assert.deepEqual(fileManifest(sourceBuild.root), expected);
assert.deepEqual(fileManifest(deployedBuild.root), expected);
const compatibility = new Map(fileManifest(target).map(file => [file.name, file]));
for (const file of expected) assert.deepEqual(compatibility.get(file.name), file);
const runtime = requireRuntime(path.join(root, 'src/ProductionAssistant.Desktop/node_modules/electron'));
console.log(JSON.stringify({ environment: marker.environment, buildId: deployedBuild.buildId,
  sourceFiles: expected.length, immutableFiles: expected.length, missing: 0, changed: 0,
  compatibilityExtraFiles: compatibility.size - expected.length, runtime: runtime.version }, null, 2));
