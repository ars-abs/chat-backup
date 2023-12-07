const { map, find } = require('@laufire/utils/collection');
const { closest, distance } = require('fastest-levenshtein')
const tags = [
  'connected', 'available', 'logged in',
  'now break', 'logging off', 'logging off for the day',
  'break', 'disconnected', 'lunch break', 'leaving now',
  'back', 'now back',
  'logged off', 'left', 'leaving',
  'lunch'
]

const classifyWordByWord = ({ message, classified }) => {
  if (classified) return {}

  const text = (message || '').toLowerCase().trim();
  const words = text.split(/[ \.\,\!\-\@\d]+/);
  const wordsMatch = map(words, (word) => {
    const tag = closest(word, tags);
    const dist = distance(word, tag);
    return { tag, isMatch: dist < 2 }
  })

  const data = find(wordsMatch, ({ isMatch }) => isMatch)

  return data && words.length <= 4
    ? { tag: data.tag, classified: true }
    : {}
}


module.exports = classifyWordByWord