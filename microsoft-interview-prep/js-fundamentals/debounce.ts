// LeetCode 2627: Debounce (their "Medium" — see talking points below)
//
// Given a function `fn` and a time in milliseconds `t`, return a DEBOUNCED
// version of that function: execution is delayed by `t` ms and CANCELLED if
// the debounced function is called again within that window. Rapid repeated
// calls keep pushing the timer back; only the final call in a burst actually
// fires, with that call's arguments. (No lodash _.debounce allowed.)
//
// Classic use case: don't fire an API search request on every keystroke —
// wait until the user stops typing.
//
// Things interviewers probe on:
//   - Each new call must CANCEL the previously scheduled one (clearTimeout).
//   - The last call's arguments are the ones that win.
//   - Stretch 1: preserve `this` (use a regular function + fn.apply, not an
//     arrow, for the returned function).
//   - Stretch 2: add a .cancel() method to the returned function.
//   - Talking point: how is this different from throttle?

import { check, sleep, makeRecorder } from './helpers.ts';

type AnyFn = (...args: any[]) => void;

export function debounce(fn: AnyFn, t: number): AnyFn {
  /* One pending timer, shared by every call — each new call cancels and replaces it.
   * Lives in this closure's heap-allocated environment record, so it survives between calls. */
  let pendingTimerId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: any[]) {
    clearTimeout(pendingTimerId);

    pendingTimerId = setTimeout(() => {
      pendingTimerId = undefined; // the ticket is spent — let the Timeout object go in the heap free it up.
      fn(...args);
    }, t);
  };
}

// ---- tests ----
// These use real timers, so the file takes ~1 second to run.

const main = async () => {
  // A burst of calls should collapse into ONE call, with the last args.
  const spy1 = makeRecorder();
  const debounced1 = debounce(spy1.fn, 50);
  debounced1('a');
  debounced1('b');
  debounced1('c');
  check('no call before wait elapses', spy1.callCount(), 0);

  await sleep(80);

  check('burst collapses to one call', spy1.callCount(), 1);
  check('last args win', spy1.lastArgs(), ['c']);

  // Calls spaced wider than `wait` should each fire.
  const spy2 = makeRecorder();
  const debounced2 = debounce(spy2.fn, 30);
  debounced2(1);
  await sleep(60);
  debounced2(2);
  await sleep(60);
  check('spaced calls both fire', spy2.calls, [[1], [2]]);

  // A call mid-wait resets the timer (this is the debounce-vs-throttle core).
  const spy3 = makeRecorder();
  const debounced3 = debounce(spy3.fn, 60);
  debounced3('x');
  await sleep(40); // timer at 40/60 — not fired yet
  debounced3('y'); // resets the clock
  await sleep(40); // 40ms since LAST call — still should not have fired
  check('mid-wait call resets the timer', spy3.callCount(), 0);
  await sleep(40);
  check('fires once after the reset wait', spy3.calls, [['y']]);
};

main();