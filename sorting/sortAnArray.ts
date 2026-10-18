// LeetCode 912: Sort an Array
// Sort nums ascending and return it — WITHOUT built-in sort functions,
// in O(n log n) time, with the smallest space complexity possible.
//
// Constraints: 1 <= nums.length <= 5*10^4, -5*10^4 <= nums[i] <= 5*10^4
// (values are NOT unique — duplicates must survive sorting).
//
// Plan: quicksort, in-place (that's the "smallest space" answer — O(log n)
// stack, no merge buffers).
//
// ---- Milestones ----
// 1. partition(nums, lo, hi): pick a pivot, rearrange the slice so everything
//    < pivot is left of it and everything >= is right, return the pivot's
//    final resting index. (Lomuto scheme is the easiest to hand-roll and
//    trace on paper; Hoare is faster but fiddlier.)
// 2. The recursion: quicksort(lo, hi) = partition, then recurse on the two
//    halves AROUND the pivot index (the pivot is already home — exclude it,
//    or equal-element arrays recurse forever).
// 3. ⚠️ THE LC TRAP: LeetCode 912 feeds quicksort its nightmare inputs —
//    already-sorted arrays and arrays of many duplicates. A fixed pivot
//    (always last / always first) degrades to O(n^2) there and TLEs.
//    Pick the pivot RANDOMLY (swap a random element into the pivot slot
//    first, then partition as normal). That one change is the difference
//    between Accepted and Time Limit Exceeded.
//
// Interview talking points while you build:
//   - why is quicksort O(n log n) average but O(n^2) worst case?
//   - why is in-place quicksort O(log n) space, not O(1)? (what's on the stack?)
//   - when would you pick mergesort instead? (stability, guaranteed n log n)

import { check, isSorted, randomArray } from './helpers.ts';

const swapElements = (start: number, end: number, nums: number[]) => {
  const tempStartVal: number = nums[start];
  nums[start] = nums[end];
  nums[end] = tempStartVal;
}

const partitionFromPivot = (pivotIdx: number, endArrIdx: number, nums: number[]) => {
  let start: number = pivotIdx;
  let end: number = endArrIdx + 1; // one PAST the end — the mandatory first `end -= 1` eats it

  const midIdx: number = Math.floor((pivotIdx + endArrIdx)/ 2);
  swapElements(pivotIdx, midIdx, nums);

  const pivotVal: number = nums[pivotIdx];

  while (start < end) {
    start += 1;

    while (start <= endArrIdx && nums[start] <= pivotVal) {
      start += 1;
    }

    end -= 1;

    while (nums[end] > pivotVal) {
      end -= 1;
    }

    if (start < end) {
      swapElements(start, end, nums);
    }
  }

  swapElements(pivotIdx, end, nums);
  return end;
}

const quickSort = (lo: number, high: number, nums: number[]) => {
  if (lo >= high) {
    return;
  }

  const pivotSortedIdx: number = partitionFromPivot(lo, high, nums);

  quickSort(lo, pivotSortedIdx - 1, nums);
  quickSort(pivotSortedIdx + 1, high, nums);
}

function sortArray(nums: number[]): number[] {
  const pivotIdx: number = 0;
  const endArrIdx: number = nums.length - 1; // hi is an INCLUSIVE index everywhere in this file

  quickSort(pivotIdx, endArrIdx, nums);

  return nums;
}

// ---- tests ----

// check('LC example 1', sortArray([5, 2, 3, 1]), [1, 2, 3, 5]);
// check('LC example 2 (duplicates)', sortArray([5, 1, 1, 2, 0, 0]), [0, 0, 1, 1, 2, 5]);


// Abdul Bari's lecture example — trace along with the video, pen & paper.
// His scheme: pivot = FIRST element, two pointers walk inward and swap,
// pivot finally swaps to where they cross.
check('Abdul Bari example', sortArray([10, 16, 8, 12, 15, 6, 3, 9, 5]), [3, 5, 6, 8, 9, 10, 12, 15, 16]);


// check('negatives mixed in', sortArray([3, -1, 0, -5, 2]), [-5, -1, 0, 2, 3]);
// check('single element', sortArray([42]), [42]);
// check('two elements, reversed', sortArray([2, 1]), [1, 2]);
//
// // The quicksort nightmare inputs (milestone 3 — fixed pivots die here):
// check('already sorted', sortArray([1, 2, 3, 4, 5, 6, 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8]);
// check('reverse sorted', sortArray([8, 7, 6, 5, 4, 3, 2, 1]), [1, 2, 3, 4, 5, 6, 7, 8]);
// check('all duplicates', sortArray([7, 7, 7, 7, 7, 7]), [7, 7, 7, 7, 7, 7]);

// Fuzz: 500 random arrays vs the native sort as oracle. Catches the bugs
// hand-picked cases miss (pivot edge cases, off-by-ones in partition).
let fuzzFailures = 0;
for (let i = 0; i < 500; i++) {
  const arr = randomArray(50);
  const expected = [...arr].sort((a, b) => a - b); // oracle only — not part of the solution
  if (JSON.stringify(sortArray([...arr])) !== JSON.stringify(expected)) fuzzFailures++;
}
check('fuzz: 500 random arrays match native sort', fuzzFailures, 0);

// Perf canary for the LC trap: a big already-sorted array. A fixed-pivot
// quicksort goes O(n^2) here (~10s+); randomized pivot finishes instantly.
const big = Array.from({ length: 20_000 }, (_, i) => i);
const t0 = performance.now();
sortArray(big);
const elapsedMs = performance.now() - t0;
check('20k sorted array finishes fast (randomized pivot)', elapsedMs < 1_000, true);
console.log(`   (took ${elapsedMs.toFixed(1)}ms — fixed pivot would take ~10,000ms+)`);