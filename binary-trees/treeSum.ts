// tree sum (Structy, binary trees)
//
// Write a function, treeSum, that takes in the root of a binary tree that
// contains number values. The function should return the total sum of all
// values in the tree.

import { TreeNode, buildTree, check } from './helpers.ts';

function treeSum(root: TreeNode<number> | null): number {
  let sum: number = 0;
  const stack: any[] = [];

  stack.push(root);

  while (stack.length > 0) {
    const poppedNode = stack.pop();

    if (poppedNode) {
      sum += poppedNode.val;
    }

    if (poppedNode && poppedNode.left) {
      stack.push(poppedNode.left);
    }

    if (poppedNode && poppedNode.right) {
      stack.push(poppedNode.right);
    }
  }

  return sum;
}

// ---- tests ----

// test_00 (from the problem)
//       3
//     /   \
//    11    4
//   / \     \
//  4   -2    1
const tree1 = buildTree([3, 11, 4, 4, -2, null, 1]);

// Bigger tree with negatives deeper down
//       1
//     /   \
//    6     0
//   / \     \
//  3   -6    2
//      /      \
//     2        1
const tree2 = buildTree([1, 6, 0, 3, -6, null, 2, null, null, 2, null, null, 1]);

// Lopsided tree (each node only has one child)
//  1
//   \
//    2
//   /
//  4
//   \
//    8
const tree3 = buildTree([1, null, 2, 4, null, null, 8]);

check('test_00', treeSum(tree1), 21);
check('bigger tree', treeSum(tree2), 9);
check('lopsided tree', treeSum(tree3), 15);
check('single node', treeSum(buildTree([5])), 5);
check('all negatives', treeSum(buildTree([-1, -2, -3])), -6);
check('empty tree', treeSum(null), 0);
