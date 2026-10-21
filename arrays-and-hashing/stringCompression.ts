// LeetCode 443: String Compression (Medium) — Microsoft string staple
//
// Compress IN PLACE: each run of a repeated char becomes the char followed
// by the run length (length 1 writes no number). Write the result into the
// FRONT of `chars` and return the new length. O(1) extra space.
//
//   ["a","a","b","b","c","c","c"] → 6, chars starts with a2b2c3
//   ["a"]                         → 1, chars starts with a
//   ["a","b",12 b's...]           → 4, chars starts with ab13  ← note: "13"
//                                    becomes TWO cells, '1' then '3'
//
// Constraints: 1 <= chars.length <= 2000.
//
// ---- Drill (~60 sec, out loud) ----
//   1. Two pointers, same array: READ finds runs, WRITE builds the answer
//      behind it. Why can write never overtake read? (That invariant is
//      the whole in-place safety argument — say it.)
//   2. Finding a run: advance read while the char repeats. What do you
//      write afterward — always char+count, or is count sometimes skipped?
//   3. The classic trap: a count of 13 must land as '1','3' — two cells.
//      What converts 13 → ['1','3'] cleanly? (test 3 exists for this)
//   4. Return value is the write pointer. Why?
//
// Target: ~20 lines, 20 min.

import { check } from './helpers.ts';

const compress = (chars: string[]): number => {
  // your code here
  return 0;
};

// ---- tests ----

const run = (input: string[]) => {
  const len = compress(input);
  return input.slice(0, len).join('');
};

check('LC ex1: aabbccc', run(['a', 'a', 'b', 'b', 'c', 'c', 'c']), 'a2b2c3');
check('LC ex2: single char writes no count', run(['a']), 'a');
check('LC ex3: multi-digit count', run(['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']), 'ab12');
check('no runs at all', run(['a', 'b', 'c']), 'abc');
check('one giant run', run(Array(15).fill('z')), 'z15');
