/* write a sliding window function which accepts an array of integers and a number called n. 
 * the function should calculate the maximum sum of n consecutive elements in the array 
 * time complexity O(n) */
const maxSubarraySum = (array, number) => {
  let maxSum = 0;
  let tempSum = 0;
  if (array.length < number) {
    return null;
  }
  for (let i = 0; i < number; i++) {
    maxSum += array[i];
  }
  tempSum = maxSum;
  for (let i = number; i < array.length; i++) {
    tempSum = tempSum - array[i - number] + array[i];
    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
  }
  return maxSum;
}

console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubarraySum([4, 2, 1, 6], 1)); // 6
console.log(maxSubarraySum([4, 2, 1, 6, 2], 4)); // 13 
console.log(maxSubarraySum([], 4)); // null
console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)); // 19