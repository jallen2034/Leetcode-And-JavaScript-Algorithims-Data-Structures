// HackerRank: Designer PDF Viewer
// h holds the height of each letter: h[0] is 'a', h[1] is 'b', ... h[25] is 'z'.
// Every letter is 1mm wide. Return the area of the highlight rectangle for `word`.

function designerPdfViewer(h: number[], word: string): number {
  const CHAR_OFFSET = 97;

  const resultArr: number[] = [];

  for (const letter of word) {
    const charConvertedToASCII: number = letter.charCodeAt(0);
    const indexedLetter: number = charConvertedToASCII - CHAR_OFFSET;

    resultArr.push(h[indexedLetter]);
  }

  const max: number = Math.max(...resultArr);
  return max * resultArr.length;
}

// ---- tests ----
const check = (label: string, actual: number, expected: number) => {
  console.log(`${actual === expected ? 'PASS' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
};

// The example from the problem description
//   index:                 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
//                  letter: a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
const hExample: number[] = [1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 1, 1, 5, 5, 1, 5, 2, 5, 5, 5, 5, 5, 5];

check('example: torn', designerPdfViewer(hExample, 'torn'), 8);

// // Sample 0
// const hSample0: number[] = [1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
//
// check('sample 0: abc', designerPdfViewer(hSample0, 'abc'), 9);
//
// // Sample 1 (same as sample 0, except 'z' is 7 tall)
// const hSample1: number[] = [1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7];
//
// check('sample 1: zaba', designerPdfViewer(hSample1, 'zaba'), 28);