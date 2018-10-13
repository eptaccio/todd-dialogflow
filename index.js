const { json } = require('micro')

const { actions } = require('./actions')

const app = async (req, res) => {
  const body = await json(req)

  console.log(body)
  console.log('actions', actions)

  const queryResult = body.queryResult

  const action = actions
    .find(action => action.name === queryResult.action)

  if (!action) {
    return 'hello'
  }

  return {
    fulfillmentText: await action.handler(body)
  }
}

module.exports = app
