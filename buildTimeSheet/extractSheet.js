const { readXLSX } = require("../helper")
const extractSheet = () => ({
  data: readXLSX({ filePath: 'data/classified.xlsx', sheetName: 'data' })
})

module.exports = extractSheet;