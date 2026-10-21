// LeetCode 14: Longest Common Prefix (Easy) — Microsoft frequent flyer
//
// Longest prefix shared by ALL strings; "" if none.
//
//   ["flower","flow","flight"] → "fl"
//   ["dog","racecar","car"]    → ""
//
// Constraints: 1 <= n <= 200, 0 <= s.length <= 200, lowercase letters.
//
// ---- Speed drill (~30 sec) ----
//   1. Simplest honest shape: take strs[0] as the candidate. Walk its
//      characters; at column i, check every OTHER string. Two ways to
//      die at column i — name both (one is a mismatch, one is a length
//      problem; test 4 is the length one).
//   2. When you die at column i, what exactly do you return? Off-by-one
//      bait — slice bounds, think before typing.
//   3. Complexity out loud: O(total characters) worst case — why can't
//      you beat it?
//
// Target: ~12 lines, 10 min.

import { check } from './helpers.ts';

const longestCommonPrefix = (strs: string[]): string => {
  // your code here
  return '';
};

// ---- tests ----

check('LC ex1: fl', longestCommonPrefix(['flower', 'flow', 'flight']), 'fl');
check('LC ex2: none', longestCommonPrefix(['dog', 'racecar', 'car']), '');
check('single string', longestCommonPrefix(['alone']), 'alone');
check('one string is the prefix: ["ab","abc"]', longestCommonPrefix(['ab', 'abc']), 'ab');
check('empty string in list', longestCommonPrefix(['abc', '', 'ab']), '');
check('identical strings', longestCommonPrefix(['same', 'same']), 'same');
