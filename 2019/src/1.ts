import { A, F, N, R, pipe } from '@mobily/ts-belt'

import { getInputLines } from './util/input'

const getFuel = (mass: string) => pipe(
  parseInt(mass),
  N.divide(3),
  Math.floor,
  N.subtract(2)
)

const input = R.getWithDefault(getInputLines(), [])

pipe(
  input,
  A.map(getFuel),
  A.reduce(0, (a, c) => a + c),
  F.tap(ans => console.log('P1:', ans))
)
