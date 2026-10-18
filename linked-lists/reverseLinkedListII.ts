// LeetCode 92: Reverse Linked List II (Medium)
//
// Given head of a singly linked list and 1-INDEXED positions left <= right,
// reverse ONLY the nodes from position left to position right. One pass
// is the goal.
//
//   [1,2,3,4,5], left=2, right=4  →  [1,4,3,2,5]
//   [5],         left=1, right=1  →  [5]
//
// Constraints: 1 <= n <= 500, -500 <= val <= 500, 1 <= left <= right <= n.
//
// ---- Paper first (~10 min) ----
// Draw [1,2,3,4,5] with left=2, right=4 and name the FOUR special nodes:
//
//     1    →    2  →  3  →  4    →    5
//     ↑         ↑           ↑         ↑
//   "before"  "start"     "end"    "after"
//   (pos 1)   (pos 2)    (pos 4)  (pos 5)
//
// After reversing the middle chunk, answer on paper:
//   - who does "before".next point to now?
//   - who does "start".next point to now? (hint: start became the chunk's TAIL)
// Those two reconnections are the entire difficulty. The reversal itself
// is your reverseLinkedList loop, just stopped early.
//
// ---- THE TRAP (why this is on every company's list) ----
// left = 1. Then there IS no "before" node — the reversed chunk's new head
// becomes the list's new head. You can special-case it with ifs... or you
// can glue a DUMMY NODE in front of the head, so position 0 always exists
// and "before" is ALWAYS a real node. One dummy, zero special cases.
// (Sound familiar? It's the sentinel trick from your LRU file, cashing in.)
//
// Interview talking points:
//   - why does the dummy node eliminate the left=1 branch?
//   - how do you find "before" without walking the list twice?
//   - what's O here? (one pass, O(1) space — say it before they ask)

import {buildList, ListNode, listToArray, check} from './helpers.ts';

const stitchChunk = (
  before: ListNode | null,
  chunkTail: ListNode | null,
  chunkHead: ListNode | null,
  after: ListNode | null
) => {
  before!.next = chunkHead;
  chunkTail!.next = after
}

const reverseChunk = (start: ListNode | null, length: number) => {
  let prev: any = null;
  let curr: ListNode | null = start;
  let counter: number = 0;

  while (counter <= length) {
    if (curr) {
      let next: ListNode | null = curr!.next;
      curr!.next = prev;
      prev = curr;
      curr = next;
      counter += 1;
    }
  }

  return {chunkHead: prev, chunkTail: start};
}

const reverseBetween = (
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null => {
  const dummy = new ListNode(0);
  dummy.next = head;

  let cursor: ListNode = dummy;

  for (let leftStep: number = 0; leftStep < left - 1; leftStep++) {
    cursor = cursor.next!;
  }

  const start: ListNode | null = cursor.next;
  let end: ListNode = dummy;

  for (let rightStep: number = 0; rightStep < right; rightStep++) {
    if (end.next) {
      end = end.next;
    }
  }

  const lenBetweenLeftAndRight: number = right - left;
  const after: ListNode | null = end.next;

  const {chunkHead, chunkTail} = reverseChunk(start, lenBetweenLeftAndRight);

  stitchChunk(cursor, chunkTail, chunkHead, after);

  return dummy.next;
};

// ---- tests ----
// 3 cases, each with a distinct paper-trace story:

// 1. The bread-and-butter: chunk in the MIDDLE, all four special nodes are
//    real nodes. Trace this one fully — every pointer, every arrow.
//
//    dummy → 1 → 2 → 3 → 4 → 5        left=2, right=4
//            ↑   ↑       ↑   ↑
//          before start end after
check(
  'LC ex1: reverse middle chunk',
  listToArray(reverseBetween(buildList([1, 2, 3, 4, 5]), 2, 4)),
  [1, 4, 3, 2, 5],
);

// 2. BOTH traps at once: left=1 (before = the dummy itself — this is the
//    case your dummy node exists for) AND right=n (after = null).
//    If this passes with the same code path as test 1, your dummy works.
//
//    dummy → 1 → 2 → 3 → null         left=1, right=3
//      ↑     ↑       ↑    ↑
//    before start   end  after(null)
check(
  'left=1 AND right=n: both seams are edge cases',
  listToArray(reverseBetween(buildList([1, 2, 3]), 1, 3)),
  [3, 2, 1],
);

// // 3. left === right: a one-node chunk. Reversing one node must change
// //    NOTHING — catches loops that run one step too many.
check(
  'LC ex2: single node, left === right',
  listToArray(reverseBetween(buildList([5]), 1, 1)),
  [5],
);
