import { getSplitInput } from './util/input'

const run = (input: number[], ticks: number): number => {
  const counts = Array(9).fill(0)

  for (const i of input) {
    counts[i] += 1
  }

  for (let i = 0; i < ticks; i++) {
    const newFish = counts.shift()
    counts.push(newFish)
    counts[6] += newFish
  }

  return counts.reduce((a, b) => a + b, 0)
}

const input = getSplitInput(',').map(f => parseInt(f))

console.log('P1:', run(input, 80))
console.log('P2:', run(input, 256))
