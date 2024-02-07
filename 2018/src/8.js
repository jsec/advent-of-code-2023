const { getSplitInput } = require('./util/input')

const p1 = input => {
  const children = input.shift()
  const metas = input.shift()

  let result = 0

  for (let _ = 0; _ < children; _++) {
    result += p1(input)
  }

  for (let _ = 0; _ < metas; _++) {
    result += input.shift()
  }

  return result
}

const p2 = input => {
  const children = input.shift()
  const metas = input.shift()

  if (children) {
    const childTree = []
    for (let _ = 0; _ < children; _++) {
      childTree.push(p2(input))
    }

    const metaTree = []
    for (let _ = 0; _ < metas; _++) {
      metaTree.push(input.shift())
    }

    let result = 0
    for (const meta of metaTree) {
      const idx = meta - 1
      if (idx >= 0 && idx < childTree.length) {
        result += childTree[idx]
      }
    }

    return result
  } else {
    let result = 0

    for (let _ = 0; _ < metas; _++) {
      result += input.shift()
    }

    return result
  }
}

const input = getSplitInput(' ').map(p => parseInt(p))
const inputCopy = input.slice()

console.log('P1:', p1(input))
console.log('P2:', p2(inputCopy))
