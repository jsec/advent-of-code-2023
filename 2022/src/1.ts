import { getSplitInput } from './util/input'

const elves = getSplitInput('\n\n')
  .map(group => group.trim().split('\n')
    .map(line => parseInt(line.trim())))
  .map(elf => elf.reduce((acc, curr) => acc + curr, 0))
  .sort((a, b) => b - a)

console.log('P1:', Math.max(...elves))
console.log('P2:', elves[0] + elves[1] + elves[2])
