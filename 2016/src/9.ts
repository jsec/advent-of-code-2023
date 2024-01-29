import { getInput } from './util/input'

const p1 = (input: string): number => {
  let i = 0

  while (i < input.length) {
    const substr = input.substring(i)
    const start = substr.indexOf('(')

    if (start === -1) {
      return input.length
    }

    const end = substr.substring(start).indexOf(')') + start
    const [chars, repeats] = substr
      .substring(start, end + 1)
      .slice(1, -1)
      .split('x')
      .map(n => parseInt(n))

    let decompressed = substr.slice(end + 1, end + 1 + chars!)
    if (repeats! > 1) {
      decompressed = decompressed.repeat(repeats!)
    }

    input = input.slice(0, i + start) + decompressed + input.slice(i + end + 1 + chars!)
    i += decompressed.length
  }

  return input.length
}

const p2 = (input: string): number => {
  let length = 0
  let i = 0
  const weights = new Array(input.length).fill(1)

  while (i < input.length) {
    if (input[i] !== '(') {
      length += weights[i]
      i++
      continue
    }

    const markEnd = i + input.slice(i).indexOf(')')
    const [chars, repeats] = input
      .substring(i, markEnd)
      .slice(1)
      .split('x')
      .map(n => parseInt(n))

    for (let x = 1; x <= chars!; x++) {
      weights[markEnd + x] += repeats!
    }

    i = markEnd + 1
  }

  return length
}

const input = getInput()

console.log('P1:', p1(input))
console.log('P2:', p2(input))
