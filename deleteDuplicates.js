// class for each node in linked list
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // add a new node onto the end of the linked list
  push(val) {
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
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

// create linked list object from class
let list = new SinglyLinkedList;
list.push(1);
list.push(1);
list.push(1);
list.push(2);
list.push(2);
list.push(2);
list.push(3);
list.push(3);
list.push(3);
list.push(3);
list.print()

var deleteDuplicates = function(list) {
  let current = list.head

  // loop through the linked list while there is a current node and a next one.
  while (current && current.next) {
    if (current.val === current.next.val) {
      // Skip the duplicate node and explicitly set its next to null.
      let duplicate = current.next;
      current.next = current.next.next;
      duplicate.next = null; // Clean up the node we just orphaned.
    } else {
      current = current.next
    }
  }

  // Return the modified list with no duplicates now :)
  return list
}

const result = deleteDuplicates(list)
console.log(result.print())
