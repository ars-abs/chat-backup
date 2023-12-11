const dayjs = require('dayjs');

const convertMinutesToHourFormat = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

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
  const hourFormat = convertMinutesToHourFormat(totalMinutes);

  return { hour: hourFormat, workHour: (totalMinutes / 60).toFixed(2) };
}

module.exports = calcWorkHours