const { getInputLines } = require('./util/input')

const input = getInputLines().map(l => l.split('').map(n => parseInt(n)))
const xLength = input.length
const yLength = input[0].length

const checkNeighbors = (input, x, y) => {
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  const point = input[x][y]

  const neighbors = dirs.map(d => {
    const dx = d[0] + x
    const dy = d[1] + y

    if (dx < 0 || dx >= input.length || dy < 0 || dy >= input[0].length) {
      return true
    }

    return point < input[dx][dy]
  })

  return neighbors.every(n => n === true)
}

let p1 = 0
for (let x = 0; x < xLength; x++) {
  for (let y = 0; y < yLength; y++) {
    const point = input[x][y]

    if (checkNeighbors(input, x, y)) {
      p1 += point + 1
    }
  }
}

console.log('P1:', p1)
