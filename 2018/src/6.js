const { manhattanDist } = require('./util/algorithm')
const { createGrid, dedupe } = require('./util/array')
const { getInputLines } = require('./util/input')

const generateGrid = input => {
  const maxY = Math.max(...input.map(i => i[0])) + 2
  const maxX = Math.max(...input.map(i => i[1])) + 2
  const grid = createGrid(maxX, maxY)

  for (let i = 0; i < input.length; i++) {
    const [x, y] = input[i]
    grid[y][x] = i + 1
  }

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (input.some(i => i[1] === x && i[0] === y)) {
        continue
      }

      const distances = input.map(i => manhattanDist(x, y, i[1], i[0]))
      const mins = distances.filter(d => d === Math.min(...distances))

      if (mins.length === 1) {
        grid[x][y] = distances.indexOf(mins[0]) + 1
      } else {
        grid[x][y] = '.'
      }
    }
  }

  return grid
}

const p1 = (points, grid) => {
  const maxX = grid.length
  const maxY = grid[0].length

  const borders = [...grid[0], ...grid[maxX - 1]]
  for (let x = 1; x < grid.length - 1; x++) {
    borders.push(grid[x][0], grid[x][maxY - 1])
  }

  const borderValues = dedupe(borders.filter(b => b !== '.'))
  const interiors = points.map((_, idx) => !borderValues.includes(idx + 1) ? idx + 1 : false)
    .filter(
      Boolean,
    )

  const interiorSizes = interiors
    .map(size =>
      grid
        .map(row => row.filter(item => item === size).length)
        .reduce((a, c) => a + c, 0)
    )

  return Math.max(...interiorSizes)
}

const points = getInputLines().map(l => l.split(', ').map(i => parseInt(i, 10)))
const grid = generateGrid(points)

console.log('P1:', p1(points, grid))
