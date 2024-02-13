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

export const cartesian = <T>(...arrs: T[][]): T[][] => {
  return arrs.reduce<T[][]>(
    (results, entries) =>
      results
        .map(result => entries.map(entry => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []),
    [[]]
  )
}

export const sum = (arr: number[]): number => arr.reduce((a, c) => a + c, 0)
