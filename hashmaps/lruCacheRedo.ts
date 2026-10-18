// LeetCode 146: LRU Cache — REBUILD, from scratch, on the clock.
// (Round 1 lives in lruCache.ts. Do NOT peek at it until all tests pass.)
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
// THE DRILL (interview conditions — ~25 min total):
//   1. Pen & paper FIRST (~10 min): draw the two structures, the sentinel
//      layout, and dry-run the LC example by hand. No code until the
//      drawing works.
//   2. This time, build it with DUMMY HEAD + TAIL SENTINELS. Goal: zero
//      null checks on head/tail, no "first node" / "last node" special
//      cases — the branch-heavy version in round 1 is the thing to beat.
//   3. Narrate out loud while you code, like you would for the interviewer.
//
// Start the timer. Go.

import {check} from './helpers.ts';

class LLNode {
  key: number;
  val: number;
  prev: LLNode | undefined;
  next: LLNode | undefined;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

class LRUCache {
  capacity: number = 0;
  cacheSize: number;
  head: LLNode | undefined;
  tail: LLNode | undefined;
  cache: Map<number, LLNode> = new Map<number, LLNode>();

  constructor(cacheSize: number) {
    this.cacheSize = cacheSize
  }

  private spawnNewNode = (key: number, val: number) => {
    return new LLNode(key, val);
  }

  private incrementCapacity = () => {
    this.capacity += 1;
  }

  private decrementCapacity = () => {
    this.capacity -= 1;
  }

  // Handle when the cache is empty.
  private insertEmptyCache = (key: number, val: number) => {
    const initialNode: LLNode = this.spawnNewNode(key, val);

    this.head = initialNode;
    this.tail = initialNode;

    this.cache.set(key, initialNode);
    this.incrementCapacity();
  }

  private shiftPointersOfNodeToTail = (node: LLNode) => {
    const prevTail: LLNode | undefined = this.tail;

    if (prevTail) {
      this.tail = node;
      node.prev = prevTail;
      prevTail.next  = node;
    }
  }

  // Handle when we can just insert a new node into a cache not yet full.
  private insertCache = (key: number, val: number) => {
    if (this.tail === undefined) {
      return this.insertEmptyCache(key, val);
    }

    const newNode: LLNode = this.spawnNewNode(key, val);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.cache.set(key, newNode);
    this.incrementCapacity();
  }

  private evictLastNodeCache() {
    if (this.head) {
      const newHead: LLNode | undefined = this.head.next;
      const headKeyToDel: number = this.head.key;
      this.head.next = undefined;

      if (newHead === undefined) {
        this.tail = undefined;
      }

      if (newHead) {
        newHead.prev = undefined;
      }

      this.head = newHead;
      this.cache.delete(headKeyToDel);
      this.decrementCapacity();
    }
  }

  // Handle when we need to insert a value into cache and eject LRU.
  private insertFullCache = (key: number, val: number) => {
    this.evictLastNodeCache();
    this.insertCache(key, val);
  }

  private shiftExistingValToFrontCache = (key: number) => {
    const searchedNode: LLNode | undefined = this.cache.get(key);

    if (searchedNode === undefined) {
      return;
    }

    if (searchedNode === this.tail) {
      return;
    }

    // Node is already on the end of the LL.
    if (searchedNode.prev === undefined) {
      const next: LLNode | undefined = searchedNode.next;

      if (next) {
        next.prev = undefined;
        searchedNode.next = undefined;
        this.head = next;
      }

      return this.shiftPointersOfNodeToTail(searchedNode);
    }

    // Node is in the middle of the LL.
    if (searchedNode.next && searchedNode.prev) {
      const prev: LLNode | undefined = searchedNode.prev;
      const next: LLNode | undefined = searchedNode.next;

      if (prev && next) {
        searchedNode.prev = undefined;
        searchedNode.next = undefined;
        prev.next = next;
        next.prev = prev;
      }

      return this.shiftPointersOfNodeToTail(searchedNode);
    }
  }

  public get(key: number): number {
    if (this.cache.has(key)) {
      this.shiftExistingValToFrontCache(key);
    }

    const gotNode: LLNode | undefined = this.cache.get(key);

    if (gotNode) {
      return gotNode.val;
    }

    return -1;
  }

  public put(key: number, value: number): void {
    const existingNodeInList: LLNode | undefined = this.head;
    const cacheFull: boolean = this.capacity < this.cacheSize;

    const existingNodeInCache: LLNode | undefined  = this.cache.get(key);

    if (existingNodeInCache) {
      existingNodeInCache.val = value;
      return this.shiftExistingValToFrontCache(key);
    }

    if (existingNodeInList === undefined) {
      return this.insertEmptyCache(key, value);
    }

    if (cacheFull) {
      return this.insertCache(key, value);
    }

    if (this.capacity === this.cacheSize) {
      return this.insertFullCache(key, value);
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

// -- the zombie-key test: an evicted key must be FULLY forgotten --
// (catches the classic bug: list node removed, map entry left behind)
const g = new LRUCache(2);
g.put(1, 1);
g.put(2, 2); // (2)(1)
g.put(3, 3); // evicts 1 → (3)(2)
check('evicted key 1 is dead', g.get(1), -1);
g.put(1, 100); // re-inserting a previously evicted key must work cleanly
check('re-inserted key 1 has the NEW value', g.get(1), 100); // (1)(3)
g.put(4, 4); // evicts coldest = 2... wait, 2 was already evicted by put(3).
check('2 was evicted back at put(3)', g.get(2), -1);
check('3 was coldest, so put(4) evicted it', g.get(3), -1); // (4)(1)
check('1 survived', g.get(1), 100);

// -- get on a key that was never inserted --
const n = new LRUCache(2);
check('missing key on fresh cache', n.get(5), -1);
n.put(5, 50);
check('get(missing) must not have created an entry', n.get(99), -1);
check('real key still fine', n.get(5), 50);

// -- hammer: interleaved churn at capacity 3, checks exact eviction order --
const h = new LRUCache(3);
h.put(1, 1);
h.put(2, 2);
h.put(3, 3); // (3)(2)(1)
h.get(1); //    (1)(3)(2)
h.put(4, 4); // evict 2 → (4)(1)(3)
h.get(3); //    (3)(4)(1)
h.put(5, 5); // evict 1 → (5)(3)(4)
check('hammer: 2 gone', h.get(2), -1);
check('hammer: 1 gone', h.get(1), -1);
check('hammer: 4 alive', h.get(4), 4); // (4)(5)(3)
check('hammer: 5 alive', h.get(5), 5); // (5)(4)(3)
check('hammer: 3 alive', h.get(3), 3); // (3)(5)(4)
h.put(6, 6); // evict coldest = 4 → (6)(3)(5)
check('hammer: 4 evicted after reheats', h.get(4), -1);
check('hammer: 5 survived', h.get(5), 5);

// -- LC regression: capacity 1 with repeated evict→insert cycles --
// (the 22/23 Wrong Answer sequence, 2026-10-15)
const r = new LRUCache(1);
check('lc-regression: get(6) on empty', r.get(6), -1);
check('lc-regression: get(8) on empty', r.get(8), -1);
r.put(12, 1);
check('lc-regression: get(2) miss', r.get(2), -1);
r.put(15, 11); // evict 12
r.put(5, 2); //   evict 15
r.put(1, 15); //  evict 5
r.put(4, 2); //   evict 1
check('lc-regression: get(4) after churn', r.get(4), 2);
r.put(15, 15);
check('lc-regression: only 4 should be gone', r.get(4), -1);
check('lc-regression: 15 is the sole tenant', r.get(15), 15);