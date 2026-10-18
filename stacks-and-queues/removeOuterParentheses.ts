// LeetCode 1021: Remove Outermost Parentheses
//
// A valid parentheses string is "", "(" + A + ")", or A + B (concatenation),
// where A and B are valid parentheses strings.
//
// A valid string is PRIMITIVE if it's nonempty and CANNOT be split into
// A + B with both halves nonempty and valid. (Intuition: a primitive is one
// self-contained "balloon" — it only fully closes at its very last char.)
//
//   "(()())(())"  decomposes into primitives  "(()())" + "(())"
//
// Given a valid parentheses string s, strip the OUTERMOST pair off every
// primitive in its decomposition and return the concatenation.
//
//   "(()())(())" → "()()" + "()" → "()()()"
//
// Constraints: 1 <= s.length <= 10^5, s[i] is '(' or ')', s is valid.
//
// ---- Before you code (paper first, ~5 min) ----
// Walk "(()())(())" char by char and track ONE number: how deep inside
// parens are you right now? Write the depth under every character:
//
//     ( ( ) ( ) ) ( ( ) )
//     ?
//
// Then stare at your row of numbers and answer two questions:
//   1. How do you recognize the boundary where one primitive ends?
//   2. Which characters survive into the output — what do they all have
//      in common, in terms of that number?
// If you can answer those two, the code is a single pass and ~10 lines.
// You did validParentheses with a stack; notice what's different here —
// only ONE kind of bracket exists, so what did the stack collapse into?

import { check } from './helpers.ts';

const removeOuterParentheses = (string: string): string => {
  let result: string = "";
  const stack: string[] = [];

  for (let char of string) {
    if (stack.length === 0) {
      stack.push(char);
    } else {
      const valTopStack: string = stack[stack.length - 1];

      if (valTopStack !== char) {
        stack.pop();
      } else {
        stack.push(char);
      }

      if (stack.length > 0) {
        result += char;
      }
    }
  }

  return result
};

// ---- tests ----
// The 3 LC examples — between them they cover every behavior:
//   boundaries between packages, guts surviving verbatim (nesting included),
//   and bare pairs vanishing to nothing.
// Each test shows its PACKAGE BREAKDOWN:
//   line 1: the input, carved into primitives (└──┘ = one package)
//   line 2: each package peeled (first + last char snuffed, guts kept)
//   line 3: the guts glued back together = expected output

// The bread-and-butter case: find the boundary between two packages,
// peel each one separately.
//
// (()())(())          two packages
// └────┘└──┘
//  ()()   ()          peel each
// = "()()" + "()" = "()()()"
check('LC ex1: two packages', removeOuterParentheses('(()())(())'), '()()()');

// Guts pass through VERBATIM — P3 keeps its own inner nesting.
// Only the package's outermost layer comes off, never layer 2+.
//
// (()())(())(()(()))  three packages
// └────┘└──┘└──────┘
//  ()()   ()  ()(())
// = "()()" + "()" + "()(())" = "()()()()(())"
check('LC ex2: nested guts survive', removeOuterParentheses('(()())(())(()(()))'), '()()()()(())');

// The degenerate end: a bare pair IS a package, and peeling it leaves
// NOTHING — so the output can be shorter than you expect, even empty.
//
// ()()                two packages, each a bare pair
// └┘└┘
//  ∅  ∅
// = "" + "" = ""
check('LC ex3: bare pairs vanish', removeOuterParentheses('()()'), '');