export function* range(start: number, stop: number, step = 1) {
  if (stop == null) {
    start = 0
    stop = start
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i
  }
}
