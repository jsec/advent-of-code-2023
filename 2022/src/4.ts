import { sortArray } from './util/array'
import { getInputLines } from './util/input'

const getAssignments = (line: string): number[][] => {
  const assignments = []
  for (const ids of line.split(',')) {
    const [start, end] = ids.split('-').map(x => parseInt(x))
    const sections = [start!, end!]
    for (let i = start! + 1; i < end!; i++) {
      sections.push(i)
    }

    assignments.push(sortArray(sections, true))
  }

  return assignments
}

const findOverlap = (assignments: number[][], full = false) => {
  const [first, second] = assignments
  if (full) {
    return first?.every(f => second?.includes(f)) || second?.every(s => first?.includes(s))
  }

  return first?.some(f => second?.includes(f)) || second?.some(s => first?.includes(s))
}

const pairs = getInputLines()
  .map(getAssignments)

const p1 = pairs
  .map(a => findOverlap(a, true))
  .filter(p => p)
  .length

console.log('P1:', p1)

const p2 = pairs
  .map(a => findOverlap(a))
  .filter(p => p)
  .length

console.log('P2:', p2)
