const { getInputLines } = require('./util/input')

const input = getInputLines()

const p1 = input.reduce((a, c) => a + parseInt(c), 0)
console.log('P1:', p1)

let found = false
let acc = 0
let p2 = 0
const seen = []

while (!found) {
  for (const num of input) {
    acc += parseInt(num)
    if (seen.includes(acc)) {
      p2 = acc
      found = true
      break
    }

    seen.push(acc)
  }
}

console.log('P2:', p2)
