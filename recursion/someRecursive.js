/* Write a recursive function called someRecursive which accepts 
 * an array and a callback. The function returns true if a single 
 * value in the array returns true when passed to the callback. 
 * Otherwise it returns false. */
const isOdd = val => val % 2 !== 0;

function someRecursive(arr, callback){
  let singleValTrue = false;
  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (callback(helperInput[helperInput.length - 1])) {
      singleValTrue = true;
      return;
    }
    helper(helperInput.slice(0, helperInput.length - 1))
  }
  helper(arr);
  return singleValTrue;
}

console.log(someRecursive([1,2,3,4], isOdd)) // true
console.log(someRecursive([4,6,8,9], isOdd)) // true
console.log(someRecursive([4,6,8], isOdd)) // false
console.log(someRecursive([4,6,8], val => val > 10)); // false