'use strict';

function checkSender(event, expected) {
  const frame = event.senderFrame;
  if (frame == null) return { ok: false, reason: 'null-frame' };
  if (event.sender !== expected.webContents) return { ok: false, reason: 'wrong-contents' };
  if (frame !== expected.webContents.mainFrame) return { ok: false, reason: 'not-main-frame' };
  try {
    const page = new URL(frame.url);
    const target = new URL(expected.url);
    if (page.protocol !== 'pa:' || page.host !== 'app' || page.pathname !== '/index.html' ||
        page.protocol !== target.protocol || page.host !== target.host || page.pathname !== target.pathname)
      return { ok: false, reason: 'origin-mismatch' };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'origin-mismatch' };
  }
}

module.exports = { checkSender };
