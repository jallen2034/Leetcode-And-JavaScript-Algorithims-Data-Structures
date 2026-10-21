// LeetCode 146: LRU Cache — ROUND 4, THE SPEED ROUND.
// UNLOCK RULE: only after round 3 is verified green (counter-symmetry
// edits included). Rounds 1-3: lruCache.ts / lruCacheRedo.ts /
// lruCacheRound3.ts. No peeking at ANY of them — blank-page build.
//
//   LRUCache(capacity) / get(key): number / put(key, value): void
//   Both O(1) average. "Used" = touched by get OR put.
//
// ---- THE RULES OF ROUND 4 ----
// 1. Timer: 25 MINUTES, tests green. Round 3's target was 35. This is the
//    "could I do this live at Microsoft tomorrow" check — narrate while
//    you type, like someone's watching.
// 2. Everything from round 3 is still law: convention comment on line one
//    of the class, two permanent sentinels, zero end-pointer null checks,
//    unlink(node) + addAtHotEnd(node) helpers.
// 3. New this round: say the round-2 scars OUT LOUD before typing (evict =
//    map.delete too; existing-key put = mutate + reheat + early return;
//    get AND put both reheat). Saying them first is the rep.
//
// If the timer blows past 35 min, stop and diagnose which piece wasn't
// automatic yet — that piece is the review target, not another full round.

import { check } from './helpers.ts';

// your LRUCache class here

// ---- tests ----
// Uncomment when the class exists.

// const cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// check('get warm key', cache.get(1), 1);
// cache.put(3, 3); // evicts 2 (1 was reheated by the get)
// check('evicted the cold key', cache.get(2), -1);
// cache.put(4, 4); // evicts 1
// check('evicted next cold key', cache.get(1), -1);
// check('survivor 3', cache.get(3), 3);
// check('survivor 4', cache.get(4), 4);

// const c2 = new LRUCache(2);
// c2.put(1, 1);
// c2.put(2, 2);
// c2.put(1, 10); // existing key: update + reheat, NO eviction
// c2.put(3, 3);  // evicts 2, not 1
// check('updated value', c2.get(1), 10);
// check('2 was the evictee', c2.get(2), -1);
// check('3 made it in', c2.get(3), 3);
