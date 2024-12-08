import type { Coordinate } from './utils/types.js';

import { getInputMatrix } from './utils/input.js';
import { inLine } from './utils/math.js';
import { manhattan } from './utils/matrix.js';

interface Antenna extends Coordinate {
  distances: number[][];
}

const calculateDistances = (coordinate: Coordinate, matrix: string[][]) => {
  return matrix.map((row, rowIdx) => row.map((_, colIdx) => manhattan(coordinate, { x: rowIdx, y: colIdx })));
};

const parseInput = () => {
  const matrix = getInputMatrix();
  const antennas: Record<string, Antenna[]> = {};

  for (const [rowIdx, row] of matrix.entries()) {
    for (const [colIdx, value] of row.entries()) {
      if (value === '.') {
        continue;
      }

      if (!antennas[value]) {
        antennas[value] = [];
      }

      const coordinate = { x: rowIdx, y: colIdx };

      antennas[value].push({
        ...coordinate,
        distances: calculateDistances(coordinate, matrix),
      });
    }
  }

  return antennas;
};

const findAntinodes = (antennas: Antenna[], p1 = true) => {
  const antinodes: number[][] = [];

  for (let i = 0; i < antennas.length; i++) {
    const { distances, x, y } = antennas[i]!;
    const others = antennas.filter((_, idx) => idx !== i);

    for (const other of others) {
      for (const [rowIdx, row] of distances.entries()) {
        for (const [colIdx, distance] of row.entries()) {
          if (inLine(
            { x, y },
            { x: other.x, y: other.y },
            { x: rowIdx, y: colIdx },
          )) {
            const otherDistance = other.distances[rowIdx]![colIdx]!;
            if (p1 && distance !== otherDistance * 2) {
              continue;
            }

            antinodes.push([rowIdx, colIdx]);
          }
        }
      }
    }
  }

  return antinodes;
};

const solve = (p1 = true) => {
  const antennas = parseInput();
  const antinodes = Object.keys(antennas)
    .flatMap(key => findAntinodes(antennas[key]!, p1))
    .map(node => `${node[0]}-${node[1]}`);

  return new Set(antinodes).size;
};

console.log('P1:', solve());
console.log('P2:', solve(false));
