'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('paHost', {
  postMessage(message) {
    ipcRenderer.send('bridge:message', message);
  },
  addEventListener(name, callback) {
    if (name !== 'message' || typeof callback !== 'function') return;
    ipcRenderer.on('bridge:response', (_event, response) => callback({ data: response }));
  },
});
