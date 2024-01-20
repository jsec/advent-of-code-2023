import { Grid } from './util/grid'
import { getInputLines } from './util/input'

const run = (commands: string[]): number => {
  const grid = new Grid(6, 50, ' ')

  for (const cmd of commands) {
    const params = cmd.split(/[a-z =]+/).map(d => parseInt(d, 10))
    const param1 = params[1]!
    const param2 = params[2]!

    if (cmd.startsWith('rect')) {
      grid.setRect(param1, param2, '#')
    }
    else if (cmd.startsWith('rotate')) {
      if (cmd.includes('row')) {
        grid.shiftRow(param1, param2)
      }
      else {
        grid.shiftColumn(param1, param2)
      }
    }
  }

  // P2 is just printing the screen
  grid.print()

  return grid.count('#')
}

const commands = getInputLines()
console.log('P1:', run(commands))
