'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('node:child_process');
const { EventEmitter } = require('node:events');
const path = require('node:path');
const os = require('node:os');
const { randomUUID } = require('node:crypto');
const { SidecarClient, classifySidecarLine } = require('../lib/sidecar-client');

function launch(t, { mode = '', graceMs = 5000, defaultKill = false } = {}) {
  const events = [];
  const waiters = new Set();
  const publish = event => {
    events.push(event);
    for (const notify of [...waiters]) notify();
  };
  const waitFor = predicate => {
    const existing = events.find(predicate);
    if (existing) return Promise.resolve(existing);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { waiters.delete(notify); reject(new Error('Timed out waiting for fixture event')); }, 10000);
      const notify = () => {
        const event = events.find(predicate);
        if (!event) return;
        clearTimeout(timer);
        waiters.delete(notify);
        resolve(event);
      };
      waiters.add(notify);
    });
  };
  const env = Object.freeze({ ...process.env, PA_FAKE_SIDECAR: '1', PA_FAKE_MODE: mode });
  const spawn = childProcess.spawn;
  const mocked = t.mock.method(childProcess, 'spawn', (executable, args, options) => {
    assert.equal(executable, process.execPath);
    assert.deepEqual(args, ['--environment', 'Development']);
    assert.equal(options.env, env);
    assert.equal(options.windowsHide, true);
    assert.deepEqual(options.stdio, ['pipe', 'pipe', 'pipe']);
    return spawn(process.execPath, [path.join(__dirname, 'fixtures', 'fake-sidecar.js'), ...args], {
      ...options, stdio: [...options.stdio, 'ipc'],
    });
  });
  const killed = [];
  let client;
  try {
    client = new SidecarClient({
      executable: process.execPath, environment: 'Development', env, graceMs,
      onMessage: message => publish({ type: 'message', message }),
      onDiagnostic: message => publish({ type: 'diagnostic', message }),
      onFirstOutput: () => publish({ type: 'first-output' }),
      onExit: details => publish({ type: 'exit', details }),
      ...(defaultKill ? {} : { killTree: pid => {
        killed.push(pid);
        client.child.send('exit', () => {});
      } }),
    });
  } finally { mocked.mock.restore(); }
  const closed = new Promise(resolve => client.child.once('close', resolve));
  t.after(async () => {
    if (client.child.connected) client.child.send('exit', () => {});
    await client.shutdown();
    await closed;
  });
  return {
    client, events, killed, waitFor,
    ready: waitFor(event => event.type === 'first-output'),
    send: (id, operation, payload) => client.send({ id, line: JSON.stringify({ id, operation, payload }) }),
  };
}

test('spawns with the exact environment and exchanges Unicode requests by id', async t => {
  const harness = launch(t);
  await harness.ready;
  assert.equal(harness.send('echo', 'echo', { text: '中文🙂\nline' }), true);
  const result = await harness.waitFor(event => event.type === 'message' && event.message.id === 'echo');
  assert.deepEqual(result.message, { id: 'echo', ok: true, data: { text: '中文🙂\nline' } });
  assert.equal(harness.client.pending.size, 0);
});

test('delivers two progress messages before the matching final response', async t => {
  const harness = launch(t);
  await harness.ready;
  harness.send('progress', 'progress.demo', { done: true });
  await harness.waitFor(event => event.type === 'message' && event.message.ok === true);
  assert.deepEqual(harness.events.filter(event => event.type === 'message').map(event => event.message), [
    { id: 'progress', type: 'progress', data: { current: 1 } },
    { id: 'progress', type: 'progress', data: { current: 2 } },
    { id: 'progress', ok: true, data: { done: true } },
  ]);
  assert.equal(harness.client.pending.size, 0);
});

