'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Execute the real main entry and IPC handler with inert Electron/Sidecar objects.
// This checks wiring and security, not native Windows painting.
async function fixture(environment = 'Development') {
  const ipcMain = new EventEmitter();
  const loaded = [], overlays = [], menuVisibility = [];
  let menu;
  const app = Object.assign(new EventEmitter(), {
    setPath() {}, requestSingleInstanceLock: () => true, whenReady: () => Promise.resolve(),
    getGPUFeatureStatus: () => ({}), quit() {}, exit() {},
  });
  const contents = Object.assign(new EventEmitter(), {
    destroyed: false, isDestroyed() { return this.destroyed; },
    mainFrame: { url: 'pa://app/index.html?loadId=current' },
    session: { setPermissionRequestHandler() {}, setPermissionCheckHandler() {} },
    send() {}, setWindowOpenHandler() {}, getURL: () => loaded.at(-1),
  });
  const window = Object.assign(new EventEmitter(), {
    webContents: contents, destroyed: false, isDestroyed() { return this.destroyed; },
    loadURL: url => { loaded.push(url); return Promise.resolve(); },
    setTitleBarOverlay: value => overlays.push(JSON.parse(JSON.stringify(value))),
    setMenuBarVisibility: value => menuVisibility.push(value),
  });
  let themeSource = 'system', systemDark = false;
  const nativeTheme = new EventEmitter();
  Object.defineProperties(nativeTheme, {
    themeSource: {
      get: () => themeSource,
      set(value) { themeSource = value; nativeTheme.emit('updated'); },
    },
    shouldUseDarkColors: { get: () => themeSource === 'dark' || themeSource === 'system' && systemDark },
  });
  const setSystemDark = value => { systemDark = value; nativeTheme.emit('updated'); };
  const forwarded = [], errors = [];
  let options;
  const electron = {
    app, ipcMain, nativeTheme,
    BrowserWindow: function (value) { options = value; return window; },
    dialog: { showErrorBox: (...args) => errors.push(args) },
    Menu: { buildFromTemplate: value => value, setApplicationMenu(value) { menu = value; } },
    protocol: { registerSchemesAsPrivileged() {}, handle() {} },
  };
  const desktopRoot = path.join(__dirname, '..');
  vm.runInNewContext(fs.readFileSync(path.join(desktopRoot, 'main.js'), 'utf8'), {
    __dirname: desktopRoot, URL, Response, Buffer,
    process: { argv: [], env: {}, versions: {}, platform: 'win32', arch: 'x64', uptime: () => 0 },
    setInterval: () => ({ unref() {} }),
    require(name) {
      if (name === 'electron') return electron;
      if (name === 'node:fs') return {
        mkdirSync() {}, appendFileSync() {}, existsSync: () => true,
        statSync: () => ({ size: 0, isDirectory: () => true, isFile: () => true }),
      };
      if (name === './lib/environment') return {
        parseEnvironment: () => environment, resolveUserDataDir: () => 'fixture',
        resolveDistRoot: () => 'fixture', resolveSidecarPath: () => 'fixture',
      };
      if (name === './lib/sidecar-client') return { SidecarClient: class {
        child = { pid: 1 };
        send(request) { forwarded.push(request); return true; }
      } };
      return require(name.startsWith('.') ? path.join(desktopRoot, name) : name);
    },
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(errors, []);
  assert.ok(options);
  const event = { sender: contents, senderFrame: contents.mainFrame };
  const send = (message, source = event) => ipcMain.emit('bridge:message', source, message);
  return { ipcMain, contents, window, nativeTheme, forwarded, options, event, send, loaded, overlays, menu, menuVisibility, setSystemDark };
}

test('main applies all theme choices without forwarding them and preserves business routing', async () => {
  const f = await fixture();
  for (const theme of ['light', 'dark', 'light', 'system']) {
    f.send({ type: 'app.theme', theme });
    assert.equal(f.nativeTheme.themeSource, theme);
  }
  assert.equal(f.forwarded.length, 0);
  f.send({ id: 'business', operation: 'database.getState', payload: { source: 'fixture' } });
  assert.equal(f.forwarded.length, 1);
  assert.deepEqual(JSON.parse(f.forwarded[0].line), { id: 'business', operation: 'database.getState', payload: { source: 'fixture' } });
});

test('main rejects invalid theme messages without changing nativeTheme or forwarding to Sidecar', async () => {
  const f = await fixture();
  for (const theme of [null, undefined, '', 'DARK', ' dark ', 1, true, [], {}, 1n])
    assert.doesNotThrow(() => f.send({ type: 'app.theme', theme, id: 'invalid', operation: 'settings.open' }));
  assert.equal(f.nativeTheme.themeSource, 'system');
  assert.equal(f.forwarded.length, 0);
});

test('theme messages require this window, its live top frame and the exact trusted page', async () => {
  const f = await fixture();
  const message = { type: 'app.theme', theme: 'dark' };
  for (const source of [
    { ...f.event, senderFrame: null }, { ...f.event, sender: {} },
    { ...f.event, senderFrame: { url: f.contents.mainFrame.url } },
  ]) f.send(message, source);
  for (const url of ['https://app/index.html', 'pa://other/index.html', 'pa://app/other.html', 'pa://app:42/index.html', 'invalid']) {
    f.contents.mainFrame.url = url;
    f.send(message);
  }
  assert.equal(f.nativeTheme.themeSource, 'system');
  assert.equal(f.forwarded.length, 0);
  f.contents.mainFrame.url = 'pa://app/index.html?loadId=refreshed';
  f.send(message);
  assert.equal(f.nativeTheme.themeSource, 'dark');
});

test('main ignores destroyed windows or contents and removes its IPC handler on close', async () => {
  const f = await fixture();
  const handler = f.ipcMain.listeners('bridge:message')[0];
  f.window.destroyed = true;
  f.send({ type: 'app.theme', theme: 'dark' });
  f.window.destroyed = false;
  f.contents.destroyed = true;
  f.send({ type: 'app.theme', theme: 'dark' });
  f.window.emit('closed');
  assert.equal(f.ipcMain.listenerCount('bridge:message'), 0);
  assert.equal(f.nativeTheme.listenerCount('updated'), 0);
  assert.doesNotThrow(() => handler(f.event, { type: 'app.theme', theme: 'dark' }));
  assert.equal(f.nativeTheme.themeSource, 'system');
});

test('window enables official native controls overlay with immediate display and unchanged security', async () => {
  const { options } = await fixture();
  for (const key of ['frame', 'show']) assert.equal(options[key], undefined);
  assert.equal(options.titleBarStyle, 'hidden');
  assert.deepEqual(JSON.parse(JSON.stringify(options.titleBarOverlay)), { color: '#ffffff', symbolColor: '#020618', height: 32 });
  assert.equal(options.backgroundColor, '#ffffff');
  assert.equal(options.autoHideMenuBar, true);
  assert.equal(options.webPreferences.contextIsolation, true);
  assert.equal(options.webPreferences.sandbox, true);
  assert.equal(options.webPreferences.nodeIntegration, false);
  assert.equal(options.webPreferences.webSecurity, true);
});

test('overlay uses the same palette for explicit dark and system dark and follows system changes', async () => {
  const f = await fixture();
  f.send({ type: 'app.theme', theme: 'dark' });
  const dark = f.overlays.at(-1);
  assert.deepEqual(dark, { color: '#020618', symbolColor: '#f8fafc' });
  f.setSystemDark(true);
  f.send({ type: 'app.theme', theme: 'system' });
  assert.equal(f.nativeTheme.themeSource, 'system');
  assert.deepEqual(f.overlays.at(-1), dark);
  f.setSystemDark(false);
  assert.deepEqual(f.overlays.at(-1), { color: '#ffffff', symbolColor: '#020618' });
  f.send({ type: 'app.theme', theme: 'light' });
  f.setSystemDark(true);
  assert.deepEqual(f.overlays.at(-1), { color: '#ffffff', symbolColor: '#020618' });
  const count = f.overlays.length;
  f.window.destroyed = true;
  f.setSystemDark(false);
  assert.equal(f.overlays.length, count);
});

test('hidden menu retains both reload accelerators and the development debugging shortcut', async () => {
  const f = await fixture();
  assert.deepEqual(f.menuVisibility, [false]);
  const items = f.menu[0].submenu;
  assert.equal(items[0].accelerator, 'F5');
  assert.equal(items[1].accelerator, 'CmdOrCtrl+R');
  assert.equal(items[1].acceleratorWorksWhenHidden, true);
  assert.equal(items[2].role, 'toggleDevTools');
  assert.equal(items[2].accelerator, 'CmdOrCtrl+Shift+I');
  const first = f.loaded[0];
  items[0].click();
  items[1].click();
  assert.equal(f.loaded.length, 3);
  assert.notEqual(f.loaded[1], first);
  assert.notEqual(f.loaded[2], f.loaded[1]);
  const production = await fixture('Production');
  assert.equal(production.menu[0].submenu.length, 2);
  assert.deepEqual(production.menuVisibility, [false]);
});
