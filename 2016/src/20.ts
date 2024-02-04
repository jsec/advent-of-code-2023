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

const run = (ranges: Range[], p2 = false) => {
  let i = 0
  let count = 0


  while (i < 4294967295) {
    const blacklists = ranges.filter(r => i >= r.min && i <= r.max)

    if (blacklists.length == 0) {
      if (!p2) {
        return i
      }

      count++
      i++
      continue
    }

    i = Math.max(...blacklists.map(b => b.max)) + 1
  }

  return count
}

console.log('P1:', run(ranges))
console.log('P2:', run(ranges, true))
