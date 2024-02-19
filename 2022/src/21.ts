import { getInputLines } from './util/input'

const monkeys = getInputLines()
  .map(line => line.split(': '))
  .reduce((a, c) => {
    a[c[0]] = c[1]
    return a
  }, {})

const getValue = (name: string, p2 = false) => {
  const value = monkeys[name] as string

  if (!isNaN(+Number(value))) {
    return value
  }

  const others = value.split(' ')
  const first = others[0]
  const second = others[2]

  const expression = value.replace(first!, getValue(first!)).replace(second!, getValue(second!))
  return eval(expression)
}

console.log('P1:', getValue('root'))
