export const chunk = (arr: never[], size = 1) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )

export const sortArray = (arr: never[], asc = true) => {
  if (asc) {
    return arr.sort((a, b) => a - b)
  }

  return arr.sort((a, b) => b - a)
}

export const zip = <T>(first: T[], second: T[]): [T | undefined, T | undefined][] => {
  const length = Math.max(first.length, second.length)
  return Array.from({ length }, (_, i) => [first[i], second[i]])
}
