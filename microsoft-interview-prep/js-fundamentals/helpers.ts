// Shared helpers for the interview-prep JS fundamentals exercises.
//
//   import { check, sleep, makeRecorder } from './helpers.ts';
//
// Run any exercise file directly: node <file>.ts

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};

/** Await this to let real time pass (for debounce/throttle tests). */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A tiny spy: returns a function that records every call's arguments.
 *
 *   const spy = makeRecorder();
 *   spy.fn('a'); spy.fn('b');
 *   spy.calls        // [['a'], ['b']]
 *   spy.callCount()  // 2
 */
export const makeRecorder = () => {
  const calls: unknown[][] = [];
  return {
    calls,
    fn: (...args: unknown[]) => {
      calls.push(args);
    },
    callCount: () => calls.length,
    lastArgs: () => calls[calls.length - 1],
  };
};