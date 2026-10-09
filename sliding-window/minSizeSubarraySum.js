const calculateWinLength = (left, right) => {
  return right - left + 1
}

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 * @description
 * This function finds the minimal length of a contiguous subarray of which the sum is at least `target`.
 * If there is no such subarray, it returns 0.
 * The approach uses a sliding window technique, which ensures that each element is processed at most twice,
 * leading to an overall time complexity of O(n), where n is the length of the input array.
 */
const minSubArrayLen = function(target, nums) {
  let total = 0
  let left = 0
  let right = 1
  let lowestWindowLenFound = 0

  // Edge case if the first item is already greater or equal to target
  if (nums[left] >= target) {
    return 1
  }

  // Calculate total for left pointer and right pointer out the gate.
  total += nums[left] + nums[right]

  // Implement sliding window on array.
  while (right < nums.length) {
    let currWindowLen = calculateWinLength(left, right)

    if (total < target) {
      right += 1
      total += nums[right]
    } else {
      if (lowestWindowLenFound === 0 || currWindowLen < lowestWindowLenFound) {
        lowestWindowLenFound = currWindowLen
      }
      total -= nums[left]
      left += 1
    }
  }

  return lowestWindowLenFound
}

console.log(minSubArrayLen(7,[2,3,1,2,4,3])) // Expected output: 2
console.log(minSubArrayLen(4, [1,4,4])) // Expected output: 1
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1])) // Expected output: 0
console.log(minSubArrayLen(6, [10,2,3])) // expected output: 1
