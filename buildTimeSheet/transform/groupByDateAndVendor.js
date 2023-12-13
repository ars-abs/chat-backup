const { map } = require("@laufire/utils/collection")
const { index } = require("@laufire/utils/crunch")
const dayjs = require("dayjs")

const groupByDateAndVendor = (context) => {
  const data = map(context.data, (message) => ({ 
    ...message, date: dayjs(message.time).format('DD-MM-YYYY')
  }))
  
  return {data: index(data, ['date','vendor'])}
}

module.exports =groupByDateAndVendor