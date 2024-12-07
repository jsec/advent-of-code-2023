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

const isValid = ({ numbers, target }: Equation, p2 = false): boolean => {
  if (numbers.length < 2) {
    return false;
  }

  if (numbers.length === 2) {
    const [first, second] = numbers;
    return (first! + second!) === target
      || (first! * second!) === target
      || (p2 && numbers.join('') === target.toString());
  }

  const last = numbers.at(-1);
  const nums = numbers.slice(0, -1);

  const targetSum = target - last!;
  const targetMult = target / last!;

  // Only continue the addition branch if we have a positive remainder
  if (targetSum > 0 && isValid({ numbers: nums, target: targetSum }, p2)) {
    return true;
  }

  // Only continue the multiplication branch if the last number cleanly divides the target
  if (targetMult === Math.floor(targetMult) && isValid({ numbers: nums, target: targetMult }, p2)) {
    return true;
  }

  // Only continue the concat branch if the last digit is the last digit in the target
  if (p2 && String(target).endsWith(String(last))) {
    return isValid({
      numbers: nums,
      target: Number(target.toString().slice(0, -String(last).length)),
    }, p2);
  }

  return false;
};

/// PART 1 ///
const p1 = sum(equations.map(eq => isValid(eq) ? eq.target : 0));
console.log('P1:', p1);

/// PART 2 ///
const p2 = sum(equations.map(eq => isValid(eq, true) ? eq.target : 0));
console.log('P2:', p2);
