import { pairwise } from './util/array'
import { getInput } from './util/input'
import { range } from './util/loop'

const isValid = (password: string, p2 = false): boolean => {
  const pairs = pairwise(password.split('').map(p => parseInt(p)))

  let hasRepeating = false

  for (const [first, second] of pairs) {
    if (first! > second!) {
      return false
    }

    if (!p2 && first === second) {
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

let p1 = 0
let p2 = 0

for (const password of passwords) {
  if (isValid(password.toString())) {
    p1++
  }

  if (isValid(password.toString(), true)) {
    p2++
  }
}

console.log('P1:', p1)
console.log('P2:', p2)
