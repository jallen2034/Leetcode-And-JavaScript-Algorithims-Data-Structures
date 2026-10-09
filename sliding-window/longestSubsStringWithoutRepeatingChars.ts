import { check } from './helpers.ts';

/**
 * TODO: implement this yourself.
 * Return the length of the longest substring of s that contains no repeated
 * characters. A substring is a contiguous run of characters (not a subsequence).
 */
function lengthOfLongestSubstring(string: string): number {
  let longestFoundSubStringFoundLen: number = 0;

  const seenInWindowSet = new Set();

  let leftPtrIdx: number = 0;
  let rightPtrIdx: number = 0;

  while (rightPtrIdx < string.length) {
    const currentCharAtRightPtr: string = string[rightPtrIdx];
    const currentCharAtLeftPtr: string = string[leftPtrIdx];

    if (seenInWindowSet.has(currentCharAtRightPtr)) {
      seenInWindowSet.delete(currentCharAtLeftPtr);
      leftPtrIdx += 1;
    } else {
      seenInWindowSet.add(currentCharAtRightPtr);
      rightPtrIdx += 1;
    }

    const windowLen: number = rightPtrIdx - leftPtrIdx;

    if (windowLen > longestFoundSubStringFoundLen) {
      longestFoundSubStringFoundLen = windowLen;
    }
  }

  return longestFoundSubStringFoundLen;
}

// ----- test scaffolding below, no need to touch this -----

const s1 = "abcabcbb"; // example 1: "abc"
const s2 = "bbbbb";    // example 2: all same char
const s3 = "pwwkew";   // example 3: substring not subsequence
const s4 = "";         // empty string
const s5 = " ";        // single space
const s6 = "abcdef";   // all distinct: whole string
const s7 = "dvdf";     // repeat, then a longer window after it
const s8 = "abba";     // repeat whose earlier position ends up behind the window
const s9 = "tmmzuxt";  // late repeat of an early character
const s10 = "alkabbraesopn"; // expected 5 -> "bcade"... trace it, the answer is 5

check('Test 1', lengthOfLongestSubstring(s1), 3);
check('Test 2', lengthOfLongestSubstring(s2), 1);
check('Test 3', lengthOfLongestSubstring(s3), 3);
check('Test 4', lengthOfLongestSubstring(s4), 0);
check('Test 5', lengthOfLongestSubstring(s5), 1);
check('Test 6', lengthOfLongestSubstring(s6), 6);
check('Test 7', lengthOfLongestSubstring(s7), 3);
check('Test 8', lengthOfLongestSubstring(s8), 2);
check('Test 9', lengthOfLongestSubstring(s9), 5);

check('Test 10', lengthOfLongestSubstring(s10), 8);