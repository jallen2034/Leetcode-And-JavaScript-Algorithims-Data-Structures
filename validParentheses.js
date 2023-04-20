/**
 * @return {boolean}
 * @param stack
 * @param closingParenthesis
 */
const checkParenthesesChars = function (stack, closingParenthesis) {
  const parenthesisMap = {
    ")": "(",
    "}": "{",
    "]": "["
  }
  let topElement = stack[stack.length - 1];
  if (topElement === parenthesisMap[closingParenthesis]) {
    return stack.pop(); // remove top element from stack, this is a valid parentheses
  }
  return false; // Otherwise Parenthesis is not valid
}

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const stack = [] // stack to keep track of the if parentheses is valid
  const openingParenthesesChars = ["(", "[", "{"];
  for (let char of s) {
    let isValid = true;
    if (openingParenthesesChars.includes(char)) {
      stack.push(char); // if valid opening parentheses, push it onto the stack
    }
    if (char === ")") { // if we encounter this closing parentheses
      isValid = checkParenthesesChars(stack, ")")
    }
    if (char === "]") { // if we encounter this closing parentheses
      isValid = checkParenthesesChars(stack, "]")
    }
    if (char === "}") { // if we encounter this closing parentheses
      isValid = checkParenthesesChars(stack, "}")
    }
    if (!isValid) {
      return false; // is not a valid parenthesis
    }
  }
  return true; // is valid parenthesis
};

// test strings
const strings = [
  {input: "()", expectedOutput: true},
  {input: "()[]{}", expectedOutput: true},
  {input: "(]", expectedOutput: false}
];

// test each string
for (let i = 0; i < strings.length; i++) {
  const {input, expectedOutput} = strings[i];
  const output = isValid(input);
  console.log(`Input: ${input}, Expected: ${expectedOutput}, Output: ${output}`);
}
