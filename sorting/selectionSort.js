const swap = function (array, indx1, indx2) {
  const temp = array[indx1];
  array[indx1] = array[indx2];
  array[indx2] = temp;
}

// best case O(n), worst case O(n2)
const selectionSort = function (array) {
  for (let i = 0; i < array.length - 1; i++) {
    let lowest = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowest]) lowest = j;
    }
    swap(array, i, lowest);
  }
  return array;
}

console.log(selectionSort([5, 3, 4, 1, 2]));
console.log(selectionSort([8, 1, 2, 3, 4, 5, 6, 7]));