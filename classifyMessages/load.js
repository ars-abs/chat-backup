
const { createXLSX } = require('../helper');

const load = ({ messages }) => {
  createXLSX({
    filePath: 'data/classifiedMessages.xlsx',
    sheetName: 'data',
    data: messages,
    order: ['id', 'vendor', 'time', 'message', 'tag']
  })
}

module.exports = load