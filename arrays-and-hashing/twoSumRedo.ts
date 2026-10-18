// LeetCode 1: Two Sum — RE-REP from blank.
// (You've solved this before: twoSum.js / twoSumLinear.js. No peeking.)
//
// Given nums and target, return the INDICES of the two numbers that add up
// to target. Exactly one solution exists; you may not use the same element
// twice. Any order.
//
//   nums = [2,7,11,15], target = 9  →  [0,1]
//
// Constraints: 2 <= nums.length <= 10^4, values and target can be negative.
//
// ---- Recall drill (~1 min, out loud) ----
//   1. One pass with a map: what are the KEYS, what are the VALUES?
//   2. For each num, what do you LOOK UP before you INSERT?
//   3. Why does look-up-before-insert automatically prevent using the
//      same element twice?
// Target: O(n) time, one pass, ~8 lines, 10 min. This is the single most
// asked interview question in existence — it should be reflex-fast.

import { check } from './helpers.ts';

const twoSum = (nums: number[], target: number): number[] => {
  throw new Error('not implemented');
};

// ---- tests ----

// -- LC examples --
check('LC ex1', twoSum([2, 7, 11, 15], 9), [0, 1]);
check('LC ex2', twoSum([3, 2, 4], 6), [1, 2]);
check('LC ex3: duplicate values', twoSum([3, 3], 6), [0, 1]);

// -- the pair is NOT adjacent --
check('far apart', twoSum([1, 9, 4, 2, 8], 9), [0, 4]);

// -- same-element trap: 5+5=10 but there's only ONE 5 --
// (correct answer uses 4+6; a buggy "same element twice" solution says [1,1])
check('cannot reuse one element', twoSum([4, 5, 6], 10), [0, 2]);

// -- negatives --
check('negative numbers', twoSum([-3, 4, 1, 90], -2), [0, 2]);

// -- zero target --
check('zero target', twoSum([0, 4, 3, 0], 0), [0, 3]);
