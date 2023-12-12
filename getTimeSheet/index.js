const XLSX = require('xlsx');
const { clone, map, select, filter, reduce } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');

// {id, vendor, time, message, tag}
const data = require('../data/trail.json'); 
const enrichData = require('./enrichData');
const verifyPairs = require('./verifyPairs');
const calculateTime = require('./calculateTime');
const resolveTime = require('./resolveTime');
const seed = data.flatMap(msg => [...msg]);

const filterInvalidMsg = ({data})=>({data: filter(data, ({tag}) => tag !== 'unknown')})
const sortByTime = ({data}) => {
  const cloned = clone(data)
  cloned.sort((a, b) => new Date(a.time) - new Date(b.time));

  return {data: cloned}
}
const groupByDateAndVendor = ({data}) => {
  return {data: index(data, ['date','vendor'])}
}


const getData = ({ data }) =>{
  const rtnVal = []
  map(data, (dates, date) =>
    map(dates, ({messages, ...rest}, vendor) => {
      const temp = map(messages, (msg) => select(msg, ['session','time','message']))
      rtnVal.push({
        ...rest, 
        date, 
        vendor, 
        messages: JSON.stringify(temp)
      })
    }))

  return rtnVal
}

const pipe = (collection,context) => reduce(collection, (acc,fn) => fn(acc), context )

// TODO: Calculate @ time entries
const getTimeSheet = (context) => {
  const steps = [
    filterInvalidMsg,
    enrichData,
    resolveTime,
    sortByTime,
    groupByDateAndVendor,
    verifyPairs,
    calculateTime,
    getData
  ]
  const data = pipe(steps, context)
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'timeSheet');
  XLSX.writeFile(workbook, './data/tempTimeSheet.xlsx');

  console.log('Excel file created successfully!');
}
getTimeSheet({data: seed})
module.exports= getTimeSheet