test('classifies stdout diagnostics and stderr without retaining their content', async t => {
  const harness = launch(t);
  await harness.ready;
  harness.send('noise', 'noise.demo');
  await harness.waitFor(event => event.type === 'message' && event.message.id === 'noise');
  await harness.waitFor(event => event.type === 'diagnostic' && event.message.length === 2100);
  const diagnostics = harness.events.filter(event => event.type === 'diagnostic').map(event => event.message);
  const lengths = ['fixture-ready', '{invalid', JSON.stringify({ ignored: true }),
    JSON.stringify({ id: 'unknown', ok: true }), JSON.stringify({ id: 'noise', ignored: true })].map(line => line.length);
  lengths.push(2100);
  assert.deepEqual(diagnostics.map(message => message.length).sort((a, b) => a - b), lengths.sort((a, b) => a - b));
  for (const diagnostic of diagnostics)
    assert.deepEqual(diagnostic, { kind: 'other', length: diagnostic.length });
});

test('fails every pending request once on exit code 7 and rejects later sends', async t => {
  const harness = launch(t);
  await harness.ready;
  harness.send('first', 'hang');
  harness.send('second', 'hang');
  harness.send('exit', 'exit.now');
  const exit = await harness.waitFor(event => event.type === 'exit');
  assert.equal(exit.details.code, 7);
  const messages = harness.events.filter(event => event.type === 'message').map(event => event.message);
  assert.deepEqual(messages.map(message => message.id), ['first', 'second', 'exit']);
  for (const message of messages) assert.deepEqual(message, { id: message.id, ok: false, error: '能力进程已退出（退出码 7），请重启应用。' });
  assert.equal(harness.client.pending.size, 0);
  assert.equal(harness.send('later', 'echo'), false);
  assert.equal(harness.events.filter(event => event.type === 'exit').length, 1);
});

test('reports ENOENT as startup failure and settles shutdown', async () => {
  const messages = [];
  let onExit;
  const exited = new Promise(resolve => { onExit = resolve; });
  const client = new SidecarClient({
    executable: path.join(os.tmpdir(), randomUUID() + '.missing.exe'), environment: 'Development', env: { ...process.env },
    onMessage: message => messages.push(message), onDiagnostic: () => {}, onExit,
  });
  client.send({ id: 'startup', line: '{"id":"startup","operation":"echo"}' });
  const details = await exited;
  assert.equal(details.error.code, 'ENOENT');
  assert.deepEqual(messages, [{ id: 'startup', ok: false, error: '能力进程已退出（启动失败），请重启应用。' }]);
  assert.equal(client.send({ id: 'later', line: '{}' }), false);
  await client.shutdown();
});

test('treats synchronous, callback, and stream write errors including EPIPE as exit', async t => {
  for (const mode of ['throw', 'callback', 'event']) {
    const harness = launch(t);
    await harness.ready;
    const error = Object.assign(new Error('write failed'), { code: 'EPIPE' });
    if (mode === 'event') {
      harness.send(mode, 'hang');
      harness.client.child.stdin.emit('error', error);
    } else {
      t.mock.method(harness.client.child.stdin, 'write', (_text, _encoding, callback) => {
        if (mode === 'throw') throw error;
        callback(error);
        return false;
      });
      assert.equal(harness.send(mode, 'hang'), mode !== 'throw');
    }
    await harness.waitFor(event => event.type === 'exit');
    assert.equal(harness.client.pending.size, 0);
    assert.equal(harness.events.filter(event => event.type === 'exit').length, 1);
    assert.equal(harness.events.filter(event => event.type === 'message').length, 1);
    assert.equal(harness.send('later', 'echo'), false);
  }
});

test('closes stdin once and reuses the same graceful shutdown promise', async t => {
  const harness = launch(t);
  await harness.ready;
  const end = t.mock.method(harness.client.child.stdin, 'end');
  const first = harness.client.shutdown();
  assert.equal(harness.client.shutdown(), first);
  assert.equal(harness.send('closed', 'echo'), false);
  await first;
  assert.equal(end.mock.callCount(), 1);
  assert.deepEqual(harness.killed, []);
});

