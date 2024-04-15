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
    let arr = []
    let current = this.head
    while (current) {
      arr.push(current.val)
      current = current.next
    }
    console.log(arr)
  }
}

/**
 * @param {Node} head
 * @return {boolean}
 */
const hasCycle = (head) => {
  if (!head || !head.next) {
    return false
  }

  const table = new Map()

  let currNodeTraversed = head

  while (currNodeTraversed) {
    if (table.has(currNodeTraversed)) {
      return true
    }
    table.set(currNodeTraversed, true)
    currNodeTraversed = currNodeTraversed.next
  }

  return false
}

const list1 = new SinglyLinkedList()

// Creating nodes
const node1 = new Node(3)
const node2 = new Node(2)
const node3 = new Node(0)
const node4 = new Node(-4)

// Connecting nodes
list1.head = node1
list1.head.next = node2
node2.next = node3
node3.next = node4
node4.next = node2 // Creating a cycle where node4 connects back to node2

// Setting the tail
list1.tail = node4

// Update the length of the list
list1.length = 4

const hasCycleNode = hasCycle(list1.head)
console.log(hasCycleNode)
