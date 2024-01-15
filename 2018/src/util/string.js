const areCharsUnique = value => {
  return new Set(value).size === value.length
}

module.exports = {
  areCharsUnique,
}
