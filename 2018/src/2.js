const { getInputLines } = require('./util/input')
const { diffByIndex } = require('./util/string')

const getChecksum = (boxes, count) => {
  return boxes.map(box => {
    for (const char of box) {
      if (box.split(char).length - 1 === count) {
        return true
      }
    }

    return false
  }).filter(b => b === true)
    .length
}

const getCommonLetters = boxes => {
  for (const orig of boxes) {
    for (const comp of boxes) {
      if (comp === orig) {
        continue
      }

      const diff = diffByIndex(orig, comp)
      if (diff.length === 1) {
        return orig.slice(0, diff[0]) + orig.slice(diff[0] + 1)
      }
    }
  }
}

const boxes = getInputLines()

const p1 = getChecksum(boxes, 2) * getChecksum(boxes, 3)
console.log('P1:', p1)

const p2 = getCommonLetters(boxes)
console.log('P2:', p2)
