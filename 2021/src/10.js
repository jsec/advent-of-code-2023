const { getInputLines } = require('./util/input')
const { median } = require('./util/array')

const pairs = {
  '(': ')',
  '<': '>',
  '[': ']',
  '{': '}',
}

const p1Scores = {
  ')': 3,
  '>': 25137,
  ']': 57,
  '}': 1197,
}

const p2Scores = {
  ')': 1,
  '>': 4,
  ']': 2,
  '}': 3,
}

const starters = Object.keys(pairs)

const test = (line, p2 = false) => {
  const queue = []
  for (const char of line.split('')) {
    if (starters.includes(char)) {
      queue.push(pairs[char])
    } else {
      const delim = queue.pop()
      if (delim !== char) {
        return p2 ? [] : char
      }
    }
  }

  return p2 ? queue.reverse() : ''
}

const input = getInputLines()

const p1 = input
  .map(line => test(line))
  .filter(c => c.length === 1)
  .map(c => p1Scores[c])
  .reduce((a, c) => a + c, 0)

console.log('P1:', p1)

const p2 = input
  .map(line => test(line, true))
  .filter(c => c.length !== 0)
  .map(q => q.reduce((a, c) => a * 5 + p2Scores[c], 0))

console.log('P2:', median(p2))
