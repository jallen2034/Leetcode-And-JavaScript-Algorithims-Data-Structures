function isPalindrome(string) {
  let stringIsPalindrome = true;
  function helper(helperInput) {
    const firstLetter = helperInput[0];
    const lastLetter = helperInput[helperInput.length - 1];
    if (helperInput.length === 1) {
      return;
    }
    if (firstLetter !== lastLetter) {
      stringIsPalindrome = false;
      return;
    }
    helper(helperInput.slice(1, helperInput.length - 1));
  }
  helper(string);
  return stringIsPalindrome;
}

console.log(isPalindrome('awesome')) // false
console.log(isPalindrome('foobar')) // false
console.log(isPalindrome('tacocat')) // true
console.log(isPalindrome('amanaplanacanalpanama')) // true
console.log(isPalindrome('amanaplanacanalpandemonium')) // false