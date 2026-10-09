// LeetCode 994: Rotting Oranges
// 0 = empty, 1 = fresh orange, 2 = rotten orange.
// Each minute, fresh oranges next to a rotten one (up/down/left/right) become rotten.
// Return the minutes until no fresh oranges are left, or -1 if that never happens.

import { check } from './helpers.ts';

interface NodeInfo {
  val: number
  coords: { row: number, col: number },
  minutes: number
}

const ROTTEN_ORANGE_ID: number = 2;
const FRESH_ORANGE_ID: number = 1;

const findStartingRottenOrange = (grid: number[][]) => {
  const queue = [];
  let freshOrangeCount: number = 0;

  for (let row: number = 0; row < grid.length; row++) {
    for (let col: number = 0; col < grid[0].length; col++) {
      if (grid[row][col] === ROTTEN_ORANGE_ID) {
        const rottenNode: NodeInfo = {
          val: grid[row][col],
          coords: {row, col},
          minutes: 0
        }

        queue.push(rottenNode);
      }

      if (grid[row][col] === FRESH_ORANGE_ID) {
        freshOrangeCount += 1;
      }
    }
  }

  return { freshOrangeCount, queue };
}

function orangesRotting(grid: number[][]): number {
  const { freshOrangeCount, queue } = findStartingRottenOrange(grid);

  if (freshOrangeCount === 0) {
    return 0;
  }

  if (queue.length === 0) {
    return -1;
  }

  let minMinutesElapsed: number = 0;
  let freshOrangeBFSCounter: number = 0;

  const visited = new Set<string>([]);

  queue.forEach((rottenOrange: NodeInfo) => {
    const visitedOrangeKey = `${rottenOrange.coords.row}-${rottenOrange.coords.col}`;
    visited.add(visitedOrangeKey);
  })

  while (queue.length > 0) {
    const dequeued: NodeInfo | undefined = queue.shift();

    if (dequeued) {
      const {coords, minutes} = dequeued;

      if (minutes > minMinutesElapsed) {
        minMinutesElapsed = minutes;
      }

      const adjNodes: [number, number][] = [
        [coords.row - 1, coords.col],
        [coords.row + 1, coords.col],
        [coords.row, coords.col - 1],
        [coords.row, coords.col + 1],
      ]

      for (let adjNode of adjNodes) {
        const [adjNodeRow, adjNodeCol] = adjNode;

        const nodeInBounds: boolean =
          adjNodeRow >= 0 && adjNodeRow < grid.length &&
          adjNodeCol >= 0 && adjNodeCol < grid[0].length;

        if (!nodeInBounds) {
          continue;
        }

        const nodeAtAdj: number = grid[adjNodeRow][adjNodeCol];
        const visitedAdjNodeKey: string = `${adjNodeRow}-${adjNodeCol}`;

        if (nodeAtAdj === FRESH_ORANGE_ID && nodeInBounds && !visited.has(visitedAdjNodeKey)) {
          const newTimeElapsed: number = minutes + 1;

          const newAdjNode: NodeInfo = {
            val: nodeAtAdj,
            coords: {row: adjNodeRow, col: adjNodeCol},
            minutes: newTimeElapsed
          }

          visited.add(visitedAdjNodeKey);
          queue.push(newAdjNode);

          freshOrangeBFSCounter += 1;
        }
      }
    }
  }

  if (freshOrangeBFSCounter !== freshOrangeCount) {
    return -1;
  }

  return minMinutesElapsed;
}

// ---- tests ----

// LeetCode Example 1 → 4 minutes
//
//   Minute 0     Minute 1     Minute 2     Minute 3     Minute 4
//   2 1 1        2 2 1        2 2 2        2 2 2        2 2 2
//   1 1 0        2 1 0        2 2 0        2 2 0        2 2 0
//   0 1 1        0 1 1        0 1 1        0 2 1        0 2 2
//
// check('example 1', orangesRotting([
//   [2, 1, 1],
//   [1, 1, 0],
//   [0, 1, 1],
// ]), 4);
//
// check('example 2', orangesRotting([
//   [2, 1, 1],
//   [0, 1, 1],
//   [1, 0, 1],
// ]), -1);


check('example 3', orangesRotting([
  [0]
]), 0);
