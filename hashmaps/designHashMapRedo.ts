// LeetCode 706: Design HashMap — REBUILD from blank.
// (Round 1: designHashMap.ts, 2026-10-13. No peeking until green.)
//
// Build a HashMap WITHOUT built-in hash table libraries (no Map/object
// used AS the map — arrays are fine):
//
//   put(key, value)   insert or UPDATE
//   get(key)          value if present, else -1
//   remove(key)       delete the mapping if present
//
// Constraints: 0 <= key, value <= 10^6, up to 10^4 calls.
//
// ---- The drill (~30 min) ----
// Same architecture as round 1: fixed bucket array + hash(key) = key % size,
// collisions handled by CHAINING (linked list per bucket).
//
// Round 1's hard-won lesson — say it before you code:
//   "a walker can't repoint the bucket slot — only the caller can, via
//    this.buckets[idx] = ..."
// (You met this bug AGAIN in LC 92's helper last session. Third time's
// the install.)
//
// Design questions to answer on paper first:
//   - what does remove() do when the head of the chain is the victim?
//     (hint: you now know the dummy-node pattern — does it help here?)
//   - update vs insert in put(): how do you find out which one you're doing?

import { check } from './helpers.ts';

class MyHashMap {
  // TODO

  constructor() {
    throw new Error('not implemented');
  }

  put(key: number, value: number): void {
    throw new Error('not implemented');
  }

  get(key: number): number {
    throw new Error('not implemented');
  }

  remove(key: number): void {
    throw new Error('not implemented');
  }
}

// ---- tests ----

// -- LC example flow --
const m = new MyHashMap();
m.put(1, 1);
m.put(2, 2);
check('get existing', m.get(1), 1);
check('get missing', m.get(3), -1);
m.put(2, 1); // update
check('update overwrites', m.get(2), 1);
m.remove(2);
check('removed key is gone', m.get(2), -1);

// -- collisions: keys that land in the same bucket must coexist --
// (with size S, keys k and k+S collide — adjust if your size differs,
//  or just trust these: with any reasonable size, SOME of these collide)
const col = new MyHashMap();
col.put(1, 100);
col.put(1001, 200);
col.put(2001, 300);
check('collision: first key', col.get(1), 100);
check('collision: second key', col.get(1001), 200);
check('collision: third key', col.get(2001), 300);
col.remove(1001); // remove the MIDDLE of the chain
check('collision: middle removed', col.get(1001), -1);
check('collision: first survives', col.get(1), 100);
check('collision: third survives', col.get(2001), 300);

// -- remove the HEAD of a chain (the bucket-slot repoint case) --
const hd = new MyHashMap();
hd.put(5, 50);
hd.put(1005, 150); // same bucket as 5 (if size divides 1000) — chain of 2
hd.remove(5); // whichever is the chain head, one of these two removals is it
check('head-removal: 5 gone', hd.get(5), -1);
check('head-removal: 1005 survives', hd.get(1005), 150);
hd.remove(1005);
check('chain fully emptied', hd.get(1005), -1);

// -- key 0 / value 0 are legal --
const z = new MyHashMap();
z.put(0, 0);
check('key 0 / value 0 round-trips', z.get(0), 0);
z.remove(0);
check('key 0 removable', z.get(0), -1);

// -- remove on a key that never existed: must not throw or corrupt --
const n = new MyHashMap();
n.put(9, 90);
n.remove(4); // no-op
check('unrelated key survives a no-op remove', n.get(9), 90);
