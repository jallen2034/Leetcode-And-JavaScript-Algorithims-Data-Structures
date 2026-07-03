class TreeNode {
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
function buildTree(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] === null) return null;

  const root = new TreeNode(vals[0]);
  const queue: TreeNode[] = [root];

  let i = 1;

  while (i < vals.length) {

    const current = queue.shift();
    if (current === undefined) {
      break;
    }

    const leftVal = vals[i++];

    if (leftVal !== null) {
      current.left = new TreeNode(leftVal);
      queue.push(current.left);
    }

    if (i < vals.length) {
      const rightVal = vals[i++];
      if (rightVal !== null) {
        current.right = new TreeNode(rightVal);
        queue.push(current.right);
      }
    }
  }

  return root;
}

function check(testNo: number, actual: number, expected: number): void {
  const status = actual === expected ? "PASS" : "FAIL";
  console.log(`Test ${testNo}: ${status}  (got ${actual}, expected ${expected})`);
}

/**
 * TODO: implement this yourself.
 * Return the maximum depth of the binary tree: the number of nodes along the
 * longest path from the root node down to the farthest leaf node.
 */
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


const tree1: TreeNode = buildTree([3, 9, 20, null, null, 15, 7]); // expected 3
const tree2: TreeNode = buildTree([1, null, 2]); // expected 2
const tree3: TreeNode = buildTree([]); // empty, expected 0
const tree4: TreeNode = buildTree([1]); // single node, expected 1
const tree5: TreeNode = buildTree([1, 2, 3, 4, 5]); // balanced-ish, expected 3
const tree6: TreeNode = buildTree([1, 2, null, 3, null, 4]); // left-skewed, expected 4

check(1, maxDepthTopDown(tree1), 3);
check(1, maxDepthBottomUp(tree1), 3);
check(2, maxDepthTopDown(tree2), 2);
check(3, maxDepthTopDown(tree3), 0);
check(4, maxDepthTopDown(tree4), 1);
check(5, maxDepthTopDown(tree5), 3);
check(6, maxDepthTopDown(tree6), 4);