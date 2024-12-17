import type { Coordinate } from './utils/types.js';

import { getSplitInput } from './utils/input.js';
import { Matrix } from './utils/matrix.js';
import { StringSet } from './utils/string-set.js';

const moveMap: Record<string, Coordinate> = {
  '<': { x: 0, y: -1 },
  '>': { x: 0, y: 1 },
  '^': { x: -1, y: 0 },
  'v': { x: 1, y: 0 },
};

const p1 = () => {
  const [grid, moveList] = getSplitInput('\n\n');
  const matrix = new Matrix(() => grid!.split('\n').map(line => [...line]));
  const steps = [...moveList!.split('\n').join('')];

  function pushBox(position: Coordinate, step: Coordinate) {
    const next = { x: position.x + step.x, y: position.y + step.y };
    const nextValue = matrix.at(next.x, next.y);

    if (nextValue === '.') {
      const tmp = matrix.at(position.x, position.y);
      matrix.set(position.x, position.y, matrix.at(next.x, next.y));
      matrix.set(next.x, next.y, tmp);
      return true;
    } else if (nextValue === '#') {
      return false;
    } else {
      if (pushBox(next, step)) {
        const tmp = matrix.at(position.x, position.y);
        matrix.set(position.x, position.y, matrix.at(next.x, next.y));
        matrix.set(next.x, next.y, tmp);
        return true;
      }
    }
  }

  let robot = matrix.find('@');
  matrix.set(robot.x, robot.y, '.');

  for (const step of steps) {
    const delta = moveMap[step]!;
    const next = { x: robot.x + delta.x, y: robot.y + delta.y };
    const nextValue = matrix.at(next.x, next.y);

    if (nextValue !== '#') {
      if (nextValue === '.') {
        robot = next;
      }

      if (nextValue === 'O' && pushBox(next, delta)) {
        robot = next;
      }
    }
  }

  return matrix.findAll('O').map(({ x, y }) => 100 * x + y).reduce((a, c) => a + c);
};

const p2 = () => {
  const [grid, moveList] = getSplitInput('\n\n');

  let robot = { x: 0, y: 0 };
  const walls = new StringSet<Coordinate>(c => `${c.x}-${c.y}`);
  const boxes: Coordinate[] = [];
  const steps = [...moveList!.split('\n').join('')];

  for (let x = 0; x < grid!.length; x++) {
    for (let y = 0; y < grid![0]!.length; y++) {
      if (grid![x]![y] === '@') {
        robot = { x: x * 2, y };
      }

      if (grid![x]![y] === '#') {
        walls.add({ x: x * 2, y });
        walls.add({ x: x * 2 + 1, y });
      }

      if (grid![x]![y] === 'O') {
        boxes.push({ x: x * 2, y });
      }
    }
  }

  const pushBox = (box: Coordinate, direction: Coordinate, moves: { box: Coordinate; direction: Coordinate }[]) => {
    const next = [
      { x: box.x + direction.x, y: box.y + direction.y },
      { x: box.x + direction.x + 1, y: box.y + direction.y },
    ];

    for (const pos of next) {
      if (walls.has(pos)) {
        return false;
      }
    }

    const collisions = boxes.filter((b) => {
      for (const pos of next) {
        if (box.x === b.x && box.y === b.y) {
          return false;
        }

        if ((b.x === pos.x || b.x + 1 === pos.x) && b.y === pos.y) {
          return true;
        }
      }
    });

    if (collisions.length === 0) {
      return true;
    }

    let conflicts = false;
    for (const c of collisions) {
      if (pushBox(c, direction, moves) && !moves.map(m => m.box).some(b => b.x === c.x && b.y === c.y)) {
        moves.push({ box: c, direction });
      } else {
        conflicts = true;
        break;
      }
    }

    return conflicts;
  };

  for (const step of steps) {
    const direction = moveMap[step];
    const position = {
      x: robot.x + direction!.x,
      y: robot.y + direction!.y,
    };

    if (!walls.has(position)) {
      const collision = boxes.find(b => (b.x === position.x || b.x + 1 === position.x) && b.y === position.y);

      if (collision) {
        const moves: { box: Coordinate; direction: Coordinate }[] = [];
        if (pushBox(collision, direction!, moves)) {
          for (const move of moves) {
            move.box.x += move.direction.x;
            move.box.y += move.direction.y;
          }

          collision.x += direction!.x;
          collision.y += direction!.y;
          robot = position;
        }
      } else {
        robot = position;
      }
    }
  }

  return boxes.map(({ x, y }) => 100 * x + y).reduce((a, c) => a + c);
};

console.log('P1:', p1());
console.log('P2:', p2());
