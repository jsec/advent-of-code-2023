import { getRawInput } from './util/input'

interface Step {
  count: number
  dest: number
  source: number
}

const [initialStacks, procedure] = getRawInput().split('\n\n')
const steps: Step[] = procedure!.trim().split('\n').map(line => line.trim().split(' ').map(i => parseInt(i)).filter(i => !isNaN(i))).map((step) => {
  return {
    count: step[0]!,
    dest: step[2]! - 1,
    source: step[1]! - 1,
  }
})

let parsedStacks = initialStacks!.split('\n').slice(0, -1)
const maxLen = Math.max(...parsedStacks.map(s => s.length))
parsedStacks = parsedStacks.map(s => s.padEnd(maxLen))
const stackCount = (maxLen + 1) / 4
const stacks: string[][] = Array(stackCount).fill([])

for (let i = 0; i < stackCount; i++) {
  stacks[i] = parsedStacks.map(p => p[i * 4 + 1]).filter(p => p && p !== ' ').reverse()
}

const p1 = (stacks: string[][], steps: Step[]): string => {
  for (const step of steps) {
    for (let i = 0; i < step.count; i++) {
      const elem = stacks[step.source]!.pop() as string
      stacks[step.dest]!.push(elem)
    }
  }

  return stacks.map(s => s.pop()).join('')
}

const p2 = (stacks: string[][], steps: Step[]): string => {
  for (const step of steps) {
    const elems = stacks[step.source]!.splice(-step.count, step.count)
    stacks[step.dest]!.push(...elems)
  }

  return stacks.map(s => s.pop()).join('')
}

const stackCopy = JSON.parse(JSON.stringify(stacks))

console.log('P1:', p1(stacks, steps))
console.log('P2:', p2(stackCopy, steps))
