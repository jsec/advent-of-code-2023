import { A, R, S, pipe } from '@mobily/ts-belt'
import { readFileSync } from 'fs'

export const getRawInput = () =>
  R.fromExecution(() => readFileSync('input.txt', 'utf8'))

export const getInput = () => pipe(
  getRawInput(),
  R.map(S.trim)
)

export const getSplitInput = (delimiter = '\n') => pipe(
  getInput(),
  R.map(S.split(delimiter))
)

export const getInputLines = () => pipe(
  getSplitInput(),
  R.map(A.map(l => l.trim()))
)
