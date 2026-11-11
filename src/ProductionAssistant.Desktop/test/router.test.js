'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { LOCAL_OPERATIONS, MAX_ID_LENGTH, MAX_OPERATION_LENGTH, MAX_MESSAGE_CHARS, newLoadId, isCurrentLoad, buildDocumentUrl, classify } = require('../lib/router');

test('exports the specified routing limits and local operation set', () => {
  assert.deepEqual([...LOCAL_OPERATIONS], ['plan.pickFolder', 'meeting.pickFile']);
  assert.equal(MAX_ID_LENGTH, 200);
  assert.equal(MAX_OPERATION_LENGTH, 100);
  assert.equal(MAX_MESSAGE_CHARS, 4194304);
});

test('creates distinct 32 character lowercase hexadecimal load identifiers', () => {
  const first = newLoadId();
  assert.match(first, /^[0-9a-f]{32}$/);
  assert.notEqual(first, newLoadId());
});

test('reload and retry preserve each React task category without creating a host route', () => {
  for (const taskType of ['daily_report', 'notion_fill', 'tencent_sheet_fill']) {
    const current = `pa://app/index.html?route=daily-report&taskType=${taskType}&loadId=old`;
    const result = new URL(buildDocumentUrl(current, 'next'));
    assert.equal(result.searchParams.get('route'), 'daily-report');
    assert.equal(result.searchParams.get('taskType'), taskType);
    assert.equal(result.searchParams.get('loadId'), 'next');
    assert.equal(result.host, 'app');
  }
});

test('matches nonblank load identifiers exactly without trimming or case folding', () => {
  assert.equal(isCurrentLoad(' a ', ' a '), true);
  for (const [value, expected] of [[' a ', 'a'], ['A', 'a'], ['', ''], [' \t\r\n', ' \t\r\n'], [null, null], [1, 1], [undefined, undefined], ['a', 1]])
    assert.equal(isCurrentLoad(value, expected), false);
});

test('rejects non-object messages and invalid identifiers without echoing invalid identifiers', () => {
  for (const value of [null, undefined, 1, 'text', [], true])
    assert.deepEqual(classify(value), { kind: 'invalid', reason: 'not-object' });
  for (const id of [undefined, 1, '', ' \t', 'a'.repeat(MAX_ID_LENGTH + 1)])
    assert.deepEqual(classify({ id, operation: 'test' }), { kind: 'invalid', reason: 'invalid-id' });
});

test('validates operation types and lengths and retains a valid identifier in errors', () => {
  for (const operation of [undefined, null, 1, '', 'a'.repeat(MAX_OPERATION_LENGTH + 1)])
    assert.deepEqual(classify({ id: 'valid', operation }), { kind: 'invalid', reason: 'invalid-operation', id: 'valid' });
  assert.equal(classify({ id: 'a'.repeat(MAX_ID_LENGTH), operation: 'a'.repeat(MAX_OPERATION_LENGTH) }).kind, 'forward');
  assert.equal(classify({ id: 'id', operation: ' ' }).kind, 'forward');
});

test('normalizes ready fields and keeps finite timing values', () => {
  assert.deepEqual(classify({ type: 'app.ready', route: 'daily-report', loadId: 'load', moduleEntryMs: 12.5, readyMs: 20 }),
    { kind: 'ready', route: 'daily-report', loadId: 'load', moduleEntryMs: 12.5, readyMs: 20 });
  assert.deepEqual(classify({ type: 'app.ready', route: 1, loadId: null, moduleEntryMs: Infinity, readyMs: '20' }),
    { kind: 'ready', route: '', loadId: '', moduleEntryMs: 0, readyMs: 0 });
  assert.equal(classify({ type: 'app.ready', moduleEntryMs: NaN, readyMs: -Infinity }).readyMs, 0);
});

test('routes all three theme preferences locally without a business request identifier', () => {
  for (const theme of ['light', 'dark', 'system'])
    assert.deepEqual(classify({ type: 'app.theme', theme, id: 'unused', operation: 'settings.open' }), { kind: 'theme', theme });
});

test('rejects invalid theme values instead of forwarding them as business operations', () => {
  for (const theme of [undefined, null, '', 'Dark', ' dark ', 'auto', 1, true, [], {}]) {
    assert.deepEqual(classify({ type: 'app.theme', theme }), { kind: 'invalid', reason: 'invalid-theme' });
    assert.deepEqual(classify({ type: 'app.theme', theme, id: 'id', operation: 'settings.open' }),
      { kind: 'invalid', reason: 'invalid-theme', id: 'id' });
  }
});

test('routes both local dialogs and preserves their payloads', () => {
  for (const operation of LOCAL_OPERATIONS)
    assert.deepEqual(classify({ id: 'id', operation, payload: { value: 3 } }), { kind: 'local', id: 'id', operation, payload: { value: 3 } });
});

test('serializes forwarded requests as one line and omits missing payloads and extra fields', () => {
  assert.deepEqual(classify({ id: 'id', operation: 'settings.open', extra: true }),
    { kind: 'forward', id: 'id', line: '{"id":"id","operation":"settings.open"}' });
  const result = classify({ id: 'id', operation: 'echo', payload: { text: '中文\nsecond line' } });
  assert.equal(result.line.includes('\n'), false);
  assert.equal(result.line, JSON.stringify({ id: 'id', operation: 'echo', payload: { text: '中文\nsecond line' } }));
});

