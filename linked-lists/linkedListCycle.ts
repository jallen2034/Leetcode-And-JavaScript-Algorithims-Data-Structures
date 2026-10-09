// LeetCode 141: Linked List Cycle
// Return true if the linked list has a cycle (some node's .next points back to an earlier node).
// buildList's second argument is LeetCode's "pos": the last node points back to that index.

import { ListNode, buildList, check } from './helpers.ts';

function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (!fast) {
      return false;
    }

    if (fast === slow) {
      return true;
    }
  }

  return false;
}

// ---- tests ----

// Reproduces your LeetCode runtime error (smallest version of it)
//   1 → 2 → 3 → null      (no cycle, odd number of nodes)
check('no cycle, 3 nodes', hasCycle(buildList([1, 1, 1, 1], -1)), false);

// // LeetCode Example 1
// //   3 → 2 → 0 → -4
// //       ↑         │
// //       └─────────┘       (-4 points back to 2)
// check('example 1', hasCycle(buildList([3, 2, 0, -4], 1)), true);
//
// // LeetCode Example 2
// //   1 → 2
// //   ↑   │
// //   └───┘                 (2 points back to 1)
// check('example 2', hasCycle(buildList([1, 2], 0)), true);
//
// // LeetCode Example 3
// //   1 → null
// check('example 3', hasCycle(buildList([1], -1)), false);
//
// // Repeated values, no cycle
// //   5 → 1 → 5 → 1 → 5 → null
// check('repeated values, no cycle', hasCycle(buildList([5, 1, 5, 1, 5], -1)), false);
