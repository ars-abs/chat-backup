const data = require('./data/trail.json')
const XLSX = require('xlsx');
const seed = data.flatMap(msg => [...msg]);
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(seed);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
XLSX.writeFile(workbook, 'output.xlsx');

console.log('Excel file created successfully!');