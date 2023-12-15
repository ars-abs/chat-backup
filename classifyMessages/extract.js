const { map, filter } = require('@laufire/utils/collection');
const dayjs = require('dayjs');

const extract = ({ messages, startDate, endDate }) => {
  const start = dayjs(startDate.split('/').reverse().join('-'));
  const end = dayjs(endDate.split('/').reverse().join('-'));
  const filteredMessage = filter(messages, (message) =>
    dayjs(message.createdDateTime).isAfter(start) &&
    dayjs(message.createdDateTime).isBefore(end)
  );

  return ({
    messages: map(filteredMessage, (message) => ({
      id: message.from?.user?.id,
      from: message.from?.user?.displayName,
      createdAt: message.createdDateTime,
      message: message.body,
      replies: map(message.replies, (reply) => ({
        id: reply.from?.user?.id,
        from: reply.from?.user?.displayName,
        createdAt: reply.createdDateTime,
        message: reply.body,
      }))
    }))
  });
}

module.exports = extract

