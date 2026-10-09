// Shared helpers for the linked list problems in this folder.
//
//   import { ListNode, buildList, listToArray, check } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

// [1, 2, 3] → 1 → 2 → 3 → null
// Pass pos >= 0 to point the LAST node back at the node at that index,
// creating a cycle (same as LeetCode's "pos" input for cycle problems).
export const buildList = <T>(values: T[], pos: number = -1): ListNode<T> | null => {
  if (values.length === 0) return null;

  const nodes = values.map((v) => new ListNode(v));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos >= 0) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
};

// 1 → 2 → 3 → null → [1, 2, 3]
// The guard stops the walk if the list has a cycle.
export const listToArray = <T>(head: ListNode<T> | null, guard: number = 5000): T[] => {
  const result: T[] = [];
  let current = head;

  while (current !== null && result.length < guard) {
    result.push(current.val);
    current = current.next;
  }

  return result;
};

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};