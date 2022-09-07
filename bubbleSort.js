const swap = function (array, indx1, indx2) {
  const temp = array[indx1];
  array[indx1] = array[indx2];
  array[indx2] = temp;
}

// best case O(n), worst case O(n2)
const bubbleSort = function (array) {
  let noSwaps;
  for (let i = array.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      array[j] > array[j + 1] ? 
      swap(array, j, j + 1) : 
      noSwaps = false;
    }
    if (noSwaps) break; // optimize when array sorting is complete
  }
  return array;
}

console.log(bubbleSort([5, 3, 4, 1, 2]));
console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]));