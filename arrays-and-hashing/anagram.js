// function to determine if the two string counters contain matching values
const counterMatch = function(str1Counter, str2Counter) {
  for (let value in str1Counter) {
    if (str1Counter[value] !== str2Counter[value]) {
      return false;
    }
  }
  return true;
}

// function to determine if the second string is an anagram of the first
const validAnagram = function (str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  if (str1 === '' && str2 === '') {
    return true;
  }
  let str1Counter = {};
  let str2Counter = {};
  for (let value of str1) {
    str1Counter[value] = (str1Counter[value] || 0) + 1;
  }
  for (let value of str2) {
    str2Counter[value] = (str2Counter[value] || 0) + 1;
  }
  return counterMatch(str1Counter, str2Counter);
}

// run function
console.log(validAnagram('', '')); // true
console.log(validAnagram('aaz', 'zza')); // false
console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
console.log(validAnagram('awesome', 'awesom')); // false
console.log(validAnagram('qwerty', 'qeywrt')); // true
console.log(validAnagram('texttwisttime', 'timetwisttext')); // true