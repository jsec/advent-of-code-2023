import { getInputLines } from './util/input'

const getPower = (readings: string[]) => {
  let gamma = ''
  let epsilon = ''

  for (let i = 0; i < readings[0].length; i++) {
    const zeroes = readings.filter(r => r[i] === '0').length
    const ones = readings.filter(r => r[i] === '1').length

    gamma += zeroes > ones ? '0' : '1'
    epsilon += zeroes > ones ? '1' : '0'
  }

  return {
    epsilon,
    gamma,
  }
}

const getRating = (readings: string[], leastCommon = false) => {
  for (let i = 0; i < readings[0].length; i++) {
    let bit = ''
    const zeroes = readings.filter(r => r[i] === '0').length
    const ones = readings.filter(r => r[i] === '1').length

    if (zeroes > ones) {
      bit = leastCommon ? '1' : '0'
    } else if (ones > zeroes) {
      bit = leastCommon ? '0' : '1'
    } else {
      bit = leastCommon ? '0' : '1'
    }

    readings = readings.filter(r => r[i] === bit)
    if (readings.length === 1) {
      return parseInt(readings[0], 2)
    }
  }
}

const readings = getInputLines()
const power = getPower(readings)
const p1 = parseInt(power.epsilon, 2) * parseInt(power.gamma, 2)
console.log('P1:', p1)

const oxygen = getRating(readings)
const co2 = getRating(readings, true)
console.log('P2:', oxygen * co2)
