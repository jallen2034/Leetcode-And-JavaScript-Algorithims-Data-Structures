class MaxBinaryHeap {
  constructor() {
    this.values = [];
    this.valuesLength = this.values.length;
  }
  insert(element) {
    this.values.push(element);
    this.bubbleUp();
    this.valuesLength += 1;
  }
  bubbleUp() {
    let index = this.valuesLength;
    const element = this.values[index];
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[index] = parent;
      index = parentIdx;
    }
  };
  swap(indx1, indx2) {
    const temp = this.values[indx1];
    this.values[indx1] = this.values[indx2];
    this.values[indx2] = temp;
  }
  extractMax() {
    let index = this.valuesLength - 1;
    this.values[0] = this.values[index];
    this.values.pop();
    this.valuesLength -= 1;
    this.bubbleDown();
  }
  bubbleDown() {
    let parentIdx = 0;
    while (true) {
      let leftChildIndex = Math.floor(2 * parentIdx) + 1;
      let rightChildIndex = Math.floor(2 * parentIdx) + 2;
      // stop swapping nodes when we hit the leafs of our binary heap
      if (leftChildIndex >= this.valuesLength || rightChildIndex >= this.valuesLength) break;
      let swap = null;
      if (leftChildIndex && rightChildIndex) {
        let largestChildIdx;
        this.values[leftChildIndex] > this.values[rightChildIndex] ?
          largestChildIdx = leftChildIndex :
          largestChildIdx = rightChildIndex;
        this.swap(parentIdx, largestChildIdx);
        parentIdx = largestChildIdx;
        swap = true;
      } else if (!leftChildIndex && rightChildIndex) {
        this.swap(parentIdx, rightChildIndex);
        parentIdx = rightChildIndex;
        swap = true;
      } else if (!rightChildIndex && leftChildIndex) {
        this.swap(parentIdx, leftChildIndex);
        parentIdx = leftChildIndex;
        swap = true;
      }
      if (swap === null) break;
    }
  }
}

let heap = new MaxBinaryHeap();
const valuesToInsert = [41, 39, 33, 18, 27, 12, 55];
for (value of valuesToInsert) {
  heap.insert(value);
}
console.log(heap);
heap.extractMax();
console.log(heap);
