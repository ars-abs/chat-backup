
const { createXLSX } = require('../helper');

const load = ({ messages }) => {
  createXLSX({
    filePath: 'data/classifiedMessages.xlsx',
    sheetName: 'data',
    data: messages
  })
}

module.exports = load