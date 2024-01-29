export const pairwise = <T>(arr: T[]): T[][] => {
  const ret = []

  for (let i = 0, j = 1; j < arr.length; i++, j++) {
    ret.push([arr[i]!, arr[j]!])
  }

  return ret
}
