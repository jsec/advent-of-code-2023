export class Grid<T> {
  public height: number
  public rows: T[][] = []
  public width: number

  constructor(x: number, y: number, value: T) {
    this.rows = Array.from({ length: x }, () => (
      Array.from({ length: y }, () => value)
    ))

    this.height = x
    this.width = y
  }

  count(value: T): number {
    return this.rows
      .map(r => r.filter(i => i === value).length)
      .reduce((a, c) => a + c, 0)
  }

  print(): void {
    for (const row of this.rows) {
      console.log(row.join(''))
    }
  }

  set(x: number, y: number, value: T): void {
    this.rows[x][y] = value
  }

  setRect(w: number, h: number, value: T): void {
    for (let x = 0; x < h; x++) {
      for (let y = 0; y < w; y++) {
        this.set(x, y, value)
      }
    }
  }

  shiftColumn(idx: number, by: number) {
    by = by % this.height
    let temp: T[] = []

    this.rows.forEach((r) => {
      temp.push(r[idx]!)
    })

    temp = temp.slice(-by).concat(temp.slice(0, -by))
    this.rows.forEach((r, i) => {
      r[idx] = temp[i]!
    })
  }

  shiftRow(idx: number, by: number): void {
    by = by % this.width

    this.rows[idx] = this.rows[idx]!.slice(-by).concat(this.rows[idx]!.slice(0, -by))
  }
}
