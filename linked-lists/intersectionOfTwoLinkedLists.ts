// LeetCode 160: Intersection of Two Linked Lists
// Given heads of two singly linked lists, return the NODE where they
// intersect, or null if they don't. Lists must keep their original structure.
//
// THE KEY IDEA TO SAY OUT LOUD FIRST: "intersect" means the SAME NODE OBJECT
// (same reference in memory), not the same value. Two nodes can both hold
// val=1 and not be an intersection. Everything follows from that.
//
// Approach ladder (state rung + complexity BEFORE typing):
//   Rung 1: O(m + n) time, O(m) space — walk list A storing something in a
//           Set, then walk B asking the Set a question. You used this exact
//           structure an hour ago on Set Matrix Zeroes.
//   Rung 2: O(m + n) time, O(1) space — the famous two-pointer trick.
//           Do rung 1 green first; rung 2 is a lovely "and to optimize..."
//
// Constraints: 1 <= m, n <= 3*10^4, no cycles anywhere.

import { ListNode, buildList, check } from './helpers.ts';
import {throttle} from "../web-interview-prep/js-fundamentals/throttle.ts";

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  const seenNodes = new Set<ListNode>();

  while (headA) {
    seenNodes.add(headA);
    headA = headA.next;
  }

  while (headB) {
    if (seenNodes.has(headB)) {
      return headB;
    }

    headB = headB.next;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------
// Builds two lists that physically SHARE their tail nodes (same objects),
// which is the only honest way to test this problem. The check compares
// node identity (===), not values.

const buildIntersecting = (
  prefixA: number[],
  prefixB: number[],
  shared: number[]
): { headA: ListNode | null; headB: ListNode | null; expected: ListNode | null } => {
  const sharedHead = buildList(shared);

  const attach = (prefix: number[]): ListNode | null => {
    const head = buildList(prefix);
    if (head === null) return sharedHead;
    let tail = head;
    while (tail.next !== null) tail = tail.next;
    tail.next = sharedHead;
    return head;
  };

  return { headA: attach(prefixA), headB: attach(prefixB), expected: sharedHead };
};

const checkNode = (
  label: string,
  actual: ListNode | null,
  expected: ListNode | null
): void => {
  const pass = actual === expected;
  console.log(
    `${pass ? 'PASS' : 'FAIL'} ${label}: got ${actual ? `node(${actual.val})` : 'null'}, expected ${expected ? `node(${expected.val})` : 'null'}`
  );
};

// LeetCode Example 1: A = [4,1] + [8,4,5], B = [5,6,1] + [8,4,5], meet at 8
{
  const { headA, headB, expected } = buildIntersecting([4, 1], [5, 6, 1], [8, 4, 5]);
  checkNode('example 1 (meet at 8)', getIntersectionNode(headA, headB), expected);
}

// LeetCode Example 2: A = [1,9,1] + [2,4], B = [3] + [2,4], meet at 2
{
  const { headA, headB, expected } = buildIntersecting([1, 9, 1], [3], [2, 4]);
  checkNode('example 2 (meet at 2)', getIntersectionNode(headA, headB), expected);
}

// No intersection at all — including DUPLICATE VALUES across the lists.
// The 1s below are different objects; a value-based solution dies here.
{
  const headA = buildList([2, 1, 4]);
  const headB = buildList([1, 5]);
  checkNode('no intersection, shared values', getIntersectionNode(headA, headB), null);
}

// Intersection at the very first node (both heads ARE the shared list)
{
  const { headA, headB, expected } = buildIntersecting([], [], [7, 8, 9]);
  checkNode('identical lists (meet at head)', getIntersectionNode(headA, headB), expected);
}

// Intersection at the very last node only
{
  const { headA, headB, expected } = buildIntersecting([1, 2, 3], [9], [42]);
  checkNode('meet at final node', getIntersectionNode(headA, headB), expected);
}

// Wildly different lengths (your capacity-1 habit, linked-list edition)
{
  const { headA, headB, expected } = buildIntersecting([1, 2, 3, 4, 5, 6, 7], [], [0]);
  checkNode('long A, B is just the shared node', getIntersectionNode(headA, headB), expected);
}

// Single-node lists, no intersection
{
  checkNode('two singletons, no meet', getIntersectionNode(buildList([1]), buildList([1])), null);
}

// ---------------------------------------------------------------------------
// HINTS — one at a time, only after you're genuinely stuck.
// ---------------------------------------------------------------------------
// Hint 1 (rung 1): on Set Matrix Zeroes you asked "is this NUMBER in the
//   set?" Here the question is "is this NODE in the set?" — a Set can hold
//   object references just as happily as numbers. Which list do you walk to
//   FILL the set, and which do you walk to ASK it?
//
// Hint 2 (rung 1): the moment the asking-walk gets a "yes", you're done —
//   return that node immediately. Why is the FIRST yes guaranteed to be the
//   intersection start and not some later shared node?
//
// Hint 3 (rung 2 direction): the only reason two aligned walkers DON'T meet
//   is that the lists have different lengths before the merge point. What
//   if each walker, upon hitting null, teleported to the head of the OTHER
//   list? How far has each one traveled by the time they're aligned?
//
// Hint 4 (rung 2, near-spoiler): walker A travels m + n steps to exhaust
//   both lists; walker B travels n + m. Same total. So after the teleport,
//   both are the same distance from the end — they now step in lockstep and
//   must meet at the intersection node, or BOTH reach null together (which
//   conveniently returns null for free). No length-counting needed.