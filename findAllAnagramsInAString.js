/**
 * Checks if the character counts in resultHash match the character counts in pHash.
 * @param {string} p - The string to check against (used to generate pHash).
 * @param {Map} resultHash - A hashmap (Map) containing the counts of characters in the current window of s.
 * @param {Map} pHash - A hashmap (Map) containing the counts of characters in string p.
 * @return {boolean} - True if the counts match, otherwise false.
 */
const checkSecondStringValuesInHashMap = (p, resultHash, pHash) => {
  // Compare the frequency maps
  for (let [key, value] of pHash) {
    if (resultHash.get(key) !== value) {
      return false;
    }
  }
  return true;
}

/**
 * Finds all start indices of p's anagrams in s.
 * @param {string} s - The source string in which to search for anagrams of p.
 * @param {string} p - The target string for which to find anagrams.
 * @return {number[]} - An array of starting indices of p's anagrams in s.
 */
const findAnagrams = function (s, p) {
  let left = 0;
  let right = 0;
  let resultHash = new Map();
  let resultIdxArr = [];

  // Create a hashmap to log the frequency of all the characters in the string p
  const pHash = new Map();
  for (let char of p) {
    pHash.set(char, (pHash.get(char) || 0) + 1);
  }

  // Initialize the resultHash with the first window of size p.length in s
  resultHash.set(s[left], (resultHash.get(s[left]) || 0) + 1);
  while (right - left < p.length - 1) {
    right += 1;
    resultHash.set(s[right], (resultHash.get(s[right]) || 0) + 1);
  }

  // Slide the window across the string s
  while (right < s.length) {
    // Check if the current window is an anagram of p
    const valFoundInHash = checkSecondStringValuesInHashMap(p, resultHash, pHash);

    // If it is an anagram, add the starting index to the result array.
    if (valFoundInHash) {
      resultIdxArr.push(left);
    }

    // Conditionally subtract the value from the left pointer or delete it based on its count.
    if (resultHash.get(s[left]) > 1) {
      resultHash.set(s[left], resultHash.get(s[left]) - 1);
    } else {
      resultHash.delete(s[left]);
    }

    // Move the sliding window to the right by 1.
    left += 1;
    right += 1;

    // Add the new character to the resultHash
    if (right < s.length) {
      resultHash.set(s[right], (resultHash.get(s[right]) || 0) + 1);
    }
  }

  return resultIdxArr;
}

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
console.log(findAnagrams("abab", "ab")); // [0, 1, 2]
console.log(findAnagrams("baa", "aa")); // [1]
