// LeetCode 2: Add Two Numbers
// Each list is a number with its digits stored in REVERSE order (ones digit first).
// Return the sum as a new list, also in reverse order.
import { ListNode, buildList, listToArray, check } from './helpers.ts';

const splitNum = (number: number) => {
  const digit: number = number % 10;
  const carry: number = Math.floor(number / 10);
  return { digit, carry }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let l1Ptr: ListNode | null = l1;
  let l2Ptr: ListNode | null = l2;

  let result: ListNode | null = null;
  let resultHeadPtr: ListNode | null = result;

  let valToCarryIteration: number | null = null;

  while (l1Ptr || l2Ptr || valToCarryIteration) {
    const valAtl1Ptr: number = l1Ptr?.val ?? 0;
    const valAtL2Prt: number = l2Ptr?.val ?? 0;

    let sumTwoVals: number = valAtl1Ptr + valAtL2Prt;

    if (valToCarryIteration) {
      sumTwoVals += valToCarryIteration;
      valToCarryIteration = null; // Reset the carry.
    }

    const { digit, carry } = splitNum(sumTwoVals);

    let nextNode;

    if (sumTwoVals >= 10) {
      nextNode = new ListNode(digit);
      valToCarryIteration = carry;
    } else {
      nextNode = new ListNode(sumTwoVals);
    }

    // Case when the new list we're building doesn't exist yet.
    if (resultHeadPtr === null) {
      resultHeadPtr = nextNode;
      result = nextNode;
    } else {
      resultHeadPtr.next = nextNode;
      resultHeadPtr = resultHeadPtr.next;
    }

    // Advance pointers on original 2 LLs.
    l1Ptr = l1Ptr?.next ?? null;
    l2Ptr = l2Ptr?.next ?? null;
  }

  return result;
}

// ---- tests ----

// Second list is LONGER (existing tests only have the first one longer)
//   l1: 3       means 3
//   l2: 1 → 2   means 21
//   3 + 21 = 24 → stored as 4 → 2
check('second list longer', listToArray(addTwoNumbers(buildList([3]), buildList([1, 2]))), [4, 2]);

// Single digits whose sum needs a NEW node
//   5 + 5 = 10 → stored as 0 → 1
check('single digits, new node', listToArray(addTwoNumbers(buildList([5]), buildList([5]))), [0, 1]);

// A carry that ripples through several digits
//   l1: 9 → 9   means 99
//   l2: 1       means 1
//   99 + 1 = 100 → stored as 0 → 0 → 1
check('carry ripples', listToArray(addTwoNumbers(buildList([9, 9]), buildList([1]))), [0, 0, 1]);

// A number too big for a normal JavaScript number (lists can be up to 100 digits)
//   l1: 1, then 30 zeros, then 1   means 10^31 + 1  (32 digits)
//   l2: 5 → 6 → 4                  means 465
//   sum = 10^31 + 466 → stored as 6 → 6 → 4 → (28 zeros) → 1
check('too big for Number',
  listToArray(addTwoNumbers(
    buildList([1, ...Array(30).fill(0), 1]),
    buildList([5, 6, 4]),
  )),
  [6, 6, 4, ...Array(28).fill(0), 1]);

// From NeetCode's drawing: first list longer, carry in the middle
//   l1: 2 → 4 → 3 → 3   means 3342
//   l2: 5 → 6 → 4       means 465
//   3342 + 465 = 3807 → stored as 7 → 0 → 8 → 3
check('neetcode example', listToArray(addTwoNumbers(buildList([2, 4, 3, 3]), buildList([5, 6, 4]))), [7, 0, 8, 3]);