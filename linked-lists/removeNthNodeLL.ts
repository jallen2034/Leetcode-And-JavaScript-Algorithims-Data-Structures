// LeetCode 19: Remove Nth Node From End of List
// Remove the nth node counting from the END of the list, and return the head.
import { ListNode, buildList, listToArray, check } from './helpers.ts';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let length: number = 0;
  let walker: ListNode | null = head;

  if (!walker) {
    return head;
  }

  while (walker) {
    length += 1;
    walker = walker.next;
  }

  const targetIndex: number = length - n;

  let curr: ListNode | null = head;
  let prev: ListNode | null = null;

  if (targetIndex === 0 && curr) {
    const nextNode: ListNode | null = curr.next;
    curr.next = null;
    return nextNode;
  }

  let idxOf2ndPass: number = 0;

  while (curr) {
    if (idxOf2ndPass === targetIndex) {
      const nextNode: ListNode | null = curr.next;
      curr.next = null;

      if (prev) {
        prev.next = nextNode;
      }

      return head;
    }

    prev = curr;
    curr = curr.next;
    idxOf2ndPass += 1;
  }

  return head;
}

// ---- tests ----

// LeetCode Example 1: remove from the middle
//   1 → 2 → 3 → 4 → 5,  n = 2  (2nd from the end is 4)
//   after: 1 → 2 → 3 → 5

check('example 1 (middle)', listToArray(removeNthFromEnd(buildList([1, 2, 3, 4, 5]), 2)), [1, 2, 3, 5]);

// Remove the HEAD (n equals the length of the list)
//   1 → 2 → 3,  n = 3  (3rd from the end is 1)
//   after: 2 → 3

check('remove head', listToArray(removeNthFromEnd(buildList([1, 2, 3]), 3)), [2, 3]);

// LeetCode Example 2: the only node
//   1,  n = 1
//   after: (empty)

check('only node', listToArray(removeNthFromEnd(buildList([1]), 1)), []);

// LeetCode Example 3: remove the TAIL
//   1 → 2,  n = 1  (1st from the end is 2)
//   after: 1

check('remove tail', listToArray(removeNthFromEnd(buildList([1, 2]), 1)), [1]);
