// Shared helpers for the binary tree problems in this folder.
//
//   import { TreeNode, buildTree, treeToArray, check } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Builds a binary tree from LeetCode's level-order (breadth-first) array format.
 * Each entry is either a number (a node) or null (an absent child).
 *
 * buildTree([3, 9, 20, null, null, 15, 7]) produces:
 *
 *        3
 *       / \
 *      9   20
 *         /  \
 *        15   7
 */
export const buildTree = (vals: (number | null)[]): TreeNode | null => {
  if (vals.length === 0 || vals[0] === null) return null;

  const root = new TreeNode(vals[0]);
  const queue: TreeNode[] = [root];

  let i = 1;

  while (i < vals.length) {
    const current = queue.shift();
    if (current === undefined) break;

    const leftVal = vals[i++];
    if (leftVal !== null && leftVal !== undefined) {
      current.left = new TreeNode(leftVal);
      queue.push(current.left);
    }

    if (i < vals.length) {
      const rightVal = vals[i++];
      if (rightVal !== null && rightVal !== undefined) {
        current.right = new TreeNode(rightVal);
        queue.push(current.right);
      }
    }
  }

  return root;
};

/**
 * The inverse of buildTree: walks a tree back into level-order array form
 * (with trailing nulls trimmed), so two trees can be compared as arrays.
 */
export const treeToArray = (root: TreeNode | null): (number | null)[] => {
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === undefined) break;

    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
};

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};