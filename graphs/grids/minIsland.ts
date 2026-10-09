// Structy: minimum island
// 'L' = land, 'W' = water. Return the size of the SMALLEST island.

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
  ['L', 'W', 'W', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['W', 'L', 'W', 'L', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'L', 'L', 'L'],
];

const grid3: Grid = [
  ['W', 'L', 'W', 'W', 'L', 'W'],
  ['L', 'L', 'W', 'W', 'L', 'W'],
  ['W', 'L', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'L', 'W'],
  ['W', 'W', 'W', 'L', 'L', 'W'],
  ['W', 'W', 'W', 'L', 'W', 'W'],
];

const traverseIslandBFS = (
  grid: Grid,
  startingRow: number,
  startingCol: number,
  visited: Set<string>
) => {
  const firstNodeToPushQueue: [number, number] = [startingRow, startingCol];

  const queue: any[] = [ firstNodeToPushQueue ];

  visited.add(`${startingRow}-${startingCol}`);
  let islandSize: number = 1;

  while (queue.length > 0) {
    const nodeDequeued: [number, number] = queue.shift();
    const [ row, col ] = nodeDequeued;

    const adjacentNodes: [number, number][]  = [
      [row - 1, col], // up.
      [row + 1, col], // down.
      [row, col - 1], // left.
      [row, col + 1] // right.
    ]

    for (let adjacentNode of adjacentNodes) {
      const [ neighbourRow, neighbourCol ] = adjacentNode;

      const numRows: number = grid.length;
      const numCols: number = grid[0].length;

      const isInBounds: boolean =
        neighbourRow >= 0 && neighbourRow < numRows &&
        neighbourCol >= 0 && neighbourCol < numCols;

      const currNodeKey: string = `${neighbourRow}-${neighbourCol}`;

      if (isInBounds && !visited.has(currNodeKey) && grid[neighbourRow][neighbourCol] === 'L') {
        visited.add(currNodeKey);
        queue.push([ neighbourRow,neighbourCol ]);
        islandSize += 1;
      }
    }
  }

  return islandSize;
}

const minimumIsland = (grid: Grid): number => {
  const visited = new Set<string>();

  let minSize: number = Infinity;

  for (let row: number = 0; row < grid.length; row++) {
    for (let col: number = 0; col < grid[0].length; col++) {
      const currNodeKey: string = `${row}-${col}`;

      if (!visited.has(currNodeKey) && grid[row][col] === 'L') {
        const sizeIsland: number = traverseIslandBFS(grid, row, col, visited);

        if (sizeIsland < minSize) {
          minSize = sizeIsland;
        }
      }
    }
  }

  return minSize;
};

// ---- tests ----

check('grid1', minimumIsland(grid1), 2);
check('grid2', minimumIsland(grid2), 1);
check('grid3', minimumIsland(grid3), 2);
