/**
 * Finds the length of the longest harmonious subsequence in an array.
 * A harmonious subsequence is a sequence of numbers where the difference between the maximum and minimum 
 * number in the sequence is exactly 1.
 * 
 * @param {number[]} nums - The array of integers.
 * @return {number} - The length of the longest harmonious subsequence.
 */
const findLHS = function (nums) {
  // If the array has only one element, it cannot form a harmonious subsequence, return 0.
  if (nums.length === 1) return 0;

  // Create a frequency map to keep track of the counts of how often each number appears in the array.
  const frequencyMap = new Map();

  // Populate the frequency map with values from the array and their respective frequencies.
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  let maxLength = 0;

  // Iterate through the frequency map.
  // For each number in the map, check if its consecutive number already exists in the map.
  // If it does, calculate the length of the harmonious subsequence starting with the current number.
  // To do this, we add the frequency of the current number with the frequency of its consecutive number (if it exists).
  // Then we keep track of the maximum length found so far.
  for (const [currNum, currNumFrequency] of frequencyMap) {
    if (frequencyMap.has(currNum + 1)) {
      const nextNumFrequency = frequencyMap.get(currNum + 1);
      const currentSequenceLength = currNumFrequency + (nextNumFrequency || 0);
      maxLength = Math.max(maxLength, currentSequenceLength);
    }
  }

  return maxLength;
}

// Test cases
console.log(findLHS([1, 3, 2, 2, 5, 2, 3, 7])); // expected output: 5
console.log(findLHS([1, 2, 3, 4])); // 2
console.log(findLHS([1, 1, 1, 1])); // 0
console.log(findLHS([1, 2, 2, 1])); // 4
