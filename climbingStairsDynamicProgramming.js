const calculateAndFillStepsArr = (arr, left, right) => {
  if (left <= 0) { // Base case to break out of recursion if left pointer has gone out of bounds of the array
    return;
  }
  if (right === arr.length - 1) { // Check if our right pointer of our sliding window is on the last step
    arr[right] = 1; // The last step has only 1 potential path
    arr[left] = 1; // The second last step has only 1 potential path
  }
  const addedVal = arr[left] + arr[right]; // add the value of the left adn right step in our sliding window
  left -= 1; // Move both left and right pointers of sliding window to left 1 index
  right -= 1;
  arr[left] = addedVal;
  calculateAndFillStepsArr(arr, left, right);
}

/**
 * Dynamic programming solution to this problem using a bottom-up approach.
 * Note: The current implementation runs in O(n) time complexity.
 * @param {number} n - The target number of steps for the staircase.
 * @return {number} - The total number of distinct ways to climb the staircase.
 */
const climbStairs = (n) => {
  if (n === 0 || n === 1) return 1;
  const arr = Array(n + 1).fill(null);
  const left= n - 1;
  calculateAndFillStepsArr(arr, left, n); // right pointer is just n
  return arr[0];
};

// Test cases
console.log(climbStairs(0)); // Expected output: 1 (There's one way to climb 0 steps: by doing nothing)
console.log(climbStairs(1)); // Expected output: 1 (There's one way to climb 1 step: by taking 1 step)
console.log(climbStairs(2)); // Expected output: 2 (There are two ways to climb 2 steps: 1+1 or 2)
console.log(climbStairs(3)); // Expected output: 3 (There are three ways to climb 3 steps: 1+1+1, 1+2, 2+1)
console.log(climbStairs(4)); // Expected output: 5 (There are five ways to climb 4 steps: 1+1+1+1, 1+2+1, 2+1+1, 1+1+2, 2+2)
console.log(climbStairs(5)); // Expected output: 8 (There are 8 ways to climb 5 steps)
console.log(climbStairs(6)); // Expected output: 13 (There are thirteen ways to climb 6 steps)
console.log(climbStairs(35)); // Expected output: 14930352 (There are 14930352 ways to climb 35 steps)
