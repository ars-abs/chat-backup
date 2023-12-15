const messages = require('../data/.source.json')
const extract = require('./extract')
const transform = require('./transform')
const load = require('./load')
const { pipe } = require('../helper')

const startDate = '26/10/2023';
const endDate = '25/11/2023';
const classifyMessages = () => pipe([
  extract, 
  transform, 
  load
], { messages, startDate, endDate })

module.exports = classifyMessages;