import { sum } from 'radash'
import { map, pipe } from 'remeda'

import { getInputLines } from './util/input'

const calculateFuel = (mass: number, p2 = false) => {
  if (!p2) {
    return Math.floor(mass / 3) - 2
  }

  const result = []
  while (mass > 0) {
    result.push(mass)
    mass = calculateFuel(mass)
  }

  // slice the original mass off the array before summing
  return sum(result.slice(1))
}

const input = getInputLines().map((l: string) => parseInt(l))

const p1 = pipe(
  input,
  map(calculateFuel),
  sum
)

const p2 = pipe(
  input,
  map(s => calculateFuel(s, true)),
  sum
)

console.log('P1:', p1)
console.log('P2:', p2)
