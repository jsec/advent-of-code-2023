import { getInputLines } from './util/input'

interface Address {
  bad: string[]
  good: string[]
}

const hasAbba = (test: string): boolean => !!(/([a-z])(?!\1)([a-z])\2\1/.exec(test))

const parseAddress = (address: string): Address => {
  const sections = address.replaceAll('[', ']').split(']')
  const bad = sections.filter((_, idx) => idx % 2 !== 0)
  const good = sections.filter((_, idx) => idx % 2 === 0)
  return { bad, good }
}

const addresses = getInputLines().map(parseAddress)

const p1 = addresses.filter(a => !a.bad.some(hasAbba) && a.good.some(hasAbba)).length
console.log('P1:', p1)
