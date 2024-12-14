import type { Coordinate } from './utils/types.js';

import { getInputLines } from './utils/input.js';

interface Robot {
  dx: number;
  dy: number;
  pos: Coordinate;
}

const getRobots = (input: string[]): Robot[] => {
  return input
    .map(line => line
      .split(' ')
      .map(el => el
        .split('=')[1]!
        .split(',')
        .map(Number)))
    .map((line) => {
      return {
        dx: line[1]![1]!,
        dy: line[1]![0]!,
        pos: {
          x: line[0]![1]!,
          y: line[0]![0]!,
        },
      };
    });
};

const solve = (robots: Robot[], rows: number, columns: number) => {
  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  const midX = Math.floor(rows / 2);
  const midY = Math.floor(columns / 2);

  for (const robot of robots) {
    const nx = robot.pos.x + (robot.dx * 100);
    const ny = robot.pos.y + (robot.dy * 100);

    robot.pos.x = (nx % rows + rows) % rows;
    robot.pos.y = (ny % columns + columns) % columns;

    if (robot.pos.x < midX && robot.pos.y < midY) {
      q1 += 1;
    }

    if (robot.pos.x < midX && robot.pos.y > midY) {
      q2 += 1;
    }

    if (robot.pos.x > midX && robot.pos.y < midY) {
      q3 += 1;
    }

    if (robot.pos.x > midX && robot.pos.y > midY) {
      q4 += 1;
    }
  }

  return q1 * q2 * q3 * q4;
};

const robots = getRobots(getInputLines());

const p1 = solve(robots, 103, 101);
console.log('P1:', p1);
