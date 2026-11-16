'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createHash, randomUUID } = require('node:crypto');
const validBuildId = value => typeof value === 'string' && /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(value);
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

function fileManifest(root) {
  const files = [];
  function walk(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const name = prefix + entry.name;
      if (name === '.renderer-manifest.json') continue;
      if (entry.isSymbolicLink()) throw new Error('Renderer 构建不能包含符号链接');
      if (entry.isDirectory()) walk(path.join(directory, entry.name), name + '/');
      else if (entry.isFile()) {
        const bytes = fs.readFileSync(path.join(directory, entry.name));
        files.push({ name, size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
      } else throw new Error('Renderer 构建包含非普通文件');
    }
  }
  walk(root);
  return files;
}

function publishRenderer(distRoot, destinationDist = distRoot) {
  const buildId = readJson(path.join(distRoot, 'build-info.json')).buildId;
  if (!validBuildId(buildId)) throw new Error('无效的 Renderer Build ID');
  const files = fileManifest(distRoot);
  if (!files.some(file => file.name === 'index.html')) throw new Error('Renderer 入口缺失');
  const manifest = { buildId, files };
  const store = path.resolve(destinationDist) + '.builds';
  const target = path.join(store, buildId);
  fs.mkdirSync(store, { recursive: true });
  if (fs.existsSync(target)) {
    if (JSON.stringify(fileManifest(target)) !== JSON.stringify(files)) throw new Error('同一 Build ID 的内容不同，禁止覆盖不可变资源');
  } else {
    const staging = path.join(store, '.preparing-' + randomUUID());
    fs.mkdirSync(staging);
    try {
      for (const file of files) {
        const destination = path.join(staging, file.name);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(path.join(distRoot, file.name), destination);
      }
      if (JSON.stringify(fileManifest(staging)) !== JSON.stringify(files)) throw new Error('构建资源在发布期间发生变化，请重新构建');
      fs.writeFileSync(path.join(staging, '.renderer-manifest.json'), JSON.stringify(manifest));
      fs.renameSync(staging, target);
    } finally {
      // Only this invocation's UUID-named staging directory, never an old build.
      if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true });
    }
  }
  const pointer = path.join(store, '.current-' + randomUUID() + '.json');
  fs.writeFileSync(pointer, JSON.stringify({ buildId }), { flag: 'wx' });
  fs.renameSync(pointer, path.join(store, 'current.json'));
  return { buildId, root: target, files: files.length };
}

function resolveRendererBuild(distRoot) {
  try {
    const store = path.resolve(distRoot) + '.builds';
    const { buildId } = readJson(path.join(store, 'current.json'));
    if (!validBuildId(buildId)) throw new Error('invalid Build ID');
    const root = path.join(store, buildId);
    if (readJson(path.join(root, 'build-info.json')).buildId !== buildId || !fs.statSync(path.join(root, 'index.html')).isFile())
      throw new Error('incomplete build');
    return Object.freeze({ buildId, root });
  } catch {
    throw new Error('Electron 前端构建尚未准备完成，请运行前端 npm run build 或完整 verify.ps1。显式指定资源目录时，先运行 Desktop 的 prepare:renderer -- <资源目录>。');
  }
}

function compareInstanceBuild(buildId, candidate) {
  return validBuildId(candidate?.buildId) && candidate.buildId === buildId ? 'same' : 'different';
}

module.exports = { publishRenderer, resolveRendererBuild, compareInstanceBuild, fileManifest };
