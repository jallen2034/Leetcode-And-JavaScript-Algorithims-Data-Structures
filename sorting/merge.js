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

merge([1, 10, 15], [2, 14, 99, 100]);