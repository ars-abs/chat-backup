const { pipe } = require("../../helper")
const groupByDateAndID = require("./groupByDateAndID")
const populateData = require("./populateData")

const validateSession = (context) => pipe([
  groupByDateAndID,
  populateData,
], context)

module.exports = validateSession