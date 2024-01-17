import { createHash } from 'crypto'

import { getInput } from './util/input'

const input = getInput()

const getHash = (value: string): string => {
  return createHash('md5').update(value).digest('hex')
}

const p1 = (input: string): string => {
  let password = ''
  let i = 0
  while (password.length !== 8) {
    const value = input + i
    const hash = getHash(value)
    if (hash.startsWith('00000')) {
      password += hash[5]
    }
    i += 1
  }

  return password
}

const p2 = (input: string): string => {
  const password = Array(8).fill('')
  let i = 0

  while (!password.every(p => p !== '')) {
    const value = input + i
    const hash = getHash(value)
    if (hash.startsWith('00000')) {
      const pos = parseInt(hash[5]!)
      if (pos < 8 && password[pos] === '') {
        password[pos] = hash[6]!
      }
    }

    i += 1
  }

  return password.join('')
}

console.log('P1:', p1(input))
console.log('P2:', p2(input))
