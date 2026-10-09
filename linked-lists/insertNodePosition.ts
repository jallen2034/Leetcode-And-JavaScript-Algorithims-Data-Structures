// HackerRank: Insert a node at a specific position in a linked list
// Create a new node holding `data`, insert it at `position` (0 = new head),
// and return the head of the updated list.
// (HackerRank's node class uses `.data`; here we use the shared ListNode's `.val`.)

import { ListNode, buildList, listToArray, check } from './helpers.ts';

function insertNodeAtPosition(llist: ListNode, data: number, position: number): ListNode {
  let positionCounterNxt: number = 0;
  let insertionInProgress: boolean = true;

  let prevPtr: ListNode | null = null;
  let currPtr: ListNode = llist;

  // Handle case we want to insert it at position 0 then bail.
  if (position === 0) {
    const node = new ListNode(data);
    node.next = llist;
    return node;
  }

  while (insertionInProgress) {
    if (currPtr.next) {
      prevPtr = currPtr;
      currPtr = currPtr.next;
      positionCounterNxt += 1;

      if (position === positionCounterNxt) {
        const node = new ListNode(data);
        node.next = currPtr;
        prevPtr.next = node;
        insertionInProgress = false;
      }
    }
  }


  return llist;
}

// ---- tests ----

const run = (values: number[], data: number, position: number) =>
  listToArray(insertNodeAtPosition(buildList(values)!, data, position));

// HackerRank sample: insert in the middle
//   before: 16 → 13 → 7
//   insert 1 at position 2
//   after:  16 → 13 → 1 → 7
check('middle (sample)', run([16, 13, 7], 1, 2), [16, 13, 1, 7]);

// Insert at the front
//   before: 5 → 6
//   insert 9 at position 0
//   after:  9 → 5 → 6       (the head changes!)
check('front', run([5, 6], 9, 0), [9, 5, 6]);

// Insert at the very end
//   before: 1 → 2 → 3
//   insert 4 at position 3
//   after:  1 → 2 → 3 → 4
check('end', run([1, 2, 3], 4, 3), [1, 2, 3, 4]);
