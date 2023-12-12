const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(customParseFormat);
const { map } = require("@laufire/utils/collection")

const resolve = ({message, time}) => {
  const timeRegex = /(\d{1,2})\s?[.:]\s?(\d{2})\s?([ap]m)?/i;
  const match = message.match(timeRegex);

  if (match) {
    const date = dayjs(time, { format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' });

    let updatedTime = date;

    if (match[1]) {
      const hour = parseInt(match[1], 10);
      const amOrPm = match[3]?.toLowerCase();

      let adjustedHour = hour;
      if (amOrPm && amOrPm.toLowerCase() === 'pm' && hour < 12) {
        adjustedHour += 12;
      } else if (amOrPm && amOrPm.toLowerCase() === 'am' && hour === 12) {
        adjustedHour = 0;
      }

      updatedTime = updatedTime.set('hours', adjustedHour);
    }

    if (match[2]) {
      const minute = parseInt(match[2], 10);
      updatedTime = updatedTime.set('minutes', minute);
    }

    return updatedTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  } else {
    return time;
  }
}

const resolveTime = ({data: messages}) => ({
  data: map(messages, (message) => {
    const changedTime = resolve(message)
    return {...message, time: changedTime, }
  })
})

module.exports=resolveTime