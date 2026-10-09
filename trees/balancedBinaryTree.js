/**
 * Class representing a node in a binary search tree (BST).
 */
class Node {
  constructor(data) {
    this.value = data; // The value stored in the node.
    this.left = null; // Reference to the left child node.
    this.right = null; // Reference to the right child node.
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;  // The root node of the BST.
  }

  /**
   * Hardcodes the specific binary tree structure for this LeetCode problem.
   * The structure created is:
   *      3
   *     / \
   *    9  20
   *      / \
   *    15   7
   * This simulates inserting these values into the tree.
   */
  insertHardcodedTree(value) {
    // Manually create the nodes and build the tree
    this.root = new Node(3);
    this.root.left = new Node(9);
    this.root.right = new Node(20);
    this.root.right.left = new Node(15);
    this.root.right.right = new Node(7);
  }

  /**
   * Hardcodes another specific binary tree structure.
   * The structure created is:
   *      1
   *     / \
   *    2   2
   *   / \
   *  3   3
   * / \
   *4   4
   * This method simulates inserting these values into the tree.
   */
  insertHardcodedTree2(value) {
    // Manually create the nodes and build the tree
    this.root = new Node(1);
    this.root.left = new Node(2);
    this.root.right = new Node(2);
    this.root.left.left = new Node(3);
    this.root.left.right = new Node(3);
    this.root.left.left.left = new Node(4);
    this.root.left.left.right = new Node(4);
  }

  /**
   * Hardcodes a third specific binary tree structure.
   * The structure created is:
   *      1
   *     / \
   *    2   2
   *   /     \
   *  3       3
   * /         \
   *4           4
   * This method simulates inserting these values into the tree.
   */
  insertHardcodedTree3(value) {
    // Manually create the nodes and build the tree
    this.root = new Node(1);  // root node
    this.root.left = new Node(2);  // root's left child
    this.root.right = new Node(2); // root's right child

    // Construct the left side of the tree
    this.root.left.left = new Node(3);  // root.left's left child
    this.root.left.left.left = new Node(4);  // root.left.left's left child

    // Construct the right side of the tree
    this.root.right.right = new Node(3);  // root.right's right child
    this.root.right.right.right = new Node(4);  // root.right.right's right child
  }
}

/**
 * Function to determine if a binary tree is balanced.
 * A balanced binary tree is defined as one where:
 * 1. The absolute difference between the heights of the left and right subtrees of any node is at most 1 ✓
 * 2. The left subtree of every node is balanced ✓
 * 3. The right subtree of every node is balanced ✓
 *
 * This function employs a depth-first search (DFS) approach traverse the tree recursively.
 * It "drills down" to the leaf nodes of the BST, and then backtracks "up" the tree, checking at each node whether:
 * - Any subtree below the current node being checked is unbalanced ✓
 * - If the absolute height difference between the left and right subtree below the current node exceeds 1 ✓
 *
 * The time complexity is O(n), as each node is visited exactly once.
 * The space complexity is O(h), where h is the height of the tree:
 *   - In the worst case (a skewed tree), h (height of the tree) can be O(n).
 *   - In the best case (a perfectly balanced tree), h can be O(log n) ( the height ℎ h is logarithmic in
 *   relation to the number of nodes 𝑛).
 * @param {TreeNode} root - The root node of the binary tree.
 * @return {boolean} - Returns true if the tree is balanced; otherwise, returns false.
 */
const isBalanced = function (root) {
  const dfs = function (currentNode) {
    // Base case in recursion: null nodes are inherently balanced and naturally have a height of -1.
    if (!currentNode) return { isBalanced: true, treeHeight: -1 };

    // Run DFS/Recursion to "drill down" the left and right subtrees to try reach the root node first.
    const leftTreeResult = dfs(currentNode.left);
    const rightTreeResult = dfs(currentNode.right);

    // Destructure the results from the left and right subtree checks.
    const {
      isBalanced: leftSubTreeIsBalanced,
      treeHeight: leftSubTreeHeight
    } = leftTreeResult;
    const {
      isBalanced: rightSubTreeIsBalanced,
      treeHeight: rightSubTreeHeight
    } = rightTreeResult;

    // Calculate the current tree height by taking the maximum height of the two subtrees below the current node.
    const currentHeight = Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;

    // Calculate the absolute difference in height between the left sub-tree and the right sub-tree.
    const heightDifference = Math.abs(leftSubTreeHeight - rightSubTreeHeight);

    // The absolute height difference between the two subtrees below the current node must be "0" or "1" for a balanced tree :)
    const isCurrentNodeBalanced = heightDifference <= 1;

    // Check if both subtrees below the current node are balanced and if the current node is balanced.
    const isBalanced = leftSubTreeIsBalanced && rightSubTreeIsBalanced && isCurrentNodeBalanced

    return { isBalanced, treeHeight: currentHeight }
  }

  const { isBalanced} = dfs(root);
  return isBalanced
};

const bst = new BinarySearchTree();
bst.insertHardcodedTree();

const bst2 = new BinarySearchTree();
bst2.insertHardcodedTree2();

const bst3 = new BinarySearchTree();
bst3.insertHardcodedTree3();

console.log(isBalanced(bst.root));
console.log(isBalanced(bst2.root));
console.log(isBalanced(bst3.root));
