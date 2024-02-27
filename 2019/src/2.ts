import { Computer } from './intcode/computer'
import { cartesianProduct } from './util/array'
import { getSplitInput } from './util/input'
import { range } from './util/loop'

const p1 = (program: number[]): number => {
  return new Computer()
    .load(program)
    .assign(1, 12)
    .assign(2, 2)
    .run()
    .addr(0)
}

const p2 = (program: number[]): number => {
  const permutations = cartesianProduct([...range(0, 100)], [...range(0, 100)])

  for (const [noun, verb] of permutations) {
    const cpu = new Computer()
      .load(program)
      .assign(1, noun!)
      .assign(2, verb!)

    cpu.run()

    if (cpu.addr(0) === 19690720) {
      return 100 * noun! + verb!
    }
  }

  return -1
}

const program = getSplitInput(',').map(i => parseInt(i))

console.log('P1:', p1([...program]))
console.log('P2:', p2([...program]))
