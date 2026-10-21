// LeetCode 39: Combination Sum (Medium) — Microsoft frequent flyer
//
// SEQUENCING RULE: this file unlocks AFTER hyperparameterGridSearch.ts is
// green. The boss is the revenge rep; this is dessert.
//
// Distinct positive integers `candidates` and a `target`. Return all unique
// combinations summing to target. The SAME number may be reused unlimited
// times. Any order.
//
//   [2,3,6,7], t=7 → [[2,2,3],[7]]
//   [2,3,5],   t=8 → [[2,2,2,2],[2,3,3],[3,5]]
//   [2],       t=1 → []
//
// Constraints: 1 <= candidates.length <= 30, 2 <= candidates[i] <= 40,
// all distinct, 1 <= target <= 40.
//
// ---- Pattern drill (~2 min, out loud) — fourth rung, THREE new dials ----
//   1. The tree is no longer fixed-depth. LC 17's base was "all slots
//      filled". What's the base here? (Hint: you're spending down a budget.
//      TWO stopping conditions — one records, one abandons. Say both.)
//   2. Reuse allowed: after choosing candidates[i], the recursive call
//      passes which start index — i, or i + 1? Why does that one character
//      control "can I pick the same number again"? (Compare: subsets
//      passed i + 1. Say what each choice MEANS, don't memorize.)
//   3. Uniqueness without a Set: why does "never look BACKWARD in
//      candidates" (start-index discipline) make [3,2,2] impossible while
//      [2,2,3] survives? This is the same trick keeping subsets dup-free.
//   4. What travels down each call: start index, remaining budget (or
//      running sum), shared path. Push/pop undo — same muscle as LC 46.
//   5. Prune out loud: when remaining goes negative, that whole subtree is
//      dead. Where's the earliest line that can kill it?
//
// Target: ~20 lines, 25 min. After LC 17 + 46 this is one new idea
// (budget-driven base case), not three.

import { checkUnordered } from './helpers.ts';

const combinationSum = (candidates: number[], target: number): number[][] => {
  const combos: any[] = [];
  const path: any[] = [];

  const walk = (start: number) => {
    const ACC_STAR_VAL: number = 0;

    const pathSum: any = path.reduce((acc, currentValue) => {
      return acc + currentValue
    }, ACC_STAR_VAL);

    if (pathSum === target) {
      const pathCopy: any[] = [ ...path ];
      combos.push(pathCopy);
      return;
    }

    if (pathSum > target) {
      return;
    }

    for (let i: number = start; i < candidates.length; i++) {
      const candidate: number = candidates[i];
      path.push(candidate);

      walk(i);

      path.pop();
    }
  }

  walk(0);

  return combos;
};

// ---- tests ----
// Combos are compared order-insensitively BOTH between combos and within
// one (each combo is sorted before comparing), so [3,2,2] == [2,2,3].

const norm = (combos: number[][]) => combos.map((c) => [...c].sort((a, b) => a - b));

checkUnordered('LC ex1: [2,3,6,7] t=7', norm(combinationSum([2, 3, 6, 7], 7)),
  norm([[2, 2, 3], [7]]));
checkUnordered('LC ex2: [2,3,5] t=8', norm(combinationSum([2, 3, 5], 8)),
  norm([[2, 2, 2, 2], [2, 3, 3], [3, 5]]));
checkUnordered('LC ex3: unreachable target', norm(combinationSum([2], 1)), []);
checkUnordered('single candidate exact multiple', norm(combinationSum([3], 9)),
  norm([[3, 3, 3]]));
checkUnordered('no reuse needed', norm(combinationSum([7, 3], 10)),
  norm([[3, 7]]));
