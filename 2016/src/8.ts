import { rotate, transpose } from './util/array'
import { Grid } from './util/grid'
import { getInputLines } from './util/input'

interface Command {
  axis?: string
  index?: number
  length?: number
  op: string
  size?: {
    x: number
    y: number
  }
}

const parse = (cmd: string): Command => {
  const split = cmd.split(' ')
  if (split.length === 2) {
    const [y, x] = split[1]!.split('x')
    return {
      op: split[0]!,
      size: {
        x: parseInt(x!),
        y: parseInt(y!),
      },
    }
  }

  return {
    axis: split[1]!,
    index: parseInt(split[2]!.at(-1)!),
    length: parseInt(split[4]!),
    op: split[0]!,
  }
}

const p1 = (commands: Command[]): number => {
  const grid = new Grid(6, 50, '.')

  for (const cmd of commands) {
    switch (cmd.op) {
      case 'rect':
        for (let x = 0; x < cmd.size!.x; x++) {
          for (let y = 0; y < cmd.size!.y; y++) {
            grid.set(x, y, '#')
          }
        }
        break
      case 'rotate':
        switch (cmd.axis) {
          case 'row':
            grid.shiftRow(cmd.index, cmd.length)
            break
          case 'column':
            grid.shiftCol(cmd.index, cmd.length)
          default:
            break
        }
    }

    console.log()
    console.log('cmd:', cmd)
    console.log('---------------------------------------------')
    grid.print()
  }

  return grid.count('#')
}

const commands = getInputLines().map(parse)
console.log('P1:', p1(commands))
