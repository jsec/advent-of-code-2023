import { getInput } from './util/input'
import { areCharsUnique } from './util/string'

const findMarker = (buffer: string, markerSize: number) => {
  for (let i = markerSize - 1; i < buffer.length - 3; i++) {
    if (areCharsUnique(buffer.substring(i, i + markerSize))) {
      return i + markerSize
    }
  }
}

const input = getInput()
const p1 = findMarker(input, 4)
const p2 = findMarker(input, 14)

console.log('P1:', p1)
console.log('P2:', p2)
