export function areCharsUnique(value: string): boolean {
  return new Set(value).size === value.length
}
