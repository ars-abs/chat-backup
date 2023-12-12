const extractSheet = require('./extractSheet');
const loadTimeSheet = require('./loadTimeSheet');
const transform = require('./transform');
const { pipe } = require('../helper');

// TODO: Calculate @ time entries
const getTimeSheet = (context) => pipe([
  extractSheet,
  transform,
  loadTimeSheet,
], context)

getTimeSheet()
module.exports = getTimeSheet