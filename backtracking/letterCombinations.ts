// LeetCode 17: Letter Combinations of a Phone Number (Medium)
// THE entry problem for combinatorial enumeration — do this BEFORE the
// hyperparameter redo; it's the same pattern with less ceremony.
//
// Given digits 2-9, return all letter combinations the number could represent
// (phone keypad mapping). Any order.
//
//   "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]
//   "2"  → ["a","b","c"]
//
// Constraints: 1 <= digits.length <= 4, digits in '2'..'9'.
//
// ---- Pattern drill (~90 sec, out loud — this is the one you bombed, own it) ----
//   1. Frame it as SLOTS and OPTIONS: each digit is a slot; its letters are
//      the options. A result = one choice per slot. Say the slot/option
//      framing for the hyperparameter problem too — same sentence.
//   2. The recursive shape (memorize this skeleton, it solves ~15 LC problems):
//        walk(slotIndex, choicesSoFar):
//          BASE: all slots filled → record a completed result
//          else: FOR EACH option of slot[slotIndex] → choose it, recurse to
//                slotIndex + 1
//      What's the base case HERE? What gets "chosen" — string concat or push/pop?
//   3. The iterative cousin (good to mention live): start with [""], and for
//      each digit, cross every partial result with every letter. One flatMap
//      per digit. Build "23" by hand on paper with this method once.
//   4. Complexity, out loud: up to 4 letters per digit, n digits →
//      O(4^n · n) results-times-copy-cost. Why the extra ·n?
//
// Target: ~15 lines, 20 min. Recursive first; iterative as the encore.

import { checkUnordered } from './helpers.ts';

const KEYPAD: Record<string, string> = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};

const letterCombinations = (digits: string): string[] => {
  const result: any[] = [];
  const path: any[] = [];

  const backTrack = (slotIdx: number) => {
    const digit: string = digits[slotIdx];
    const letters: string = KEYPAD[digit];

    if (path.length === digits.length) {
      const res: string = path.join('');
      result.push(res);
    }

    if (digit === undefined) {
      return;
    }

    for (const letter of letters) {
      path.push(letter);

      backTrack(slotIdx + 1);

      path.pop();
    }

  }

  backTrack(0)

  return result;
};

// ---- tests ----

checkUnordered('LC ex1: "23"', letterCombinations('23'), [
  'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf',
]);

checkUnordered('LC ex2: single digit', letterCombinations('2'), ['a', 'b', 'c']);
checkUnordered('4-letter key', letterCombinations('7'), ['p', 'q', 'r', 's']);
checkUnordered('three digits = 27 results', letterCombinations('222'), [
  'aaa','aab','aac','aba','abb','abc','aca','acb','acc',
  'baa','bab','bac','bba','bbb','bbc','bca','bcb','bcc',
  'caa','cab','cac','cba','cbb','cbc','cca','ccb','ccc',
]);
