import type { Coordinate } from './utils/types.js';

import { getInputMatrix } from './utils/input.js';
import { inLine } from './utils/math.js';
import { manhattan } from './utils/matrix.js';

interface Antenna extends Coordinate {
  distances: number[][];
}

const calculateDistances = (coordinate: Coordinate, matrix: string[][]) => {
  const distances: number[][] = [];

  for (let x = 0; x < matrix.length; x++) {
    const row = [];

    for (let y = 0; y < matrix[0]!.length; y++) {
      row.push(manhattan(coordinate, { x, y }));
    }

    distances.push(row);
  }

  return distances;
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

const findAntinodes = (antennas: Antenna[]) => {
  const antinodes: number[][] = [];

  for (let i = 0; i < antennas.length; i++) {
    const { distances, x, y } = antennas[i]!;
    const others = antennas.filter((_, idx) => idx !== i);

    for (const other of others) {
      for (const [rowIdx, row] of distances.entries()) {
        for (const [colIdx, distance] of row.entries()) {
          const otherDistance = other.distances[rowIdx]![colIdx]!;

          if (inLine(
            { x, y },
            { x: other.x, y: other.y },
            { x: rowIdx, y: colIdx },
          ) && distance == otherDistance * 2) {
            antinodes.push([rowIdx, colIdx]);
          }
        }
      }
    }
  }

  return antinodes;
};

const p1 = () => {
  const antennas = parseInput();
  const antinodes = Object.keys(antennas)
    .flatMap(key => findAntinodes(antennas[key]!))
    .map(node => `${node[0]}-${node[1]}`);

  return new Set(antinodes).size;
};

console.log('P1:', p1());
