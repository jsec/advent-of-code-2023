import Queue from 'yocto-queue';

import type { Coordinate } from './utils/types.js';

import { createArray } from './utils/array.js';
import { getSplitInput } from './utils/input.js';
import { Matrix } from './utils/matrix.js';
import { StringSet } from './utils/string-set.js';

type Node = { distance: number } & Coordinate;

const parseInput = (): Coordinate[] => getSplitInput().map((line) => {
  const [x, y] = line.split(',').map(Number);
  return { x: x!, y: y! };
});

const walk = (matrix: Matrix<boolean>, bytes: Coordinate[], byteCount: number) => {
  for (let i = 0; i < byteCount; i++) {
    const { x, y } = bytes[i]!;
    matrix.set(y, x, true);
  }

  const paths = new Set<number>();
  const visited = new StringSet<Coordinate>(c => `${c.x}-${c.y}`);
  const queue = new Queue<Node>();

  queue.enqueue({ distance: 0, x: 0, y: 0 });

  while (queue.size > 0) {
    const { distance, x, y } = queue.dequeue()!;

    const neighbors = matrix.neighbors(x, y).filter(n => matrix.at(n.x, n.y) !== true);

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      if (neighbor.x === matrix.height - 1 && neighbor.y === matrix.width - 1) {
        paths.add(distance + 1);
      } else {
        visited.add(neighbor);
        queue.enqueue({ ...neighbor, distance: distance + 1 });
      }
    }
  }

  return paths;
};

const p1 = (matrix: Matrix<boolean>, bytes: Coordinate[], byteCount: number) => {
  const paths = walk(matrix, bytes, byteCount);

  return Math.min(...paths);
};

const bytes = parseInput();
const matrix = new Matrix(() => createArray(71, 71, false));

console.log('P1:', p1(matrix, bytes, 1024));
