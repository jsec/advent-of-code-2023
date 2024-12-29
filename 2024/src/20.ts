import Queue from 'yocto-queue';

import type { Coordinate } from './utils/types.js';

import { getInputMatrix } from './utils/input.js';
import { manhattan, Matrix } from './utils/matrix.js';
import { StringSet } from './utils/string-set.js';

type Node = { distance: number } & Coordinate;

const parseTrack = () => {
  const matrix = new Matrix(() => getInputMatrix());

  const startCoordinates = matrix.find('S');
  const start: Node = { ...startCoordinates, distance: 0 };
  const end = matrix.find('E');
  const track: Node[] = [];

  const queue = new Queue<Node>();
  const visited = new StringSet<Coordinate>(c => `${c.x}-${c.y}`);

  queue.enqueue(start);

  while (queue.size > 0) {
    const node = queue.dequeue()!;

    visited.add(node);
    track.push(node);

    if (matrix.equals(node, end)) {
      return track;
    }

    const neighbors = matrix.neighbors(node.x, node.y).filter(n => matrix.at(n.x, n.y) !== '#');

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      queue.enqueue({ ...neighbor, distance: node.distance + 1 });
    }
  }

  return track;
};

const findCheats = (track: Node[], duration: number, p2 = false) => {
  let result = 0;

  for (const node of track) {
    const hops = p2
      ? track.filter(n => manhattan(node, n) > 1 && manhattan(node, n) <= duration).map(n => ({ ...n, length: manhattan(node, n) }))
      : track.filter(n => manhattan(node, n) === duration).map(n => ({ ...n, length: duration }));

    result += hops.filter(hop => Math.abs(node.distance - hop.distance) - hop.length >= 100).length;
  }

  return result / 2;
};

const track = parseTrack();

console.log('P1:', findCheats(track, 2));
console.log('P2:', findCheats(track, 20, true));
