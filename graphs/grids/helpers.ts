// Shared helpers for 2D grid/matrix problems (islands, rotting oranges, snakes & ladders...).
//
//   import { Grid, DIRECTIONS, inBounds, neighbors4, posKey, check } from './helpers.ts';
//
// Run any problem file directly: node <file>.ts

export type Grid<T = string> = T[][];

// up, down, left, right — add [dr, dc] to [row, col] to step in that direction
export const DIRECTIONS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const inBounds = (grid: unknown[][], row: number, col: number): boolean =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

// The 4 orthogonal neighbours of [row, col] that are actually on the grid.
export const neighbors4 = (grid: unknown[][], row: number, col: number): [number, number][] =>
  DIRECTIONS
    .map(([dRow, dCol]) => [row + dRow, col + dCol] as [number, number])
    .filter(([r, c]) => inBounds(grid, r, c));

// "3-2" — the usual string key for a visited Set
export const posKey = (row: number, col: number): string => `${row}-${col}`;

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};
