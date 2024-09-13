class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // recursively traverse binary search tree for insertion O(log n)
  traverseAndInsertNode(nodeToInsert, currentNode) {
    const moveToNode = nodeToInsert.value > currentNode.value ? "right" : "left";
    if (moveToNode === "right" && currentNode.right) {
      this.traverseAndInsertNode(nodeToInsert, currentNode.right);
    }
    if (moveToNode === "right" && !currentNode.right) {
      return currentNode.right = nodeToInsert;
    }
    if (moveToNode === "left" && currentNode.left) {
      this.traverseAndInsertNode(nodeToInsert, currentNode.left);
    }
    if (moveToNode === "left" && !currentNode.left) {
      return currentNode.left = nodeToInsert;
    }
  }

  // insert a new node into a binary search tree
  insert(value) {
    const nodeToInsert = new Node(value);
    if (!this.root) {
      this.root = nodeToInsert;
      return this;
    }
    return this.traverseAndInsertNode(nodeToInsert, this.root);
  }

  // recursively traverse & find node in a binary search tree by val O(log n)
  find(value) {
    if (!this.root) {
      return null;
    }
    if (this.root.value === value) {
      return this.root;
    }
    let foundNode = null;

    function traverseAndSearchForNode(value, currentNode) {
      if (value === currentNode.value) {
        return foundNode = currentNode;
      }
      const moveToNode = value > currentNode.value ? "right" : "left";
      if (moveToNode === "right" && currentNode.right) {
        traverseAndSearchForNode(value, currentNode.right);
      }
      if (moveToNode === "right" && !currentNode.right) {
        return foundNode = 'This Node is not in the binary search tree';
      }
      if (moveToNode === "left" && currentNode.left) {
        traverseAndSearchForNode(value, currentNode.left);
      }
      if (moveToNode === "left" && !currentNode.left) {
        return foundNode = 'This Node is not in the binary search tree';
      }
    }

    traverseAndSearchForNode(value, this.root);
    return foundNode;
  }

  // bfs to get all nodes in BST in order
  breadthFirstSearch() {
    let node = this.root
    let visited = [];
    let queue = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      visited.push(node.value);
      if (node.left) queue.push(node.left.value);
      if (node.right) queue.push(node.right.value);
    }
    
    return visited;
  }

  depthFirstSearchPreOrder() {
    let visited = [];
    let node = this.root;

    const traverse = function(node) {
      visited.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(node);
    return visited;
  }

  depthFirstSearchPostOrder() {
    let visited = [];
    let node = this.root;

    const traverse = function(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.value);
    }

    traverse(node);
    return visited;
  }

  depthFirstSearchInOrder() {
    let visited = [];
    let node = this.root;

    const traverse = function(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    }

    traverse(node);
    return visited;
  }
}

// construct binary search tree
let tree = new BinarySearchTree();

// insert new nodes & values into BST
console.log("\nInserting nodes into BST: \n");
const valuesInsertIntoBST = [10, 6, 15, 20, 3, 8];
for (let value of valuesInsertIntoBST) {
  tree.insert(value);
}
console.log("BST after inserting nodes: ", tree);

// run BFS on BST
const visited1b = tree.breadthFirstSearch();
console.log(visitedb);

const visited = tree.depthFirstSearchInOrder();
console.log(visited);

console.log("\nSearching for nodes in BST: \n");

// search for values in BST
const valuesSearchForInBST = [16, 20, 19, 8, 21, 25];
for (let value of valuesSearchForInBST) {
  console.log(`Searching for a node with a value of ${value}... `, tree.find(value));
};
console.log("\n");
