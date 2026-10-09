import { TreeNode, buildTree, check } from './helpers.ts';

function maxDepthTopDown(root: TreeNode | null): number {
  let deepestFound = 0;

  if (!root) {
    return 0;
  }

  const traverseRecursiveHelper = (root: TreeNode | null, currentDepth: number) => {
    if (deepestFound < currentDepth) {
      deepestFound = currentDepth;
    }

    const newDepthOfChildToBeTraversed: number = currentDepth + 1;

    if (root.left) {
      traverseRecursiveHelper(root.left, newDepthOfChildToBeTraversed);
    }

    if (root.right) {
      traverseRecursiveHelper(root.right, newDepthOfChildToBeTraversed);
    }
  }

  traverseRecursiveHelper(root, 1)

  return deepestFound;
}

const maxDepthBottomUp = (root: TreeNode | null) => {
  // base case to stop going down the tree and start unwinding our 'stack frame'
  if (!root) {
    return 0;
  }

  const left: number = maxDepthBottomUp(root.left);
  const right: number = maxDepthBottomUp(root.right);

  const deepestSubtreeFoundWindingUpStackFrame: number = Math.max(left, right);

  return deepestSubtreeFoundWindingUpStackFrame + 1;
}


const tree1 = buildTree([3, 9, 20, null, null, 15, 7]); // expected 3
const tree2 = buildTree([1, null, 2]); // expected 2
const tree3 = buildTree([]); // empty, expected 0
const tree4 = buildTree([1]); // single node, expected 1
const tree5 = buildTree([1, 2, 3, 4, 5]); // balanced-ish, expected 3
const tree6 = buildTree([1, 2, null, 3, null, 4]); // left-skewed, expected 4

function checkBoth(testNo: number, tree: TreeNode | null, expected: number): void {
  check(`Test ${testNo} (top-down) `, maxDepthTopDown(tree), expected);
  check(`Test ${testNo} (bottom-up)`, maxDepthBottomUp(tree), expected);
}

checkBoth(1, tree1, 3);
checkBoth(2, tree2, 2);
checkBoth(3, tree3, 0);
checkBoth(4, tree4, 1);
checkBoth(5, tree5, 3);
checkBoth(6, tree6, 4);
