import { getInputMatrix } from './utils/input.js';
import { Matrix } from './utils/matrix.js';

type Direction = 'down' | 'left' | 'right' | 'up';

interface Vector {
  delta: number[];
  name: Direction;
  next: Direction;
}

const directions: Record<string, Vector> = {
  down: {
    delta: [1, 0],
    name: 'down',
    next: 'left',
  },
  left: {
    delta: [0, -1],
    name: 'left',
    next: 'up',
  },
  right: {
    delta: [0, 1],
    name: 'right',
    next: 'down',
  },
  up: {
    delta: [-1, 0],
    name: 'up',
    next: 'right',
  },
};

/// PART 1 ///
const p1 = () => {
  const matrix = new Matrix(getInputMatrix);
  let [y, x] = matrix.find('^');
  let vector = directions['up']!;

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

  return visited;
};

const p1Visited = p1();
console.log('P1:', p1Visited.size);

/// PART 2 ///
const p2 = (visited: Set<string>) => {
  const isLoop = (obsY: number, obsX: number) => {
    const matrix = new Matrix(getInputMatrix);
    let [y, x] = matrix.find('^');
    matrix.set(obsY, obsX, '#');
    let vector = directions['up']!;

    const visited = new Set<string>();

    while (true) {
      visited.add(`${y}-${x}-${vector.name}`);
      const [dy, dx] = vector.delta;
      const [ny, nx] = [y! + dy!, x! + dx!];

      if (ny < 0 || ny >= matrix.height) {
        break;
      }

      if (nx < 0 || nx >= matrix.width) {
        break;
      }

      // If we're at the same spot, in the same direction, we're in a loop
      if (visited.has(`${ny}-${nx}-${vector.name}`)) {
        return true;
      }

      if (matrix.at(ny, nx) === '#') {
        vector = directions[vector.next]!;
        continue;
      }

      y = ny;
      x = nx;
    }

    return false;
  };

  let loopCount = 0;
  for (const coordHash of visited) {
    const [obsY, obsX] = coordHash.split('-').map(Number);
    if (isLoop(obsY!, obsX!)) {
      loopCount++;
    }
  }

  return loopCount;
};

console.log('P2:', p2(p1Visited));
