const assignSession = require("./assignSession");
const resolveTime = require("./resolveTime");
const sortByTime = require("./sortByTime");
const { pipe } = require("../helper");
const extractSheet = require("./extractSheet");
const loadTimeSheet = require("./loadTimeSheet");
const changeDateFormat = require("./changeDateFormat");

const classifySessions = () => pipe([
  extractSheet,
  changeDateFormat,
  sortByTime,
  resolveTime,
  assignSession,
  loadTimeSheet,
])

module.exports=classifySessions;