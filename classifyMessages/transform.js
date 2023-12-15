const { map } = require('@laufire/utils/collection')
const { convert } = require('html-to-text');

const classify = require('./classify');
const dayjs = require('dayjs');

const replyHandle = ({ message: { content }, createdAt, from: vendor, id }) => {
  const time = dayjs(createdAt).subtract(10, 'seconds').toDate()
  const { message, tag } = classify(convert(content));

  return { id, vendor, time, message, tag }
}

const transform = ({ messages }) => ({
  messages: (map(messages, (data) => {
    const { message: { content }, createdAt, from: vendor, replies, id } = data
    const { message, tag } = classify(convert(content))
    const time = dayjs(createdAt).subtract(10, 'seconds').toDate()
    const first = { id, vendor, time, message, tag }
    const repliesData = map(replies, replyHandle)

    return [first, ...repliesData]
  })).flatMap((msg) => [...msg])
})

module.exports = transform