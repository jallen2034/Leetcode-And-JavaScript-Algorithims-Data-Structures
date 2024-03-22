/**
 * Picks the correct operator and performs the corresponding arithmetic operation.
 * @param {string} operator - The operator to perform the operation.
 * @param {number} firstVal - The first operand.
 * @param {number} secondVal - The second operand.
 * @returns {number} - The result of the arithmetic operation.
 */
const pickRightOperator = (operator, firstVal, secondVal) => {
  let calculatedValue

  switch (operator) {
    case "+":
      calculatedValue = firstVal + secondVal
      break
    case "-":
      calculatedValue = secondVal - firstVal // Corrected subtraction operation
      break
    case "*":
      calculatedValue = firstVal * secondVal
      break
    case "/":
      calculatedValue = Math.trunc(secondVal / firstVal) // Corrected division operation
      break
    case "^":
      calculatedValue = Math.floor(Math.pow(secondVal, firstVal))
      break
    default:
      console.error("Invalid operator:", operator)
  }

  return calculatedValue
}

/**
 * Evaluates the given Reverse Polish Notation (RPN) expression.
 * @param {string[]} tokens - An array of tokens representing the RPN expression.
 * @returns {number} - The result of the RPN expression evaluation.
 */
const evalRPN = function (tokens) {
  const stack = []

  for (let i = 0; i < tokens.length; i++) {
    const constCurrentValAsNumber = parseInt(tokens[i])

    if (Number.isInteger(constCurrentValAsNumber)) {
      stack.push(constCurrentValAsNumber)
    } else {
      // If it's an operator, pop two operands from the stack
      const firstVal = stack.pop()
      const secondVal = stack.pop() // Corrected the order of popping operands
      const operator = tokens[i]

      const calculatedValue = pickRightOperator(operator, firstVal, secondVal)
      stack.push(calculatedValue)
    }
  }

  // Return the final result from the stack
  return stack[0]
}

// Test cases

// Output: 9
// Explanation: ((2 + 1) * 3) = 9
const result1 = evalRPN(["2", "1", "+", "3", "*"])
console.log("result1: ", result1)

// // Output: 6
// // Explanation: (4 + (13 / 5)) = 6
const result2 = evalRPN(["4", "13", "5", "/", "+"])
console.log("result2: ", result2)

// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
//   = ((10 * (6 / (12 * -11))) + 17) + 5
//   = ((10 * (6 / -132)) + 17) + 5
//   = ((10 * 0) + 17) + 5
//   = (0 + 17) + 5
//   = 17 + 5
//   = 22
const result3 = evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
console.log("result3: ", result3)

