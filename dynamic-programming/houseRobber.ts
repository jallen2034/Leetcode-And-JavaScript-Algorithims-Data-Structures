// LeetCode 198: House Robber
//
// You are a professional robber planning to rob houses along a street. Each house
// has a certain amount of money stashed. The only constraint stopping you from
// robbing each of them is that adjacent houses have security systems connected,
// and it will automatically contact the police if two ADJACENT houses were broken
// into on the same night.
//
// Given an integer array `nums` representing the amount of money of each house,
// return the maximum amount of money you can rob tonight without alerting the police.
//
// Constraints: 1 <= nums.length <= 100, 0 <= nums[i] <= 400

const maxRobFrom = (
  nums: number[],
  i: number,
  memo: Map<number, number>
): number => {
  const numsArrLen: number = nums.length - 1;
  const cachedBest: number | undefined = memo.get(i);

  if (cachedBest !== undefined) {
    return cachedBest;
  }

  if (i > numsArrLen) {
    return 0;
  }

  const idxOfHouseAfterRobbingThisOne: number = i + 2;
  const idxToSkip: number = i + 1;

  const bestAfterRobbingThisHouse: number | null = maxRobFrom(nums, idxOfHouseAfterRobbingThisOne, memo);
  const bestAfterSkippingThisHouse: number | null = maxRobFrom(nums, idxToSkip, memo);

  const robTotalKaChing: number = bestAfterRobbingThisHouse + nums[i];

  const maxCheddarFromThisHouse: number = Math.max(robTotalKaChing, bestAfterSkippingThisHouse);

  memo.set(i, maxCheddarFromThisHouse);

  return maxCheddarFromThisHouse;
}

function rob(nums: number[]): number {
  const FIRST_IDX_NUMS_ARR = 0;

  const memo = new Map<number, number>();

  const maxWeCanRob: number = maxRobFrom(nums, FIRST_IDX_NUMS_ARR, memo);
  return maxWeCanRob;
}

// ---- tests ----
const check = (label: string, actual: number, expected: number) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// 1. LeetCode Example 1: rob houses 0 and 2 (1 + 3)
check('example 1', rob([1, 2, 3, 1]), 4);

// 2. LeetCode Example 2: rob houses 0, 2 and 4 (2 + 9 + 1)
check('example 2', rob([2, 7, 9, 3, 1]), 12);

// 3. Smallest street: one house, so rob it
check('single house', rob([5]), 5);

// 4. Two houses: can only rob one, so take the bigger (the second)
check('two houses', rob([1, 2]), 2);

// 5. Gap of two in the middle: rob first and last
check('gap of two', rob([2, 1, 1, 2]), 4);

// 6. All zeros: nothing worth robbing
check('all zeros', rob([0, 0, 0]), 0);

// 7. Best plan skips the FIRST house: 5 + 5
check('skip the first house', rob([1, 5, 1, 1, 5]), 10);

// 8. Longer street with uneven gaps: 7 + 8 + 9 + 1 + 9
check('uneven gaps', rob([2, 7, 9, 8, 1, 1, 9, 1, 1, 1, 9]), 34);

// 9. Maximum size, maximum values: 100 houses of 400, every other one = 50 × 400
check('100 houses of 400', rob(new Array(100).fill(400)), 20000);

// 10. Maximum size, varied values (fixed "random" data)
check('100 varied houses', rob([
  46, 230, 385, 274, 82, 217, 123, 299, 130, 15, 317, 133, 80, 254, 106, 258, 295, 340, 163, 257,
  2, 365, 229, 89, 215, 130, 0, 345, 329, 301, 216, 355, 273, 70, 53, 63, 211, 187, 184, 224,
  331, 130, 316, 160, 153, 241, 138, 323, 185, 353, 200, 190, 6, 400, 193, 363, 149, 202, 253, 57,
  249, 371, 360, 263, 207, 296, 136, 359, 201, 45, 266, 232, 342, 293, 337, 249, 206, 7, 22, 11,
  391, 198, 274, 139, 22, 67, 98, 82, 281, 188, 242, 121, 314, 210, 224, 293, 177, 143, 46, 185,
]), 11977);