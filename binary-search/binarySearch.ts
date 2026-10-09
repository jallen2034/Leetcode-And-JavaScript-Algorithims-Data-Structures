import { check } from './helpers.ts';

const calcMid = (left: number, right: number) => {
  const distance: number = right - left;
  const halfDistance: number = distance / 2;
  const exactMiddle: number = left + halfDistance;
  return Math.floor(exactMiddle);
}

function search(nums: number[], target: number): number {
  if (nums.length === 0) {
    return -1;
  }

  let left: number = 0;
  let right: number = nums.length -1;
  let midPoint: number  = calcMid(left, right)

  while (left <= right) {
    if (target < nums[midPoint]) {
      right = midPoint - 1;

      midPoint = calcMid(left, right);
    } else if (target > nums[midPoint]) {
      left = midPoint + 1;

      midPoint = calcMid(left, right);
    } else {
      return midPoint;
    }
  }

  // your algorithm goes here
  return -1;
}



const nums = [-1, 0, 3, 5, 9, 12];
const single = [5];

check('Test 1', search(nums, 9), 4);     // interior value, expected index 4
check('Test 2', search(nums, 2), -1);    // not present (interior gap), expected -1
check('Test 3', search(nums, -1), 0);    // first element, expected index 0
check('Test 4', search(nums, 12), 5);    // last element, expected index 5
check('Test 5', search(single, 5), 0);   // single element, found, expected index 0
check('Test 6', search(single, 3), -1);  // single element, not found, expected -1
check('Test 7', search(nums, -100), -1); // below range, expected -1
check('Test 8', search(nums, 100), -1);  // above range, expected -1