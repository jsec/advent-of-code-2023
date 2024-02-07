const inBounds = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length

module.exports = {
  inBounds,
}
