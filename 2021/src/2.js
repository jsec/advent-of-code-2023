const { getInputLines } = require('./util/input')

const input = getInputLines().map(l => l.split(' '))

const solve = (input, p2 = false) => {
  let horizontal = 0
  let depth = 0
  let aim = 0

  for (const step of input) {
    const direction = step[0]
    const length = parseInt(step[1])

    switch (direction) {
      case 'forward':
        horizontal += length
        if (p2) {
          depth += aim * length
        }
        break
      case 'up':
        if (p2) {
          aim -= length
        } else {
          depth -= length
        }
        break
      case 'down':
        if (p2) {
          aim += length
        } else {
          depth += length
        }
        break
      default:
        break
    }
  }

  return horizontal * depth
}

console.log('P1:', solve(input))
console.log('P2:', solve(input, true))
