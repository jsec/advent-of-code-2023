export class StringSet<T> {
  private _hash: (value: T) => string;
  private _set: Set<string>;

  constructor(hashFn: (value: T) => string) {
    this._set = new Set<string>();
    this._hash = hashFn;
  }

  add(value: T) {
    this._set.add(this._hash(value));
  }

  clear() {
    return this._set.clear();
  }

  delete(value: T) {
    const hash = this._hash(value);
    if (!this._set.has(hash)) {
      return false;
    }

    this._set.delete(hash);
    return true;
  }

  has(value: T) {
    return this._set.has(this._hash(value));
  }

  hash(value: T) {
    return this._hash(value);
  }
}
