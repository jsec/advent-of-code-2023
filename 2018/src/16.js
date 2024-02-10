const { getInput, getInputLines } = require('./util/input')

const ops = {
  addi: (regs, a, b, c) => regs[c] = regs[a] + b,
  addr: (regs, a, b, c) => regs[c] = regs[a] + regs[b],
  bani: (regs, a, b, c) => regs[c] = regs[a] & b,
  banr: (regs, a, b, c) => regs[c] = regs[a] & regs[b],
  bori: (regs, a, b, c) => regs[c] = regs[a] | b,
  borr: (regs, a, b, c) => regs[c] = regs[a] | regs[b],
  eqir: (regs, a, b, c) => regs[c] = a === regs[b] ? 1 : 0,
  eqri: (regs, a, b, c) => regs[c] = regs[a] === b ? 1 : 0,
  eqrr: (regs, a, b, c) => regs[c] = regs[a] === regs[b] ? 1 : 0,
  gtir: (regs, a, b, c) => regs[c] = a > regs[b] ? 1 : 0,
  gtri: (regs, a, b, c) => regs[c] = regs[a] > b ? 1 : 0,
  gtrr: (regs, a, b, c) => regs[c] = regs[a] > regs[b] ? 1 : 0,
  muli: (regs, a, b, c) => regs[c] = regs[a] * b,
  mulr: (regs, a, b, c) => regs[c] = regs[a] * regs[b],
  seti: (regs, a, _, c) => regs[c] = a,
  setr: (regs, a, _, c) => regs[c] = regs[a],
}

const compute = (registers, key, params) => {
  ops[key](registers, ...params)
  return registers
}

const run = (initial, instruction, expected) => {
  return Object.keys(ops).filter(key => {
    const registers = compute([...initial], key, instruction)
    return registers.toString() === expected.toString()
  })
}

const getInstructions = () => {
  const [p1, ...rest] = getInput().split('\n\n\n')

  const instructions = p1.split('\n\n').map(sample => {
    const [before, op, after] = sample.split('\n')

    const initial = before
      .slice(before.indexOf('[') + 1, -1)
      .split(', ')
      .map(n => parseInt(n))

    const instruction = op
      .split(' ')
      .slice(1)
      .map(n => parseInt(n))

    const expected = after
      .slice(after.indexOf('[') + 1, -1)
      .split(', ')
      .map(n => parseInt(n))

    return {
      expected,
      initial,
      instruction,
    }
  })

  return instructions
}

const p1 =
  getInstructions().filter(({ expected, initial, instruction }) =>
    run(initial, instruction, expected).length >= 3
  ).length

console.log('P1:', p1)
