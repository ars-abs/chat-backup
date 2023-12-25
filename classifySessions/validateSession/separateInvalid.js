const { filter } = require("@laufire/utils/collection")

const separateInvalid = ({data}) =>({
  data: filter(data, ({tag}) => tag !== 'invalid'),
  invalidData: filter(data, ({tag}) => tag == 'invalid')
})

module.exports=separateInvalid