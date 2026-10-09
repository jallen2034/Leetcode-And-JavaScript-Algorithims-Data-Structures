// Shared helpers for the arrays & hashing problems in this folder.
//
//   import { check, freqMap } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

// "aab" → Map { 'a' => 2, 'b' => 1 } — works on strings or arrays
export const freqMap = <T>(items: Iterable<T>): Map<T, number> => {
  const counts = new Map<T, number>();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return counts;
};

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};