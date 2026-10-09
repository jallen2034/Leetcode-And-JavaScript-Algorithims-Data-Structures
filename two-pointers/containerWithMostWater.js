/**
 * Calculates the maximum area formed by two vertical lines and the x-axis.
 * @param {number[]} height - An array representing the heights of vertical lines.
 * @returns {number} - The maximum amount of water the container can hold.
 */
const maxArea = (height) => {
  let leftPointer = 0
  let rightPointer = height.length - 1
  let highestAreaFound = 0

  while (leftPointer < rightPointer) {
    let pointerWithLeastHeight
    const leftHeight = height[leftPointer]
    const rightHeight = height[rightPointer]

    // Determine which pointer has the least height.
    if (leftHeight < rightHeight) {
      pointerWithLeastHeight = leftPointer
    } else {
      pointerWithLeastHeight = rightPointer
    }

    // Calculate the area formed by the container.
    const area = (rightPointer - leftPointer) * height[pointerWithLeastHeight]

    // Update the maximum area found if the calculated area is greater.
    if (area > highestAreaFound) {
      highestAreaFound = area
    }

    // Move the pointers closer to each other based on the pointer with the least height.
    if (leftHeight < rightHeight || leftHeight === rightHeight) {
      leftPointer += 1 // Move the left pointer to the right.
    } else {
      rightPointer -= 1 // Move the right pointer to the left.
    }
  }

  return highestAreaFound
}

const result1 = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) // 49
const result2 = maxArea([4, 3, 2, 1, 4]) // 16
const result3 = maxArea([3, 6, 2, 4, 7]) // 18
console.log({ result1, result2, result3 })
