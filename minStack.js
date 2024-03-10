class MinStack {
  constructor() {
    this.stack = [] // Use an array to represent the stack
    this.corrospondingStackMinVal = []
  }

  push(val) {
    const currentMinValStackIdx = this.corrospondingStackMinVal.length > 0 ? this.corrospondingStackMinVal.length - 1 : 0
    this.stack.push(val)
    if ((val <= this.getMin() || this.corrospondingStackMinVal.length === 0)) {
      this.corrospondingStackMinVal.push(val)
    }
  }

  pop() {
    if (this.stack.length > 0) {
      const popped = this.stack.pop()
      const currentMinValStackIdx = this.corrospondingStackMinVal.length > 0 ? this.corrospondingStackMinVal.length - 1 : 0
      if (popped === this.corrospondingStackMinVal[currentMinValStackIdx]) {
        this.corrospondingStackMinVal.pop()
      }
      return popped
    }
  }

  top() {
    return this.stack[this.stack.length - 1]
  }

  getMin() {
    const currentMinValStackIdx = this.corrospondingStackMinVal.length > 0 ? this.corrospondingStackMinVal.length - 1 : 0
    return this.corrospondingStackMinVal[currentMinValStackIdx]
  }
}

// Instantiate a MinStack object
const minStack = new MinStack()

// Perform operations based on the given input
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
const output1 = minStack.getMin() // Return -3
minStack.pop()
const output2 = minStack.top() // Return 0
const output3 = minStack.getMin() // Return -2

// Compare the outputs with the expected output
console.log("Output 1:", output1) // Expected: -3
console.log("Output 2:", output2) // Expected: 0
console.log("Output 3:", output3) // Expected: -2
