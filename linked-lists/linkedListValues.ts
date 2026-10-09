// Structy: linked list values
// Given the head of a linked list, return an array of every node's value, in order.

import { ListNode, buildList, check } from './helpers.ts';

const linkedListValues = (head: ListNode<string> | null): string[] => {
  const values: any[] = [];
  let curr: ListNode<string> | null = head

  if (!curr) {
    return [];
  }

  while (curr) {
    const valAtNode: string = curr.val;
    values.push(valAtNode);
    curr = curr.next;
  }

  return values;
};

// ---- tests ----

// Structy test_00
//
//   a → b → c → d → null
//
check('test_00', linkedListValues(buildList(['a', 'b', 'c', 'd'])), ['a', 'b', 'c', 'd']);
