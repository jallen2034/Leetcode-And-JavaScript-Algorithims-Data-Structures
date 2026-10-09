class Node {
  // Constructor for the Node class.
  constructor(key, val) {
    this.key = key;  // Key of the node
    this.val = val;  // Value of the node
    this.next = null; // Pointer to the next node in the list
    this.prev = null; // Pointer to the previous node in the list
  }
}

class LRUCache {
  // Constructor for the LRU Cache class.
  constructor(capacity) {
    this.cache = new Map(); // Hashmap to store key-node pairs for O(1) access.
    this.capacity = capacity; // Define our Max capacity of the LRU cache.

    // Initialize dummy head (left) and tail (right) nodes for the doubly linked list.
    this.left = new Node(0, 0);
    this.right = new Node(0, 0);

    // Connect the dummy head and tail nodes to each other.
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  // Helper function to insert a node at the rightmost position (most recent) in the doubly linked list.
  insert(node) {
    const prevNode = this.right.prev; // Node to the left of our doubly linked list tail.
    const nextNode = this.right; // Node at the tail of our doubly linked list (we gon insert between these)

    // Connect the new node with the previous rightmost node and the tail node.
    prevNode.next = node;
    nextNode.prev = node;
    node.next = nextNode;
    node.prev = prevNode;
  }

  // Helper function to remove a node from the doubly linked list.
  remove(node) {
    const prevNode = node.prev; // Node before the current one to be removed.
    const nextNode = node.next; // Node after the current one to be removed.

    /* Bypass the node to be removed by connecting its previous and next nodes directly to each other
     * Note: the removed node is now severed from the list, but if there are still references to it
     * (e.g., from the cache map), it will not be garbage collected immediately! */
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  // Function to retrieve the value of a given key from the cache.
  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key); // Get the node via it's reference/pointer to it from the cache.
      this.remove(node); // Remove the node from its current position.
      this.insert(node); // Insert the node at the most recent position.
      return node.val; // Return the value of the node to display the user :)
    }

    return -1; // Return -1 if the key is not found
  }

  // Function to add a key-value pair to the cache.
  put(key, value) {
    // Remove the existing node if the key already exists in the cache.
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key));
    }

    // Create a new node with the given key and value
    const node = new Node(key, value);
    this.cache.set(key, node); // Add the new node to the cache.
    this.insert(node); // Insert the new node at the most recent position.

    // If we blow over our allowed cache size >:|
    if (this.cache.size > this.capacity) {
      const lru = this.left.next; // Get the least recently used node (node right after the dummy head).
      this.remove(lru); // Remove the least recently used node from the list.
      this.cache.delete(lru.key); // Delete the least recently used node from the cache.
    }
  }
}

// Example usage of the LRUCache class
lRUCache = new LRUCache(2);
lRUCache.put(1, 10);  // cache: {1=10}
console.log(lRUCache.get(1)); // should print 10
lRUCache.put(2, 20);  // cache: {1=10, 2=20}
lRUCache.put(3, 30);  // cache: {2=20, 3=30}, key=1 was evicted
console.log(lRUCache.get(2)); // should print 20
console.log(lRUCache.get(1)); // should print -1 (not found)
