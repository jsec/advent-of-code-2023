const { getInputLines } = require('./util/input')

const setup = () => {
  const map = {}

  const relations = getInputLines()
    .map(line =>
      [...line
        .matchAll(/(?<=step )/ig)]
        .map(i => line[i.index])
    )

  for (const [prereq, dependent] of relations) {
    if (!map[prereq]) {
      map[prereq] = []
    }

    if (!map[dependent]) {
      map[dependent] = []
    }

    map[dependent].push(prereq)
  }

  return map
}

const p1 = map => {
  const seen = []
  const keys = Object.keys(map)

  while (seen.length !== keys.length) {
    const available = Object.keys(map).filter(key =>
      !seen.includes(key) && map[key].every(d => seen.includes(d))
    )

    if (available.length === 0) {
      break
    }

    seen.push(available.sort()[0])
  }

  return seen.join('')
}

const map = setup()
const order = p1(map)
console.log('P1:', order)
