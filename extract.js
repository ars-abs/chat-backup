const { filter, map } = require('@laufire/utils/collection');
const { peek, pretty } = require('@laufire/utils/debug');
const messages = require('./src.json');

const extract = (username, startDate, endDate) => {
  // const filteredMessage = filter(messages, (message) => {
  //   const isTargetUser = message.from?.user?.displayName === username;
  //   const isTargetDateRange = new Date(message.createdDateTime) >= startDate && new Date(message.createdDateTime) <= endDate;

  //   return isTargetUser && isTargetDateRange
  // })

  const data = (map(messages, (message) => ({
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
  }))).reverse()

  return data
}


peek(pretty(extract(), 2))