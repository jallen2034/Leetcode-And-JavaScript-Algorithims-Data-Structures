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
   * Inserts a new value into the binary search tree.
   * @param {number} value - The value to be inserted into the BST.
   * @returns {BinarySearchTree} The instance of the BST for method chaining.
   */
  insert(value) {
    // Create a new node with the given value.
    const nodeToInsert = new Node(value);

    // If the BST is empty, set the new node as the root.
    if (!this.root) {
      this.root = nodeToInsert;
      return this;
    }

    // Find the correct position for the new node to be inserted.
    return this.traverseAndInsertNode(nodeToInsert, this.root);
  }

  /**
   * Recursively finds the correct position to insert a new node in the BST.
   * @param {Node} nodeToInsert - The node to be inserted.
   * @param {Node} currentNode - The current node during traversal.
   */
  traverseAndInsertNode(nodeToInsert, currentNode) {

    // Determine the direction for insertion based on the comparison between the values inside 'nodeToInsert' & 'currentNode'
    const moveToNode = nodeToInsert.value > currentNode.value ? "right" : "left";

    // Decide whether to insert the new node to the left or right based on its value relative to the current node's value.
    if (moveToNode === "right" && currentNode.right) {
      this.traverseAndInsertNode(nodeToInsert, currentNode.right);
    }

    // Insert the new node into the tree as the right child if there is no existing right child.
    if (moveToNode === "right" && !currentNode.right) {
      return currentNode.right = nodeToInsert;
    }

    // Recursively navigate down the left subtree if the insertion direction is "left" and there is an existing left child
    if (moveToNode === "left" && currentNode.left) {
      this.traverseAndInsertNode(nodeToInsert, currentNode.left);
    }

    // Insert the new node as the left child if there is no existing left child
    if (moveToNode === "left" && !currentNode.left) {
      return currentNode.left = nodeToInsert;
    }
  }

  /**
   * Helper method to recursively swap left and right children and invert the whole BST.
   * @param {Node} currentNode - The current node being processed.
   * @private
   */
  traverseAndInvert(currentNode) {
    // base case to break the recursion.
    if (currentNode === null) {
      return null;
    }

    // Swap the left and right child nodes.
    const tempCurrentLeftNode = currentNode.left;
    currentNode.left = currentNode.right;
    currentNode.right = tempCurrentLeftNode;

    // Recursively invert the left and right subtrees.
    this.traverseAndInvert(currentNode.left);
    this.traverseAndInvert(currentNode.right);
  }
}

// Create an instance of BinarySearchTree.
const bst = new BinarySearchTree();

// Values to be inserted into the BST.
const values = [4, 2, 7, 1, 3, 6, 9,];

// Insert each value into the BST.
values.forEach((value) => bst.insert(value));
console.log('Original BST:', JSON.stringify(bst, null, 2));

// Invert the BST.
bst.traverseAndInvert(bst.root);
console.log('Inverted BST:', JSON.stringify(bst, null, 2));