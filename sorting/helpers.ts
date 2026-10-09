// Shared helpers for the sorting algorithm files in this folder.
//
//   import { check, isSorted, randomArray } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

// true if the array is in non-decreasing order
export const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

// n random integers in [min, max] — handy for fuzzing a sort against Array.sort
export const randomArray = (n: number, min: number = -100, max: number = 100): number[] =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};