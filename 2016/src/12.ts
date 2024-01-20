import { getInputLines } from './util/input'

const input = getInputLines()

const run = (cpu): number => {
  let currentIdx = 0

  while (currentIdx < input.length) {
    const inst = input[currentIdx]!
    const split = inst.split(' ')
    const cmd = split[0]!

    if (split.length === 2) {
      cpu[split[1]!] += cmd === 'inc' ? 1 : -1
      currentIdx += 1
    }
    else {
      if (cmd === 'cpy') {
        const value = parseInt(split[1])
        if (isNaN(value)) {
          cpu[split[2]] = cpu[split[1]]
        }
        else {
          cpu[split[2]] = value
        }

        currentIdx += 1
      }
      else {
        if (cpu[split[1]!] === 0) {
          currentIdx += 1
        }
        else {
          currentIdx += parseInt(split[2]!)
        }
      }
    }
  }

  return cpu['a']
}

console.log('P1:', run({ a: 0, b: 0, c: 0, d: 0 }))
console.log('P2:', run({ a: 0, b: 0, c: 1, d: 0 }))
