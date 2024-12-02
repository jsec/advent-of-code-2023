import { sortArray } from './utils/array.js';
import { getInputLines } from './utils/input.js';

const input = getInputLines()
  .map(line => line.split('  ').map(Number));

const list1 = sortArray(input.map(i => i[0]!));
const list2 = sortArray(input.map(i => i[1]!));

/// PART 1 ///
let p1 = 0;

for (const idx in list1) {
  p1 += Math.abs(list1[idx]! - list2[idx]!);
}

console.log('P1:', p1);

/// PART 2 ///
let p2 = 0;

for (const value of list1) {
  p2 += value * list2.filter(i => i === value).length;
}

console.log('P2:', p2);
