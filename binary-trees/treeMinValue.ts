// tree min value (Structy, binary trees)
//
// Write a function, treeMinValue, that takes in the root of a binary tree
// that contains number values. The function should return the minimum value
// within the tree.
//
// You may assume that the input tree is non-empty.

import { buildTree, check, TreeNode } from './helpers.ts';

// Recursive DFS post order.
function treeMinValue(root: TreeNode<number>): number {
  let minFoundBothChildren: number = Infinity;

  if (root.left) {
    const minFoundFromLeftNode: number = treeMinValue(root.left);

    if (minFoundFromLeftNode < minFoundBothChildren) {
      minFoundBothChildren = minFoundFromLeftNode;
    }
  }

  if (root.right) {
    const minFoundFromRightNode: number = treeMinValue(root.right);

    if (minFoundFromRightNode < minFoundBothChildren) {
      minFoundBothChildren = minFoundFromRightNode;
    }
  }

  if (minFoundBothChildren < root.val) {
    return minFoundBothChildren;
  } else {
    return root.val;
  }
}

// ---- tests ----

// test_00 (from the problem) — min is a NEGATIVE leaf
//       3
//     /   \
//    11    4
//   / \     \
//  4   -2    1
const tree1 = buildTree([3, 11, 4, 4, -2, null, 1])!;

// All positive, min buried at the deepest level
//       5
//     /   \
//    11    3
//   / \     \
//  4   14    12
//      /
//     1
const tree2 = buildTree([5, 11, 3, 4, 14, null, 12, null, null, 1])!;

// Min at the ROOT (easy to miss if you only look at leaves)
//      -1
//     /  \
//    4    7
const tree3 = buildTree([-1, 4, 7])!;

// Lopsided tree
//  8
//   \
//    2
//   /
//  9
//   \
//    4
const tree4 = buildTree([8, null, 2, 9, null, null, 4])!;

check('test_00', treeMinValue(tree1), -2);
check('min at deepest level', treeMinValue(tree2), 1);
check('min at root', treeMinValue(tree3), -1);
check('lopsided tree', treeMinValue(tree4), 2);
check('single node', treeMinValue(buildTree([42])!), 42);
