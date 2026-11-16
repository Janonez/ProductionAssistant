'use strict';

const { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme, protocol } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { parseEnvironment, resolveSidecarPath, resolveDistRoot, resolveUserDataDir } = require('./lib/environment');
const { newLoadId, isCurrentLoad, buildDocumentUrl, classify } = require('./lib/router');
const { checkSender } = require('./lib/sender-check');
const { resolveFile } = require('./lib/file-resolver');
const { SidecarClient } = require('./lib/sidecar-client');
const { resolveRendererBuild, compareInstanceBuild } = require('./lib/renderer-build');

const PROTOCOL_HOST = 'app';
const INDEX_PATH = '/index.html';
const documentUrl = `pa://${PROTOCOL_HOST}${INDEX_PATH}`;

function start() {
  const startupId = randomUUID();
  let environment;
  let userData;
  let renderer;
  try {
    environment = parseEnvironment(process.argv, process.env);
    userData = resolveUserDataDir(process.env, environment);
    renderer = resolveRendererBuild(resolveDistRoot(__dirname, process.env));
  } catch (error) {
    dialog.showErrorBox('启动失败', error.message);
    app.exit(2);
    return;
  }
  fs.mkdirSync(userData, { recursive: true });
  app.setPath('userData', userData);
  app.setPath('sessionData', userData);
  const identityFile = path.join(userData, 'instance-identity.json');
  if (!app.requestSingleInstanceLock({ buildId: renderer.buildId, startupId, pid: process.pid })) {
    // Pre-migration main processes cannot understand second-instance Build IDs.
    // A missing/invalid identity must not silently focus a window and imply it is current.
    let versionAware = false;
    try {
      const identity = JSON.parse(fs.readFileSync(identityFile, 'utf8'));
      if (identity.identityVersion === 1 && Number.isInteger(identity.pid)) {
        process.kill(identity.pid, 0);
        versionAware = true;
      }
    } catch {}
    if (!versionAware) dialog.showErrorBox('已有应用窗口正在运行', '已有窗口无法确认构建版本。请保存工作并正常关闭旧窗口，再次运行启动命令；本次没有加载新构建。');
    app.quit();
    return;
  }
  fs.writeFileSync(identityFile, JSON.stringify({ identityVersion: 1, startupId, buildId: renderer.buildId, pid: process.pid }));
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
    const line = JSON.stringify({ timestamp: new Date().toISOString(), t: now(), event, startupId, electronPid: process.pid, environment, ...details }) + '\n';
    fs.appendFileSync(logFile, line, 'utf8');
    logBytes += Buffer.byteLength(line, 'utf8');
  }
  log('app-start', { electron: process.versions.electron, chrome: process.versions.chrome, node: process.versions.node,
    environment, platform: process.platform, arch: process.arch, buildId: renderer.buildId,
    resourceSource: process.env.PRODUCTIONASSISTANT_DIST ? 'explicit-override' : 'source-build' });
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
  let rendererVerified = false;
  const openDialogs = new Set();
  const forwarded = new Map();
  const reply = message => {
    if (message.type !== 'progress' && typeof message.ok === 'boolean') {
      const request = forwarded.get(message.id);
      if (request) {
        forwarded.delete(message.id);
        log('request-done', { requestId: message.id, operation: request.operation, elapsedMs: now() - request.startedT, ok: message.ok, errorCode: message.errorCode });
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
    rendererVerified = false;
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
    const started = now();
    try {
      const options = operation === 'plan.pickFolder'
        ? { title: '选择挂网计划目录', properties: ['openDirectory'] }
        : { title: '选择生产会资料 Excel', properties: ['openFile'], filters: [{ name: 'Excel 工作簿', extensions: ['xlsx', 'xlsm', 'xls'] }] };
      log('dialog-open', { operation });
      const result = await dialog.showOpenDialog(window, options);
      reply({ id, ok: true, data: { path: result.canceled ? null : result.filePaths[0] ?? null } });
      log('dialog-finished', { operation, elapsedMs: now() - started, canceled: result.canceled });
    } catch (error) {
      reply({ id, ok: false, error: '选择对话框失败。' });
      log('dialog-failed', { operation, error: error.name });
    } finally {
      openDialogs.delete(operation);
    }
  }

  let versionPromptOpen = false;
  app.on('second-instance', (_event, _argv, _cwd, candidate) => {
    if (!window || window.isDestroyed()) return;
    if (window.isMinimized()) window.restore();
    window.focus();
    const comparison = compareInstanceBuild(renderer.buildId, candidate);
    log('second-instance', { comparison });
    if (comparison === 'different' && !versionPromptOpen) {
      versionPromptOpen = true;
      void dialog.showMessageBox(window, { type: 'info', title: '检测到新构建',
        message: '当前窗口仍运行旧构建。保存工作并关闭当前应用后，请重新执行启动命令以加载新构建。',
        detail: `当前构建：${renderer.buildId}`, buttons: ['继续使用当前窗口', '关闭当前应用'], defaultId: 0, cancelId: 0,
      }).then(result => { if (result.response === 1) app.quit(); }).finally(() => { versionPromptOpen = false; });
    }
  });
  app.on('window-all-closed', () => app.quit());
  app.on('child-process-gone', (_event, details) => log('child-process-gone', {
    type: details.type, reason: details.reason, exitCode: details.exitCode,
  }));
  app.on('before-quit', event => {
    if (quitting) return;
    quitting = true;
    event.preventDefault();
    Promise.resolve(client?.shutdown()).then(() => {
      try {
        if (JSON.parse(fs.readFileSync(identityFile, 'utf8')).startupId === startupId) fs.unlinkSync(identityFile);
      } catch (error) { if (error.code !== 'ENOENT') log('instance-identity-cleanup-failed', { error: error.name }); }
      app.exit(0);
    }, error => {
      log('sidecar-shutdown-failed', { errorCode: error.code || 'SIDECAR_SHUTDOWN_FAILED' });
      app.exit(1);
    });
  });

  app.whenReady().then(() => {
    log('app-ready');
    try { log('gpu-status', { features: app.getGPUFeatureStatus() }); }
    catch (error) { log('gpu-status', { error: error.name }); }
    // Fixed for this process lifetime, including reloads and dynamic chunks.
    const distRoot = renderer.root;
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
      executable, environment, env: { ...process.env, METIS_STARTUP_ID: startupId }, onMessage: reply,
      onState: state => {
        log(state.state === 'Ready' ? 'sidecar-ready' : 'sidecar-state', { state: state.state, phase: state.phase, sidecarPid: state.pid, errorCode: state.errorCode });
        reply({ type: 'service.state', data: state });
      },
      onFirstOutput: () => log('sidecar-first-output'),
      onDiagnostic: diagnostic => {
        if (diagnostic.kind === 'mark') log('sidecar-mark', {
          phase: diagnostic.phase, operation: diagnostic.operation, durationMs: diagnostic.durationMs,
        });
        else if (diagnostic.kind === 'startup') log('sidecar-phase', { phase: diagnostic.phase, status: diagnostic.status, elapsedMs: diagnostic.elapsedMs });
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
    // sRGB equivalents of shadcn-theme.css --background / --foreground tokens.
    const titleBarColors = () => nativeTheme.shouldUseDarkColors
      ? { color: '#020618', symbolColor: '#f8fafc' }
      : { color: '#ffffff', symbolColor: '#020618' };
    window = new BrowserWindow({
      width: 1400, height: 860, minWidth: 960, minHeight: 600, title: '生产助手',
      titleBarStyle: 'hidden',
      titleBarOverlay: { ...titleBarColors(), height: 32 },
      backgroundColor: titleBarColors().color,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true, sandbox: true, nodeIntegration: false, webSecurity: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    log('window-created');
    window.once('show', () => log('window-shown'));
    if (window.isVisible()) log('window-shown');
    window.on('unresponsive', () => log('window-unresponsive'));
    window.on('responsive', () => log('window-responsive'));
    const contents = window.webContents;
    const updateTitleBar = () => {
      if (window && !window.isDestroyed()) window.setTitleBarOverlay(titleBarColors());
    };
    nativeTheme.on('updated', updateTitleBar);
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
      } else if (request.kind === 'service-status') {
        reply({ type: 'service.state', data: client.snapshot });
      } else if (request.kind === 'restart') {
        void dialog.showMessageBox(window, { type: 'question', title: '重新启动应用', message: '重新启动将关闭当前窗口，请先保存正在编辑的内容。',
          buttons: ['取消', '重新启动'], defaultId: 0, cancelId: 0 }).then(result => {
          if (result.response === 1) { app.relaunch(); app.quit(); }
        });
      } else if (request.kind === 'ready') {
        if (isCurrentLoad(request.loadId, currentLoadId)) {
          if (message.buildId !== renderer.buildId) {
            rendererVerified = false;
            log('renderer-build-mismatch');
            dialog.showErrorBox('界面资源版本不匹配', '当前界面未获得业务访问权限。请运行完整 verify.ps1 后重新启动应用。');
            return;
          }
          rendererVerified = true;
          log('react-ready', { moduleEntryMs: request.moduleEntryMs, readyMs: request.readyMs, sinceLoadMs: now() - loadStartT });
          summarizeResources();
        }
        else log('ready-ignored');
      } else if (request.kind === 'local') {
        void pick(request);
      } else {
        if (!rendererVerified) {
          reply({ id: request.id, ok: false, error: '界面资源版本尚未确认，请重新加载。', errorCode: 'RENDERER_NOT_VERIFIED', retryable: true });
          return;
        }
        const operation = /^[A-Za-z0-9.]+$/.test(message.operation) ? message.operation : '<已省略>';
        forwarded.set(request.id, { operation, startedT: now() });
        log('request-forward', { requestId: request.id, operation });
        if (!client.send(request) && forwarded.has(request.id)) reply({ id: request.id, ok: false, error: '本地服务不可用，请重新启动应用。', errorCode: 'SIDECAR_UNAVAILABLE', state: client.snapshot.state, retryable: false });
      }
    };
    ipcMain.on('bridge:message', onBridgeMessage);
    const viewMenu = [
      { label: '重新加载', accelerator: 'F5', click: reload },
      { label: '重新加载', accelerator: 'CmdOrCtrl+R', visible: false, acceleratorWorksWhenHidden: true, click: reload },
    ];
    if (environment !== 'Production') viewMenu.push({ label: '开发者工具', role: 'toggleDevTools', accelerator: 'CmdOrCtrl+Shift+I' });
    Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: '视图', submenu: viewMenu }]));
    window.setMenuBarVisibility(false);
    window.on('closed', () => {
      ipcMain.removeListener('bridge:message', onBridgeMessage);
      nativeTheme.removeListener('updated', updateTitleBar);
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
