import { getInput } from './util/input'

const counts = {
  E: 0,
  N: 0,
  S: 0,
  W: 0,
}

const resolver = {
  L: {
    E: 'N',
    N: 'W',
    S: 'E',
    W: 'S',
  },
  R: {
    E: 'S',
    N: 'E',
    S: 'W',
    W: 'N',
  },
}

const p1 = (steps: string[]): number => {
  let current = 'N'

  for (const step of steps) {
    const direction = step.slice(0, 1)
    const length = parseInt(step.slice(1))

    current = resolver[direction][current]
    counts[current] += length
  }

  return Math.abs(counts.E - counts.W) + Math.abs(counts.N - counts.S)
}

const p2 = (steps: string[]): number => {
  let currentDirection = 'N'
  let currentPos = [0, 0]
  const seen: string[] = []

  for (const step of steps) {
    const nextPos = [...currentPos]
    const direction = step.slice(0, 1)
    const length = parseInt(step.slice(1))

    currentDirection = resolver[direction][currentDirection]

    switch (currentDirection) {
      case 'N':
        nextPos[0] -= length
        break
      case 'E':
        nextPos[1] += length
        break
      case 'W':
        nextPos[1] -= length
        break
      case 'S':
        nextPos[0] += length
        break
    }

    const [cx, cy] = currentPos
    const [nx, ny] = nextPos

    if (cx !== nx) {
      if (cx! > nx!) {
        for (let i = cx; i > nx; i--) {
          const key = `x${i}y${cy}`
          if (seen.includes(key)) {
            return Math.abs(i) + Math.abs(cy!)
          }

          seen.push(key)
        }
      }
      else {
        for (let i = cx; i < nx; i++) {
          const key = `x${i}y${cy}`
          if (seen.includes(key)) {
            return Math.abs(i) + Math.abs(cy!)
          }

          seen.push(key)
        }
      }
    }
    else {
      if (cy! > ny!) {
        for (let i = cy; i > ny; i--) {
          const key = `x${cx}y${i}`
          if (seen.includes(key)) {
            return Math.abs(i) + Math.abs(cx!)
          }

          seen.push(key)
        }
      }
      else {
        for (let i = cy; i < ny; i++) {
          const key = `x${cx}y${i}`
          if (seen.includes(key)) {
            return Math.abs(i) + Math.abs(cx!)
          }

          seen.push(key)
        }
      }
    }

    currentPos = nextPos
  }

  return -1
}

const steps = getInput().split(', ')

console.log('P1:', p1(steps))
console.log('P2:', p2(steps))
