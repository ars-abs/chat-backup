const { readXLSX } = require("../helper")
const extractSheet = () => ({
  data: readXLSX({ filePath: 'data/classifiedSessions.xlsx', sheetName: 'data' })
})

module.exports = extractSheet;