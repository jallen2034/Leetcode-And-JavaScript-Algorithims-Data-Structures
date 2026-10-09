class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// stack using a linked list
class Stack {
  constructor(value) {
    this.first = value;
    this.last = null;
    this.size = 0;
  }
  // O(1)
  push(val) {
    let newNode = new Node(val)
    if (!this.first) { // catch if there is nothing in linked list to start
      this.first = newNode;
      this.last = newNode;
    } else {
      let temp = this.first
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.size;
  }
  // O(1)
  pop() {
    if (!this.first) return null; // nothing in stack to pop
    let temp = this.first;
    if (this.size === 1) { // if there is only 1 node
      this.last = null;
    } 
    this.first = this.first.next;
    this.size -= 1;
    return temp.value;
  }
}

let stack = new Stack();
stack.push('First');
stack.push('Second');
stack.push('Third');
stack.pop(); // third
stack.pop(); // second
stack.pop(); // first
stack.pop(); // null
