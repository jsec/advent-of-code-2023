const { readFileSync } = require('fs')

const getInput = () => {
  return readFileSync('input.txt', 'utf8').trim()
}

const getSplitInput = (delimiter = '\n') => {
  return getInput().split(delimiter)
}

const getInputLines = () => {
  return getSplitInput().map(l => l.trim())
}

module.exports = {
  getInput,
  getInputLines,
  getSplitInput,
}
