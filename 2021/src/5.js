const { getInputLines } = require('./util/input')

const addToMap = (map, value) => {
  if (!map.has(value)) {
    map.set(value, 0)
  }

  map.set(value, map.get(value) + 1)
}

const run = (input, p2 = false) => {
  const map = new Map()

  for (const values of input) {
    const [[x1, y1], [x2, y2]] = values

    if (x1 === x2) {
      const min = Math.min(y1, y2)
      const max = Math.max(y1, y2)

      for (let y = min; y <= max; y++) {
        addToMap(map, `x${x1}y${y}`)
      }
    } else if (y1 === y2) {
      const min = Math.min(x1, x2)
      const max = Math.max(x1, x2)

      for (let x = min; x <= max; x++) {
        addToMap(map, `x${x}y${y1}`)
      }
    } else if (p2) {
      let steps = Math.abs(x1 - x2)

      const dirX = x1 > x2 ? -1 : 1
      const dirY = y1 > y2 ? -1 : 1

      let x = x1
      let y = y1
      addToMap(map, `x${x}y${y}`)

      while (steps--) {
        x += dirX
        y += dirY
        addToMap(map, `x${x}y${y}`)
      }
    }
  }

  return map
}

const solve = map => {
  let agg = 0
  for (const value of map.values()) {
    if (value > 1) {
      agg += 1
    }
  }

  return agg
}

const input = getInputLines().map(line =>
  line.split(' -> ').map(s => s.trim().split(',').map(i => parseInt(i)))
)

const p1 = run(input)
const p2 = run(input, true)

console.log('P1:', solve(p1))
console.log('P2:', solve(p2))
