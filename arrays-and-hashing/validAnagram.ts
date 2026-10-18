// LeetCode 242: Valid Anagram (Easy)
//
// Return true if t is an anagram of s, false otherwise.
//
//   s = "anagram", t = "nagaram"  →  true
//   s = "rat",     t = "car"      →  false
//
// Constraints: 1 <= s.length, t.length <= 5 * 10^4, lowercase English letters.
//
// ---- Recall drill (~30 sec, out loud) ----
//   1. What's the ONE check you can do before counting anything that
//      instantly returns false? (test 3 punishes skipping it)
//   2. One frequency map or two? Can you do it with one map, counting
//      UP for s and DOWN for t — and then what do you check at the end?
//   3. Follow-up they'll actually ask: what breaks with Unicode (think
//      emoji / accents), and does your Map-based approach care?
// Target: O(n) time, O(1) space (26 letters max), ~10 lines, 5 min.

import { check } from './helpers.ts';

const isAnagram = (s: string, t: string): boolean => {
  // your code here
  return false;
};

// ---- tests ----

check('LC ex1', isAnagram('anagram', 'nagaram'), true);
check('LC ex2', isAnagram('rat', 'car'), false);
check('different lengths', isAnagram('ab', 'abb'), false);
check('same letters, different counts', isAnagram('aabb', 'abbb'), false);