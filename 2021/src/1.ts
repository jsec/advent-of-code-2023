import { getSplitInput } from './util/input'

const input = getSplitInput().map(i => parseInt(i))

let changed = 0
let previous = input[0]

for (const current of input) {
  if (current > previous) {
    changed += 1
  }
  previous = current
}

console.log('P1:', changed)

const slidingWindow = (arr: number[], chunk: number) => {
  let previous = 0
  let current = 0
  let count = 0

  for (let i = 0; i < chunk; i++) {
    previous += arr[i]!
  }

  current = previous
  for (let i = chunk; i < arr.length; i++) {
    current = current - arr[i - chunk] + arr[i]
    if (current > previous) {
      count += 1
    }

    previous = current
  }

  return count
}

console.log('P2:', slidingWindow(input, 3))
