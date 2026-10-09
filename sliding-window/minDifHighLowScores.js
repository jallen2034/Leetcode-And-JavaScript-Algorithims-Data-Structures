/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumDifference = function (nums, k) {
  // sort array.
  const sortedArray = nums.sort((a, b) => a - b)

  // Declare variable to keep track of our lowest difference.
  let lowestDifference = Infinity

  // Initialize left and right pointers.
  let left = 0;

  /* Initialize the right pointer at the end of the current window of `k` students.
   * This allows us to efficiently identify the highest and lowest values
   * within the sorted array subset, simplifying the calculation
   * of the minimum difference between the scores of students in that window. */
  let right = k - 1;

  if (nums.length === 1) return 0

  while (right < sortedArray.length) {
    const currentDifference = sortedArray[right] - sortedArray[left]

    // Calculate the lowest difference.
    if (!lowestDifference || currentDifference < lowestDifference) {
      lowestDifference = currentDifference
    }

    // Move sliding window to the right.
    left += 1
    right += 1
  }

  return lowestDifference
}

console.log(minimumDifference([90], 1))
console.log(minimumDifference([9, 4, 1, 7], 2))
console.log(minimumDifference([87063, 61094, 44530, 21297, 95857, 93551, 9918], 6)) // 74560
console.log(minimumDifference([9, 4, 1, 7, 3, 10], 3))
