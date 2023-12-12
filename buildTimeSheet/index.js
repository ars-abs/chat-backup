const extractSheet = require('./extractSheet');
const loadTimeSheet = require('./loadTimeSheet');
const transform = require('./transform');
const { pipe } = require('../helper');

// TODO: Calculate @ time entries
const buildTimeSheet = (context) => pipe([
  extractSheet,
  transform,
  loadTimeSheet,
], context)

module.exports = buildTimeSheet