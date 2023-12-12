const { filter } = require("@laufire/utils/collection");

const filterInvalidMsg = ({data})=>({
  data: filter(data, ({tag}) => tag !== 'unknown')
})

module.exports = filterInvalidMsg