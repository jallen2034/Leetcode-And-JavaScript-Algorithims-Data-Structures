// LeetCode 146: LRU Cache
// Design a Least-Recently-Used cache with POSITIVE capacity.
//
//   LRUCache(capacity)     initialize with positive size capacity
//   get(key): number       value if key exists, else -1
//   put(key, value): void  update if key exists; otherwise insert.
//                          If size would exceed capacity, EVICT the least
//                          recently used key first.
//   BOTH get and put must be O(1) average. ("Used" = touched by get OR put.)
//
// Constraints: 1 <= capacity <= 3000, 0 <= key <= 10^4, 0 <= value <= 10^5.
//
// Derive the design yourself on paper first. The two questions to answer
// before writing ANY code:
//   1. What gives you O(1) lookup by key?
//   2. What lets you find AND re-order "least/most recently used" in O(1)?
// When you think you have it, dry-run the LC example below on paper.
// (Hints live at the very bottom of this file — don't scroll unless stuck.)

class LLNode {
  key: number;
  val: number;
  prev: LLNode | null = null;
  next: LLNode | null = null;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

import {check} from './helpers.ts';

class LRUCache {
  capacity: number;
  listLen: number = 0;
  head: LLNode | null = null;
  tail: LLNode | null = null;
  nodeMap: Map<number, LLNode> = new Map()

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const foundNode: LLNode | undefined = this.nodeMap.get(key);

    if (foundNode !== undefined) {
      this.moveNodeToTail(key, foundNode.val);
      return foundNode.val;
    }

    return -1;
  }

  pushFirstNodeToCache(key: number, val: number) {
    const firstNode = new LLNode(key, val);
    this.nodeMap.set(key, firstNode);
    this.head = firstNode;
    this.tail = firstNode;
    this.listLen += 1;
  }

  pushNodeToTailCache(key: number, val: number) {
    const newNode = new LLNode(key, val);

    if (this.tail) {
      this.nodeMap.set(key, newNode);
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.listLen += 1;
    }
  }

  evictHeadNodeAndPushNodeToTailCache(key: number, val: number) {
    if (!this.tail) {
      throw new Error('No valid tail on this List mate.');
    }

    if (!this.head) {
      throw new Error('No valid head on this List mate.');
    }

    const tempNewHead: LLNode | null = this.head?.next

    if (!tempNewHead) {
      throw new Error('Theres no next node from your head bruh');
    }

    tempNewHead.prev = null;
    this.head.next = null
    this.nodeMap.delete(this.head.key);
    this.head = tempNewHead;

    const newNodeForTail = new LLNode(key, val);
    this.tail.next = newNodeForTail;
    newNodeForTail.prev = this.tail;
    this.tail = newNodeForTail;

    this.nodeMap.set(key, newNodeForTail);
  }

  evictNodeInPlace(key: number, val: number) {
    if (!this.head) {
      throw new Error('Theres no next node from your head bruh');
    }

    this.nodeMap.delete(this.head.key);
    this.head = null;
    this.tail = null;
    this.listLen = 0;
    return this.pushFirstNodeToCache(key, val);
  }

  moveNodeToTail(key: number, val: number) {
    const node: LLNode | undefined = this.nodeMap.get(key);

    if (node === undefined || node === this.tail) {
      return;
    }

    if (node === this.head) {
      this.head = node.next
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    this.listLen -= 1;

    this.pushNodeToTailCache(key, val);
  }

  put(key: number, value: number): void {
    const existingNode: LLNode | undefined = this.nodeMap.get(key);

    if (existingNode !== undefined) {
      existingNode.val = value;
      this.moveNodeToTail(key, value);
      return;
    }

    if (this.listLen === 0) {
      return this.pushFirstNodeToCache(key, value);
    }

    if (
      this.listLen === this.capacity &&
      this.head !== null && this.head === this.tail
    ) {
      return this.evictNodeInPlace(key, value);
    }

    if (this.listLen < this.capacity) {
      return this.pushNodeToTailCache(key, value);
    }

    if (this.listLen === this.capacity) {
      return this.evictHeadNodeAndPushNodeToTailCache(key, value);
    }
  }
}

// ---- tests ----
// Recency drawings read front(hottest) ... back(coldest).
// When a test fails, draw the expected order next to what your structure says.

// -- The exact LC example (capacity 2) --
const c = new LRUCache(2);

c.put(1, 1); // (1)
c.put(2, 2); // (2)(1)
check('get(1) hits', c.get(1), 1); // touching 1 reheats it → (1)(2)
c.put(3, 3); // full → evict coldest = 2 → (3)(1)
check('evicted 2 is gone', c.get(2), -1);
c.put(4, 4); // full → evict coldest = 1 → (4)(3)
check('evicted 1 is gone', c.get(1), -1);
check('3 survived', c.get(3), 3); // (3)(4)
check('4 survived', c.get(4), 4); // (4)(3)

// -- put on an EXISTING key: updates value, reheats, never evicts --
const u = new LRUCache(2);
u.put(1, 10);
u.put(2, 20); // (2)(1)
u.put(1, 11); // same key: update + reheat → (1)(2) — size still 2
check('update changes the value', u.get(1), 11);
u.put(3, 30); // evict coldest = 2 (1 was reheated by the update)
check('update reheated key 1, so 2 was evicted', u.get(2), -1);
check('key 1 survived with new value', u.get(1), 11);

// -- capacity 1: every insert evicts the previous tenant --
const s = new LRUCache(1);
s.put(7, 70);
check('sole tenant readable', s.get(7), 70);
s.put(8, 80); // evicts 7
check('previous tenant evicted', s.get(7), -1);
check('new tenant readable', s.get(8), 80);

// -- the traditional 0 punisher: key 0 and value 0 are legal --
const z = new LRUCache(1);
z.put(0, 0);
check('key 0 / value 0 round-trips', z.get(0), 0);

/* ═══════════════════════════ SPOILERS BELOW ═══════════════════════════
 * Hints, mildest first. Reveal one at a time, only when genuinely stuck.
 *
 * Hint 1: One data structure can't do it. O(1) key lookup and O(1)
 *         recency ordering are different superpowers — you need two
 *         structures cooperating.
 *
 * Hint 2: Lookup is a hashmap (built-in Map is fine — you've already
 *         hand-rolled one). Ordering is a linked list sorted by recency:
 *         front = hottest, back = coldest. Eviction = drop the back node.
 *
 * Hint 3: The fusion trick — the map stores key → LIST NODE, not
 *         key → value. Map teleports you to the node; the node's pointers
 *         let you re-link it. Two structures, one shared set of nodes.
 *
 * Hint 4: Singly-linked bites here: unlinking a node needs its PREDECESSOR,
 *         and you swore off O(n) prev-walks. What field on the node fixes
 *         that? (This is why the classic answer is a DOUBLY-linked list.)
 *
 * Hint 5: Dummy head + tail sentinels mean no real node is ever "the head"
 *         or "the tail" — the special case you fought in designHashMap
 *         simply stops existing. Build helpers: addAfterHead(node),
 *         unlink(node), moveToFront = unlink + addAfterHead.
 *
 * Hint 6 (the classic bug): on eviction, removing the list node is only
 *         half the job — forget the map.delete(victim.key) and evicted
 *         keys rise from the dead while your map grows forever. This is
 *         why nodes store their KEY, not just their value.
 * ═══════════════════════════════════════════════════════════════════════ */