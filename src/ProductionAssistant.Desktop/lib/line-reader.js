'use strict';

const { StringDecoder } = require('node:string_decoder');

function createLineReader(onLine) {
  const decoder = new StringDecoder('utf8');
  let pending = '';
  let ended = false;
  function emit(line) {
    const value = line.endsWith('\r') ? line.slice(0, -1) : line;
    if (value) onLine(value);
  }
  return {
    write(chunk) {
      if (ended) return;
      pending += decoder.write(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, 'utf8'));
      let index;
      while ((index = pending.indexOf('\n')) !== -1) {
        emit(pending.slice(0, index));
        pending = pending.slice(index + 1);
      }
    },
    end() {
      if (ended) return;
      ended = true;
      pending += decoder.end();
      emit(pending);
      pending = '';
    },
  };
}

module.exports = { createLineReader };
