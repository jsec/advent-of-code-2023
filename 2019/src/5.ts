import { Computer } from './intcode/computer';
import { getSplitInput } from './util/input';

const run = (program: number[], input: number): number => {
  const outputs: number[] = [];

  new Computer()
    .load(program)
    .withInput(input)
    .withOutput((value) => {
      outputs.push(value);
    })
    .run();

  return outputs.at(-1)!;
};

const program = getSplitInput(',').map(index => Number.parseInt(index));

console.log('P1:', run([ ...program ], 1));
console.log('P2:', run([ ...program ], 5));
