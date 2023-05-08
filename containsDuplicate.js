// Runs in O(N) time complexity and O(N) space complexity
function containsDuplicate(nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      const currentValue = map.get(nums[i]);
      map.set(nums[i], currentValue + 1);
    } else {
      map.set(nums[i], 1);
    }
  }
  for (let [key, value] of map) {
    if (value >= 2) {
      return true;
    }
  }
  return false;
}

const containsDuplicate1 = containsDuplicate([1,2,3,4]); // false
const containsDuplicate2 = containsDuplicate([1,1,1,3,3,4,3,2,4,2]); // true
const containsDuplicate3 = containsDuplicate([1,2,3,1]); // true
