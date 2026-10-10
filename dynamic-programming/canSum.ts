// canSum (Alvin's DP course)
// Can you add up numbers from `numbers` to reach exactly `targetSum`?
// You can reuse any number as many times as you like. All numbers are nonnegative.
// https://youtu.be/oBt53YbR9Kk?si=qA0TJjBtVLjk9oq4&t=4198

function canSum(targetSum: number, numbers: number[], memo = new Map<number, boolean>()): boolean {
  const cachedFlagForThisTarget: boolean | undefined = memo.get(targetSum);

  if (cachedFlagForThisTarget !== undefined) {
    return cachedFlagForThisTarget;
  }

  if (targetSum < 0) {
    return false;
  }

  if (targetSum === 0) {
    return true;
  }

  let canSumFromChild: boolean = false;

  for (const number of numbers) {
    const remainingTarget: number = targetSum - number;
    const canSumRemaining: boolean = canSum(remainingTarget, numbers, memo);

    if (canSumRemaining) {
      canSumFromChild = true;
    }
  }

  memo.set(targetSum, canSumFromChild);
  return canSumFromChild;
}

// ---- tests ----
const check = (label: string, actual: boolean, expected: boolean) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// Small, possible:   7 = 2 + 2 + 3
check('canSum(7, [5, 3, 4, 7])', canSum(7, [5, 3, 4, 7]), true);

// // // Small, impossible: 2 and 4 are both even, so they can never add up to 7
check('canSum(7, [2, 4])', canSum(7, [2, 4]), false);
// //
// // // Large, impossible: the one that shows whether your memo is working
check('canSum(300, [7, 14])', canSum(300, [7, 14]), false);