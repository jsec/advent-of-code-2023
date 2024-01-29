import fastCartesian from 'fast-cartesian'
import { chunk, flatMap, identity, map, pipe, range } from 'remeda'

import { getSplitInput } from './util/input'

const run = (data: number[]): number => {
  const chunks = chunk(data, 4)

  for (const chunk of chunks) {
    const [opcode, pos1, pos2, pos3] = chunk

    switch (opcode) {
      case 1:
        data[pos3!] = data[pos1!] + data[pos2!]
        break
      case 2:
        data[pos3!] = data[pos1!] * data[pos2!]
        break
      case 99:
        return data[0]!
    }
  }

  throw new Error('you dun goofed')
}

const p1 = (data: number[]): number => {
  data[1] = 12
  data[2] = 2

  return run(data)
}

const p2 = (data: number[]): number => {
  const permutations = pipe(
    identity([range(0, 100), range(0, 100)]),
    fastCartesian,
  )

  for (const [noun, verb] of permutations) {
    const memory = [...data]
    memory[1] = noun!
    memory[2] = verb!

    if (run(memory) === 19690720) {
      return 100 * noun! + verb!
    }
  }

  throw new Error('you dun goofed')
}

const data = pipe(
  getSplitInput(','),
  map(parseInt),
)

console.log('P1:', p1([...data]))
console.log('P2:', p2([...data]))
