class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

// implmented using a min binary heap
class PriorityQueue {
  constructor() {
    this.values = [];
    this.valuesLength = this.values.length;
  }
  swap(indx1, indx2) {
    const temp = this.values[indx1];
    this.values[indx1] = this.values[indx2];
    this.values[indx2] = temp;
  }
  enqueue(element) {
    this.values.push(element);
    this.bubbleUp();
    this.valuesLength += 1;
  }
  dequeue() { // TODO
    if (this.values.length === 0) return;
    let index = this.valuesLength - 1;
    this.values[0] = this.values[index];
    this.values.pop();
    this.valuesLength -= 1;
    this.sinkDown();
  }
  bubbleUp() {
    let index = this.valuesLength;
    const element = this.values[index];
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[index] = parent;
      index = parentIdx;
    }
  };
  sinkDown() {
    let parentIdx = 0;
    while (true) {
      let leftChildIdx = Math.floor(2 * parentIdx) + 1;
      let rightChildIdx = Math.floor(2 * parentIdx) + 2;
      // stop swapping when we hit the leafs of the binary heap and keep swapping until there are more than 2 nodes left
      if ((!this.values[leftChildIdx] || !this.values[rightChildIdx]) && this.valuesLength > 2) break;
      let swap = null;
      if (this.values[leftChildIdx] && this.values[rightChildIdx]) {
        let smallestChildIdx;
        let leftChildIdxPriority = this.values[leftChildIdx].priority;
        let righthildIdxPriority = this.values[rightChildIdx].priority;
        leftChildIdxPriority < righthildIdxPriority ?
          smallestChildIdx = leftChildIdx :
          smallestChildIdx = rightChildIdx;
        this.swap(parentIdx, smallestChildIdx);
        parentIdx = smallestChildIdx;
        swap = true;
      } else if (!this.values[rightChildIdx] && this.values[leftChildIdx]) { // swap when there are only 2 nodes left 
        this.swap(parentIdx, leftChildIdx);
        parentIdx = leftChildIdx;
        swap = true;
      }
      if (swap === null) break;
    }
  }
}

let priorityQueue = new PriorityQueue();
const listOfToDos = [];
const valuesToInsert = [
  {value: 'do dishes', priority: 2},
  {value: 'walk dog', priority: 4},
  {value: 'eat food', priority: 0},
  {value: 'brush teeth', priority: 3},
  {value: 'snort cocaine', priority: 1},
  {value: 'charge phone', priority: 6}
];

// create nodes
for (individualValue of valuesToInsert) {
  listOfToDos.push(new Node(individualValue.value, individualValue.priority));
}

// enqueue nodes in priority queue
for (todo of listOfToDos) {
  priorityQueue.enqueue(todo);
}
console.log(priorityQueue);

// dequeue nodes in priority queue
for (let i = 0; i < 6; i++) {
  priorityQueue.dequeue();
  console.log(priorityQueue);
}
