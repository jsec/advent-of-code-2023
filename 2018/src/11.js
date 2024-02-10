const { createGrid } = require('./util/array')

const getGrid = serialNumber => {
  return createGrid(300, 300)
    .map((row, rowIdx) =>
      row.map((_, columnIdx) => calculatePower(columnIdx + 1, rowIdx + 1, serialNumber))
    )
}

const calculatePower = (x, y, serialNumber) => {
  const rackId = y + 10
  let power = (x * rackId + serialNumber) * rackId
  power = power >= 100 ? parseInt(power.toString().split('').reverse()[2]) : 0
  return power - 5
}

const getSubgridPower = (grid, row, col, size = 3) => {
  let sum = 0

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      sum += grid[x + row][y + col]
    }
  }

  return sum
}

const run = (grid, size) => {
  let ans = [0, 0]
  let max = 0
  for (let x = 0; x < grid.length - (size - 1); x++) {
    for (let y = 0; y < grid[1].length - (size - 1); y++) {
      const power = getSubgridPower(grid, x, y, size)
      if (power > max) {
        max = power
        ans = [x, y]
      }
    }
  }

  return {
    ans,
    power: max,
  }
}

const p2 = grid => {
  let ans = [0, 0, 0]
  let max = 0
  for (let size = 1; size <= 300; size++) {
    const result = run(grid, size)
    if (result.power > max) {
      max = result.power
      ans = [...result.ans, size]
    }
  }

  return ans
}

const grid = getGrid(1718)
const p1 = run(grid, 3)

console.log('P1:', p1.ans)
console.log('P2:', p2(grid))
