const appendInvalid = ({data, invalidData}) => ({
  data: [...data, ...invalidData]
})

module.exports=appendInvalid