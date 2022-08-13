/* Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
 * Your solution MUST have the following complexities:
 * Time: O(N) */
const counterMatch = (str1Counter, str2Counter) => {
  for (let value in str1Counter) {
    if (str1Counter[value] !== str2Counter[value]) {
      return false;
    }
  }
  return true;
}

const sameFrequency = (num1, num2) => {
  if (num1.toString().length !== num2.toString().length) {
    return false;
  }
  let num1String = num1.toString();
  let num2String = num2.toString();
  let str1Counter = {};
  let str2Counter = {};
  for (let value of num1String) {
    str1Counter[value] = (str1Counter[value] || 0) + 1;
  }
  for (let value of num2String) {
    str2Counter[value] = (str2Counter[value] || 0) + 1;
  }
  return counterMatch(str1Counter, str2Counter);
}

console.log(sameFrequency(182, 281)) // true
console.log(sameFrequency(34, 14)) // false 
console.log(sameFrequency(3589578, 5879385)) // true
console.log(sameFrequency(22, 222)) // false