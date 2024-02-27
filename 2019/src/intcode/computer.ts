type OutputCallback = (value: number) => unknown

interface Operation {
  exec: (...args: number[]) => void
  name: string
  params: number
}

enum Mode {
  Immediate = '1',
  Position = '0',
}

enum Opcode {
  ADD = '01',
  MUL = '02',
  TERM = '99',
}

interface Parameter {
  mode: Mode
  value: number
}

interface Instruction {
  op: string
  params: Parameter[]
}

export class Computer {
  private inputs: number[]
  private memory: number[]
  private ops: Record<Opcode, Operation>
  private originalProgram: number[]
  private outputCallback: OutputCallback
  private pointer: number

  constructor() {
    this.pointer = 0
    this.memory = []
    this.originalProgram = []
    this.inputs = []
    this.outputCallback = value => console.log(value)

    this.ops = {
      [Opcode.ADD]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = this.memory[a]! + this.memory[b]!
        },
        name: 'add',
        params: 3,
      },
      [Opcode.MUL]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = this.memory[b]! * this.memory[a]!
        },
        name: 'mult',
        params: 3,
      },
      [Opcode.TERM]: {
        exec: () => {
          console.log('SIGTERM')
        },
        name: 'term',
        params: 0,
      },
    }
  }

  addr(idx: number): number {
    return this.memory[idx]!
  }

  assign(idx: number, value: number): this {
    this.memory[idx] = value
    return this
  }

  load(program: number[]): this {
    this.memory = [...program]
    return this
  }

  parseOpcode(): Opcode {
    return this.memory[this.pointer]!.toString().padStart(2, '0') as Opcode
  }

  reset(): this {
    this.memory = this.originalProgram
    return this
  }

  run(): this {
    if (this.memory.length === 0) {
      return this
    }

    this.originalProgram = [...this.memory]
    this.pointer = 0

    let current = this.parseOpcode()

    while (current !== Opcode.TERM) {
      const op = this.ops[current]!
      this.pointer++
      const params = this.memory.slice(this.pointer, this.pointer + op.params)

      op.exec(...params)
      this.pointer += op.params
      current = this.parseOpcode()
    }

    return this
  }

  withInput(value: number): this {
    this.inputs.push(value)
    return this
  }

  withOutput(fn: OutputCallback): this {
    this.outputCallback = fn
    return this
  }
}
