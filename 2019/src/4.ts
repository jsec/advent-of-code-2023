import { range } from 'remeda'

import { pairwise } from './util/array'
import { getInput } from './util/input'

const isValid = (password: string, p2 = false): boolean => {
  const pairs = pairwise(password.split('').map(p => parseInt(p)))

  let hasRepeating = false

  for (const [first, second] of pairs) {
    if (first! > second!) {
      return false
    }

    if (first === second) {
      hasRepeating = true
    }
  }

  if (p2) {
    const matches = password.match(/(.)\1+/g) ?? []
    return matches.some(m => m.length === 2)
  }

  return hasRepeating
}

const [start, end] = getInput().split('-').map(i => parseInt(i))
const passwords = range(start!, end!)

const p1 = passwords
  .filter(p => isValid(p.toString()))
  .length

const p2 = passwords
  .filter(p => isValid(p.toString(), true))
  .length

console.log('P1:', p1)
console.log('P2:', p2)
