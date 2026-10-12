// bestSum (Alvin's DP course)
//
// Write a function `bestSum(targetSum, numbers)` that takes in a targetSum and an
// array of numbers as arguments.
//
// The function should return an array containing the SHORTEST combination of
// numbers that add up to exactly the targetSum.
//
// If there is a tie for the shortest combination, you may return any one of the
// shortest.
//
// (Same rules as canSum and howSum: you can reuse any number as many times as you
// like, all input numbers are nonnegative, and return null if it's impossible.)

function bestSum(targetSum: number, numbers: number[], memo = new Map<number, number[] | null>()): number[] | null {
  const valInMemo: number[] | null | undefined = memo.get(targetSum);

  if (valInMemo === null) {
    return null;
  }

  if (valInMemo) {
    return valInMemo;
  }

  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  let shortestChild: number[] | null = null;

  for (let number of numbers) {
    const remainder: number = targetSum - number;
    const childResult: number[] | null = bestSum(remainder, numbers, memo);

    if (childResult === null) {
      continue;
    }

    const candidate: number[] = [...childResult, number];

    if (shortestChild === null || candidate.length < shortestChild.length) {
      shortestChild = candidate;
    }
  }

  memo.set(targetSum, shortestChild);

  return shortestChild;
}

// ---- tests ----
// Ties are allowed, so these tests check that the result adds up to the target,
// only uses allowed numbers, AND is as short as the shortest possible answer.
const checkBest = (label: string, targetSum: number, numbers: number[], shortestLength: number) => {
  const result = bestSum(targetSum, numbers);
  const sum = result ? result.reduce((total, n) => total + n, 0) : null;
  const onlyAllowed = result ? result.every((n) => numbers.includes(n)) : false;
  const pass = result !== null && sum === targetSum && onlyAllowed && result.length === shortestLength;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(result)} (should add up to ${targetSum} using ${shortestLength} number(s))`);
};

const checkImpossible = (label: string, targetSum: number, numbers: number[]) => {
  const result = bestSum(targetSum, numbers);
  const pass = result === null;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(result)}, expected null`);
};

// Small, good for drawing on paper.
// Valid answers include [2, 2, 2, 2], [2, 3, 3], [3, 5] ... the shortest is [3, 5] (2 numbers)

checkBest('bestSum(8, [2, 3, 5])', 8, [2, 3, 5], 2);

// The answer is a single number: [7]
checkBest('bestSum(7, [5, 3, 4, 7])', 7, [5, 3, 4, 7], 1);

// Valid answers include [5, 1, 1, 1], [4, 1, 1, 1, 1] ... the shortest is [4, 4] (2 numbers)
checkBest('bestSum(8, [1, 4, 5])', 8, [1, 4, 5], 2);

// Impossible: 2 and 4 are even, so they can never make 7
checkImpossible('bestSum(7, [2, 4])', 7, [2, 4]);

// Large: shortest is [25, 25, 25, 25]. This one shows whether your memo is working.
checkBest('bestSum(100, [1, 2, 5, 25])', 100, [1, 2, 5, 25], 4);