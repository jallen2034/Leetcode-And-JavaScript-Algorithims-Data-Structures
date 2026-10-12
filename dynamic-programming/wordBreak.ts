// LeetCode 139: Word Break
//
// Given a string `s` and a dictionary of strings `wordDict`, return true if `s` can be
// segmented into a space-separated sequence of one or more dictionary words.
//
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// Constraints: 1 <= s.length <= 300, 1 <= wordDict.length <= 1000,
// 1 <= wordDict[i].length <= 20, all strings are lowercase English letters,
// all words in wordDict are unique.

const canBeSegmented = (
  target: string,
  wordDict: string[],
  memo: Map<string, boolean>
): any => {
  const valFromMemo: boolean | undefined = memo.get(target);

  if (valFromMemo !== undefined) {
    return valFromMemo;
  }

  if (target === '') {
    return true;
  }

  for (const word of wordDict) {
    if (target.startsWith(word)) {
      const newClearedSubString: string = target.slice(word.length);
      const childCanBeSegmented: boolean = canBeSegmented(newClearedSubString, wordDict, memo)

      if (childCanBeSegmented) {
        memo.set(target, childCanBeSegmented)
        return childCanBeSegmented;
      }
    }
  }

  memo.set(target, false)
  return false;
}

function wordBreak(s: string, wordDict: string[]): boolean {
  const memo = new Map<string, boolean>()
  const canBeSegemented: boolean = canBeSegmented(s, wordDict, memo);
  return canBeSegemented;
}

// ---- tests ----
const check = (label: string, actual: boolean, expected: boolean) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// DRAW THIS ONE: impossible because of the stray "x" at the end, so every branch gets explored.
check('wordBreak("pineapplepenapplex", [...])',
  wordBreak('pineapplepenapplex', ['apple', 'pen', 'applepen', 'pine', 'pineapple']), false);

// Possible, e.g. "pine" + "apple" + "pen" + "apple"
check('wordBreak("pineapple pen apple", [...])',
  wordBreak('pineapplepenapple', ['apple', 'pen', 'applepen', 'pine', 'pineapple']), true);

// LeetCode Example 3: impossible, even though "cats", "sand" and "dog" all look close
check('wordBreak("catsandog", [...])',
  wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']), false);

// ---- later: uncomment once the three above pass ----

// // Large and impossible: all the words are made of "a", but the string ends in "b".
// // A well-known LeetCode test that times out without a memo.
check('wordBreak("aaa...ab", [...])',
  wordBreak(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
    ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'],
  ),
  false);