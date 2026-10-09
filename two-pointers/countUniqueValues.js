/* implment a function which accepts a sorted array and counts the unique values in that array
 * there can be negative numbers in the array but it will always be sorted
 * time complxity O(n) */
const countUniqueValues = (array) => {
  let iPointer = 0;
  let jPointer = iPointer + 1;
  if (array.length === 0) {
    return 0;
  }
  while (jPointer < array.length) {
    if (array[iPointer] === array[jPointer]) {
      jPointer += 1;
    } else {
      iPointer += 1;
      array[iPointer] = array[jPointer]
    }
  }
  return iPointer + 1;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([1, 1, 1, 2, 3, 4, 4, 5, 6])); // 6
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4