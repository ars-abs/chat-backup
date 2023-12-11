const { clone, map } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');

// {id, vendor, time, message, tag}
const data = require('../trail.json'); 
const enrichData = require('./enrichData');
const verifyPairs = require('./verifyPairs');
const calcWorkHours = require('./calculateTime');
const seed = data.flatMap(msg => [...msg]);

const sortByTime = ({data}) => {
  const cloned = clone(data)
  cloned.sort((a, b) => new Date(a.time) - new Date(b.time));

  return {data: cloned}
}
const groupByDateAndVendor = ({data}) => {
  return {data: index(data, ['date','vendor'])}
}
const calculateTime = ({data}) => ({
  data: map(data, (dates) => 
    map(dates, (messages) => {
      const {isCorrectPairs, isConsecutive} = messages
      const hours = isCorrectPairs && isConsecutive
        ? calcWorkHours(messages) 
        : { hour: '00:00', workHour: 0 }
      return {...messages, ...hours}
    })
  )
})

const getTimeSheet = (context) => {
  const test = calculateTime(verifyPairs(groupByDateAndVendor(sortByTime(enrichData(context)))))

  return test
}
getTimeSheet({data: seed})
module.exports= getTimeSheet