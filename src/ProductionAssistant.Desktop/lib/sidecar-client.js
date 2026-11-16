'use strict';

const childProcess = require('node:child_process');
const { randomUUID } = require('node:crypto');
const { performance } = require('node:perf_hooks');
const { createLineReader } = require('./line-reader');

function classifySidecarLine(line) {
  const other = { kind: 'other', length: line.length };
  try {
    const message = JSON.parse(line);
    if (message.type === 'startup.phase' && /^[a-z.-]+$/.test(message.phase) &&
        ['start', 'end', 'failed'].includes(message.status) && Number.isFinite(message.elapsedMs) && message.elapsedMs >= 0)
      return { kind: 'startup', phase: message.phase, status: message.status, elapsedMs: message.elapsedMs };
  } catch {}
  const start = /^\[[^\[\]\r\n]+\] bridge-start-([A-Za-z0-9.]+)$/.exec(line);
  if (start && start[0] === line) return { kind: 'mark', phase: 'start', operation: start[1], durationMs: null };
  const end = /^\[[^\[\]\r\n]+\] bridge-end-([A-Za-z0-9.]+)-duration=(\d+(?:\.\d+)?)ms$/.exec(line);
  if (end && end[0] === line && Number.isFinite(Number(end[2])))
    return { kind: 'mark', phase: 'end', operation: end[1], durationMs: Number(end[2]) };
  return other;
}

