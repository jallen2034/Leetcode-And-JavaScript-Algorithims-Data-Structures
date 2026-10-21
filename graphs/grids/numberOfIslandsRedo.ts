// LeetCode 200: Number of Islands (Medium) — Microsoft frequent flyer
// REDO 2026-10-20, speed rep. numberOfIslandsLeetcode.ts is round 1 — no
// peeking. You've demonstrated grid DFS; this is fluency + narration.
//
// Grid of '1' (land) and '0' (water). Count islands (4-directional).
//
// Constraints: 1 <= m, n <= 300, cells are '1' or '0'.
//
// ---- Speed drill (~45 sec, out loud) ----
//   1. The shape in one sentence: scan every cell; when you hit UNVISITED
//      land, count += 1 and flood-fill the whole island so it can't be
//      counted again.
//   2. Visited: mutate the grid ('1' → '0') or a Set with posKey? Say the
//      tradeoff out loud (interviewers ask). Either passes here.
//   3. Where does the flood stop? Bounds + water + already-seen — helpers
//      has inBounds and neighbors4 if you want them.
//
// Target: ~20 lines, 15 min.

import { check, type Grid } from './helpers.ts';

const numIslands = (grid: Grid): number => {
  // your code here
  return 0;
};

// ---- tests ----

check('LC ex1: one big island', numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]), 1);

check('LC ex2: three islands', numIslands([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]), 3);

check('all water', numIslands([
  ['0', '0'],
  ['0', '0'],
]), 0);

check('diagonals do NOT connect', numIslands([
  ['1', '0'],
  ['0', '1'],
]), 2);

check('single cell island', numIslands([['1']]), 1);
