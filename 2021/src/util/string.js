const areCharsUnique = value => {
  return new Set(value).size === value.length
}

const charCount = value => {
  return value.split('').reduce((a, c) => {
    a[c] = (a[c] || 0) + 1
    return a
  }, {})
}

module.exports = {
  areCharsUnique,
  charCount,
}
