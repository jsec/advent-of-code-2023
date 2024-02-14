const { pairwise } = require('./util/array')
const { getInput } = require('./util/input')
const { charCount } = require('./util/string')

const parseInput = () => {
  let [template, rules] = getInput().split('\n\n')

  rules = rules
    .split('\n')
    .map(line => line.split(' -> '))
    .reduce((a, c) => {
      a[c[0]] = c[1]
      return a
    }, {})

  return {
    rules,
    template,
  }
}

const insert = (rules, template) => {
  const pairs = pairwise(template.split(''))

  const arr = pairs.map((pair, idx) => {
    const key = pair.join('')
    if (key in rules) {
      const updated = [pair[0], rules[key]]
      if (idx === pairs.length - 1) {
        updated.push(pair[1])
      }
      return updated
    }

    if (idx !== pairs.length - 1) {
      pair.pop()
    }

    return pair
  })

  return arr.flat(Infinity).join('')
}

const analyze = template => {
  const counts = Object.values(charCount(template))

  return Math.max(...counts) - Math.min(...counts)
}

const p1 = (rules, template) => {
  let i = 0
  while (i < 10) {
    template = insert(rules, template)
    i++
  }

  return analyze(template)
}

let { rules, template } = parseInput()

console.log('P1:', p1(rules, template))
