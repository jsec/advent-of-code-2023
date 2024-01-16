import { getInput } from './util/input'

const counts = {
  E: 0,
  N: 0,
  S: 0,
  W: 0,
}

const resolver = {
  L: {
    E: 'N',
    N: 'W',
    S: 'E',
    W: 'S',
  },
  R: {
    E: 'S',
    N: 'E',
    S: 'W',
    W: 'N',
  },
}

const walk = (step: string, current: string): string => {
  const direction = step.slice(0, 1)
  const length = parseInt(step.slice(1))

  const newDirection = resolver[direction][current]
  counts[newDirection] += length

  return newDirection
}

const steps = getInput().split(', ')
let current = 'N'

for (const step of steps) {
  current = walk(step, current)
}

const p1 = Math.abs(counts.E - counts.W) + Math.abs(counts.N - counts.S)
console.log('P1:', p1)
