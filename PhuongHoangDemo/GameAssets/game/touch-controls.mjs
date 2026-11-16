// Older iOS WebKit can ignore manipulation for double-tap zoom (bug 319664).
// Never cancel touchstart/move: a second finger must always be able to pinch.
export function installTapZoomGuard(doc = document, nav = navigator) {
  const ios = /iP(?:hone|ad|od)/.test(nav.userAgent || '') ||
    (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1);
  if (!ios) return () => {};
  let gesture = null, previous = null;
  const reset = () => { gesture = previous = null; };
  const exempt = target => target?.closest?.(
    'input, textarea, select, label, [contenteditable]:not([contenteditable="false"]), canvas, .qin-stage, .tea-catch-board, .tea-catch-controls'
  );
  function start(e) {
    if (e.touches.length !== 1 || gesture) { reset(); return; }
    if (exempt(e.target)) { reset(); return; }
    const t = e.touches[0];
    gesture = { id: t.identifier, x: t.clientX, y: t.clientY, time: e.timeStamp };
  }
  function move(e) {
    if (!gesture) return;
    const t = e.touches[0];
    if (e.touches.length !== 1 || t.identifier !== gesture.id ||
        Math.hypot(t.clientX - gesture.x, t.clientY - gesture.y) > 10) reset();
  }
  function end(e) {
    const g = gesture;
    gesture = null;
    const t = e.changedTouches[0];
    if (!g || e.touches.length || e.changedTouches.length !== 1 ||
        t.identifier !== g.id || e.defaultPrevented || exempt(e.target) ||
        e.timeStamp - g.time > 300 ||
        Math.hypot(t.clientX - g.x, t.clientY - g.y) > 10) { previous = null; return; }
    const repeated = previous && e.timeStamp - previous.time <= 350 &&
      Math.hypot(t.clientX - previous.x, t.clientY - previous.y) <= 32;
    previous = { x: t.clientX, y: t.clientY, time: e.timeStamp };
    if (!repeated || !e.cancelable) return;
    e.preventDefault();
    // Cancelling touchend also suppresses its native click. Replace that click
    // once, only for a live enabled control; never redispatch touch/pointer events.
    const control = e.target?.closest?.('button, a[href], [role="button"], [data-action]');
    if (control && doc.contains(control) && !control.disabled &&
        control.getAttribute('aria-disabled') !== 'true') control.click();
  }
  const listeners = [['touchstart', start, { passive: true }],
    ['touchmove', move, { passive: true }], ['touchend', end, { passive: false }],
    ['touchcancel', reset, { passive: true }]];
  for (const [type, fn, options] of listeners) doc.addEventListener(type, fn, options);
  doc.addEventListener('visibilitychange', reset);
  return () => {
    for (const [type, fn, options] of listeners) doc.removeEventListener(type, fn, options);
    doc.removeEventListener('visibilitychange', reset);
    reset();
  };
}
