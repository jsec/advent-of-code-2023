const { manhattan3d } = require('./util/algorithm')
const { getInputLines } = require('./util/input')

const parse = line => {
  const [p, r] = line.split(', ')
  const radius = parseInt(r.slice(2))

  const pos = p
    .slice(p.indexOf('<') + 1, p.indexOf('>'))
    .split(',')
    .map(i => parseInt(i))

  return {
    pos,
    radius,
  }
}

const getDistancesFromPos = (botList, pos) => {
  const [x, y, z] = pos

  return botList.map(bot => {
    const [dx, dy, dz] = bot.pos
    return manhattan3d(x, y, z, dx, dy, dz)
  })
}

const getBotsInRange = (botList, bot) => {
  return getDistancesFromPos(botList, bot.pos)
    .filter(d => d <= bot.radius)
    .length
}

const botList = getInputLines()
  .map(parse)
  .sort((a, b) => b.radius - a.radius)

const p1 = getBotsInRange(botList, botList[0])
console.log('P1:', p1)
