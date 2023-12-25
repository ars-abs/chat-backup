const { reduce, sort } = require("@laufire/utils/collection");
const messages = require('./data/.source.json');
const { peek } = require("@laufire/utils/debug");
const { convert } = require('html-to-text');

const doCount = (acc, item) => ({
  ...acc, [item]: (acc[item] || 0) + 1
})
const countDuplicates = (collections) => reduce(collections, doCount, {})

const { words } = reduce(messages, ({ words }, message) => {
  const text = convert(message?.body?.content || '').toLowerCase().trim();

  return { words: [...words, ...text.split(/[ \.\,\!\-\@\d]+/)] }
}, { words: [] })

const descending = (a, b) => (a < b ? 1 : a > b ? -1 : 0);

peek(sort(countDuplicates(words), descending))

