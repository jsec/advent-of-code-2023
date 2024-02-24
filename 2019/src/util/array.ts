export const pairwise = <T>(arr: T[]): T[][] => {
  const ret = []

  for (let i = 0, j = 1; j < arr.length; i++, j++) {
    ret.push([arr[i]!, arr[j]!])
  }

  return ret
}

export const zip = <T>(arrays: T[][]) => {
  return Array.from({
    length: Math.max(...arrays.map(a => a.length)),
  }, (_, i) => arrays.map(a => a[i]))
}

export const sum = (arr: number[]): number =>
  arr.reduce((a, c) => a + c, 0)

export const chunk = <T>(arr: T[], size = 1) =>
  Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )

export const cartesianProduct = <T>(...arrs: T[][]) =>
  arrs.reduce<T[][]>((acc, curr) =>
    acc.flatMap(acc => curr.map(value =>
      [...acc, value])), [[]])
