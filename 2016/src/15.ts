import { getInputLines } from './util/input'

interface Disc {
  offset: number
  positions: number
}

const parseInput = (line: string): Disc => {
  const split = line.split(' ')

  return {
    offset: parseInt(split[11]!.slice(0, -1)),
    positions: parseInt(split[3]!),
  }
}

const willDispense = (discs: Disc[], elapsed: number): boolean => {
  return discs.reduce((prev, disc, idx) => prev && (elapsed + idx + disc.offset + 1) % disc.positions === 0, true)
}

const run = (discs: Disc[]): number => {
  let time = 0
  while (!willDispense(discs, time)) {
    time++
  }

  return time
}

const discs = getInputLines().map(parseInput)
console.log('P1:', run([...discs]))
discs.push({ offset: 0, positions: 11 })
console.log('P2:', run(discs))
