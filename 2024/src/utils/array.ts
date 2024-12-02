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
