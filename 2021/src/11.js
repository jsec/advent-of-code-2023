const { Grid } = require('./util/grid')
const { getInputLines } = require('./util/input')

const step = (grid, x, y) => {
  grid.set(x, y, grid.get(x, y) + 1)

  if (grid.get(x, y) === 10) {
    for (const [nx, ny] of grid.neighbors(x, y)) {
      step(grid, nx, ny)
    }
  }
}

const run = (grid, cycles, p2 = false) => {
  let count = 0
  let i = 0

  while (i < cycles) {
    for (let x = 0; x < grid.height; x++) {
      for (let y = 0; y < grid.width; y++) {
        step(grid, x, y)
      }
    }

    grid.rows = grid.rows.map(row => row.map(col => col > 9 ? 0 : col))
    const flashCount = grid.count(item => item === 0)

    if (p2 && flashCount === grid.height * grid.width) {
      return i + 101
    }

    count += flashCount
    i++
  }

  return count
}

const input = getInputLines()
  .map(line =>
    line
      .split('')
      .map(c => parseInt(c))
  )

const grid = new Grid().populate(input)

const p1 = run(grid, 100)
console.log('P1:', p1)

const p2 = run(grid, Infinity, true)
console.log('P2:', p2)
