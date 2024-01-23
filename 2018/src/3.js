const { getInputLines } = require('./util/input')
const { dedupe } = require('./util/array')

const parseInput = line => {
  const split = line.split(' ')
  const id = split[0].slice(1)
  const [x, y] = split[2].slice(0, -1).split(',').map(s => parseInt(s, 10))
  const [dx, dy] = split[3].split('x').map(s => parseInt(s, 10))

  return {
    dx: x + dx,
    dy: y + dy,
    id,
    x,
    y,
  }
}

const run = claims => {
  const map = {}

  for (const claim of claims) {
    for (let x = claim.x; x < claim.dx; x++) {
      for (let y = claim.y; y < claim.dy; y++) {
        const key = `${x}-${y}`
        if (!map[key]) {
          map[key] = []
        }

        map[key].push(claim.id)
      }
    }
  }

  return map
}

const claims = getInputLines().map(parseInput)
const map = run(claims)

const overlaps = Object.values(map).filter(x => x.length > 1)
const overlappedIds = dedupe(overlaps.flat(Infinity))
const singles = Object.values(map).filter(x => x.length === 1)
const singleIds = dedupe(singles.flat(Infinity))

console.log('P1:', overlaps.length)
console.log('P2:', singleIds.find(i => !overlappedIds.includes(i)))
