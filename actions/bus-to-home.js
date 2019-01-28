const { date, bus } = require('../utils')
const tcccMga = require('tccc-mga-bus')

const formatTrips = departures =>
  departures.map(trip => `${trip.departure}`).join('\n')

const getService = (calendar, serviceType) => {
  const dayDepartures = bus.getDepartures({
    calendar,
    serviceType
  })

  if (!dayDepartures) {
    return bus.messages.BUS_NOT_AVAIBLE_TODAY
  }

  return `${dayDepartures.serviceDesc}\n${formatTrips(dayDepartures.departures)}`
}

const handler = async body => {
  const busNumber = body.queryResult.parameters.bus_number

  const { calendar } = await tcccMga.getBusCalendarFromTerminal({
    number: busNumber
  })

  if (date.isSunday()) {
    return getService(calendar, bus.serviceTypeMap.DOMIGOS_FERIADOS)
  }

  if (date.isSaturday()) {
    return getService(calendar, bus.serviceTypeMap.SABADOS)
  }

  return getService(calendar, bus.serviceTypeMap.DIAS_UTEIS)
}

module.exports = {
  name: 'input.bus-to-home',
  handler
}
