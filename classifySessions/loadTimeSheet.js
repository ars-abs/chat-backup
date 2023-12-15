const { select, map } = require("@laufire/utils/collection");
const { createXLSX } = require("../helper")

const loadTimeSheet = (context) => {
  const data = map(context.data, (message) =>
    select(message, ['id', 'createdAt', 'time', 'message', 'tag', 'session']))

  createXLSX({
    filePath: 'data/classifiedSessions.xlsx',
    sheetName: 'data',
    data: data,
    order: ['id', 'createdAt', 'time', 'message', 'tag', 'session']
  })
}

module.exports = loadTimeSheet;