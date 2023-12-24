const { map } = require("@laufire/utils/collection");

const populateData = ({data}) => {
  const populatedData = []
  map(data, (dates) =>
    map(dates, (processedData) => {
      const {isConsecutive, isCorrectPairs, messages} = processedData;
      const isUnknownSession = !(isConsecutive && isCorrectPairs)
      map(messages, (message) => {
        const result = isUnknownSession ? {...message, session: 'unknown'} : message
        populatedData.push(result)
      })
    }))
  
  return {data: populatedData}
}

module.exports = populateData