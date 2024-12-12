export const sortArray = (arr: number[], asc = true) => {
  if (asc) {
    return [...arr].sort((a, b) => a - b);
  }

  return [...arr].sort((a, b) => b - a);
};

export const areEqualArrays = <T>(first: T[], second: T[]) => Array.isArray(first)
  && Array.isArray(second)
  && first.length === second.length
  && first.every((value, idx) => value === second[idx]);

export const transpose = <T>(matrix: T[][]) => {
  return matrix[0]!.map((_, i) => matrix.map(row => row[i]!));
};

export const moveItem = <T>(arr: T[], from: number, to: number): T[] => {
  if (to === from) {
    return arr;
  }
  const target = arr[from]!;
  const increment = to < from ? -1 : 1;

  for (let k = from; k !== to; k += increment) {
    arr[k] = arr[k + increment]!;
  }
  arr[to] = target;
  return arr;
};

export const zip = <T, K>(a: T[], b: K[]): [T, K][] => a.map((k, i) => [k, b[i]!]);
