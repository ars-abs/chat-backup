const { map } = require('@laufire/utils/collection')
const { convert } = require('html-to-text');

const classify = require('../classify');
const replyHandle = ({ message: { content }, createdAt: time, from: vendor, id }) => {

  const { message, tag } = classify(convert(content));
  return { id, vendor, time, message, tag }
}

const transform = ({ messages }) => ({
  messages: (map(messages, (data) => {
    const { message: { content }, createdAt: time, from: vendor, replies, id } = data
    const { message, tag } = classify(convert(content))
    const first = { id, vendor, time, message, tag }
    const repliesData = map(replies, replyHandle)
    return [first, ...repliesData]
  })).flatMap((msg) => [...msg])
})

module.exports = transform