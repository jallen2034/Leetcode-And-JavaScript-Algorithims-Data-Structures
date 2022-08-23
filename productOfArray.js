/* Write a function called productOfArray which takes in an 
 * array of numbers and returns the product of them all. */
const productOfArray = (array) => {
  let arrayIndexNextNumber = array.length - 2;
  let product = array[array.length - 1];
  const helper = (helperInput, arrayIndexHelper) => {
    if (arrayIndexHelper < 0) {
      return;
    }
    product *= helperInput[arrayIndexHelper];
    helper(helperInput, arrayIndexHelper - 1);
  }
  helper(array, arrayIndexNextNumber);
  return product;
}

console.log(productOfArray([1,2,3])); // 6
console.log(productOfArray([1,2,3,10])); // 60