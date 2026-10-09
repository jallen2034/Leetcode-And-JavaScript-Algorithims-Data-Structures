import { check } from './helpers.ts';

/**
 * TODO: implement this yourself.
 * prices[i] is the stock price on day i. Buy on one day and sell on a LATER
 * day to maximize profit. Return the best achievable profit, or 0 if no
 * profitable transaction is possible.
 */
function maxProfit(prices: number[]): number {
  let leftPtr = 0;
  let rightPtr = 1;

  let highestProfit: number = 0;

  while (rightPtr < prices.length) {
    const valLeft: number = prices[leftPtr];
    const valRight: number = prices[rightPtr];

    if (valRight < valLeft) {
      rightPtr += 1;
      leftPtr = rightPtr - 1;
    } else {
      const profit: number = Math.abs(valRight - valLeft);

      if (profit > highestProfit) {
        highestProfit = profit;
      }

      rightPtr += 1;
    }
  }

  // your algorithm goes here
  return highestProfit;
}

// ----- test scaffolding below, no need to touch this -----

const prices1 = [7, 1, 5, 3, 6, 4]; // example 1: buy at 1, sell at 6
const prices2 = [7, 6, 4, 3, 1];    // strictly descending: no profit possible
const prices3 = [1, 2, 3, 4, 5];    // strictly ascending: buy first, sell last
const prices4 = [5];                // single day: no transaction possible
const prices5 = [3, 2, 6, 1, 4];    // lowest price (1) comes AFTER the best sell (6)
const prices6 = [2, 4, 1, 7];       // best transaction uses a late dip
const prices7 = [3, 3, 3, 3];       // all equal: no profit

check('Test 1', maxProfit(prices1), 5);
check('Test 2', maxProfit(prices2), 0);
check('Test 3', maxProfit(prices3), 4);
check('Test 4', maxProfit(prices4), 0);
check('Test 5', maxProfit(prices5), 4);
check('Test 6', maxProfit(prices6), 6);
check('Test 7', maxProfit(prices7), 0);