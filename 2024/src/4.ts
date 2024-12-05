import { getInputMatrix } from './utils/input.js';

type Matrix = string[][];

const matrix: Matrix = getInputMatrix();

const rows = matrix.length;
const columns = matrix[0]!.length;

const paths = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

const isXmas = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  matrix: Matrix,
  target: string,
) => {
  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < target.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (nx < 0 || ny < 0 || nx >= rows || ny >= columns || matrix[ny]![nx] !== target[i]) {
      return false;
    }
  }
  return true;
};

/// PART 1 ///
const p1 = (matrix: Matrix) => {
  const target = 'XMAS';

  let count = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (const [dx, dy] of paths) {
        if (isXmas(x, y, dx!, dy!, matrix, target)) {
          count++;
        }
      }
    }
  }
  return count;
};

console.log('P1:', p1(matrix));

/// PART 1 ///
const p2 = (matrix: Matrix) => {
  let count = 0;
  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < columns - 1; y++) {
      if (matrix[x]![y] === 'A') {
        const counterclockwise
          = (matrix[x - 1]![y - 1] === 'M' && matrix[x + 1]![y + 1] === 'S')
          || (matrix[x - 1]![y - 1] === 'S' && matrix[x + 1]![y + 1] === 'M');

        const clockwise
          = (matrix[x - 1]![y + 1] === 'M' && matrix[x + 1]![y - 1] === 'S')
          || (matrix[x - 1]![y + 1] === 'S' && matrix[x + 1]![y - 1] === 'M');
        if (clockwise && counterclockwise) {
          count++;
        }
      }
    }
  }
  return count;
};

console.log('P2:', p2(matrix));
