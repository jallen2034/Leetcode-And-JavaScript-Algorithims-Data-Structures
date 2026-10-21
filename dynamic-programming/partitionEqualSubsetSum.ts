// LeetCode 416: Partition Equal Subset Sum (Medium) — Microsoft frequent flyer
//
// Can nums be split into two subsets with equal sums?
//
//   [1,5,11,5] → true   ([1,5,5] and [11])
//   [1,2,3,5]  → false
//
// Constraints: 1 <= nums.length <= 200, 1 <= nums[i] <= 100.
//
// ---- Drill (~3 min, out loud) — this one is a BRIDGE problem ----
//   1. Gate insight: if the two halves are equal, each sums to total/2.
//      What single O(n) check lets you return false before doing ANY real
//      work on half of all possible inputs?
//   2. Reframe out loud: you never need to build BOTH subsets. "Can I
//      partition?" collapses to "does any ONE subset sum to total/2?" —
//      why is finding one enough?
//   3. THE TRAP (walk into it deliberately, then out): you now have a
//      "does any subset sum to target" question, and you own a subsets
//      enumerator. Why do the constraints murder it? Do the math:
//      n = 200 → how many subsets? Say the number of digits out loud.
//      In the room, you SAY the brute force and its death sentence —
//      that's points — then upgrade.
//   4. The upgrade: your choose/skip tree revisits states. At any node,
//      the ONLY things that matter are (index, remaining). Two different
//      paths landing on the same (index, remaining) have identical
//      futures. What does that smell like? (You did this with gridTraveler
//      and canSum — THIS IS canSum's grown-up sibling.)
//   5. Bottom-up alternative, no recursion at all: keep a Set of every
//      sum reachable with items seen so far. Start {0}. Each num grows
//      the set how? When can you stop early?
//   6. Complexity: O(n · target) time — and target = sum/2 <= 10,000, so
//      ~2M steps, trivial. Bonus flex: this is called PSEUDO-polynomial —
//      polynomial in the VALUE of the input, not its length. Saying that
//      word correctly is senior-signal.
//
// Target: ~20 lines, 30 min. If it fights you past 45, STOP — that's the
// taper bell, not a failure. It'll be here Thursday.

import { check } from './helpers.ts';

const canPartition = (nums: number[]): boolean => {
  // your code here
  return false;
};

// ---- tests ----

check('LC ex1: [1,5,11,5]', canPartition([1, 5, 11, 5]), true);
check('LC ex2: [1,2,3,5]', canPartition([1, 2, 3, 5]), false);
check('odd total short-circuits', canPartition([1, 2, 4]), false);
check('single element never splits', canPartition([7]), false);
check('two equal elements', canPartition([4, 4]), true);
check('zero-ish trap: [1,1]', canPartition([1, 1]), true);
check('big flat input (perf check)', canPartition(Array(200).fill(100)), true);
check('big input, impossible by parity', canPartition([...Array(199).fill(100), 1]), false);
