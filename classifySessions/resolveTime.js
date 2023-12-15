const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(customParseFormat);
const { map } = require("@laufire/utils/collection")

const resolve = ({ message, time }) => {
  const timeRegex = /(at|@|At)\s?(\d{1,2})\s?[.:]?\s?(\d{2})?\s?([ap]m)?/i;
  const match = message.match(timeRegex);

  if (match) {
    const dayjsDateTime = dayjs(time);
    const isInpPM = dayjsDateTime.hour() >= 12
    const inpHr = dayjsDateTime.hour() % 12
    let updatedTime = dayjsDateTime;

    if (match[2]) {
      const hour = parseInt(match[2], 10);
      let adjustedHour = hour;
      const amOrPm = (match[4] || "").toLowerCase();

      if (amOrPm === 'pm' && hour < 12) {
        adjustedHour += 12;
      }
      else if (amOrPm === 'am' && hour === 12) {
        adjustedHour = 0;
      }
      else {
        const isPast = hour <= inpHr
        const isPm = isPast ? isInpPM : !isInpPM
        isPm && (adjustedHour += 12)
      }


      updatedTime = updatedTime.set('hours', adjustedHour);
      updatedTime = updatedTime.set('minutes', 0);
    }

    if (match[3]) {
      const minute = parseInt(match[3], 10);
      updatedTime = updatedTime.set('minutes', minute);
    }

    return updatedTime.toDate();
  } else {
    return time;
  }
}

const resolveTime = ({ data: messages }) => ({
  data: map(messages, (message) => {
    const createdAt = dayjs(message.time).toDate();
    const changedTime = resolve(message)

    return { ...message, time: changedTime, createdAt }
  })
})

module.exports = resolveTime