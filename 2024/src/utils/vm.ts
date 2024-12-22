export class VM {
  private _outputs: number[];
  private ptr = 0;
  private registers: { a: number; b: number; c: number };

  constructor(a: number, b: number, c: number) {
    this.registers = { a, b, c };
    this._outputs = [];
  }

  private adv(operand: number) {
    const combo = this.getComboOperand(operand)!;
    this.registers.a = Math.floor(this.registers.a / (2 ** combo));
    this.ptr += 2;
  }

  private bdv(operand: number) {
    const combo = this.getComboOperand(operand)!;
    this.registers.b = Math.floor(this.registers.a / (2 ** combo));
    this.ptr += 2;
  }

  private bst(operand: number) {
    const combo = this.getComboOperand(operand);
    this.registers.b = combo % 8;
    this.ptr += 2;
  }

  private bxc() {
    this.registers.b = this.registers.b ^ this.registers.c;
    this.ptr += 2;
  }

  private bxl(operand: number) {
    this.registers.b = this.registers.b ^ operand;
    this.ptr += 2;
  }

  private cdv(operand: number) {
    const combo = this.getComboOperand(operand)!;
    this.registers.c = Math.floor(this.registers.a / (2 ** combo));
    this.ptr += 2;
  }

  private exec(opcode: number, operand: number) {
    switch (opcode) {
      case 0: {
        this.adv(operand);
        break;
      }
      case 1: {
        this.bxl(operand);
        break;
      }
      case 2: {
        this.bst(operand);
        break;
      }
      case 3: {
        this.jnz(operand);
        break;
      }
      case 4: {
        this.bxc();
        break;
      }
      case 5: {
        this.out(operand);
        break;
      }
      case 6: {
        this.bdv(operand);
        break;
      }
      case 7: {
        this.cdv(operand);
        break;
      }
      default: {
        throw new Error(`invalid opcode: ${opcode}`);
      }
    }
  }

  private getComboOperand(operand: number) {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3: {
        return operand;
      }
      case 4: {
        return this.registers.a;
      }
      case 5: {
        return this.registers.b;
      }
      case 6: {
        return this.registers.c;
      }
      default: {
        throw new Error(`invalid operand: ${operand}`);
      }
    }
  }

  private jnz(operand: number) {
    if (this.registers.a === 0) {
      this.ptr += 2;
      return;
    }

    this.ptr = operand;
  }

  private out(operand: number) {
    const combo = this.getComboOperand(operand);
    this._outputs.push(combo % 8);
    this.ptr += 2;
  }

  run(program: number[]) {
    this.ptr = 0;

    while (this.ptr < program.length - 1) {
      const opcode = program[this.ptr];
      const operand = program[this.ptr + 1];
      this.exec(opcode!, operand!);
    }
  }

  get outputs() {
    return this._outputs;
  }
}
