// LeetCode 1470: Shuffle the Array (Easy)
//
// nums has 2n elements in the form [x1,x2,...,xn, y1,y2,...,yn].
// Return it in the form [x1,y1, x2,y2, ..., xn,yn].
//
//   nums = [2,5,1,3,4,7], n = 3  →  [2,3,5,4,1,7]
//
// Constraints: 1 <= n <= 500, nums.length == 2n, 1 <= nums[i] <= 10^3.
//
// ---- Recall drill (~30 sec, out loud) ----
//   1. For index i in 0..n-1, where does xi live and where does yi live
//      in the INPUT? Write both as formulas using i and n before coding.
//   2. One loop or two? What does each iteration push?
//   3. Stretch (after it's green): could you do it in-place with O(1)
//      extra space? Don't build it — just say what makes that hard.
// Target: O(n) time, O(n) space (the output), ~5 lines, 5 min. Sprint pace.

import { check } from './helpers.ts';

const shuffle = (nums: number[], n: number): number[] => {
  let leftPtr: number = 0;
  let rightPtr: number = n;
  const res: number[] = []

  while (rightPtr < nums.length) {
    res.push(nums[leftPtr]);
    res.push(nums[rightPtr]);

    rightPtr += 1;
    leftPtr += 1;
  }

  return res;
};

// ---- tests ----

check('LC ex1', shuffle([2, 5, 1, 3, 4, 7], 3), [2, 3, 5, 4, 1, 7]);
check('LC ex2', shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4), [1, 4, 2, 3, 3, 2, 4, 1]);
check('LC ex3: duplicates across halves', shuffle([1, 1, 2, 2], 2), [1, 2, 1, 2]);