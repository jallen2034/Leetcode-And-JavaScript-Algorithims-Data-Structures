class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) { // if list is empty
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
    return this
  }
  pop() {
    if (!this.length === 0) return unefined
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length -= 1;
    return poppedNode;
  }
  // remove node beginning linke dlist
  shift() {
    if (!this.head) return undefined;
    let oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      this.oldHead.next = null;
    }
  }
}

// create linked list object from class
let list = new DoublyLinkedList;
list.push("First node");
list.push("Second node");
list.push("Third node");
console.log("list: ", list);

// list.pop();
console.log(list); // Second node
list.pop();
console.log(list); // First node
list.pop();
console.log(list); // null

// remove node to the beginning linked list
console.log(list); // 3
list.shift();
console.log(list); // 3