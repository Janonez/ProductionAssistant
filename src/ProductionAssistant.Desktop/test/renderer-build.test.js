'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { publishRenderer, resolveRendererBuild, compareInstanceBuild, fileManifest } = require('../lib/renderer-build');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'metis-build-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dist = path.join(root, 'dist');
  const build = () => {
    const buildId = randomUUID();
    fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
    fs.writeFileSync(path.join(dist, 'build-info.json'), JSON.stringify({ buildId }));
    fs.writeFileSync(path.join(dist, 'index.html'), `<script src="assets/${buildId}.js"></script>`);
    fs.writeFileSync(path.join(dist, 'assets', buildId + '.js'), `import('./${buildId}-lazy.js')`);
    fs.writeFileSync(path.join(dist, 'assets', buildId + '-lazy.js'), buildId);
    return buildId;
  };
  return { root, dist, build };
}

test('each immutable build keeps entry and late chunks when the source is rebuilt', t => {
  const f = fixture(t), firstId = f.build();
  const first = publishRenderer(f.dist);
  assert.equal(resolveRendererBuild(f.dist).buildId, firstId);
  const before = fileManifest(first.root);
  fs.rmSync(f.dist, { recursive: true });
  const secondId = f.build(); publishRenderer(f.dist);
  assert.equal(resolveRendererBuild(f.dist).buildId, secondId);
  assert.deepEqual(fileManifest(first.root), before);
  assert.equal(fs.readFileSync(path.join(first.root, 'assets', firstId + '-lazy.js'), 'utf8'), firstId);
});

test('same ID and same contents are idempotent; same ID and different contents cannot be published', t => {
  const f = fixture(t); f.build();
  const first = publishRenderer(f.dist);
  assert.equal(publishRenderer(f.dist).root, first.root);
  fs.appendFileSync(path.join(f.dist, 'index.html'), 'changed');
  assert.throws(() => publishRenderer(f.dist), /禁止覆盖/);
  assert.equal(resolveRendererBuild(f.dist).buildId, first.buildId);
});

test('failed publication does not switch the current pointer', t => {
  const f = fixture(t); f.build(); const first = publishRenderer(f.dist);
  f.build();
  t.mock.method(fs, 'copyFileSync', () => { throw new Error('fixture publication failed'); });
  assert.throws(() => publishRenderer(f.dist), /publication failed/);
  assert.equal(resolveRendererBuild(f.dist).buildId, first.buildId);
});

test('arbitrary dist overrides need their own prepared store; malformed pointer cannot escape the store', t => {
  const f = fixture(t); const id = f.build();
  assert.throws(() => resolveRendererBuild(f.dist), /尚未准备/);
  publishRenderer(f.dist);
  assert.throws(() => resolveRendererBuild(path.join(f.root, 'other')), /尚未准备/);
  fs.writeFileSync(path.join(f.dist + '.builds', 'current.json'), JSON.stringify({ buildId: '../outside' }));
  assert.throws(() => resolveRendererBuild(f.dist), /尚未准备/);
  assert.equal(compareInstanceBuild(id, { buildId: id }), 'same');
  assert.equal(compareInstanceBuild(id, { buildId: randomUUID() }), 'different');
  assert.equal(compareInstanceBuild(id, undefined), 'different');
});
