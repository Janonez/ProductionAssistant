'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { contentTypeFor, resolveFile } = require('../lib/file-resolver');

async function fixture(t) {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'pa-file-test-'));
  t.after(() => fs.rm(base, { recursive: true, force: true }));
  const root = path.join(base, 'root');
  const outside = path.join(base, 'outside');
  await fs.mkdir(root);
  await fs.mkdir(outside);
  await fs.writeFile(path.join(root, 'index.html'), 'fixture');
  await fs.writeFile(path.join(outside, 'outside.txt'), 'fixture');
  return { root, outside };
}

test('maps every supported extension and falls back to binary for other files', () => {
  const expected = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8',
    '.png': 'image/png', '.ico': 'image/x-icon', '.woff': 'font/woff',
    '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json; charset=utf-8',
  };
  for (const [extension, type] of Object.entries(expected)) assert.equal(contentTypeFor(extension), type);
  assert.equal(contentTypeFor('.HTML'), expected['.html']);
  assert.equal(contentTypeFor('.unknown'), 'application/octet-stream');
});

test('resolves existing files and percent-encoded names', async t => {
  const { root } = await fixture(t);
  await fs.writeFile(path.join(root, '中文.txt'), 'fixture');
  assert.deepEqual(await resolveFile(root, '/index.html'), {
    status: 200, file: await fs.realpath(path.join(root, 'index.html')), type: 'text/html; charset=utf-8',
  });
  assert.equal((await resolveFile(root, '/' + encodeURIComponent('中文.txt'))).status, 200);
});

test('rejects non-absolute request paths and malformed percent encoding', async t => {
  const { root } = await fixture(t);
  for (const pathname of [undefined, 1, '', 'index.html', '/%zz'])
    assert.equal((await resolveFile(root, pathname)).status, 400);
});

test('rejects parent segments, encoded parent segments, backslashes, and NUL', async t => {
  const { root } = await fixture(t);
  for (const pathname of ['/../outside/outside.txt', '/%2e%2e/outside.txt', '/a/../index.html', '/a\\b', '/%5cindex.html', '/%00index.html'])
    assert.equal((await resolveFile(root, pathname)).status, 403);
});

test('returns 404 for missing files, directories, and paths beneath a regular file', async t => {
  const { root } = await fixture(t);
  for (const pathname of ['/missing', '/', '/index.html/child'])
    assert.equal((await resolveFile(root, pathname)).status, 404);
});

test('rejects lexical containment failures', async t => {
  const { root } = await fixture(t);
  for (const relative of ['..', '..' + path.sep + 'outside', path.parse(root).root + 'outside']) {
    const mocked = t.mock.method(path, 'relative', () => relative);
    assert.equal((await resolveFile(root, '/index.html')).status, 403);
    mocked.mock.restore();
  }
});

test('rejects a symbolic link that escapes the real root', async t => {
  const { root, outside } = await fixture(t);
  try { await fs.symlink(outside, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) {
    if (error.code === 'EPERM') { t.skip('符号链接创建被 EPERM 拒绝'); return; }
    throw error;
  }
  assert.equal((await resolveFile(root, '/linked/outside.txt')).status, 403);
});

test('returns 403 when the filesystem denies access', async t => {
  const { root } = await fixture(t);
  t.mock.method(fs, 'realpath', async () => { throw Object.assign(new Error('denied'), { code: 'EACCES' }); });
  assert.equal((await resolveFile(root, '/index.html')).status, 403);
});
