// LeetCode 206: Reverse Linked List
// Given the head of a singly linked list, reverse it and return the new head.

import { ListNode, buildList, listToArray, check } from './helpers.ts';

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  let prev = null;
  let curr = head;
  let next = curr.next;

  while (curr) {
    curr.next = prev;

    if (next) {
      prev = curr;
      curr = next;
      next = next.next
    } else {
      break;
    }
  }

  return curr;
}

// ---- tests ----

// Example 1
//   before: 1 → 2 → 3 → 4 → 5 → null
//   after:  5 → 4 → 3 → 2 → 1 → null
check('example 1', listToArray(reverseList(buildList([1, 2, 3, 4, 5]))), [5, 4, 3, 2, 1]);

// Example 2
//   before: 1 → 2 → null
//   after:  2 → 1 → null
check('example 2', listToArray(reverseList(buildList([1, 2]))), [2, 1]);

// Example 3: empty list
//   before: null
//   after:  null
check('empty list', listToArray(reverseList(buildList([]))), []);
