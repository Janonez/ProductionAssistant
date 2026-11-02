'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkSender } = require('../lib/sender-check');

function fixture(url = 'pa://app/index.html') {
  const mainFrame = { url };
  const webContents = { mainFrame };
  return { event: { sender: webContents, senderFrame: mainFrame }, expected: { webContents, url: 'pa://app/index.html' } };
}

test('accepts the expected main page while ignoring its query string and fragment', () => {
  for (const url of ['pa://app/index.html', 'pa://app/index.html?loadId=load#route']) {
    const { event, expected } = fixture(url);
    assert.deepEqual(checkSender(event, expected), { ok: true });
  }
});

test('rejects absent frames before checking contents', () => {
  for (const frame of [null, undefined]) {
    const { event, expected } = fixture();
    event.senderFrame = frame;
    event.sender = {};
    assert.deepEqual(checkSender(event, expected), { ok: false, reason: 'null-frame' });
  }
});

test('rejects another webContents and a child frame with the expected page URL', () => {
  const { event, expected } = fixture();
  assert.deepEqual(checkSender({ ...event, sender: {} }, expected), { ok: false, reason: 'wrong-contents' });
  assert.deepEqual(checkSender({ ...event, senderFrame: { url: expected.url } }, expected), { ok: false, reason: 'not-main-frame' });
});

test('rejects invalid URLs and mismatched protocol, host, path, or port', () => {
  for (const url of ['invalid', 'https://app/index.html', 'pa://test/index.html', 'pa://app/other.html', 'pa://app:42/index.html']) {
    const { event, expected } = fixture(url);
    assert.deepEqual(checkSender(event, expected), { ok: false, reason: 'origin-mismatch' });
  }
});

test('rejects exceptions while reading frame URLs and mismatched expected pages', () => {
  const { event, expected } = fixture();
  Object.defineProperty(event.senderFrame, 'url', { get() { throw new Error('frame unavailable'); } });
  assert.deepEqual(checkSender(event, expected), { ok: false, reason: 'origin-mismatch' });
  const other = fixture();
  other.expected.url = 'pa://app/other.html';
  assert.deepEqual(checkSender(other.event, other.expected), { ok: false, reason: 'origin-mismatch' });
});
