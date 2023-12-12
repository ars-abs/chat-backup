const { index } = require("@laufire/utils/crunch")

const groupByDateAndVendor = ({data}) => {
  return {data: index(data, ['date','vendor'])}
}

module.exports =groupByDateAndVendor