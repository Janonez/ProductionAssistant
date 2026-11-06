'use strict';

const { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme, protocol } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { parseEnvironment, resolveSidecarPath, resolveDistRoot, resolveUserDataDir } = require('./lib/environment');
const { newLoadId, isCurrentLoad, buildDocumentUrl, classify } = require('./lib/router');
const { checkSender } = require('./lib/sender-check');
const { resolveFile } = require('./lib/file-resolver');
const { SidecarClient } = require('./lib/sidecar-client');

const PROTOCOL_HOST = 'app';
const INDEX_PATH = '/index.html';
const documentUrl = `pa://${PROTOCOL_HOST}${INDEX_PATH}`;

function start() {
  let environment;
  let userData;
  try {
    environment = parseEnvironment(process.argv, process.env);
    userData = resolveUserDataDir(process.env, environment);
  } catch (error) {
    dialog.showErrorBox('启动失败', error.message);
    app.exit(2);
    return;
  }
  fs.mkdirSync(userData, { recursive: true });
  app.setPath('userData', userData);
  app.setPath('sessionData', userData);
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    return;
  }
  protocol.registerSchemesAsPrivileged([
    { scheme: 'pa', privileges: { standard: true, secure: true, supportFetchAPI: true } },
  ]);

  const logDirectory = path.join(userData, 'logs');
  const logFile = path.join(logDirectory, 'desktop.log');
  fs.mkdirSync(logDirectory, { recursive: true });
  const now = () => Math.round(process.uptime() * 1000);
  let logBytes = 0;
  try { logBytes = fs.statSync(logFile).size; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  function log(event, details = {}) {
    if (logBytes > 5242880) {
      fs.rmSync(logFile + '.1', { force: true });
      fs.renameSync(logFile, logFile + '.1');
      logBytes = 0;
    }
    const line = JSON.stringify({ timestamp: new Date().toISOString(), t: now(), event, ...details }) + '\n';
    fs.appendFileSync(logFile, line, 'utf8');
    logBytes += Buffer.byteLength(line, 'utf8');
  }
  log('app-start', { electron: process.versions.electron, chrome: process.versions.chrome, node: process.versions.node,
    environment, platform: process.platform, arch: process.arch });
  let lastLoopT = now();
  const lagTimer = setInterval(() => {
    const t = now();
    const lagMs = t - lastLoopT - 200;
    lastLoopT = t;
    if (lagMs > 500) log('main-loop-lag', { lagMs });
  }, 200);
  lagTimer.unref();

  let window;
  let client;
  let currentLoadId;
  let loadStartT = 0;
  let resourceStats = { count: 0, totalMs: 0, maxMs: 0 };
  let quitting = false;
  const openDialogs = new Set();
  const forwarded = new Map();
  const reply = message => {
    if (message.type !== 'progress' && typeof message.ok === 'boolean') {
      const request = forwarded.get(message.id);
      if (request) {
        forwarded.delete(message.id);
        log('request-done', { operation: request.operation, elapsedMs: now() - request.startedT, ok: message.ok });
      }
    }
    if (window && !window.isDestroyed() && !window.webContents.isDestroyed())
      window.webContents.send('bridge:response', message);
  };
  function summarizeResources() {
    log('resource-summary', { ...resourceStats });
  }
  function fileNameForLog(source) {
    try { return path.basename(new URL(source).pathname); }
    catch { return path.basename(String(source).split(/[?#]/, 1)[0]); }
  }
  function loadDocument(reason) {
    if (!window || window.isDestroyed()) return;
    currentLoadId = newLoadId();
    const target = buildDocumentUrl(reason === 'initial' ? '' : window.webContents.getURL(), currentLoadId);
    loadStartT = now();
    resourceStats = { count: 0, totalMs: 0, maxMs: 0 };
    log('load-start', { reason });
    window.loadURL(target).catch(error => log('load-error', { error: error.name }));
  }
  function reload() {
    log('reload-requested');
    loadDocument('reload');
  }
  function guardNavigation(event) {
    let allowed = false;
    try {
      const url = new URL(event.url);
      allowed = url.protocol === 'pa:' && url.host === PROTOCOL_HOST && url.pathname === INDEX_PATH;
    } catch {}
    if (!allowed) {
      event.preventDefault();
      log('navigation-rejected');
    }
  }
  async function pick(request) {
    const { id, operation } = request;
    if (openDialogs.has(operation)) {
      reply({ id, ok: false, error: '选择对话框已打开，请先完成。' });
      return;
    }
    openDialogs.add(operation);
    const started = Date.now();
    try {
      const options = operation === 'plan.pickFolder'
        ? { title: '选择挂网计划目录', properties: ['openDirectory'] }
        : { title: '选择生产会资料 Excel', properties: ['openFile'], filters: [{ name: 'Excel 工作簿', extensions: ['xlsx', 'xlsm', 'xls'] }] };
      log('dialog-open', { operation });
      const result = await dialog.showOpenDialog(window, options);
      reply({ id, ok: true, data: { path: result.canceled ? null : result.filePaths[0] ?? null } });
      log('dialog-finished', { operation, elapsedMs: Date.now() - started, canceled: result.canceled });
    } catch (error) {
      reply({ id, ok: false, error: '选择对话框失败。' });
      log('dialog-failed', { operation, error: error.name });
    } finally {
      openDialogs.delete(operation);
    }
  }

  app.on('second-instance', () => {
    if (!window || window.isDestroyed()) return;
    if (window.isMinimized()) window.restore();
    window.focus();
  });
  app.on('window-all-closed', () => app.quit());
  app.on('child-process-gone', (_event, details) => log('child-process-gone', {
    type: details.type, reason: details.reason, exitCode: details.exitCode,
  }));
  app.on('before-quit', event => {
    if (quitting) return;
    quitting = true;
    event.preventDefault();
    Promise.resolve(client?.shutdown()).then(() => app.exit(0));
  });

  app.whenReady().then(() => {
    log('app-ready');
    try { log('gpu-status', { features: app.getGPUFeatureStatus() }); }
    catch (error) { log('gpu-status', { error: error.name }); }
    const distRoot = resolveDistRoot(__dirname, process.env);
    if (!fs.existsSync(distRoot) || !fs.statSync(distRoot).isDirectory()) {
      dialog.showErrorBox('前端资源缺失', '请先运行 verify.ps1 生成前端资源。');
      app.exit(4);
      return;
    }
    const executable = resolveSidecarPath(__dirname, process.env);
    if (!fs.existsSync(executable) || !fs.statSync(executable).isFile()) {
      dialog.showErrorBox('能力进程缺失', '请先运行 verify.ps1 生成无窗口进程。');
      app.exit(3);
      return;
    }
    client = new SidecarClient({
      executable, environment, env: { ...process.env }, onMessage: reply,
      onFirstOutput: () => log('sidecar-first-output'),
      onDiagnostic: diagnostic => {
        if (diagnostic.kind === 'mark') log('sidecar-mark', {
          phase: diagnostic.phase, operation: diagnostic.operation, durationMs: diagnostic.durationMs,
        });
        else log('sidecar-stderr-other', { length: diagnostic.length });
      },
      onExit: ({ code, signal, error }) => {
        forwarded.clear();
        log('sidecar-exit', { code, signal, error: error?.name });
      },
    });
    log('sidecar-spawn', { pid: client.child.pid ?? null });
    protocol.handle('pa', async request => {
      const startedT = now();
      const stats = resourceStats;
      let file = '';
      const respond = (status, body, type = 'text/plain; charset=utf-8') => new Response(
        request.method === 'HEAD' ? null : body,
        { status, headers: { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' } },
      );
      try {
        const url = new URL(request.url);
        file = fileNameForLog(url.href);
        if (url.host !== PROTOCOL_HOST) return respond(403, 'Forbidden');
        if (!['GET', 'HEAD'].includes(request.method)) return respond(405, 'Method not allowed');
        const result = await resolveFile(distRoot, url.pathname);
        if (result.status !== 200) return respond(result.status, result.message);
        return respond(200, request.method === 'HEAD' ? null : await fs.promises.readFile(result.file), result.type);
      } catch (error) {
        log('resource-failed', { error: error.name });
        return respond(500, 'Internal error');
      } finally {
        const ms = now() - startedT;
        stats.count++;
        stats.totalMs += ms;
        stats.maxMs = Math.max(stats.maxMs, ms);
        if (ms > 200) log('resource-slow', { file, ms });
      }
    });
    window = new BrowserWindow({
      width: 1400, height: 860, minWidth: 960, minHeight: 600, title: '生产助手',
      webPreferences: {
        contextIsolation: true, sandbox: true, nodeIntegration: false, webSecurity: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    log('window-created');
    window.on('unresponsive', () => log('window-unresponsive'));
    window.on('responsive', () => log('window-responsive'));
    const contents = window.webContents;
    contents.on('did-start-loading', () => log('did-start-loading'));
    contents.on('dom-ready', () => log('dom-ready'));
    contents.on('did-finish-load', () => {
      log('did-finish-load', { sinceLoadMs: now() - loadStartT });
      summarizeResources();
    });
    contents.on('unresponsive', () => log('webcontents-unresponsive'));
    contents.on('responsive', () => log('webcontents-responsive'));
    contents.on('console-message', details => {
      if (![2, 3, 'warning', 'error'].includes(details.level)) return;
      log('console-message', { level: details.level, message: '<已省略>',
        sourceId: fileNameForLog(details.sourceId), lineNumber: details.lineNumber });
    });
    contents.on('will-navigate', guardNavigation);
    contents.on('will-redirect', guardNavigation);
    contents.setWindowOpenHandler(() => ({ action: 'deny' }));
    contents.on('will-attach-webview', event => event.preventDefault());
    contents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
    contents.session.setPermissionCheckHandler(() => false);
    contents.on('did-fail-load', (_event, errorCode, _description, _url, isMainFrame) => log('did-fail-load', { errorCode, isMainFrame }));
    contents.on('render-process-gone', (_event, details) => log('render-process-gone', { reason: details.reason, exitCode: details.exitCode }));
    const onBridgeMessage = (event, message) => {
      if (!window || window.isDestroyed() || contents.isDestroyed()) return;
      const sender = checkSender(event, { webContents: contents, url: documentUrl });
      if (!sender.ok) { log('ipc-rejected', { reason: sender.reason }); return; }
      const request = classify(message);
      if (request.kind === 'invalid') {
        log('request-invalid', { reason: request.reason });
        if (request.id) reply({ id: request.id, ok: false, error: '无效的界面请求。' });
      } else if (request.kind === 'theme') {
        nativeTheme.themeSource = request.theme;
      } else if (request.kind === 'ready') {
        if (isCurrentLoad(request.loadId, currentLoadId)) {
          log('react-ready', { moduleEntryMs: request.moduleEntryMs, readyMs: request.readyMs, sinceLoadMs: now() - loadStartT });
          summarizeResources();
        }
        else log('ready-ignored');
      } else if (request.kind === 'local') {
        void pick(request);
      } else {
        const operation = /^[A-Za-z0-9.]+$/.test(message.operation) ? message.operation : '<已省略>';
        forwarded.set(request.id, { operation, startedT: now() });
        log('request-forward', { operation });
        if (!client.send(request)) reply({ id: request.id, ok: false, error: '能力进程不可用，请重启应用。' });
      }
    };
    ipcMain.on('bridge:message', onBridgeMessage);
    const viewMenu = [
      { label: '重新加载', accelerator: 'F5', click: reload },
      { label: '重新加载', accelerator: 'CmdOrCtrl+R', visible: false, acceleratorWorksWhenHidden: true, click: reload },
    ];
    if (environment !== 'Production') viewMenu.push({ label: '开发者工具', role: 'toggleDevTools' });
    Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: '视图', submenu: viewMenu }]));
    window.on('closed', () => {
      ipcMain.removeListener('bridge:message', onBridgeMessage);
      window = null;
    });
    loadDocument('initial');
  }).catch(error => {
    log('startup-failed', { error: error.name });
    dialog.showErrorBox('启动失败', '桌面外壳启动失败，请检查应用日志。');
    app.quit();
  });
}

start();
