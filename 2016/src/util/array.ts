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
