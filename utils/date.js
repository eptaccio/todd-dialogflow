const moment = require('moment-timezone')

moment.locale('pt-BR')

const getDate = (...date) => moment(...date).tz('America/Sao_Paulo')

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
  isSaturday,
  getDate
}
