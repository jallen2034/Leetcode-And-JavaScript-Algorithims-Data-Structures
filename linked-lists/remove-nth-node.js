// Two pass approach to solve this problem - O(n) time complexity and O(1) space complexity
const removeNthFromEnd = function(head, n) {
  // Step 1: Initialize our counter to keep track of how many nodes there are in our linked list
  let linkedListLength = 0;
  let currentNodeFirstPass = head;

  // Step 2: First pass through the linked list to count the number of nodes
  while (currentNodeFirstPass !== null) {
    linkedListLength += 1;
    currentNodeFirstPass = currentNodeFirstPass.next;
  }

  // Step 3: Handle special case where there is only one node in the linked list and we want to remove it
  if (linkedListLength === 1 && n === 1) {
    return null;
  }

  // Step 4: Initialize two pointers, previousNode and currentNode, both starting from the head of the LL
  let previousNode = head;
  let currentNode = head;

  // Step 5: Calculate the position of the node to be removed from the end of the linked list by subtracting n from
  // the total number of nodes in the linked list, and store it in positionToRemove  variable.
  let positionToRemove  = linkedListLength - n;

  // Step 6: loop through linked list for second passthrough
  while (currentNode !== null) {
    /* If positionToRemove equals 0, we've reached the node just before the one we want to remove.
     * This node points to the target node. its next pointer will need to be updated to remove the target node */
    if (positionToRemove === 0) {
      // Orphan the nth node from the linked list
      if (previousNode === null) { // if we want to remove the head node of the linked list
        head = head.next;
      } else {
        previousNode.next = currentNode.next;
      }
      currentNode.next = null;
      break; // Break the loop, we successfully orphaned the nth node by this point
    } else {
      previousNode = currentNode; // Keep looping the previousNode and currentNode pointers through the linked list
      currentNode = currentNode.next;
      positionToRemove  -= 1;
    }
  }
  return head; // Return the head of the modified linked list
};

const ListNode = class {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const n = 2;

const newLinkedList = removeNthFromEnd(head, n);
