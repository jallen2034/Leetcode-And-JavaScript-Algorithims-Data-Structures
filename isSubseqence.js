/* Write a function called isSubsequence which takes in two strings and checks whether the characters in the 
 * first string form a subsequence of the characters in the second string. In other words, the function 
 * should check whether the characters in the first string appear somewhere in the second string, without their order changing
 * Your solution MUST have AT LEAST the following complexities:
 * Time Complexity - O(N + M)
 * Space Complexity - O(1) */
const isSubsequence = (firstString, secondString) => {
  let i = 0;
  let j = 0;
  while (j < secondString.length) {
    if (firstString[i] === secondString[j]) {
      if (firstString[i + 1] === undefined) {
        return true;
      } else {
        i++;
        j++;
      }
    } else {
      j++;
    }
  }
  return false;
}

console.log(isSubsequence('hello', 'hello world')); // true
console.log(isSubsequence('sing', 'sting')); // true
console.log(isSubsequence('abc', 'abracadabra')); // true
console.log(isSubsequence('abc', 'acb')); // false (order matters)
