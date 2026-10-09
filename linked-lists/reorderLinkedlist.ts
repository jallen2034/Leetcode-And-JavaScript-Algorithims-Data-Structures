// LeetCode 143: Reorder List
// Reorder L0 → L1 → … → Ln  into  L0 → Ln → L1 → Ln-1 → …  in place.

import { ListNode, buildList, listToArray, check } from './helpers.ts';

const mergeListsAlternating = (
  head: ListNode | null,
  reversedSecondListHead: ListNode | null
) => {
  let mainListPtr = head;
  let secondListPtr = reversedSecondListHead;

  if (reversedSecondListHead === null) {
    return null;
  }

  while (mainListPtr !== null && secondListPtr !== null) {
    let mainListNext: ListNode | null = mainListPtr.next;
    let secondListNext: ListNode | null = secondListPtr.next;

    mainListPtr.next = secondListPtr;
    secondListPtr.next = mainListNext;

    mainListPtr = mainListNext;
    secondListPtr = secondListNext
  }
}

const reverseList = (head: ListNode | null) => {
  let prev = null;
  let current: ListNode | null = head;

  while (current !== null) {
    let nextTemp: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }

  return prev;
}

const findMiddle = (head: ListNode | null) => {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null && fast.next.next !== null && slow !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

const splitList = (midNode: ListNode | null) => {
  if (!midNode) {
    return null;
  }

  const secondHead: ListNode | null = midNode ? midNode.next : null;
  midNode.next = null

  return secondHead;
}

function reorderList(head: ListNode | null): void {
  const midNode: ListNode | null = findMiddle(head);
  const secondHead: ListNode | null = splitList(midNode);
  const reversedSecondListHead: ListNode | null = reverseList(secondHead);
  mergeListsAlternating(head, reversedSecondListHead);
}

// ---- tests ----

const list1 = buildList([1]);
const list2 = buildList([2, 4, 6, 8]);
const list3 = buildList([1, 2, 3, 4, 5, 6, 7, 8]);

reorderList(list1);
check('test 1', listToArray(list1), [1]);

reorderList(list2);
check('test 2', listToArray(list2), [2, 8, 4, 6]);

reorderList(list3);
check('test 3', listToArray(list3), [1, 8, 2, 7, 3, 6, 4, 5]);