test('calls injected killTree after the grace period and waits for the fake process to exit', async t => {
  const harness = launch(t, { mode: 'keep-after-eof', graceMs: 20 });
  await harness.ready;
  harness.send('pending', 'hang');
  await harness.client.shutdown();
  assert.deepEqual(harness.killed, [harness.client.child.pid]);
  assert.equal(harness.client.pending.size, 0);
  assert.equal(harness.events.filter(event => event.type === 'exit').length, 1);
});

test('uses the default tree termination command without executing it in the test', async t => {
  const harness = launch(t, { mode: 'keep-after-eof', graceMs: 20, defaultKill: true });
  await harness.ready;
  if (process.platform === 'win32') {
    t.mock.method(childProcess, 'spawn', (executable, args, options) => {
      assert.equal(executable, 'taskkill');
      assert.deepEqual(args, ['/PID', String(harness.client.child.pid), '/T', '/F']);
      assert.equal(options.windowsHide, true);
      assert.equal(options.stdio, 'ignore');
      harness.client.child.send('exit', () => {});
      const child = new EventEmitter();
      queueMicrotask(() => child.emit('close', 0));
      return child;
    });
  } else {
    t.mock.method(process, 'kill', pid => {
      assert.equal(pid, harness.client.child.pid);
      harness.client.child.send('exit', () => {});
    });
  }
  await harness.client.shutdown();
});

test('classifies a normal sidecar start mark without retaining the timestamp', () => {
  assert.deepEqual(classifySidecarLine('[2026-10-31T10:00:00] bridge-start-database.getState'),
    { kind: 'mark', phase: 'start', operation: 'database.getState', durationMs: null });
});

test('classifies normal sidecar end marks with integer and decimal durations', () => {
  for (const durationMs of [0, 123, 12.5])
    assert.deepEqual(classifySidecarLine(`[2026-10-31T10:00:00] bridge-end-report.run-duration=${durationMs}ms`),
      { kind: 'mark', phase: 'end', operation: 'report.run', durationMs });
});

test('rejects sidecar mark operations containing illegal characters', () => {
  for (const operation of ['run_test', 'run-test', 'run/test', 'run test', '操作', '']) {
    for (const line of [`[stamp] bridge-start-${operation}`, `[stamp] bridge-end-${operation}-duration=3ms`])
      assert.deepEqual(classifySidecarLine(line), { kind: 'other', length: line.length });
  }
});

test('rejects sidecar marks with extra prefixes or suffixes including final newlines', () => {
  for (const mark of ['[stamp] bridge-start-report.run', '[stamp] bridge-end-report.run-duration=3ms']) {
    for (const line of ['extra ' + mark, mark + ' extra', ' ' + mark, mark + '\n', mark + '\r\n'])
      assert.deepEqual(classifySidecarLine(line), { kind: 'other', length: line.length });
  }
});

test('classifies an empty sidecar line only by its length', () => {
  assert.deepEqual(classifySidecarLine(''), { kind: 'other', length: 0 });
});

test('classifies an oversized sidecar line without truncating or returning its content', () => {
  const line = 'x'.repeat(100000);
  assert.deepEqual(classifySidecarLine(line), { kind: 'other', length: 100000 });
});

test('rejects missing, invalid, and nonfinite sidecar durations', () => {
  for (const line of ['[stamp] bridge-end-report.run', '[stamp] bridge-start-report.run-duration=1ms',
    '[stamp] bridge-end-report.run-duration=-1ms', '[stamp] bridge-end-report.run-duration=NaNms',
    '[stamp] bridge-end-report.run-duration=' + '9'.repeat(400) + 'ms'])
    assert.deepEqual(classifySidecarLine(line), { kind: 'other', length: line.length });
});

test('notifies first sidecar output once across stderr and multiple stdout lines', async t => {
  const harness = launch(t);
  await harness.ready;
  harness.send('first-output', 'progress.demo');
  await harness.waitFor(event => event.type === 'message' && event.message.ok === true);
  assert.equal(harness.events.filter(event => event.type === 'first-output').length, 1);
});
