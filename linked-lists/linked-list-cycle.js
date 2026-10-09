// https://leetcode.com/problems/linked-list-cycle/
// method to detect a cycle in a linked list - time and space complexity O(n)
const hasCycle = function(head) {
  if (!head) {
    return false;
  }
  const visitedNodes = {}; // hashmap to keep track of the nodes we have already visited traversing through the LL
  let currentNode = head; // Loop through nodes 1 by one
  while (currentNode !== null) {
    if (currentNode.next !== null && currentNode.next.val in visitedNodes) { 
      return true; // Cycle detected
    }
    visitedNodes[currentNode.val] = true; // Keep track of our visited nodes
    currentNode = currentNode.next;
  }
  return false; // No cycle detected in linked list
};

// Test linked list we want to detect a cycle in
const linkedList = {
  val: 3,
  next: {
    val: 2,
    next: {
      val: 0,
      next: {
        val: -4,
        next: null
      }
    }
  }
};

linkedList.next.next.next.next = linkedList.next; // Creating the cycle at index 1
const linkedListHasCycle = hasCycle(linkedList);
