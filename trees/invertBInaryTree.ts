import { TreeNode, buildTree, treeToArray, check } from './helpers.ts';

const swapNodes = (node: TreeNode) => {
  const tempLeft = node.left;

  node.left = node.right;

  node.right = tempLeft;
}


function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  const bottomUpDepthHelper = (node: TreeNode | null)=> {
    if (!node) {
      return
    }

    bottomUpDepthHelper(node.left);
    bottomUpDepthHelper(node.right);

    if (node.left || node.right) {
      swapNodes(node);
    }
  }

  bottomUpDepthHelper(root);

  return root;
}

// ----- test scaffolding below, no need to touch this -----

const tree1 = buildTree([4, 2, 7, 1, 3, 6, 9]); // full tree (the LeetCode example)
const tree2 = buildTree([2, 1, 3]); // small tree
const tree3 = buildTree([]); // empty, its own mirror
const tree4 = buildTree([1]); // single node, its own mirror
const tree5 = buildTree([1, 2, null, 3]); // left-skewed, should flip to right-skewed
const tree6 = buildTree([1, 2, 3, null, 4]); // mixed nulls

check('Test 1', treeToArray(invertTree(tree1)), [4, 7, 2, 9, 6, 3, 1]);
check('Test 2', treeToArray(invertTree(tree2)), [2, 3, 1]);
check('Test 3', treeToArray(invertTree(tree3)), []);
check('Test 4', treeToArray(invertTree(tree4)), [1]);
check('Test 5', treeToArray(invertTree(tree5)), [1, null, 2, null, 3]);
check('Test 6', treeToArray(invertTree(tree6)), [1, 3, 2, null, null, 4]);
