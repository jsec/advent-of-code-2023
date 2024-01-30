import { chunk, countBy, findIndex, map, minBy, pipe } from 'remeda'

import { zip } from './util/array'
import { getInput } from './util/input'

const width = 25
const height = 6

const input = pipe(
  getInput(),
  str => str.split(''),
  chunk(width * height),
)

const p1 = pipe(
  input,
  minBy(i => i.filter(x => x === '0').length),
  arr => countBy(arr!, x => x === '1') * countBy(arr!, x => x === '2')
)

const p2 = pipe(
  input,
  arr => zip(arr),
  map((pixel) => {
    const white = findIndex(pixel, p => p === '1')
    const black = findIndex(pixel, p => p === '0')

    if (white === -1) {
      return ' '
    }

    if (black === -1) {
      return '0'
    }

    return white! < black! ? '0' : ' '
  }),
  chunk(width),
  map(x => x.join(''))
)

console.log('P1:', p1)
console.log('P2:')
p2.forEach(x => console.log(x))
