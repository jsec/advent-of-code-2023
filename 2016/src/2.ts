import { getInputLines } from './util/input'

const p1Keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const p2Keypad = [
  ['', '', '1', '', ''],
  ['', '2', '3', '4', ''],
  ['5', '6', '7', '8', '9'],
  ['', 'A', 'B', 'C', ''],
  ['', '', 'D', '', ''],
]

const moveMap = {
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
  U: [-1, 0],
}

let keys: number[] = []

const move = (moves: string, current: number[], p2 = false): number[] => {
  const keypad = p2 ? p2Keypad : p1Keypad
  for (const move of moves) {
    const pos = [...current].map((p, idx) => p + moveMap[move][idx])
    const max = p2 ? 4 : 2
    if (pos[0] < 0 || pos[1] < 0 || pos[0] > max || pos[1] > max) {
      continue
    }

    if (p2 && keypad[pos[0]][pos[1]] === '') {
      continue
    }

    current = pos
  }

  keys.push(keypad[current[0]][current[1]])
  return current
}

const input = getInputLines()
let current = [1, 1]
for (const moves of input) {
  current = move(moves, current)
}

console.log('P1:', keys.join(''))

keys = []
current = [2, 0]
for (const moves of input) {
  current = move(moves, current, true)
}

console.log('P2:', keys.join(''))
