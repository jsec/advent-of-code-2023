export const permutations = <T>(orig: T[]): T[][] => {
  const output: T[][] = []

  const swapInPlace = (
    curr: T[],
    a: number,
    b: number
  ) => {
    const temp = curr[a]
    curr[a] = curr[b]
    curr[b] = temp
  }

  const generate = (n: number, arr: T[]) => {
    if (n === 1) {
      output.push(arr.slice())
      return
    }

    generate(n - 1, arr)

    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        swapInPlace(arr, i, n - 1)
      }
      else {
        swapInPlace(arr, 0, n - 1)
      }

      generate(n - 1, arr)
    }
  }

  generate(orig.length, orig.slice())

  return output
}

export const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length))
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i])
  })
}

export const chunk = <T>(arr: T[], size = 1) =>
  Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )

export const rotate = (arr) => {
  return arr[0].map((_, idx) => arr.map(row => row[idx]).reverse())
}

export const transpose = matrix => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]))

function* windowGenerator<T>(arr: T[], size: number) {
  for (let i = 0; i+size <= arr.length; i++) {
    yield arr.slice(i, i+size)
  }
}


export const slidingWindow = <T>(arr: T[], size: number): T[][] => {
  return Array.from(windowGenerator(arr, size))
}
