class Node {
  constructor(data) {
    this.val = data; // The value stored in the node.
    this.left = null; // Reference to the left child node.
    this.right = null; // Reference to the right child node.
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;  // The root node of the BST.
  }

  /**
   * Hardcodes the binary tree structure for the first case (Input: p = [1,2,3], q = [1,2,3]).
   *      1
   *     / \
   *    2   3
   */
  insertHardcodedTree1() {
    this.root = new Node(1);
    this.root.left = new Node(2);
    this.root.right = new Node(3);
  }

  /**
   * Hardcodes the binary tree structure for the second case (Input: p = [1,2], q = [1,null,2]).
   * The first tree (p = [1,2]):
   *      1
   *     /
   *    2
   */
  insertHardcodedTree2() {
    this.root = new Node(1);
    this.root.left = new Node(2);
  }

  /**
   * Hardcodes the binary tree structure for the second case (Input: p = [1,2], q = [1,null,2]).
   * The second tree (q = [1,null,2]):
   *      1
   *       \
   *        2
   */
  insertHardcodedTree3() {
    this.root = new Node(1);
    this.root.right = new Node(2);
  }
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {Node} p
 * @param {Node} q
 * @return {boolean}
 */
const isSameTree = function (p, q) {
  // Base case: If both trees are empty, they are identical.
  if (p === null && q === null) {
    return true;
  }

  // If one tree is empty and the other is not, they are not identical.
  if (p === null || q === null) {
    return false;
  }

  // Check if the values of the current nodes are equal.
  if (p.val !== q.val) {
    return false; // If values differ, the trees are not identical.
  }

  // Recursively check the left and right subtrees for equality.
  const leftSameTree = isSameTree(p.left, q.left); // Check left children.
  const rightSameTree = isSameTree(p.right, q.right); // Check right children.

  // Return true only if both left and right subtrees are identical.
  return leftSameTree && rightSameTree;
};

// Usage example:
const bst1 = new BinarySearchTree();
bst1.insertHardcodedTree1(); // Creates the first tree

const bst2 = new BinarySearchTree();
bst2.insertHardcodedTree1(); // Creates the first tree

const bst3 = new BinarySearchTree();
bst3.insertHardcodedTree2(); // Creates the second tree (p)

const bst4 = new BinarySearchTree();
bst4.insertHardcodedTree3(); // Creates the second tree (q)

console.log({
  bst1,
  bst2,
  bst3
});

const isSameTree1 = isSameTree(bst1.root, bst2.root);
const isSameTree2 = isSameTree(bst3.root, bst4.root);

console.log(isSameTree1);
console.log(isSameTree2);
