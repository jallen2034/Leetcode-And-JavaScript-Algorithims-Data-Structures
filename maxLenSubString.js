/**
 * @param {string} s
 * @return {number}
 */
const maximumLengthSubstring = function (s) {
  let left = 0
  let arrLen = 0
  const resultHash = new Map()

  for (let right = 0; right < s.length; right++) {
    let value = s[right]

    while (resultHash.get(value) === 2) {
      resultHash.set(s[left], resultHash.get(s[left]) - 1)
      left += 1
    }

    resultHash.set(value, (resultHash.has(value) ? resultHash.get(value) : 0) + 1)
    arrLen = Math.max(arrLen, right - left + 1);
  }

  return arrLen
}

console.log(maximumLengthSubstring("bcbbbcba")) // output 4
console.log(maximumLengthSubstring("aaaa")) // 2
