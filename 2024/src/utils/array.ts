export const sortArray = (arr: number[], asc = true) => {
  if (asc) {
    return arr.sort((a, b) => a - b);
  }

  return arr.sort((a, b) => b - a);
};
