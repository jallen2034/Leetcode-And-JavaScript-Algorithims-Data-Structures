/* Implement a function called, areThereDuplicates which accepts a variable 
 * number of arguments, and checks whether there are any duplicates among the 
 * arguments passed in.  You can solve this using the frequency counter pattern 
 * OR the multiple pointers pattern
 * Restrictions
 * Time - O(n)
 * Space - O(n) */
const checkForDuplicates = function (countOfDuplicatesInArr) {
  for (const [key, value] of Object.entries(countOfDuplicatesInArr)) {
    if (value > 1) {
      return true;
    }
  }
  return false;
}

const areThereDuplicates = function () {
  const arrayOfArgs = Array.from(arguments);
  const countOfDuplicatesInArr = {};
  for (let value of arrayOfArgs) {
    countOfDuplicatesInArr[value] = (countOfDuplicatesInArr[value] || 0) + 1
  }
  return checkForDuplicates(countOfDuplicatesInArr)
}

console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true