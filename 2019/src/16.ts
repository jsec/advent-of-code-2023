import { zip } from './util/array'
import { getInput } from './util/input'

const basePattern = [0, 1, 0, -1]

const getPattern = (idx: number, len: number) => {
  let pattern = []

  while (pattern.length < len) {
    const repeat = basePattern.map(p => Array.from({ length: idx }, () => p)).flat(Infinity)
    pattern = pattern.concat(repeat)
  }

  const first = pattern.shift()
  pattern.push(first)

  return pattern.slice(0, len)
}

const phase = (input: number[]): number[] => {
  const output: number[] = []

  for (let i = 1; i <= input.length; i++) {
    const pattern = getPattern(i, input.length)

    const pairs = zip([input, pattern])

    const result = pairs
      .map(([a, b]) => a * b)
      .reduce((a, c) => a + c, 0)

    output.push(Math.abs(result) % 10)
  }

  return output
}

const p1 = (input: number[], phases: number): string => {
  for (let i = 0; i < phases; i++) {
    input = phase(input)
  }

  return input.slice(0, 8).join('')
}

const input = getInput().split('').map(i => parseInt(i))

console.log('P1:', p1(input, 100))
