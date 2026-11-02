'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createLineReader } = require('../lib/line-reader');

test('splits LF and CRLF lines, skips empty lines, and preserves nonempty whitespace', () => {
  const lines = [];
  const reader = createLineReader(line => lines.push(line));
  reader.write('first\r\n\n\r\n \nsecond\n');
  reader.end();
  assert.deepEqual(lines, ['first', ' ', 'second']);
});

test('retains partial lines across strings and buffers and flushes the final line', () => {
  const lines = [];
  const reader = createLineReader(line => lines.push(line));
  reader.write('fi');
  assert.deepEqual(lines, []);
  reader.write(Buffer.from('rst\r'));
  reader.write('\nlast\r');
  reader.end();
  assert.deepEqual(lines, ['first', 'last']);
});

test('decodes Chinese and emoji split at every UTF-8 byte boundary', () => {
  const lines = [];
  const reader = createLineReader(line => lines.push(line));
  const bytes = Buffer.from('中文🙂\n完成');
  for (let index = 0; index < bytes.length; index++) reader.write(bytes.subarray(index, index + 1));
  reader.end();
  assert.deepEqual(lines, ['中文🙂', '完成']);
});

test('flushes an incomplete UTF-8 sequence on end and ignores repeated end or later writes', () => {
  const lines = [];
  const reader = createLineReader(line => lines.push(line));
  reader.write(Buffer.from([0xe4]));
  reader.end();
  reader.end();
  reader.write('ignored');
  assert.deepEqual(lines, ['�']);
});

test('does not emit an empty final line', () => {
  const lines = [];
  createLineReader(line => lines.push(line)).end();
  assert.deepEqual(lines, []);
});
