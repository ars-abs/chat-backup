const messages = require('../data/.source.json')
const extract = require('./extract')
const transform = require('./transform')
const load = require('./load')
const { pipe } = require('../helper')
const assignTags = require('./assignTags')

const classifyMessages = (context) => pipe([
  extract,
  transform,
  assignTags,
  load
], { ...context, messages })

module.exports = classifyMessages;