// 701. Insert into a Binary Search Tree (LeetCode, medium)
//
// You are given the root node of a binary search tree (BST) and a value to
// insert into the tree. Return the root node of the BST after the insertion.
// It is guaranteed that the new value does not exist in the original BST.
//
// Note: multiple valid answers exist. These tests expect the STANDARD
// leaf insertion: walk down comparing values until you fall off the tree,
// and attach the new node there. (That's the answer LeetCode shows too.)

import { TreeNode, buildTree, treeToArray, check } from './helpers.ts';

const insertNode = (
  root: TreeNode | null,
  val: number,
): TreeNode => {
  if (!root) {
    const newNode = new TreeNode(val);
    return newNode;
  }

  const directionToMove: string = val > root.val ? 'right' : 'left';

  if (directionToMove === 'right' && root.right) {
    return insertNode(root.right, val);
  }

  if (directionToMove === 'left' && root.left) {
    return insertNode(root.left, val);
  }

  if (directionToMove === 'right' && !root.right) {
    const newNode = new TreeNode(val);
    root.right = newNode;
  }

  if (directionToMove === 'left' && !root.left) {
    const newNode = new TreeNode(val);
    root.left = newNode;
  }

  return root;
}

function insertIntoBST(
  root: TreeNode | null,
  val: number,
): TreeNode | null {
  const originalRoot: TreeNode | null = root;
  const newRoot: TreeNode | null = insertNode(root, val);

  if (!root) {
    return newRoot;
  }

  return originalRoot;
}

// ---- tests ----

// Example 1: insert 5 — walks 4 → 7, attaches as 7's LEFT child
//      4                4
//    /   \            /   \
//   2     7    →     2     7
//  / \              / \   /
// 1   3            1   3 5
const tree1: TreeNode | null = buildTree([4, 2, 7, 1, 3]);

// Example 2: insert 25 — walks 40 → 20 → 30, attaches as 30's LEFT child
//        40
//      /    \
//    20      60
//   /  \    /  \
//  10   30 50   70
const tree2: TreeNode | null = buildTree([40, 20, 60, 10, 30, 50, 70]);

// Insert a new SMALLEST value — walks all the way down the left spine
const tree3: TreeNode | null = buildTree([4, 2, 7, 1, 3]);

// Insert a new LARGEST value — attaches on the right edge
const tree4: TreeNode | null = buildTree([4, 2, 7, 1, 3]);

check('example 1', treeToArray(insertIntoBST(tree1, 5)), [4, 2, 7, 1, 3, 5]);
check('example 2', treeToArray(insertIntoBST(tree2, 25)), [40, 20, 60, 10, 30, 50, 70, null, null, 25]);
check('new smallest', treeToArray(insertIntoBST(tree3, 0)), [4, 2, 7, 1, 3, null, null, 0]);
check('new largest', treeToArray(insertIntoBST(tree4, 10)), [4, 2, 7, 1, 3, null, 10]);
check('empty tree', treeToArray(insertIntoBST(null, 7)), [7]);
check('left of single root', treeToArray(insertIntoBST(buildTree([5]), 3)), [5, 3]);
check('right of single root', treeToArray(insertIntoBST(buildTree([5]), 8)), [5, null, 8]);
