import BigNumber from 'bignumber.js';
import { ceil, floor, isInteger, lsolve, lusolve, usolve } from 'mathjs';

import { getInput, getSplitInput } from './utils/input.js';

interface Axis {
  x: number;
  y: number;
}

interface Machine {
  A: Axis;
  B: Axis;
  Prize: Axis;
}

const createMachine = (input: string): Machine => {
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

  return {
    A: transform[0]!,
    B: transform[1]!,
    Prize: transform[2]!,
  };
};

const solve = (machine: Machine) => {
  const coefficients = [
    [machine.A.x, machine.B.x],
    [machine.A.y, machine.B.y],
  ];

  const constants = [machine.Prize.x, machine.Prize.y];

  const solutions = lusolve(coefficients, constants)
    .map((solution) => {
      const str = solution.toString();
      // floating point hackery
      if (str.includes('.99999')) {
        return ceil(solution);
      }
      if (str.includes('.00000')) {
        return floor(solution);
      }

      return solution;
    });

  return {
    A: solutions[0][0]!,
    B: solutions[1][0]!,
  };
};

const p1 = getSplitInput('\n\n')
  .map(raw => solve(createMachine(raw)))
  .filter((solution) => {
    return solution.A <= 100
      && solution.B <= 100
      && isInteger(solution.A)
      && isInteger(solution.B);
  })
  .map(solution => 3 * solution.A + solution.B)
  .reduce((a, c) => a + c, 0);

console.log('P1:', p1);
