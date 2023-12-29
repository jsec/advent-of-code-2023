import { chunk } from './util/array'
import { getInputLines } from './util/input'

let alphabet = 'abcdefghijklmnopqrstuvwxyz'
alphabet += alphabet.toUpperCase()

const priorities = {}
for (let x = 0; x < alphabet.length; x++) {
  priorities[alphabet[x]] = x + 1
}

const getScore = (lines: string[]) => {
  for (const char of alphabet) {
    if (lines.every(l => l.includes(char))) {
      return priorities[char]
    }
  }
}

const rucksacks = getInputLines()

const p1 = rucksacks
  .map((rucksack) => {
    const median = rucksack.length / 2
    return [rucksack.substring(0, median), rucksack.substring(median)]
  })
  .map(getScore)
  .reduce((acc, curr) => acc + curr, 0)

console.log('P1:', p1)

const p2 = chunk(rucksacks, 3)
  .map(getScore)
  .reduce((acc, curr) => acc + curr, 0)

console.log('P2:', p2)
