const assignSession = require("./assignSession");
const resolveTime = require("./resolveTime");
const sortByTime = require("./sortByTime");
const { pipe } = require("../helper");
const extractSheet = require("./extractSheet");
const loadTimeSheet = require("./loadTimeSheet");

const classifySessions = () => pipe([
  extractSheet,
  sortByTime,
  resolveTime,
  assignSession,
  loadTimeSheet,
])

module.exports=classifySessions;