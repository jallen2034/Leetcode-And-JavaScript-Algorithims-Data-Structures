// LeetCode 322: Coin Change
//
// You are given an integer array `coins` representing coins of different
// denominations and an integer `amount` representing a total amount of money.
//
// Return the FEWEST number of coins that you need to make up that amount.
// If that amount of money cannot be made up by any combination of the coins, return -1.
//
// You may assume that you have an infinite number of each kind of coin.


const shortestCoinCombination = (
  target: number,
  coins: number[],
  memo: Map<number, number | null>
): any => {
  const cached = memo.get(target);

  if (cached === null) {
    return null;
  }

  if (cached) {
    return cached;
  }

  if (target === 0) {
    return 0;
  }

  if (target < 0) {
    return null;
  }

  let shortestCombination: number | null = null;

  for (const coinVal of coins) {
    const remainder: number = target - coinVal;
    const childResult: number | null = shortestCoinCombination(remainder, coins, memo);

    if (childResult === null) {
      continue;
    }

    if (shortestCombination === null || childResult < shortestCombination) {
      shortestCombination = childResult;
    }
  }

  if (typeof shortestCombination === 'number') {
    shortestCombination = shortestCombination + 1;
  }

  memo.set(target, shortestCombination);

  return shortestCombination;
}

function coinChange(coins: number[], amount: number): number {
  const memo = new Map<number, number | null>();

  const shortestCombination: number | null = shortestCoinCombination(amount, coins, memo);

  if (shortestCombination === 0) {
    return 0;
  }

  if (shortestCombination && shortestCombination > 0) {
    return shortestCombination;
  }

  return -1;
}

// ---- tests ----
const check = (label: string, actual: number, expected: number) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// ---- focus tests ----

// DRAW THIS ONE on paper. Small tree, clear repeated targets.
// The biggest coin first isn't always best: 4 + 1 + 1 uses 3 coins, but 3 + 3 uses 2
check('coins [1, 3, 4], amount 6', coinChange([1, 3, 4], 6), 2);

// Edge case: impossible
check('coins [2], amount 3', coinChange([2], 3), -1);

// Edge case: amount 0 needs no coins
check('coins [1], amount 0', coinChange([1], 0), 0);

// ---- later: uncomment once the focus tests pass ----

// LeetCode Example 1: 11 = 5 + 5 + 1
check('coins [1, 2, 5], amount 11', coinChange([1, 2, 5], 11), 3);

// Larger amount: 20 coins of 5
check('coins [1, 2, 5], amount 100', coinChange([1, 2, 5], 100), 20);

// A known tricky LeetCode test: large amount, awkward coin sizes.
// This one shows whether your memo is working.
check('coins [186, 419, 83, 408], amount 6249', coinChange([186, 419, 83, 408], 6249), 20);