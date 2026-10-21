// LeetCode 151: Reverse Words in a String (Medium) — Microsoft string staple
//
// Return the words in reverse order, single-spaced. Input may have leading,
// trailing, and repeated spaces — all must be gone in the output.
//
//   "the sky is blue"      → "blue is sky the"
//   "  hello world  "      → "world hello"
//   "a good   example"     → "example good a"
//
// Constraints: 1 <= s.length <= 10^4, contains at least one word.
//
// ---- Drill — this one is about INTERVIEW THEATER, not algorithms ----
//   1. First, say the one-liner out loud: split → filter the empties →
//      reverse → join. Writing it IS acceptable. Then immediately ask the
//      interviewer: "want it without the string methods?" That question is
//      the senior move — it shows you know why they asked.
//   2. The manual version (do it here, in a second function): walk the
//      string, collect words yourself, build output back-to-front. Which
//      split-artifact does your filter step handle, and what causes it?
//   3. JS trivia they probe: what does "a  b".split(' ') actually return?
//      Say it before you run anything.
//
// Target: one-liner in 2 min, manual version ~15 lines in 15 min.
// Both functions run against the same tests below.

import { check } from './helpers.ts';

const reverseWords = (s: string): string => {
  // one-liner version here
  return '';
};

const reverseWordsManual = (s: string): string => {
  // no split/reverse/join allowed here
  return '';
};

// ---- tests ----

for (const [name, fn] of [
  ['one-liner', reverseWords],
  ['manual', reverseWordsManual],
] as const) {
  check(`${name} — LC ex1`, fn('the sky is blue'), 'blue is sky the');
  check(`${name} — LC ex2: outer spaces`, fn('  hello world  '), 'world hello');
  check(`${name} — LC ex3: inner runs`, fn('a good   example'), 'example good a');
  check(`${name} — single word`, fn('solo'), 'solo');
}
