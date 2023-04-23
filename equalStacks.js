function equalStacks(h1, h2, h3) {
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;

  // Calculate the initial sums of each stack
  for (let i = 0; i < h1.length; i++) {
    sum1 += h1[i];
  }

  for (let i = 0; i < h2.length; i++) {
    sum2 += h2[i];
  }

  for (let i = 0; i < h3.length; i++) {
    sum3 += h3[i];
  }

  // Check if any of the stacks are empty. If so, return 0.
  if (sum1 === 0 || sum2 === 0 || sum3 === 0) {
    return 0;
  }

  // Keep track of the current index for each stack
  let i = 0;
  let j = 0;
  let k = 0;

  while (true) {
    // If the sum of all of our 3 stacks are all equal, return any sum since they are all the same
    if (sum1 === sum2 && sum2 === sum3) {
      return sum1;
    }

    // Determine which stack to remove from based on the maximum sum
    if (sum1 >= sum2 && sum1 >= sum3) {
      sum1 -= h1[i];
      i++;
    } else if (sum2 >= sum1 && sum2 >= sum3) {
      sum2 -= h2[j];
      j++;
    } else if (sum3 >= sum1 && sum3 >= sum2) {
      sum3 -= h3[k];
      k++;
    }

    // If any of the stacks are empty, return 0
    if (sum1 === 0 || sum2 === 0 || sum3 === 0) {
      return 0;
    }
  }
}

// Example usage
let h1 = [3, 2, 1, 1, 1];
let h2 = [4, 3, 2];
let h3 = [1, 1, 4, 1];

console.log(equalStacks(h1, h2, h3)); // Output: 5
