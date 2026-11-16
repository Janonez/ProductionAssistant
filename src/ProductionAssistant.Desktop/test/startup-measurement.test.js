'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { logStamp, readRunLog, buildSample, medians, requiredPhases } = require('../../../scripts/measure-electron-startup.cjs');
const identity = { electronPid: 101, startupId: 'this-launch', buildId: 'this-build' };
const timings = { firstContentfulPaintMs: 250, groupFirstMs: 140, groupAgainMs: 100, settingsFirstMs: 400, settingsAgainMs: 60, sampleDurationMs: 1500 };
function records(run = identity) {
  const entries = [
    { event: 'app-start', t: 30, buildId: run.buildId }, { event: 'sidecar-spawn', t: 90, pid: 102 },
    { event: 'window-created', t: 100 }, { event: 'window-shown', t: 101 }, { event: 'react-ready', t: 300 },
    { event: 'sidecar-first-output', t: 310 }, { event: 'sidecar-ready', t: 350, sidecarPid: 102 },
    ...requiredPhases.map(phase => ({ event: 'sidecar-phase', phase, status: 'end', elapsedMs: 2.5, t: 320 })),
  ];
  return entries.map(item => ({ ...run, environment: 'Development', ...item }));
}
const encode = entries => entries.map(item => JSON.stringify(item)).join('\n') + '\n';
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'metis-startup-measurement-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return path.join(directory, 'desktop.log');
}

test('rotation reads this run across archive and current log without trusting old byte offsets', t => {
  const file = fixture(t);
  fs.writeFileSync(file, encode(records({ ...identity, startupId: 'old-launch' })));
  const before = logStamp(file);
  const run = records();
  fs.appendFileSync(file, encode(run.slice(0, 5)));
  fs.renameSync(file, file + '.1');
  fs.writeFileSync(file, encode(run.slice(5)));
  const result = readRunLog(file, before, identity);
  assert.equal(result.logStatus, 'rotated');
  assert.equal(result.records.length, run.length);
  assert.equal(buildSample(result.records, identity, timings).valid, true);
});

test('missing and empty logs never produce successful samples', t => {
  const file = fixture(t);
  assert.throws(() => readRunLog(file, null, identity), /log-read: desktop.log missing/);
  fs.writeFileSync(file, '');
  const result = readRunLog(file, null, identity);
  assert.throws(() => buildSample(result.records, identity, timings), /window-shown.*react-ready.*sidecar-ready/);
});

test('in-place truncation is detected even if the new log grows past the old size', t => {
  const file = fixture(t);
  fs.writeFileSync(file, encode([{ ...identity, event: 'old-header' }]));
  const before = logStamp(file);
  fs.writeFileSync(file, encode(records()));
  assert.ok(fs.statSync(file).size > before.size);
  assert.throws(() => readRunLog(file, before, identity), /truncated\/replaced/);
});

test('lost rotation history and incomplete JSON are explicit failures', t => {
  const file = fixture(t);
  fs.writeFileSync(file, encode(records()));
  const before = logStamp(file);
  fs.renameSync(file, file + '.lost');
  fs.writeFileSync(file, encode(records().slice(5)));
  assert.throws(() => readRunLog(file, before, identity), /rotation history lost/);
  fs.writeFileSync(file, '{"event":');
  assert.throws(() => readRunLog(file, null, identity), /malformed\/truncated JSON/);
});

test('PID reuse and unrelated concurrent instances cannot fill missing metrics', t => {
  const file = fixture(t);
  const own = records().filter(item => item.event !== 'sidecar-ready');
  const old = records({ ...identity, startupId: 'previous-same-pid' });
  const other = records({ ...identity, electronPid: 999 });
  fs.writeFileSync(file, encode([...old, ...own, ...other]));
  const result = readRunLog(file, null, identity);
  assert.equal(result.records.length, own.length);
  assert.throws(() => buildSample(result.records, identity, timings), /sidecar-ready/);
});

test('all required host metrics and initialization phases must be present', () => {
  for (const event of ['app-start', 'sidecar-spawn', 'window-created', 'window-shown', 'react-ready', 'sidecar-first-output', 'sidecar-ready']) {
    assert.throws(() => buildSample(records().filter(item => item.event !== event), identity, timings), new RegExp(event));
  }
  for (const phase of requiredPhases) {
    assert.throws(() => buildSample(records().filter(item => item.phase !== phase), identity, timings), new RegExp(`sidecar-phase/${phase}`));
  }
});

test('missing FCP or interaction durations invalidates the sample', () => {
  for (const metric of Object.keys(timings)) for (const bad of [null, undefined, NaN, -1]) {
    assert.throws(() => buildSample(records(), identity, { ...timings, [metric]: bad }), new RegExp(metric));
  }
});

test('duplicate launches, wrong builds, Sidecar PID mismatches and reversed event clocks fail validation', () => {
  assert.throws(() => buildSample([...records(), records()[0]], identity, timings), /app-start/);
  assert.throws(() => buildSample(records().map(item => item.event === 'app-start' ? { ...item, buildId: 'old-build' } : item), identity, timings), /Build ID/);
  assert.throws(() => buildSample(records().map(item => item.event === 'sidecar-ready' ? { ...item, sidecarPid: 999 } : item), identity, timings), /Sidecar PID/);
  assert.throws(() => buildSample(records().map(item => item.event === 'window-shown' ? { ...item, t: 99 } : item), identity, timings), /precedes window-created/);
});

test('clock domains remain distinct and only validated samples contribute to medians', () => {
  const sample = buildSample(records(), identity, timings);
  assert.equal(sample.windowShownMs, 101); // Electron uptime, no subtraction of runner time
  assert.equal(sample.firstContentfulPaintMs, 250); // Renderer navigation time origin
  assert.equal(sample.phases[0].elapsedMs, 2.5); // Sidecar elapsed duration
  const result = medians([sample, { ...sample, valid: false, settingsFirstMs: 99999 }, { ...sample, settingsFirstMs: 200 }]);
  assert.equal(result.settingsFirstMs, 300);
  assert.deepEqual(medians([{ ...sample, valid: false }]), {});
});
