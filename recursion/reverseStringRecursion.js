function reverse(string) {
  let result = [];
  function helper(helperInput) {
    if (result.length === string.length) {
      return;
    }
    result.push(helperInput[helperInput.length - 1]);
    helper(helperInput.slice(0, helperInput.length - 1))
  }
  helper(string);
  return result.join('');
}

console.log(reverse('awesome')) // 'emosewa'
console.log(reverse('hello')) // 'emosewa'
console.log(reverse('rithmschool')) // 'loohcsmhtir'