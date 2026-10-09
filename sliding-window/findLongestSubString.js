/* Write a function called findLongestSubstring, which accepts a string and returns the length of 
 * the longest substring 
 * with all distinct characters.
 * Time Complexity - O(n)
 */
const findLongestSubstring = (string, number) => {
  let total = null;
  let lenLongestStringLoop = 1;
  let charCounts = {}
  let left = 0;
  let right = 0;
  while(right < string.length) {
    if (left === 0 && right === 0) {
      right += 1;
      charCounts[string[left]] = 1;
      charCounts[string[right]] = 1;
      if (string[left] !== string[right]) {
        lenLongestStringLoop += 1;
      }
    } else if (charCounts[string[right]] > 1) {
      charCounts[string[left]] -= 1;
      left += 1;
      lenLongestStringLoop -= 1;
    } else {
      if (total === null || lenLongestStringLoop >= total) {
        total = lenLongestStringLoop;
      }
      right += 1;
      charCounts[string[right]] = (charCounts[string[right]] || 0) + 1;
      lenLongestStringLoop += 1;
    }
  }
  return total === (undefined || null) ? 0 : total;
}

console.log(findLongestSubstring('')) // 0
console.log(findLongestSubstring('rithmschool')) // 7
console.log(findLongestSubstring('thisisawesome')) // 6
console.log(findLongestSubstring('thecatinthehat')) // 7
console.log(findLongestSubstring('bbbbbb'))  // 1
console.log(findLongestSubstring('longestsubstring')) // 8
console.log(findLongestSubstring('thisishowwedoit')) // 6