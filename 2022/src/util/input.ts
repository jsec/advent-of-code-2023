import { readFileSync } from 'fs'

export function getInput() {
  return readFileSync('input.txt', 'utf8').trim()
}

export function getSplitInput(delimiter = '\n') {
  return getInput().split(delimiter)
}

export function getInputLines() {
  return getSplitInput().map(l => l.trim())
}
