// LeetCode 977: Squares of a Sorted Array (Easy)
import { check } from './helpers.ts';

const findMergeStartPointers = (nums: number[]) => {
  let rightPtr: number = 0;
  let leftPtr: number = 0;

  for (let i: number = 0; i < nums.length; i++) {
    const val: number = nums[i];
    const valIsNonNegative: boolean = val >= 0;

    if (valIsNonNegative) {
      rightPtr =  i;
      leftPtr = i - 1;

      return {
        leftPtr,
        rightPtr
      }
    }
  }

  leftPtr = nums.length -1;
  rightPtr = leftPtr + 1;

  return {
    leftPtr,
    rightPtr
  }
}

const sortedSquares = (nums: number[]): number[] => {
  const res: number[] = [];

  let { leftPtr, rightPtr } = findMergeStartPointers(nums);

  while (res.length !== nums.length) {
    const leftSquared: number = Math.pow(nums[leftPtr], 2);
    const rightSquared: number = Math.pow(nums[rightPtr], 2);

    if (leftSquared < rightSquared || isNaN(rightSquared)) {
      res.push(leftSquared);
      leftPtr -= 1;
    } else {
      res.push(rightSquared);
      rightPtr += 1;
    }
  }

  return res;
};

check('LC ex1: negatives and positives', sortedSquares([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]);
check('LC ex2: square collision (two 3s)', sortedSquares([-7, -3, 2, 3, 11]), [4, 9, 9, 49, 121]);
check('mix negative positive: input order fully reverses', sortedSquares([-5, -4, 1, 2]), [1, 4, 16, 25]);
check('all negative: input order fully reverses', sortedSquares([-5, -4, -2, -1]), [1, 4, 16, 25]);
check('single element', sortedSquares([-3]), [9]);
check('all non-negative: already in order', sortedSquares([0, 1, 2, 4]), [0, 1, 4, 16]);
check('one negative, many positives', sortedSquares([-1, 2, 3, 4]), [1, 4, 9, 16]);
check('many negatives, one positive', sortedSquares([-5, -4, 1]), [1, 16, 25]);
