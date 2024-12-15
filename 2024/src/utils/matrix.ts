import type { Coordinate } from './types.js';

export class Matrix<TData> {
  private _data: TData[][];
  private _neighborMap = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  constructor(fn: () => TData[][]) {
    this._data = fn();
  }

  at(x: number, y: number) {
    return this._data[x]![y]!;
  }

  find(item: TData): Coordinate {
    for (const [idx, row] of this._data.entries()) {
      if (row.includes(item)) {
        return {
          x: idx,
          y: row.indexOf(item),
        };
      }
    }

    throw new Error('not found');
  }

  findAll(item: TData): Coordinate[] {
    const coordinates: Coordinate[] = [];
    for (const [rowIdx, row] of this._data.entries()) {
      for (const [colIdx, value] of row.entries()) {
        if (value === item) {
          coordinates.push({ x: rowIdx, y: colIdx });
        }
      }
    }

    return coordinates;
  }

  inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this._data.length && y < this._data[0]!.length;
  }

  neighbors(x: number, y: number, includeDiagonals = false): Coordinate[] {
    const neighbors = includeDiagonals ? this._neighborMap : this._neighborMap.slice(4);

    return neighbors
      .map(([nx, ny]) => [x + nx!, y + ny!])
      .filter(([x, y]) => this.inBounds(x!, y!))
      .map(([x, y]) => ({ x: x!, y: y! }));
  }

  print() {
    console.table(this._data);
  }

  set(x: number, y: number, value: TData) {
    this.data[x]![y] = value;
  }

  get data() {
    return this._data;
  }

  get height() {
    return this.data.length;
  }

  get width() {
    return this.data[0]!.length;
  }
}

export const manhattan = (pos1: Coordinate, pos2: Coordinate): number => {
  return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
};
