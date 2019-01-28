const { json } = require('micro')

const { actions } = require('./actions')

const app = async (req, res) => {
  const body = await json(req)

  const queryResult = body.queryResult

  const action = actions
    .find(action => action.name === queryResult.action)

  if (!action) {
    return 'hello'
  }

  const actionResponse = await action.handler(body)

  if (Array.isArray(actionResponse)) {
    return {
      fulfillmentMessages: actionResponse 
    }
  }

  return {
    fulfillmentText: actionResponse
  }
}

module.exports = app
