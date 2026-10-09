// LeetCode 909: Snakes and Ladders (practice round 2)
// Return the fewest dice rolls to get from square 1 to square n*n, or -1 if impossible.

import { check } from './helpers.ts';

// 4x4 board → 3 rolls
//
//   The board array (row 0 is the TOP):     Square numbers for each cell:
//
//   row 0: [-1, -1,  4,  6]                  16 15 14 13   ← right to left
//   row 1: [-1, -1, -1, -1]                   9 10 11 12   → left to right
//   row 2: [15, -1, -1, -1]                   8  7  6  5   ← right to left
//   row 3: [-1,  8, -1, -1]                   1  2  3  4   → left to right (START)
//
//   So the snakes/ladders are:
//     square 2  → 8   (ladder, at row 3 col 1)
//     square 8  → 15  (ladder, at row 2 col 0)
//     square 13 → 6   (snake,  at row 0 col 3)
//     square 14 → 4   (snake,  at row 0 col 2)
//
const board: number[][] = [
  [-1, -1, 4, 6],
  [-1, -1, -1, -1],
  [15, -1, -1, -1],
  [-1, 8, -1, -1],
];

const preCalculateCoordsToSquareNumbers = (boardDimensions: number): Map<number, [number, number]> => {
  const coordinates: Map<number, [number, number]> = new Map();

  let traverseInOrder: boolean = true;
  let squareCounter: number = 0;

  for (let row: number = boardDimensions - 1; row >= 0; row--) {
    if (traverseInOrder) {
      for (let col: number = 0; col < boardDimensions; col++) {
        squareCounter += 1;
        coordinates.set(squareCounter, [row, col]);
      }

      traverseInOrder = false;
    } else {
      for (let col: number = boardDimensions - 1; col >= 0; col--) {
        squareCounter += 1;
        coordinates.set(squareCounter, [row, col]);
      }

      traverseInOrder = true;
    }
  }

  return coordinates;
}

interface RollInfo {
  number: number,
  roll: number
}

function snakesAndLadders(board: number[][]): number {
  const squareCoords: Map<number, [number, number]> = preCalculateCoordsToSquareNumbers(board.length);

  const firstRoll: RollInfo = {number: 1, roll: 0};
  const queue: RollInfo[] = [firstRoll];
  const visited = new Set<number>([1]);

  while (queue.length > 0) {
    const dequeueNode: RollInfo | undefined = queue.shift();

    if (dequeueNode) {
      const lastSquare: number = board.length * board.length;
      const maxRoll: number = Math.min(6, lastSquare - dequeueNode.number);

      for (let roll: number = 1; roll <= maxRoll; roll++) {
        const landingSquare: number = dequeueNode.number + roll;

        const coords: [number, number] | undefined = squareCoords.get(landingSquare);

        if (!coords) {
          throw new Error(`unreachable: no coords for square ${landingSquare}`);
        }

        const [ row, col ] = coords;

        const snakeOrLadder: number = board[row][col];

        const endSquare: number = snakeOrLadder === -1 ?
          landingSquare : snakeOrLadder;

        if (endSquare === lastSquare) {
          return dequeueNode.roll + 1;
        }

        if (!visited.has(endSquare)) {
          const squareToAddQueue: RollInfo = {
            number: endSquare,
            roll: dequeueNode.roll + 1
          }

          visited.add(endSquare);
          queue.push(squareToAddQueue);
        }
      }
    }
  }

  throw new Error("unreachable: queue.shift() returned undefined despite non-empty length check");
}

// ---- tests ----

// Smallest possible board, no snakes or ladders: 1 → 4 in one roll of 3
check('2x2 plain', snakesAndLadders([
  [-1, -1],
  [-1, -1],
]), 1);

// 3x3, no snakes or ladders: can't reach 9 in one roll (max is 7)
check('3x3 plain', snakesAndLadders([
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
]), 2);

// 6x6, no snakes or ladders: plain rolling of 6s
check('6x6 plain', snakesAndLadders(
  Array.from({ length: 6 }, () => Array(6).fill(-1))
), 6);

// Biggest board LeetCode allows (20x20), no snakes or ladders.
// Checks your code handles the max size and the cap at n² correctly.
check('20x20 plain', snakesAndLadders(
  Array.from({ length: 20 }, () => Array(20).fill(-1))
), 67);

// A snake that drops you onto a ladder square (square 5 → 2).
// You END on 2, then later roll FROM 2. Its ladder must not fire while standing there.
//   squares:      board:
//   7 8 9         [-1,  4, -1]
//   6 5 4         [ 6,  2,  6]
//   1 2 3         [-1,  3, -1]
check('snake onto ladder square', snakesAndLadders([
  [-1,  4, -1],
  [ 6,  2,  6],
  [-1,  3, -1],
]), 2);
