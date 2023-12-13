const { readXLSX } = require("../helper")
const extractSheet = () => ({
  data: readXLSX({ filePath: 'data/classifiedMessage.xlsx', sheetName: 'data' })
})

module.exports = extractSheet;