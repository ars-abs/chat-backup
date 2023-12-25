const { pipe } = require("../../helper")
const sortByTime = require("../sortByTime")
const appendInvalid = require("./appendInvalid")
const groupByDateAndID = require("./groupByDateAndID")
const populateData = require("./populateData")
const separateInvalid = require("./separateInvalid")

const validateSession = (context) => pipe([
  separateInvalid,
  groupByDateAndID,
  populateData,
  appendInvalid,
], context)

module.exports = validateSession