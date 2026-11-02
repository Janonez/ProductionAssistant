'use strict';

if (process.env.PA_FAKE_SIDECAR === '1') {
  const readline = require('node:readline');
  const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  const write = message => process.stdout.write(JSON.stringify(message) + '\n');
  process.on('message', message => { if (message === 'exit') process.exit(0); });
  input.on('line', line => {
    const request = JSON.parse(line);
    if (request.operation === 'exit.now') { process.exit(7); return; }
    if (request.operation === 'hang') return;
    if (request.operation === 'progress.demo') {
      write({ id: request.id, type: 'progress', data: { current: 1 } });
      write({ id: request.id, type: 'progress', data: { current: 2 } });
    }
    if (request.operation === 'noise.demo') {
      process.stdout.write('{invalid\n');
      write({ ignored: true });
      write({ id: 'unknown', ok: true });
      write({ id: request.id, ignored: true });
      process.stderr.write('x'.repeat(2100) + '\n');
    }
    write({ id: request.id, ok: true, data: request.payload ?? null });
  });
  input.on('close', () => {
    if (process.env.PA_FAKE_MODE !== 'keep-after-eof') process.exit(0);
  });
  process.stderr.write('fixture-ready\n');
}
