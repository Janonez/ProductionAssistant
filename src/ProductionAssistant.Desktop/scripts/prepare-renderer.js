'use strict';
const path = require('node:path');
const { publishRenderer } = require('../lib/renderer-build');
try {
  const result = publishRenderer(path.resolve(process.argv[2] || path.join(__dirname, '../../ProductionAssistant.App/Assets/Prototype/dist')), process.argv[3] ? path.resolve(process.argv[3]) : undefined);
  console.log(`Renderer ${result.buildId}: ${result.files} files published.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
