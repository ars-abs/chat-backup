const { map } = require("@laufire/utils/collection")

const changeDateFormat = ({data}) => ({data: map(data, ({time, ...rest}) =>{
  const formattedTime = new Date(time)

  return {...rest, time: formattedTime}
})})


module.exports=changeDateFormat