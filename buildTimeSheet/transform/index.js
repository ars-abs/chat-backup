const { pipe } = require('../../helper')
const calculateTime = require('./calculateTime')
const filterInvalidMsg = require('./filterInvalidMsg')
const groupByDateAndVendor = require('./groupByDateAndVendor')
const verifyPairs = require('./verifyPairs')
const selectData = require('./selectData')
const mapVendors = require('./mapVendors')

const transform = (context) => pipe([
  filterInvalidMsg,
  mapVendors,
  groupByDateAndVendor,
  verifyPairs,
  calculateTime,
  selectData,
], context)

module.exports = transform