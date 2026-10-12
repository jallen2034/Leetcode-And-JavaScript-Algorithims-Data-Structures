// howSum (Alvin's DP course)
//
// Write a function `howSum(targetSum, numbers)` that takes in a targetSum and an
// array of numbers as arguments.
//
// The function should return an array containing any combination of elements that
// add up to exactly the targetSum. If there is no combination that adds up to the
// targetSum, then return null.
//
// If there are multiple combinations possible, you may return any single one.
//
// (Same rules as canSum: you can reuse any number as many times as you like,
// and all input numbers are nonnegative.)

function howSum(targetSum: number, numbers: number[], memo = new Map<number, number[] | null>()): number[] | null {
  const ifCachedSumArrFromMemo: number[] | null | undefined = memo.get(targetSum);

  if (ifCachedSumArrFromMemo === null) {
    return null;
  }

  if (ifCachedSumArrFromMemo) {
    return ifCachedSumArrFromMemo;
  }

  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  for (let number of numbers) {
    const remainder: number = targetSum - number;

    const resultFromChildAll: number[] | null = howSum(remainder, numbers, memo);

    if (resultFromChildAll !== null) {
      const resultCopyForMemo: number[] = [...resultFromChildAll, number];

      memo.set(targetSum, resultCopyForMemo);

      return resultCopyForMemo;
    }
  }

  memo.set(targetSum, null);

  return null;
}

// ---- tests ----
// Any valid combination is accepted, so instead of comparing to one exact answer,
// these tests check that the result adds up to the target and only uses allowed numbers.
const checkPossible = (label: string, targetSum: number, numbers: number[]) => {
  const result = howSum(targetSum, numbers);
  const sum = result ? result.reduce((total, n) => total + n, 0) : null;
  const onlyAllowed = result ? result.every((n) => numbers.includes(n)) : false;
  const pass = result !== null && sum === targetSum && onlyAllowed;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(result)} (should add up to ${targetSum})`);
};

const checkImpossible = (label: string, targetSum: number, numbers: number[]) => {
  const result = howSum(targetSum, numbers);
  const pass = result === null;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(result)}, expected null`);
};

// Small, possible: e.g. [3, 2, 2] or [2, 2, 3] (any order is fine)
checkPossible('howSum(7, [2, 3])', 7, [2, 3]);

// // Small, possible: e.g. [4, 3] or [7]
checkPossible('howSum(7, [5, 3, 4, 7])', 7, [5, 3, 4, 7]);
//
// // Small, impossible: 2 and 4 are even, so they can never make 7
checkImpossible('howSum(7, [2, 4])', 7, [2, 4]);

checkImpossible('howSum(9, [2, 4])', 9, [2, 4]);

checkPossible('howSum(9, [2, 4, 7])', 9, [2, 4, 7]);


// Large, impossible: shows whether your memo is working
checkImpossible('howSum(300, [7, 14])', 300, [7, 14]);