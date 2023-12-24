const { map } = require("@laufire/utils/collection")
const { index } = require("@laufire/utils/crunch")
const dayjs = require("dayjs")

const groupByDateAndID = (context) => {
  const data = map(context.data, (message) => ({ 
    ...message, date: dayjs(message.time).format('YYYY-MM-DD')
  }))
  
  return {data: index(data, ['date','id'])}
}

module.exports = groupByDateAndID