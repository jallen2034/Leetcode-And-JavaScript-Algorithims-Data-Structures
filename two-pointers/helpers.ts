// Shared helpers for the two-pointer problems in this folder.
//
//   import { check } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};