import { getSplitInput } from './util/input'

const tick = (fishes: number[]): number[] => {
  const newFishes: number[] = []

  fishes = fishes.map(fish => {
    if (fish === 0) {
      newFishes.push(8)
      return 6
    }

    return fish - 1
  })

  return fishes.concat(newFishes)
}

const run = (fishes: number[], ticks: number): number[] => {
  for (let t = 0; t < ticks; t++) {
    fishes = tick(fishes)
  }

  return fishes
}

const input = getSplitInput(',').map(i => parseInt(i))

const p1 = run(input, 80).length
console.log('P1:', p1)
