import { Computer } from './shared/computer'
import { cartesianProduct } from './util/array'
import { getSplitInput } from './util/input'
import { range } from './util/loop'

const p1 = (memory: number[]): number => {
  const cpu = new Computer(memory)

  cpu.setIndex(1, 12)
  cpu.setIndex(2, 2)

  cpu.run()

  return cpu.index(0)
}

const p2 = (memory: number[]): number => {
  const cpu = new Computer(memory)

  const permutations = cartesianProduct([...range(0, 100)], [...range(0, 100)])

  for (const [noun, verb] of permutations) {
    cpu.set([...memory])
    cpu.setIndex(1, noun!)
    cpu.setIndex(2, verb!)

    cpu.run()

    if (cpu.index(0) === 19690720) {
      return 100 * noun! + verb!
    }
  }

  throw new Error('you got it wrong')
}

const data = getSplitInput(',').map(i => parseInt(i))

console.log('P1:', p1([...data]))
console.log('P2:', p2([...data]))
