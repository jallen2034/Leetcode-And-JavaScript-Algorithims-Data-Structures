// LeetCode 49: Group Anagrams (Medium) — Microsoft frequent flyer
//
// Group the strings that are anagrams of each other. Any order.
//
//   ["eat","tea","tan","ate","nat","bat"]
//     → [["bat"],["nat","tan"],["ate","eat","tea"]]
//
// Constraints: 1 <= n <= 10^4, 0 <= s.length <= 100, lowercase.
//
// ---- Drill (~60 sec) — one new twist on your anagram work ----
//   1. You already know how to TEST two strings for anagram-ness. The
//      twist: with 10^4 strings you can't compare pairs. Instead, every
//      anagram family needs ONE canonical map key that all members — and
//      only members — produce. What's the obvious key? (You've sorted a
//      string before.)
//   2. The follow-up they ask: sorting each string is O(k log k) per
//      string. What key costs O(k) instead? (Hint: 26 counts, joined
//      with a separator — why does "1,0,2" need the separator where
//      "102" breaks?)
//   3. Map<string, string[]>, one pass, return the values. That's the
//      whole shape — say it before typing.
//
// Target: ~12 lines, 15 min.

import { check } from './helpers.ts';

const groupAnagrams = (strs: string[]): string[][] => {
  // your code here
  return [];
};

// ---- tests ----
// Groups and members compared order-insensitively.

const norm = (groups: string[][]) => groups.map((g) => [...g].sort()).sort();

check('LC ex1', norm(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])),
  norm([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]));
check('LC ex2: [""]', norm(groupAnagrams([''])), [['']]);
check('LC ex3: ["a"]', norm(groupAnagrams(['a'])), [['a']]);
check('no anagrams at all', norm(groupAnagrams(['ab', 'cd', 'ef'])),
  norm([['ab'], ['cd'], ['ef']]));
check('all one family', norm(groupAnagrams(['abc', 'bca', 'cab'])),
  norm([['abc', 'bca', 'cab']]));
