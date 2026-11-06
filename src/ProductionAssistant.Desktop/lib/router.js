'use strict';

const { randomUUID } = require('node:crypto');

const LOCAL_OPERATIONS = new Set(['plan.pickFolder', 'meeting.pickFile']);
const MAX_ID_LENGTH = 200;
const MAX_OPERATION_LENGTH = 100;
const MAX_MESSAGE_CHARS = 4194304;

function newLoadId() {
  return randomUUID().replaceAll('-', '');
}

function isCurrentLoad(loadId, expected) {
  return typeof loadId === 'string' && loadId.trim().length > 0 && loadId === expected;
}

function buildDocumentUrl(currentUrl, loadId) {
  if (typeof loadId !== 'string' || /^\p{White_Space}*$/u.test(loadId)) throw new Error('loadId 不能为空或空白');
  const base = 'pa://app/index.html';
  const replacement = 'loadId=' + encodeURIComponent(loadId);
  let trusted = false;
  try {
    const url = new URL(currentUrl);
    trusted = typeof currentUrl === 'string' && url.protocol === 'pa:' && url.host === 'app' && url.pathname === '/index.html';
  } catch {}
  if (!trusted) return base + '?' + replacement;
  const source = currentUrl.split('#', 1)[0];
  const queryIndex = source.indexOf('?');
  const query = queryIndex >= 0 ? source.slice(queryIndex + 1) : '';
  const parts = [];
  let replaced = false;
  for (const part of query.split('&').filter(Boolean)) {
    const equalsIndex = part.indexOf('=');
    let key = equalsIndex >= 0 ? part.slice(0, equalsIndex) : part;
    try { key = decodeURIComponent(key); } catch {}
    if (key === 'loadId') {
      if (!replaced) {
        parts.push(replacement);
        replaced = true;
      }
    } else parts.push(part);
  }
  if (!replaced) parts.push(replacement);
  return base + '?' + parts.join('&');
}

function classify(message) {
  const validId = typeof message?.id === 'string' && message.id.trim().length > 0 && message.id.length <= MAX_ID_LENGTH;
  const invalid = reason => ({ kind: 'invalid', reason, ...(validId ? { id: message.id } : {}) });
  if (!message || typeof message !== 'object' || Array.isArray(message)) return invalid('not-object');
  try {
    if (JSON.stringify(message).length > MAX_MESSAGE_CHARS) return invalid('message-too-large');
  } catch {
    return invalid('not-serializable');
  }
  if (message.type === 'app.theme') {
    if (!['light', 'dark', 'system'].includes(message.theme)) return invalid('invalid-theme');
    return { kind: 'theme', theme: message.theme };
  }
  if (message.type === 'app.ready') {
    return {
      kind: 'ready',
      route: typeof message.route === 'string' ? message.route : '',
      loadId: typeof message.loadId === 'string' ? message.loadId : '',
      moduleEntryMs: Number.isFinite(message.moduleEntryMs) ? message.moduleEntryMs : 0,
      readyMs: Number.isFinite(message.readyMs) ? message.readyMs : 0,
    };
  }
  if (!validId) return invalid('invalid-id');
  const { id, operation, payload } = message;
  if (typeof operation !== 'string' || operation.length === 0 || operation.length > MAX_OPERATION_LENGTH)
    return invalid('invalid-operation');
  if (LOCAL_OPERATIONS.has(operation)) return { kind: 'local', id, operation, payload };
  try {
    return { kind: 'forward', id, line: JSON.stringify({ id, operation, payload }) };
  } catch {
    return invalid('not-serializable');
  }
}

module.exports = { LOCAL_OPERATIONS, MAX_ID_LENGTH, MAX_OPERATION_LENGTH, MAX_MESSAGE_CHARS, newLoadId, isCurrentLoad, buildDocumentUrl, classify };
