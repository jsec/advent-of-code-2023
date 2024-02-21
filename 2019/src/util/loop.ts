export function* range(start = 0, end = Infinity, step = 1) {
  let iterCount = 0
  for (let i = start; i < end; i += step) {
    iterCount++
    yield i
  }
  return iterCount
}
