import { range } from 'remeda'

import { pairwise } from './util/array'
import { getInput } from './util/input'

const isValid = (password: string): boolean => {
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

  return hasRepeating
}

const [start, end] = getInput().split('-').map(i => parseInt(i))

const p1 = range(start!, end!)
  .filter(p => isValid(p.toString()))
  .length

console.log('P1:', p1)
