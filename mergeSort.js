// function to merge two sorted arrays - runs in O(n + m) time & O(n + m) space
const merge = function (array1, array2) {
  let results = [];
  let i = 0;
  let j = 0;
  while (i < array1.length || j < array2.length) {
    if (array1[i] < array2[j] || j >= array2.length) {
      results.push(array1[i]);
      i++;
    } else if (array1[i] > array2[j] || i >= array1.length) {
      results.push(array2[j]);
      j++;
    }
  }
  return results;
}

const mergeSort = function (array) {
  if (array.length <= 1) {
    return array;
  }
  let mid = Math.floor(array.length/2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  return merge(left, right);
}

console.log(mergeSort([10, 24, 76, 73, 72, 1, 9, 26, 88, 123, 56]));
console.log(mergeSort([10, 24, 76, 73]));