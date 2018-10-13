const tcccMga = require('tccc-mga-bus')

const handler = async body => {
  const busNumber = body.queryResult.parameters.bus_number

  const result = await tcccMga.getBusCalendarFromTerminal({
    number: busNumber
  })

  const departures = result.calendar.map(
    result => `${result.serviceDesc} \n ${result.departures.map(trip => `${trip.tripName} - ${trip.departure} \n`).join(' ')}`
  )

  return departures.join('\n ----')
}

module.exports = {
  name: 'input.bus-to-home',
  handler
}
