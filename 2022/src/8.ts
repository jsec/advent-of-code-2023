import { getInputLines } from './util/input'

const trees = getInputLines().map(line => line.split('').map(l => parseInt(l)))

const visibleLeft = (trees, x, y): boolean => {
  const size = trees[x][y]
  for (let i = 0; i < y; i++) {
    if (y !== i && trees[x][i] >= size) {
      return false
    }
  }

  return true
}

const visibleRight = (trees, x, y): boolean => {
  const size = trees[x][y]
  for (let i = y; i < trees.length; i++) {
    if (y !== i && trees[x][i] >= size) {
      return false
    }
  }

  return true
}

const visibleDown = (trees, x, y): boolean => {
  const size = trees[x][y]
  for (let i = x; i < trees.length; i++) {
    if (x !== i && trees[i][y] >= size) {
      return false
    }
  }

  return true
}

const visibleUp = (trees, x, y): boolean => {
  const size = trees[x][y]
  for (let i = 0; i < x; i++) {
    if (x !== i && trees[i][y] >= size) {
      return false
    }
  }

  return true
}

const isVisible = (trees, x, y): number => {
  let score = 0

  if (visibleUp(trees, x, y)) {
    score += x
  }

  if (visibleDown(trees, x, y)) {
    score += trees.length - x - 1
  }

  if (visibleLeft(trees, x, y)) {
    score += y
  }

  if (visibleRight(trees, x, y)) {
    score += trees.length - y - 1
  }

  return score
}

let visible = 4 * (trees.length - 1)

for (let x = 1; x < trees.length - 1; x++) {
  for (let y = 1; y < trees.length - 1; y++) {
    if (isVisible(trees, x, y) !== 0) {
      visible += 1
    }
  }
}

console.log('P1:', visible)
