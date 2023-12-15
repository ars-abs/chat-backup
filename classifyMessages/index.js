const messages = require('../data/.source.json')
const extract = require('./extract')
const transform = require('./transform')
const load = require('./load')
const { pipe } = require('../helper')

const classifyMessages = (context) => pipe([
  extract,
  transform,
  load
], { ...context, messages })

module.exports = classifyMessages;