// LeetCode 198: House Robber (Medium) — REDO, interview-morning edition
// Recruiter flagged DP for today's screen. You solved this Oct 11.
// NO PEEKING at houseRobber.ts — that's the whole point of a redo.
//
// Rob houses in a row; adjacent houses can't both be robbed.
// Return the max money.  nums[i] >= 0, 1 <= nums.length <= 100.
//
//   [1,2,3,1]   → 4   (rob 1 + 3)
//   [2,7,9,3,1] → 12  (rob 2 + 9 + 1)
//
// ---- Narrate like it's the real thing (the rep IS the narration) ----
//   1. State the recurrence OUT LOUD before coding: at house i, you either
//      rob it (and take best-up-to i-2) or skip it (best-up-to i-1).
//   2. State space: do you need the whole dp array, or just two variables?
//      Say the space complexity both ways.
//   3. Edge cases FIRST, like you'll do live: one house, two houses.
// Target: ~10 lines, 15 min including narration. Then STOP WARMING UP.

import { check } from './helpers.ts';

const rob = (nums: number[]): number => {
  // your code here
  return 0;
};

// ---- tests ----

check('LC ex1', rob([1, 2, 3, 1]), 4);
check('LC ex2', rob([2, 7, 9, 3, 1]), 12);
check('single house', rob([5]), 5);
check('two houses: pick the bigger', rob([2, 10]), 10);
check('skipping two in a row can win', rob([2, 1, 1, 9]), 11);
