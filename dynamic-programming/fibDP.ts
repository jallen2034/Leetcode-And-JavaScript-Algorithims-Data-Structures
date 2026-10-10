// Dynamic programming warm-up: Fibonacci
// fib(1) = 1, fib(2) = 1, and every number after that is the sum of the two before it.
//
//   n:      1  2  3  4  5  6  7   8   9 ...
//   fib(n): 1  1  2  3  5  8  13  21  34 ...

// memoization.

function fibDP(n: number , memo = new Map<number, number>()): number {
  if (memo.get(n) !== undefined) {
    const cachedFib: number = memo.get(n)!;
    return cachedFib;
  }

  if (n < 2) {
     return n;
  }

  const leftBranchFib: number = fibDP(n - 1, memo);
  const rightBranchFib: number = fibDP(n - 2, memo);

  const currentFib: number = leftBranchFib + rightBranchFib;
  memo.set(n, currentFib);

  return currentFib;
}

const check = (label: string, actual: number, expected: number) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// A small one you can check by hand from the table above
check('fib(6)', fibDP(4), 3);
check('fib(6)', fibDP(5), 5);
check('fib(1)', fibDP(7), 13);
check('fib(1)', fibDP(8), 21);
check('fib(78)', fibDP(78), 8944394323791464);