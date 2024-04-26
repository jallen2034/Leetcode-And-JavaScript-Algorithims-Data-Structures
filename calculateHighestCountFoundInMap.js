// Function to calculate the highest count found in a character count map
const calculateHighestCountFoundInMap = (charCountMap) => {
  let highestCount = 0
  let charWithHighestCount

  // Iterate through the character count map to find the highest count
  charCountMap.forEach((count, char) => {
    if (count > highestCount) {
      highestCount = count
      charWithHighestCount = char
    }
  })

  return highestCount
}

/**
 * @param {string} s - The input string
 * @param {number} k - The maximum number of replacements allowed
 * @return {number} - The length of the longest substring with repeating characters
 */
var characterReplacement = function (s, k) {
  let leftPointer = 0
  let rightPointer = 0
  let result = 0

  const count = new Map()

  while (rightPointer < s.length) {
    let windowLength = rightPointer - leftPointer + 1
    count.set(s[rightPointer], (count.get(s[rightPointer]) || 0) + 1)

    // Calculate the highest count of any character in the current window.
    const highestCountFoundInMap = calculateHighestCountFoundInMap(count)

    /* If the difference between the window length and the highest count of any character found in our map
     * exceeds the maximum number of replacements allowed (k), the window becomes invalid.
     * Move the left pointer to the right to shrink the window and maintain the validity of the window. */
    if (windowLength - highestCountFoundInMap > k) {
      count.set(s[leftPointer], (count.get(s[leftPointer])) - 1)
      leftPointer += 1
    }

    windowLength = rightPointer - leftPointer + 1

    // Update the result with the length of the longest valid window found so far
    if (windowLength > result) {
      result = windowLength
    }

    rightPointer += 1
  }

  return result
}

// Test cases.
console.log(characterReplacement("ABABBA", 2)) // Output: 5
console.log(characterReplacement("ABAB", 2)) // Output: 4
console.log(characterReplacement("AABABBA", 1)) // Output: 4
console.log(characterReplacement("KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF", 4)) // Output: 7
