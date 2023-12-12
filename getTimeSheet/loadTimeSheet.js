const { createXLSX } = require("../helper")

const loadTimeSheet = (context) => {
  const { data } = context
  createXLSX({ filePath: 'data/timeSheet.xlsx', sheetName: 'data', data: data })
}

module.exports = loadTimeSheet;