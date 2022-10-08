class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// stack using a linked list
class Queue {
  constructor(value) {
    this.first = value;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    let newNode = new Node(val);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size += 1;
    return this
  }
  dequeue() {
    if (this.size === 0) return null;
    let oldFirstNode = this.first
    if (this.size === 1) {
      this.last = null;
    } 
    this.first = this.first.next;
    this.size -= 1;
    return oldFirstNode.value;
  }
}

let queue = new Queue();
queue.enqueue("First"); // First
queue.enqueue("Second"); // First Second
queue.enqueue("Third"); // First Second Third
queue.dequeue(); // Second Third
queue.dequeue(); // Third
queue.dequeue(); // null
