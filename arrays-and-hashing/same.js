/* functon that will determine if the numbers in one array contain
 * the squared values of the numbers in a different array
 * runs on O(n2) */
const same = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
  }

  return true;
}

same([1, 3, 4], [9, 16, 1]);