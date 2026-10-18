// LeetCode 706: Design HashMap
// Design a HashMap without using any built-in hash table libraries (no Map, no Set,
// no plain-object {} as the store — a raw array of buckets only).
//
//   MyHashMap()            initializes an empty map
//   put(key, value): void  inserts the pair; if key exists, UPDATE its value
//   get(key): number       the mapped value, or -1 if the key isn't present
//   remove(key): void      removes the key and its value if present
//
// Constraints: 0 <= key, value <= 10^6, at most 10^4 calls.
//
// The goal is to FEEL why get/put are O(1): the hash function COMPUTES where the
// data lives, so you jump straight to it — no scanning. An array gives O(1) access
// by index; a hash function turns a key into an index. That's the whole magic.
// Tiny on purpose: guarantees the test suite's collisions. A real map would
// start bigger (and resize — Milestone 5a).
const DEFAULT_CAPACITY = 4;

// One link in a bucket's chain.
class PairNode {
  key: number;
  value: number;
  next: PairNode | null;

  constructor(key: number, value: number, next: PairNode | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class MyHashMap {
  private capacity: number;
  private buckets: (PairNode | null | undefined)[]; // each slot: head of a chain, or null

  constructor(capacity: number = DEFAULT_CAPACITY) {
    this.capacity = capacity;
    this.buckets = new Array(capacity);
  }

  private hash(key: number): number {
    return key % this.capacity;
  }

  walkListToEndAndInsert(newHeadNode: PairNode, head: PairNode, key: number, value: number) {
    while (head) {
      if (head.key === key) {
        head.value = value;
        return;
      }

      if (!head.next) {
        return head.next = newHeadNode;
      }

      head = head.next;
    }
  }

  put(key: number, value: number): void {
    const bucketIdx: number = this.hash(key);
    const newHeadNode = new PairNode(key, value, null);
    const head: PairNode | null | undefined  = this.buckets[bucketIdx];

    if (head === null || head === undefined) {
      this.buckets[bucketIdx] = newHeadNode;
      return;
    }

    this.walkListToEndAndInsert(newHeadNode, head, key, value);
  }

  walkListGetNodeByKey(key: number, head: PairNode): number {
    while (head) {
      if (key === head.key) {
        return head.value;
      }

      if (!head.next) {
        break;
      }

      head = head.next
    }

    return -1;
  }

  get(key: number): number {
    const bucketIdx: number = this.hash(key);
    const head: PairNode | null | undefined = this.buckets[bucketIdx];

    if (head === null || head === undefined) {
      return -1;
    }

    const val: number = this.walkListGetNodeByKey(key, head);
    return val;
  }

  walkListDeleteNodeByKey(head: PairNode, key: number) {
    let curr: PairNode | null = head;
    let prev: PairNode | null = null;

    // List is empty.
    if (!head) {
      return null;
    }

    // When we want to delete the start of the list.
    if (head.key === key) {
      const tempNextNode: PairNode | null = head.next;
      head.next = null;
      return tempNextNode;
    }

    while (curr) {
      // When we want to delete end of list.
      if (curr.key === key && !curr.next && prev) {
        prev.next = null;
        return head;
      }

      // When we want to delete middle of list.
      if (curr.key === key && prev && curr.next) {
        const removedNode: PairNode = curr;
        prev.next = curr.next;
        removedNode.next = null;
      }

      prev = curr;
      curr = curr.next;
    }

    return head;
  }

  remove(key: number): void {
    const bucketIdx: number = this.hash(key);
    const head: PairNode | null | undefined  = this.buckets[bucketIdx];

    if (head === null || head === undefined) {
      return;
    }

    const newHead: PairNode | null | undefined = this.walkListDeleteNodeByKey(head, key);

    this.buckets[bucketIdx] = newHead
  }
}

// ---- tests ----
// ONE scenario: three puts into the SAME bucket (1 % 4 and 5 % 4 are both 1),
// hitting all three put branches. Trace on paper before each line:
//   1. hash(key) = ?   2. slot null? which branch?   3. walk: curr.key === key?
//   4. draw the pointer change.
// Restore the full suite (remove, zero-edge, etc.) from git history once green.
import { check } from './helpers.ts';

const m = new MyHashMap();
// buckets: [ null , null , null , null ]

m.put(1, 100); // branch 1: empty slot → new node becomes head
// buckets: [ null , (1,100) , null , null ]

m.put(5, 500); // branch 2: chain exists, key not in it → walk to tail, append
// buckets: [ null , (1,100)->(5,500) , null , null ]

m.put(5, 555); // branch 3: key already in chain → update value, NO new node
// buckets: [ null , (1,100)->(5,555) , null , null ]

check('key 1 readable', m.get(1), 100);
check('key 5 appended to chain', m.get(5), 555);
check('update did not add a node', m['buckets'][1]?.next?.next ?? null, null);
check('missing key', m.get(3), -1);

// -- remove: four cases against [ null , (1,100)->(5,555) , null , null ] --
m.remove(9); // 9 % 4 = 1: real chain, key not in it — walk, find nothing, change NOTHING
check('remove miss in real chain: no-op', m.get(1), 100);

m.remove(5); // tail node — prev.next surgery
// buckets: [ null , (1,100) , null , null ]
check('removed tail gone', m.get(5), -1);
check('head survives tail removal', m.get(1), 100);

m.put(5, 500); // rebuild the chain: (1,100)->(5,500)
m.remove(1); // HEAD with a chain behind it — the bucket slot itself must repoint
// buckets: [ null , (5,500) , null , null ]
check('removed head gone', m.get(1), -1);
check('chain-mate survives head removal', m.get(5), 500);

m.remove(5); // remove the LAST node — slot must become empty, not crash
// buckets: [ null , null , null , null ]
check('removed sole node gone', m.get(5), -1);

m.remove(99); // 99 % 4 = 3: empty bucket — silent no-op
check('remove from empty bucket: no crash', m.get(3), -1);