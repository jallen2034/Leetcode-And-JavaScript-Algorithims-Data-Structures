/**
 * @param {string} s
 * @return {string[]}
 */
const findRepeatedDnaSequences = function(s) {
  const finalResultArray = []
  const resultHash = new Map()
  let left = 0
  let right = 10

  for (let i = 0; i < s.length; i++) {
    const subString = s.substring(left, right)
    resultHash.set(subString, (resultHash.get(subString) || 0) + 1);
    left += 1
    right += 1
  }

  for (let [key, value] of resultHash.entries()) {
    if (value >= 2) {
      finalResultArray.push(key)
    }
  }

  return finalResultArray
};

console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT")) // Expected output ["AAAAACCCCC","CCCCCAAAAA"]
console.log(findRepeatedDnaSequences("AAAAAAAAAAAAA")) // Expected output ["AAAAAAAAAA"]
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT")) // expected output [ 'AAAAACCCCC', 'CCCCCAAAAA' ]
