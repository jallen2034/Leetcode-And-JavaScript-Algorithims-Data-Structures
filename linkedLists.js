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
  // traverse the linked list
  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
  // remove a node from the end of a linked list
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let nextNode = current.next;
    while (nextNode) {
      if (!nextNode.next) {
        this.tail = current;
        this.tail.next = null;
        this.length -= 1;
        return current.val;
      }
      current = nextNode
      nextNode = nextNode.next;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return current.val;
    }
  }
  // remove node to the beginning linked list
  shift() {
    if (!this.head) {
      return undefined;
    }
    let currentHead = this.head;
    this.head = currentHead.next;
    this.length -= 1;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }
  // add a node to the beggining of the linked list
  unshift(val) {
    let newNode = new Node(val)
    if (!this.head) { // catch if there is nothing in linked list to start
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.length += 1;
      return this;
    }
  }
  // retrieve a node by its position in the linked list
  get(index, value) {
    if (index < 0 || index > this.length) {
      return null;
    }
    let counter = 0;
    let current = this.head;
    let nextNode = current.next;
    while (counter < index) {
      current = nextNode
      nextNode = nextNode.next;
      counter++
    }
    if (value) current.value = value;
    return current;
  }
  // accepts a index and a value to update a node at that index with
  set(index, value) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = value;
      return true;
    }
    return false;
  }
  // inserts a node into a linked list at a desired index
  insert(index, value) {
    if (index < 0 || index > this.length) return false
    if (index === this.length) return !!this.push(value); // if inserting at end of linked list
    if (index === 0) return !!this.unshift(value) // if someone wants to insert at beginning of linked list
    let newNode = new Node(value)
    let prev = this.get(index - 1);
    let next = prev.next;
    prev.next = newNode;
    newNode.next = next;
    this.length += 1;
    return true;
  }
  // delete a node at a desired index
  delete(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prev = this.get(index - 1);
    let removed = prev.next;
    prev.next = removed.next;
    this.length -= 1;
    return removed;
  }
  // reverse a linked list
  reverse() {
    let node = this.head;
    this.head = this.tail
    this.tail = node;
    let next = null;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
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
list.push("hello");
list.push("there");
list.push("!");

// list.pop();
console.log(list); // 3
list.pop();
console.log(list); // 2
list.pop();
console.log(list); // 1
list.pop();
console.log(list); // 0

// remove node to the beginning linked list
console.log(list); // 3
list.shift();
console.log(list); // 3

// add a node to the beggining of the linked list
console.log(list);
list.unshift("boop");
console.log(list); 

// accept a index and a value to update a node at that index with
console.log(list.get(1)); 
list.set(1, 'bacon'); 
console.log(list.get(1)); 

// insert a node into a linked list at a desired index
console.log(list.get(0)); 
console.log(list.get(1)); 
list.insert(1, "boris");
console.log('--------------'); 
console.log(list.get(0)); 
console.log(list.get(1)); 
console.log(list.get(2)); 

// delete
console.log(list); 
list.delete(1);
console.log(list); 
list.delete(1);
console.log(list); 
list.delete(0);
console.log(list); 

// reverse linked list
list.print();
list.reverse();
list.print();