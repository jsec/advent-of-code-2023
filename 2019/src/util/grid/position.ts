export interface Position {
  x: number
  y: number
}

export const hashPosition = (pos: Position): string => `${pos.x},${pos.y}`

export const unhashPosition = (key: string): Position => {
  const split = key.split(',').map(k => parseInt(k))
  return {
    x: split[0]!,
    y: split[1]!,
  }
}

export const manhattan = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y)
}
