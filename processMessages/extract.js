const { map } = require('@laufire/utils/collection');

const extract = ({ messages }) => ({
  messages: map(messages, (message) => ({
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
})

module.exports = extract

