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
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }
  // retrieve a node by its position in the linked list
  find(key) {
    let current = this.head;
    while (current) {
      if (current.val[0] === key) {
        return current.val[1];
      }
      current = current.next;
    }
    return undefined;
  }
  traverse(type, arr) {
    let current = this.head;
    while (current) {
      if (type === "value" && !arr.includes(current.val[1])) arr.push(current.val[1]);
      if (type === "key" && !arr.includes(current.val[0])) arr.push(current.val[0]);
      current = current.next;
    }
  }
}

class HashTable {
  constructor(size = 13) { // has to be a prime number to minimise collisions
    this.keyMap = new Array(size);
  }
  // basic hash function
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 7; // has to be a prime number to minimise collisions
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }
  // set key from hash table using seperate chaining (array of linked lists)
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      const linkedListAtIdx = new SinglyLinkedList();
      linkedListAtIdx.push([key, value]);
      this.keyMap[index] = linkedListAtIdx;
    } else {
      const linkedListAtIdx = this.keyMap[index];
      linkedListAtIdx.push([key, value]);
    }
  }
  // get key from hash table using seperate chaining (array of linked lists)
  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      const linkedListAtIdx = this.keyMap[index];
      return linkedListAtIdx.find(key);
    }
    return undefined;
  }
  // return all the keys of our hash table in an array 
  keys() {
    const keys = [];
    for (let linkedListAtIdx of this.keyMap) {
      if (linkedListAtIdx) linkedListAtIdx.traverse('key', keys);
    }
    return keys;
  }
  // return all the values of our hash table in an array 
  values() {
    const values = [];
    for (let linkedListAtIdx of this.keyMap) {
      if (linkedListAtIdx)linkedListAtIdx.traverse('value', values);
    }
    return values;
  }
}

const ht = new HashTable();

ht.set("hi", "goodbye");
ht.set("ho", "billy");
ht.set("pink", "jeffrey");
ht.set("cats", "are cool");
ht.set("love", "pizza");
ht.set("watermelon", "bacob");
ht.set("and", "cheese");
ht.set("pickle", "iPhone");
ht.set("are", "pixel");
ht.set("so", "toads");
ht.set("gross", "yard");
ht.set("phone", "pixel");

console.log(ht.get("ho")); // billy
console.log(ht.get("pink")); // jeffrey
console.log(ht.get("hi")); // goodbye
console.log(ht.get("jacob")); // undefined
console.log(ht.get("cats")); // are cool
console.log(ht.get("love")); // pizza
console.log(ht.get("watermelon")); // bacob
console.log(ht.get("and")); // cheese
console.log(ht.get("pickle")); // iPhone
console.log(ht.get("are")); // pixel
console.log(ht.get("so")); // toads
console.log(ht.get("gross")); // yard
console.log(ht.get("henry")); // undefined
console.log(ht.get("is")); // undefined
console.log(ht.get("a")); // undefined
console.log(ht.get("whaa")); // undefined

console.log(ht.values()); // [goodbye, yard, are cool, iPhone, pizza, toads, billy, jeffrey, cheese, pixel, bacob]
console.log(ht.keys()); // [hi, gross, cats, pickle, love, so, ho, pink, and, phone, watermelon, are]
