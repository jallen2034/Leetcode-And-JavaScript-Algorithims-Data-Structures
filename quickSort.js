const swap = function (array, indx1, indx2) {
  const temp = array[indx1];
  array[indx1] = array[indx2];
  array[indx2] = temp;
}

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

const quickSort = function () {
}

const array = [5, 2, 8, 7, 1];

console.log(pivot(array, 0, array.length -1 )) // 4