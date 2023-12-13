const { select, map } = require("@laufire/utils/collection");
const { createXLSX } = require("../helper")

const loadTimeSheet = (messages) => {
  const data = map(messages, (message) =>
    select(message, ['vendor','date', 'hours', 'minutes', 'duration']))

  createXLSX({ filePath: 'data/timeSheet.xlsx', sheetName: 'data', data: data })
}

module.exports = loadTimeSheet;