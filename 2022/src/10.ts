import { getInputLines } from './util/input'

const input = getInputLines()

const cycles: number[] = []

for (const line of input) {
  cycles.push(0)

  if (!line.startsWith('noop')) {
    cycles.push(parseInt(line.split(' ')[1]))
  }
}

const p1 = (cycles: number[]): number => {
  const signals = [20, 60, 100, 140, 180, 220]
  return signals
    .map(s => cycles
      .slice(0, s - 1)
      .reduce((a, c) => a + c, 1) * s)
    .reduce((a, c) => a + c, 0)
}

console.log('P1:', p1(cycles))
