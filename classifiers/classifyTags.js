const {closest, distance} = require('fastest-levenshtein')
const tags = [
  'connected', 'available','logged in',
  'break',
  'back',
  'logged off', 'left','leaving',
  'min', 'lunch'
]
const regex = /@|at|At/;
const percentage = 0.75
const half = 0.50

const classifyTags = ({message, ...rest}) => {
  const text = (message || '').toLowerCase().trim();
  const isAtPresent =!!text.match(regex) 
  const tag = closest(text, tags);
  const dist = distance(text, tag);
  const length = tag.length;
  const min = length <= 5 ? length * half : length * percentage
  const match = length < text.length ? text.length - dist : length - dist
  const isMatch = min <= match && match <= length 
  const isClassified = isAtPresent 
    ? dist <= length+8 && isMatch
    : isMatch
  const result = isClassified
    ?{tag: tag, classified: true}
    :{}

  return {
    ...rest,
    message:text,
    ...result
  }
}


module.exports = classifyTags