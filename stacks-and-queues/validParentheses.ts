function isValid(s: string): boolean {
  const stack = [];
  const validPairs: string[] = ["{}", "[]", "()"];
  const openers: string[] = ["{", "(", "["];

  let index: number = 0;

  while (index < s.length) {
    if (stack.length === 0 && openers.includes(s[index])) {
      stack.push(s[index]);
      index += 1;

      continue;
    }

    const char: string = s[index];
    const stackTop: string = stack[stack.length - 1];

    const pair: string = stackTop + char;

    const bothAreOpeners: boolean =
      openers.includes(char) &&
      openers.includes(stackTop)

    if (!validPairs.includes(pair) && !bothAreOpeners) {
      return false;
    }

    if (validPairs.includes(pair)) {
      stack.pop();
      index += 1;
    } else {
      stack.push(s[index]);
      index += 1;
    }
  }

  return stack.length === 0;
}

// ==========================================
// TEST CASES
// ==========================================
  const testCases = [
    // {input: "()[]{}", expected: true},
    {input: "([])", expected: true},
    {input: "([)]", expected: false},
    {input: "{[]}", expected: true},
    {input: ")()", expected: false}, // Should catch invalid start
    {input: "(", expected: false},   // Unclosed bracket
    {input: "(())", expected: true}, // Same-type nesting — two opens in a row
    {input: "([])()", expected: true}, // Valid chars AFTER a close — stack must shrink
    {input: "]", expected: false},   // Lone closer
    {input: "((", expected: false}   // Only openers, never closed
  ];

  console.log("Running Test Cases:\n-------------------");

  testCases.forEach(({input, expected}, index) => {
    const result = isValid(input);
    const passed = result === expected;
    console.log(`Test ${index + 1}: input = "${input}" | expected = ${expected} | got = ${result} | ${passed ? "✅ PASS" : "❌ FAIL"}`);
  });