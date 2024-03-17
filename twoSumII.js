/**
 * Given a 1-indexed array of integers 'numbers' that is already sorted in non-decreasing order,
 * finds two numbers such that they add up to a specific target number.
 * Returns the indices of the two numbers, 'index1' and 'index2', added by one as an integer array [index1, index2] of length 2.
 * The tests are generated such that there is exactly one solution. You may not use the same element twice.
 * The solution uses only constant extra space.
 *
 * @param {number[]} numbers - The sorted array of integers
 * @param {number} target - The target sum
 * @returns {number[]} - An array containing the indices of the two numbers that add up to the target
 */
const twoSumTwo = (numbers, target) => {
  let leftPointer = 0;
  let rightPointer = numbers.length - 1;

  while (leftPointer < rightPointer) {
    const sumNumbersBothPointers = numbers[leftPointer] + numbers[rightPointer];
    if (sumNumbersBothPointers > target) {
      rightPointer -= 1;
    } else if (sumNumbersBothPointers < target) {
      leftPointer += 1;
    } else if (sumNumbersBothPointers === target) {
      return [leftPointer + 1, rightPointer + 1]; // Adding 1 to convert from 0-indexed to 1-indexed
    }
  }
};

// Test cases
console.log(twoSumTwo([2, 7, 11, 15], 9)); // Expected output: [1, 2]
console.log(twoSumTwo([2, 3, 4], 6)); // Expected output: [1, 3]
console.log(twoSumTwo([-1, 0], -1)); // Expected output: [1, 2]
console.log(twoSumTwo([1, 3, 4, 5, 7, 11], 9)); // Expected output: [3, 4]
console.log(twoSumTwo([-2, 0, 2, 4, 6, 8], 6)); // Expected output: [1, 6]
