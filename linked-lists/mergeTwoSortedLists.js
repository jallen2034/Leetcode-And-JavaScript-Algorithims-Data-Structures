// Class to construct the nodes in our singly linked list
class ListNode {
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
    let newNode = new ListNode(val)
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
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = (list1, list2) => {
  // Step 1: Create a dummy node
  const dummy = new ListNode(null)

  // new pointer
  let current = dummy

  while (list1 && list2) {
    if (list2.val > list1.val) {
      current.next = list1
      list1 = list1.next
    } else {
      current.next = list2
      list2 = list2.next
    }

    // move the current pointer
    current = current.next
  }

  if (list1) {
    current.next = list1
  }

  if (list2) {
    current.next = list2
  }

  return dummy.next
}

const list1 = new SinglyLinkedList()
list1.push(1)
list1.push(2)
list1.push(4)


const list2 = new SinglyLinkedList()
list2.push(1)
list2.push(3)
list2.push(4)

mergeTwoLists(list1.head, list2.head)
