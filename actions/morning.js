const { date, bus } = require('../utils')
const tcccMga = require('tccc-mga-bus')

const BUS_STATION_DESTINY = 5

const handler = async body => {

  const today = date.getDate()

  const { calendar: firstBusOption } = await tcccMga.getBusCalendarFromDistrict({ number: '721' })

  const { departures } = bus.getDepartures({
    calendar: firstBusOption,
    serviceType: bus.serviceTypeMap.DIAS_UTEIS
  })
  
  const times = departures.filter(
    departure => departure.tripSeq === BUS_STATION_DESTINY
  ).map(
    time => date.getDate(time.departure, 'HH:mm:ss')
  ).filter(
    time => time.isAfter(today)
  )

  const [nextTime] = times

  return [
    {
      text: {
        text: [
          'bom dia'
        ]
      }
    },
    {
      text: {
        text: [
          `hoje é ${today.format('dddd')} - ${today.format('DD/MM')}`
        ]
      }
    },
    {
      text: {
        text: [
          'toma uma musica p tu começar o dia',
          'https://open.spotify.com/track/4mZu6NuOntvYZqCZPrxTqT?si=JL-DQ7D9T9KYTjSbqUXMnQ'
        ]
      }
    },
    {
      text: {
        text: [
          `se levantar agora vai conseguir pegar o 721 às ${nextTime.format('HH:mm')}`,
        ]
      }
    }
  ]
}

module.exports = {
  name: 'input.morning',
  handler
}
