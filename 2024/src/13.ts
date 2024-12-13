import { getSplitInput } from './utils/input.js';

interface Axis {
  x: number;
  y: number;
}

interface Machine {
  A: Axis;
  B: Axis;
  Prize: Axis;
}

const createMachine = (input: string, p2: boolean): Machine => {
  const transform = input
    .split('\n')
    .map(line => line
      .split(':')[1]!
      .split(', ')
      .map(str => str.includes('+')
        ? Number(str.slice(str.indexOf('+') + 1))
        : Number(str.slice(str.indexOf('=') + 1)),
      ),
    ).map(pair => ({
      x: pair[0]!,
      y: pair[1]!,
    }));

  const prize = transform[2]!;
  if (p2) {
    prize.x += 10_000_000_000_000;
    prize.y += 10_000_000_000_000;
  }

  return {
    A: transform[0]!,
    B: transform[1]!,
    Prize: prize,
  };
};

const solve = (machine: Machine) => {
  const { A, B, Prize } = machine;
  const x = (Prize.x * B.y - Prize.y * B.x) / (A.x * B.y - A.y * B.x);
  const y = (A.x * Prize.y - A.y * Prize.x) / (A.x * B.y - A.y * B.x);

  if (x % 1 === 0 && y % 1 === 0) {
    return x * 3 + y;
  }

  return 0;
};

const run = (p2 = false) => {
  const machines = getSplitInput('\n\n').map(i => createMachine(i, p2));

  return machines
    .map(machine => solve(machine))
    .reduce((a, c) => a + c, 0);
};

console.log('p1:', run());
console.log('p2:', run(true));
