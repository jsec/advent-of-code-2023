const dayjs = require('./util/datetime')
const { getInputLines } = require('./util/input')

const createRecord = input => {
  const [time, entry] = input.replace('[', '').split('] ')
  const entrySplit = entry.split(' ')

  const record = {
    entry,
    fellAsleep: false,
    id: 0,
    startedShift: false,
    timestamp: dayjs(time, 'YYYY-MM-DD HH:mm'),
    wokeUp: false,
  }

  switch (entrySplit[0]) {
    case 'Guard':
      record.startedShift = true
      break
    case 'falls':
      record.fellAsleep = true
      break
    case 'wakes':
      record.wokeUp = true
      break
    default:
      break
  }
  return record
}

const fillIds = records => {
  let onCall = 0

  for (let record of records) {
    if (record.startedShift) {
      onCall = parseInt(record.entry.split(' ')[1].slice(1))
    }

    record.id = onCall
  }

  return records
}

const analyze = records => {
  const map = {}
  let activeId = 0
  let sleepTimestamp = 0

  for (const record of records) {
    if (record.startedShift) {
      activeId = record.id
      if (!map[activeId]) {
        map[activeId] = []
      }
    }

    if (record.fellAsleep) {
      sleepTimestamp = record.timestamp
    }

    if (record.wokeUp) {
      for (let i = sleepTimestamp.minute(); i < record.timestamp.minute(); i++) {
        map[activeId].push(i)
      }
    }
  }

  return map
}

const getCounts = arr => {
  const counts = {}
  for (const minute of arr) {
    if (counts[minute]) {
      counts[minute] += 1
    } else {
      counts[minute] = 1
    }
  }

  return counts
}

const p1 = map => {
  const laziestId = Object.keys(map).reduce((a, c) => map[a].length > map[c].length ? a : c)

  const counts = getCounts(map[laziestId])

  let idealMinute = Object.keys(counts)[0]
  for (const key of Object.keys(counts)) {
    if (counts[key] > counts[idealMinute]) {
      idealMinute = key
    }
  }

  return laziestId * idealMinute
}

const p2 = map => {
  const maxById = Object.keys(map).reduce((a, c) => {
    const counts = getCounts(map[c])

    a[c] = Object.keys(counts).reduce((a, c) => {
      if (counts[c] > a.size) {
        a = {
          key: c,
          size: counts[c],
        }
      }

      return a
    }, { key: '', size: 0 })

    return a
  }, {})

  let optimum = {
    id: Object.keys(maxById)[0],
    minute: 0,
  }

  for (const id of Object.keys(maxById)) {
    const current = maxById[id]
    if (current.size > maxById[optimum.id].size) {
      optimum = {
        id,
        minute: current.key,
      }
    }
  }

  return parseInt(optimum.id) * parseInt(optimum.minute)
}

const records = fillIds(
  getInputLines()
    .map(createRecord)
    .sort((a, b) => a.timestamp.isAfter(b.timestamp) ? 1 : -1),
)

const map = analyze(records)

console.log('P1:', p1(map))
console.log('P2:', p2(map))
