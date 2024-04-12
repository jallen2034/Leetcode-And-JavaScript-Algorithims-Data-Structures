// Class to construct the nodes in our singly linked list
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

// Class to construct our test linked lists
class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(val) {
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length += 1
    return this
  }

  // print out linked list
  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
 * @param {Node} head node
 * @return {SinglyLinkedList}
 */
var reverseList = function (head) {
  let currPtr = head;
  let prevPtr = null;

  while (currPtr) {
    const nextNodeReferenceToRemember = currPtr.next;
    currPtr.next = prevPtr;
    prevPtr = currPtr;
    currPtr = nextNodeReferenceToRemember;
  }

  // After the loop, prevPtr will point to the new head of the reversed list
  return prevPtr;
}

// Linked list: [1, 2, 3, 4, 5]
let list1 = new SinglyLinkedList()
list1.push(1)
list1.push(2)
list1.push(3)
list1.push(4)
list1.push(5)

console.log("List 1:");
list1.print(); // Output: [1, 2, 3, 4, 5]

// Reverse the linked list and update/re-assign the head of list1
list1.head = reverseList(list1.head);

console.log("List 1 reversed:");
list1.print(); // Output: [5, 4, 3, 2, 1]
