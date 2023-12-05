const { filter, map } = require('@laufire/utils/collection');
const { peek, pretty } = require('@laufire/utils/debug');
const messages = require('./src.json');

const extract = (username, startDate, endDate) => {
  const filteredMessage = filter(messages, (message) => {
    const isTargetUser = message.from?.user?.displayName === username;
    const isTargetDateRange = new Date(message.createdDateTime) >= startDate && new Date(message.createdDateTime) <= endDate;

    return isTargetUser && isTargetDateRange
  })

  const data = (map(messages, (message) => ({
    from: message.from?.user?.displayName,
    createdAt: message.createdDateTime,
    message: message.body,
    replies: map(message.replies, (reply) => ({
      createdAt: reply.createdDateTime,
      message: reply.body,
    }))
  }))).reverse()

  return data
}

const username = "Jayasutha Kannappan"
const startDate = new Date('2023-10-25T12:00:00Z');
const endDate = new Date('2023-11-26T23:59:59Z');

peek(pretty(extract(username, startDate, endDate), 2))