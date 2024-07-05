// Class to be used to define a node to be used in a singly-linked list
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Class to calculate our solution :)
class Solution {
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  addTwoNumbers(l1, l2) {
    let dummy = new ListNode()
    let current = dummy
    let valueToCarry = 0

    // Iterate through our nodes until either of them has a digit.
    while (l1 || l2 !== null || valueToCarry) {
      /* handle the edge case where one linked list might be longer than the other.
       * If l1 or l2 is null, we default its value to 0 to continue our addition process.*/
      const value1 = l1 ? l1.val : 0;
      const value2 = l2 ? l2.val : 0;

      // compute the new digit by adding together the values of v1, v2 and our carried over value :)
      let addedValue = value1 + value2 + valueToCarry

      /* Extract the "carry" value from addedValue using integer division.
       * For example, when summing 9 + 6 resulting in 15, extract "1" to carry over. */
      valueToCarry = Math.floor(addedValue / 10);

      /* Extract the rightmost digit from addedValue using a modulo operation.
       * For instance, from 15 % 10, obtain the remainder which is 5, our second digit. */
      addedValue = addedValue % 10;

      // insert the added value into our result linked list :)
      current.next = new ListNode(addedValue)

      // Move the current pointer to the next node in the result linked list.
      current = current.next

      // Advance to the next node in both l1 and l2 if they exist, or set them to null if either list is exhausted.
      l1 = l1 ? l1.next : null;
      l2 = l2 ? l2.next : null;
    }

    return dummy.next
  }
}

// helper function to create linked list from array.
function createLinkedList(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// helper function to print out a linked list.
function printLinkedList(node) {
  let result = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  console.log(result.join(" -> "));
}

// create our linked lists to represent our given numbers.
let l1 = createLinkedList([5, 6, 4]); // Represents 465
let l2 = createLinkedList([2, 4, 3, 3]); // Represents 3342

// print out our two linked lists.
printLinkedList(l1); // Should output the sum as a linked list
printLinkedList(l2); // Should output the sum as a linked list

// instantiate the solution and call the addTwoNumbers method in our class to create the result linked list.
let solution = new Solution();
let result = solution.addTwoNumbers(l1, l2);

// print out the result linked list.
printLinkedList(result); // Should output the sum as a linked list
