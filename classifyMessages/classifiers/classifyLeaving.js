const { distance } = require('fastest-levenshtein')

const regex = /@|at|At/;
const type = 'leaving for the day'

const classifyLeaving = ({ message, classified }) => {
  const text = (message || '').toLowerCase().trim();
  const isAtPresent = !!text.match(regex)
  const dist = distance(text, type);
  const isClassified = isAtPresent ? dist <= 10 : dist <= 5

  const result = isClassified
    ? { tag: 'leaving', classified: true }
    : {}

  return !classified
    ? {
      message: text,
      ...result
    }
    : {}
}

module.exports = classifyLeaving