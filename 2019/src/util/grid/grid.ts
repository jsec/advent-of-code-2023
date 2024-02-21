const inBounds = (grid: unknown[][], x: number, y: number) => x >= 0 && y >= 0 && x < grid.length && y < grid[0]!.length

export const createGrid = <T>(rows: number, cols: number, initial: T) =>
  Array.from({ length: rows }, () => (
    Array.from({ length: cols }, () => initial)
  ))

export class Grid<T> {
  private neighborMap = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]

  private rows: T[][]
  public height: number
  public width: number

  constructor(rows = 1, cols = 1, initial: T) {
    this.rows = createGrid(rows, cols, initial)

    this.height = rows
    this.width = cols
  }

  count(fn: (item: T) => boolean) {
    return this.rows
      .map(row => row.filter(item => fn(item)).length)
      .reduce((a, c) => a + c, 0)
  }

  get(x: number, y: number) {
    return this.rows[x][y]
  }

  neighbors(x: number, y: number, includeDiagonals = true) {
    const neighbors = includeDiagonals ? this.neighborMap : this.neighborMap.slice(4)

    return neighbors
      .map(([nx, ny]) => [x + nx!, y + ny!])
      .filter(([x, y]) => inBounds(this.rows, x!, y!))
  }

  populate(grid: T[][]) {
    this.rows = grid
    this.height = this.rows.length
    this.width = this.rows[0]!.length
    return this
  }

  print() {
    console.table(this.rows)
  }

  search(value: T) {
    const found = []

    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        if (this.rows[x][y] === value) {
          found.push([x, y])
        }
      }
    }

    return found
  }

  serialize() {
    return this.rows.reduce((a, c) => a + c.join(''), '')
  }

  set(x: number, y: number, value: T) {
    this.rows[x][y] = value
  }
}

module.exports = {
  Grid,
  inBounds,
}
