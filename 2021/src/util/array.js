const chunk = (arr, size = 1) =>
  Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )

const sortArray = (arr, asc = true) => {
  if (asc) {
    return arr.sort((a, b) => a - b)
  }

  return arr.sort((a, b) => b - a)
}

const zip = arrays => {
  return Array.from({
    length: Math.max(...arrays.map(a => a.length)),
  }, (_, i) => arrays.map(a => a[i]))
}

const rotate = matrix => {
  return matrix[0].map((_, idx) => matrix.map(row => row[idx]).reverse())
}

const flatten = (acc = [], item) => {
  if (Array.isArray(item)) {
    return item.reduce(flatten, acc)
  }
  acc.push(item)
  return acc
}

const dedupe = arr => {
  return Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)
}

module.exports = {
  chunk,
  dedupe,
  flatten,
  rotate,
  sortArray,
  zip,
}
