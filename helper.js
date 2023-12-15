const { reduce } = require('@laufire/utils/collection');
const XLSX = require('xlsx');

const createXLSX = ({ filePath, sheetName, data, order }) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data, { header: order });
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filePath);

  console.log('excel file created successfully!');
}

const readXLSX = ({ filePath, sheetName }) => {
  const workbook = XLSX.readFile(filePath, {cellDates: true});
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data
}

const pipe = (collection, context) => reduce(collection, (acc, fn) => fn(acc), context)

module.exports = { createXLSX, readXLSX, pipe }