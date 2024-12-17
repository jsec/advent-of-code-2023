import TinyQueue from 'tinyqueue';

import type { Coordinate } from './utils/types.js';

import { getInputMatrix } from './utils/input.js';
import { Matrix } from './utils/matrix.js';

type Node = {
  direction: string;
  score: number;
} & Coordinate;

type StartNode = Omit<Node, 'score'>;

const DIRECTIONS: Record<string, Coordinate> = {
  E: { x: 0, y: 1 },
  N: { x: -1, y: 0 },
  S: { x: 1, y: 0 },
  W: { x: 0, y: -1 },
};

const REVERSE_DIRECTIONS: Record<string, string> = {
  E: 'W',
  N: 'S',
  S: 'N',
  W: 'E',
};

const hashNode = (node: { direction: string; x: number; y: number }) => `${node.x}-${node.y}-${node.direction}`;

const dijkstra = (matrix: Matrix<string>, starts: StartNode[]) => {
  const distances = new Map();
  const queue = new TinyQueue<Node>([], (a, b) => a.score - b.score);

  for (const start of starts) {
    const startNode: Node = {
      direction: 'E',
      score: 0,
      x: start.x,
      y: start.y,
    };

    distances.set(hashNode(startNode), 0);
    queue.push(startNode);
  }

  while (queue.length > 0) {
    const node = queue.pop()!;

    if (distances.get(hashNode(node)) < node!.score) {
      continue;
    }

    for (const direction of Object.keys(DIRECTIONS).filter(key => key != node.direction)) {
      const next = hashNode({ ...node, direction });
      if (!distances.get(next) || distances.get(next) > node.score + 1000) {
        distances.set(next, node.score + 1000);
        queue.push({
          direction: direction,
          score: node.score + 1000,
          x: node.x,
          y: node.y,
        });
      }
    }

    const { x: dx, y: dy } = DIRECTIONS[node.direction]!;
    const nx = node.x + dx;
    const ny = node.y + dy;

    const next = hashNode({ direction: node.direction, x: nx, y: ny });

    if (matrix.inBounds(nx, ny)
      && matrix.at(nx, ny) !== '#'
      && (!distances.get(next) || distances.get(next) > node.score + 1)
    ) {
      distances.set(next, node.score + 1);

      queue.push({
        direction: node.direction,
        score: node.score + 1,
        x: nx,
        y: ny,
      });
    }
  }

  return distances;
};

/// PART 1 ///
const p1 = (matrix: Matrix<string>, start: Coordinate, end: Coordinate) => {
  let result = Infinity;
  const distances = dijkstra(matrix, [{ ...start, direction: 'E' }]);

  for (const direction of Object.keys(DIRECTIONS)) {
    const endHash = hashNode({ direction, x: end.x, y: end.y });
    if (distances.has(endHash)) {
      result = Math.min(result, distances.get(endHash));
    }
  }

  return result;
};

/// PART 2 ///
const p2 = (matrix: Matrix<string>, start: Coordinate, end: Coordinate, optimal: number) => {
  const reverseStarts: StartNode[] = Object.keys(DIRECTIONS).map((direction) => {
    return {
      direction,
      x: end.x,
      y: end.y,
    };
  });

  const fromStart = dijkstra(matrix, [{ ...start, direction: 'E' }]);
  const fromEnd = dijkstra(matrix, reverseStarts);
  const result = new Set();

  for (let x = 0; x < matrix.height; x++) {
    for (let y = 0; y < matrix.width; y++) {
      for (const direction in DIRECTIONS) {
        const startState = hashNode({ direction, x, y });
        const endState = hashNode({ direction: REVERSE_DIRECTIONS[direction]!, x, y });

        if (fromStart.has(startState) && fromEnd.has(endState) && fromStart.get(startState) + fromEnd.get(endState) === optimal) {
          result.add(`${x}-${y}`);
        }
      }
    }
  }

  return result.size;
};

const matrix = new Matrix(() => getInputMatrix());
const start = matrix.find('S');
const end = matrix.find('E');

const optimal = p1(matrix, start, end);

console.log('P1:', optimal);
console.log('P2:', p2(matrix, start, end, optimal));
