const { map, select } = require("@laufire/utils/collection")

const selectData = ({ data }) =>{
  const rtnVal = []
  map(data, (dates, date) =>
    map(dates, ({messages, ...rest}, vendor) => {
      const temp = map(messages, (msg) => select(msg, ['session','time','message']))
      rtnVal.push({
        ...rest, 
        date: new Date(date), 
        vendor, 
        messages: JSON.stringify(temp)
      })
    }))

  return rtnVal
}

module.exports = selectData