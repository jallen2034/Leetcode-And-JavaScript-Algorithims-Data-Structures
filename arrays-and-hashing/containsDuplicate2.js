/**
 * Determines whether there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
 * @param {number[]} nums - The integer array to search for duplicates.
 * @param {number} k - The maximum distance allowed between two duplicate elements.
 * @return {boolean} - Returns true if duplicates are found within the specified distance, false otherwise.
 * Time Complexity: O(n), where n is the length of the input array.
 * Space Complexity: O(k), where k is the size of the sliding window.
 */
const containsNearbyDuplicate = function (nums, k) {
  // Handle edge case where K > array length
  if (k > nums.length + 1) return false

  const resultHash = new Map(); // Map to store the frequency of elements within the sliding window.
  let left = 0; // Left pointer of the sliding window.
  let right = 0; // Right pointer of the sliding window.

  // Initialize the resultHash with the first element of the array and its frequency.
  resultHash.set(nums[left], (resultHash.get(nums[left]) || 0) + 1);

  /*
   * First, advance the right pointer to the size of the window while populating the resultHash.
   * Check for duplicates within this initial window to handle cases where k is smaller than the array length.
   */
  while (right < k) {
    right += 1;
    if (resultHash.has(nums[right])) {
      return true; // Duplicate found within the initial window.
    }
    resultHash.set(nums[right], (resultHash.get(nums[right]) || 0) + 1);
  }

  // Slide the window to cover the entire array and check for duplicates along the way.
  while (right < nums.length) {
    resultHash.delete(nums[left]); // Remove the element at the left of the window.
    left += 1; // Move the left pointer to slide the window.
    right += 1; // Move the right pointer to slide the window.

    if (resultHash.has(nums[right])) {
      return true; // Duplicate found within the sliding window.
    }
    resultHash.set(nums[right], (resultHash.get(nums[right]) || 0) + 1); // Add the new element to the resultHash.
  }

  return false; // No duplicates found within the specified distance.
}

// Test cases
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // false
console.log(containsNearbyDuplicate([1, 2, 3, 4, 5, 6], 5)); // false
console.log(containsNearbyDuplicate([1, 2, 3, 4, 1, 6], 3)); // false
console.log(containsNearbyDuplicate([2, 2], 3)) // True
