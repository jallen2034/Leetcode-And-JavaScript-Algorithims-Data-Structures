/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function(matrix) {
  const result = [];

  // initialize "left", "right", "top", and "bottom" pointers to track the boundaries of our matrix.
  let left = 0;
  let right = matrix[0].length - 1;
  let top = 0;
  let bottom = matrix.length - 1;

  /* continue iterating until our top and bottom pointers, as well as our left and right pointers,
   * converge and meet in the middle. These pointers serve to keep track of the boundaries within our matrix. */
  while (left <= right && top <= bottom) {

    // Step 1: get every value in the top row of matrix, left to right.
    for (let i = left; i <= right; i++) {
      const currentValue = matrix[top][i];
      result.push(currentValue); // as I go through each value, add it into results array
    }
    top++; // move top ointer down by 1

    // Step 2: get every value in the right most column of the matrix, top to bottom.
    for (let i = top; i <= bottom; i++) {
      const currentValue = matrix[i][right];
      result.push(currentValue); // as I go through each value, add it into results array
    }
    right--; // move right pointer left by 1

    // Step 3: get every value in the bottom most row of the matrix, left to right.
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        const currentValue = matrix[bottom][i];
        result.push(currentValue); // as I go through each value, add it into results array
      }
      bottom-- // move bottom pointer up by 1
    }

    // Step 4: get every value in left most column of the matrix bottom to top, until we hit the top pointer.
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        const currentValue = matrix[i][left];
        result.push(currentValue); // as I go through each value, add it into results array
      }
      left++ // move left pointer to right by 1
    }
  }
  return result;
};

const matrix = [[1,2,3],[4,5,6],[7,8,9]];
const matrix2 = [[1,2,3,4], [5,6,7,8], [9,10,11,12]];
const spiralMatrixResult1 = spiralOrder(matrix); // Output: [1,2,3,6,9,8,7,4,5]
const spiralMatrixResult2 = spiralOrder(matrix2); // Output: [1,2,3,4,8,12,11,10,9,5,6,7]
console.log("spiralMatrixResult1: ", spiralMatrixResult1);
console.log("spiralMatrixResult2: ", spiralMatrixResult2);
