/**
 * Generates all valid combinations of parentheses for a given number, n.
 * Utilizes a state space search with Depth-First Search (DFS) to explore all possible combinations.
 * @param {number} n - The number of pairs of parentheses.
 * @return {string[]} - An array containing all valid combinations of parentheses.
 */
const generateParenthesis = (n) => {
  const results = [] // Store valid combinations
  const stack = [] // Stack to track current combination being built

  // Recursive function to explore all possible combinations of parentheses
  const backTrack = (openCount, closeCount) => {

    // If the current combination is valid (balanced parentheses), add it to results
    if (openCount === closeCount && openCount === n && closeCount === n) {
      results.push(stack.join(''))
    }

    // If there are remaining open parentheses available, add an open parenthesis
    if (openCount < n) {
      stack.push("(")
      backTrack(openCount + 1, closeCount)
      stack.pop()
    }

    // If there are more open parentheses than closed ones, add a closed parenthesis
    if (closeCount < n && closeCount < openCount) {
      stack.push(")")
      backTrack(openCount, closeCount + 1)
      stack.pop()
    }
  }

  // Start the state space search from the initial state with no parentheses
  backTrack(0, 0)

  return results // Return the array of valid combinations
};

// Example usage:
const resultArray = generateParenthesis(3)
console.log("resultArray: ", resultArray)
