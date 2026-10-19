// LeetCode 146: LRU Cache — ROUND 3. Sentinels are MANDATORY this time.
// (Round 1: lruCache.ts. Round 2: lruCacheRedo.ts. No peeking at either.)
//
//   LRUCache(capacity)     positive size capacity
//   get(key): number       value if key exists, else -1
//   put(key, value): void  update if exists; else insert. If size would
//                          exceed capacity, evict the least recently used.
//   Both O(1) average. "Used" = touched by get OR put.
//
// ---- THE RULES OF ROUND 3 ----
// 1. FIRST LINE of the class: the convention comment. Something like:
//      // head side = coldest (evict), tail side = hottest (insert/reheat)
//    Every method gets checked against it. (Round 2's biggest time sink
//    was skipping this — ~45 min of orientation drift.)
// 2. Constructor creates TWO SENTINEL nodes, permanently wired:
//    dummyHead ⇄ dummyTail. head/tail fields are typed LLNode, never
//    undefined. You just used this pattern to pass LC 92 — same move,
//    doubled.
// 3. Target: zero `if (this.head)` style guards. If you're writing a null
//    check on an end pointer, the sentinels aren't doing their job.
//    Aim for two tiny helpers: unlink(node), addAtHotEnd(node).
// 4. Timer: 35 minutes. Round 2 took 1h45. Beat it.
//
// Remember round 2's scars (each cost real time):
//   - eviction must map.delete AND re-aim nothing (sentinels absorb it)
//   - put on EXISTING key: mutate .val in place + reheat + RETURN early
//   - get and put both reheat

import { check } from './helpers.ts';

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

class LRUCache {
  maxCacheSize: number = 0;
  capacity: number = 0;
  head: LLNode | null = null;
  tail: LLNode | null = null;
  cache: Map<number, LLNode> = new Map<number, LLNode>();

  constructor(cacheSize: number) {
    this.maxCacheSize = cacheSize;
  }

  private spawnNode(key: number, val: number) {
    return new LLNode(key, val);
  }

  private moveItemMiddleCacheToHead(node: LLNode) {
    const tempPrevNode: LLNode | null = node.prev;
    const tempNextNode: LLNode | null = node.next;

    node.prev = null;
    node.next = null;

    tempPrevNode!.next = tempNextNode;
    tempNextNode!.prev = tempPrevNode;

    this.tail!.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  private moveHeadItemToTail() {
    if (this.head === this.tail) {
      return;
    }

    const tempNewHead: LLNode | null = this.head!.next;
    tempNewHead!.prev = null;
    this.head!.next = null;
    this.tail!.next = this.head;
    this.head!.prev = this.tail;
    this.tail = this.head;
    this.head = tempNewHead;
  }

  private removeHeadOfCache() {
    this.cache.delete(this.head!.key);
    this.capacity -= 1;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }


    const tempNext: LLNode | null = this.head!.next;
    this.head!.next = null;
    tempNext!.prev = null;
    this.head = tempNext;
  }

  insertItemToFullCache(key: number, val: number) {
    this.removeHeadOfCache();

    if (this.head === null) {
      this.insertFirstItemCache(key, val);
      return;
    }

    this.insertItemCache(key, val);
  }

  private insertItemCache(key: number, val: number) {
    const newNode: LLNode = this.spawnNode(key, val);
    this.capacity += 1;

    this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.cache.set(key, newNode);
  }

  private insertFirstItemCache(key: number, val: number) {
    const firstNode: LLNode = this.spawnNode(key, val);
    this.head = firstNode;
    this.tail = firstNode;
    this.cache.set(key, firstNode);
    this.capacity += 1;
  }

  public get(key: number): number | void {
    const existingNode: LLNode | undefined = this.cache.get(key);

    if (existingNode === undefined) {
      return -1;
    }

    this.reheat(existingNode);
    return existingNode.val;
  }

