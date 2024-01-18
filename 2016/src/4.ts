import { getInputLines } from './util/input'

const charMap = 'abcdefghijklmnopqrstuvwxyz'

interface Room {
  checksum: string
  id: number
  name: string
}

const parseInput = (value: string): Room => {
  const split = value.slice(0, -1).split('[')
  const checksum = split[1]!

  const nameParts = split[0]!.split('-')
  const id = parseInt(nameParts.at(-1)!)
  const name = nameParts.slice(0, -1).join('')

  return { checksum, id, name }
}

const isValid = (room: Room): boolean => {
  const map = new Map()

  for (const char of room.name) {
    if (!map.has(char)) {
      map.set(char, 1)
    }
    else {
      map.set(char, map.get(char) + 1)
    }
  }

  const sorted = new Map([...map.entries()].sort((a, b) => {
    if (b[1] - a[1]) {
      return b[1] - a[1]
    }
    return a[0].charCodeAt() - b[0].charCodeAt()
  }))

  const sortedValues = sorted.keys()
  let cmp = ''

  for (let i = 0; i < 5; i++) {
    cmp += sortedValues.next().value
  }

  return cmp === room.checksum
}

const getEncryptedName = (room: Room): string => {
  const cycles = room.id % 26

  for (let i = 0; i < cycles; i++) {
    room.name = room.name.split('').map((c) => {
      const idx = charMap.indexOf(c)
      if (idx === 25) {
        return 'a'
      }

      return charMap[idx + 1]!
    }).join('')
  }

  return room.name
}

const input = getInputLines().map(parseInput)

const p1 = input
  .filter(isValid)
  .reduce((a, c) => a + c.id, 0)

console.log('P1:', p1)

const p2 = input.find(room => getEncryptedName(room) === 'northpoleobjectstorage')?.id
console.log('P2:', p2)
