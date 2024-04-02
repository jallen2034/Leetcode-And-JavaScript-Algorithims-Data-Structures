const narrowDownRange = function(matrix, target, topPointer, bottomPointer) {
  while (bottomPointer > topPointer) {
    const midpoint = Math.floor((topPointer + bottomPointer) / 2);

    // Check if the target might be in the current row
    if (target < matrix[midpoint][0]) {
      if (midpoint === 0) {
        bottomPointer = midpoint;
        break;
      }
      bottomPointer = midpoint - 1; // Move the bottom pointer up to the midpoint
    } else if (target > matrix[midpoint][matrix[midpoint].length - 1]) {
      topPointer = midpoint + 1; // Move the top pointer down to the midpoint
    } else if (target === matrix[midpoint][matrix[midpoint].length - 1]) {
      return true; // we got lucky and found it right away
    } else if (target === matrix[midpoint][0]) {
      return true;
    } else {
      // Otherwise the number is likely in the midpoint row we're sitting on
      topPointer = midpoint;
      bottomPointer = midpoint;
      break;
    }
  }

  return { topPointer, bottomPointer };
}

const binarySearch1ColWide = function (matrix, target, secondPointer) {
  let firstPointer = 0;

  while (firstPointer <= secondPointer) {
    const midpoint = Math.floor((firstPointer + secondPointer) / 2);
    const currentFoundVal = matrix[midpoint][0];

    if (currentFoundVal === target) {
      return true; // Target found
    } else if (currentFoundVal < target) {
      firstPointer = midpoint + 1; // Move left pointer to the right of the midpoint
    } else {
      secondPointer = midpoint - 1; // Move right pointer to the left of the midpoint
    }
  }

  return false; // Target not found
}

const binarySearchColsInRow = function (row, target) {
  let leftPointer = 0;
  let rightPointer = row.length - 1;

  while (leftPointer <= rightPointer) {
    const midpoint = Math.floor((leftPointer + rightPointer) / 2);
    const currentFoundVal = row[midpoint];

    if (currentFoundVal === target) {
      return true; // Target found
    } else if (currentFoundVal < target) {
      leftPointer = midpoint + 1; // Move left pointer to the right of the midpoint
    } else {
      rightPointer = midpoint - 1; // Move right pointer to the left of the midpoint
    }
  }

  return false; // Target not found
}

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  // If either the number of rows or columns is 1, directly check for the target
  if (matrix.length === 1 && matrix[0].length === 1) return matrix[0][0] === target;

  let topPointer = 0
  let bottomPointer = matrix.length - 1
  let leftPointer = 0
  let rightPointer = matrix[0].length - 1

  // Perform binary search on only rows if column length is only 1 wide
  if (matrix[0].length === 1) return binarySearch1ColWide(matrix, target, bottomPointer)

  // Search rows to narrow down the range where the target value might be
  const rangeResult = narrowDownRange(matrix, target, topPointer, bottomPointer);
  if (rangeResult === true) return true; // Target found in narrowed down range
  bottomPointer = rangeResult.bottomPointer;

  // Make sure the inner 2d arrays aren't of length 1 or less
  if (matrix[0].length === 0) return false

  // Make sure the inner 2d arrays aren't of length 1 or less
  if (leftPointer === rightPointer) return matrix[bottomPointer][leftPointer] === target

  // Binary search within the narrowed down row
  return binarySearchColsInRow(matrix[bottomPointer], target);
}

const result1 = searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3) // true
const result2 = searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13) // false
const result3 = searchMatrix([[1],[3]], 0) // false
const result4 = searchMatrix([[1]], 1) // true
const result5 = searchMatrix([[1,3]], 3) // true
const result6 = searchMatrix([[1],[3]], 3) // true
const result7 = searchMatrix([[1],[3],[5]], 3) // true
const result8 = searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,50]], 11) // true
const result9 = searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,50]], 20) // true
const result10 = searchMatrix([[1,1],[2,2]], 2) // true
const result11 = searchMatrix([[-9,-8,-8],[-5,-3,-2],[0,2,2],[4,6,8]], 15) // false
const result12 = searchMatrix([[1,1],[2,2]], 0) // false
console.log(result1)
console.log(result2)
console.log(result3)
console.log(result4)
console.log(result5)
console.log(result6)
console.log(result7)
console.log(result8)
console.log(result9)
console.log(result10)
console.log(result11)
console.log(result12)