function killProcessTree(pid) {
  if (!pid) return;
  if (process.platform !== 'win32') {
    try { process.kill(pid); } catch {}
    return;
  }
  return new Promise(resolve => {
    try {
      const killer = childProcess.spawn('taskkill', ['/PID', String(pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
      killer.once('error', () => resolve());
      killer.once('close', () => resolve());
    } catch { resolve(); }
  });
}

class SidecarClient {
  constructor({ executable, environment, env, onMessage, onDiagnostic = () => {}, onExit = () => {}, onState = () => {}, onFirstOutput = () => {}, graceMs = 12000, startupTimeoutMs = 20000, killTree = killProcessTree }) {
    this.pending = new Map();
    this.stopped = false;
    this.inputClosed = false;
    this.graceMs = graceMs;
    this.killTree = killTree;
    this.onMessage = onMessage;
    this.onExit = onExit;
    this.onState = onState;
    this.startupId = env.METIS_STARTUP_ID || randomUUID();
    this.snapshot = { state: 'NotStarted', protocolVersion: 1, startupId: this.startupId, pid: null, phase: 'spawn' };
    this.setState('Starting');
    this.exited = new Promise(resolve => { this.resolveExit = resolve; });
    this.child = childProcess.spawn(executable, ['--environment', environment], {
      windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'], env: { ...env, METIS_STARTUP_ID: this.startupId },
    });
    this.child.once('spawn', () => this.setState('Starting', { pid: this.child.pid }));
    this.startupTimer = setTimeout(() => this.fail('SIDECAR_STARTUP_TIMEOUT', '本地服务初始化超时，请检查日志并重新启动应用。'), startupTimeoutMs);
    let firstOutput = true;
    const noteOutput = () => {
      if (!firstOutput) return;
      firstOutput = false;
      onFirstOutput();
    };
    const stdout = createLineReader(line => {
      noteOutput();
      const diagnose = () => onDiagnostic({ kind: 'other', length: line.length });
      let message;
      try { message = JSON.parse(line); }
      catch { diagnose(); return; }
      if (message?.type === 'sidecar.lifecycle') {
        if (this.inputClosed || this.snapshot.state === 'Ready') return;
        if (message.protocolVersion !== 1 || message.startupId !== this.startupId) {
          this.fail('SIDECAR_PROTOCOL_MISMATCH', '本地服务协议与桌面版本不匹配，请重新验证并启动应用。');
          return;
        }
        const phase = typeof message.phase === 'string' && /^[a-z.-]+$/.test(message.phase) ? message.phase : 'initialization';
        if (message.state === 'Initializing') this.setState('Initializing', { phase });
        else if (message.state === 'Ready') {
          clearTimeout(this.startupTimer);
          this.setState('Ready', { phase: 'ready', pid: this.child.pid });
          for (const request of this.pending.values()) this.write(request);
        } else if (message.state === 'Failed') {
          this.setState('Initializing', { phase });
          this.fail('SIDECAR_INITIALIZATION_FAILED', '本地服务初始化失败，请检查日志并重新启动应用。');
        } else this.fail('SIDECAR_PROTOCOL_MISMATCH', '本地服务返回了无效的生命周期状态。');
        return;
      }
      if (typeof message?.id !== 'string') { diagnose(); return; }
      const request = this.pending.get(message.id);
      if (!request) { diagnose(); return; }
      if (performance.now() >= request.deadline) { this.expire(request); return; }
      if (message.type === 'progress') onMessage(message);
      else if (typeof message.ok === 'boolean') {
        this.complete(message.id);
        onMessage(message);
      } else diagnose();
    });
    const stderr = createLineReader(line => {
      noteOutput();
      onDiagnostic(classifySidecarLine(line));
    });
    this.child.stdout.on('data', chunk => stdout.write(chunk));
    this.child.stdout.on('end', () => stdout.end());
    this.child.stderr.on('data', chunk => stderr.write(chunk));
    this.child.stderr.on('end', () => stderr.end());
    this.child.stdin.on('error', () => this.fail('SIDECAR_IO_FAILED', '本地服务通信中断，请重新启动应用并核对未完成操作。'));
    this.child.once('exit', (code, signal) => this.finish(code, signal));
    this.child.once('error', error => this.finish(null, null, error));
  }

  setState(state, details = {}) {
    this.snapshot = Object.freeze({ ...this.snapshot, ...details, state });
    this.onState(this.snapshot);
  }

  complete(id) {
    const request = this.pending.get(id);
    if (request) clearTimeout(request.timer);
    this.pending.delete(id);
  }

  expire(request) {
    // A cleared timer may already be runnable; never settle a replacement ID.
    if (this.pending.get(request.id) !== request) return;
    this.complete(request.id);
    this.onMessage({ id: request.id, ok: false, error: request.sent ? '本地服务请求超时，执行结果未知；请先核对状态。' : '本地服务尚未就绪，请稍后重试。',
      errorCode: request.sent ? 'SIDECAR_REQUEST_TIMEOUT' : 'SIDECAR_NOT_READY', retryable: !request.sent, state: this.snapshot.state });
  }

  rejectPending(errorCode, error) {
    for (const [id, request] of this.pending) {
      this.complete(id);
      this.onMessage({ id, ok: false, error, errorCode, state: this.snapshot.state, retryable: !request.sent });
    }
  }

  fail(errorCode, error) {
    if (this.inputClosed) return;
    clearTimeout(this.startupTimer);
    this.inputClosed = true;
    this.setState('Failed', { errorCode });
    this.rejectPending(errorCode, error);
    // No restart or replay. EOF gives the owned process the normal shutdown path.
    void this.shutdown().catch(() => {}); // Failure is published through the authoritative state.
  }

  finish(code, signal, error) {
    if (this.stopped) return;
    this.stopped = true;
    this.inputClosed = true;
    clearTimeout(this.startupTimer);
    const reason = error ? '启动失败' : `退出码 ${code}`;
    if (this.snapshot.state !== 'Failed') {
      const expected = this.snapshot.state === 'Stopping';
      this.setState(expected ? 'Stopped' : 'Failed', { errorCode: expected ? undefined : error ? 'SIDECAR_START_FAILED' : 'SIDECAR_EXITED' });
    }
    this.rejectPending('SIDECAR_EXITED', `能力进程已退出（${reason}），请重启应用。`);
    this.resolveExit();
    this.onExit({ code, signal, error });
  }

  send({ id, line, timeoutMs = 30000 }) {
    if (this.stopped || this.inputClosed) return false;
    if (this.pending.has(id)) return false;
    if (this.pending.size >= 256) {
      this.onMessage({ id, ok: false, error: '本地服务请求过多，请稍后重试。', errorCode: 'SIDECAR_QUEUE_FULL', retryable: true });
      return true;
    }
    const duration = Number.isFinite(timeoutMs) ? Math.max(1, Math.min(timeoutMs, 300000)) : 30000;
    const request = { id, line, sent: false, deadline: performance.now() + duration };
    request.timer = setTimeout(() => this.expire(request), duration);
    this.pending.set(id, request);
    return this.snapshot.state === 'Ready' ? this.write(request) : true;
  }

  write(request) {
    if (request.sent || this.pending.get(request.id) !== request || this.inputClosed) return false;
    // Ready and timer callbacks can arrive in the same event-loop turn.
    if (performance.now() >= request.deadline) { this.expire(request); return true; }
    request.sent = true;
    try {
      this.child.stdin.write(request.line + '\n', 'utf8', error => { if (error) this.fail('SIDECAR_IO_FAILED', '本地服务通信中断，请重新启动应用并核对未完成操作。'); });
      return true;
    } catch (error) {
      this.fail('SIDECAR_IO_FAILED', '本地服务通信中断，请重新启动应用并核对未完成操作。');
      return false;
    }
  }

  shutdown() {
    if (this.shutdownPromise) return this.shutdownPromise;
    this.shutdownPromise = (async () => {
      if (this.stopped) return;
      this.inputClosed = true;
      clearTimeout(this.startupTimer);
      if (this.snapshot.state !== 'Failed') this.setState('Stopping');
      this.rejectPending('SIDECAR_STOPPING', '本地服务正在停止，未完成请求的执行结果请重新核对。');
      try { this.child.stdin.end(); } catch (error) { this.finish(null, null, error); }
      let timer;
      await Promise.race([this.exited, new Promise(resolve => { timer = setTimeout(resolve, this.graceMs); })]);
      clearTimeout(timer);
      if (!this.stopped) {
        let terminationTimer;
        try {
          await Promise.race([
            Promise.resolve().then(() => this.killTree(this.child.pid)).then(() => this.exited),
            new Promise((_, reject) => { terminationTimer = setTimeout(() => reject(Object.assign(new Error('本地服务未能在期限内退出。'), { code: 'SIDECAR_SHUTDOWN_TIMEOUT' })), this.graceMs); }),
          ]);
        } catch (error) {
          this.setState('Failed', { errorCode: error.code || 'SIDECAR_SHUTDOWN_FAILED' });
          throw error;
        } finally { clearTimeout(terminationTimer); }
      }
    })();
    return this.shutdownPromise;
  }
}

module.exports = { SidecarClient, classifySidecarLine };
