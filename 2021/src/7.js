const { getInput } = require('./util/input')

const input = getInput().trim().split(',').map(i => parseInt(i))
const max = Math.max(...input)

const p1 = Math.min(
  ...Array.from(Array(max).keys()).map(k => {
    return input.map(i => Math.abs(i - k)).reduce((acc, curr) => acc + curr, 0)
  }),
)

console.log('P1:', p1)
