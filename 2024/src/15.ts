import type { Coordinate } from './utils/types.js';

import { getSplitInput } from './utils/input.js';
import { Matrix } from './utils/matrix.js';

const moveMap: Record<string, Coordinate> = {
  '<': { x: 0, y: -1 },
  '>': { x: 0, y: 1 },
  '^': { x: -1, y: 0 },
  'v': { x: 1, y: 0 },
};

const p1 = (matrix: Matrix<string>, steps: string[]) => {
  const robot = matrix.find('@');
  let moveGroup = [robot];

  for (const step of steps) {
    const { x: dx, y: dy } = moveMap[step]!;
    const nx = robot.x + dx;
    const ny = robot.y + dy;
    const next = matrix.at(nx, ny);

    if (next === '.') {
      matrix.set(robot.x, robot.y, '.');
      robot.x = nx;
      robot.y = ny;
      matrix.set(robot.x, robot.y, '@');
    }

    if (next === 'O') {
      moveGroup.push({ x: nx, y: ny });
      let gx = nx + dx;
      let gy = ny + dy;

      while (matrix.at(gx, gy) === 'O') {
        moveGroup.push({ x: gx, y: gy });
        gx += dx;
        gy += dy;
      }

      // Only need to shift if there is a space between a wall and the boxes being moved
      if (matrix.at(gx, gy) === '.') {
        let ax, ay;
        for (let i = moveGroup.length - 1; i >= 0; i--) {
          ax = moveGroup[i]!.x;
          ay = moveGroup[i]!.y;
          matrix.set(gx, gy, matrix.at(ax, ay));
          gx = ax;
          gy = ay;
        }

        matrix.set(robot.x, robot.y, '.');
        robot.x = nx;
        robot.y = ny;
      }

      moveGroup = [robot];
    }
  }

  return matrix.findAll('O').reduce((sum, box) => sum + (box.x * 100 + box.y), 0);
};

const [grid, moveList] = getSplitInput('\n\n');
const matrix = new Matrix(() => grid!.split('\n').map(line => [...line]));
const steps = [...moveList!.split('\n').join('')];

console.log('P1:', p1(matrix, steps));
