const { getInputLines } = require('./util/input')

const input = getInputLines().map(l => l.split(' | ').map(m => m.trim().split(' ')))

const p1 = input.map(i => i[1].filter(x => [2, 3, 4, 7].includes(x.length)).length).reduce(
  (a, c) => a + c,
  0,
)

console.log('P1:', p1)
