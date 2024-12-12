import { getSplitInput } from './utils/input.js';
import { numberOfDigits } from './utils/number.js';

const cache = Array.from({ length: 76 }).map(() => new Map<number, number>());

const blink = (stone: number): number[] => {
  if (stone === 0) {
    return [1];
  }

  const digits = numberOfDigits(stone);
  if (digits % 2 === 0) {
    const mid = digits / 2;
    const left = Math.floor(stone / 10 ** mid);
    const right = stone - left * 10 ** mid;

    return [left, right];
  }

  return [stone * 2024];
};

const run = (stone: number, iteration: number): number => {
  if (cache[iteration]!.has(stone)) {
    return cache[iteration]!.get(stone)!;
  }

  const result = iteration === 1
    ? blink(stone).length
    : blink(stone)
      .map(stone => run(stone, iteration - 1))
      .reduce((left, right) => left! + right!);

  cache[iteration]!.set(stone, result);

  return result;
};

const solve = (iterations: number) => {
  const stones = getSplitInput(' ').map(Number);

  return stones
    .map(stone => run(stone, iterations))
    .reduce((left, right) => left + right);
};

console.log('P1:', solve(25));
console.log('P2:', solve(75));
