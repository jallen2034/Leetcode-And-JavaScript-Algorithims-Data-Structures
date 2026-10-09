const areMapsEqual = (map1, map2) => {
  if (map1.size !== map2.size) return false

  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      return false
    }
  }
  return true
}

const organizeS1ValuesIntoMap = (s1) => {
  const charCount = new Map()

  for (let i = 0; i < s1.length; i++) {
    charCount.set(s1[i], (charCount.get(s1[i]) || 0) + 1)
  }

  return charCount
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  let leftPtr = 0
  let rightPtr = 0
  const windowLen = s1.length
  const s2charCount = new Map()
  const s1CharCount = organizeS1ValuesIntoMap(s1)

  // If s1 is longer than s2, return false immediately
  if (s1.length > s2.length) return false

  // fill out charCount map until right and left pointers hit their final starting point
  while (rightPtr < windowLen) {
    s2charCount.set(s2[rightPtr], (s2charCount.get(s2[rightPtr]) || 0) + 1)
    rightPtr += 1
  }

  // Return true early if the maps match
  if (areMapsEqual(s1CharCount, s2charCount)) return true

  // Otherwise keep moving the sliding window through the rest of s2 hoping to find a match
  while (rightPtr < s2.length) {
    s2charCount.set(s2[rightPtr], (s2charCount.get(s2[rightPtr]) || 0) + 1)

    /* Check if the window size is equal to the length of s1, if so, delete character saved
     * info in left end of the window + move the leftPtr to shrink the window */
    if (rightPtr - leftPtr === windowLen) {
      s2charCount.set(s2[leftPtr], s2charCount.get(s2[leftPtr]) - 1)

      if (s2charCount.get(s2[leftPtr]) === 0) {
        s2charCount.delete(s2[leftPtr])
      }

      leftPtr += 1
    }

    // Move the rightPtr to expand the window
    rightPtr += 1

    // Check if the current window matches the character count of s1
    if (areMapsEqual(s1CharCount, s2charCount)) {
      return true
    }
  }

  return false
}

console.log(checkInclusion("ab", "eidbaooo")) // Expected: true
console.log(checkInclusion("ab", "eidboaoo")) // Expecso ted: false
console.log(checkInclusion("adc", "dcda")) // Expected true
console.log(checkInclusion("adc", "asjdcdaert")) // Expected true
