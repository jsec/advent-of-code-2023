import { readFileSync } from 'fs'
import { map, pipe } from 'remeda'

export const getRawInput = () => readFileSync('input.txt', 'utf8')

export const getInput = () => getRawInput().trim()

export const getSplitInput = (delimiter = '\n') => getInput().split(delimiter)

export const getInputLines = (): string[] => pipe(
  getSplitInput(),
  map(s => s.trim())
)
