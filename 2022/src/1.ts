import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf8')
  .split('\n\n')
  .map(group => group.trim().split('\n')
    .map(line => parseInt(line.trim())))
  .map(elf => elf.reduce((acc, curr) => acc + curr, 0))
  .sort((a, b) => b - a)

console.log('P1:', Math.max(...input))
console.log('P2:', input[0] + input[1] + input[2])
