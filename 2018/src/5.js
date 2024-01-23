const { getInput } = require('./util/input')

const p2 = polymer => {
  const pairs = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(a => react(polymer.replaceAll(a, '').replaceAll(a.toUpperCase(), '')).length)

  return Math.min(...pairs)
}

const react = polymer => {
  let i = 0
  while (polymer[i + 1]) {
    let curr = polymer.charCodeAt(i)
    let next = polymer.charCodeAt(i + 1)

    /*
     * lowercase/uppercase letters are always separated by 32
     * in the ASCII table
     */
    if (Math.abs(curr - next) === 32) {
      polymer = polymer.substring(0, i) + polymer.substring(i + 2, polymer.length)
      i--
    } else {
      i++
    }
  }

  return polymer
}

const input = getInput()
const polymer = react(input)

console.log('P1:', polymer.length)
console.log('P2:', p2(input))
