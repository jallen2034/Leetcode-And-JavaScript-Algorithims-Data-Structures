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
   * Recursively calculates the maximum depth of the binary tree.
   * The maximum depth is the length of the longest path from the root node
   * down to the farthest leaf node.
   *
   * @param {Node} currentNode - The current node being processed (starts with the root).
   * @returns {number} The maximum depth of the tree.
   */
  maxDepth(currentNode) {
    // Base case: If the node is null, we've reached a leaf or empty node in the binary tree, return depth 0.
    if (!currentNode) return 0;

    // Recursively calculate the maximum depth of the left and right subtree.
    const maxValFromLeftSubTree = this.maxDepth(currentNode.left);
    const maxValFromRightSubTre = this.maxDepth(currentNode.right);

    /* Return 1 (for the current node) plus the greater depth of the left and right subtrees below the current.
     * This simulates climbing back up the tree as we pop frames off the call stack during recursion unwind. */
    return 1 + Math.max(maxValFromLeftSubTree, maxValFromRightSubTre);
  }
}

// Create an instance of BinarySearchTree and hardcode the tree.
const bst = new BinarySearchTree();
bst.insertHardcodedTree();
const maxDepthOfBST = bst.maxDepth(bst.root);
console.log(maxDepthOfBST);