// LeetCode 46: Permutations (Medium) — Microsoft frequent flyer
//
// Given an array of DISTINCT integers, return all possible orderings.
//
//   [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//   [0,1]   → [[0,1],[1,0]]
//   [1]     → [[1]]
//
// Constraints: 1 <= nums.length <= 6, all values unique.
//
// ---- Pattern drill (~90 sec, out loud) — third rung of the family ----
//   1. Same skeleton as LC 17/78, ONE new dial. In 17 the options at each
//      level were fixed by the slot (KEYPAD[digits[slotIdx]]). Here, what
//      are the options at each level? Say it precisely: "everything I
//      haven't ____ yet." The pool SHRINKS as you descend.
//   2. Draw the tree for [1,2,3] before coding. Root has 3 branches, each
//      of those has 2, each of those has 1. Leaves = 6 = 3!.
//   3. The undo question finally gets the OTHER answer. In 17, string
//      concat made a fresh value per call — no undo needed. Here you'll
//      share ONE path array across calls. What two operations bracket the
//      recursive call? (This is the "backtrack" in backtracking — you've
//      never actually needed it until now.)
//   4. How do you know which values are still available? With n <= 6,
//      path.includes(x) is honest and fine. What would you reach for if
//      n were 20? (Say it, don't build it.)
//   5. Copy-at-leaf trap from LC 78 applies DOUBLE here — why is pushing
//      `path` itself catastrophic when you're also push/popping it?
//   6. Complexity out loud: n! leaves, each copied at cost n → O(n · n!).
//
// Target: ~15 lines, 20 min. This is the morning warm-up before the boss.

import { checkUnordered } from './helpers.ts';

const permute = (nums: number[]): number[][] => {
  // your code here
  return [];
};

// ---- tests ----

checkUnordered('LC ex1: [1,2,3]', permute([1, 2, 3]), [
  [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1],
]);
checkUnordered('LC ex2: [0,1]', permute([0, 1]), [[0, 1], [1, 0]]);
checkUnordered('LC ex3: single', permute([1]), [[1]]);
checkUnordered('4 values = 24 results', permute([1, 2, 3, 4]).map((p) => p.join('')),
  ['1234','1243','1324','1342','1423','1432',
   '2134','2143','2314','2341','2413','2431',
   '3124','3142','3214','3241','3412','3421',
   '4123','4132','4213','4231','4312','4321']);
