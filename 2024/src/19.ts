import { sum } from 'es-toolkit';
import memoize from 'memoize';

import { getSplitInput } from './utils/input.js';

const parseInput = () => {
  const [patterns, targets] = getSplitInput('\n\n');

  return {
    patterns: patterns!.split(', '),
    targets: targets!.split('\n'),
  };
};

const findAnyDesigns = (target: string, patterns: string[]): boolean => {
  if (target.length === 0) {
    return true;
  }

  const candidates = patterns.filter(pattern => target.startsWith(pattern));

  if (candidates.length === 0) {
    return false;
  }

  return candidates.some(c => findAnyDesigns(target.slice(c.length), patterns));
};

const findAllDesigns = memoize((target: string, patterns: string[]): number => {
  if (target.length === 0) {
    return 1;
  }

  const candidates = patterns.filter(pattern => target.startsWith(pattern));

  if (candidates.length === 0) {
    return 0;
  }

  return sum(candidates.map(c => findAllDesigns(target.slice(c.length), patterns)));
}, { cacheKey: args => args.join(',') });

const p1 = (targets: string[], patterns: string[]) => targets.filter(target => findAnyDesigns(target, patterns)).length;
const p2 = (targets: string[], patterns: string[]) => sum(targets.map(target => findAllDesigns(target, patterns)));

const { patterns, targets } = parseInput();

console.log('P1:', p1(targets, patterns));
console.log('P2:', p2(targets, patterns));
