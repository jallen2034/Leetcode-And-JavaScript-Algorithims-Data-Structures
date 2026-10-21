// LeetCode 21: Merge Two Sorted Lists (Easy) — Microsoft frequent flyer
// REDO 2026-10-20. mergeTwoSortedLists.js is round 1 — no peeking.
//
// Two sorted linked lists. Splice them into one sorted list and return it.
// Reuse the existing nodes — no new nodes except (maybe) one helper node.
//
//   [1,2,4] + [1,3,4] → [1,1,2,3,4,4]
//   []      + []      → []
//   []      + [0]     → [0]
//
// Constraints: 0 <= length <= 50, values in [-100, 100], both inputs sorted.
//
// ---- Recall drill (~60 sec, out loud) — the merge family, linked flavor ----
//   1. The invariant travels unchanged from LC 977/88: ___ commit, ___
//      pointer advance, per iteration. Who are the two candidates here?
//   2. LC 88 you filled from the back largest-first (the free space was
//      there). Lists have no "back" to fill — which direction and which
//      winner is natural here?
//   3. The drain is DIFFERENT from arrays, and better: when one list runs
//      out, you don't walk the survivor node by node. One assignment
//      finishes the job. Why does that work for lists but not arrays?
//   4. Starting a result list with no nodes yet means every append starts
//      with "is this the first node?" — unless you borrow a trick you just
//      drilled in LRU round 3. What's the trick, and what do you return
//      at the end? (Same sentinel idea, singly-linked, one dummy.)
//
// Target: O(m+n) time, O(1) space, ~15 lines, 15 min.
// Next rung after this: LC 23 (merge k — merge meets heaps, post-10-21).

import { buildList, listToArray, check, type ListNode } from './helpers.ts';

const mergeTwoLists = (
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null => {
  // your code here
  return null;
};

// ---- tests ----

check('LC ex1: [1,2,4] + [1,3,4]',
  listToArray(mergeTwoLists(buildList([1, 2, 4]), buildList([1, 3, 4]))),
  [1, 1, 2, 3, 4, 4]);
check('LC ex2: both empty',
  listToArray(mergeTwoLists(buildList([]), buildList([]))),
  []);
check('LC ex3: one empty',
  listToArray(mergeTwoLists(buildList([]), buildList([0]))),
  [0]);
check('no interleave needed: [1,2,3] + [4,5,6]',
  listToArray(mergeTwoLists(buildList([1, 2, 3]), buildList([4, 5, 6]))),
  [1, 2, 3, 4, 5, 6]);
check('drain case: [5] + [1,2,9,9]',
  listToArray(mergeTwoLists(buildList([5]), buildList([1, 2, 9, 9]))),
  [1, 2, 5, 9, 9]);
