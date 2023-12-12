const messages = require('../data/source.json')
const extract = require('./extract')
const transform = require('./transform')
const load = require('./load')
const { pipe } = require('../helper')

const processMessages = () => {
  const steps = [extract, transform, load]
  pipe(steps, { messages })
}

module.exports = processMessages;