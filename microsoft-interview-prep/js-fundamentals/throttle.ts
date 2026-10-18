// throttle (debounce's sibling — know the difference cold)
//
// Write a function, throttle, that takes a function `fn` and an interval in
// milliseconds. The returned function calls `fn` AT MOST once per interval:
// the first call fires immediately (leading edge), and any further calls
// during the cooldown window are ignored. After the interval passes, the next
// call fires again.
//
// Classic use case: scroll/resize/mousemove handlers — you want regular
// updates WHILE the activity continues, not one update after it stops.
//
// Interview talking point — debounce vs throttle:
//   - debounce: fires once AFTER activity stops (search input).
//   - throttle: fires at a steady rate DURING activity (scroll position).
//
// Stretch: a trailing-edge option — remember the last ignored call's args and
// fire them when the cooldown ends.

import { check, sleep, makeRecorder } from './helpers.ts';

type AnyFn = (...args: any[]) => void;

export function throttle<T extends AnyFn>(fn: T, interval: number): T {
  // TODO: implement me
  //
  // Placeholder so the test file runs — replace this line entirely.
  return fn;
}

// ---- tests ----

const main = async () => {
  // First call fires immediately; calls during cooldown are dropped.
  const spy1 = makeRecorder();
  const throttled1 = throttle(spy1.fn, 60);
  throttled1('a');
  check('leading call fires immediately', spy1.calls, [['a']]);
  throttled1('b');
  throttled1('c');
  check('calls during cooldown are dropped', spy1.callCount(), 1);

  // After the interval, calls work again.
  await sleep(90);
  throttled1('d');
  check('fires again after cooldown', spy1.calls, [['a'], ['d']]);

  // A steady stream of calls fires at roughly interval rate.
  const spy2 = makeRecorder();
  const throttled2 = throttle(spy2.fn, 50);
  for (let i = 0; i < 10; i++) {
    throttled2(i);
    await sleep(20); // 10 calls over ~200ms, 50ms interval -> ~4 fires
  }
  const count = spy2.callCount();
  check('steady stream is rate-limited (3-5 fires)', count >= 3 && count <= 5, true);
};

main();