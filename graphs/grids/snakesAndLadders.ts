// LeetCode 909: Snakes and Ladders
// Return the fewest dice rolls to get from square 1 to square n*n, or -1 if impossible.

import { check } from './helpers.ts';

// LeetCode Example 1 → 4 rolls
//
//   The board array (row 0 is the TOP):     Square numbers for each cell:
//
//   row 0: [-1, -1, -1, -1, -1, -1]          36 35 34 33 32 31   ← right to left
//   row 1: [-1, -1, -1, -1, -1, -1]          25 26 27 28 29 30   → left to right
//   row 2: [-1, -1, -1, -1, -1, -1]          24 23 22 21 20 19   ← right to left
//   row 3: [-1, 35, -1, -1, 13, -1]          13 14 15 16 17 18   → left to right
//   row 4: [-1, -1, -1, -1, -1, -1]          12 11 10  9  8  7   ← right to left
//   row 5: [-1, 15, -1, -1, -1, -1]           1  2  3  4  5  6   → left to right (START)
//
//   So the snakes/ladders are:
//     square 2  → 15  (ladder, at row 5 col 1)
//     square 14 → 35  (ladder, at row 3 col 1)
//     square 17 → 13  (snake,  at row 3 col 4)
//
//   Best route: 1 →(roll to 2, ladder)→ 15 →(roll to 17, snake)→ 13
//               →(roll to 14, ladder)→ 35 →(roll to 36)→ done. 4 rolls.
//
const board1: number[][] = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1],
];

const board2: number[][] = [
  [-1, -1, 4, 6],
  [-1, -1, -1, -1],
  [15, -1, -1, -1],
  [-1, 8, -1, -1],
];

// TODO step 1: turn a square number into its [row, col] in the board array
//
//   Expected for a 6x6 board (check these against the square map above):
//     1  → [5, 0]      6  → [5, 5]
//     7  → [4, 5]      12 → [4, 0]
//     14 → [3, 1]      17 → [3, 4]
//     36 → [0, 0]
//

interface SquareToEnqueue {
  number: number,
  rolls: number
}

const squareToRowCol = (square: number, n: number): [number, number] => {
  let squareCounter: number = 0;
  let countFromStartOfCols: boolean = true;

  for (let row = n - 1; row >= 0; row--) {
    if (countFromStartOfCols) {
      for (let col = 0; col < n; col++) {
        squareCounter += 1;

        if (squareCounter === square) {
          return [row, col];
        }
      }

      countFromStartOfCols = false;
    } else {
      for (let col = n - 1; col >= 0; col--) {
        squareCounter += 1;

        if (squareCounter === square) {
          return [row, col];
        }
      }

      countFromStartOfCols = true;
    }
  }

  throw new Error(`square ${square} is off the board`);
};

function snakesAndLadders(board: number[][]): number {
  const trackedSquare: SquareToEnqueue = { number: 1, rolls: 0 }
  const squaresToExplore: SquareToEnqueue[] = [ trackedSquare ];

  const visitedSquares = new Set<number>();
  visitedSquares.add(trackedSquare.number);

  while (squaresToExplore.length > 0) {
    const dequeuedSquare: SquareToEnqueue | undefined = squaresToExplore.shift();

    if (dequeuedSquare) {
      const lastSquare: number = board.length * board.length;
      const maxRoll: number = Math.min(6, lastSquare - dequeuedSquare.number);
      const potentialSpaces: number[] = [];

      for (let roll: number = 1; roll <= maxRoll; roll++) {
        potentialSpaces.push(dequeuedSquare.number + roll)
      }

      for (let rollNum of potentialSpaces) {
        const [ row, col ]: [ number, number ] = squareToRowCol(rollNum, board.length);

        const valAtThisPartBoard: number = board[row][col];

        const endSquare: number = valAtThisPartBoard === -1 ?
          rollNum : valAtThisPartBoard

        const updatedRolls: number = dequeuedSquare.rolls + 1;

        if (endSquare === lastSquare) {
          return updatedRolls;
        }

        if (!visitedSquares.has(endSquare)) {
          visitedSquares.add(endSquare);

          const newSquareToEnqueue= {
            number: endSquare,
            rolls: updatedRolls,
          }

          squaresToExplore.push(newSquareToEnqueue)
        }
      }
    }
  }

  return -1;
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
