const serviceTypeMap = {
  DIAS_UTEIS: 1073,
  SABADOS: 1079,
  DOMIGOS_FERIADOS: 1072
}

const BUS_NOT_AVAIBLE_TODAY = 'Essa linha não opera hoje :/'

const getDepartures = ({ calendar, serviceType }) =>  
  calendar.find(departure => departure.serviceId === serviceType)

module.exports = {
  serviceTypeMap,
  getDepartures,
  messages: {
    BUS_NOT_AVAIBLE_TODAY
  }
}