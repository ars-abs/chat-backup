const assignSession = require("./assignSession");
const resolveTime = require("./resolveTime");
const sortByTime = require("./sortByTime");
const { pipe } = require("../helper");
const extractSheet = require("./extractSheet");
const loadTimeSheet = require("./loadTimeSheet");
const changeDateFormat = require("./changeDateFormat");
const validateSession = require("./validateSession");
const assignTags = require("./assignTags");
const mapVendors = require("../buildTimeSheet/transform/mapVendors");

const classifySessions = () => pipe([
  extractSheet,
  assignTags,
  mapVendors,
  changeDateFormat,
  sortByTime,
  resolveTime,
  assignSession,
  validateSession,
  loadTimeSheet,
])

module.exports=classifySessions;