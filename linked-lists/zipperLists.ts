// Structy: zipper lists
// Zip two linked lists together by alternating nodes, starting with head1.
// If one list is longer, the result ends with its remaining nodes.
// Do it in place by changing the .next pointers. Both lists are non-empty.

import { ListNode, buildList, listToArray, check } from './helpers.ts';

type Node = ListNode<string>;

const zipperLists = (head1: Node, head2: Node): Node => {
  if (!head1.next && !head2.next) {
    head1.next = head2;
    return head1;
  }

  let list1Ptr = head1;
  let list2Ptr = head2;

  while (list1Ptr && list2Ptr) {
    if (list1Ptr.next && list2Ptr.next) {
      const tempNextPtrList1 = list1Ptr.next;
      const tempNextPtrList2 = list2Ptr.next;

      list1Ptr.next = list2Ptr;
      list2Ptr.next = tempNextPtrList1;

      list1Ptr = tempNextPtrList1;
      list2Ptr = tempNextPtrList2;
    } else if (list1Ptr.next && !list2Ptr.next && list2Ptr) {
      const tempNextPtrList1 = list1Ptr.next;

      list1Ptr.next = list2Ptr;
      list2Ptr.next = tempNextPtrList1;
      break;
    } else if (list2Ptr.next && !list1Ptr.next && list1Ptr) {
      list1Ptr.next = list2Ptr;
      break;
    } else if (!list1Ptr.next && !list2Ptr.next) {
      list1Ptr.next = list2Ptr;
      break;
    }
  }

  return head1;
};

// ---- tests ----

// Both lists are non-empty, so buildList never returns null here (hence the `!`).
const run = (list1: string[], list2: string[]) =>
  listToArray(zipperLists(buildList(list1)!, buildList(list2)!));

// check('longer list 1, 4 zips',
//   run(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], ['q', 'r', 's', 't']),
//   ['a', 'q', 'b', 'r', 'c', 's', 'd', 't', 'e', 'f', 'g', 'h']);
//
// // Smallest case: one node each
// //   result: a → x
// check('one node each', run(['a'], ['x']), ['a', 'x']);

check('same length, 2 each', run(['a', 'b'], ['x', 'y']), ['a', 'x', 'b', 'y']);
