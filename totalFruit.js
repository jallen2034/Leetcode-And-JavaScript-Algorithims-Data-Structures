/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function(fruits) {
  let left = 0
  let right = 0
  const maxKeysInMap = 2;
  let largestWindowFound = 0
  const resultRollingHash = new Map()

  while (right < fruits.length) {
    if (resultRollingHash.size >= maxKeysInMap && !resultRollingHash.has(fruits[right])) {
      // Check if the index to the right of the sliding windows value is already a key or not in our hashmap tracker.
      if (resultRollingHash.get(fruits[left]) > 1) {
        resultRollingHash.set(fruits[left], resultRollingHash.get(fruits[left]) - 1)
      } else {
        resultRollingHash.delete(fruits[left])
      }

      left += 1
    } else {
      resultRollingHash.set(fruits[right], (resultRollingHash.get(fruits[right]) || 0) + 1);
      largestWindowFound = Math.max(largestWindowFound, right - left + 1);
      right += 1
    }
  }

  return largestWindowFound
}

console.log(totalFruit([1,2,1])) // Output: 3
console.log(totalFruit([0,1,2,2])) // Output: 3
console.log(totalFruit([1,2,3,2,2])) // output 4
