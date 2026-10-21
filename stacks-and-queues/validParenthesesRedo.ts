// LeetCode 20: Valid Parentheses (Easy) — Microsoft frequent flyer
// REDO 2026-10-20, speed rep. validParentheses.ts is round 1 — no peeking.
//
// String of only ()[]{}. Valid iff every opener is closed by the matching
// type in the correct order.
//
//   "()"     → true        "(]"  → false
//   "()[]{}" → true        "([)]" → false
//   "{[]}"   → true
//
// Constraints: 1 <= s.length <= 10^4.
//
// ---- Speed drill — this is a FLUENCY rep, not a learning rep ----
//   1. One sentence before coding: what goes ON the stack, and what do you
//      do when you meet a closer?
//   2. Three ways to fail — name them before writing tests in your head:
//      wrong type on top, closer with empty stack, leftovers at the end.
//      Each one is a test below.
//   3. Micro-flex: a map from closer → expected opener kills the triple
//      if-chain.
//
// Target: ~12 lines, 10 MINUTES. You've demonstrated stacks — this rep is
// about speed + narration, interview-eve confidence food.

import { check } from './helpers.ts';

const isValid = (s: string): boolean => {
  // your code here
  return false;
};

// ---- tests ----

check('LC ex1: "()"', isValid('()'), true);
check('LC ex2: "()[]{}"', isValid('()[]{}'), true);
check('LC ex3: "(]"', isValid('(]'), false);
check('interleaved: "([)]"', isValid('([)]'), false);
check('nested: "{[]}"', isValid('{[]}'), true);
check('fail mode — leftovers: "("', isValid('('), false);
check('fail mode — closer on empty: "]"', isValid(']'), false);
