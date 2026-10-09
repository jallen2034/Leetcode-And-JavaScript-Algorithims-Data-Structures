// Structy: island count
// 'L' = land, 'W' = water. Count the islands (connected up/down/left/right).

import { type Grid, check } from './helpers.ts';

const grid1: Grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

const grid2: Grid = [
  ['W', 'L', 'W', 'W', 'L', 'W'],
  ['L', 'L', 'W', 'W', 'L', 'W'],
  ['W', 'L', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'L', 'W'],
  ['W', 'L', 'W', 'L', 'L', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W'],
];

const BFSAtLandNode = (grid: Grid, startingRow: number, startingCol: number, visited: Set<string>): number => {
  const startingNode: [number, number] = [startingRow, startingCol];
  const queue: [number, number][] = [startingNode];

  while (queue.length > 0) {
    const node = queue.shift();

    if (!node) {
      continue;
    }

    const [row, col] = node;

    const neighbours: number[][] = [
      [row - 1, col], // up.
      [row + 1, col], // down.
      [row, col - 1], // left.
      [row, col + 1] // right.
    ]

    for (let neighbour of neighbours) {
      const [neighbourRow, neighbourCol] = neighbour;

      const numRows: number = grid.length;
      const numCols: number = grid[0].length;

      const isInBounds: boolean =
        neighbourRow >= 0 && neighbourRow < numRows &&
        neighbourCol >= 0 && neighbourCol < numCols;

      const neighbourKey: string = `${neighbourRow}-${neighbourCol}`;

      if (isInBounds && !visited.has(neighbourKey) && grid[neighbourRow][neighbourCol] === 'L') {
        queue.push([neighbourRow,neighbourCol]);
        visited.add(neighbourKey);
      }
    }
  }

  return 1;
}

const islandCount = (grid: Grid): number => {
  const visited = new Set<string>();

  let islandCount: number = 0;

  for (let row: number = 0; row < grid.length; row++) {
    for (let col: number = 0; col < grid[0].length; col++) {
      const currentNode = `${row}-${col}`;

      if (!visited.has(currentNode) && grid[row][col] === 'L') {
        const countFromTraversal: number = BFSAtLandNode(grid, row, col, visited);
        islandCount += countFromTraversal;
      }
    }
  }

  return islandCount;
};

// ---- tests ----

check('grid1', islandCount(grid1), 3);
check('grid2', islandCount(grid2), 4);
