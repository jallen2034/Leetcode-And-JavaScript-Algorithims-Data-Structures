import { check } from './helpers.ts';

class NumberStack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

class MyQueue {
  private input = new NumberStack<number>();
  private output = new NumberStack<number>();

  push(x: number): void {
    this.input.push(x);
  }

  private refillOutputIfNeeded(): void {
    if (this.output.isEmpty()) {
      while (this.input.size() > 0) {
        const itemToPop: number = this.input.pop()!;
        this.output.push(itemToPop);
      }
    }
  }

  pop(): number {
    this.refillOutputIfNeeded();
    return this.output.pop();
  }

  peek(): number {
    this.refillOutputIfNeeded();
    return this.output.peek();
  }

  empty(): boolean {
    if (this.output.isEmpty() && this.input.isEmpty()) {
      return true;
    } else {
      return false;
    }
  }
}

// Scenario A: the LeetCode example
const qA = new MyQueue();
qA.push(1); // queue: [1]
qA.push(2); // queue: [1, 2]
check('Test 1', qA.peek(), 1); // front is 1
check('Test 2', qA.pop(), 1); // removes and returns 1, queue: [2]
check('Test 3', qA.empty(), false);

// Scenario B: pushes and pops interleaved (where naive versions tend to break)
const qB = new MyQueue();
qB.push(1); // [1]
qB.push(2); // [1, 2]
check('Test 4', qB.pop(), 1); // [2]
qB.push(3); // [2, 3]  <- pushing AFTER a pop
check('Test 5', qB.peek(), 2); // front still 2
check('Test 6', qB.pop(), 2); // [3]
check('Test 7', qB.pop(), 3); // []
check('Test 8', qB.empty(), true);
//
// // Scenario C: single element
const qC = new MyQueue();
qC.push(5);
check('Test 9', qC.peek(), 5);
check('Test 10', qC.pop(), 5);
check('Test 11', qC.empty(), true);

// Scenario F: long interleaved run — two pours, a peek, pushes mid-drain
const qF = new MyQueue();
qF.push(1);
qF.push(2);
qF.push(3);
check('Test 19', qF.pop(), 1);   // first pour happens here
qF.push(4);               // lands on intake while output still holds 3, 2
check('Test 20', qF.peek(), 2);  // no pour, just looks
check('Test 21', qF.pop(), 2);
qF.push(5);               // intake again
check('Test 22', qF.pop(), 3);   // this empties the output stack
check('Test 23', qF.pop(), 4);   // second pour happens here
check('Test 24', qF.pop(), 5);
check('Test 25', qF.empty(), true);

// Scenario D: FIFO order preserved across several elements
const qD = new MyQueue();
qD.push(1);
qD.push(2);
qD.push(3);
qD.push(4);
check('Test 12', qD.pop(), 1);
check('Test 13', qD.pop(), 2);
check('Test 14', qD.peek(), 3);
check('Test 15', qD.pop(), 3);
check('Test 16', qD.pop(), 4);
check('Test 17', qD.empty(), true);

// Scenario E: empty on a fresh queue
const qE = new MyQueue();
check('Test 18', qE.empty(), true);