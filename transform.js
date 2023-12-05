const { peek, pretty } = require('@laufire/utils/debug')
const { map } = require('@laufire/utils/collection')
const { convert } = require('html-to-text');

const messages = require('./temp.json')
const classify = require('./classify');

const result = map(messages, ({message: {content},replies}) => {
  const first  = classify(convert(content))
  const repliesData = map(replies, ({message}) =>classify(convert(message.content)))
  return [first, ...repliesData]
})

peek(pretty(result,2))