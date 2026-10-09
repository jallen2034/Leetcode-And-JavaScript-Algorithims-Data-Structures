/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
  let leftPointer = 0
  let rightPointer = 0
  let largestResultFound = 0
  const resultMap = new Map()

  while (rightPointer < s.length) {
    if (leftPointer === 0 && rightPointer === 0) { // If both pointers are at idx 0, handle the starting edge case.
      // Add the first character to the Map and move the right pointer.
      resultMap.set(s[rightPointer], rightPointer)
      rightPointer +=1
    } else if (resultMap.has(s[rightPointer])) { // If a duplicate value is found at the right pointer.
      // Remove the item from the Map at the left pointer and move the left pointer to the right.
      resultMap.delete(s[leftPointer])
      leftPointer += 1
    } else { // If no duplicate is found, grow the sliding window to the right.
      // Add the character to the Map and move the right pointer.
      resultMap.set(s[rightPointer], rightPointer)
      rightPointer += 1
    }

    // Update the length of the longest substring found if needed.
    if (resultMap.size > largestResultFound) {
      largestResultFound = resultMap.size
    }
  }

  // Return the length of the longest substring without repeating characters
  return largestResultFound
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Output: 3
