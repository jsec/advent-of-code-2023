export class Grid<T> {
  public rows: T[][] = []

  constructor(x: number, y: number, value: T) {
    this.rows = Array.from({ length: x }, () => (
      Array.from({ length: y }, () => value)
    ))
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

  shiftCol(idx: number, by: number) {
    by = by % this.rows.length
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
    by = by % this.rows[0]!.length

    this.rows[idx] = this.rows[idx]!.slice(-by).concat(this.rows[idx]!.slice(0, -by))
  }
}
