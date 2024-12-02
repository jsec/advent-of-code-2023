import { readFileSync } from 'node:fs';

export function getRawInput(): string {
  return readFileSync('input.txt', 'utf8');
}

export function getInput() {
  return getRawInput().trim();
}

export function getSplitInput(delimiter = '\n') {
  return getInput().split(delimiter);
}

export function getInputLines() {
  return getSplitInput().map(l => l.trim());
}
