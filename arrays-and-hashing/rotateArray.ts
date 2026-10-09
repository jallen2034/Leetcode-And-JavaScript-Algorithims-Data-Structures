// LeetCode 189: Rotate Array
// Rotate nums to the RIGHT by k steps, IN PLACE (change nums itself, return nothing).

function reverseSection(arr: number[], start: number, end: number): void {
  while (start < end) {
    const valStartBucket: number = arr[start];
    const valEndBucket: number = arr[end];

    arr[start] = valEndBucket;
    arr[end] = valStartBucket;

    start += 1;
    end -= 1;
  }
}

const rotate3StepApproach = (nums: number[], k: number) => {
  const effectiveK: number = k % nums.length;

  reverseSection(nums, 0, nums.length - 1);

  const leftPtr: number = effectiveK - 1;
  const rightPtr: number = effectiveK;

  reverseSection(nums, 0, leftPtr);
  reverseSection(nums, rightPtr, nums.length - 1);
}


function rotate(nums: number[], k: number): void {
  const rotated: number[] = new Array(nums.length).fill(0);

  for (let i: number = 0; i < nums.length; i++) {
    const unwrappedIdx: number = i + k;

    if (unwrappedIdx <= nums.length - 1) {
      rotated[unwrappedIdx] = nums[i];
    } else {
      const wrappedIdx: number = unwrappedIdx % nums.length;
      rotated[wrappedIdx] = nums[i];
    }
  }

  for (let i: number = 0; i < nums.length; i++) {
    nums[i] = rotated[i];
  }
}

const check = (label: string, input: number[], k: number, expected: number[]) => {
  const nums = [...input];

  // rotate(nums, k);
  rotate3StepApproach(nums, k);

  const pass = JSON.stringify(nums) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(nums)}, expected ${JSON.stringify(expected)}`);
};

// LeetCode Example 1
//   [1, 2, 3, 4, 5, 6, 7], k = 3
//   step 1: [7, 1, 2, 3, 4, 5, 6]
//   step 2: [6, 7, 1, 2, 3, 4, 5]
//   step 3: [5, 6, 7, 1, 2, 3, 4]
check('example 1', [1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]);

// LeetCode Example 2
//   [-1, -100, 3, 99], k = 2
//   step 1: [99, -1, -100, 3]
//   step 2: [3, 99, -1, -100]
check('example 2', [-1, -100, 3, 99], 2, [3, 99, -1, -100]);

// k = 0: no rotation at all
check('k is 0', [1, 2, 3], 0, [1, 2, 3]);

// k equals the length
//   [1, 2, 3], k = 3
check('k equals length', [1, 2, 3], 3, [1, 2, 3]);

// k is BIGGER than the length
//   [1, 2, 3], k = 4
check('k bigger than length', [1, 2, 3], 4, [3, 1, 2]);

// Single element, large k
check('single element', [1], 5, [1]);