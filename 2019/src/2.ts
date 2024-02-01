import fastCartesian from 'fast-cartesian'
import { identity, map, pipe, range } from 'remeda'

import { Intcode } from './shared/intcode'
import { getSplitInput } from './util/input'

const p1 = (memory: number[]): number => {
  const cpu = new Intcode(memory)

  cpu.setMemoryIndex(1, 12)
  cpu.setMemoryIndex(2, 2)

  cpu.run()

  return cpu.getMemoryAtIndex(0)
}

const p2 = (memory: number[]): number => {
  const cpu = new Intcode(memory)

  const permutations = pipe(
    identity([range(0, 100), range(0, 100)]),
    fastCartesian,
  )

  for (const [noun, verb] of permutations) {
    cpu.setMemory([...memory])
    cpu.setMemoryIndex(1, noun!)
    cpu.setMemoryIndex(2, verb!)

    cpu.run()

    if (cpu.getMemoryAtIndex(0) === 19690720) {
      return 100 * noun! + verb!
    }
  }

  throw new Error('you got it wrong')
}

const data = pipe(
  getSplitInput(','),
  map(parseInt),
)

console.log('P1:', p1([...data]))
console.log('P2:', p2([...data]))
