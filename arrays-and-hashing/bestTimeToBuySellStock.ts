// LeetCode 121: Best Time to Buy and Sell Stock (Easy) — the most-asked
// easy in interviews, Microsoft included. Must be automatic.
//
// prices[i] = price on day i. Buy once, sell later, maximize profit.
// No profitable trade → 0.
//
//   [7,1,5,3,6,4] → 5   (buy at 1, sell at 6)
//   [7,6,4,3,1]   → 0   (only losses available)
//
// Constraints: 1 <= length <= 10^5, 0 <= price <= 10^4.
//
// ---- Speed drill (~30 sec) ----
//   1. One pass. Walking left to right, what TWO things do you track?
//      (Hint: "if I sold today, the best buy was ___")
//   2. Why does nested-loop O(n^2) get a frown even though it passes?
//   3. Trap: why can't you just do max(prices) - min(prices)? Which test
//      below kills that?
//
// Target: ~8 lines, 10 min.

import { check } from './helpers.ts';

const maxProfit = (prices: number[]): number => {
  let highestBuyFound: number = 0;

  let left: number = 0;
  let right: number = 1;

  while (right < prices.length) {
    const priceLeftPtr: number = prices[left];
    const priceRightPtr: number = prices[right];

    if (priceRightPtr < priceLeftPtr) {
      left = right;
      right = right + 1;
      continue;
    }

    const profit: number = priceRightPtr - priceLeftPtr;

    if (profit > highestBuyFound) {
      highestBuyFound = profit;
    }

    right += 1;
  }

  return highestBuyFound;
};

// ---- tests ----

check('LC ex1: [7,1,5,3,6,4]', maxProfit([7, 1, 5, 3, 6, 4]), 5);
check('LC ex2: all downhill', maxProfit([7, 6, 4, 3, 1]), 0);
check('min comes AFTER max: [5,10,1,2]', maxProfit([5, 10, 1, 2]), 5);
check('single day', maxProfit([3]), 0);
check('up, dup, down, deeper valley wins: [3,8,8,2,9,1,4]', maxProfit([3, 8, 8, 2, 9, 1, 4]), 7);
check('two days up', maxProfit([1, 100]), 99);
