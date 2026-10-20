// Shared helpers for the backtracking / combinatorial enumeration problems.
//
//   import { check, checkUnordered } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};

// For "return in any order" problems: compares two arrays as multisets by
// canonicalizing (stringify each element, sort). Order-insensitive, dupes count.
export const checkUnordered = (label: string, actual: unknown[], expected: unknown[]): void => {
  const canon = (arr: unknown[]) => arr.map((x) => JSON.stringify(x)).sort();
  const pass = JSON.stringify(canon(actual)) === JSON.stringify(canon(expected));
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}`);
};
