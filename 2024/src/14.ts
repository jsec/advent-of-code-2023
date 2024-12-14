import readline from 'readline-sync';

import type { Coordinate } from './utils/types.js';

import { createArray, print2d } from './utils/array.js';
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

const runner = () => {
  let count = 0;

  function getSafetyRating(robots: Robot[], rows: number, columns: number, seconds = 1) {
    count += 1;

    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    const midX = Math.floor(rows / 2);
    const midY = Math.floor(columns / 2);

    for (const robot of robots) {
      robot.pos.x = getNextPosition(robot.pos.x, robot.dx, seconds, rows);
      robot.pos.y = getNextPosition(robot.pos.y, robot.dy, seconds, columns);

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

    const safetyRating = q1 * q2 * q3 * q4;
    return { count, safetyRating };
  };

  return getSafetyRating;
};

const getNextPosition = (position: number, delta: number, multiplier: number, length: number) => {
  const newPosition = position + (delta * multiplier);
  return newPosition > 0 ? newPosition % length : (length - (Math.abs(newPosition) % length)) % length;
};

/// PART 1 ///
const p1 = (robots: Robot[], rows: number, columns: number) => {
  const getSafetyRating = runner();
  const { safetyRating } = getSafetyRating(robots, rows, columns, 100);

  return safetyRating;
};

/// PART 2 ///
const p2 = (robots: Robot[], rows: number, columns: number) => {
  let minSafetyRating = Infinity;

  const getSafetyRating = runner();

  while (true) {
    const grid = createArray(rows, columns, '.');
    const { count, safetyRating } = getSafetyRating(robots, rows, columns);

    if (safetyRating <= minSafetyRating) {
      minSafetyRating = safetyRating;
      for (const robot of robots) {
        grid[robot.pos.x]![robot.pos.y] = 'X';
      }

      print2d(grid);

      if (readline.keyInYN('Easter egg?')) {
        return count + 100;
      }
    }
  }
};

const robots = getRobots(getInputLines());

console.log('P1:', p1(robots, 103, 101));
console.log('P2:', p2(robots, 103, 101));
