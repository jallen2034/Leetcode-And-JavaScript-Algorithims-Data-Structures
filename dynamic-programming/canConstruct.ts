// canConstruct (Alvin's DP course)
//
// Write a function `canConstruct(target, wordBank)` that accepts a target string
// and an array of strings.
//
// The function should return a boolean indicating whether or not the `target`
// can be constructed by concatenating elements of the `wordBank` array.
//
// You may reuse elements of `wordBank` as many times as needed.

function canConstruct(target: string, wordBank: string[], memo = new Map<string, boolean>()): boolean {
  const cachedBool: boolean | undefined = memo.get(target);

  if (cachedBool !== undefined) {
    return cachedBool;
  }

  if (target === '') {
    return true;
  }

  for (let word of wordBank) {
    if (target.startsWith(word)) {
      const suffix: string = target.slice(word.length, target.length)
      const bottomedOut: boolean = canConstruct(suffix, wordBank, memo);

      if (bottomedOut) {
        const DID_BOTTOM_OUT: boolean = true;
        memo.set(target, DID_BOTTOM_OUT)
        return DID_BOTTOM_OUT;
      }
    }
  }

  const DID_NOT_BOTTOM_OUT: boolean = false;
  memo.set(target, DID_NOT_BOTTOM_OUT)
  return DID_NOT_BOTTOM_OUT;
}

// ---- tests ----
const check = (label: string, actual: boolean, expected: boolean) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// DRAW THIS ONE: small enough for one page.
// Possible: "abc" + "def" = "abcdef"
check('canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])',
  canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']), true);

// Impossible: lots of words that LOOK like they should fit, but nothing makes "skateboard"
check('canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])',
  canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']), false);

// Edge case: an empty target can always be made (by using no words at all)
check('canConstruct("", ["cat", "dog"])',
  canConstruct('', ['cat', 'dog']), true);

// ---- later: uncomment once the three above pass ----

// Large and impossible: every word is made of "e", but the target ends in "f".
// This one shows whether your memo is working.
check('canConstruct("eee...ef", [...])',
  canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']), false);

// Possible, with several valid constructions, e.g. "enter" + "a" + "p" + "ot" + "ent" + "p" + "ot"
check('canConstruct("enterapotentpot", [...])',
  canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']), true);

// Big and possible: 36 e's can be built from these words in a HUGE number of different ways
check('canConstruct("eee...e" (36), [...])',
  canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']), true);