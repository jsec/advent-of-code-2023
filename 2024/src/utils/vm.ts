export class VM {
  private _outputs: bigint[];
  private ptr = 0;
  private registers: { a: bigint; b: bigint; c: bigint };

  constructor(a: bigint, b: bigint, c: bigint) {
    this.registers = { a, b, c };
    this._outputs = [];
  }

  private adv(operand: bigint) {
    const combo = this.getComboOperand(operand)!;
    this.registers.a = this.registers.a / (2n ** combo);
    this.ptr += 2;
  }

  private bdv(operand: bigint) {
    const combo = this.getComboOperand(operand)!;
    this.registers.b = this.registers.a / (2n ** combo);
    this.ptr += 2;
  }

  private bst(operand: bigint) {
    const combo = this.getComboOperand(operand);
    this.registers.b = combo % 8n;
    this.ptr += 2;
  }

  private bxc() {
    this.registers.b = this.registers.b ^ this.registers.c;
    this.ptr += 2;
  }

  private bxl(operand: bigint) {
    this.registers.b = this.registers.b ^ operand;
    this.ptr += 2;
  }

  private cdv(operand: bigint) {
    const combo = this.getComboOperand(operand)!;
    this.registers.c = this.registers.a / (2n ** combo);
    this.ptr += 2;
  }

  private exec(opcode: bigint, operand: bigint) {
    switch (opcode) {
      case 0n: {
        this.adv(operand);
        break;
      }
      case 1n: {
        this.bxl(operand);
        break;
      }
      case 2n: {
        this.bst(operand);
        break;
      }
      case 3n: {
        this.jnz(operand);
        break;
      }
      case 4n: {
        this.bxc();
        break;
      }
      case 5n: {
        this.out(operand);
        break;
      }
      case 6n: {
        this.bdv(operand);
        break;
      }
      case 7n: {
        this.cdv(operand);
        break;
      }
      default: {
        throw new Error(`invalid opcode: ${opcode}`);
      }
    }
  }

  private getComboOperand(operand: bigint) {
    switch (operand) {
      case 0n:
      case 1n:
      case 2n:
      case 3n: {
        return operand;
      }
      case 4n: {
        return this.registers.a;
      }
      case 5n: {
        return this.registers.b;
      }
      case 6n: {
        return this.registers.c;
      }
      default: {
        throw new Error(`invalid operand: ${operand}`);
      }
    }
  }

  private jnz(operand: bigint) {
    if (this.registers.a === 0n) {
      this.ptr += 2;
      return;
    }

    this.ptr = Number(operand);
  }

  private out(operand: bigint) {
    const combo = this.getComboOperand(operand);
    this._outputs.push(combo % 8n);
    this.ptr += 2;
  }

  run(program: bigint[]) {
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
