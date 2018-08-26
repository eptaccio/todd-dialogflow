const functions = require('firebase-functions')
const bus = require('tccc-mga-bus')

const {
  WebhookClient
} = require('dialogflow-fulfillment')

const {
  Card,
  Suggestion
} = require('dialogflow-fulfillment')

process.env.DEBUG = 'dialogflow:debug' // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({
    request,
    response
  })

  console.log('Dialogflow Request headers: ', JSON.stringify(request.headers))
  console.log('Dialogflow Request body: ', JSON.stringify(request.body))

  function welcome (agent) {
    agent.add('Eai meu chapa')
  }

  function fallback (agent) {
    agent.add('tafuq')
    agent.add('nope')
  }

  async function bus (agent) {
    const busNumber = request.body.queryResult.parameters.bus_number

    const result = await bus.getBusCalendarFromTerminal({
      number: busNumber
    })

    const departures = result.calendar.map(
    result => `${result.serviceDesc} \n ${result.departures.map(trip => `${trip.tripName} - ${trip.departure} \n`).join(' ')}`
  )

    departures.forEach(departure => {
      agent.add(departure)
    })
  }

  const intentMap = new Map()

  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback)
  intentMap.set('bus para casa', bus)

  agent.handleRequest(intentMap)
})
