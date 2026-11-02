'use strict';

const childProcess = require('node:child_process');
const { createLineReader } = require('./line-reader');

function classifySidecarLine(line) {
  const other = { kind: 'other', length: line.length };
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
  constructor({ executable, environment, env, onMessage, onDiagnostic, onExit, onFirstOutput = () => {}, graceMs = 12000, killTree = killProcessTree }) {
    this.pending = new Set();
    this.stopped = false;
    this.inputClosed = false;
    this.graceMs = graceMs;
    this.killTree = killTree;
    this.onMessage = onMessage;
    this.onExit = onExit;
    this.exited = new Promise(resolve => { this.resolveExit = resolve; });
    this.child = childProcess.spawn(executable, ['--environment', environment], {
      windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'], env,
    });
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
      if (typeof message?.id !== 'string') { diagnose(); return; }
      if (!this.pending.has(message.id)) { diagnose(); return; }
      if (message.type === 'progress') onMessage(message);
      else if (typeof message.ok === 'boolean') {
        this.pending.delete(message.id);
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
    this.child.stdin.on('error', error => this.finish(null, null, error));
    this.child.once('exit', (code, signal) => this.finish(code, signal));
    this.child.once('error', error => this.finish(null, null, error));
  }

  finish(code, signal, error) {
    if (this.stopped) return;
    this.stopped = true;
    this.inputClosed = true;
    const reason = error ? '启动失败' : `退出码 ${code}`;
    for (const id of this.pending)
      this.onMessage({ id, ok: false, error: `能力进程已退出（${reason}），请重启应用。` });
    this.pending.clear();
    this.resolveExit();
    this.onExit({ code, signal, error });
  }

  send({ id, line }) {
    if (this.stopped || this.inputClosed) return false;
    this.pending.add(id);
    try {
      this.child.stdin.write(line + '\n', 'utf8', error => { if (error) this.finish(null, null, error); });
      return true;
    } catch (error) {
      this.finish(null, null, error);
      return false;
    }
  }

  shutdown() {
    if (this.shutdownPromise) return this.shutdownPromise;
    this.shutdownPromise = (async () => {
      if (this.stopped) return;
      this.inputClosed = true;
      try { this.child.stdin.end(); } catch (error) { this.finish(null, null, error); }
      let timer;
      await Promise.race([this.exited, new Promise(resolve => { timer = setTimeout(resolve, this.graceMs); })]);
      clearTimeout(timer);
      if (!this.stopped) await this.killTree(this.child.pid);
      await this.exited;
    })();
    return this.shutdownPromise;
  }
}

module.exports = { SidecarClient, classifySidecarLine };
