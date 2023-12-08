const { map, find } = require('@laufire/utils/collection');
const { keys } = require('@laufire/utils/collection');
const { closest, distance } = require('fastest-levenshtein')

const tagsMatch = {
  'connected': 1, 
  'break': 2, 
  'back': 1, 
  'leaving': 1,
  'logged in': 1,
  'logging off': 1, 
  'logging off for the day': 4,
  'disconnected': 1, 
  'logged off': 1, 
  'left': 1, 
  'lunch': 3,
}

const tags = keys(tagsMatch)
const classifyWordByWord = ({ message, classified }) => {
  if (classified) return {}

  const text = (message || '').toLowerCase().trim();
  const words = text.split(/[ \.\,\!\-\@\d]+/);
  const wordsMatch = map(words, (word) => {
    const tag = closest(word, tags);
    const dist = distance(word, tag);
    return { tag, isMatch: dist <= tagsMatch[tag] }
  })

  const data = find(wordsMatch, ({ isMatch }) => isMatch)

  return data //&& words.length <= 4
    ? { tag: data.tag, classified: true }
    : {}
}


module.exports = classifyWordByWord