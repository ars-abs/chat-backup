const { map } = require('@laufire/utils/collection');
const dayjs = require('dayjs');

const calcWorkHours = (data) => {
  const {messages} = data
  let totalSeconds = 0;

  for (let i = 0; i < messages.length; i += 2) {
    const startTime = dayjs(messages[i]?.time);
    const endTime = dayjs(messages[i + 1]?.time);

    const sessionDurationSeconds = endTime.diff(startTime, 'second');
    totalSeconds += sessionDurationSeconds;
  }

  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes, duration: (totalMinutes / 60).toFixed(2) };
}

const calculateTime = ({data}) => ({
  data: map(data, (dates) => 
    map(dates, (messages) => {
      const {isCorrectPairs, isConsecutive} = messages
      const hours = isCorrectPairs && isConsecutive
        ? calcWorkHours(messages) 
        : { hours: 0, minutes: 0, duration: 0 }
      return {...messages, ...hours}
    })
  )
})

module.exports = calculateTime