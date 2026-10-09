// LeetCode 707: Design Linked List (doubly linked version).
// This one keeps its own Node class since the shared ListNode is singly linked.

import { check } from './helpers.ts';

class Node {
  val: number;
  next: Node | null;
  prev: Node | null;

  constructor(data: any) {
    this.val = data
    this.next = null;
    this.prev = null;
  }
}

class MyDoublyLinkedList {
  head: Node | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  get(index: number): number {
    if (index >= this.size) {
      return -1;
    }

    let idxCounter: number = 0;
    let current: Node | null = this.head;

    while (current) {
      if (idxCounter === index) {
        return current.val;
      }

      current = current.next;
      idxCounter += 1;
    }

    return -1;
  }

  addAtHead(val: number): void {
    const current: Node | null = this.head;

    if (!current) {
      this.head = new Node(val);
      this.size += 1;
      return;
    }

    if (current) {
      const newNode: Node = new Node(val);
      current.prev = newNode;
      newNode.next = current;
      this.size += 1;
      this.head = newNode;
    }
  }

  addAtTail(val: number): void {
    let current: Node | null = this.head;

    if (!current) {
      this.head = new Node(val);
      this.size += 1;
      return;
    }

    while (current) {
      if (!current.next) {
        const newNode: Node = new Node(val);
        newNode.prev = current;
        current.next = newNode;
        this.size += 1;
        return;
      }

      current = current.next;
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    if (index === this.size) {
      this.addAtTail(val);
      return;
    }

    if (index > this.size) {
      return;
    }

    let idxCounter: number = 0;
    let current: Node | null = this.head;
    let prev: Node | null = null;

    if (!current) {
      this.head = new Node(val);
      this.size += 1;
      return;
    }

    while (current) {
      if (idxCounter === index) {
        const newNode = new Node(val);

        if (prev) {
          newNode.prev = prev;
          prev.next = newNode;
        }

        newNode.next = current;
        current.prev = newNode;
        this.size += 1;

        return;
      }

      prev = current;
      current = current.next;
      idxCounter += 1;
    }
  }

  deleteAtIndex(index: number): void {
    if (index >= this.size) {
      return;
    }

    let idxCounter: number = 0;
    let current: Node | null = this.head;
    let prev: Node | null = null;

    if (!current) {
      return;
    }

    if (index === 0) {
      prev = current;
      current = current.next;

      if (current) {
        current.prev = null;
        prev.next = null;

        this.head = current;

      } else {
        this.head = null;
      }

      this.size -= 1;
      return;
    }

    while (current) {
      if (idxCounter === index) {
        const tempNextPtr: Node | null = current.next;
        current.prev = null;
        current.next = null;

        if (tempNextPtr) {
          tempNextPtr.prev = prev;
        }

        if (prev) {
          prev.next = tempNextPtr;
        }

        this.size -= 1;
        return;
      }

      prev = current;
      current = current.next;
      idxCounter += 1;
    }
  }
}

// ---- test helpers (not part of the solution) ----

// Reads the whole list using only get(), so it works with any internal design.
// (Safe here because none of the test values are -1.)
const snapshot = (list: MyDoublyLinkedList): number[] => {
  const values: number[] = [];
  for (let i = 0; i < 50; i++) {
    const v = list.get(i);
    if (v === -1) break;
    values.push(v);
  }
  return values;
};

const list = new MyDoublyLinkedList();

check('get on empty list', list.get(0), -1);

list.addAtHead(1);                 // 1
list.addAtTail(3);                 // 1 → 3
list.addAtIndex(1, 2);             // 1 → 2 → 3          (insert in the middle)
check('after add head/tail/middle', snapshot(list), [1, 2, 3]);
check('get(1)', list.get(1), 2);

list.addAtIndex(3, 4);             // 1 → 2 → 3 → 4      (index === length: append)
list.addAtIndex(10, 99);           // unchanged          (index > length: ignored)
check('after append + ignored add', snapshot(list), [1, 2, 3, 4]);
check('get out of range', list.get(4), -1);

list.deleteAtIndex(1);             // 1 → 3 → 4          (delete from middle)
list.deleteAtIndex(0);             // 3 → 4              (delete the head)
list.deleteAtIndex(5);             // unchanged          (invalid index: ignored)
check('after middle + head deletes', snapshot(list), [3, 4]);

list.deleteAtIndex(1);             // 3                  (delete the tail)
list.addAtIndex(0, 7);             // 7 → 3              (addAtIndex at 0 = new head)
check('after tail delete + insert at 0', snapshot(list), [7, 3]);

list.deleteAtIndex(0);
list.deleteAtIndex(0);             // empty again
list.addAtTail(5);                 // 5                  (addAtTail on an empty list)
check('rebuilt from empty', snapshot(list), [5]);