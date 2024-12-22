import { getSplitInput } from './utils/input.js';
import { VM } from './utils/vm.js';

const parseInput = () => {
  const [registersStr, programStr] = getSplitInput('\n\n');

  const [a, b, c] = registersStr!
    .split('\n')
    .map(str => str.split(': ')[1]!)
    .map(Number);

  const program = programStr!
    .split(': ')[1]!
    .split(',')
    .map(Number);

  return {
    a: a!,
    b: b!,
    c: c!,
    program,
  };
};

const p1 = (a: number, b: number, c: number, program: number[]) => {
  const vm = new VM(a, b, c);
  vm.run(program);

  return vm.outputs.join(',');
};

const { a, b, c, program } = parseInput();

console.log('P1:', p1(a, b, c, program));
