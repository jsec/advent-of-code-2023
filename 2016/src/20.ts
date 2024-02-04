import { getInputLines } from "./util/input"

interface Range {
  max: number
  min: number
}

const ranges: Range[] = getInputLines()
  .map(line => line
    .split('-')
    .map(i => parseInt(i))
  ).map((s) => ({ 
    max: s[1]!,
    min: s[0]!, 
  }))

const p1 = (ranges: Range[]) => {
  let i = 0

  while (true) {
    const blacklists = ranges.filter(r => i >= r.min && i <= r.max)

    if (blacklists.length == 0) {
      return i
    }

    i = Math.max(...blacklists.map(b => b.max)) + 1
  }
}

const p2 = (ranges: Range[]) => {
  let i = 0
  let count = 0


  while (i < 4294967295) {
    const blacklists = ranges.filter(r => i >= r.min && i <= r.max)

    if (blacklists.length == 0) {
      count++
      i++
      continue
    }

    i = Math.max(...blacklists.map(b => b.max)) + 1
  }

  return count
}

console.log('P1:', p1(ranges))
console.log('P2:', p2(ranges))
