/**
 * TODO: implement this yourself.
 * Return the indices of the two numbers in nums that add up to target.
 * Exactly one valid answer is guaranteed, and you may not use the same
 * element twice. The two indices can be returned in any order.
 */
function twoSum(nums, target) {
  const trackerHash = new Map();

  for (let index = 0; index < nums.length; index++) {
    const difference = target - nums[index];

    if (trackerHash.has(difference)) {
      const complementIndex = trackerHash.get(difference);
      return [complementIndex, index]
    } else {
      trackerHash.set(nums[index], index);
    }
  }

  return [];
}

// ----- test scaffolding below, no need to touch this -----

function check(testNo, actual, expected) {
  const sortedActual = [...actual].sort((a, b) => a - b);
  const sortedExpected = [...expected].sort((a, b) => a - b);
  const pass =
    sortedActual.length === sortedExpected.length &&
    sortedActual.every((value, i) => value === sortedExpected[i]);
  console.log(`Test ${testNo}: ${pass ? "PASS" : "FAIL"}  (got [${actual}], expected [${expected}])`);
}

const nums1 = [2, 7, 11, 15];    // answer at the first two indices
const nums2 = [3, 2, 4];         // answer does not include index 0
const nums3 = [3, 3];            // duplicate values, two-element array
const nums4 = [-3, 4, 3, 90];    // negatives, pair sums to zero
const nums5 = [5, 1, 8, 2, 9];   // answer at spread-apart indices (first + last)
const nums6 = [1, 5, 7, 2, 8, 3]; // answer at the last two indices

check(1, twoSum(nums1, 9), [0, 1]);
check(2, twoSum(nums2, 6), [1, 2]);
check(3, twoSum(nums3, 6), [0, 1]);
check(4, twoSum(nums4, 0), [0, 2]);
check(5, twoSum(nums5, 14), [0, 4]);
check(6, twoSum(nums6, 11), [4, 5]);