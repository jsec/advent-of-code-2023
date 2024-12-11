import type { Coordinate } from './utils/types.js';

import { getNumberMatrix } from './utils/input.js';
import { sum } from './utils/math.js';
import { Matrix } from './utils/matrix.js';

const walk = (matrix: Matrix<number>, head: Coordinate, p1 = true) => {
  const queue = [head];
  const visited = new Set<Coordinate>();
  const peaks: string[] = [];

  while (queue.length > 0) {
    const coordinate = queue.shift()!;

    if (p1 && visited.has(coordinate)) {
      continue;
    }

    const height = matrix.at(coordinate.x, coordinate.y);
    if (height === 9) {
      const hash = `${coordinate.x}-${coordinate.y}`;
      peaks.push(hash);
      continue;
    }

    const neighbors = matrix
      .neighbors(coordinate.x, coordinate.y)
      .filter(({ x, y }) => matrix.at(x, y) === height + 1);

    for (const neighbor of neighbors) {
      queue.push(neighbor);
    }
  }

  return p1 ? new Set(peaks).size : peaks.length;
};

const matrix = new Matrix(() => getNumberMatrix());
const trailheads = matrix.findAll(0);

/// PART 1 ///
const p1 = sum(trailheads.map(head => walk(matrix, head)));
console.log('P1:', p1);

/// PART 2 ///
const p2 = sum(trailheads.map(head => walk(matrix, head, false)));
console.log('P2:', p2);
