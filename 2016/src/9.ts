import { getInput } from './util/input'

const decompress = (line: string): number => {
  let i = 0

  while (i < line.length) {
    const substr = line.substring(i)
    const start = substr.indexOf('(')

    if (start === -1) {
      return line.length
    }

    const end = substr.substring(start).indexOf(')') + start
    const [chars, repeats] = substr
      .substring(start, end + 1)
      .slice(1, -1)
      .split('x')
      .map(n => parseInt(n))

    let decompressed = substr.slice(end + 1, end + 1 + chars!)
    if (repeats > 1) {
      decompressed = decompressed.repeat(repeats)
    }

    line = line.slice(0, i + start) + decompressed + line.slice(i + end + 1 + chars)
    i += decompressed.length
  }

  return line.length
}

console.log('P1:', decompress(getInput()))
