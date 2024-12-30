import Queue from 'yocto-queue';

import { getSplitInput } from './utils/input.js';

interface Position { x: number; y: number }
type Keypad = Record<string, Position>;
type Path = { path: string } & Position;
type Distances = Record<string, number>;

const hashPosition = (pos: Position) => `${pos.x}-${pos.y}`;
const hashCode = (code: string, robot: number) => `${code}-${robot}`;

const MOVEMENTS = {
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 },
  '^': { x: 0, y: -1 },
  'v': { x: 0, y: 1 },
};

const DIRECTIONAL_PAD: Keypad = {
  '<': { x: 0, y: 1 },
  '>': { x: 2, y: 1 },
  '^': { x: 1, y: 0 },
  'A': { x: 2, y: 0 },
  'v': { x: 1, y: 1 },
  'X': { x: 0, y: 0 },
};

const NUMERIC_PAD: Keypad = {
  0: { x: 1, y: 3 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  A: { x: 2, y: 3 },
  X: { x: 0, y: 3 },
};

const findPaths = (pad: Keypad, start: string, end: string) => {
  const queue = new Queue<Path>();
  queue.enqueue({ ...pad[start]!, path: '' });

  const distances: Distances = {};

  const paths: string[] = [];

  while (queue.size > 0) {
    const current = queue.dequeue()!;

    if (current.x === pad[end]!.x && current.y === pad[end]!.y) {
      paths.push(current.path + 'A');
    }

    const hash = hashPosition(current);
    if (distances[hash] && distances[hash] < current.path.length) {
      continue;
    }

    for (const [dir, pos] of Object.entries(MOVEMENTS)) {
      const position: Position = { x: current.x + pos.x, y: current.y + pos.y };

      const gap = pad['X']!;

      if (gap.x === position.x && gap.y === position.y) {
        continue;
      }

      const button = Object.values(pad).find(key => key.x === position.x && key.y === position.y);

      if (button) {
        const updatedPath = current.path + dir;
        const posHash = hashPosition(position);

        if (!distances[posHash] || distances[posHash] >= updatedPath.length) {
          queue.enqueue({ ...position, path: updatedPath });
          distances[posHash] = updatedPath.length;
        }
      }
    }
  }

  return paths.sort((a, b) => a.length - b.length);
};

const findShortestPath = (pad: Keypad, code: string, robot: number, cache: Distances) => {
  const key = hashCode(code, robot);
  if (cache[key]) {
    return cache[key];
  }

  let currentKey = 'A';
  let length = 0;

  for (const char of code) {
    const paths = findPaths(pad, currentKey, char!);
    length += robot === 0
      ? paths![0]!.length
      : Math.min(...paths!.map(path => findShortestPath(DIRECTIONAL_PAD, path, robot - 1, cache)));

    currentKey = char;
  }

  cache[key] = length;
  return length;
};

const solve = (codes: string[], robots: number) => {
  const cache: Distances = {};
  let result = 0;

  for (const code of codes) {
    const numeral = Number.parseInt(([...code].filter(char => char.match(/\d/)).join('')));
    result += numeral * findShortestPath(NUMERIC_PAD, code, robots, cache);
  }

  return result;
};

const codes = getSplitInput();

console.log('P1:', solve(codes, 2));
console.log('P2:', solve(codes, 25));
