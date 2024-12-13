import { getInputMatrix } from './utils/input.js';
import { Matrix } from './utils/matrix.js';
import { StringSet } from './utils/string-set.js';
import { type Coordinate } from './utils/types.js';

interface Region {
  area: number;
  corners: number;
  perimeter: number;
}

type RegionCoordinate = { edges: number } & Coordinate;

const hashFn = (coordinate: Coordinate) => `${coordinate.x}-${coordinate.y}`;

const getRegions = (matrix: Matrix<string>) => {
  const regions: Region[] = [];
  const borders: Coordinate[] = [{ x: 0, y: 0 }];
  const visited = new StringSet<Coordinate>(hashFn);

  while (borders.length > 0) {
    const start = borders.shift()!;

    if (visited.has(start)) {
      continue;
    }

    let area = 0;
    let perimeter = 0;
    const coordinates = new Map<string, RegionCoordinate>();

    const included = [start];
    const regionValue = matrix.at(start.x, start.y);

    while (included.length > 0) {
      const current = included.shift()!;

      if (visited.has(current)) {
        continue;
      }

      const neighbors = matrix.neighbors(current.x, current.y);
      let neighborsInRegion = 0;
      for (const neighbor of neighbors) {
        if (matrix.at(neighbor.x, neighbor.y) === regionValue) {
          neighborsInRegion++;
          included.push(neighbor);
        } else {
          borders.push(neighbor);
        }
      }

      const edges = 4 - neighborsInRegion;
      perimeter += edges;
      area += 1;

      coordinates.set(hashFn(current), {
        edges,
        x: current.x,
        y: current.y,
      });

      visited.add(current);
    }

    let corners = 0;
    const coordArr = [...coordinates.values()];

    for (const coord of coordArr) {
      const up = { x: coord.x - 1, y: coord.y };
      const down = { x: coord.x + 1, y: coord.y };
      const left = { x: coord.x, y: coord.y - 1 };
      const right = { x: coord.x, y: coord.y + 1 };
      const upperRight = { x: coord.x - 1, y: coord.y + 1 };
      const lowerRight = { x: coord.x + 1, y: coord.y + 1 };
      const upperLeft = { x: coord.x - 1, y: coord.y - 1 };
      const lowerLeft = { x: coord.x + 1, y: coord.y - 1 };

      const includeUp = coordinates.has(hashFn(up));
      const includeDown = coordinates.has(hashFn(down));
      const includeLeft = coordinates.has(hashFn(left));
      const includeRight = coordinates.has(hashFn(right));
      const includeUpperRight = coordinates.has(hashFn(upperRight));
      const includeLowerRight = coordinates.has(hashFn(lowerRight));
      const includeUpperLeft = coordinates.has(hashFn(upperLeft));
      const includeLowerLeft = coordinates.has(hashFn(lowerLeft));
      const upperRightInBounds = matrix.inBounds(upperRight.x, upperRight.y);
      const lowerRightInBounds = matrix.inBounds(lowerRight.x, lowerRight.y);
      const upperLeftInBounds = matrix.inBounds(upperLeft.x, upperLeft.y);
      const lowerLeftInBounds = matrix.inBounds(lowerLeft.x, lowerLeft.y);

      switch (coord.edges) {
        case 0: {
          if (!includeUpperRight && upperRightInBounds) {
            corners += 1;
          }
          if (!includeLowerRight && lowerRightInBounds) {
            corners += 1;
          }
          if (!includeUpperLeft && upperLeftInBounds) {
            corners += 1;
          }
          if (!includeLowerLeft && lowerLeftInBounds) {
            corners += 1;
          }
          break;
        }
        case 1: {
          if (includeLeft && includeDown && includeRight) {
            if (!includeLowerRight && lowerRightInBounds) {
              corners += 1;
            }
            if (!includeLowerLeft && lowerLeftInBounds) {
              corners += 1;
            }
          } else if (includeLeft && includeUp && includeDown) {
            if (!includeUpperLeft && upperLeftInBounds) {
              corners += 1;
            }
            if (!includeLowerLeft && lowerLeftInBounds) {
              corners += 1;
            }
          } else if (includeLeft && includeRight && includeUp) {
            if (!includeUpperRight && upperRightInBounds) {
              corners += 1;
            }
            if (!includeUpperLeft && upperLeftInBounds) {
              corners += 1;
            }
          } else if (includeUp && includeRight && includeDown) {
            if (!includeLowerRight && lowerRightInBounds) {
              corners += 1;
            }
            if (!includeUpperRight && upperRightInBounds) {
              corners += 1;
            }
          }
          break;
        }
        case 2: {
          if (includeUp && includeRight) {
            corners += includeUpperRight ? 1 : 2;
          } else if (includeDown && includeRight) {
            corners += includeLowerRight ? 1 : 2;
          } else if (includeDown && includeLeft) {
            corners += includeLowerLeft ? 1 : 2;
          } else if (includeUp && includeLeft) {
            corners += includeUpperLeft ? 1 : 2;
          }
          break;
        }
        case 3: {
          corners += 2;
          break;
        }
        case 4: {
          corners += 4;
          break;
        }
      }
    }

    regions.push({ area, corners, perimeter });
  }

  return regions;
};

const solve = () => {
  const matrix = new Matrix(getInputMatrix);
  const regions = getRegions(matrix);

  const p1 = regions.reduce((acc, region) => acc + region.area * region.perimeter, 0);
  const p2 = regions.reduce((acc, region) => acc + region.area * region.corners, 0);

  return { p1, p2 };
};

const { p1, p2 } = solve();
console.log('P1:', p1);
console.log('P2:', p2);
