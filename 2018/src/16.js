const { getInput } = require('./util/input')

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
  const [groups, programInput] = getInput().split('\n\n\n\n')

  const program = programInput.split('\n').map(line => line.split(' ').map(i => parseInt(i)))

  const instructions = groups.split('\n\n').map(sample => {
    const [before, op, after] = sample.split('\n')

    const initial = before
      .slice(before.indexOf('[') + 1, -1)
      .split(', ')
      .map(n => parseInt(n))

    const instruction = op
      .split(' ')
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

  return {
    instructions,
    program,
  }
}

const getOpcodeMapping = instructions => {
  const map = new Map()

  while (map.size < 16) {
    const solved = instructions.filter(i => i.candidates.length === 1)

    for (const s of solved) {
      if (!map.has(s.opcode)) {
        map.set(s.opcode, s.candidates[0])
      }

      instructions = instructions
        .filter(i => i.opcode !== s.opcode)
        .map(i => {
          return {
            ...i,
            candidates: i.candidates.filter(c => c !== s.candidates[0]),
          }
        })
    }
  }

  return map
}

const runProgram = (program, opMap) => {
  let registers = [0, 0, 0, 0]

  for (const inst of program) {
    const [op, ...params] = inst
    registers = compute(registers, opMap.get(op), params)
  }

  return registers
}

const { instructions, program } = getInstructions()

const possibilities = instructions.map(({ expected, initial, instruction }) => {
  const candidates = run(initial, instruction.slice(1), expected)
  return {
    candidates,
    opcode: instruction[0],
  }
})

const p1 = possibilities.filter(p => p.candidates.length >= 3).length
console.log('P1:', p1)

const opcodeMap = getOpcodeMapping(possibilities)
const p2 = runProgram(program, opcodeMap)
console.log('P2:', p2[0])
