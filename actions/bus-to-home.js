const { date } = require('../utils')
const fs = require('fs')
const tcccMga = require('tccc-mga-bus')

const serviceTypeMap = {
  DIAS_UTEIS: 1073,
  SABADOS: 1079,
  DOMIGOS_FERIADOS: 1072
}

const BUS_NOT_AVAIBLE_TODAY_MESSAGE = 'Essa linha não opera hoje :/'

const formatTrips = departures =>
  departures.map(trip => `${trip.tripName}: \n ${trip.departure} \n`).join('')

const getService = (calendar, serviceType) => {
  const dayDepartures = calendar
    .find(departure => departure.serviceId === serviceType)

  if (!dayDepartures) {
    return BUS_NOT_AVAIBLE_TODAY_MESSAGE
  }

  return `${dayDepartures.serviceDesc} \n ${formatTrips(dayDepartures.departures)}`
}

const handler = async body => {
  const busNumber = body.queryResult.parameters.bus_number

  const { calendar } = await tcccMga.getBusCalendarFromTerminal({
    number: busNumber
  })

  if (date.isSunday()) {
    return getService(calendar, serviceTypeMap.DOMIGOS_FERIADOS)
  }

  if (date.isSaturday()) {
    return getService(calendar, serviceTypeMap.SABADOS)
  }

  return getService(calendar, serviceTypeMap.DIAS_UTEIS)
}

module.exports = {
  name: 'input.bus-to-home',
  handler
}
