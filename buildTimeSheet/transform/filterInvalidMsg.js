const { filter } = require("@laufire/utils/collection");

const filterInvalidMsg = ({data})=>({
  data: filter(data, ({tag}) => tag !== 'invalid')
})

module.exports = filterInvalidMsg