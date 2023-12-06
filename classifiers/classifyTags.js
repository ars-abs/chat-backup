const { closest, distance } = require('fastest-levenshtein')
const tags = [
  'connected', 'available', 'logged in',
  'break', 'disconnected',
  'back',
  'logged off', 'left', 'leaving',
  'lunch'
]
const regex = /@|at|At/;
const percentage = 0.85
const half = 0.50

const classifyTags = ({ message, classified }) => {
  const text = (message || '').toLowerCase().trim();
  const isAtPresent = !!text.match(regex)
  const tag = closest(text, tags);
  const dist = distance(text, tag);
  const tagLength = tag.length;
  const min = tagLength <= 5 ? tagLength * half : tagLength * percentage
  const match = tagLength < text.length ? text.length - dist : tagLength - dist
  const isMatch = min <= match && match <= tagLength
  const isClassified = isAtPresent
    ? dist <= min + 8 && isMatch
    : isMatch && dist <= min
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