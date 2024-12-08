import type { Coordinate } from './types.js';

export const sum = (arr: number[]) => arr.reduce((a, c) => a + c, 0);

export const slope = (c1: Coordinate, c2: Coordinate) => {
  return (c2.x - c1.x) / (c2.y - c1.y);
};

export const inLine = (c1: Coordinate, c2: Coordinate, c3: Coordinate) => {
  return slope(c1, c2) === slope(c2, c3);
};
