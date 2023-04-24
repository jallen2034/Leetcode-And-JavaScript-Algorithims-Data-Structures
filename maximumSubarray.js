/**
 Finds the maximum subarray sum of a given array of numbers.
 Runs in O(n) time complexity and O(1) space complexity.
 @param {number[]} nums - The input array of numbers.
 @return {number} - The maximum subarray sum.
 */
const maxSubArray = function(nums) {
  let maxSum = nums[0]; // Declare 'MaxSum' Variable and set it to the first element of the array
  let tempSum = nums[0]; // Declare 'tempSum' variable and set it to the first element of the array
  let left = 0; // Declare 'left' pointer for sliding window and set it to 0
  let right = 0; // Declare 'right' pointer for sliding window and set it to 0

  // Step 4: Declare loop to keep going through until both 'left' and 'right' pointers reach the end of the nums array
  while (left <= right && right < nums.length) {
    if (tempSum > maxSum) { // Step 5: if the tempSum > maxSum, update the maxSum
      maxSum = tempSum;
    }
    right += 1; // Move the right pointer over by one before calculating the temp sum
    if (tempSum <= 0) { // Skip over negative sub arrays. find contiguous sub arrays with positive sums
      tempSum = nums[right]; // Reset/Recalculate tempSum to now be whatever is at that right pointer
    } else {
      tempSum += nums[right]; // Add the vale of whatever number is at the position of that right pointer to the tempSum
    }
    left += 1; // Always move the left pointer in our sliding window over with the right pointer in parallel
  }

  return maxSum;
};

const testInput = [-2,1,-3,4,-1,2,1,-5,4];
const testInput2 = [5,4,-1,7,8];
const maxSum = maxSubArray(testInput); // maxSum should be 6
const maxSum2 = maxSubArray(testInput2); // maxSum should be 23
console.log("maxSum: ", maxSum);
console.log("maxSum: ", maxSum2);
