import { chunk, permutations, zip } from './util/array'
import { getInputLines } from './util/input'

const isValid = (arr: number[]): boolean => permutations(arr).every(a => a[0]! + a[1]! > a[2]!)

const input = getInputLines()
  .map(l => l
    .split(' ')
    .filter(x => x !== '')
    .map(n => parseInt(n)))

const p1 = input
  .filter(isValid)
  .length

const p2 = zip(...input)
  .map(i => chunk(i, 3)
    .filter(isValid)
    .length
  ).reduce((a, c) => a + c, 0)

console.log('P1:', p1)
console.log('P2:', p2)
