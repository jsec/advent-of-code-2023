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

const p1 = (): string => {
  let input = getInput().split('').map(Number)

  for (let i = 0; i < 100; i++) {
    input = phase(input)
  }

  return input.slice(0, 8).join('')
}

const p2 = (): string => {
  let input = getInput().repeat(10000).split('').map(Number)
  const offset = Number(input.slice(0, 7).join(''))
  input = input.slice(offset)

  for (let i = 0; i < 100; i++) {
    for (let i = input.length - 1; i >= 0; i--) {
      input[i] = ((input[i + 1] || 0) + input[i]!) % 10
    }
  }

  return input.slice(0, 8).join('')
}

console.log('P1:', p1())
console.log('P2:', p2())