  private reheat(node: LLNode) {
    if (node === this.tail) {
      return;
    }

    if (node === this.head) {
      this.moveHeadItemToTail();
      return;
    }

    this.moveItemMiddleCacheToHead(node);
  }

  public put(key: number, val: number): void {
    if (this.capacity === 0) {
      this.insertFirstItemCache(key, val);
      return;
    }

    const existingNodeWithSameKey: LLNode | undefined = this.cache.get(key);

    if (existingNodeWithSameKey !== undefined) {
      existingNodeWithSameKey.val = val
      this.reheat(existingNodeWithSameKey);
      return;
    }

    if (this.capacity < this.maxCacheSize) {
      this.insertItemCache(key, val);
      return;
    }

    if (this.capacity === this.maxCacheSize) {
      this.insertItemToFullCache(key, val);
      return;
    }
  }
}

// ---- tests ---- (round 2's suite + the LC 22/23 regression)

// -- the LC example pattern, widened to capacity 3 --
const c = new LRUCache(3);
c.put(1, 1);
c.put(2, 2);
c.put(3, 3); // cache full: LRU order 1, 2, 3
check('get(1) hits', c.get(1), 1); // reheats 1 → order 2, 3, 1
c.put(4, 4); // evicts 2 (coldest), NOT 1
check('evicted 2 is gone', c.get(2), -1);
c.put(5, 5); // evicts 3
check('evicted 3 is gone', c.get(3), -1);
check('1 survived the reheat', c.get(1), 1);
check('4 survived', c.get(4), 4);
check('5 survived', c.get(5), 5);

// -- put on an EXISTING key: update + reheat, never evict --
const u = new LRUCache(2);
u.put(1, 10);
u.put(2, 20);
u.put(1, 11); // update + reheat
check('update changes the value', u.get(1), 11);
u.put(3, 30); // evicts 2, not 1
check('update reheated key 1, so 2 was evicted', u.get(2), -1);
check('key 1 survived with new value', u.get(1), 11);

// // -- capacity 1 --
const s = new LRUCache(1);
s.put(7, 70);
check('sole tenant readable', s.get(7), 70);
s.put(8, 80);
check('previous tenant evicted', s.get(7), -1);
check('new tenant readable', s.get(8), 80);
//
// // -- the LC 22/23 REGRESSION (the one that got you): capacity-1 churn --
const r = new LRUCache(1);
check('churn: get on empty', r.get(6), -1);
r.put(12, 1);
r.put(15, 11); // evict 12
r.put(5, 2); //   evict 15
r.put(1, 15); //  evict 5
r.put(4, 2); //   evict 1
check('churn: get(4) after repeated evict-insert', r.get(4), 2);
r.put(15, 15);
check('churn: 4 evicted by 15', r.get(4), -1);
check('churn: 15 is sole tenant', r.get(15), 15);
//
// // -- zombie keys stay dead --
const g = new LRUCache(2);
g.put(1, 1);
g.put(2, 2);
g.put(3, 3); // evicts 1
check('evicted key 1 is dead', g.get(1), -1);
g.put(1, 100); // clean re-insert
check('re-inserted key 1 has the NEW value', g.get(1), 100);
//
// // -- hammer: exact eviction order under churn (capacity 3) --
const h = new LRUCache(3);
h.put(1, 1);
h.put(2, 2);
h.put(3, 3);
h.get(1);
h.put(4, 4); // evicts 2
h.get(3);
h.put(5, 5); // evicts 1
check('hammer: 2 gone', h.get(2), -1);
check('hammer: 1 gone', h.get(1), -1);
check('hammer: 4 alive', h.get(4), 4);
check('hammer: 5 alive', h.get(5), 5);
check('hammer: 3 alive', h.get(3), 3);
h.put(6, 6); // evicts 4
check('hammer: 4 evicted after reheats', h.get(4), -1);
check('hammer: 5 survived', h.get(5), 5);
