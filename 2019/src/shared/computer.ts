import { chunk } from '../util/array'

enum Mode {
  Position,
  Immediate,
}

interface Parameter {
  mode: Mode
  value: number
}

export interface Instruction {
  opcode: number
  params: Parameter[]
}

export class Computer {
  private _memory: number[]

  constructor(memory: number[]) {
    this._memory = memory
  }

  add(s1: number, s2: number, dest: number): void {
    this._memory[dest] = this._memory[s1]! + this._memory[s2]!
  }

  get(idx: number): number {
    return this._memory[idx]!
  }

  index(idx: number): number {
    return this._memory[idx]!
  }

  multiply(s1: number, s2: number, dest: number): void {
    this._memory[dest] = this._memory[s1]! * this._memory[s2]!
  }

  process(inst: Instruction): void {
    const [param1, param2, param3] = inst.params

    switch (inst.opcode) {
      case 1:
        this.add(param1!, param2!, param3!)
        break
      case 2:
        this.multiply(param1!, param2!, param3!)
        break
      case 99:
        return
    }
  }

  run(): void {
    const chunks = chunk(this._memory, 4)

    for (const chunk of chunks) {
      const [op, ...params] = chunk
      const inst = {
        opcode: op!,
        params,
      }

      this.process(inst)
    }
  }

  set(memory: number[]): void {
    this._memory = memory
  }

  setIndex(idx: number, value: number): void {
    this._memory[idx] = value
  }

  get memory(): number[] {
    return this._memory
  }
}
