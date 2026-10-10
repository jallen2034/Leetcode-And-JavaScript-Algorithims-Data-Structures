// LeetCode 62: Unique Paths  (the course calls it gridTraveler)
// Start at the top-left of an m x n grid, finish at the bottom-right.
// You can only move DOWN or RIGHT. How many different paths are there?

function uniquePaths(m: number, n: number, memo = new Map<string, number>): any {
  const memoGridSizeKey: string = `${m}-${n}`;
  const cachedPaths: number | undefined = memo.get(memoGridSizeKey)

  if (cachedPaths !== undefined) {
    return cachedPaths;
  }

  /* Base case: a grid with 0 rows or 0 columns doesn't exist, so it contributes no paths.
   * We reach these when a move goes past the last row (down) or the last column (right). */
  if (m === 0 || n === 0) {
    return 0;
  }

  if (m === 1 && n === 1) {
    return 1;
  }

  const pathsGoingDown: number = uniquePaths(m - 1, n, memo);
  const pathsGoingRight: number = uniquePaths(m, n - 1, memo)

  const totalPathsBothBranches: number = pathsGoingDown + pathsGoingRight;
  memo.set(memoGridSizeKey, totalPathsBothBranches)

  return totalPathsBothBranches;
}

// ---- tests ----
const check = (label: string, actual: number, expected: number) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// Small: matches the 2 x 3 grid you drew on paper
//   S . .
//   . . F
//   Paths: down-right-right, right-down-right, right-right-down
check('2 x 3 (your paper drawing)', uniquePaths(2, 3), 3);


// Medium: LeetCode Example 1
check('3 x 7 (LeetCode example)', uniquePaths(3, 7), 28);

// Large: the course's big example. Without memoisation this takes a very long time.
check('18 x 18 (big)', uniquePaths(18, 18), 2333606220);