const { readXLSX } = require("../helper")
const data = require('../data/trail.json')
const extractSheet = () => ({
  data: readXLSX({ filePath: 'data/classified.xlsx', sheetName: 'data' })
})

module.exports = extractSheet;