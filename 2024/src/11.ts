import { getSplitInput } from './utils/input.js';

const blink = (stones: number[]) => {
  for (let i = 0; i < stones.length; i++) {
    // rule 1
    if (stones[i] === 0) {
      stones[i] = 1;
      continue;
    }

    // rule 2
    const str = stones[i]!.toString();
    if (str.length % 2 === 0) {
      const midpoint = str.length / 2;

      const left = Number(str.slice(0, midpoint));
      stones[i] = left;

      const right = Number(str.slice(midpoint));
      stones.splice(i + 1, 0, right);

      i += 1;
      continue;
    }

    // rule 3
    stones[i]! *= 2024;
  }

  return stones;
};

const solve = (iterations: number) => {
  let stones = getSplitInput(' ').map(Number);

  for (let i = 0; i < iterations; i++) {
    stones = blink([...stones]);
  }

  return stones.length;
};

console.log('P1:', solve(25));
