import { rotate, rotateCounter } from './utils/array.js';
import { getSplitInput } from './utils/input.js';

const parseInput = () => {
  const schematics = getSplitInput('\n\n');
  const keys: number[][] = [];
  const locks: number[][] = [];

  for (const schematic of schematics) {
    const grid = schematic.split('\n').map(line => [...line]);

    if (grid[0]![0] === '#') {
      const heights = rotateCounter(grid).map(arr => arr.join('').indexOf('.') - 1);
      locks.push(heights.filter(h => h >= 0).reverse());
    } else {
      const heights = rotate(grid).map(arr => arr.join('').indexOf('.') - 1);
      keys.push(heights.filter(h => h >= 0));
    }
  }

  return { keys, locks };
};

const p1 = (keys: number[][], locks: number[][]) => {
  let result = 0;

  for (const key of keys) {
    result += locks.filter(lock => lock.every((value, idx) => value + key[idx]! <= 5)).length;
  }

  return result;
};

const { keys, locks } = parseInput();

console.log('P1:', p1(keys, locks));
