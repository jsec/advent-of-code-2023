const { getInputLines } = require('./util/input')
const { dedupe } = require('./util/array')

const getLines = input => {
  const map = []
  for (const line of input) {
    const [[startX, startY], [endX, endY]] = line
    if (startX !== endX && startY !== endY) {
      continue
    }

    map.push([startX, startY])
    map.push([endX, endY])

    let startIdx, endIdx

    if (startX !== endX) {
      startIdx = startX < endX ? startX : endX
      endIdx = startX > endX ? startX : endX

      for (let i = startIdx + 1; i < endIdx; i++) {
        map.push([i, endY])
      }
    } else {
      startIdx = startY < endY ? startY : endY
      endIdx = startY > endY ? startY : endY

      for (let i = startIdx + 1; i < endIdx; i++) {
        map.push([endX, i])
      }
    }
  }

  return map
}

const input = getInputLines().map(line =>
  line.split(' -> ').map(s => s.trim().split(',').map(i => parseInt(i)))
)

const map = getLines(input)
console.log('len:', map.length)

const p1 = map.length - dedupe(map).length
console.log('P1:', p1)
