import { Position, hashPosition, manhattan, unhashPosition } from './util/grid'
import { getInputLines } from './util/input'

interface Step {
  direction: string
  length: number
}

const DIRECTIONS = {
  D: { x: 1, y: 0 },
  L: { x: 0, y: -1 },
  R: { x: 0, y: 1 },
  U: { x: -1, y: 0 },
}

const generatePath = (steps: Step[]): string[] => {
  const currentPos = { x: 0, y: 0 }
  const path: string[] = []

  for (const step of steps) {
    const { x, y } = DIRECTIONS[step.direction]

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let _ = 0; _ < step.length; _++) {
      currentPos.x += x
      currentPos.y += y
      path.push(hashPosition(currentPos))
    }
  }

  return path
}

const findIntersections = (wires: string[][]): Position[] => {
  const sets = wires.map(w => new Set(w))

  return wires[0]!
    .filter(v => sets
      .slice(1)
      .every(w => w.has(v))
    ).map(unhashPosition)
}

const p1 = (wires: string[][]): number => {
  const distances = findIntersections(wires).map(pos => manhattan(pos, { x: 0, y: 0 }))
  return Math.min(...distances)
}

const p2 = (wires: string[][]): number => {
  const sums = findIntersections(wires).map(p =>
    wires.map(w => w.indexOf(hashPosition(p)) + 1)
      .reduce((a, c) => a + c, 0))

  return Math.min(...sums)
}

const wires = getInputLines()
  .map(line => line
    .split(',')
    .map((str) => {
      return {
        direction: str[0]!,
        length: parseInt(str.slice(1)),
      }
    }))
  .map(generatePath)

console.log('P1:', p1(wires))
console.log('P2:', p2(wires))
