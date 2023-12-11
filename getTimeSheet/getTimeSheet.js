const XLSX = require('xlsx');
const { clone, map, select } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');

// {id, vendor, time, message, tag}
const data = require('../trail.json'); 
const enrichData = require('./enrichData');
const verifyPairs = require('./verifyPairs');
const calculateTime = require('./calculateTime');
const seed = data.flatMap(msg => [...msg]);

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

// TODO: Filter invalid message
const getTimeSheet = (context) => {
  const data = getData(calculateTime(verifyPairs(groupByDateAndVendor(sortByTime(enrichData(context))))))
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'timeSheet');
  XLSX.writeFile(workbook, 'tempTimeSheet.xlsx');

  console.log('Excel file created successfully!');
}
getTimeSheet({data: seed})
module.exports= getTimeSheet