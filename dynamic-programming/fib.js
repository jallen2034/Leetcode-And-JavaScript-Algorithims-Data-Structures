/**
 * @param {number} inputNumber - The input number for which to build the Fibonacci sequence.
 * @param {number[]} fibArr - An array to store the Fibonacci sequence.
 * @param {number} curIdxFib1 - The index counter to keep track of the current position in the fibArr.
 * @param {number} curIdxFib2 - The index counter to keep track of the current position in the fibArr.
 * @returns void
 */
const buildMemoizedFibSeq = (
  inputNumber,
  fibArr,
  curIdxFib1,
  curIdxFib2
) => {
  if (inputNumber === 0) return;
  const addedVal = fibArr[curIdxFib1] +  fibArr[curIdxFib2]
  curIdxFib1 += 1, curIdxFib2 += 1, inputNumber -= 1;
  fibArr[curIdxFib2] = addedVal;
  buildMemoizedFibSeq( // recursively call this function and build our memoized fib array
    inputNumber,
    fibArr,
    curIdxFib1,
    curIdxFib2
  )
}

/**
 * @param {number} inputNumber
 * @return {number}
 */
const fib = (inputNumber) => {
  if (inputNumber === 0) return 0 // hande if it's 0
  const fibArr = [0, 1] // initialize arr with the first and second value to store the Fib seq as memoized value.
  let curIdxFib1= 0, curIdxFib2= 1; // Counter variable keep track of fib 1 and fib 2 in fibArr
  buildMemoizedFibSeq(
    inputNumber - 1,
    fibArr,
    curIdxFib1,
    curIdxFib2,
  );
  return fibArr[inputNumber]; // return last index of fibArr
};

// test cases
console.log(fib(0)); // Expected output: 0 (F(0) = 0)
console.log(fib(1)); // Expected output: 1 (F(1) = 1)
console.log(fib(2)); // Expected output: 1 (F(2) = F(1) + F(0) = 1 + 0 = 1)
console.log(fib(3)); // Expected output: 2 (F(3) = F(2) + F(1) = 1 + 1 = 2)
console.log(fib(4)); // Expected output: 3 (F(4) = F(3) + F(2) = 2 + 1 = 3)
console.log(fib(5)); // Expected output: 5 (F(5) = F(4) + F(3) = 3 + 2 = 5)
console.log(fib(6)); // Expected output: 8 (F(6) = F(5) + F(4) = 5 + 3 = 8)
console.log(fib(10)); // Expected output: 55 (F(10) = F(9) + F(8) = 34 + 21 = 55)
console.log(fib(15)); // Expected output: 610 (F(15) = F(14) + F(13) = 377 + 233 = 610
