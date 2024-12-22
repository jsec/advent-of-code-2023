import { getSplitInput } from './utils/input.js';
import { VM } from './utils/vm.js';

const parseInput = () => {
  const [registersStr, programStr] = getSplitInput('\n\n');

  const [a, b, c] = registersStr!
    .split('\n')
    .map(str => str.split(': ')[1]!)
    .map(BigInt);

  const program = programStr!
    .split(': ')[1]!
    .split(',')
    .map(BigInt);

  return {
    a: a!,
    b: b!,
    c: c!,
    program,
  };
};

const p1 = (a: bigint, b: bigint, c: bigint, program: bigint[]) => {
  const vm = new VM(a, b, c);
  vm.run(program);

  return vm.outputs.join(',');
};

const p2 = (a: bigint, b: bigint, c: bigint, program: bigint[]) => {
  const findA = (value: bigint, current: number): bigint => {
    if (current < 0) {
      return value;
    }

    for (let i = value << 3n; i < (value << 3n) + 8n; i++) {
      const vm = new VM(i, b, c);
      vm.run(program);

      if (vm.outputs[0] === program[current]) {
        const endValue = findA(i, current - 1);
        if (endValue !== -1n) {
          return endValue;
        }
      }
    }
    return -1n;
  };

  return findA(0n, program.length - 1);
};

const { a, b, c, program } = parseInput();

console.log('P1:', p1(a, b, c, program));
console.log('P2:', p2(a, b, c, program));
