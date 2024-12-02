import { getInputLines } from './util/input';

const map = getInputLines()
  .map(l => l.split(')'))
  .reduce((a, c) => {
    a[c[1]!] = c[0]!;
    return a;
  }, {});

let orbits = 0;
for (const [_, value] of Object.entries(map)) {
  let count = 0;
  let iter = value;
  while (map[iter!]) {
    count++;
    iter = map[iter!];
  }

  // Add one to account for COM
  orbits += count + 1;
}

console.log('P1:', orbits);
