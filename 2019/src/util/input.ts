import { readFileSync } from 'fs'

export const getRawInput = () => readFileSync('input.txt', 'utf8')

export const getInput = () => getRawInput().trim()

export const getSplitInput = (delimiter = '\n') => getInput().split(delimiter)

export const getInputLines = () => getSplitInput().map(s => s.trim())
