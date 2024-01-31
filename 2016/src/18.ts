import { match } from "ts-pattern"

import { slidingWindow } from "./util/array"
import { getInput } from "./util/input"

const isTrap = (seq: string): boolean =>
  match(seq)
    .with('^^.', '.^^', '^..', '..^', () => true)
    .otherwise(() => false)

const generate = (prev: string[]): string[] => {
  // add the "safe" sections to the array so we can use a sliding window
  prev.push('.')
  prev.unshift('.')

  return slidingWindow(prev, 3).map(trio => {
    return isTrap(trio.join('')) ? '^' : '.'
  })
}

const p1 = (input: string, rows: number): number => {
  let prev = input.split('')
  const acc = [prev]

  for (let i = 0; i < rows - 1; i++) {
    prev = generate([...prev])
    acc.push(prev)
  }

  return acc.reduce((a, c) => a + c.filter(i => i === '.').length, 0)
}

const input = getInput()

console.log('P1:', p1(input, 40))
console.log('P2:', p1(input, 400000))
