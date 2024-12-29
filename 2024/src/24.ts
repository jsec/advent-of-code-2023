import { getSplitInput } from './utils/input.js';

type OP = 'AND' | 'OR' | 'XOR';

interface Gate {
  done: boolean;
  left: string;
  op: OP;
  output: string;
  right: string;
}

interface Wire {
  name: string;
  value: number;
}

const parseInput = (): { gates: Gate[]; initialState: Wire[] } => {
  const input = getSplitInput('\n\n');

  const initialState = input[0]!.split('\n').map((line) => {
    const split = line.split(': ');

    return {
      name: split[0]!,
      value: Number(split[1]!),
    };
  });

  const gates = input[1]!.split('\n').map((line) => {
    const split = line.split(' -> ');
    const [left, op, right] = split[0]!.split(' ');

    return {
      done: false,
      left: left!,
      op: op! as OP,
      output: split[1]!,
      right: right!,
    };
  });

  return { gates, initialState };
};

const p1 = (initialState: Wire[], gates: Gate[]) => {
  const activatedWires = [...initialState];

  while (gates.some(g => !g.done)) {
    for (const gate of gates) {
      // if the gate has already been fired, skip
      if (gate.done) {
        continue;
      }

      const left = activatedWires.find(wire => wire.name === gate.left);
      const right = activatedWires.find(wire => wire.name === gate.right);

      // if either of the gate's inputs have not been fired yet, skip
      if (!left || !right) {
        continue;
      }

      // this gate is newly activated, compute the output and add the output wire
      // to the list of activated wires
      let output: number;

      switch (gate.op) {
        case 'AND': {
          output = right.value & left.value;
          break;
        }
        case 'OR': {
          output = right.value | left.value;
          break;
        }
        case 'XOR': {
          output = right.value ^ left.value;
          break;
        }
      }

      activatedWires.push({ name: gate.output, value: output });
      gate.done = true;
    }
  }

  const result = activatedWires
    .filter(wire => wire.name.startsWith('z'))
    .sort((a, b) => a.name.localeCompare(b.name))
    .reverse()
    .map(wire => wire.value)
    .join('');

  return Number.parseInt(result, 2);
};

const p2 = (gates: Gate[]) => {
  const swaps: string[] = [];

  for (let i = 0; i < 45; i++) {
    const id = i.toString().padStart(2, '0');
    const xid = `x${id}`;
    const yid = `y${id}`;
    const zid = `z${id}`;

    const xor = gates.find(gate => (
      (gate.left === xid && gate.right === yid)
      || (gate.left === yid && gate.right === xid)) && gate.op === 'XOR');

    const and = gates.find(gate => (
      (gate.left === xid && gate.right === yid)
      || (gate.left === yid && gate.right === xid)) && gate.op === 'AND');

    const outputGate = gates.find(gate => gate.output === zid);

    if (!xor || !and || !outputGate) {
      continue;
    }

    if (outputGate.op !== 'XOR') {
      swaps.push(outputGate.output);
    }

    const or = gates.find(gate => gate.left === and.output || gate.right === and.output);

    if (or && or.op !== 'OR' && i > 0) {
      swaps.push(and.output);
    }

    const after = gates.find(gate => gate.left === xor.output || gate.right === xor.output);

    if (after?.op === 'OR') {
      swaps.push(xor.output);
    }
  }

  swaps.push(...gates.filter(gate =>
    !/[xy]/g.test(gate.left![0]!)
    && !/[xy]/g.test(gate.right![0]!)
    && !/[z]/g.test(gate.output![0]!)
    && gate.op === 'XOR')
    .map(gate => gate.output));

  return swaps.sort().join(',');
};

const { gates, initialState } = parseInput();

console.log('P1:', p1(initialState, gates));
console.log('P2:', p2(gates));
