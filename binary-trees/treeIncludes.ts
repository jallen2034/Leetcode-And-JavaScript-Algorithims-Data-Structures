// tree includes (Structy, binary trees)
//
// Write a function, treeIncludes, that takes in the root of a binary tree
// and a target value. The function should return a boolean indicating
// whether or not the value is contained in the tree.

import { TreeNode, buildTree, check } from './helpers.ts';

function treeIncludes<T>(root: TreeNode<T> | null, target: T): boolean {
  const queue: any[] = []

  queue.push(root);

  while (queue.length > 0) {
    const dequeuedNode: any = queue.shift();

    if (dequeuedNode && dequeuedNode.val == target) {
      return true;
    }

    if (dequeuedNode && dequeuedNode.left) {
      queue.push(dequeuedNode.left);
    }

    if (dequeuedNode && dequeuedNode.right) {
      queue.push(dequeuedNode.right);
    }
  }

  return false;
}

// ---- tests ----

// test_00 (from the problem)
//       a
//     /   \
//    b     c
//   / \     \
//  d   e     f
const tree1 = buildTree(['a', 'b', 'c', 'd', 'e', null, 'f']);

// Bigger tree
//       a
//     /   \
//    b     c
//   / \     \
//  d   e     f
//     /
//    g
const tree2 = buildTree(['a', 'b', 'c', 'd', 'e', null, 'f', null, null, 'g']);

check('interior value', treeIncludes(tree1, 'e'), true);
check('root value', treeIncludes(tree1, 'a'), true);
check('missing value', treeIncludes(tree1, 'n'), false);
check('leaf value', treeIncludes(tree1, 'f'), true);
check('deepest value', treeIncludes(tree2, 'g'), true);
check('missing in bigger tree', treeIncludes(tree2, 'z'), false);
check('empty tree', treeIncludes(null, 'b'), false);
