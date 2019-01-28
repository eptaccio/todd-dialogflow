const unknown = require('./unknown')
const busToHome = require('./bus-to-home')
const morning = require('./morning')

module.exports = {
  actions: [
    unknown,
    busToHome,
    morning
  ]
}
