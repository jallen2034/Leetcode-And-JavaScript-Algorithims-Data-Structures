import { TreeNode, buildTree, check } from './helpers.ts';

/**
 * TODO: implement this yourself.
 * A binary tree is height-balanced if, for every node, the heights of its
 * left and right subtrees differ by no more than 1.
 * Return true if the whole tree is balanced, otherwise false.
 */
function isBalanced(root: TreeNode | null): boolean {
  let isBalanced: boolean = true;

  const bottomUpDepthHelper = (root: TreeNode | null) => {
    if (!root) {
      return 0;
    }

    const leftDepth: number = bottomUpDepthHelper(root.left);
    const rightDepth: number = bottomUpDepthHelper(root.right);

    const diff: number = Math.abs(leftDepth - rightDepth)

    if (diff > 1) {
      isBalanced = false;
    }

    const deepestSubtreeFoundWindingUpStackFrame: number = Math.max(leftDepth, rightDepth);

    return deepestSubtreeFoundWindingUpStackFrame + 1;
  }

  bottomUpDepthHelper(root);

  return isBalanced;
}

// ----- test scaffolding below, no need to touch this -----

const tree1 = buildTree([3, 9, 20, null, null, 15, 7]); // balanced, expected true
const tree2 = buildTree([1, 2, 2, 3, 3, null, null, 4, 4]); // unbalanced at root, expected false
const tree3 = buildTree([]); // empty, expected true
const tree4 = buildTree([1]); // single node, expected true
const tree5 = buildTree([1, 2]); // height diff exactly 1, still balanced, expected true
const tree6 = buildTree([1, 2, null, 3]); // height diff exactly 2, expected false
const tree7 = buildTree([1, 2, null, 3, null, 4]); // left-skewed, expected false
const tree8 = buildTree([1, 2, 2, 3, null, null, 3, 4, null, null, 4]); // imbalance hidden deep below the root, expected false

check('Test 1', isBalanced(tree1), true);
check('Test 2', isBalanced(tree2), false);
check('Test 3', isBalanced(tree3), true);
check('Test 4', isBalanced(tree4), true);
check('Test 5', isBalanced(tree5), true);
check('Test 6', isBalanced(tree6), false);
check('Test 7', isBalanced(tree7), false);
check('Test 8', isBalanced(tree8), false);
