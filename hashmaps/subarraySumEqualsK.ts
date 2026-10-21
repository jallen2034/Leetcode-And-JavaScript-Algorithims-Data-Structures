// LeetCode 560: Subarray Sum Equals K (Medium) — Microsoft darling.
// STRETCH REP: genuinely new twist (prefix sums). Only start this one
// fresh — if it's late and you're cooked, it keeps until Thursday.
//
// Count the number of CONTIGUOUS subarrays summing to exactly k.
//
//   [1,1,1], k=2    → 2
//   [1,2,3], k=3    → 2
//
// Constraints: 1 <= length <= 2*10^4, -1000 <= nums[i] <= 1000,
// -10^7 <= k <= 10^7. NOTE: negatives allowed — sliding window is DEAD
// on arrival (say why: growing the window doesn't monotonically grow
// the sum).
//
// ---- Drill (~3 min) — the prefix-sum + hashmap trick ----
//   1. Define prefix(i) = sum of everything up to i. Then the sum of the
//      slice (j..i] = prefix(i) - prefix(j). You want that to equal k.
//      Rearrange it: prefix(j) = ___ - ___. Write that equation down.
//   2. So walking left to right carrying a running sum: "how many
//      subarrays END here summing to k?" = "how many EARLIER prefixes
//      equal runningSum - k?" — that's a hashmap lookup of counts.
//      (Same shape as two-sum: 'have I seen my complement?')
//   3. The classic trap: the map starts with {0: 1} BEFORE the walk.
//      What subarray does that entry represent, and which test below
//      fails without it?
//   4. Why counts (Map<sum, count>) and not just a Set? (Test with
//      zeros in it — same prefix can occur multiple times.)
//
// Target: ~15 lines, 25 min.

import { check } from './helpers.ts';

const subarraySum = (nums: number[], k: number): number => {
  // your code here
  return 0;
};

// ---- tests ----

check('LC ex1: [1,1,1] k=2', subarraySum([1, 1, 1], 2), 2);
check('LC ex2: [1,2,3] k=3', subarraySum([1, 2, 3], 3), 2);
check('whole array is the answer: [1,2] k=3', subarraySum([1, 2], 3), 1);
check('single element equals k', subarraySum([5], 5), 1);
check('negatives: [1,-1,1,-1] k=0', subarraySum([1, -1, 1, -1], 0), 4);
check('zeros multiply counts: [0,0,0] k=0', subarraySum([0, 0, 0], 0), 6);
check('k negative: [3,-2,-1] k=-3', subarraySum([3, -2, -1], -3), 1);
