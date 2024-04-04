/**
 * Finds the maximum profit that can be obtained by buying and selling stocks
 * @param {number[]} prices - An array of stock prices
 * @return {number} - The maximum profit
 */
const maxProfit = (prices) => {
  let maxProfit = 0
  let leftPointer = 0
  let rightPointer = 1

  while (rightPointer < prices.length) {
    // Calculate the profit between two tracked points
    const profitBetweenTwoTrackedPoints = prices[rightPointer] - prices[leftPointer]

    // Check if the profit between two tracked points is positive
    if (profitBetweenTwoTrackedPoints > 0) {

      // Update the maximum profit if the current profit is greater
      if (maxProfit < profitBetweenTwoTrackedPoints) {
        maxProfit = profitBetweenTwoTrackedPoints
      }
    } else {
      // Move the left pointer to the next element
      leftPointer += 1
    }

    // Check if a new lowest stock value is found. Update left pointer to the index of the new lowest value
    if (prices[rightPointer] < prices[leftPointer]) {
      leftPointer = rightPointer
    }

    // Move the right pointer to the next element
    rightPointer += 1
  }

  return maxProfit
}

const result1 = maxProfit([7,1,5,3,6,4]) // 5
const result2 = maxProfit([7,6,4,3,1]) // 0
const result3 = maxProfit([1, 2, 4, 2, 5, 7, 2, 4, 9, 0, 9]) // 9
console.log(result1)
console.log(result2)
console.log(result3)
