var customParseFormat = require('dayjs/plugin/customParseFormat')
var utc = require('dayjs/plugin/utc')
const dayjs = require('dayjs')

dayjs.extend(customParseFormat)
dayjs.extend(utc)

module.exports = dayjs