test('accepts the exact serialized size limit and rejects one character beyond it', () => {
  const message = { id: 'id', operation: 'echo', payload: '' };
  message.payload = 'a'.repeat(MAX_MESSAGE_CHARS - JSON.stringify(message).length);
  assert.equal(classify(message).kind, 'forward');
  message.payload += 'a';
  assert.deepEqual(classify(message), { kind: 'invalid', reason: 'message-too-large', id: 'id' });
});

test('rejects unserializable requests without throwing', () => {
  const circular = { id: 'id', operation: 'echo' };
  circular.payload = circular;
  for (const message of [circular, { id: 'id', operation: 'echo', payload: 1n }, { toJSON: () => undefined }])
    assert.equal(classify(message).reason, 'not-serializable');
});

const documentCases = [
  ['replaces the load identifier and preserves other parameters',
    'pa://app/index.html?route=daily-report&loadId=old&mode=compact',
    'pa://app/index.html?route=daily-report&loadId=new&mode=compact'],
  ['appends a missing load identifier after existing parameters',
    'pa://app/index.html?route=daily-report&mode=compact',
    'pa://app/index.html?route=daily-report&mode=compact&loadId=new'],
  ['appends a missing load identifier to an address without a query',
    'pa://app/index.html', 'pa://app/index.html?loadId=new'],
  ['keeps the first load identifier position and removes duplicates',
    'pa://app/index.html?route=daily-report&loadId=old&view=compact&loadId=older&filter=active&loadId=oldest',
    'pa://app/index.html?route=daily-report&loadId=new&view=compact&filter=active'],
  ['rejects an untrusted source with another host',
    'pa://test/index.html?route=daily-report&loadId=old', 'pa://app/index.html?loadId=new'],
  ['rejects an untrusted source with HTTP',
    'http://app/index.html?route=daily-report&loadId=old', 'pa://app/index.html?loadId=new'],
  ['rejects an untrusted source with another path',
    'pa://app/other.html?route=daily-report&loadId=old', 'pa://app/index.html?loadId=new'],
  ['rejects an untrusted source with an explicit port',
    'pa://app:444/index.html?route=daily-report&loadId=old', 'pa://app/index.html?loadId=new'],
  ['rejects a null source', null, 'pa://app/index.html?loadId=new'],
  ['rejects an empty source', '', 'pa://app/index.html?loadId=new'],
  ['rejects a malformed source', 'not a url', 'pa://app/index.html?loadId=new'],
  ['escapes the new load identifier',
    'pa://app/index.html?route=daily-report&loadId=old',
    'pa://app/index.html?route=daily-report&loadId=a%20b%26c', 'a b&c'],
  ['preserves original query encoding and parameter order',
    'pa://app/index.html?q=a%20b+c%2Fd&route=daily-report&loadId=old&mode=compact',
    'pa://app/index.html?q=a%20b+c%2Fd&route=daily-report&loadId=new&mode=compact'],
  ['discards a fragment after a query containing the load identifier',
    'pa://app/index.html?route=daily-report&loadId=old#frag',
    'pa://app/index.html?route=daily-report&loadId=new'],
  ['discards a fragment containing a query-like suffix',
    'pa://app/index.html#frag?loadId=old', 'pa://app/index.html?loadId=new'],
  ['discards a fragment while appending a missing load identifier',
    'pa://app/index.html?route=daily-report#frag',
    'pa://app/index.html?route=daily-report&loadId=new'],
  ['replaces escaped load identifier keys',
    'pa://app/index.html?load%49d=old&route=daily-report&loadId=older',
    'pa://app/index.html?loadId=new&route=daily-report'],
  ['skips empty segments and preserves parameters without values',
    'pa://app/index.html?&flag&&empty=&loadId&route=daily-report&&',
    'pa://app/index.html?flag&empty=&loadId=new&route=daily-report'],
  ['compares load identifier keys using ordinal comparison',
    'pa://app/index.html?LoadId=keep&loadId=old&LOADID=also&load%49d=older',
    'pa://app/index.html?LoadId=keep&loadId=new&LOADID=also'],
];

for (const [name, source, expected, loadId = 'new'] of documentCases) {
  test('document URL ' + name, () => {
    const actual = buildDocumentUrl(source, loadId);
    assert.equal(actual, expected);
    if (name.startsWith('discards')) assert.equal(actual.includes('#'), false);
  });
}

for (const [name, loadId] of [['null', null], ['empty', ''], ['whitespace', '   ']]) {
  test('document URL rejects a ' + name + ' load identifier', () => {
    assert.throws(() => buildDocumentUrl(null, loadId), Error);
  });
}

test('document URL defaults missing and empty current addresses to the canonical page', () => {
  for (const source of [undefined, ''])
    assert.equal(buildDocumentUrl(source, 'new'), 'pa://app/index.html?loadId=new');
});

test('document URL rejects an additional untrusted protocol', () => {
  assert.equal(buildDocumentUrl('file:///index.html?route=daily-report', 'new'), 'pa://app/index.html?loadId=new');
});

test('document URL rejects an additional untrusted host', () => {
  assert.equal(buildDocumentUrl('pa://other/index.html?route=daily-report', 'new'), 'pa://app/index.html?loadId=new');
});

test('document URL rejects an additional untrusted path', () => {
  assert.equal(buildDocumentUrl('pa://app/nested/index.html?route=daily-report', 'new'), 'pa://app/index.html?loadId=new');
});

test('document URL uses Unicode whitespace semantics for blank load identifiers', () => {
  assert.throws(() => buildDocumentUrl('', '\u0085'), Error);
  assert.equal(buildDocumentUrl('', '\uFEFF'), 'pa://app/index.html?loadId=%EF%BB%BF');
});
