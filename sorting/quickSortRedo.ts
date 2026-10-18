// Quicksort — REBUILD, from scratch, on the clock.
// (Round 1 lives in sortAnArray.ts / quickSort.js. Do NOT peek until green.)
//
// Sort nums ascending IN PLACE and return it — no built-in sorts.
// Target: O(n log n) average time, O(log n) space (the recursion stack).
//
// THE DRILL (interview conditions — ~25 min total):
//
//   1. PEN & PAPER FIRST (~10 min). Before any code, hand-trace a full
//      Lomuto partition on this array, pivot = last element (5):
//
//          [3, 2, 8, 9, 1, 5]
//
//      Write every step: the boundary index, the scan index, each swap,
//      and the array after each swap. Finish with the pivot's final
//      resting index. Then mark which two slices recurse next.
//      If you can't trace it on paper, you can't debug it in code.
//
//   2. Then trace ONE more round on each slice, so you've seen the
//      recursion bottom out (slices of length 0 and 1 = base case).
//
//   3. Now code it. Narrate out loud: pivot choice, invariant of the
//      partition loop ("everything left of the boundary is < pivot"),
//      why the pivot is EXCLUDED from both recursive calls.
//
// Talking points to be ready for (interviewer WILL ask):
//   - average vs worst case: why O(n log n) vs O(n^2)? what input triggers worst?
//   - how does random pivot selection defuse the worst case?
//   - why O(log n) space and not O(1)? (what's on the stack?)
//   - quicksort vs mergesort: stability, guaranteed bounds, cache behavior.
//
// Start the timer. Go.

import { check, isSorted, randomArray } from './helpers.ts';

const swap = (boundaryIdx: number, scannerIdx: number, nums: number[]): void => {
  const tempVal: number = nums[boundaryIdx];
  nums[boundaryIdx] = nums[scannerIdx];
  nums[scannerIdx] = tempVal;
};

// Rearrange nums[lo..hi] around a pivot; return the pivot's final index.
const partition = (lo: number, hi: number, nums: number[]): number => {
  const randomIdx: number = lo + Math.floor(Math.random() * (hi - lo + 1))
  swap(randomIdx, hi, nums);

  const pivotPoint: number = hi;
  let boundary: number = lo;
  let scanner: number = lo;

  while (scanner < pivotPoint) {
    if (nums[scanner] < nums[pivotPoint]) {
      swap(boundary, scanner, nums);
      scanner += 1;
      boundary += 1;
    } else {
      scanner += 1;
    }
  }

  swap(boundary, pivotPoint, nums);

  const pivotHome: number = boundary;
  return pivotHome;
};

const quickSort = (nums: number[], lo: number = 0, hi: number = nums.length - 1): number[] => {
  if (lo >= hi) {
    return nums;
  }

  const pivotHome: number = partition(lo, hi, nums);

  quickSort(nums, lo, pivotHome - 1);
  quickSort(nums, pivotHome + 1, hi);

  return nums;
};

// ---- tests ----

// -- basics --
check('paper-trace array', quickSort([3, 8, 2, 9, 1, 5]), [1, 2, 3, 5, 8, 9]);
check('LC example 1', quickSort([5, 2, 3, 1]), [1, 2, 3, 5]);
check('LC example 2', quickSort([5, 1, 1, 2, 0, 0]), [0, 0, 1, 1, 2, 5]);

// -- edges --
check('single element', quickSort([42]), [42]);
check('two elements, swapped', quickSort([2, 1]), [1, 2]);
check('empty array', quickSort([]), []);
check('negatives mixed in', quickSort([3, -1, 0, -5, 2]), [-5, -1, 0, 2, 3]);

// -- in place: the RETURNED array must be the SAME array object --
const inPlace = [3, 1, 2];
check('sorts in place (same reference)', quickSort(inPlace) === inPlace, true);

// -- quicksort's nightmare inputs (fixed-pivot versions go O(n^2) / infinite here) --
check('already sorted', quickSort([1, 2, 3, 4, 5, 6, 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8]);
check('reverse sorted', quickSort([8, 7, 6, 5, 4, 3, 2, 1]), [1, 2, 3, 4, 5, 6, 7, 8]);
check('all duplicates', quickSort([7, 7, 7, 7, 7, 7]), [7, 7, 7, 7, 7, 7]);
check('mostly duplicates', quickSort([2, 1, 2, 2, 1, 2, 1, 2]), [1, 1, 1, 2, 2, 2, 2, 2]);

// -- stack-depth check: a big sorted array blows the stack if your pivot
//    strategy degrades to O(n) recursion depth. Random pivot survives it. --
const big = Array.from({ length: 50_000 }, (_, i) => i);
check('50k already-sorted does not blow the stack', isSorted(quickSort(big)), true);

// -- fuzz: 20 random arrays vs the built-in sort --
let fuzzFails = 0;
for (let t = 0; t < 20; t++) {
  const arr = randomArray(200);
  const expected = [...arr].sort((a, b) => a - b);
  if (JSON.stringify(quickSort(arr)) !== JSON.stringify(expected)) fuzzFails++;
}
check('fuzz: 20 random arrays match Array.sort', fuzzFails, 0);