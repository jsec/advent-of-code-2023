import { getInputLines } from './utils/input.js';
import { sum } from './utils/math.js';

interface Equation {
  numbers: number[];
  target: number;
}

const equations: Equation[] = getInputLines()
  .map(line => line.split(': '))
  .map((line) => {
    const target = Number(line[0]!);
    const numbers = line[1]!.split(' ').map(Number);

    return { numbers, target };
  });

const isValid = ({ numbers, target }: Equation): boolean => {
  if (numbers.length < 2) {
    return false;
  }

  if (numbers.length === 2) {
    const [first, second] = numbers;
    return (first! + second!) === target || (first! * second!) === target;
  }

  const last = numbers.at(-1);
  const nums = numbers.slice(0, -1);

  const targetSum = target - last!;
  const targetMult = target / last!;

  if (targetSum > 0 && isValid({ numbers: nums, target: targetSum })) {
    return true;
  }

  if (targetMult === Math.floor(targetMult) && isValid({ numbers: nums, target: targetMult })) {
    return true;
  }

  return false;
};

/// PART 1 ///
const p1 = sum(equations.map(eq => isValid(eq) ? eq.target : 0));
console.log('P1:', p1);
