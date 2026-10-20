// LeetCode 232: Implement Queue using Stacks (Easy)
// ON PINTEREST'S OWN PREP LIST (Topic 3) — morning warm-up, 15 min cap.
//
// Implement a FIFO queue using only two stacks (push/pop/peek on arrays).
// Support: push(x), pop(), peek(), empty().
//
// ---- Think-first drill (~60 sec, out loud) ----
//   1. A stack reverses order. What does pushing everything through TWO
//      stacks do to the order?
//   2. The trick: an IN stack and an OUT stack. push() always goes to IN.
//      pop()/peek() always serve from OUT. When OUT is empty, pour ALL of
//      IN into it (pop→push each element). Why must you only pour when OUT
//      is EMPTY — what breaks if you pour while OUT still has elements?
//   3. Complexity talking point: a single element is moved at most twice
//      ever (into IN, into OUT) — so pop is amortized O(1) even though one
//      particular pop can be O(n). Say "amortized" out loud; it's the word
//      the interviewer is listening for.

import { check } from './helpers.ts';

class MyQueue {
  inStack: any[] = [];
  outStack: any[] = [];

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    if (this.outStack.length === 0) {
      this.fillOutStack();
    }

    if (this.outStack.length > 0) {
      const itemFromFromQueue = this.outStack.pop();
      return itemFromFromQueue;
    }

    return -1;
  }

  fillOutStack(): boolean {
    while (this.inStack.length > 0) {
      const itemFromInStack = this.inStack.pop();
      this.outStack.push(itemFromInStack);
    }

    return true;
  }

  peek(): number {
    if (this.outStack.length === 0) {
      this.fillOutStack();
    }

    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

// ---- tests ----

const q = new MyQueue();
q.push(1);
q.push(2);
q.push(3);
check('peek triggers the FIRST pour', q.peek(), 1);
q.push(4);
check('pop after a push: must NOT pour yet', q.pop(), 1);
check('pop again from the same pour', q.pop(), 2);
q.push(5);
check('pop the last of the first pour', q.pop(), 3);
check('pop triggers a SECOND pour', q.pop(), 4);
check('peek after the second pour', q.peek(), 5);
check('pop the last one', q.pop(), 5);
check('now empty', q.fillOutStack(), true);
