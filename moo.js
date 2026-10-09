const SIZE = 32;
const CHAR = "*";

function sierpinski(size, ch) {
    const lines = [];
    for (let row = 0; row < size; row++) {
        let line = " ".repeat(size - row - 1);
        for (let col = 0; col <= row; col++) {
            line += (col & row) === col ? `${ch} ` : "  ";
        }
        lines.push(line.trimEnd());
    }
    return lines.join("\n");
}

console.log(sierpinski(SIZE, CHAR));
 