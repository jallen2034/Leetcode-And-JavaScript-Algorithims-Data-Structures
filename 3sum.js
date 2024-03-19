/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Example 1:
 *
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Explanation:
 *   nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
 *   nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
 *   nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
 *   The distinct triplets are [-1,0,1] and [-1,-1,2].
 *   Note that the order of the output and the order of the triplets do not matter.
 *
 * Example 2:
 *
 * Input: nums = [0,1,1]
 * Output: []
 * Explanation: The only possible triplet does not sum up to 0.
 *
 * Example 3:
 *
 * Input: nums = [0,0,0]
 * Output: [[0,0,0]]
 * Explanation: The only possible triplet sums up to 0.
 *
 * Constraints:
 *
 *   3 <= nums.length <= 3000
 *   -105 <= nums[i] <= 105
 */

// Function to swap elements in an array
const swap = (arr, idx1, idx2) => {
  let temp = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = temp
}

// Pivot helper function for quicksort algorithm
const pivot = (nums, startIdx = 0, endIdx = nums.length - 1) => {
  let pivotIdx = startIdx

  for (let i = startIdx + 1; i <= endIdx; i++) {
    if (nums[startIdx] > nums[i]) {
      swap(nums, i, pivotIdx + 1)
      pivotIdx += 1
    }
  }

  swap(nums, startIdx, pivotIdx)
  return pivotIdx
}

// Quicksort algorithm implementation for sorting the input array
const quickSortInputArray = (nums, left = 0, right = nums.length - 1) => {
  if (left < right) {
    let pivotIdx = pivot(nums, left, right)
    // Sort left side of nums array
    quickSortInputArray(nums, left, pivotIdx - 1)
    // Sort right side of nums array
    quickSortInputArray(nums, pivotIdx + 1, right)
  }
  return nums
}

/*
 * @param {number[]} nums - The input array of integers
 * @return {number[][]} - An array containing all unique triplets that sum up to zero
 */
const threeSum = function (nums) {
  const target = 0 // The target value for the sum of triplets
  const results = [] // Array to store the resulting triplets

  // Sort the array in ascending order to facilitate the triplet search
  const sortedNumsArray = quickSortInputArray(nums)

  // Initialize pointer "a" at the beginning of the array.
  for (let i = 0; i < nums.length; i++) {
    let aPointerValue = nums[i]
    // Skip duplicates for pointer "a"
    if (i > 0 && aPointerValue === nums[i - 1]) {
      continue
    }

    // Initialize pointers "b" and "c" to compare against pointer "a"
    let bPointer = i + 1
    let cPointer = nums.length - 1

    // Search for triplets that sum up to the target value
    while (bPointer < cPointer) {
      const sumOfAllNumbers = aPointerValue + nums[bPointer] + nums[cPointer]

      if (sumOfAllNumbers > target) {
        cPointer -= 1 // Move pointer "c" to explore the left side more.
      } else if (sumOfAllNumbers < target) {
        bPointer += 1 // Move pointer "b" to explore the right side more.
      } else if (sumOfAllNumbers === target) {
        // Found a valid triplet, add it to the results array
        results.push([aPointerValue, nums[bPointer], nums[cPointer]])

        // Move pointers "b" and "c" to skip over duplicates
        while (nums[bPointer] === nums[bPointer + 1]) bPointer++
        while (nums[cPointer] === nums[cPointer - 1]) cPointer--

        // Move pointers to explore other potential triplets
        bPointer++
        cPointer--
      }
    }
  }

  return results
}

// Example usage and expected output
const result1 = threeSum([-1, 0, 1, 2, -1, -4])
console.log(result1)
