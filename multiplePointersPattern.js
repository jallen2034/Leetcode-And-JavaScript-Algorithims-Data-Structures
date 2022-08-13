/* write a function that accepts a sorted array of integers. 
 * The function should find the first pair where the sum is 0 
 * return an array that includes both values that sum to zero or undefined 
 * if a pair does not exist
 * time complexity O(n) 
 * space complexity O(1)*/
const sumZero = (array) => {
  let leftIndex = 0;
  let rightIndex = array.length - 1;
  while (leftIndex < rightIndex) {
    let sum = array[leftIndex] + array[rightIndex];
    if (sum === 0) {
      return `[${[array[leftIndex], array[rightIndex]]}] add to 0!`;
    } else if (sum > 0) {
      rightIndex--
    } else {
      leftIndex++
    }
  }
  return 'Cannot find a sum of 0 of these numbers!'
}

// test cases for function
console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [3, 3]
console.log(sumZero([-2, 0, 1, 3])) // undefined 
console.log(sumZero([1, 2, 3])) // undefined
console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 10])); // undefined 