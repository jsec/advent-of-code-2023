const { getInput } = require('./util/input')

/*
 * P1 is just a straight difference between the initial position and
 * the candidate alignment position
 */
const p1 = (arr, k) => arr.map(a => Math.abs(a - k)).reduce((a, c) => a + c, 0)

/*
 * P2 is the nth triangular number where n is the difference between the
 * initial position and the candidate alignment position
 */
const p2 = (arr, k) =>
  arr.map(a => {
    const diff = Math.abs(a - k)
    return (diff * (diff + 1)) / 2
  }).reduce((a, c) => a + c, 0)

const run = (input, mapFn) => {
  return Math.min(...Array.from(Array(max).keys()).map(k => mapFn(input, k)))
}

const input = getInput().trim().split(',').map(i => parseInt(i))
const max = Math.max(...input)

console.log('P1:', run(input, p1))
console.log('P2:', run(input, p2))
