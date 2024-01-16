const areCharsUnique = value => {
  return new Set(value).size === value.length
}

const diffByIndex = (string1, string2) => {
  const a = string1.split('')
  const b = string2.split('')

  return b.reduce((diff, word, pos) => (word != a[pos] && diff.push(pos), diff), [])
}

module.exports = {
  areCharsUnique,
  diffByIndex,
}
