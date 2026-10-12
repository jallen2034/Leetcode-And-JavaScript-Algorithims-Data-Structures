// breadth first values (Structy, binary trees)
//
// Write a function, breadthFirstValues, that takes in the root of a binary
// tree. The function should return an array containing all values of the
// tree in breadth-first order.

import { TreeNode, buildTree, check } from './helpers.ts';

function breadthFirstValues<T>(root: TreeNode<T> | null): T[] {
  const queue = [];
  const visited = [];

  queue.push(root);

  while (queue.length > 0) {
    const nodeDequeued: any = queue.shift();

    if (nodeDequeued) {
      visited.push(nodeDequeued.val);
    }

    if (nodeDequeued && nodeDequeued.left) {
      queue.push(nodeDequeued.left);
    }

    if (nodeDequeued && nodeDequeued.right) {
      queue.push(nodeDequeued.right);
    }
  }

  return visited;
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
//     /         <- g is deeper, so it comes LAST in breadth-first order
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

check('test_00', breadthFirstValues(tree1), ['a', 'b', 'c', 'd', 'e', 'f']);
check('bigger tree', breadthFirstValues(tree2), ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
check('single node', breadthFirstValues(buildTree(['a'])), ['a']);
check('lopsided tree', breadthFirstValues(tree3), ['a', 'b', 'c', 'd']);
check('empty tree', breadthFirstValues<string>(null), []);
