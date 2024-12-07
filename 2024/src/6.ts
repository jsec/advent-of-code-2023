import { getInputMatrix } from './utils/input.js';
import { Matrix } from './utils/matrix.js';

interface Vector {
  delta: number[];
  next: 'down' | 'left' | 'right' | 'up';
}

const directions: Record<string, Vector> = {
  down: {
    delta: [1, 0],
    next: 'left',
  },
  left: {
    delta: [0, -1],
    next: 'up',
  },
  right: {
    delta: [0, 1],
    next: 'down',
  },
  up: {
    delta: [-1, 0],
    next: 'right',
  },
};

const matrix = new Matrix(getInputMatrix);
let [y, x] = matrix.find('^');
let vector = directions['up']!;

/// PART 1 AND 2 ///
const visited = new Set<string>();

while (true) {
  visited.add(`${y}-${x}`);
  const [dy, dx] = vector.delta;
  const [ny, nx] = [y! + dy!, x! + dx!];

  if (ny < 0 || ny >= matrix.height) {
    break;
  }

  if (nx < 0 || nx >= matrix.width) {
    break;
  }

  if (matrix.at(ny, nx) === '#') {
    vector = directions[vector.next]!;
    continue;
  }

  y = ny;
  x = nx;
}

console.log('P1:', visited.size);
