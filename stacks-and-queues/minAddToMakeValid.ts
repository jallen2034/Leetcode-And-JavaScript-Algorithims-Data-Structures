// LeetCode 921: Minimum Add to Make Parentheses Valid (Medium)
// Microsoft's parentheses CLUSTER: 20, 32, 678, 921, 1021, 1111, 1541 are
// all tagged in the last 30 days. This is the cluster's best medium entry.
//
// String of only '(' and ')'. Return the MINIMUM number of insertions
// (anywhere) to make it valid.
//
//   "())"  → 1     "((("  → 3
//   "()"   → 0     "()))((" → 4
//
// Constraints: 1 <= s.length <= 1000.
//
// ---- Drill (~90 sec) — one new twist on LC 20 ----
//   1. LC 20 pushed openers on a stack. Notice: the stack only ever holds
//      '(' — so the entire stack collapses to WHAT? (This counter trick
//      unlocks half the cluster, including 678 and 1541.)
//   2. Walk the string with that counter. A ')' arrives when the counter
//      is 0 — what does that cost you? (Nothing on the stack can ever fix
//      it — why not? That's an insertion, count it and move on.)
//   3. End of string, counter is k > 0 — what does that cost?
//   4. Answer = (cost from 2) + (cost from 3). Convince yourself neither
//      can fix the other — an unmatched ')' is PAST, an unmatched '(' is
//      FUTURE.
//
// Target: ~12 lines, 15 min. Then say out loud how you'd pitch this as
// "LC 20's stack, compressed to an integer" — that sentence is the rep.

import { check } from './helpers.ts';

const minAddToMakeValid = (s: string): number => {
  // your code here
  return 0;
};

// ---- tests ----

check('LC ex1: "())"', minAddToMakeValid('())'), 1);
check('LC ex2: "((("', minAddToMakeValid('((('), 3);
check('already valid: "()"', minAddToMakeValid('()'), 0);
check('both kinds broken: "()))(("', minAddToMakeValid('()))(('), 4);
check('alternating broken: ")()("', minAddToMakeValid(')()('), 2);
check('nested valid: "(())"', minAddToMakeValid('(())'), 0);
