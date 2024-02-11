const { itemCount } = require('./util/array')
const { Grid } = require('./util/grid')
const { getInputLines } = require('./util/input')

const calculateNext = (value, neighbors) => {
  switch (value) {
    case '.':
      return itemCount(neighbors, '|') >= 3 ? '|' : value
    case '|':
      return itemCount(neighbors, '#') >= 3 ? '#' : value
    case '#':
      // eslint-disable-next-line no-case-declarations
      const isLumberyard = itemCount(neighbors, '#') >= 1 && itemCount(neighbors, '|') >= 1
      return isLumberyard ? '#' : '.'
  }
}

const cycleLength = input => {
  const grid = new Grid().populate(input)
  const seen = new Map()

  for (let i = 0; i < Infinity; i++) {
    grid.rows = cycle(grid)
    const hash = grid.serialize()

    if (seen.has(hash)) {
      return [seen.get(hash), i]
    }

    seen.set(hash, i)
  }
}

const cycle = grid => {
  return grid.rows.map((row, rowIdx) =>
    row.map((col, colIdx) => {
      const neighbors = grid
        .neighbors(rowIdx, colIdx)
        .map(([x, y]) => grid.rows[x][y])

      return calculateNext(col, neighbors)
    })
  )
}

const run = (grid, cycles) => {
  for (let i = 0; i < cycles; i++) {
    grid.rows = cycle(grid)
  }

  return grid
}

const p1 = input => {
  const grid = new Grid().populate(input)
  const result = run(grid, 10)

  return result.count('#') * result.count('|')
}

const p2 = input => {
  const grid = new Grid().populate(input)

  const [from, to] = cycleLength(input)
  const period = to - from

  const rem = (1000000000 - from) % period
  const result = run(grid, from + rem)

  return result.count('#') * result.count('|')
}

const input = getInputLines().map(line => line.split(''))

console.log('P1:', p1(input))
console.log('P2:', p2(input))
