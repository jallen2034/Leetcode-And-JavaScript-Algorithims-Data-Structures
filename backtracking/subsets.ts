// LeetCode 78: Subsets (Medium) — RUNG 1 of the backtracking ladder.
// Ladder: 78 (2 options/slot) → 17 (k options) → hyperparameterGridSearch (boss).
//
// Given unique ints, return all possible subsets (the power set). Any order.
//
//   [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
//   [0]     → [[],[0]]
//
// Constraints: 1 <= nums.length <= 10, all unique.
//
// ---- Pattern drill (~60 sec, out loud) ----
//   1. Slots & options: each ELEMENT is a slot, and its options are just
//      "in" or "out". A subset = one in/out decision per element. How many
//      results does that predict for 3 elements? (Check: 2·2·2.)
//   2. Same skeleton as the others: walk(i, chosenSoFar):
//      base at i === nums.length → record a COPY. Otherwise TWO recursive
//      calls instead of a for-loop: one that took nums[i], one that didn't.
//      (A 2-option slot doesn't need a loop — the two branches ARE the loop.)
//   3. If you use push/pop instead of building new arrays: what must happen
//      between the "include" call and the "exclude" call? (This is the
//      literal "backtrack" the pattern is named for.)
//   4. Complexity out loud: 2^n subsets, ·n to copy each → O(n · 2^n).
//
// Target: ~12 lines, 15 min. Then 17, then the boss.

import { checkUnordered } from './helpers.ts';


const subsets = (nums: number[]): number[][] => {
  const result: any[] = [];
  const subSet: any[] = [];

  const backTrack = (start: any) => {
    const subsetSnapshot: any[] = [...subSet];
    result.push(subsetSnapshot);

    for (let i = start; i < nums.length; i++) {
      const valAtIdx: number = nums[i];
      subSet.push(valAtIdx);

      const nextIdx: number = i + 1;

      backTrack(nextIdx);

      subSet.pop();
    }
  }

  backTrack(0);

  return result;
};

// ---- tests ----

checkUnordered('LC ex1: power set of [1,2,3]', subsets([1, 2, 3]), [
  [], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3],
]);
checkUnordered('LC ex2: single element', subsets([0]), [[], [0]]);
checkUnordered('two elements → 4 subsets', subsets([4, 7]), [[], [4], [7], [4, 7]]);
