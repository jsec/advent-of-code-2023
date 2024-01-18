import { zip } from './util/array'
import { getInputLines } from './util/input'

const getMostFrequent = (chars: string[]): string => {
  let max = 0
  let result = ''

  for (const char of chars) {
    const length = chars.filter(c => c === char).length
    if (length > max) {
      max = length
      result = char
    }
  }

  return result
}

const getLeastFrequent = (chars: string[]): string => {
  let min = 9999
  let result = ''

  for (const char of chars) {
    const length = chars.filter(c => c === char).length
    if (length < min) {
      min = length
      result = char
    }
  }

  return result
}

const input = zip(...getInputLines().map(l => l.split('')))

const p1 = input.map(i => getMostFrequent(i)).join('')
const p2 = input.map(i => getLeastFrequent(i)).join('')

console.log('P1:', p1)
console.log('P2:', p2)
