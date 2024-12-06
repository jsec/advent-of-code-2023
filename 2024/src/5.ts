import { moveItem } from './utils/array.js';
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

const isUpdateValid = (update: number[]) => {
  for (const [idx, page] of update.entries()) {
    const deps = ruleMap[page];

    if (deps && deps.some(dep => update.indexOf(dep) > idx)) {
      return false;
    }
  }

  return true;
};

const fixUntilValid = (update: number[]) => {
  for (const [idx, page] of update.entries()) {
    const deps = ruleMap[page];

    if (!deps) {
      continue;
    }

    for (const dep of deps) {
      const depIdx = update.indexOf(dep);
      if (depIdx > idx) {
        const newUpdate = moveItem(update, depIdx, idx === 0 ? 0 : idx - 1);
        return fixUntilValid(newUpdate);
      }
    }
  }

  return update.at(update.length / 2);
};

/// PART 1 ///
const p1 = updates
  .map(update => isUpdateValid(update) ? update.at(update.length / 2) : 0)
  .reduce((a, c) => a! + c!, 0);

console.log('P1:', p1);

/// PART 2 ///
const p2 = updates
  .map(update => isUpdateValid(update) ? 0 : fixUntilValid(update))
  .reduce((a, c) => a! + c!, 0);

console.log('P2:', p2);
