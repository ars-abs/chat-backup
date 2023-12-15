const { map } = require("@laufire/utils/collection")
const { index } = require("@laufire/utils/crunch")
const dayjs = require("dayjs")

const groupByDateAndVendor = (context) => {
  const data = map(context.data, (message) => ({ 
    ...message, date: dayjs(message.time).format('YYYY-MM-DD')
  }))
  
  return {data: index(data, ['date','vendor'])}
}

module.exports =groupByDateAndVendor