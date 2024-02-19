import { zip } from './util/array'
import { isNotDefined } from './util/existence'
import { getInput } from './util/input'
import { isNumeric } from './util/math'

type Data = number | number[]
type Packet = Data[]

enum CompareResult {
  Correct,
  Incorrect,
  Undetermined,
}

const compare = (packet1: Packet, packet2: Packet): CompareResult => {
  for (const [left, right] of zip(packet1, packet2)) {
    if (isNotDefined(left)) {
      return CompareResult.Correct
    }

    if (isNotDefined(right)) {
      return CompareResult.Incorrect
    }

    if (isNumeric(left) && isNumeric(right)) {
      if (left === right) {
        continue
      }

      return right! > left! ? CompareResult.Correct : CompareResult.Incorrect
    }

    const result = compare(Array.isArray(left!) ? left : [left], Array.isArray(right!) ? right : [right])

    if (result !== CompareResult.Undetermined) {
      return result
    }
  }

  return CompareResult.Undetermined
}

const input = getInput()
  .split('\n\n')
  .map(pair => pair.split('\n').map(a => JSON.parse(a)))

const p1 = input
  .map((pair, idx) => compare(pair[0], pair[1]) === CompareResult.Correct ? idx + 1 : 0)
  .reduce((a, c) => a + c, 0)

console.log('P1:', p1)
