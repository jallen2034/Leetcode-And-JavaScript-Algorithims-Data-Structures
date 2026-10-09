/* Write a recursive function called flatten which accepts an array of
 * arrays and returns a new array with all values flattened. */
function flatten(array){
  let resultArr = [];
  function helper(helperInput) {
    for (const item in helperInput) {
      Array.isArray(helperInput[item]) ? 
      helper(helperInput[item]) : 
      resultArr.push(helperInput[item]);
    }
  }
  helper(array);
  return resultArr;
}

console.log(flatten([1, 2, 3, [4, 5] ])) // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]
console.log(flatten([[1],[2],[3]])) // [1,2,3]
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])) // [1,2,3]