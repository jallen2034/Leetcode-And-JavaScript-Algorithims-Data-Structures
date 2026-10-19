// LeetCode 485: Max Consecutive Ones (Easy)
//
// Given a binary array nums, return the maximum number of consecutive 1's.
//
//   nums = [1,1,0,1,1,1]  →  3
//
// Constraints: 1 <= nums.length <= 10^5, nums[i] is 0 or 1.
//
// ---- Recall drill (~30 sec, out loud) ----
//   1. You're tracking two numbers as you scan. What are they?
//   2. A 0 resets one of them. Which one, and why not both?
//   3. The classic bug: where does the max get recorded if the longest
//      run is at the very END of the array? (test 3 punishes this)
// Target: O(n) time, O(1) space, one pass, ~7 lines, 5 min. Warmup pace.

import { check } from './helpers.ts';

const findMaxConsecutiveOnes = (nums: number[]): number => {
  let largestWindowFound: number = 0;
  let right: number = 0;
  let left: number = 0;

  while (right < nums.length) {
    if (nums[right] === 1) {
      right += 1;
      continue;
    }

    if (nums[right] === 0) {
      const distanceBetweenPointers: number = Math.abs(right - left);

      if (largestWindowFound < distanceBetweenPointers) {
        largestWindowFound = distanceBetweenPointers;
      }

      right += 1;
      left = right;
    }
  }

  if (nums[right] !== 0) {
    const distanceBetweenPointers: number = Math.abs(right - left);

    if (largestWindowFound < distanceBetweenPointers) {
      largestWindowFound = distanceBetweenPointers;
    }
  }

  return largestWindowFound;
};

// ---- tests ----

check('LC ex1', findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3);
check('LC ex2', findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2);


// longest run ends at the array's edge — no trailing 0 to "close" it
check('run ends at the end', findMaxConsecutiveOnes([0, 1, 1, 1, 1]), 4);
