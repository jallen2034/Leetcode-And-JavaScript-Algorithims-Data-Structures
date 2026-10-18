// LeetCode 26: Remove Duplicates from Sorted Array (Easy)
//
// Given nums sorted in NON-DECREASING order, remove duplicates IN-PLACE so
// each unique element appears once, keeping relative order. Return k, the
// number of unique elements. The first k slots of nums must hold the unique
// values in sorted order; whatever sits past index k-1 is ignored.
//
//   nums = [1,1,2]  →  return 2, nums = [1,2,_]
//
// Constraints: 1 <= nums.length <= 3 * 10^4, -100 <= nums[i] <= 100.
// NO extra array — the judge inspects the array you were given.
//
// ---- Recall drill (~1 min, out loud) ----
//   1. Two pointers: one WRITES, one READS. Which one moves every step,
//      and which one moves only sometimes?
//   2. The array is sorted — so how do you spot "this value is new" by
//      looking at only ONE other element?
//   3. Where does the write pointer start, and why does its final position
//      hand you k for free?
// Target: O(n) time, O(1) space, one pass, ~8 lines, 10 min.

import { check } from './helpers.ts';



const removeDuplicates = (nums: number[]): number => {
  let leftPtr: number = 0;
  let rightPtr: number = 0;

  while (rightPtr < nums.length) {
    if (nums[leftPtr] != nums[rightPtr]) {
      leftPtr += 1;
      nums[leftPtr] = nums[rightPtr];
      continue;
    }

    rightPtr += 1;
  }

  return leftPtr + 1;
};

// ---- tests ----

// Mimics LC's custom judge: checks the returned k AND the first k slots.
const judge = (label: string, nums: number[], expected: number[]): void => {
  const k = removeDuplicates(nums);
  check(label, [k, nums.slice(0, k)], [expected.length, expected]);
};

// -- LC examples --
// judge('LC ex1: small', [1, 1, 2], [1, 2]);
judge('LC ex2: larger sorted w/ dupes', [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], [0, 1, 2, 3, 4]);

// -- edges --
judge('single element', [7], [7]);
judge('no duplicates at all', [1, 2, 3, 4], [1, 2, 3, 4]);
judge('all the same value', [5, 5, 5, 5, 5], [5]);

// -- negatives (non-decreasing still holds) --
judge('negatives and zero', [-3, -3, -1, 0, 0, 0, 2], [-3, -1, 0, 2]);

// -- long runs then singletons --
judge('uneven run lengths', [1, 1, 1, 1, 2, 3, 3, 9], [1, 2, 3, 9]);