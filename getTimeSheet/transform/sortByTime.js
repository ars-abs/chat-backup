const { clone } = require("@laufire/utils/collection");

const sortByTime = ({data}) => {
  const cloned = clone(data)
  cloned.sort((a, b) => new Date(a.time) - new Date(b.time));

  return {data: cloned}
}

module.exports=sortByTime