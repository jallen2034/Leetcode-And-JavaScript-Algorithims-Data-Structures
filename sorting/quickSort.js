// swap helper function
const swap = function (array, indx1, indx2) {
  const temp = array[indx1];
  array[indx1] = array[indx2];
  array[indx2] = temp;
}

// pivot helper function which is called recursively - runs in O(n)
const pivot = function (array, start, end) {
  let pivot = array[start];
  let swapIndex = start;
  for (let i = start + 1; i < array.length; i++) {
    if (pivot > array[i]) {
      swapIndex++
      swap(array, swapIndex, i)
    }
  }
  swap(array, start, swapIndex);
  return swapIndex;
}

/* quick sort - O(n log n) best time, O(n2) worst time, O(log n) space complexity
 * continue recursion until the left pointer passes right pointer in arrays
 * recursively handle left side of subarray + recursively handle right side of subarray */
const quickSort = function (array, left = 0, right = array.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(array, left, right);
    quickSort(array, left, pivotIndex - 1); // left
    quickSort(array, pivotIndex + 1, right); // right
  }
  return array;
}

console.log(quickSort([5, 2, 8, 7, 1, 3]));
console.log(quickSort([4, 6, 9, 1, 2, 5]));
console.log(quickSort([1, 5, 6, 3, 2, 4, 8, 7]));
console.log(quickSort([4, 9, 1, 2]));