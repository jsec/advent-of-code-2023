import { getSplitInput } from './util/input'

let cardScores = {
  X: 1,
  Y: 2,
  Z: 3,
}

let strategyMap = {
  X: {
    A: 3,
    B: 0,
    C: 6,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
  },
}

const cards = getSplitInput().map(line => line.split(' '))

const calculate = (cards: string[][]) => {
  return cards
    .map(cards => cardScores[cards[1]] + strategyMap[cards[1]][cards[0]])
    .reduce((acc, curr) => acc + curr, 0)
}

console.log('P1:', calculate(cards))

cardScores = {
  X: 0,
  Y: 3,
  Z: 6,
}

strategyMap = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
}

console.log('P2:', calculate(cards))
