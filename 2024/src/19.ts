import { getSplitInput } from './utils/input.js';

const parseInput = () => {
  const [patterns, targets] = getSplitInput('\n\n');

  return {
    patterns: patterns!.split(', '),
    targets: targets!.split('\n'),
  };
};

const checkTarget = (target: string, patterns: string[]): boolean => {
  if (target.length === 0) {
    return true;
  }

  const candidates = patterns.filter(pattern => target.startsWith(pattern));

  if (candidates.length === 0) {
    return false;
  }

  return candidates.some(c => checkTarget(target.slice(c.length), patterns));
};

const p1 = (targets: string[], patterns: string[]) => {
  return targets.filter(target => checkTarget(target, patterns)).length;
};

const { patterns, targets } = parseInput();

console.log('P1:', p1(targets, patterns));
