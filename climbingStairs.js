// https://leetcode.com/problems/climbing-stairs

class BinarySearchTreeNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * Builds a binary tree representing all possible ways to climb the staircase.
 * Counts the number of leaf nodes in the tree that equal the target value.
 * @param {BinarySearchTreeNode} currentNodeBinaryTree - The current node in the binary tree.
 * @param {object} leafNodeCounter - An object containing the counter for leaf nodes matching the target value.
 * @param {number} n - The target number of steps for the staircase.
 * @returns {void}
 */
const buildTreeAndCountLeafNodes = (
  currentNodeBinaryTree,
  leafNodeCounter,
  n
) => {
  if (currentNodeBinaryTree.value === n) { // Base case 1: If the current node's value equals the target value, increment the leaf node counter.
    leafNodeCounter.count += 1;
    return;
  }

  if (currentNodeBinaryTree.value > n + 1) { // Base case 2: If the current node's value is greater than the target value + 1, stop recursion.
    return;
  }

  // Create left child node with +1 value of the current node.
  const leftChildNode = new BinarySearchTreeNode(currentNodeBinaryTree.value + 1, null, null);

  // Create right child node with +2 value of the current node.
  const rightChildNode = new BinarySearchTreeNode(currentNodeBinaryTree.value + 2, null, null);

  // Connect the left and right child nodes of the current node.
  currentNodeBinaryTree.left = leftChildNode;
  currentNodeBinaryTree.right = rightChildNode;

  // Recursively call on the left and right child nodes.
  buildTreeAndCountLeafNodes(currentNodeBinaryTree.left, leafNodeCounter, n);
  buildTreeAndCountLeafNodes(currentNodeBinaryTree.right, leafNodeCounter, n);
}

/**
 * @param {number} n - The target number of steps for the staircase.
 * @return {number} - The total number of distinct ways to climb the staircase.
 */
const climbStairs = (n) => {
  const binaryTree = new BinarySearchTreeNode(0, null, null);
  const leafNodeCounter = { count: 0 }; // Wrap the counter in an object for reference passing
  buildTreeAndCountLeafNodes(binaryTree, leafNodeCounter, n);
  return leafNodeCounter.count;
};

// Test cases - Note: The current implementation runs in O(n^2) time complexity due to its recursive nature.
console.log(climbStairs(0)); // Expected output: 1 (There's one way to climb 0 steps: by doing nothing)
console.log(climbStairs(1)); // Expected output: 1 (There's one way to climb 1 step: by taking 1 step)
console.log(climbStairs(2)); // Expected output: 2 (There are two ways to climb 2 steps: 1+1 or 2)
console.log(climbStairs(3)); // Expected output: 3 (There are three ways to climb 3 steps: 1+1+1, 1+2, 2+1)
console.log(climbStairs(4)); // Expected output: 5 (There are five ways to climb 4 steps: 1+1+1+1, 1+2+1, 2+1+1, 1+1+2, 2+2)
console.log(climbStairs(6)); // Expected output: 13 (There are thirteen ways to climb 6 steps)
