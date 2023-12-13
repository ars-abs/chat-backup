const messages = require('../data/.source.json')
const extract = require('./extract')
const transform = require('./transform')
const load = require('./load')
const { pipe } = require('../helper')

const classifyMessages = () => pipe([
  extract, 
  transform, 
  load
], { messages })


module.exports = classifyMessages;