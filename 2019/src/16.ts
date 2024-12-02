import { zip } from './util/array';
import { getInput } from './util/input';

const basePattern = [0, 1, 0, -1];

const getPattern = (index: number, length: number) => {
  let pattern = [];

  while (pattern.length < length) {
    const repeat = basePattern.map(p => Array.from({ length: index }, () => p)).flat(Number.POSITIVE_INFINITY);
    pattern = pattern.concat(repeat);
  }

  const first = pattern.shift();
  pattern.push(first);

  return pattern.slice(0, length);
};

const phase = (input: number[]): number[] => {
  const output: number[] = [];

  for (let index = 1; index <= input.length; index++) {
    const pattern = getPattern(index, input.length);

    const pairs = zip([input, pattern]);

    const result = pairs
      .map(([a, b]) => a * b)
      .reduce((a, c) => a + c, 0);

    output.push(Math.abs(result) % 10);
  }

  return output;
};

const p1 = (): string => {
  let input = getInput().split('')
    .map(Number);

  for (let index = 0; index < 100; index++) {
    input = phase(input);
  }

  return input.slice(0, 8).join('');
};

const p2 = (): string => {
  let input = getInput().repeat(10_000)
    .split('')
    .map(Number);
  const offset = Number(input.slice(0, 7).join(''));
  input = input.slice(offset);

  for (let index = 0; index < 100; index++) {
    for (let index = input.length - 1; index >= 0; index--) {
      input[index] = ((input[index + 1] || 0) + input[index]!) % 10;
    }
  }

  return input.slice(0, 8).join('');
};

console.log('P1:', p1());
console.log('P2:', p2());
