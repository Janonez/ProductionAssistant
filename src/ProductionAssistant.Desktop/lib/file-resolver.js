'use strict';

const fs = require('node:fs');
const path = require('node:path');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
};

function contentTypeFor(extension) {
  return types[extension.toLowerCase()] || 'application/octet-stream';
}

function isWithin(root, target) {
  const relative = path.relative(root, target);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

async function resolveFile(root, pathname) {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return { status: 400, message: 'Bad request' };
  let decoded;
  try { decoded = decodeURIComponent(pathname); }
  catch { return { status: 400, message: 'Bad request' }; }
  if (decoded.includes('\\') || decoded.includes('\0') || decoded.split('/').includes('..'))
    return { status: 403, message: 'Forbidden' };
  const target = path.resolve(root, '.' + decoded);
  if (!isWithin(path.resolve(root), target)) return { status: 403, message: 'Forbidden' };
  try {
    const realRoot = await fs.promises.realpath(root);
    const realTarget = await fs.promises.realpath(target);
    if (!isWithin(realRoot, realTarget)) return { status: 403, message: 'Forbidden' };
    if (!(await fs.promises.stat(realTarget)).isFile()) return { status: 404, message: 'Not found' };
    return { status: 200, file: realTarget, type: contentTypeFor(path.extname(realTarget)) };
  } catch (error) {
    return ['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)
      ? { status: 404, message: 'Not found' }
      : { status: 403, message: 'Forbidden' };
  }
}

module.exports = { contentTypeFor, resolveFile };
