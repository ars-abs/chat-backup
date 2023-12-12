const { createXLSX } = require("../helper")

const loadTimeSheet = (data) => {
  createXLSX({ filePath: 'data/timeSheet.xlsx', sheetName: 'data', data: data })
}

module.exports = loadTimeSheet;