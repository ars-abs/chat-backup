const { pipe } = require('../../helper')
const calculateTime = require('./calculateTime')
const enrichData = require('./enrichData')
const filterInvalidMsg = require('./filterInvalidMsg')
const groupByDateAndVendor = require('./groupByDateAndVendor')
const resolveTime = require('./resolveTime')
const sortByTime = require('./sortByTime')
const verifyPairs = require('./verifyPairs')
const selectData = require('./selectData')

const transform = (context) => pipe([
  // filterInvalidMsg,
  enrichData,
  sortByTime,
  resolveTime,
  groupByDateAndVendor,
  verifyPairs,
  calculateTime,
  selectData,
], context)

module.exports = transform