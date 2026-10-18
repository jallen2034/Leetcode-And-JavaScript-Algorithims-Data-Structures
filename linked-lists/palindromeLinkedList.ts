// LeetCode 234: Palindrome Linked List
//
// Given the head of a singly linked list, return true if the values read
// the same forwards and backwards, false otherwise.
//
//   [1,2,2,1] → true     [1,2] → false
//
// Constraints: 1 to 10^5 nodes, 0 <= val <= 9.
// Follow up: can you do it in O(n) time and O(1) SPACE?
//
// ---- The plan: two versions, in order ----
//
// VERSION 1 (get green first): copy values into an array, then check the
// array is a palindrome (two pointers walking inward). O(n) extra space.
// Ship it, run the tests, THEN level up.
//
// VERSION 2 (the follow-up — this is what interviewers actually want):
// O(1) space. You already own every piece of this, from problems in this
// exact folder:
//   piece 1: find the MIDDLE of a list        → fast/slow pointers
//            (you used these in linkedListCycle)
//   piece 2: REVERSE a list in place           → reverseLinkedList
//            (you've done this one twice)
//   piece 3: walk two lists in lockstep comparing vals
// Assembly order on paper first: where does each pointer start, what do
// you compare, and what does ODD length (a middle node that belongs to
// neither half) do to the comparison?
//
// Interview talking points:
//   - why does fast/slow find the middle? (fast moves 2x → when fast hits
//     the end, slow is halfway)
//   - odd vs even length: where does slow land in each case?
//   - (bonus etiquette) the O(1) version mangles the input list — worth
//     SAYING in an interview; restoring it is a second reverse.

import {buildList, check, type ListNode} from './helpers.ts';

const isPalindrome = (head: ListNode | null): boolean => {
  const valuesVisitedInList: number[] = [];

  while (head) {
    const valAtNode: number = head.val;
    valuesVisitedInList.push(valAtNode);
    head = head.next;
  }

  let leftPtr: number = 0;
  let rightPtr: number = valuesVisitedInList.length - 1;

  while (leftPtr < rightPtr) {
    if (valuesVisitedInList[leftPtr] !== valuesVisitedInList[rightPtr]) {
      return false;
    }

    leftPtr += 1;
    rightPtr -= 1;
  }

  return true;
};

const findMiddle = (head: ListNode): ListNode => {
  if (!head) {
    return head;
  }

  let beforeSlow: any = null;
  let slow: any = head;
  let fast: any = head;

  while (slow !== null && fast.next !== null) {
    beforeSlow = slow;
    slow = slow!.next

    if (!fast.next.next) {
      break
    }

    fast = fast.next.next;
  }

  return beforeSlow;
};

const reverseList = (head: ListNode | null): ListNode | null => {
  let prev: any = null;
  let curr: ListNode| null = head;

  while (curr !== null) {
    let nextNode: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  return prev;
};

const isPalindromeO1 = (head: ListNode | null): boolean => {
  if (!head) {
    return false;
  }

  const nodeBeforeNextList: ListNode = findMiddle(head);
  const secondListToReverse: ListNode | null = nodeBeforeNextList.next;

  nodeBeforeNextList.next = null;

  let reversedSecondHalfPtr: ListNode | null = reverseList(secondListToReverse);
  let origListPtr: ListNode | null = head

  while (origListPtr !== null && reversedSecondHalfPtr !== null) {
    if (origListPtr.val !== reversedSecondHalfPtr.val) {
      return false
    }

    origListPtr = origListPtr.next;
    reversedSecondHalfPtr = reversedSecondHalfPtr.next;
  }

  return true;
};

// ---- tests: V1 (array) ----

// -- the two LC examples --
check('LC ex1: [1,2,2,1] even palindrome', isPalindrome(buildList([1, 2, 2, 1])), true);
check('LC ex2: [1,2]', isPalindrome(buildList([1, 2])), false);
//
// // -- odd length: the middle node belongs to neither half --
check('[1,2,1] odd palindrome', isPalindrome(buildList([1, 2, 1])), true);
check('[1,2,3,2,2] near-palindrome', isPalindrome(buildList([1, 2, 3, 2, 2])), false);
//
// // -- single node: always a palindrome (constraints say min 1 node) --
check('[7] single node', isPalindrome(buildList([7])), true);
//
// // -- the sneaky one: first half matches, back half betrays it --
check('[1,2,2,1,1] uneven twin', isPalindrome(buildList([1, 2, 2, 1, 1])), false);
//
// // -- 8 nodes, even length, valid palindrome: both halves are full-size --
check('V1 [1,2,3,4,4,3,2,1] 8-node palindrome', isPalindromeO1(buildList([1, 2, 3, 4, 4, 3, 2, 1])), true);
//
// // ---- tests: V2 (O(1) space) — these FAIL until you build it ----
//
check('V2 [1,2,3,4,4,3,2,1] 8-node palindrome', isPalindromeO1(buildList([1, 2, 3, 4, 4, 3, 2, 1])), true);
check('V2 [1,2,2,1] even palindrome', isPalindromeO1(buildList([1, 2, 2, 1])), true);
check('V2 [1,2,1] odd palindrome', isPalindromeO1(buildList([1, 2, 1])), true);
check('V2 [1,2,3,4,5,3,2,1] 8-node impostor', isPalindromeO1(buildList([1, 2, 3, 4, 5, 3, 2, 1])), false);
