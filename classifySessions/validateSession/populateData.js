const { map } = require("@laufire/utils/collection");

const populateData = (context) => {
  const populatedData = []
  map(context.data, (dayMessagesPerUser) =>
    map(dayMessagesPerUser, (userMessages) => {
      let suspected = false;

      map(userMessages, (message, key, data) => {
        const {session} = message
        const prevSession = data[key - 1]?.session;
        const nextSession = data[key + 1]?.session;

        const checkSessionSequence = () => {
          const checkStart = () => (!prevSession || prevSession === 'end') && nextSession==='end'
          const checkEnd = () =>  prevSession === 'start' && (!nextSession || nextSession === 'start')

          const check = {
            start: checkStart(),
            end: checkEnd()
          }

          const isCorrect = check[session]

          !isCorrect && (suspected=true)

          return message
        }

        const result  = suspected 
          ? {...message, session: 'unknown'} 
          : checkSessionSequence()
        
        populatedData.push(result)
      })
    }))
  
  return {...context, data: populatedData}
}

module.exports = populateData