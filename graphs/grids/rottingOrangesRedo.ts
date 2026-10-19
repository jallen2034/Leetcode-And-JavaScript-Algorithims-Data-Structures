// LeetCode 994: Rotting Oranges (Medium) — REDO
//
// m x n grid: 0 = empty, 1 = fresh orange, 2 = rotten orange.
// Every minute, fresh oranges 4-directionally adjacent to a rotten one rot.
// Return the minutes until no fresh orange remains, or -1 if impossible.
//
//   [[2,1,1],[1,1,0],[0,1,1]] → 4
//   [[2,1,1],[0,1,1],[1,0,1]] → -1   (bottom-left orange is unreachable)
//   [[0,2]]                   → 0    (no fresh oranges at minute 0)
//
// Constraints: 1 <= m, n <= 10, cells are 0, 1, or 2.
//
// ---- Recall drill (~60 sec, out loud) ----
//   1. This is BFS, but with a twist on the usual single start: what goes
//      into the queue BEFORE the loop starts, and at what minute?
//   2. You need to know when to return -1. What do you count during the
//      initial scan, and what must that count be at the end?
//   3. Where does "minutes" come from — a counter you bump per BFS LEVEL,
//      or a number you carry on each queued node? (Both work; pick one and
//      know why.)
//   4. The [[0,2]] case returns 0, not 1. What in your minute-counting has
//      to be true for that to fall out without a special case?
//
// Target: O(m*n) time, O(m*n) space, ~25 lines, 15 min. You solved this
// before — beat your old version's line count.

import { check } from './helpers.ts';

const ROTTEN_ORANGE_ID: number = 2;
const FRESH_ORANGE_ID: number = 1;

interface Orange {
  coords: { row: number, col: number },
  minute: number,
  status: typeof ROTTEN_ORANGE_ID | typeof FRESH_ORANGE_ID
}

const getInitialState = (grid: number[][]) => {
  const rottenOrangeQueue: Orange[] = []
  let freshCount: number = 0;

  for (let row: number = 0; row < grid.length; row++) {
    for (let col: number = 0; col < grid[0].length; col++) {
      const currVal: number = grid[row][col];

      if (currVal === ROTTEN_ORANGE_ID) {
        const rottenOrange: Orange = {
          coords: { row, col },
          minute: 0,
          status: currVal
        }

        rottenOrangeQueue.push(rottenOrange);
      }

      if (currVal === FRESH_ORANGE_ID) {
        freshCount += 1;
      }
    }
  }

  return { rottenOrangeQueue, freshCount };
}

const orangesRotting = (grid: number[][]): number => {
  let { rottenOrangeQueue, freshCount } = getInitialState(grid);

  let totalMinutesPassed: number = 0;

  while (rottenOrangeQueue.length > 0) {
    const orange: Orange | undefined = rottenOrangeQueue.shift();

    if (orange === undefined) {
      break;
    }

    const { coords, minute }: Orange = orange;
    const { row, col } = coords;

    const neighborCoords: [number, number][] = [
      [row, col + 1], // Right.
      [row, col - 1], // Left.
      [row + 1, col], // Down
      [row - 1, col] //  Up.
    ]

    for (let orangeCoord of neighborCoords) {
      const [adjRow, adjCol] = orangeCoord;

      const orangeInBounds: boolean =
        adjRow >= 0 && adjRow < grid.length &&
        adjCol >= 0 && adjCol < grid[0].length;

      if (!orangeInBounds) {
        continue;
      }

      const orangeAtCoords: number = grid[adjRow][adjCol];

      if (orangeAtCoords !== FRESH_ORANGE_ID) {
        continue;
      }

      const nextMinute: number = minute + 1;

      if (nextMinute > totalMinutesPassed) {
        totalMinutesPassed = nextMinute;
      }

      freshCount -= 1

      const freshOrangeToMakePooPoo: Orange = {
        coords: { row: adjRow, col: adjCol},
        minute: nextMinute,
        status: ROTTEN_ORANGE_ID
      }

      grid[adjRow][adjCol] = ROTTEN_ORANGE_ID;
      rottenOrangeQueue.push(freshOrangeToMakePooPoo);
    }
  }

  if (freshCount === 0) {
    return totalMinutesPassed
  }

  return -1
};

// ---- tests ----

check('LC ex1: spreads in 4 minutes', orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]), 4);

check('LC ex2: trapped orange, impossible', orangesRotting([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
]), -1);

check('LC ex3: no fresh oranges at minute 0', orangesRotting([
  [0, 2],
]), 0);