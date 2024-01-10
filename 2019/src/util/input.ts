import { A, S, pipe } from '@mobily/ts-belt'
import { readFileSync } from 'fs'

export const getRawInput = () => readFileSync('input.txt', 'utf8')

export const getInput = () => pipe(
  getRawInput(),
  S.trim
)

export const getSplitInput = (delimiter = '\n') =>
  A.initOrEmpty(getInput().split(delimiter))

export const getInputLines = () => pipe(
  getSplitInput(),
  A.map(l => l.trim())
)
