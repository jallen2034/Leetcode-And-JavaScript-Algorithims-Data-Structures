// LeetCode 1021: Remove Outermost Parentheses — RE-REP.
// (Round 1: removeOuterParentheses.ts, solved 2026-10-15. No peeking.)
//
// s is a valid parentheses string. Split it into its packages (primitives —
// chunks that only fully close at their own last char), peel the outer
// pair off each package, concatenate the guts.
//
//   "(()())(())" = "(()())" + "(())"  →  "()()" + "()"  =  "()()()"
//
// ---- Recall drill (before coding, ~2 min, out loud) ----
//   1. What's the running number called and what do +1/-1 on it?
//   2. What does the number hitting 0 mean?
//   3. Which two characters per package get dropped — how do you
//      recognize a "door" vs "furniture" while walking?
// If all three come back, code it — target: ONE pass, ~10 lines, 10 min.
// Stretch: this time use a bare counter, no stack array.

import { check } from './helpers.ts';

const removeOuterParentheses = (s: string): string => {
  throw new Error('not implemented');
};

// ---- tests ---- (the 3 LC examples — they cover everything)

// (()())(())  →  ()() + ()
check('LC ex1: two packages', removeOuterParentheses('(()())(())'), '()()()');

// (()())(())(()(()))  →  ()() + () + ()(())   — nested guts survive
check('LC ex2: nested guts survive', removeOuterParentheses('(()())(())(()(()))'), '()()()()(())');

// ()()  →  "" + ""   — bare pairs vanish
check('LC ex3: bare pairs vanish', removeOuterParentheses('()()'), '');
