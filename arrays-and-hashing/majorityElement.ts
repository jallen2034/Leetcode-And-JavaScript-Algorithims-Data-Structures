// LeetCode 169: Majority Element (Easy) — Microsoft frequent flyer
//
// The majority element appears MORE than n/2 times (guaranteed to exist).
// Return it.
//
//   [3,2,3]         → 3
//   [2,2,1,1,1,2,2] → 2
//
// Constraints: 1 <= length <= 5 * 10^4.
//
// ---- Speed drill (~60 sec) ----
//   1. Round 1: hashmap count, return the first key whose count passes
//      n/2. You can write this blind — do it in under 5 minutes.
//   2. Round 2, the follow-up they WILL ask: "now in O(1) space."
//      That's Boyer–Moore voting: carry a candidate and a counter.
//      Same value → +1, different → -1, counter hits 0 → crown the
//      current element and reset to 1. Why can the true majority never
//      be voted out permanently? (Intuition: every non-majority vote
//      cancels at most one majority vote, and majority has > half.)
//   3. Why does Boyer–Moore REQUIRE the majority to be guaranteed? What
//      extra pass fixes it when it isn't?
//
// Target: round 1 in 5 min, round 2 in 10. Write BOTH.

import { check } from './helpers.ts';



const majorityElementVoting = (nums: number[]): number => {
  let result: number = nums[0];
  let count: number =  0;

  for (const num of nums) {
    if (count === 0) {
      result = num;
      count += 1;
    } else if (num === result) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  return result;
};

// ---- tests ----

for (const [name, fn] of [
  ['voting', majorityElementVoting],
] as const) {
  check(`${name} — LC ex1: [3,2,3]`, fn([3, 2, 3]), 3);
  check(`${name} — LC ex2: [2,2,1,1,1,2,2]`, fn([2, 2, 1, 1, 1, 2, 2]), 2);
  check(`${name} — single`, fn([1]), 1);
  check(`${name} — majority at back: [1,2,2]`, fn([1, 2, 2]), 2);
}
