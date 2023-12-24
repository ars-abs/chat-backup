const { pipe } = require("../../helper")
const groupByDateAndID = require("./groupByDateAndID")
const populateData = require("./populateData")
const verifyPairs = require("./verifyPairs")

const validateSession = (context) => pipe([
  groupByDateAndID,
  verifyPairs,
  populateData,
], context)

module.exports = validateSession