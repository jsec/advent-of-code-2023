import { getSplitInput } from './utils/input.js';

const [rules, updatePages] = getSplitInput('\n\n');

const ruleMap: Record<number, number[]> = {};

for (const rule of rules!.split('\n')) {
  const [dep, page] = rule.split('|').map(Number);

  if (!ruleMap[page!]) {
    ruleMap[page!] = [];
  }

  ruleMap[page!]!.push(dep!);
}

const updates = updatePages!
  .split('\n')
  .map(u => u.split(',').map(Number));

/// PART 1 ///
const p1 = updates
  .map((update) => {
    let valid = true;

    for (const [idx, page] of update.entries()) {
      const deps = ruleMap[page];

      if (deps && deps.some(dep => update.indexOf(dep) > idx)) {
        valid = false;
        break;
      }
    }

    return valid ? update.at(update.length / 2) : 0;
  })
  .reduce((a, c) => a! + c!, 0);

console.log('P1:', p1);
