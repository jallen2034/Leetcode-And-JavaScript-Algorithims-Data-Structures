// LeetCode 283: Move Zeroes (Easy) — Microsoft frequent flyer
//
// IN PLACE: move all 0s to the end, keeping the relative order of the
// non-zeros. No copy of the array.
//
//   [0,1,0,3,12] → [1,3,12,0,0]
//   [0]          → [0]
//
// Constraints: 1 <= length <= 10^4.
//
// ---- Speed drill (~30 sec) ----
//   1. Same pointer dance as stringCompression: READ scans everything,
//      WRITE only advances when it accepts something. What does write
//      accept here?
//   2. After read finishes, what fills positions write..end?
//   3. Order-preservation: why does this two-pointer version keep the
//      non-zeros in order for free? (Swapping-based versions have to
//      argue this; yours shouldn't need to.)
//
// Target: ~10 lines, 10 min.

import { check } from './helpers.ts';

const swap = (nums: number[], left: number, right: number) => {
  const tempRight: number = nums[right];
  nums[right] = nums[left];
  nums[left] = tempRight;
}

const moveZeroes = (nums: number[]): number[] => {
  if (nums.length === 0) {
    return nums;
  }

  let left: number = 0;
  let right: number = 0;

  while (right < nums.length) {
    const valRightPtr: number = nums[right];

    if (valRightPtr !== 0 && valRightPtr !== undefined) {
      swap(nums, left, right);
      left += 1;
    }

    right += 1;
  }

  return nums;
};

// ---- tests ----

check('LC ex1: [0,1,0,3,12]', moveZeroes([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]);
check('LC ex2: [0]', moveZeroes([0]), [0]);
check('no zeroes', moveZeroes([1, 2, 3]), [1, 2, 3]);
check('all zeroes', moveZeroes([0, 0, 0]), [0, 0, 0]);
check('zeroes already at end', moveZeroes([1, 2, 0, 0]), [1, 2, 0, 0]);
check('order preserved: [4,0,3,0,2,0,1]', moveZeroes([4, 0, 3, 0, 2, 0, 1]), [4, 3, 2, 1, 0, 0, 0]);
