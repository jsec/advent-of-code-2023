export class Grid<T> {
  public rows: T[][] = []

  constructor(x: number, y: number, value: T) {
    this.rows = Array.from({ length: x }, () => (
      Array.from({ length: y }, () => value)
    ))
  }

  print(): void {
    console.table(this.rows)
  }

  set(x: number, y: number, value: T): void {
    this.rows[x][y] = value
  }
}
