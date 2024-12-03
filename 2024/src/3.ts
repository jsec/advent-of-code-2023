import { getInput } from './utils/input.js';

let input = getInput();

const solution = (program: string) => {
  const re = /mul\((\d*,\d*)\)/g;
  const matches = program.matchAll(re);

  let result = 0;

  for (const match of matches) {
    const [i, j] = match[1]!.split(',').map(Number);
    result += i! * j!;
  }

  return result;
};

/// PART 1 ///
console.log('P1:', solution(input));

/// PART 2 ///
const getDisableIndex = () => input.indexOf('don\'t()');
let disableIdx = getDisableIndex();

while (disableIdx !== -1) {
  const enableIdx = input.indexOf('do()', disableIdx);
  input = input.slice(0, disableIdx) + input.slice(enableIdx);
  disableIdx = getDisableIndex();
}

console.log('P2:', solution(input));
