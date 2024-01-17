import { permutations } from './util/array'
import { getInputLines } from './util/input'

const input = getInputLines()
  .map(l => l
    .split(' ')
    .filter(x => x !== '')
    .map(n => parseInt(n)))

const p1 = input
  .map((arr) => {
    const p = permutations(arr)
    return p.every(a => a[0]! + a[1]! > a[2]!)
  })
  .filter(r => r === true)
  .length

console.log('P1:', p1)

// PART 2
// Zip the arrays, then chunk each zip by three and send it through the same logic
