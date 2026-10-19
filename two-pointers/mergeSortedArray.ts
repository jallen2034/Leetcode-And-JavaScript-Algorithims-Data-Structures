// LeetCode 88: Merge Sorted Array (Easy) — Microsoft frequent flyer
//
// nums1 (length m + n) holds m sorted values then n zeros of free space.
// nums2 holds n sorted values. Merge nums2 INTO nums1, in place, sorted.
// Return nothing on LC; here we return nums1 so check() can see it.
//
//   nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
//   → nums1 becomes [1,2,2,3,5,6]
//
// Constraints: 0 <= m, n <= 200, m + n >= 1, -10^9 <= vals <= 10^9.
//
// ---- Recall drill (~60 sec, out loud) — yesterday's pattern, new costume ----
//   1. Why can't you merge FORWARD into nums1? What gets destroyed?
//   2. So you fill from the BACK (index m + n - 1, the free space). If you're
//      filling largest-first, which candidate wins each round — smaller or
//      larger? (This is sortedSquares' outside-in cousin.)
//   3. The invariant is unchanged: ___ commit, ___ pointer advance, per round.
//   4. Drain question, and it's a beauty: when the main loop ends, ONE side
//      might have leftovers. Think hard — does leftover nums1 need draining?
//      Does leftover nums2? One answer is "yes", one is "no, it's already
//      exactly where it belongs." Know why before you code it. (test 4)
// Target: O(m+n) time, O(1) extra space, ~12 lines, 15 min.

import { check } from './helpers.ts';

const merge = (nums1: number[], m: number, nums2: number[], n: number): number[] => {
  let nums1Ptr: number = m - 1;
  let nums2Ptr: number = n - 1;
  let endPtr: number = nums1.length - 1;

  while (nums2Ptr >= 0) {
    const valNums1Ptr: number = nums1[nums1Ptr];
    const valNums2Ptr: number = nums2[nums2Ptr];

    if (valNums1Ptr > valNums2Ptr) {
      nums1[endPtr] = valNums1Ptr;
      nums1Ptr -= 1;
    } else {
      nums1[endPtr] = valNums2Ptr;
      nums2Ptr -= 1;
    }

    endPtr -= 1;
  }

  return nums1;
};

// ---- tests ----
// check('LC ex2: nums2 empty', merge([1], 1, [], 0), [1]);
// check('LC ex3: nums1 empty', merge([0], 0, [1], 1), [1]);

check('LC ex1: interleaved', merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3), [1, 2, 2, 3, 5, 6]);
check('all of nums2 smaller — the drain case', merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3), [1, 2, 3, 4, 5, 6]);
check('all of nums2 bigger', merge([1, 2, 3, 0, 0, 0], 3, [7, 8, 9], 3), [1, 2, 3, 7, 8, 9]);
check('unbalanced: one element meets many', merge([5, 0, 0, 0], 1, [1, 2, 3], 3), [1, 2, 3, 5]);