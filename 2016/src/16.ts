import { chunk } from './util/array'
import { getInput } from './util/input'

const generate = (data: string, desiredLength: number): string => {
  while (data.length < desiredLength) {
    const reverse = data
      .split('')
      .reverse()
      .map(d => d === '0' ? '1' : '0')
      .join('')

    data += '0' + reverse
  }

  return data.substring(0, desiredLength)
}

const getChecksum = (data: string): string => {
  const pairs = chunk(data.split(''), 2)
    .map(c => c[0] === c[1] ? '1' : '0')

  const checksum = pairs.join('')

  if (pairs.length % 2 === 0) {
    return getChecksum(checksum)
  }

  return checksum
}

const input = getInput()

const p1 = generate(input, 272)
const p2 = generate(input, 35651584)

console.log('P1:', getChecksum(p1))
console.log('P2:', getChecksum(p2))
