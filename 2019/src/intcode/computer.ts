type OutputCallback = (value: number) => unknown;

interface Instruction {
  op: Operation,
  opcode: Opcode,
  params: number[],
}

interface Operation {
  exec: (...arguments_: number[]) => void,
  name: string,
  params: number,
  persist: boolean,
}

enum Mode {
  Immediate = '1',
  Position = '0',
}

enum Opcode {
  ADD = '01',
  EQ = '08',
  IN = '03',
  JMPF = '06',
  JMPT = '05',
  LT = '07',
  MUL = '02',
  OUT = '04',
  TERM = '99',
}

export class Computer {
  private inputs: number[];

  private memory: number[];

  private ops: Record<Opcode, Operation>;

  private originalProgram: number[];

  private outputCallback: OutputCallback;

  private pointer: number;

  constructor() {
    this.pointer = 0;
    this.memory = [];
    this.originalProgram = [];
    this.inputs = [];
    this.outputCallback = value => console.log('OUTPUT:', value);

    this.ops = {
      [Opcode.ADD]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = a + b;
        },
        name: 'add',
        params: 3,
        persist: true,
      },
      [Opcode.EQ]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = a === b
            ? 1
            : 0;
        },
        name: 'equals',
        params: 3,
        persist: true,
      },
      [Opcode.IN]: {
        exec: (a: number) => {
          this.memory[a] = this.inputs.pop()!;
        },
        name: 'input',
        params: 1,
        persist: true,
      },
      [Opcode.JMPF]: {
        exec: (a: number, b: number) => {
          if (a === 0) {
            console.log('setting pointer to:', b);
            this.pointer = b;
          }
        },
        name: 'jump-false',
        params: 2,
        persist: false,
      },
      [Opcode.JMPT]: {
        exec: (a: number, b: number) => {
          if (a !== 0) {
            console.log('setting pointer to:', b);
            this.pointer = b;
          }
        },
        name: 'jump-true',
        params: 2,
        persist: false,
      },
      [Opcode.LT]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = a < b
            ? 1
            : 0;
        },
        name: 'less-than',
        params: 3,
        persist: true,
      },
      [Opcode.MUL]: {
        exec: (a: number, b: number, c: number) => {
          this.memory[c] = a * b;
        },
        name: 'mult',
        params: 3,
        persist: true,
      },
      [Opcode.OUT]: {
        exec: (a: number) => {
          this.outputCallback(a);
        },
        name: 'output',
        params: 1,
        persist: false,
      },
      [Opcode.TERM]: {
        exec: () => {
          console.log('SIGTERM');
        },
        name: 'term',
        params: 0,
        persist: false,
      },
    };
  }

  addr(index: number): number {
    return this.memory[index]!;
  }

  assign(index: number, value: number): this {
    this.memory[index] = value;
    return this;
  }

  getInstruction(): Instruction {
    const value = this.memory[this.pointer]!.toString();

    const opcode = value.slice(-2).padStart(2, '0') as Opcode;
    const op = this.ops[opcode];

    this.pointer++;

    console.log('value:', value);

    const modes = value
      .padStart(op.params + 2, '0')
      .slice(0, -2)
      .split('')
      .reverse();

    const parameters = this.memory
      .slice(this.pointer, this.pointer + op.params)
      .map((p, index) => {
        switch (modes[index]) {
          case Mode.Immediate: {
            return p;
          }
          case Mode.Position: {
            if (op.persist && index === op.params - 1) {
              return p;
            }

            return this.addr(p);
          }
          default: {
            throw new Error('Invalid Mode');
          }
        }
      });

    return {
      op,
      opcode,
      params: parameters,
    };
  }

  load(program: number[]): this {
    this.memory = [ ...program ];
    return this;
  }

  parseOpcode(): Opcode {
    return this.memory[this.pointer]!.toString().padStart(2, '0') as Opcode;
  }

  reset(): this {
    this.memory = this.originalProgram;
    return this;
  }

  run(): this {
    if (this.memory.length === 0) {
      return this;
    }

    this.originalProgram = [ ...this.memory ];
    this.pointer = 0;

    let inst = this.getInstruction();

    while (inst.opcode !== Opcode.TERM) {
      const {
        op, opcode, params,
      } = inst;
      op.exec(...params);

      if (opcode !== Opcode.JMPF && opcode !== Opcode.JMPT) {
        this.pointer += op.params;
      }

      inst = this.getInstruction();
    }

    return this;
  }

  withInput(value: number): this {
    this.inputs.push(value);
    return this;
  }

  withOutput(function_: OutputCallback): this {
    this.outputCallback = function_;
    return this;
  }
}
