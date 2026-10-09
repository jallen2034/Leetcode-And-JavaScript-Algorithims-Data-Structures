// best case O(1), worst case O(n2)
const inserstionSort = function (array) {
  for (let i = 1; i < array.length; i++) {
    let currentVal = array[i];
    let j = i - 1
    while (j >= 0 && array[j] > currentVal) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentVal;
  }
  return array;
}

console.log(inserstionSort([2, 1, 9 ,76, 4]));
console.log(inserstionSort([5, 3, 4, 1, 2]));
console.log(inserstionSort([8, 1, 2, 3, 4, 5, 6, 7]));