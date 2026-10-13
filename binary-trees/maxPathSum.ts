// max root to leaf path sum (Structy, binary trees)
// https://structy.net/problems/max-root-to-leaf-path-sum

// Write a function, maxPathSum, that takes in the root of a binary tree
// that contains number values. The function should return the maximum sum
// of any root to leaf path within the tree.
//
// You may assume that the input tree is non-empty.
import { TreeNode, buildTree, check } from './helpers.ts';

interface PathSnapshot {
  node: TreeNode,
  pathSum: number
}

function maxPathSum(root: TreeNode<number>): number {
  let best: number = -Infinity;

  const initialRootSnapshot: PathSnapshot = {
    node: root,
    pathSum: root.val
  }

  const stack: PathSnapshot[] = [];
  stack.push(initialRootSnapshot);

  while (stack.length > 0) {
    const { node, pathSum }: PathSnapshot = stack.pop()!;

    if (!node.left && !node.right) {
      best = Math.max(best, pathSum);
    }

    if (node.right) {
      const rightNodeSnapshot: PathSnapshot = {
        node: node.right,
        pathSum: pathSum + node.right.val
      }

      stack.push(rightNodeSnapshot);
    }

    if (node.left) {
      const leftNodeSnapshot: PathSnapshot = {
        node: node.left,
        pathSum: pathSum + node.left.val
      }

      stack.push(leftNodeSnapshot);
    }
  }

  return best;
}

// ---- tests ----

// test_00 (from the problem) — best path: 3 → 11 → 4 = 18
//       3
//     /   \
//    11    4
//   / \     \
//  4   -2    1
const tree1 = buildTree([3, 11, 4, 4, -2, null, 1])!;

// Deeper tree — the SHORT path wins: 5 → 54 = 59
//        5
//     /    \
//    11     54
//   /  \
//  20   15
//      /  \
//     1    3
const tree2 = buildTree([5, 11, 54, 20, 15, null, null, null, null, 1, 3])!;

// All negatives — a path must end at a LEAF, you can't bail out early.
// Paths: -1 → -2 → -4 = -7 and -1 → -3 = -4, so the answer is -4.
//      -1
//     /  \
//   -2    -3
//     \
//     -4
const tree3 = buildTree([-1, -2, -3, null, -4])!;

// Lopsided chain of negatives — only ONE path exists: -5 → -3 = -8
//  -5
//    \
//    -3
const tree4 = buildTree([-5, null, -3])!;

check('test_00', maxPathSum(tree1), 18);
check('short path wins', maxPathSum(tree2), 59);
check('all negatives', maxPathSum(tree3), -4);
check('lopsided negatives', maxPathSum(tree4), -8);
check('single node', maxPathSum(buildTree([42])!), 42);
