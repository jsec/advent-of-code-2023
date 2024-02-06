const manhattanDist = (x1, y1, x2, y2) => Math.abs(x2 - x1) + Math.abs(y2 - y1)

const manhattan3d = (x1, y1, z1, x2, y2, z2) => manhattanDist(x1, y1, x2, y2) + Math.abs(z2 - z1)

module.exports = {
  manhattan3d,
  manhattanDist,
}
