// LeetCode 90: Subsets II (Medium)
//
// UNLOCK RULE: after hyperparameterGridSearch.ts is green. No exceptions —
// the boss has been dodged three times and dessert comes after dinner.
//
// Like LC 78, but nums may contain DUPLICATES. Return the power set with
// no duplicate subsets, any order.
//
//   [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]
//   [0]     → [[],[0]]
//
// Constraints: 1 <= nums.length <= 10, -10 <= nums[i] <= 10.
//
// ---- Pattern drill (~90 sec, out loud) — fifth rung, ONE new dial ----
//   1. Run your LC 78 solution mentally on [1,2,2]. Which subset gets
//      produced TWICE, and by which two different paths? (Draw it — the
//      two 2s are different tree branches building the same set.)
//   2. The classic fix is two lines: SORT first, then inside the loop,
//      skip a candidate when it equals its left neighbor — but ONLY when
//      that neighbor was skipped at THIS level, not chosen above you.
//      The condition is `i > start && nums[i] === nums[i - 1]`. Don't
//      memorize it — answer: why `i > start` and not `i > 0`? What legal
//      subset does `i > 0` wrongly kill in [1,2,2]? (This is THE
//      interview follow-up.)
//   3. Why must you sort first for the neighbor-skip to work at all?
//   4. Everything else is LC 78 verbatim: record at every node, loop from
//      start, recurse i + 1, push/pop, copy at record time.
//
// Target: ~15 lines, 20 min. It's LC 78 + 2 lines — the thinking is all
// in drill question 2.

import { checkUnordered } from './helpers.ts';

const subsetsWithDup = (nums: number[]): number[][] => {
  const res: any[] = [];
  const subset: any[] = []

  const sortedNums: number[] = nums.sort((a: number, b: number) => a - b);

  const walk = (start: number) => {
    const subsetCopy: any[] = [ ...subset ];
    res.push(subsetCopy);

    for (let i: number = start; i < sortedNums.length; i++) {
      const valToPush: number = sortedNums[i];
      const prevValToCompare: number = sortedNums[i - 1]

      if (i > start && valToPush === prevValToCompare) {
        continue;
      }

      subset.push(valToPush);

      const neeIdxToExplore: number = i + 1;

      walk(neeIdxToExplore);

      subset.pop();
    }
  }

  walk(0);

  return res;
};

// ---- tests ----

const norm = (sets: number[][]) => sets.map((s) => [...s].sort((a, b) => a - b));

checkUnordered('LC ex1: [1,2,2]', norm(subsetsWithDup([1, 2, 2])),
  norm([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]));
checkUnordered('LC ex2: [0]', norm(subsetsWithDup([0])), norm([[], [0]]));
checkUnordered('all same: [2,2,2]', norm(subsetsWithDup([2, 2, 2])),
  norm([[], [2], [2, 2], [2, 2, 2]]));
checkUnordered('no dups behaves like LC 78: [1,2]', norm(subsetsWithDup([1, 2])),
  norm([[], [1], [2], [1, 2]]));
checkUnordered('unsorted input with dups: [2,1,2]', norm(subsetsWithDup([2, 1, 2])),
  norm([[], [1], [2], [1, 2], [2, 2], [1, 2, 2]]));
