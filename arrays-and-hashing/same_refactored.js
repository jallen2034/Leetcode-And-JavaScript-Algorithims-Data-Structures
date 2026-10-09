
/* functon that will determine if the numbers in one array contain
 * the squared values of the numbers in a different array
 * runs on O(n) */
const same = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  // create and poplate 2 freequencyCounter objects with counts of each value
  let freequencyCounter1 = {};
  let freequencyCounter2 = {};
  for (let value of arr1) {
    freequencyCounter1[value] = (freequencyCounter1[value] || 0) + 1;
  }
  for (let value of arr2) {
    freequencyCounter2[value] = (freequencyCounter2[value] || 0) + 1;
  }
  for (let key in freequencyCounter1) {
    // check if the key of the value in object 1 exists in object 2
    if (!(key ** 2 in freequencyCounter2)) {
      return false;
    }
    // check if count of squared values on object 2 matches pre squared values in object 1
    if (freequencyCounter2[key ** 2] !== freequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

console.log(same([1, 2, 3, 2], [9, 1, 4, 4]));
console.log(same([1, 2, 3, 2], [9, 1, 4, 9]));