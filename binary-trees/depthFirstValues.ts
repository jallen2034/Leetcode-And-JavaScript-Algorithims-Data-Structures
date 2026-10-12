// depth first values (Structy, binary trees)
//
// Write a function, depthFirstValues, that takes in the root of a binary tree.
// The function should return an array containing all values of the tree in
// depth-first order.

import { TreeNode, buildTree, check } from './helpers.ts';

const depthFirstValuesIterative = <T>(root: TreeNode<T> | null) => {
  const stack = [];
  const visited = [];

  stack.push(root);

  while (stack.length > 0) {
    const poppedNodeFromStack: any = stack.pop();

    if (poppedNodeFromStack) {
      visited.push(poppedNodeFromStack.val);
    }

    if (poppedNodeFromStack && poppedNodeFromStack.right) {
      stack.push(poppedNodeFromStack.right);
    }

    if (poppedNodeFromStack && poppedNodeFromStack.left) {
      stack.push(poppedNodeFromStack.left);
    }
  }

  return visited;
}

// expected ["a","b","d","e","c","f"]
function depthFirstValues<T>(root: TreeNode<T> | null, result: any = []): T[] {
  if (!root) {
    return [];
  }

  result.push(root.val);

  if (root.left) {
    depthFirstValues(root.left, result);
  }

  if (root.right) {
    depthFirstValues(root.right, result);
  }

  return result;
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

// Lopsided tree (each node only has one child)
//  a
//   \
//    b
//   /
//  c
//   \
//    d
const tree3 = buildTree(['a', null, 'b', 'c', null, null, 'd']);

check('test_00', depthFirstValuesIterative(tree1), ['a', 'b', 'd', 'e', 'c', 'f']);
check('bigger tree', depthFirstValuesIterative(tree2), ['a', 'b', 'd', 'e', 'g', 'c', 'f']);
check('single node', depthFirstValuesIterative(buildTree(['a'])), ['a']);
check('lopsided tree', depthFirstValuesIterative(tree3), ['a', 'b', 'c', 'd']);
check('empty tree', depthFirstValuesIterative<string>(null), []);
