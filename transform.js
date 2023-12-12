const { peek, pretty } = require('@laufire/utils/debug')
const { map } = require('@laufire/utils/collection')
const { convert } = require('html-to-text');

const messages = require('./data/temp.json')
const classify = require('./classify');
const replyHandle = ({ message: { content }, createdAt: time, from: vendor,id }) => {

  const { message, tag } = classify(convert(content));
  return {id, vendor, time, message, tag }
}
const result = map(messages, (data) => {
  const { message: { content }, createdAt: time, from: vendor, replies, id } = data
  const { message, tag } = classify(convert(content))
  const first = {id, vendor, time, message, tag }
  const repliesData = map(replies, replyHandle )
  return [first, ...repliesData]
})

peek(pretty(result, 2))