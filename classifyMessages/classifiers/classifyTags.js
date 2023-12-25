const { keys } = require('@laufire/utils/collection');
const { closest, distance } = require('fastest-levenshtein')
const tagsMatch = {
  'will': 20,
  'connected': 1, 
  'break': 2, 
  'dinner': 1,
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

const regex = /@|at|At/;

const classifyTags = ({ message, classified }) => {
  const text = (message || '').toLowerCase().trim();
  const wordCount = (text.split(/[ \.\,\!\-\@\d]+/)).length;
  const isAtPresent = !!text.match(regex)
  const tag = closest(text, tags);
  const dist = distance(text, tag);
  const isMatch = dist <= tagsMatch[tag]
  const isClassified = isAtPresent
    ? dist <= 10 && isMatch //&& wordCount <= 4
    : isMatch
  const result = isClassified
    ? { tag: tag, classified: true }
    : {}

  return !classified 
    ?{
      message: text,
      dist,
      ...result
    }
    : {}
}


module.exports = classifyTags