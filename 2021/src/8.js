const { getInputLines } = require('./util/input')

const decode = input => {
  const spec = input.map(i => i.split(''))

  const one = spec.find(b => b.length === 2)
  const three = spec.find(b => b.length === 5 && one.every(o => b.includes(o)))
  const four = spec.find(b => b.length === 4)
  const two = spec.find(b => b.length === 5 && four.filter(f => b.includes(f)).length === 2)
  const zero = spec.find(b =>
    b.length === 6 && four.filter(t => b.includes(t)).length === 3 && one.every(o => b.includes(o))
  )
  const five = spec.find(b =>
    b.length === 5 && one.some(o => !b.includes(o)) && four.filter(f => b.includes(f)).length === 3
  )
  const six = spec.find(b => b.length === 6 && one.some(o => !b.includes(o)))
  const seven = spec.find(b => b.length === 3)
  const eight = spec.find(b => b.length === 7)
  const nine = spec.find(b => b.length === 6 && four.every(i => b.includes(i)))

  return [
    {
      chars: zero,
      value: 0,
    },
    {
      chars: one,
      value: 1,
    },
    {
      chars: two,
      value: 2,
    },
    {
      chars: three,
      value: 3,
    },
    {
      chars: four,
      value: 4,
    },
    {
      chars: five,
      value: 5,
    },
    {
      chars: six,
      value: 6,
    },
    {
      chars: seven,
      value: 7,
    },
    {
      chars: eight,
      value: 8,
    },
    {
      chars: nine,
      value: 9,
    },
  ]
}

const p1 = input =>
  input.map(i => i[1].filter(x => [2, 3, 4, 7].includes(x.length)).length).reduce(
    (a, c) => a + c,
    0,
  )

const p2 = input => {
  return input.reduce((a, c) => {
    const [spec, display] = c
    const lookup = decode(spec)

    const displayValues = display.map(d => {
      const chars = d.split('')
      return lookup.find(l =>
        l.chars.length === chars.length && chars.every(c => l.chars.includes(c))
      )
        .value
    })

    a += parseInt(displayValues.join(''))
    return a
  }, 0)
}

const input = getInputLines().map(l => l.split(' | ').map(m => m.trim().split(' ')))

console.log('P1:', p1(input))
console.log('p2:', p2(input))
