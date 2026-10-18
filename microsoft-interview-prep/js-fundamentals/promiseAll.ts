// myPromiseAll (implement Promise.all from scratch)
//
// Write a function, myPromiseAll, that takes an array of values (promises or
// plain values) and returns a promise that:
//   - resolves with an array of all resolved values, IN THE ORIGINAL ORDER
//     (not completion order!), once every input has resolved
//   - rejects immediately with the first rejection reason, if any input rejects
//   - resolves with [] for an empty array
//
// Do not call Promise.all / Promise.allSettled. Promise.resolve on a single
// value is allowed (handy for normalizing plain values).
//
// Things interviewers probe on:
//   - Order preservation: store each result at its index, don't push.
//   - Completion counting: how do you know when ALL are done? (A counter —
//     checking `results.length` lies, because sparse arrays have length.)
//   - Plain (non-promise) values in the input must still work.
//   - Talking point: when would you reach for allSettled instead?

import { check, sleep } from './helpers.ts';

export function myPromiseAll<T>(items: (T | Promise<T>)[]): Promise<T[]> {
  // TODO: implement me
  //
  // Placeholder so the test file runs — replace this line entirely.
  return Promise.resolve([]);
}

// ---- tests ----

const delayed = <T>(value: T, ms: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const failAfter = (reason: string, ms: number): Promise<never> => {
  const p = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(reason)), ms)
  );
  // Pre-attach a no-op handler so an unimplemented myPromiseAll (which ignores
  // its inputs) doesn't crash the test run with an unhandled rejection.
  p.catch(() => {});
  return p;
};

const main = async () => {
  // Resolution order is scrambled on purpose — output order must match input.
  const result1 = await myPromiseAll([
    delayed('slow', 60),
    delayed('fast', 10),
    delayed('medium', 30),
  ]);
  check('preserves input order', result1, ['slow', 'fast', 'medium']);

  // Plain values mixed with promises.
  const result2 = await myPromiseAll([1, delayed(2, 20), 3]);
  check('handles non-promise values', result2, [1, 2, 3]);

  // Empty input.
  const result3 = await myPromiseAll([]);
  check('empty array resolves to []', result3, []);

  // First rejection wins, even if other promises are still pending.
  let caught = 'did not reject';
  try {
    await myPromiseAll([delayed('ok', 80), failAfter('boom', 20)]);
  } catch (err) {
    caught = (err as Error).message;
  }
  check('rejects with first error', caught, 'boom');

  // The rejection should arrive at ~20ms, not wait for the 80ms promise.
  const start = performance.now();
  try {
    await myPromiseAll([delayed('ok', 80), failAfter('fast fail', 20)]);
  } catch {
    // expected
  }
  const elapsed = performance.now() - start;
  check('rejects eagerly (before slow promises settle)', elapsed < 70, true);

  await sleep(100); // let stray timers finish so output isn't interleaved
};

main();
