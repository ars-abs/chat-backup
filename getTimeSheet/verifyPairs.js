const { map, reduce } = require("@laufire/utils/collection")

const verifyPairs = ({ data }) => ({
  data: map(data, (dates) =>
    map(dates, (messages) => {
      const { isConsecutive, isCorrectPairs, isStartMissed, isEndMissed } = reduce(
        messages,
        ({ startCount, endCount, isConsecutive }, { session }, key, data) => {
          const nextSession = data[key + 1]?.session;

          // ((session === 'start' && nextSession !== 'end') || (session === 'end' && (nextSession !== 'start' || !nextSession) ))
          //   && (isConsecutive = false)

          session === 'start' && startCount++
          session === 'end' && endCount++
          const isCorrectPairs = startCount === endCount
          const isStartMissed = startCount < endCount
          const isEndMissed = startCount > endCount
          return { startCount, endCount, isConsecutive, isCorrectPairs, isStartMissed, isEndMissed }
        },
        { startCount: 0, endCount: 0, isConsecutive: true }
      )

      return { messages, isConsecutive, isCorrectPairs, isStartMissed, isEndMissed }
    })
  )
})

module.exports = verifyPairs