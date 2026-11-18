'use strict';

// Launch the actual Development host. Only navigate and read; never submit forms.
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const { resolveRendererBuild } = require('../src/ProductionAssistant.Desktop/lib/renderer-build');
const root = path.resolve(__dirname, '..');
const desktop = path.join(root, 'src/ProductionAssistant.Desktop');
const electronPackage = path.join(desktop, 'node_modules/electron');
const painted = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const eventMetrics = { windowCreatedMs: 'window-created', windowShownMs: 'window-shown', reactReadyMs: 'react-ready',
  sidecarFirstOutputMs: 'sidecar-first-output', sidecarReadyMs: 'sidecar-ready' };
const requiredPhases = ['environment', 'startup-summary', 'migration.lock', 'migration.daily-report', 'migration.report-center', 'migration', 'stdio'];
const durationMetrics = ['firstContentfulPaintMs', 'groupFirstMs', 'groupAgainMs', 'settingsFirstMs', 'settingsAgainMs', 'sampleDurationMs'];
const duration = value => Number.isFinite(value) && value >= 0;

function logStamp(file) {
  try {
    const stat = fs.statSync(file);
    const fd = fs.openSync(file, 'r');
    try {
      const prefix = Buffer.alloc(Math.min(256, stat.size));
      fs.readSync(fd, prefix, 0, prefix.length, 0);
      return { ino: stat.ino, size: stat.size, prefix: prefix.toString('hex') };
    } finally { fs.closeSync(fd); }
  } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function readRunLog(file, before, identity) {
  const current = logStamp(file);
  if (!current) throw new Error('log-read: desktop.log missing; startup metrics unavailable');
  const archive = logStamp(file + '.1');
  const preserves = stamp => stamp && stamp.ino === before.ino && stamp.size >= before.size && stamp.prefix.startsWith(before.prefix);
  let logStatus = 'current';
  if (before && !preserves(current)) {
    if (preserves(archive)) logStatus = 'rotated';
    else throw new Error('log-read: log truncated/replaced or rotation history lost; startup metrics unavailable');
  }
  const records = [];
  for (const source of [file + '.1', file]) {
    if (!fs.existsSync(source)) continue;
    const lines = fs.readFileSync(source, 'utf8').split('\n');
    for (const [index, line] of lines.entries()) {
      if (!line.trim()) continue;
      let item;
      try { item = JSON.parse(line); }
      catch { throw new Error(`log-read: malformed/truncated JSON at ${path.basename(source)}:${index + 1}`); }
      if (item.startupId === identity.startupId && item.electronPid === identity.electronPid) {
        records.push(item);
        if (source.endsWith('.1')) logStatus = 'rotated';
      }
    }
  }
  return { records, logStatus };
}

function buildSample(records, identity, timings) {
  const errors = [];
  const one = event => {
    const matching = records.filter(item => item.event === event && item.startupId === identity.startupId && item.electronPid === identity.electronPid);
    if (matching.length !== 1) errors.push(`${event}: expected one event, found ${matching.length}`);
    return matching[0];
  };
  const start = one('app-start'), spawn = one('sidecar-spawn');
  if (!identity.startupId || !Number.isInteger(identity.electronPid) || !identity.buildId) errors.push('identity: missing startup ID / PID / Build ID');
  if (start?.buildId !== identity.buildId || start?.environment !== 'Development') errors.push('app-start: Build ID or environment mismatch');
  if (!duration(start?.t)) errors.push('app-start: missing/invalid main clock');
  if (!Number.isInteger(spawn?.pid) || spawn.pid <= 0) errors.push('sidecar-spawn: missing PID');
  const sample = { ...timings, ...identity, sidecarPid: spawn?.pid ?? null, phases: [], requests: [] };
  for (const [metric, event] of Object.entries(eventMetrics)) {
    const item = one(event);
    sample[metric] = item?.t ?? null;
    if (!duration(item?.t) || item.t < start?.t) errors.push(`${event}: missing/invalid ${metric} (Electron process clock)`);
    if (event === 'sidecar-ready' && item?.sidecarPid !== spawn?.pid) errors.push('sidecar-ready: Sidecar PID mismatch');
  }
  if (sample.windowShownMs < sample.windowCreatedMs) errors.push('window-shown: precedes window-created');
  if (sample.sidecarReadyMs < sample.sidecarFirstOutputMs) errors.push('sidecar-ready: precedes sidecar-first-output');
  for (const metric of durationMetrics) if (!duration(sample[metric])) errors.push(`${metric}: missing/invalid duration`);
  for (const phase of requiredPhases) {
    const ends = records.filter(item => item.startupId === identity.startupId && item.electronPid === identity.electronPid && item.event === 'sidecar-phase' && item.phase === phase && item.status === 'end');
    if (ends.length !== 1 || !duration(ends[0]?.elapsedMs)) errors.push(`sidecar-phase/${phase}: missing/invalid elapsedMs`);
    else sample.phases.push({ phase, elapsedMs: ends[0].elapsedMs });
  }
  sample.requests = records.filter(item => item.startupId === identity.startupId && item.electronPid === identity.electronPid && item.event === 'request-done')
    .map(({ operation, elapsedMs, ok }) => ({ operation, elapsedMs, ok }));
  if (errors.length) throw new Error(`sample-validation: ${errors.join('; ')}`);
  return { ...sample, valid: true };
}

function medians(samples) {
  const result = {};
  for (const metric of [...Object.keys(eventMetrics), ...durationMetrics]) {
    const values = samples.filter(sample => sample.valid === true && duration(sample[metric])).map(sample => sample[metric]).sort((a, b) => a - b);
    if (values.length) result[metric] = (values[Math.floor((values.length - 1) / 2)] + values[Math.floor(values.length / 2)]) / 2;
  }
  return result;
}

async function main() {
  const { _electron } = require('../src/ProductionAssistant.App/Assets/TencentSheet/node_modules/playwright');
  const executablePath = path.join(electronPackage, 'dist', fs.readFileSync(path.join(electronPackage, 'path.txt'), 'utf8').trim());
  const output = path.resolve(process.argv[2] || path.join(root, 'artifacts/startup/measurement.json'));
  const count = Number(process.argv[3] || 5);
  if (!Number.isInteger(count) || count < 1) throw new Error('measurement: count must be a positive integer');
  const logFile = path.join(process.env.LOCALAPPDATA, 'ProductionAssistant/Electron/Development/logs/desktop.log');
  const identityFile = path.join(path.dirname(path.dirname(logFile)), 'instance-identity.json');
  const samples = [];
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const save = () => fs.writeFileSync(output, JSON.stringify({ environment: 'Development', measuredAt: new Date().toISOString(),
    clockBases: { hostEvents: 'Electron process uptime (monotonic milliseconds)', firstContentfulPaintMs: 'Renderer navigation performance origin',
      phases: 'Sidecar Stopwatch elapsed durations', interactions: 'Measurement process performance.now elapsed durations' },
    groupFirstDefinition: 'static table and configuration-dependent date control visible; two animation frames',
    samples, medians: medians(samples) }, null, 2));
  for (let index = 0; index < count; index++) {
    const before = logStamp(logFile);
    const env = { ...process.env, PRODUCTIONASSISTANT_DIST: process.argv[4] ? path.resolve(process.argv[4]) : path.join(root, 'deployments/development/Assets/Prototype') };
    delete env.ELECTRON_RUN_AS_NODE;
    const expectedBuild = resolveRendererBuild(env.PRODUCTIONASSISTANT_DIST).buildId;
    const start = performance.now();
    let instance, identity, stage = 'electron-connect';
    try {
      instance = await _electron.launch({ executablePath, args: [desktop, '--environment', 'Development'], env, timeout: 30000 });
      stage = 'run-identity';
      const pid = await instance.evaluate(() => process.pid);
      const current = JSON.parse(fs.readFileSync(identityFile, 'utf8'));
      if (current.pid !== pid || current.buildId !== expectedBuild || !current.startupId) throw new Error('Run identity does not match launched Electron / expected Build ID');
      identity = { electronPid: pid, startupId: current.startupId, buildId: current.buildId };
      stage = 'window';
      const page = await instance.firstWindow();
      if (!await instance.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().some(window => window.isVisible()))) throw new Error('Native Electron window is not visible');
      await page.getByRole('button', { name: '集团填报', exact: true }).waitFor();
      await painted(page);
      const enter = async () => {
        const began = performance.now();
        await page.getByRole('button', { name: '集团填报', exact: true }).click();
        await page.getByRole('table', { name: '本次填报数据', exact: true }).waitFor();
        await page.getByLabel('填报日期', { exact: true }).waitFor();
        await painted(page);
        return Math.round(performance.now() - began);
      };
      stage = 'group-first';
      const groupFirstMs = await enter();
      stage = 'settings-first';
      const settingsStart = performance.now();
      await page.getByRole('tab', { name: '设置', exact: true }).click();
      await page.getByLabel('集团填报设置', { exact: true }).waitFor();
      await painted(page);
      const settingsFirstMs = Math.round(performance.now() - settingsStart);
      if (index === 0) await page.screenshot({ path: output.replace(/\.json$/, '-settings.png') });
      stage = 'repeat-navigation';
      await page.getByRole('tab', { name: '概览', exact: true }).click();
      const repeatSettings = performance.now();
      await page.getByRole('tab', { name: '设置', exact: true }).click();
      await page.getByLabel('集团填报设置', { exact: true }).waitFor();
      await painted(page);
      const settingsAgainMs = Math.round(performance.now() - repeatSettings);
      // Workbench tabs retain their selection across module navigation.
      await page.getByRole('tab', { name: '概览', exact: true }).click();
      await page.getByRole('button', { name: '生产消息', exact: true }).click();
      const groupAgainMs = await enter();
      if (index === 0) await page.screenshot({ path: output.replace(/\.json$/, '-group.png') });
      const initial = await page.evaluate(() => ({ firstContentfulPaintMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null }));
      stage = 'log-validation';
      const { records, logStatus } = readRunLog(logFile, before, identity);
      const sample = buildSample(records, identity, { index: index + 1, kind: index === 0 ? 'first-process-launch' : 'consecutive-process-launch',
        ...initial, groupFirstMs, groupAgainMs, settingsFirstMs, settingsAgainMs, logStatus,
        sampleDurationMs: Math.round(performance.now() - start) });
      samples.push(sample);
      save();
      console.log(JSON.stringify(sample));
    } catch (error) {
      samples.push({ index: index + 1, valid: false, stage, ...identity, error: error.message });
      save();
      throw error;
    } finally { if (instance) await instance.close(); }
  }
}
module.exports = { logStamp, readRunLog, buildSample, medians, requiredPhases };
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
