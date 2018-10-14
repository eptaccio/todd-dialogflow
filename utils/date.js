const moment = require('moment-timezone')

const getDate = () => moment.tz('America/Los_Angeles')

const isSunday = () => {
  const date = getDate()
  return date.day() === 0
}

const isSaturday = () => {
  const date = getDate()
  return date.day() === 5
}

module.exports = {
  isSunday,
  isSaturday
}