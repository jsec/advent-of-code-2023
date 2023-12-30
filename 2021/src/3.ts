import { zip } from './util/array'
import { getInputLines } from './util/input'

const getPower = (readings: string[][]): number => {
  let gamma = ''
  let epsilon = ''

  for (const reading of readings) {
    const zeroes = reading.filter(x => !x).length
    const ones = reading.filter(x => x).length

    gamma += zeroes > ones ? '0' : '1'
    epsilon += zeroes > ones ? '1' : '0'
  }

  return parseInt(epsilon, 2) * parseInt(gamma, 2)
}

const readings = zip(getInputLines()).map(l => l.map(i => parseInt(i)))

console.log('P1:', getPower(readings))
