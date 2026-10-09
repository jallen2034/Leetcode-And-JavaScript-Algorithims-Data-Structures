// LeetCode 141: Linked List Cycle
// Two approaches: naive visited-list (memory hungry) vs Floyd's tortoise & hare.
// buildList's second argument is LeetCode's "pos": the last node points back to that index.

import { ListNode, buildList, check } from './helpers.ts';

const hasCycleAhhSloppy = (head: ListNode | null): boolean => {
  const vistedNodes: any = [];

  let currentNode: ListNode | null = head;

  while (currentNode !== null) {
    if (vistedNodes.includes(currentNode)) {
      return true;
    } else {
      vistedNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  }

  return false;
}

const hasCycleFloydPog = (head: ListNode | null): boolean => {
  let slowNode: ListNode | null = head;
  let fastNode: ListNode | null = head;

  while (fastNode != null && fastNode.next !== null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;

    if (slowNode === fastNode) {
      return true;
    }
  }

  return false;
}

// ---- tests ----

check('test 1', hasCycleFloydPog(buildList([3, 2, 0, -4], 1)), true);
check('test 2', hasCycleFloydPog(buildList([1, 2], 0)), true);
check('test 3', hasCycleFloydPog(buildList([1], -1)), false);
check('test 4', hasCycleFloydPog(buildList([], -1)), false);

const list5 = buildList(
  [-21, 10, 17, 8, 4, 26, 5, 35, 33, -7, -16, 27, -12, 6, 29, -12, 5, 9, 20, 14, 14, 2, 13, -24, 21, 23, -21, 5],
  -1
);

check('test 5', hasCycleFloydPog(list5), false);
