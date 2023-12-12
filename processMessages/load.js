
const { createXLSX } = require('../helper');

const load = ({ messages }) => {
  createXLSX({
    filePath: 'data/classified.xlsx',
    sheetName: 'data',
    data: messages
  })
}

module.exports = load