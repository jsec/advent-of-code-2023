import { sum } from './util/array';
import { getInputLines } from './util/input';

const calculateFuel = (mass: number, p2 = false) => {
  if (!p2) {
    return Math.floor(mass / 3) - 2;
  }

  const result = [];
  while (mass > 0) {
    result.push(mass);
    mass = calculateFuel(mass);
  }

  return sum(result.slice(1));
};

const input = getInputLines().map(l => Number.parseInt(l));

const p1 = sum(input.map(index => calculateFuel(index)));
const p2 = sum(input.map(index => calculateFuel(index, true)));

console.log('P1:', p1);
console.log('P2:', p2);
