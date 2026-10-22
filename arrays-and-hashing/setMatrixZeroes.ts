// LeetCode 73: Set Matrix Zeroes
// Given an m x n integer matrix, if an element is 0, set its ENTIRE row and
// column to 0's. You must do it IN PLACE (mutate `matrix`, return nothing).
//
// Approach ladder (state which rung you're on + complexity BEFORE typing):
//   Rung 1: O(m*n) extra space — copy/mark, then write. Fine to start here.
//   Rung 2: O(m + n) extra space — remember WHICH rows/cols must die, then sweep.
//   Rung 3: O(1) extra space — the LC follow-up. Do rung 2 green first.
//
// THE TRAP (why the naive single pass fails): if you zero things out while
// you're still scanning, you can no longer tell original zeroes from the
// zeroes YOU wrote. Paper-trace [[1,0],[2,3]] with a naive pass and watch it.

const findStartPoints = (matrix: number[][]) => {
  const startPoints: any[] = [];

  for (let row: number = 0; row < matrix.length; row++) {
    for (let col: number = 0; col < matrix[0].length; col++) {
      const value: number = matrix[row][col];

      if (value === 0) {
        startPoints.push([row, col]);
      }
    }
  }

  return startPoints;
}

const findCondemned = (startPoints: any[]) => {
  const condemnedRows = new Set<number>();
  const condemnedCols = new Set<number>();

  for (const startPoint of startPoints) {
    const [ row, col ] = startPoint;

    condemnedRows.add(row);
    condemnedCols.add(col);
  }

  return { condemnedRows, condemnedCols }
}

const markCondemnedOnMatrix = (
  matrix: number[][],
  condemnedRows: Set<number>,
  condemnedCols: Set<number>
) => {
  for (let row: number = 0; row < matrix.length; row++) {
    for (let col: number = 0; col < matrix[0].length; col++) {
      if (condemnedRows.has(row) || condemnedCols.has(col)) {
        matrix[row][col] = 0;
      }
    }
  }
}

function setZeroes(matrix: number[][]): void {
  const startPoints: any[] = findStartPoints(matrix);
  const { condemnedRows, condemnedCols } = findCondemned(startPoints);
  markCondemnedOnMatrix(matrix, condemnedRows, condemnedCols);
}

const check = (label: string, input: number[][], expected: number[][]) => {
  const matrix = input.map((row) => [...row]);

  setZeroes(matrix);

  const pass = JSON.stringify(matrix) === JSON.stringify(expected);
  console.log(
    `${pass ? "PASS" : "FAIL"} ${label}: got ${JSON.stringify(matrix)}, expected ${JSON.stringify(expected)}`
  );
};

// LeetCode Example 1
//   [1, 1, 1]        [1, 0, 1]
//   [1, 0, 1]   ->   [0, 0, 0]
//   [1, 1, 1]        [1, 0, 1]
check(
  "example 1",
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ]
);

// LeetCode Example 2
//   [0, 1, 2, 0]        [0, 0, 0, 0]
//   [3, 4, 5, 2]   ->   [0, 4, 5, 0]
//   [1, 3, 1, 5]        [0, 3, 1, 0]
check(
  "example 2",
  [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ],
  [
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0],
  ]
);

// No zeroes at all: matrix must come back UNTOUCHED
check(
  "no zeroes",
  [
    [1, 2],
    [3, 4],
  ],
  [
    [1, 2],
    [3, 4],
  ]
);

// Single cell, zero and nonzero
check("1x1 zero", [[0]], [[0]]);
check("1x1 nonzero", [[7]], [[7]]);

// Single row / single column (your capacity-1 habit, matrix edition)
check("single row", [[1, 0, 3]], [[0, 0, 0]]);
check("single column", [[1], [0], [3]], [[0], [0], [0]]);

// The naive-pass killer: zero in one corner must not cascade everywhere
//   [1, 0]        [0, 0]
//   [2, 3]   ->   [2, 0]
check(
  "no cascade",
  [
    [1, 0],
    [2, 3],
  ],
  [
    [0, 0],
    [2, 0],
  ]
);

// Zero sitting IN row 0 and col 0 (matters a LOT on rung 3)
check(
  "zero at origin",
  [
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
  ]
);

// Multiple zeroes sharing a row and a column
check(
  "overlapping zeroes",
  [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 1],
  ]
);

// All zeroes stay all zeroes
check(
  "all zeroes",
  [
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
  ]
);

// ---------------------------------------------------------------------------
// HINTS — one at a time, only after you're genuinely stuck.
// ---------------------------------------------------------------------------
// Hint 1 (rung 2): you don't need to remember which CELLS were zero — only
//   which ROWS and which COLUMNS are condemned. What two small structures
//   hold that, and what are their sizes?
//
// Hint 2 (rung 2): two phases, strictly separated. Phase A: scan, record,
//   touch nothing. Phase B: sweep and write. Mixing the phases is the trap
//   from the header comment.
//
// Hint 3 (rung 3 direction): could the matrix store the condemned-row/col
//   marks ITSELF? There's already a natural place to write "column j must
//   die" and "row i must die" without extra memory.
//
// Hint 4 (rung 3, near-spoiler): if row 0 and column 0 become your marker
//   storage, they're doing double duty — marker space AND real data. One
//   cell is shared by both. What do you need to remember about row 0 and
//   col 0 BEFORE you start writing marks, and in what ORDER must the final
//   sweep run so you don't erase your own markers early?