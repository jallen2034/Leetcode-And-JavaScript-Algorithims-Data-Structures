// function to ensure that the character entered is alphanumeric
const isAlphaNumeric = function (char) {
  if (char.match(/^[0-9a-z]+$/)) {
    return true;
  } else {
    return false;
  }
}

// write a function that can take in a string and count the amount of characters in it
const charCount = function (string) {
  const result = {};
  for (let char of string ) {
    if (isAlphaNumeric(char)) {
      char.toLowerCase();
      result[char] > 0 ? result[char] += 1 : result[char] = 1;
    }
  }
  return result;
}

// run and test code
const thirdResult = charCount("Your pin is 1234!");
console.log("firstResult: ", thirdResult);