export class Matrix<TData> {
  private _data: TData[][];

  constructor(fn: () => TData[][]) {
    this._data = fn();
  }

  at(y: number, x: number) {
    return this.data[y]![x];
  }

  find(item: TData) {
    for (const [idx, row] of this._data.entries()) {
      if (row.includes(item)) {
        return [idx, row.indexOf(item)];
      }
    }

    throw new Error('not found');
  }

  print() {
    console.table(this._data);
  }

  set(y: number, x: number, value: TData) {
    this.data[y]![x] = value;
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
