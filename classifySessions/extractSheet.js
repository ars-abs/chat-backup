const { readXLSX } = require("../helper")
const extractSheet = () => ({
  data: readXLSX({ filePath: 'data/classifiedMessages.xlsx', sheetName: 'data' })
})

module.exports = extractSheet;