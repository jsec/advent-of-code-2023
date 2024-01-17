import { createHash } from 'crypto'

import { getInput } from './util/input'

const input = getInput()

let password = ''
let i = 0

while (password.length !== 8) {
  const value = input + i
  const hash = createHash('md5').update(value).digest('hex')
  if (hash.startsWith('00000')) {
    password += hash[5]
  }
  i += 1
}

console.log('P1:', password)
