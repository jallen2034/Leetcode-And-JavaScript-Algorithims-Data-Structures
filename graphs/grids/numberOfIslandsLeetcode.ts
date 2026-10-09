// LeetCode 200: Number of Islands
// '1' = land, '0' = water. Islands connect up/down/left/right (NOT diagonally).
// Note: LeetCode uses '1' / '0' strings, not 'L' / 'W' like Structy.

import { check } from './helpers.ts';

// Test 1: LeetCode Example 2 → 3 islands (the standard case)
//
//   1 1 0 0 0        A A . . .
//   1 1 0 0 0        A A . . .
//   0 0 1 0 0        . . B . .
//   0 0 0 1 1        . . . C C
//
const grid1: string[][] = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

// Test 2: diagonals + non-square grid + land in the corners → 3 islands
//
//   1 0 1        A . B
//   0 1 0        . C .
//
//   Catches: counting diagonal cells as connected (would give 1),
//   and mixing up numRows / numCols (2 rows, 3 cols).
//
const grid2: string[][] = [
  ['1', '0', '1'],
  ['0', '1', '0'],
];

// Test 3: U shape → 1 island
//
//   1 0 1        A . A
//   1 0 1        A . A
//   1 1 1        A A A
//
//   Catches: only exploring some directions (e.g. down/right but not up).
//   The two arms on row 0 look separate, but they join at the bottom.
//
const grid3: string[][] = [
  ['1', '0', '1'],
  ['1', '0', '1'],
  ['1', '1', '1'],
];

const grid4: string[][]  = [["1","0","1","1","0","1","1"]]

const bfTraverseNode = (
  grid: string[][],
  startRow: number,
  startCol: number,
  visited: Set<string>
) => {
  const startNode: [number, number] = [ startRow, startCol ];
  const queue: [number, number][] = [ startNode ];

  visited.add(`${startRow}-${startCol}`)

  while (queue.length > 0) {
    const dequeuedNode = queue.shift();

    if (!dequeuedNode) {
      continue;
    }

    const [ row, col ] = dequeuedNode;

    const adjacentNodes = [
      [ row, col - 1], // up.
      [ row, col + 1], // down.
      [ row - 1, col], // left.
      [ row + 1, col] // right.
    ]

    for (const adjacentNode of adjacentNodes) {
      const [ adjNodeRow, adjNodeCol] = adjacentNode;

      const nodeInBounds: boolean =
        adjNodeRow >= 0 && adjNodeRow < grid.length &&
        adjNodeRow >= 0 && adjNodeCol < grid[0].length;

      const visitedNodeKey: string = `${adjNodeRow}-${adjNodeCol}`

      if (
        nodeInBounds &&
        !visited.has(visitedNodeKey) &&
        grid[adjNodeRow][adjNodeCol] === '1'
      ) {
        queue.push([adjNodeRow, adjNodeCol]);
        visited.add(visitedNodeKey);
      }
    }
  }

  return 1;
}

function numIslands(grid: string[][]): number {
  const visited = new Set<string>();
  let islandCount: number = 0;

  if (grid.length === 1 && grid[0].length > 0) {
    for (let col in grid[0]) {
      const currVisitedKey = `${0}-${col}`;

      if (!visited.has(currVisitedKey) && grid[0][col] === '1') {
        const count: number = bfTraverseNode(grid, 0, parseInt(col), visited);
        islandCount += count;
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const currVisitedKey = `${row}-${col}`;

      if (!visited.has(currVisitedKey) && grid[row][col] === '1') {
        const count: number = bfTraverseNode(grid, row, col, visited);
        islandCount += count;
      }
    }
  }

  return islandCount;
}

// ---- tests ----

check('grid1 (example 2)', numIslands(grid1), 3);
check('grid2 (diagonals)', numIslands(grid2), 3);
check('grid3 (U shape)', numIslands(grid3), 1);
check('grid4 (single row)', numIslands(grid4), 3);
